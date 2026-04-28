"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import classes from "./card.module.css";
import { Squircle } from "corner-smoothing";
import CardDescription from "./cardDescription";
import TrafficLights from "./trafficLights/trafficLights";
import type { CardProps } from "@/app/types/cards.types";
import { PROJECTS } from "@/app/types/projects.types";
import { useVideoPlayback } from "@/app/hooks/useVideoPlayback";

const VIDEO_POSITIONS: Record<string, string> = {
    Aristotle: "center top",
    Syne: "center bottom",
    Lighthouse: "85% top",
    "P&ID tool": "center bottom",
};

const EXIT_ANIMATION = {
    y: -800,
    rotate: -5,
    filter: "blur(8px)",
    transition: { type: "spring" as const, bounce: 0, duration: 1 },
};

const Card: React.FC<CardProps> = ({
    height,
    width,
    zIndex,
    projectName,
    projectDescription,
    isExiting,
    video,
    onExpandProject,
    layoutId,
    onVideoLoaded,
    isProjectExpanded = false,
    onCloseWindow,
    demoPoster,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const projectTags = useMemo(() => {
        const project = PROJECTS.find((p) => p.name === projectName);
        return project?.tags;
    }, [projectName]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const shouldPlay = !isProjectExpanded;
    useVideoPlayback(videoRef, shouldPlay);

    const videoStyle = useMemo(
        () => ({
            width: "100%",
            height: "100%",
            objectFit: "cover" as const,
            objectPosition: VIDEO_POSITIONS[projectName] ?? "left top",
        }),
        [projectName]
    );

    const expandProject = useCallback(() => {
        onExpandProject?.(projectName);
    }, [onExpandProject, projectName]);

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            expandProject();
        },
        [expandProject]
    );

    return (
        <AnimatePresence mode="wait">
            {!isExiting && (
                <motion.div
                    className={classes.cardContainer}
                    style={{ zIndex }}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    tabIndex={0}
                    exit={EXIT_ANIMATION}
                >
                    <motion.div
                        style={{ width, height, position: "relative" }}
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
                            transition: { type: "spring", bounce: 0, duration: 0.25 },
                        }}
                    >
                        <motion.div
                            layoutId={layoutId}
                            className={classes.cardWrapper}
                            transition={{
                                layout: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
                            }}
                        >
                            <Squircle className={classes.card} cornerRadius={16}>
                                <div className={classes.windowHeader}>
                                    <TrafficLights
                                        onClose={onCloseWindow}
                                        onExpand={expandProject}
                                        visible={isHovered}
                                    />
                                    <span className={classes.windowTitle}>{projectName}</span>
                                    <div className={classes.trafficLightsPlaceholder} />
                                </div>

                                <div className={classes.contentArea}>
                                    <Squircle className={classes.videoContainer} cornerRadius={8}>
                                        {video ? (
                                            <video
                                                ref={videoRef}
                                                src={video}
                                                autoPlay={shouldPlay}
                                                preload="auto"
                                                loop
                                                muted
                                                playsInline
                                                style={videoStyle}
                                            />
                                        ) : demoPoster ? (
                                            <img src={demoPoster} alt={projectName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#eaeaea' }} />
                                        )}
                                    </Squircle>
                                    <div className={classes.descriptionWrapper}>
                                        <CardDescription
                                            title={projectName}
                                            description={projectDescription}
                                            tags={projectTags}
                                        />
                                    </div>
                                </div>
                            </Squircle>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(Card);
