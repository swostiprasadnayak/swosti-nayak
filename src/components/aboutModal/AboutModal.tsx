/**
 * AboutModal.tsx
 *
 * Modal that displays personal information about the portfolio owner.
 * Triggered via the "About" nav item in the sidebar.
 * Layout: macOS window chrome → two-panel body (gradient left / bio right)
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
                    {/* Backdrop */}
                    <motion.div
                        className={classes.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        onClick={closeModal}
                    />

                    {/* Modal Container */}
                    <div className={classes.modalContainer}>
                        <motion.div
                            className={classes.modalWrapper}
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
                        >
                            <Squircle className={classes.modal} cornerRadius={20}>

                                {/* ── macOS Window Title Bar ── */}
                                <div className={classes.titleBar}>
                                    <div className={classes.trafficLights}>
                                        {/* Red – close */}
                                        <button
                                            className={classes.dot}
                                            style={{ background: "#FF5F56" }}
                                            onClick={closeModal}
                                            aria-label="Close"
                                        >
                                            <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#4A0002" strokeWidth="1.25" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        {/* Yellow – minimise (inert) */}
                                        <span className={classes.dot} style={{ background: "#FFBD2E" }} />
                                        {/* Green – maximise (inert) */}
                                        <span className={classes.dot} style={{ background: "#27C93F" }} />
                                    </div>

                                    {/* Centred window title */}
                                    <span className={classes.titleBarLabel}>About</span>

                                    {/* Right spacer to keep title centred */}
                                    <div className={classes.titleBarSpacer} />
                                </div>

                                {/* ── Two-panel body ── */}
                                <div className={classes.body}>

                                    {/* Content wrapper for scrolling */}
                                    <div className={classes.contentWrapper}>

                                        {/* Mask group — horizontal container for left & right panels */}
                                        <div className={classes.maskGroup}>

                                            {/* LEFT PANEL — gradient image + article teaser */}
                                            <Squircle className={classes.leftPanel} cornerRadius={12}>
                                                <img
                                                    src="/about-gradient.jpg"
                                                    alt="Abstract green gradient"
                                                    className={classes.gradientBg}
                                                    draggable={false}
                                                />
                                                {/* Bottom scrim for text legibility */}
                                                <div className={classes.leftOverlay} />

                                                {/* "About" label — top left */}
                                                <span className={classes.aboutLabel}>About</span>

                                                {/* Article teaser — bottom */}
                                                <div className={classes.teaserBlock}>
                                                    <span className={classes.teaserEyebrow}>What if...</span>
                                                    <p className={classes.teaserTitle}>
                                                        I thought I knew Product Design. Then I joined an AI Team
                                                    </p>
                                                </div>
                                            </Squircle>

                                            {/* RIGHT PANEL — bio */}
                                            <div className={classes.rightPanel}>
                                                {/* Name + verified badge */}
                                                <div className={classes.nameRow}>
                                                    <span className={classes.name}>Swosti</span>
                                                    <svg
                                                        className={classes.verifiedBadge}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-label="Verified"
                                                    >
                                                        <circle cx="10" cy="10" r="10" fill="#1D9BF0" />
                                                        <path
                                                            d="M5.5 10.5L8.5 13.5L14.5 7.5"
                                                            stroke="white"
                                                            strokeWidth="1.75"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>

                                                {/* Bio container — paragraphs + CTA */}
                                                <div className={classes.bioContainer}>
                                                    <p className={classes.bioParagraph}>
                                                        I&apos;m a Product Designer with 2+ years crafting clear, scalable digital experiences.
                                                    </p>
                                                    <p className={classes.bioParagraph}>
                                                        I blend UX research, design, and strategy to solve complex problems and build enjoyable products.
                                                    </p>
                                                    <p className={classes.bioParagraph}>
                                                        Passionate about reducing friction and creating impact, I&apos;m eager to join teams shaping thoughtful, high-impact digital journeys.
                                                    </p>

                                                    {/* CTA */}
                                                    <p className={classes.cta}>
                                                        Let&apos;s create something meaningful together.{" "}
                                                        <span role="img" aria-label="grinning face">😄</span>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

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
