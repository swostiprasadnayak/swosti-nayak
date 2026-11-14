"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { getA11yPrefs } from "@/app/hooks/useA11yPrefs";
import { motion, AnimatePresence } from "motion/react";
import { Settings2 } from "lucide-react";
import { useViewport } from "@/app/contexts/ViewportContext";
import { useControlsRow } from "@/components/homePage/projectControls/controlsRow/controlsRow";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import ControlButton from "@/components/ui/controlButton/controlButton";
import ControlCenterGrid from "./controlCenterGrid/ControlCenterGrid";
import classes from "./controlPanel.module.css";

// Shutter sound for screenshot feedback
let shutterSound: HTMLAudioElement | null = null;
function playShutterSound() {
    if (getA11yPrefs().muteSounds) return; // Accessibility → Hearing
    if (!shutterSound) shutterSound = new Audio("/shutter.mp3");
    shutterSound.currentTime = 0;
    shutterSound.play().catch(() => { });
}

interface ControlPanelProps {
    imageIndex?: number;
    onImageToggle?: () => void;
    onScreenshot?: () => void;
    onPanelHover?: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    imageIndex = 1,
    onImageToggle,
    onScreenshot,
    onPanelHover,
}) => {
    const { isMobile, mounted } = useViewport();
    const { reportOpen } = useControlsRow();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            reportOpen(true);
            return () => reportOpen(false);
        }
    }, [isOpen, reportOpen]);

    const [audioPreload, setAudioPreload] = useState<"none" | "auto">("none");
    const { audioRef, audioEvents, ...player } = useMusicPlayer();

    const handlePrefetch = useCallback(() => {
        onPanelHover?.();
        setAudioPreload("auto");
    }, [onPanelHover]);

    const overlayRef = useRef<HTMLDivElement | null>(null);

    const ensureOverlay = useCallback(() => {
        if (overlayRef.current) return overlayRef.current;
        const el = document.createElement("div");
        Object.assign(el.style, {
            position: "fixed", inset: "0", background: "black", opacity: "0",
            pointerEvents: "none", zIndex: "9998", transition: "opacity 150ms ease",
        });
        document.body.appendChild(el);
        overlayRef.current = el;
        return el;
    }, []);

    // Kept here (not in the slider) so the level survives closing the panel.
    const [brightness, setBrightness] = useState(100);

    const handleBrightnessChange = useCallback((percent: number) => {
        setBrightness(percent);
        const overlay = ensureOverlay();
        const targetOpacity = percent >= 100 ? 0 : (1 - percent / 100) * 0.85;
        overlay.style.opacity = String(targetOpacity);
    }, [ensureOverlay]);

    useEffect(() => {
        return () => {
            if (overlayRef.current) {
                overlayRef.current.remove();
                overlayRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: PointerEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [isOpen]);

    if (!mounted || isMobile) return null;

    return (
        <div className={classes.container} ref={containerRef} onMouseEnter={handlePrefetch}>
            <audio ref={audioRef} {...audioEvents} src={player.track?.src} preload={audioPreload} />

            <ControlButton
                onClick={() => setIsOpen(!isOpen)}
                ariaExpanded={isOpen}
                ariaLabel="Open control panel"
            >
                <Settings2 size={20} strokeWidth={2} />
            </ControlButton>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={classes.dropdown}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{
                            opacity: 1, scale: 1,
                            transition: { scale: { type: "spring", bounce: 0, duration: 0.3 }, opacity: { duration: 0.08 } }
                        }}
                        exit={{
                            opacity: 0, scale: 1.05,
                            transition: { type: "spring", bounce: 0, duration: 0.3 }
                        }}
                    >
                        <ControlCenterGrid
                            player={player}
                            brightness={brightness}
                            onBrightnessChange={handleBrightnessChange}
                            imageIndex={imageIndex}
                            onImageToggle={onImageToggle}
                            onScreenshot={() => {
                                playShutterSound();
                                setIsOpen(false);
                                onScreenshot?.();
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlPanel;
