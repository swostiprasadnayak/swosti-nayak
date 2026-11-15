"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import TrafficLights from "@/components/card/trafficLights/trafficLights";
import classes from "./expandedProject.module.css";
import { CaseStudyNavContext } from "./caseStudyNav";

// Case studies are large (the Insure-Tech one embeds a full prototype), so each
// is split into its own chunk instead of shipping with the homepage. Keys are
// lower-cased project names.
const CASE_STUDY_LOADERS = {
    "supply chain intelligence": () => import("@/components/caseStudy/template/SupplyChainCaseStudyTemplate"),
    "demand sensing": () => import("@/components/caseStudy/template/GroundswellCaseStudyTemplate"),
    "repair operations": () => import("@/components/caseStudy/template/ShopFloorCaseStudyTemplate"),
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
    /** Switch the window to another project (a case study's "Next project"). */
    onOpenProject?: (name: string) => void;
    layoutId: string;
}
export default function ExpandedProject({ projectName, onClose, onOpenProject, layoutId }: ExpandedProjectProps) {
    const nav = React.useMemo(
        () => ({ openProject: onOpenProject ?? (() => {}), close: onClose }),
        [onOpenProject, onClose],
    );

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
                        {/* Keyed by project: switching to the next one starts it
                            at the top, with a short fade. */}
                        <motion.div
                            key={projectName}
                            className={classes.content}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            style={key === 'insure-tech'
                                ? { overflow: 'hidden', position: 'relative' }
                                : undefined}
                        >
                            <CaseStudyNavContext.Provider value={nav}>
                            {CaseStudy ? <CaseStudy /> : (
                                <div style={{ padding: "60px", textAlign: "center", color: "rgba(0,0,0,0.5)" }}>
                                    Case study for {projectName} is currently under construction.
                                </div>
                            )}
                            </CaseStudyNavContext.Provider>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
