/**
* ScreenshotThumbnail.tsx
*
* Displays a floating thumbnail preview after a screenshot is captured.
* Appears in the bottom-right corner with a spring entrance animation.
*/

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Squircle } from "corner-smoothing";
import classes from "./screenshotThumbnail.module.css";

interface ScreenshotThumbnailProps {
    url: string | null;
    captureKey: number;
    onDismiss: () => void;
}

const DISMISS_DELAY = 5000;

const ScreenshotThumbnail: React.FC<ScreenshotThumbnailProps> = ({
    url,
    captureKey,
    onDismiss,
}) => {
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        if (!url) return;
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(onDismiss, DISMISS_DELAY);
        return () => clearTimeout(timerRef.current);
    }, [url, captureKey, onDismiss]);

    const handleClick = useCallback(() => {
        if (!url) return;
        const link = document.createElement("a");
        link.download = `screenshot-${Date.now()}.png`;
        link.href = url;
        link.click();
    }, [url]);

    return (
        <AnimatePresence>
            {url && (
                <motion.div
                    key={captureKey}
                    data-screenshot-exclude
                    className={classes.container}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        transition: { type: "spring", bounce: 0.15, duration: 0.35 },
                    }}
                    exit={{
                        x: 300,
                        opacity: 0,
                        transition: { type: "spring", bounce: 0, duration: 0.6 },
                    }}
                    onClick={handleClick}
                    whileHover={{ scale: 1.03 }}
                >
                    <Squircle cornerRadius={12} className={classes.thumbnailCard}>
                        <Squircle cornerRadius={7} className={classes.imageWrapper}>
                            <img
                                src={url}
                                className={classes.thumbnailImage}
                                alt="Screenshot"
                                draggable={false}
                            />
                        </Squircle>
                    </Squircle>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(ScreenshotThumbnail);
