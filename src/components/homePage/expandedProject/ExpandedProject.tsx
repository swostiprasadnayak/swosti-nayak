"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TrafficLights from "@/components/card/trafficLights/trafficLights";
import CaseStudyTemplate from "@/components/caseStudy/template/CaseStudyTemplate";
import UnicefCaseStudyTemplate from "@/components/caseStudy/template/UnicefCaseStudyTemplate";
import BlinkitCaseStudyTemplate from "@/components/caseStudy/template/BlinkitCaseStudyTemplate";
import GCDentalCaseStudyTemplate from "@/components/caseStudy/template/GCDentalCaseStudyTemplate";
import classes from "./expandedProject.module.css";
interface ExpandedProjectProps {
    projectName: string | null;
    onClose: () => void;
    layoutId: string;
}
export default function ExpandedProject({ projectName, onClose, layoutId }: ExpandedProjectProps) {
    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (projectName) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
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
                    >
                        <div className={classes.header}>
                            <TrafficLights onClose={onClose} visible={true} />
                            <span className={classes.windowTitle}>{projectName}</span>
                            <div className={classes.trafficLightsPlaceholder} />
                        </div>
                        <div className={classes.content}>
                            {(projectName?.toLowerCase() === 'syne' || projectName?.toLowerCase() === 'surrounding') && <CaseStudyTemplate />}
                            {projectName?.toLowerCase() === 'unicef' && <UnicefCaseStudyTemplate />}
                            {projectName?.toLowerCase() === 'blinkit' && <BlinkitCaseStudyTemplate />}
                            {(projectName?.toLowerCase() === 'gc dental' || projectName?.toLowerCase() === 'gc-dental') && <GCDentalCaseStudyTemplate />}
                            {/* Fallback for other projects temporarily */}
                            {projectName && projectName.toLowerCase() !== 'syne' && projectName.toLowerCase() !== 'surrounding' && projectName.toLowerCase() !== 'unicef' && projectName.toLowerCase() !== 'blinkit' && projectName.toLowerCase() !== 'gc dental' && projectName.toLowerCase() !== 'gc-dental' && (
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
