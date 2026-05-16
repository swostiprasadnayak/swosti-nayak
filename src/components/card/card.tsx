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
    syne: "center bottom",
};

const VIDEO_FIT: Record<string, "cover" | "contain"> = {
    blinkit: "contain",
};

// Slugs where demoPoster should be contained with padding instead of cropped
const POSTER_CONTAIN: Record<string, boolean> = {
};

const CARD_BG_COLORS: Record<string, string> = {
    blinkit: "#EAEAEA",
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

    const project = useMemo(() => PROJECTS.find((p) => p.name === projectName), [projectName]);
    const projectTags = project?.tags;
    const isDisabled = project?.disabled ?? false;
    const slug = project?.slug ?? "";
    const cardBg = CARD_BG_COLORS[slug];

    const videoRef = useRef<HTMLVideoElement>(null);
    const shouldPlay = !isProjectExpanded;
    useVideoPlayback(videoRef, shouldPlay);

    const videoStyle = useMemo(
        () => ({
            width: "100%",
            height: "100%",
            objectFit: (VIDEO_FIT[slug] ?? "cover") as "cover" | "contain",
            objectPosition: VIDEO_POSITIONS[slug] ?? "center",
        }),
        [slug]
    );

    const expandProject = useCallback(() => {
        if (isDisabled) return;
        onExpandProject?.(projectName);
    }, [onExpandProject, projectName, isDisabled]);

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
                    style={{ zIndex, cursor: isDisabled ? "default" : "pointer" }}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    tabIndex={0}
                    exit={EXIT_ANIMATION}
                >
                    <motion.div
                        style={{ width, height, position: "relative" }}
                        whileHover={{
                            scale: isDisabled ? 1.01 : 1.04,
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
                                        onExpand={isDisabled ? undefined : expandProject}
                                        visible={isHovered && !isDisabled}
                                    />
                                    <span className={classes.windowTitle}>{projectName}</span>
                                    <div className={classes.trafficLightsPlaceholder} />
                                </div>

                                <div className={classes.contentArea}>
                                    <Squircle
                                        className={classes.videoContainer}
                                        cornerRadius={8}
                                        style={cardBg ? { background: cardBg } : undefined}
                                    >
                                        {video ? (
                                            <video
                                                ref={videoRef}
                                                src={video}
                                                autoPlay={shouldPlay}
                                                preload="metadata"
                                                loop
                                                muted
                                                playsInline
                                                poster={demoPoster || undefined}
                                                style={videoStyle}
                                            />
                                        ) : demoPoster ? (
                                            <img
                                                src={demoPoster}
                                                alt={projectName}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: POSTER_CONTAIN[slug] ? 'contain' : 'cover',
                                                    padding: POSTER_CONTAIN[slug] ? '10px 8px' : 0,
                                                    boxSizing: 'border-box',
                                                }}
                                            />
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
