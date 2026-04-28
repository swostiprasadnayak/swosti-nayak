"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings2, Image as ImageIcon, Camera } from "lucide-react";
import { useViewport } from "@/app/contexts/ViewportContext";
import { useControlsRow } from "@/components/homePage/projectControls/controlsRow/controlsRow";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import ControlButton from "@/components/ui/controlButton/controlButton";
import ToggleCard from "./toggleCard/toggleCard";
import MusicCard from "./musicCard/musicCard";
import BrightnessSlider from "./brightnessSlider/brightnessSlider";
import classes from "./controlPanel.module.css";

// Shutter sound for screenshot feedback
let shutterSound: HTMLAudioElement | null = null;
function playShutterSound() {
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
    const player = useMusicPlayer(isOpen);

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

    const handleBrightnessChange = useCallback((percent: number) => {
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
            <audio ref={player.audioRef} preload={audioPreload} />

            <ControlButton
                tooltip="Controls"
                disabled={isOpen}
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
                        <div className={classes.topRow}>
                            <div className={classes.toggleColumn}>
                                <ToggleCard
                                    icon={<ImageIcon size={17} strokeWidth={2} />}
                                    label={`Image ${imageIndex}`}
                                    isActive={imageIndex === 2}
                                    onClick={onImageToggle ?? (() => { })}
                                />
                                <ToggleCard
                                    icon={<Camera size={17} strokeWidth={2} />}
                                    label="Screenshot"
                                    isActive={false}
                                    onClick={() => {
                                        playShutterSound();
                                        setIsOpen(false);
                                        onScreenshot?.(); // Fires instantly now
                                    }}
                                />
                            </div>
                            <div className={classes.musicWrapper}>
                                <MusicCard player={player} />
                            </div>
                        </div>
                        <BrightnessSlider onBrightnessChange={handleBrightnessChange} isOpen={isOpen} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlPanel;
