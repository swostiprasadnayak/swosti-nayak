"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFeedbackModal } from "@/app/contexts/FeedbackModalContext";
import classes from "./feedbackPopup.module.css";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;

const FeedbackPopup: React.FC = () => {
    const { isOpen, openModal } = useFeedbackModal();
    const [isVisible, setIsVisible] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);

    // Show popup after 3 minutes (180,000 ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasDismissed && !isOpen) {
                setIsVisible(true);
            }
        }, 180000); // 3 minutes

        return () => clearTimeout(timer);
    }, [hasDismissed, isOpen]);

    // Close popup automatically if the user opens the modal from somewhere else
    useEffect(() => {
        if (isOpen) {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleOpenFeedback = () => {
        setIsVisible(false);
        setHasDismissed(true);
        openModal();
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false);
        setHasDismissed(true);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={classes.popupContainer}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                >
                    {/* macOS Title Bar */}
                    <div className={classes.titleBar}>
                        <div className={classes.trafficLights}>
                            {/* Red – close */}
                            <button
                                className={classes.dot}
                                style={{ background: "#FF5F56" }}
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#4A0002" strokeWidth="1.25" strokeLinecap="round" />
                                </svg>
                            </button>
                            {/* Yellow – inert */}
                            <span className={classes.dot} style={{ background: "#FFBD2E" }} />
                            {/* Green – inert */}
                            <span className={classes.dot} style={{ background: "#27C93F" }} />
                        </div>
                        <span className={classes.titleBarLabel}>Feedback</span>
                        <div className={classes.titleBarSpacer} />
                    </div>

                    <div className={classes.body}>
                        <div className={classes.backgroundOverlay} />
                        <div className={classes.content}>
                            <h4 className={classes.title}>Feedback</h4>
                            <p className={classes.description}>
                                One honest sentence from you reshaped the next version.
                            </p>
                            <button className={classes.actionBtn} onClick={handleOpenFeedback}>
                                Enjoying Experience?
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(FeedbackPopup);
