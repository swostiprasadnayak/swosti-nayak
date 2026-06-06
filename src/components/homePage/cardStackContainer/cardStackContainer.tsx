"use client";

import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence, useMotionValue, useTransform, useAnimation } from "motion/react";
import type { WindowModeAPI } from "@/app/hooks/useWindowMode";
import classes from "./cardStackContainer.module.css";
import Card from "../../card/card";
import { PROJECTS } from "@/app/types/projects.types";
import { CARD_STYLES } from "@/app/types/cards.types";

type CardStackContainerProps = {
    isExiting: boolean;
    onExpandProject?: (projectName: string) => void;
    getProjectLayoutId?: (projectName: string) => string;
    getVideoModalLayoutId?: (projectName: string) => string;
    activeFilters?: string[];
    expandedProject?: string | null;
    windowModeState?: WindowModeAPI;
    viewMode?: "tab" | "card";
};

const CardStackContainer: React.FC<CardStackContainerProps> = ({
    isExiting,
    onExpandProject,
    getProjectLayoutId,
    getVideoModalLayoutId,
    activeFilters = [],
    expandedProject,
    windowModeState,
    viewMode,
}) => {
    const filteredProjects = useMemo(() => {
        if (activeFilters.length === 0 || activeFilters.includes("All Works")) {
            // All Works: Insure-Tech (front), Blinkit, GC Dental
            return PROJECTS.filter((p) => ["insure-tech", "blinkit", "gc-dental"].includes(p.slug));
        }
        if (activeFilters.includes("Featured")) {
            return PROJECTS.filter((p) => p.slug === "insure-tech");
        }
        return PROJECTS.filter((project) =>
            project.tags?.some((tag) => activeFilters.includes(tag))
        );
    }, [activeFilters]);

    const [expandingCard, setExpandingCard] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Motion values for desktop window mode
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-12, 12]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 1, 1, 1, 0.6]);

    // Framer-style swipe stack state: ordered array of project slugs
    const [mobileCards, setMobileCards] = useState<typeof PROJECTS>([]);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const activeSlug = useMemo(() => {
        if (!windowModeState || windowModeState.openWindows.length === 0) return "insure-tech";
        // The last window in openWindows is the active/front-most one
        return windowModeState.openWindows[windowModeState.openWindows.length - 1];
    }, [windowModeState?.openWindows]);

    // Keep exactly one window active on mobile to match the active dot "click state" in the dock
    useEffect(() => {
        if (isMobile && windowModeState && windowModeState.openWindows.length > 1) {
            const active = windowModeState.openWindows[windowModeState.openWindows.length - 1];
            filteredProjects.forEach((p) => {
                if (p.slug !== active) {
                    windowModeState.closeWindow(p.slug);
                }
            });
        }
    }, [isMobile, windowModeState?.openWindows, filteredProjects, windowModeState]);

    // Initialize with insure-tech if empty on mobile startup
    useEffect(() => {
        if (isMobile && windowModeState && windowModeState.openWindows.length === 0) {
            windowModeState.bringToFront("insure-tech");
        }
    }, [isMobile, windowModeState]);

    // Initialize mobile card order (insure-tech first)
    useEffect(() => {
        if (isMobile && filteredProjects.length > 0 && mobileCards.length === 0) {
            const sorted = [...filteredProjects];
            const insureIdx = sorted.findIndex(p => p.slug === "insure-tech");
            if (insureIdx > 0) {
                const [item] = sorted.splice(insureIdx, 1);
                sorted.unshift(item);
            }
            setMobileCards(sorted);
        }
    }, [isMobile, filteredProjects, mobileCards.length]);

    const setActiveMobileProject = useCallback((slug: string) => {
        if (!windowModeState) return;
        windowModeState.bringToFront(slug);
        filteredProjects.forEach((p) => {
            if (p.slug !== slug) {
                windowModeState.closeWindow(p.slug);
            }
        });
    }, [windowModeState, filteredProjects]);

    useEffect(() => {
        if (expandedProject === null && expandingCard !== null) {
            setExpandingCard(null);
        }
    }, [expandedProject, expandingCard]);

    const handleExpandProject = useCallback(
        (projectName: string) => {
            setExpandingCard(projectName);
            onExpandProject?.(projectName);
        },
        [onExpandProject]
    );

    const wasDragRef = useRef(false);

    const handleWindowDragStart = useCallback(
        (_event: unknown, _info: unknown, slug: string) => {
            wasDragRef.current = true;
            windowModeState?.bringToFront(slug);
        },
        [windowModeState]
    );

    const handleWindowDragEnd = useCallback(() => {
        requestAnimationFrame(() => {
            wasDragRef.current = false;
        });
    }, []);

    const handleWindowCardClick = useCallback(
        (slug: string) => {
            if (wasDragRef.current) return;
            windowModeState?.bringToFront(slug);
        },
        [windowModeState]
    );

    const windowSpring = useMemo(
        () => ({ type: "spring" as const, bounce: 0, duration: 0.3 }),
        []
    );

    // Framer-style swipe: drag in any direction, front card goes to back
    const handleSwipeDragEnd = useCallback((_event: any, info: any) => {
        const swipeThreshold = 100;
        const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);

        if (dist > swipeThreshold && mobileCards.length > 1) {
            setMobileCards(prev => {
                const next = [...prev];
                const swiped = next.shift()!;
                next.push(swiped);
                return next;
            });
            // Sync the new front card with windowModeState
            const newFront = mobileCards[1]; // after shift, [1] becomes [0]
            if (newFront) setActiveMobileProject(newFront.slug);
        }
        // If not past threshold, framer-motion snaps back via dragConstraints
    }, [mobileCards, setActiveMobileProject]);

    const windowCards = useMemo(() => {
        if (!windowModeState) return null;
        const cardDimensions = viewMode === 'card' ? CARD_STYLES.grid : CARD_STYLES.window;

        return windowModeState.openWindows
            .map((slug) => {
                const project = filteredProjects.find((p) => p.slug === slug);
                if (!project) return null;

                const pos = windowModeState.getPosition(slug);
                const zIndex = windowModeState.getZIndex(slug);

                return (
                    <motion.div
                        key={slug}
                        className={classes.windowCardOuter}
                        style={{ x: pos?.x, y: pos?.y, zIndex }}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        onDragStart={(e, info) => handleWindowDragStart(e, info, slug)}
                        onDragEnd={handleWindowDragEnd}
                        onClick={() => handleWindowCardClick(slug)}
                    >
                        <motion.div
                            className={classes.windowCardWrapper}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={windowSpring}
                        >
                            <Card
                                height={cardDimensions.height}
                                width={cardDimensions.width}
                                projectName={project.name}
                                projectDescription={project.description}
                                video={project.video}
                                demoPoster={project.demoPoster}
                                zIndex={zIndex}
                                isExiting={isExiting}
                                onExpandProject={handleExpandProject}
                                isProjectExpanded={!!expandedProject}
                                onCloseWindow={() => windowModeState.closeWindow(slug)}
                                isActive={slug === activeSlug}
                                layoutId={
                                    getProjectLayoutId
                                        ? getProjectLayoutId(project.name.toLowerCase())
                                        : getVideoModalLayoutId?.(project.name)
                                }
                            />
                        </motion.div>
                    </motion.div>
                );
            })
            .filter(Boolean);
    }, [windowModeState, filteredProjects, isExiting, expandedProject]);

    // ── Framer-style swipeable card stack (mobile) ──────────────────────────
    // Uses `layout` prop for smooth spring-based reorder transitions.
    // Front card is draggable in any direction; on swipe it moves to back.
    if (isMounted && isMobile) {
        if (!mobileCards.length) return null;

        const mobileWidth = "min(300px, calc(100vw - 64px))";
        const mobileHeight = "min(370px, calc(100vh - 320px))";

        return (
            <LayoutGroup>
                <div style={{
                    position: "absolute",
                    top: 90,
                    bottom: 110,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 10,
                }}>
                    {mobileCards.map((project, index) => {
                        const isTop = index === 0;

                        // Stack effect: cards behind get smaller, rotate, and shift
                        const scale = 1 - index * 0.05;
                        const cardRotate = index * 4;     // 0°, 4°, 8°
                        const xOffset = index * 20;       // 0px, 20px, 40px
                        const yOffset = index * 10;       // 0px, 10px, 20px
                        const cardOpacity = 1 - index * 0.15;

                        return (
                            <motion.div
                                key={project.slug}
                                initial={false}
                                animate={{
                                    scale,
                                    rotate: cardRotate,
                                    x: xOffset,
                                    y: yOffset,
                                    opacity: cardOpacity,
                                    zIndex: mobileCards.length - index,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                }}
                                drag={isTop}
                                dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                dragElastic={0.8}
                                onDragEnd={isTop ? handleSwipeDragEnd : undefined}
                                whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                                style={{
                                    position: "absolute",
                                    width: mobileWidth,
                                    height: mobileHeight,
                                    overflow: "hidden",
                                    borderRadius: 16,
                                    cursor: isTop ? "grab" : "auto",
                                    touchAction: "none",
                                    pointerEvents: isTop ? "auto" : "none",
                                }}
                            >
                                <Card
                                    height={mobileHeight}
                                    width={mobileWidth}
                                    projectName={project.name}
                                    projectDescription={project.description}
                                    video={project.video}
                                    demoPoster={project.demoPoster}
                                    zIndex={mobileCards.length - index}
                                    isExiting={isExiting}
                                    onExpandProject={handleExpandProject}
                                    isProjectExpanded={!!expandedProject}
                                    onCloseWindow={() => {}}
                                    isActive={isTop}
                                    layoutId={
                                        getProjectLayoutId
                                            ? getProjectLayoutId(project.name.toLowerCase())
                                            : getVideoModalLayoutId?.(project.name)
                                    }
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        );
    }

    return (
        <LayoutGroup>
            <div className={classes.stackWrapper} data-component="CardStackContainer">
                <div className={classes.windowContainer}>
                    <AnimatePresence>
                        {windowCards}
                    </AnimatePresence>
                </div>
            </div>
        </LayoutGroup>
    );
};

export default React.memo(CardStackContainer);
