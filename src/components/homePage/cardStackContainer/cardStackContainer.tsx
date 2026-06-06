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
    const controls = useAnimation();

    // Framer-style card stack state: tracks the order of cards by index
    const [cardOrder, setCardOrder] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    // Motion values for the front card's drag position
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    // 3D tilt rotation based on drag position (max 15°)
    const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);
    const rotateY = useTransform(dragX, [-200, 0, 200], [-15, 0, 15]);
    // Scale down slightly while dragging
    const dragScale = useTransform(
        dragX,
        [-300, -100, 0, 100, 300],
        [0.95, 0.98, 1, 0.98, 0.95]
    );
    const isAnimatingRef = useRef(false);

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

    // Initialize card order for Framer-style stack (insure-tech first)
    useEffect(() => {
        if (isMobile && filteredProjects.length > 0 && cardOrder.length === 0) {
            // Put insure-tech at position 0 (front of the stack)
            const insureIdx = filteredProjects.findIndex(p => p.slug === "insure-tech");
            const order = filteredProjects.map((_, i) => i);
            if (insureIdx > 0) {
                order.splice(order.indexOf(insureIdx), 1);
                order.unshift(insureIdx);
            }
            setCardOrder(order);
        }
    }, [isMobile, filteredProjects, cardOrder.length]);

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

    // Framer-style card stack: swipe in any direction to send front card to back
    const handleStackDragEnd = async (_event: any, info: any) => {
        if (isAnimatingRef.current) return;

        const swipeDistance = 100; // matches Framer's Swipe Distance
        const swipeVelocity = 500; // matches Framer's Swipe Velocity
        const offsetX = info.offset.x;
        const offsetY = info.offset.y;
        const velocityX = info.velocity.x;
        const velocityY = info.velocity.y;

        const distanceMoved = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const velocityMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

        const shouldSwipe = distanceMoved > swipeDistance || velocityMagnitude > swipeVelocity;

        if (shouldSwipe && filteredProjects.length > 1) {
            isAnimatingRef.current = true;
            setIsDragging(false);

            // Determine the direction to fly off (use velocity if strong, else offset)
            const angle = Math.atan2(
                velocityMagnitude > swipeVelocity ? velocityY : offsetY,
                velocityMagnitude > swipeVelocity ? velocityX : offsetX
            );
            const flyDistance = 800;
            const targetX = Math.cos(angle) * flyDistance;
            const targetY = Math.sin(angle) * flyDistance;

            // Animate the front card flying off
            await controls.start({
                x: targetX,
                y: targetY,
                opacity: 0,
                transition: { type: "spring", stiffness: 200, damping: 30, mass: 0.8 }
            });

            // Move front card to back of the stack (infinite loop)
            setCardOrder(prev => {
                const newOrder = [...prev];
                const front = newOrder.shift()!;
                newOrder.push(front);
                return newOrder;
            });

            // Update active project in windowModeState
            const nextFrontIndex = cardOrder[1]; // card[1] becomes the new front
            if (nextFrontIndex !== undefined) {
                setActiveMobileProject(filteredProjects[nextFrontIndex]?.slug || "insure-tech");
            }

            // Reset drag position for the new front card
            dragX.set(0);
            dragY.set(0);
            controls.set({ x: 0, y: 0, opacity: 1 });
            isAnimatingRef.current = false;
        } else {
            // Snap back with spring
            setIsDragging(false);
            controls.start({
                x: 0,
                y: 0,
                transition: { type: "spring", stiffness: 500, damping: 30 }
            });
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

    // ── Framer-style swipeable card stack (mobile) ──────────────────────────
    if (isMounted && isMobile) {
        if (!filteredProjects.length || cardOrder.length === 0) return null;

        const STACK_OFFSET = 12;   // px each card peeks behind the one in front
        const SCALE_STEP = 0.05;   // 5% smaller per layer
        const VISIBLE_CARDS = Math.min(3, filteredProjects.length);
        const PERSPECTIVE = 600;

        const mobileWidth = "min(300px, calc(100vw - 72px))";
        const mobileHeight = "min(360px, calc(100vh - 340px))";

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
                zIndex: 10,
                perspective: PERSPECTIVE,
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    height: "100%",
                    maxHeight: "460px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {/* Render cards: back cards first, front card last (painter's order) */}
                    {cardOrder.slice(0, VISIBLE_CARDS).map((projectIndex, stackPosition) => {
                        const project = filteredProjects[projectIndex];
                        if (!project) return null;

                        const isFront = stackPosition === 0;
                        const depth = stackPosition; // 0 = front, 1 = behind, 2 = deepest

                        // Stack appearance: each card behind is slightly smaller and offset down
                        const scale = 1 - depth * SCALE_STEP;
                        const yOffset = -(depth * STACK_OFFSET); // negative = peek above the front card
                        const cardOpacity = 1 - depth * 0.2;
                        const zIdx = (VISIBLE_CARDS - depth) * 10;

                        if (isFront) {
                            // Front card: draggable with 3D tilt
                            return (
                                <motion.div
                                    key={`stack-${projectIndex}`}
                                    animate={controls}
                                    style={{
                                        position: "absolute",
                                        width: mobileWidth,
                                        height: mobileHeight,
                                        zIndex: zIdx,
                                        pointerEvents: "auto",
                                        touchAction: "none",
                                        rotateX,
                                        rotateY,
                                        cursor: "grab",
                                        transformStyle: "preserve-3d",
                                    }}
                                    drag
                                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                    dragElastic={0.6}
                                    onDragStart={() => setIsDragging(true)}
                                    onDrag={(_e, info) => {
                                        dragX.set(info.offset.x);
                                        dragY.set(info.offset.y);
                                    }}
                                    onDragEnd={handleStackDragEnd}
                                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                                >
                                    <Card
                                        height={mobileHeight}
                                        width={mobileWidth}
                                        projectName={project.name}
                                        projectDescription={project.description}
                                        video={project.video}
                                        demoPoster={project.demoPoster}
                                        zIndex={zIdx}
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
                            );
                        }

                        // Background cards: real cards that peek behind, animate on reorder
                        return (
                            <motion.div
                                key={`stack-${projectIndex}`}
                                initial={false}
                                animate={{
                                    scale,
                                    y: yOffset,
                                    opacity: cardOpacity,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                    mass: 0.8,
                                }}
                                style={{
                                    position: "absolute",
                                    zIndex: zIdx,
                                    pointerEvents: "none",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    transformOrigin: "center center",
                                    boxShadow: `0 ${8 - depth * 2}px ${24 - depth * 4}px -4px rgba(0,0,0,${0.15 - depth * 0.03})`,
                                }}
                            >
                                <Card
                                    height={mobileHeight}
                                    width={mobileWidth}
                                    projectName={project.name}
                                    projectDescription={project.description}
                                    video={project.video}
                                    demoPoster={project.demoPoster}
                                    zIndex={zIdx}
                                    isExiting={isExiting}
                                    onExpandProject={handleExpandProject}
                                    isProjectExpanded={!!expandedProject}
                                    onCloseWindow={() => {}}
                                    isActive={false}
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
