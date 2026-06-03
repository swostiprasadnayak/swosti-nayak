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
            // All Works: Insure-Tech, Blinkit, GC Dental, Unicef
            return PROJECTS.filter((p) => ["insure-tech", "blinkit", "unicef", "gc-dental"].includes(p.slug));
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

    // Unconditional motion value setup for hooks rules compliance
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-12, 12]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 1, 1, 1, 0.6]);
    const controls = useAnimation();

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

    // Initialize with unicef if empty on mobile startup
    useEffect(() => {
        if (isMobile && windowModeState && windowModeState.openWindows.length === 0) {
            windowModeState.bringToFront("insure-tech");
        }
    }, [isMobile, windowModeState]);

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

    const handleMobileDragEnd = async (event: any, info: any) => {
        const swipeThreshold = 80;
        const swipe = info.offset.x;

        if (filteredProjects.length <= 1) {
            controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
            return;
        }

        if (swipe < -swipeThreshold) {
            // Swiped Left -> Next Project
            await controls.start({ x: -300, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } });
            let currentIndex = filteredProjects.findIndex((p) => p.slug === activeSlug);
            if (currentIndex === -1) currentIndex = 0;
            const nextIndex = (currentIndex + 1) % filteredProjects.length;
            const nextSlug = filteredProjects[nextIndex].slug;
            setActiveMobileProject(nextSlug);
            x.set(0);
            controls.set({ x: 0, opacity: 1 });
        } else if (swipe > swipeThreshold) {
            // Swiped Right -> Previous Project
            await controls.start({ x: 300, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } });
            let currentIndex = filteredProjects.findIndex((p) => p.slug === activeSlug);
            if (currentIndex === -1) currentIndex = 0;
            const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
            const prevSlug = filteredProjects[prevIndex].slug;
            setActiveMobileProject(prevSlug);
            x.set(0);
            controls.set({ x: 0, opacity: 1 });
        } else {
            // Bounce back
            controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        }
    };

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

    // Mobile swipe rendering block (placed after all hook declarations)
    if (isMounted && isMobile) {
        const project = filteredProjects.find((p) => p.slug === activeSlug) || filteredProjects[0];
        if (!project) return null;

        let currentIndex = filteredProjects.findIndex((p) => p.slug === activeSlug);
        if (currentIndex === -1) currentIndex = 0;
        const nextProjectIndex = (currentIndex + 1) % filteredProjects.length;
        const nextProject = filteredProjects.length > 1 ? filteredProjects[nextProjectIndex] : null;

        const mobileWidth = "min(340px, calc(100vw - 40px))";
        const mobileHeight = "min(460px, calc(100vh - 250px))";

        return (
            <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                padding: "20px",
                boxSizing: "border-box",
                zIndex: 10
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    height: "460px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <AnimatePresence>
                        {/* 1. Underlying layered card for 3D stack depth */}
                        {nextProject && (
                            <motion.div
                                key={nextProject.slug + "_stack"}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    transformOrigin: "bottom center",
                                    scale: 0.94,
                                    y: 16,
                                    opacity: 0.45,
                                    zIndex: 1,
                                    pointerEvents: "none"
                                }}
                            >
                                <Card
                                    height={mobileHeight}
                                    width={mobileWidth}
                                    projectName={nextProject.name}
                                    projectDescription={nextProject.description}
                                    video={nextProject.video}
                                    demoPoster={nextProject.demoPoster}
                                    zIndex={1}
                                    isExiting={false}
                                    onExpandProject={() => {}}
                                    isProjectExpanded={false}
                                    onCloseWindow={() => {}}
                                    isActive={false}
                                />
                            </motion.div>
                        )}

                        {/* 2. Front Draggable Swipable Card */}
                        <motion.div
                            key={project.slug}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                x,
                                rotate,
                                opacity,
                                zIndex: 10,
                                pointerEvents: "auto",
                                cursor: "grab"
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={handleMobileDragEnd}
                            animate={controls}
                        >
                            <Card
                                height={mobileHeight}
                                width={mobileWidth}
                                projectName={project.name}
                                projectDescription={project.description}
                                video={project.video}
                                demoPoster={project.demoPoster}
                                zIndex={10}
                                isExiting={isExiting}
                                onExpandProject={handleExpandProject}
                                isProjectExpanded={!!expandedProject}
                                onCloseWindow={() => {}}
                                isActive={true}
                                layoutId={
                                    getProjectLayoutId
                                        ? getProjectLayoutId(project.name.toLowerCase())
                                        : getVideoModalLayoutId?.(project.name)
                                }
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    return (
        <LayoutGroup>
            <div className={classes.stackWrapper}>
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
