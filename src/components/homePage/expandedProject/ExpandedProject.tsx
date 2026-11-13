"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import TrafficLights from "@/components/card/trafficLights/trafficLights";
import classes from "./expandedProject.module.css";

// Case studies are large (the Insure-Tech one embeds a full prototype), so each
// is split into its own chunk instead of shipping with the homepage. Keys are
// lower-cased project names.
const CASE_STUDY_LOADERS = {
    "blinkit": () => import("@/components/caseStudy/template/BlinkitCaseStudyTemplate"),
    "gc dental": () => import("@/components/caseStudy/template/GCDentalCaseStudyTemplate"),
    "insure-tech": () => import("@/components/caseStudy/template/InsureTechCaseStudyTemplate"),
} as const;
type CaseStudyKey = keyof typeof CASE_STUDY_LOADERS;

const CASE_STUDIES = Object.fromEntries(
    Object.entries(CASE_STUDY_LOADERS).map(([key, load]) => [key, dynamic(load, { loading: () => null })])
) as Record<CaseStudyKey, React.ComponentType>;

// Warm the chunks once the homepage is idle, so opening a card is still instant.
let prefetched = false;
function prefetchCaseStudies() {
    if (prefetched) return;
    prefetched = true;
    Object.values(CASE_STUDY_LOADERS).forEach((load) => { load().catch(() => {}); });
}
interface ExpandedProjectProps {
    projectName: string | null;
    onClose: () => void;
    layoutId: string;
}
export default function ExpandedProject({ projectName, onClose, layoutId }: ExpandedProjectProps) {
    useEffect(() => {
        const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
        const cic = window.cancelIdleCallback ?? window.clearTimeout;
        const id = ric(prefetchCaseStudies);
        return () => cic(id);
    }, []);

    const key = projectName?.toLowerCase() as CaseStudyKey | undefined;
    const CaseStudy = key ? CASE_STUDIES[key] : undefined;

    // Close on escape key + lock body scroll when modal is open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (projectName) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [projectName, onClose]);
    return (
        <AnimatePresence>
            {projectName && (
                <div className={classes.overlay}>
                    <motion.div
                        className={classes.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={classes.windowContainer}
                        layoutId={layoutId}
                        transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                        data-component="ExpandedProject"
                        data-project={projectName}
                    >
                        <div className={classes.header}>
                            <TrafficLights onClose={onClose} visible={true} />
                            <span className={classes.windowTitle}>{projectName}</span>
                            <div className={classes.trafficLightsPlaceholder} />
                        </div>
                        <div
                            className={classes.content}
                            style={key === 'insure-tech'
                                ? { overflow: 'hidden', position: 'relative' }
                                : undefined}
                        >
                            {CaseStudy ? <CaseStudy /> : (
                                <div style={{ padding: "60px", textAlign: "center", color: "rgba(0,0,0,0.5)" }}>
                                    Case study for {projectName} is currently under construction.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
