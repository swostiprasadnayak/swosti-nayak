/**
* AboutModal.tsx
*
* Modal that displays personal information about the portfolio owner.
* Triggered via the "About" nav item in the sidebar.
*/

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Squircle } from "corner-smoothing";
import { useAboutModal } from "@/app/contexts/AboutModalContext";
import classes from "./aboutModal.module.css";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;

const AboutModal: React.FC = () => {
    const { isOpen, closeModal } = useAboutModal();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, closeModal]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={classes.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        onClick={closeModal}
                    />

                    <div className={classes.modalContainer}>
                        <motion.div
                            className={classes.modalWrapper}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
                        >
                            <Squircle className={classes.modal} cornerRadius={16}>
                                <div className={classes.windowHeader}>
                                    <div className={classes.trafficLights}>
                                        <button
                                            className={classes.trafficLight}
                                            style={{ background: "#FE5F57" }}
                                            onClick={closeModal}
                                            aria-label="Close"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#4A0002" strokeWidth="1.25" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <span className={classes.trafficLight} style={{ background: "#DFDFE2" }} />
                                        <span className={classes.trafficLight} style={{ background: "#DFDFE2" }} />
                                    </div>
                                    <span className={classes.windowTitle}>About</span>
                                    <div className={classes.trafficLightsPlaceholder} />
                                </div>

                                <div className={classes.contentArea}>
                                    <p className={classes.paragraph}>
                                        I’m a Product Designer who loves turning complex problems into clear, scalable, and meaningful digital experiences.
                                    </p>
                                    <p className={classes.paragraph}>
                                        Over the past 2+ years, I’ve worked across B2B and B2C products  from internal platforms to customer-facing solutions  leading UX from research to high-fidelity execution. My approach combines systems thinking, user psychology, and business strategy to design products that don’t just look good, but perform.
                                    </p>
                                    <p className={classes.paragraph}>
                                        <span className={classes.bold}>I specialize in:</span><br/>
                                        • UX Research & Discovery<br/>
                                        • Information Architecture & Experience Strategy<br/>
                                        • Interaction & Visual Design<br/>
                                        • Design Systems & Scalable Components<br/>
                                        • Cross-functional collaboration with Product & Engineering
                                    </p>
                                    <p className={classes.paragraph}>
                                        I’ve worked on platform integrations, feature redesigns, experience audits, and end-to-end journey improvements  always focusing on clarity, usability, and measurable impact.
                                    </p>
                                    <p className={classes.paragraph}>
                                        <span className={classes.bold}>What drives me?</span><br/>
                                        Designing systems that scale.<br/>
                                        Creating experiences that reduce friction.<br/>
                                        Building products that users actually enjoy using.
                                    </p>
                                    <p className={classes.paragraph}>
                                        Currently exploring opportunities where I can contribute to high-impact product teams building thoughtful, well-crafted digital experiences.
                                    </p>
                                    <p className={classes.paragraph}>
                                        <span className={classes.bold}>Let’s build something meaningful.</span>
                                    </p>
                                </div>
                            </Squircle>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default React.memo(AboutModal);
