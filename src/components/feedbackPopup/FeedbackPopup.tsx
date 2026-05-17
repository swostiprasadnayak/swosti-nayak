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
                    <div className={classes.backgroundOverlay} />
                    
                    {/* Close Button */}
                    <button className={classes.closeBtn} onClick={handleClose} aria-label="Dismiss">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className={classes.content}>
                        <h4 className={classes.title}>Feedback</h4>
                        <p className={classes.description}>
                            One honest sentence from you reshaped the next version.
                        </p>
                        <button className={classes.actionBtn} onClick={handleOpenFeedback}>
                            Enjoying Experience?
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(FeedbackPopup);
