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

    // Unconditional motion value setup for hooks rules compliance
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-12, 12]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 1, 1, 1, 0.6]);
    const mobileOpacity = useTransform(y, [-200, -80, 0, 80, 200], [0.3, 0.8, 1, 0.8, 0.3]);
    const mobileScale = useTransform(y, [-200, 0, 200], [0.92, 1, 0.92]);
    const controls = useAnimation();
    const [mobileDirection, setMobileDirection] = useState<"up" | "down" | null>(null);
    const hasMobileSwiped = useRef(false);

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
        const swipeThreshold = 60;
        const swipe = info.offset.y;
        const velocity = info.velocity.y;

        if (filteredProjects.length <= 1) {
            controls.start({ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } });
            return;
        }

        // Swipe up or strong upward velocity → next project
        if (swipe < -swipeThreshold || velocity < -400) {
            hasMobileSwiped.current = true;
            setMobileDirection("up");
            await controls.start({ y: -600, opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } });
            let currentIndex = filteredProjects.findIndex((p) => p.slug === activeSlug);
            if (currentIndex === -1) currentIndex = 0;
            const nextIndex = (currentIndex + 1) % filteredProjects.length;
            setActiveMobileProject(filteredProjects[nextIndex].slug);
            // Reset position — new card will enter via AnimatePresence
            y.set(0);
            controls.set({ y: 0, opacity: 1, scale: 1 });
            setMobileDirection(null);
        }
        // Swipe down or strong downward velocity → previous project
        else if (swipe > swipeThreshold || velocity > 400) {
            hasMobileSwiped.current = true;
            setMobileDirection("down");
            await controls.start({ y: 600, opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } });
            let currentIndex = filteredProjects.findIndex((p) => p.slug === activeSlug);
            if (currentIndex === -1) currentIndex = 0;
            const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
            setActiveMobileProject(filteredProjects[prevIndex].slug);
            y.set(0);
            controls.set({ y: 0, opacity: 1, scale: 1 });
            setMobileDirection(null);
        }
        // Snap back
        else {
            controls.start({ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 30 } });
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

        // Next two projects for the stack behind
        const stack1Index = (currentIndex + 1) % filteredProjects.length;
        const stack2Index = (currentIndex + 2) % filteredProjects.length;
        const stack1 = filteredProjects.length > 1 ? filteredProjects[stack1Index] : null;
        const stack2 = filteredProjects.length > 2 ? filteredProjects[stack2Index] : null;

        const mobileWidth = "min(320px, calc(100vw - 56px))";
        const mobileHeight = "min(400px, calc(100vh - 300px))";

        return (
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
                padding: "0 20px",
                boxSizing: "border-box",
                zIndex: 10
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    height: "100%",
                    maxHeight: "460px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {/* Stack card 2 (deepest — peeks above front card) */}
                    {stack2 && (
                        <div style={{
                            position: "absolute",
                            width: "76%",
                            height: "100%",
                            bottom: 20,
                            left: "50%",
                            transform: "translateX(-50%)",
                            opacity: 0.35,
                            zIndex: 1,
                            pointerEvents: "none",
                            borderRadius: 16,
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }} />
                    )}

                    {/* Stack card 1 (middle — peeks above front card) */}
                    {stack1 && (
                        <div style={{
                            position: "absolute",
                            width: "86%",
                            height: "100%",
                            bottom: 10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            opacity: 0.55,
                            zIndex: 2,
                            pointerEvents: "none",
                            borderRadius: 16,
                            background: "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        }} />
                    )}

                    <AnimatePresence mode="wait">
                        {/* Front swipeable card */}
                        <motion.div
                            key={project.slug}
                            initial={hasMobileSwiped.current
                                ? { y: mobileDirection === "up" ? 300 : -300, opacity: 0, scale: 0.95 }
                                : false
                            }
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: mobileDirection === "up" ? -300 : 300, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                zIndex: 10,
                                pointerEvents: "auto",
                                touchAction: "none",
                            }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.6}
                            onDragEnd={handleMobileDragEnd}
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
