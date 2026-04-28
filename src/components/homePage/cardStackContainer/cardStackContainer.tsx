/**
* CardStackContainer.tsx
*
* Renders draggable project cards in multi-window mode.
* Each card is an independent window that can be dragged, clicked to
* bring to front, or closed. Uses the WindowModeAPI for z-index
* management and position tracking.
*
* Key features:
* - Draggable windows with grab cursor
* - Click-to-bring-to-front z-index management
* - Spring-animated entry/exit (scale + opacity)
* - Layout animations powered by Framer Motion
* - Filter support to show specific project categories
*/

"use client";

import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
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
};

const CardStackContainer: React.FC<CardStackContainerProps> = ({
    isExiting,
    onExpandProject,
    getProjectLayoutId,
    getVideoModalLayoutId,
    activeFilters = [],
    expandedProject,
    windowModeState,
}) => {
    const filteredProjects = useMemo(() => {
        if (activeFilters.length === 0) return PROJECTS;
        return PROJECTS.filter((project) =>
            project.tags?.some((tag) => activeFilters.includes(tag))
        );
    }, [activeFilters]);

    const [expandingCard, setExpandingCard] = useState<string | null>(null);

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

    const windowCards = useMemo(() => {
        if (!windowModeState) return null;
        const cardDimensions = CARD_STYLES.window;

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
