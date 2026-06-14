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

// Background colors per project (matches each poster's own background)
const MOBILE_CARD_BG: Record<string, string> = {
    blinkit: "#EAEAEA",
    "insure-tech": "#F9F9F9",
    "gc-dental": "#f5f5f5",
    unicef: "#ffffff",
};

// All media uses `contain` on mobile so full image/video shows without crop.
// Object-fit defaults to "contain" — override here only if a specific project
// needs different behavior.
const MOBILE_POSTER_FIT: Record<string, "cover" | "contain"> = {};
const MOBILE_VIDEO_FIT: Record<string, "cover" | "contain"> = {};

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
        // Default (empty filter or "Default"): three flagship projects in
        // their original staggered layout — Insure-Tech, Blinkit, GC Dental.
        if (activeFilters.length === 0 || activeFilters.includes("Default")) {
            return PROJECTS.filter((p) => ["insure-tech", "blinkit", "gc-dental"].includes(p.slug));
        }
        // All Works: everything including Unicef.
        if (activeFilters.includes("All Works")) {
            return PROJECTS.filter((p) => ["insure-tech", "blinkit", "gc-dental", "unicef"].includes(p.slug));
        }
        // Featured: just the flagship case study.
        if (activeFilters.includes("Featured")) {
            return PROJECTS.filter((p) => p.slug === "insure-tech");
        }
        // Corporate: client engagements (GC Dental + Unicef).
        if (activeFilters.includes("Corporate")) {
            return PROJECTS.filter((p) => ["gc-dental", "unicef"].includes(p.slug));
        }
        // Fallback: tag-based match for any other future categories.
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

    // Desktop: sync open windows to whatever the current filter says, but ONLY
    // when the filter actually changes. This is critical for the close button —
    // if the user clicks the red traffic light, we want that window to stay
    // closed even though it's still in `filteredProjects`. Running the sync on
    // every render would immediately reopen it.
    const lastFilterKeyRef = useRef<string | null>(null);
    useEffect(() => {
        if (isMobile || !windowModeState || filteredProjects.length === 0) return;
        const filterKey = activeFilters.length === 0 ? "__default__" : activeFilters.join("|");
        if (lastFilterKeyRef.current === filterKey) return;
        lastFilterKeyRef.current = filterKey;

        const wantedSlugs = new Set(filteredProjects.map(p => p.slug));
        // Close windows that aren't in the new filter first.
        windowModeState.openWindows.forEach(slug => {
            if (!wantedSlugs.has(slug)) {
                windowModeState.closeWindow(slug);
            }
        });
        // Open every project in the filter. Order matters: bringToFront pushes
        // the slug to the END of openWindows (frontmost). We want Insure-Tech
        // on top whenever it's in the filter, so iterate other projects first
        // and Insure-Tech last.
        const slugsOrdered = filteredProjects
            .map(p => p.slug)
            .sort((a, b) => {
                if (a === "insure-tech") return 1;   // a goes last
                if (b === "insure-tech") return -1;  // b goes last
                return 0;
            });
        slugsOrdered.forEach(slug => {
            windowModeState.bringToFront(slug);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilters, isMobile, filteredProjects, windowModeState]);

    // Reset the mobile-stack cache whenever the filter changes so the new
    // set of projects shows up at the front instead of stale cards.
    useEffect(() => {
        if (isMobile) setMobileCards([]);
    }, [activeFilters, isMobile]);

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

    // Sync mobileCards front with windowModeState's activeSlug.
    // - Dock tap on a card already in the stack → reorder to front.
    // - Dock tap on a previously-closed card → re-add to the front.
    // NOTE: do NOT depend on mobileCards here — that causes an infinite
    // re-add loop (every setMobileCards triggers the effect, which adds again).
    // Use the functional updater to access the latest state.
    useEffect(() => {
        if (!isMobile || filteredProjects.length === 0) return;
        setMobileCards(prev => {
            if (prev[0]?.slug === activeSlug) return prev;
            const idx = prev.findIndex(p => p.slug === activeSlug);
            if (idx > 0) {
                const next = [...prev];
                const [target] = next.splice(idx, 1);
                next.unshift(target);
                return next;
            }
            if (idx === -1) {
                const project = filteredProjects.find(p => p.slug === activeSlug);
                // Defensive: don't re-add if already present.
                if (project && !prev.some(p => p.slug === project.slug)) {
                    return [project, ...prev];
                }
            }
            return prev;
        });
    }, [activeSlug, isMobile, filteredProjects]);

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
                        const posterFit = MOBILE_POSTER_FIT[project.slug] ?? "contain";
                        const videoFit = MOBILE_VIDEO_FIT[project.slug] ?? "contain";

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
                                        padding: 10,
                                        boxSizing: "border-box",
                                        gap: 8,
                                        // Multi-layer drop shadow matching the desktop Card
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.1), 0 32px 64px rgba(0,0,0,0.15), 0 64px 120px rgba(0,0,0,0.12)",
                                    }}
                                >
                                    {/* Traffic lights — close / minimise / expand */}
                                    {isTop && (
                                        <div style={{
                                            display: "flex",
                                            gap: 6,
                                            alignItems: "center",
                                            padding: "2px 4px 0",
                                        }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // "Close" = remove card from stack.
                                                    // Tapping the dock icon reopens it via the sync effect.
                                                    const closingSlug = project.slug;
                                                    const nextProject = mobileCards[1];
                                                    setMobileCards(prev => prev.filter(p => p.slug !== closingSlug));
                                                    if (windowModeState) {
                                                        windowModeState.closeWindow(closingSlug);
                                                        if (nextProject) windowModeState.bringToFront(nextProject.slug);
                                                    }
                                                }}
                                                style={{ width: 12, height: 12, borderRadius: "50%", border: "none", background: "#FE5F57", cursor: "pointer", padding: 0 }}
                                                title="Close"
                                            />
                                            <button
                                                style={{ width: 12, height: 12, borderRadius: "50%", border: "none", background: "#FEBC2E", cursor: "default", padding: 0 }}
                                                title="Minimise"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleExpandProject(project.name);
                                                }}
                                                style={{ width: 12, height: 12, borderRadius: "50%", border: "none", background: "#28C840", cursor: "pointer", padding: 0 }}
                                                title="Open case study"
                                            />
                                        </div>
                                    )}

                                    {/* Inset media panel — image/video fits the frame (contain) */}
                                    <Squircle
                                        cornerRadius={14}
                                        style={{
                                            position: "relative",
                                            flex: "0 0 60%",
                                            width: "100%",
                                            background: cardBg,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {project.video ? (
                                            <video
                                                key={project.slug}
                                                src={project.video}
                                                autoPlay
                                                preload="auto"
                                                loop
                                                muted
                                                playsInline
                                                disablePictureInPicture
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: videoFit,
                                                    display: "block",
                                                }}
                                                onLoadedMetadata={(e) => {
                                                    const v = e.currentTarget;
                                                    v.muted = true;
                                                    v.play().catch(() => {});
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
                                                }}
                                            />
                                        ) : null}
                                    </Squircle>

                                    {/* Description panel — inset below the media */}
                                    <div style={{
                                        flex: 1,
                                        padding: "4px 6px 4px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                        overflow: "hidden",
                                    }}>
                                        <h3 style={{
                                            fontSize: 15,
                                            fontWeight: 700,
                                            color: "#111",
                                            margin: 0,
                                            letterSpacing: "-0.01em",
                                        }}>
                                            {project.name}
                                        </h3>
                                        <p style={{
                                            fontSize: 12,
                                            lineHeight: 1.4,
                                            color: "#555",
                                            margin: 0,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}>
                                            {project.description}
                                        </p>
                                        {project.tags && project.tags.length > 0 && (
                                            <div style={{
                                                display: "flex",
                                                gap: 5,
                                                flexWrap: "wrap",
                                                marginTop: 2,
                                            }}>
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} style={{
                                                        fontSize: 9.5,
                                                        padding: "2px 7px",
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
