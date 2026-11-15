"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import classes from "./card.module.css";
import { Squircle } from "corner-smoothing";
import CardDescription from "./cardDescription";
import TrafficLights from "./trafficLights/trafficLights";
import DeviceMockup from "./deviceMockup";
import type { CardProps } from "@/app/types/cards.types";
import { PROJECTS } from "@/app/types/projects.types";
import { useVideoPlayback } from "@/app/hooks/useVideoPlayback";

const VIDEO_POSITIONS: Record<string, string> = {};

const VIDEO_FIT: Record<string, "cover" | "contain"> = {
    blinkit: "contain",
};

// Slugs where demoPoster should be contained with padding instead of cropped
const POSTER_CONTAIN: Record<string, boolean> = {
    "insure-tech": true,
};

const CARD_BG_COLORS: Record<string, string> = {
    blinkit: "#EAEAEA",
    "insure-tech": "#F9F9F9",
    "gc-dental": "#f5f5f5",
};

/** The rendered height of an element, kept current as it resizes. */
function useElementHeight(ref: React.RefObject<HTMLElement | null>) {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref]);
    return height;
}

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
    isActive = true,
    compact = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const project = useMemo(() => PROJECTS.find((p) => p.name === projectName), [projectName]);
    const projectTags = project?.tags;
    const isDisabled = project?.disabled ?? false;
    const slug = project?.slug ?? "";
    const cardBg = CARD_BG_COLORS[slug];

    const videoRef = useRef<HTMLVideoElement>(null);
    // The description sits over the bottom of the media; the device mockup
    // keeps its devices above it.
    const descriptionRef = useRef<HTMLDivElement>(null);
    const descriptionHeight = useElementHeight(descriptionRef);
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
                    data-component="Card"
                    data-project={projectName}
                    style={{ zIndex, cursor: isDisabled ? "default" : "pointer" }}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    tabIndex={0}
                    exit={EXIT_ANIMATION}
                >
                    <motion.div
                        className={classes.responsiveSizer}
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
                                    <span className={`${classes.windowTitle} ${isActive ? "" : classes.windowTitleInactive}`}>{projectName}</span>
                                    <div className={classes.trafficLightsPlaceholder} />
                                </div>

                                <div className={classes.contentArea}>
                                    <Squircle
                                        className={classes.videoContainer}
                                        cornerRadius={8}
                                        style={cardBg ? { background: cardBg, position: "relative" } : { position: "relative" }}
                                    >
                                        {/* Device mockup: the project's film on a display, a still on a laptop */}
                                        {project?.cardMockup ? (
                                            <DeviceMockup
                                                {...project.cardMockup}
                                                playing={shouldPlay}
                                                bottomInset={descriptionHeight}
                                            />
                                        ) : /* Video card: fade in once ready, no poster shown */
                                        video ? (
                                            <video
                                                ref={videoRef}
                                                src={video}
                                                autoPlay={shouldPlay}
                                                preload="metadata"
                                                loop
                                                muted
                                                playsInline
                                                onCanPlay={() => {
                                                    setVideoLoaded(true);
                                                    onVideoLoaded?.();
                                                }}
                                                style={{
                                                    ...videoStyle,
                                                    opacity: videoLoaded ? 1 : 0,
                                                    transition: "opacity 0.4s ease-in-out",
                                                }}
                                            />
                                        ) : demoPoster ? (
                                            /* Non-video card: show poster */
                                            <Image
                                                src={demoPoster}
                                                alt={projectName}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 400px"
                                                priority={isActive}
                                                style={{
                                                    objectFit: POSTER_CONTAIN[slug] ? "contain" : "cover",
                                                    objectPosition: slug === "insure-tech" ? "center calc(50% - 40px)" : "center",
                                                    padding: slug === "insure-tech" ? "0 16px 0 0" : "0",
                                                    boxSizing: "border-box",
                                                }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#eaeaea' }} />
                                        )}
                                    </Squircle>
                                    <div className={classes.descriptionWrapper} ref={descriptionRef}>
                                        <CardDescription
                                            title={projectName}
                                            description={projectDescription}
                                            tags={projectTags}
                                            compact={compact}
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
