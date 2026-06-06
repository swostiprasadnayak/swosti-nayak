"use client";

import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { motion, LayoutGroup, AnimatePresence, useMotionValue, useTransform, useAnimation } from "motion/react";
import { Squircle } from "corner-smoothing";
import type { WindowModeAPI } from "@/app/hooks/useWindowMode";
import classes from "./cardStackContainer.module.css";
import Card from "../../card/card";
import { PROJECTS } from "@/app/types/projects.types";
import { CARD_STYLES } from "@/app/types/cards.types";

// Background colors per project (matches desktop Card)
const MOBILE_CARD_BG: Record<string, string> = {
    blinkit: "#EAEAEA",
    "insure-tech": "#ffffff",
    "gc-dental": "#f5f5f5",
    unicef: "#ffffff",
};

// Per-project image fit overrides for the mobile stack
const MOBILE_POSTER_FIT: Record<string, "cover" | "contain"> = {
    "insure-tech": "contain",
};
const MOBILE_VIDEO_FIT: Record<string, "cover" | "contain"> = {
    blinkit: "contain",
};

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
    // Custom card layout: no traffic lights, no window header.
    // Image/video fills top, description + tags at bottom.
    if (isMounted && isMobile) {
        if (!mobileCards.length) return null;

        const mobileWidth = "min(320px, calc(100vw - 56px))";
        const mobileHeight = "min(440px, calc(100vh - 280px))";

        return (
            <LayoutGroup>
                <div style={{
                    position: "absolute",
                    top: 80,
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

                        const cardBg = MOBILE_CARD_BG[project.slug] ?? "#ffffff";
                        const posterFit = MOBILE_POSTER_FIT[project.slug] ?? "cover";
                        const videoFit = MOBILE_VIDEO_FIT[project.slug] ?? "cover";

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
                                onClick={() => isTop && handleExpandProject(project.name)}
                                style={{
                                    position: "absolute",
                                    width: mobileWidth,
                                    height: mobileHeight,
                                    cursor: isTop ? "grab" : "auto",
                                    touchAction: "none",
                                    pointerEvents: isTop ? "auto" : "none",
                                }}
                            >
                                <Squircle
                                    cornerRadius={20}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "#ffffff",
                                        display: "flex",
                                        flexDirection: "column",
                                        overflow: "hidden",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {/* Image / Video area (~62%) */}
                                    <div style={{
                                        position: "relative",
                                        flex: "0 0 62%",
                                        background: cardBg,
                                        overflow: "hidden",
                                    }}>
                                        {project.video ? (
                                            <video
                                                src={project.video}
                                                autoPlay={isTop}
                                                preload="metadata"
                                                loop
                                                muted
                                                playsInline
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: videoFit,
                                                    display: "block",
                                                }}
                                            />
                                        ) : project.demoPoster ? (
                                            <Image
                                                src={project.demoPoster}
                                                alt={project.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 320px"
                                                priority={isTop}
                                                style={{
                                                    objectFit: posterFit,
                                                    objectPosition: "center",
                                                    padding: posterFit === "contain" ? "12px" : "0",
                                                    boxSizing: "border-box",
                                                }}
                                            />
                                        ) : null}
                                    </div>

                                    {/* Description panel (~38%) */}
                                    <div style={{
                                        flex: 1,
                                        padding: "16px 18px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        background: "#ffffff",
                                        borderTop: "1px solid rgba(0,0,0,0.06)",
                                        overflow: "hidden",
                                    }}>
                                        <h3 style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#111",
                                            margin: 0,
                                            letterSpacing: "-0.01em",
                                        }}>
                                            {project.name}
                                        </h3>
                                        <p style={{
                                            fontSize: 12.5,
                                            lineHeight: 1.45,
                                            color: "#555",
                                            margin: 0,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}>
                                            {project.description}
                                        </p>
                                        {project.tags && project.tags.length > 0 && (
                                            <div style={{
                                                display: "flex",
                                                gap: 6,
                                                flexWrap: "wrap",
                                                marginTop: 2,
                                            }}>
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} style={{
                                                        fontSize: 10,
                                                        padding: "3px 8px",
                                                        background: "#f4f4f4",
                                                        border: "1px solid #e5e5e5",
                                                        borderRadius: 100,
                                                        color: "#555",
                                                        fontWeight: 500,
                                                        whiteSpace: "nowrap",
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Squircle>
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
