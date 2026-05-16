"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Squircle } from "corner-smoothing";
import { useFeedbackModal } from "@/app/contexts/FeedbackModalContext";
import classes from "./feedbackModal.module.css";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;

type Rating = "Bad" | "Decent" | "Love it" | null;

const RATINGS: { label: Rating & string; emoji: string }[] = [
    { label: "Bad", emoji: "😖" },
    { label: "Decent", emoji: "😊" },
    { label: "Love it", emoji: "😍" },
];

const FeedbackModal: React.FC = () => {
    const { isOpen, closeModal } = useFeedbackModal();
    const [rating, setRating] = useState<Rating>(null);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    /* Reset state when modal closes */
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setRating(null);
                setMessage("");
                setSubmitting(false);
                setSubmitted(false);
            }, 350);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    /* Escape key */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, closeModal]);

    const handleSubmit = async () => {
        if (!rating || submitting) return;
        setSubmitting(true);
        try {
            await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, message }),
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Failed to submit feedback:", err);
        } finally {
            setSubmitting(false);
        }
    };

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

                                    <span className={classes.titleBarLabel}>Feedback</span>
                                    <div className={classes.titleBarSpacer} />
                                </div>

                                {/* ── Body ── */}
                                <div className={classes.body}>
                                    <div className={classes.contentWrapper}>
                                        <div className={classes.maskGroup}>

                                            {/* LEFT PANEL — gradient */}
                                            <Squircle className={classes.leftPanel} cornerRadius={12}>
                                                <div className={classes.leftOverlay} />

                                                <span className={classes.feedbackLabel}>Feedback</span>

                                                <div className={classes.teaserBlock}>
                                                    <span className={classes.teaserEyebrow}>Why it matters..</span>
                                                    <p className={classes.teaserTitle}>
                                                        One honest sentence from you reshaped the next version.
                                                    </p>
                                                </div>
                                            </Squircle>

                                            {/* RIGHT PANEL */}
                                            <AnimatePresence mode="wait">
                                                {submitted ? (
                                                    /* ── Success state ── */
                                                    <motion.div
                                                        key="success"
                                                        className={classes.successPanel}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
                                                    >
                                                        <p className={classes.successTitle}>Received</p>
                                                        <p className={classes.successBody}>
                                                            Thank you — every word is read.<br />
                                                            Your note quietly nudges the next version into shape.
                                                        </p>
                                                    </motion.div>
                                                ) : (
                                                    /* ── Form state ── */
                                                    <motion.div
                                                        key="form"
                                                        className={classes.rightPanel}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
                                                    >
                                                        <p className={classes.ratingLabel}>Rate your experience</p>

                                                        <div className={classes.ratingButtons}>
                                                            {RATINGS.map(({ label, emoji }) => (
                                                                <button
                                                                    key={label}
                                                                    className={`${classes.ratingBtn} ${rating === label ? classes.selected : ""}`}
                                                                    onClick={() => setRating(label as Rating)}
                                                                >
                                                                    <span className={classes.ratingEmoji}>{emoji}</span>
                                                                    <span className={classes.ratingText}>{label}</span>
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <textarea
                                                            className={classes.textarea}
                                                            placeholder="Tell us more (optional)"
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            rows={3}
                                                        />

                                                        <button
                                                            className={classes.submitBtn}
                                                            onClick={handleSubmit}
                                                            disabled={!rating || submitting}
                                                        >
                                                            {submitting ? "Sending…" : "Submit your feedback"}
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

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

export default React.memo(FeedbackModal);
