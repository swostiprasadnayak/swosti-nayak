"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import classes from "./mobileControls.module.css";
import { Menu, AudioLines, Image as ImageIcon, Camera, X } from "lucide-react";
import ThemeToggle from "@/components/homePage/projectControls/themeToggle/themeToggle";
import CodeRevealToggle from "@/components/homePage/projectControls/codeRevealToggle/codeRevealToggle";
import { AnimatePresence, motion } from "motion/react";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import MusicCard from "@/components/homePage/projectControls/controlPanel/musicCard/musicCard";
import BrightnessSlider from "@/components/homePage/projectControls/controlPanel/brightnessSlider/brightnessSlider";

interface MobileControlsProps {
  onVoiceMode?: () => void;
  imageIndex?: number;
  onImageToggle?: () => void;
  onScreenshot?: () => void;
}

// Shutter sound for screenshot feedback
let shutterSound: HTMLAudioElement | null = null;
function playShutterSound() {
    if (!shutterSound) shutterSound = new Audio("/shutter.mp3");
    shutterSound.currentTime = 0;
    shutterSound.play().catch(() => { });
}

export default function MobileControls({
  onVoiceMode,
  imageIndex = 1,
  onImageToggle,
  onScreenshot,
}: MobileControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const player = useMusicPlayer(isMenuOpen);

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

  return (
    <div className={classes.controlsWrapper}>
      <audio ref={player.audioRef} src={player.track?.src} preload="auto" />
      {/* Menu button */}
      <div className={classes.menuContainer}>
        <button
          className={classes.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="More"
        >
          <Menu size={20} />
        </button>

        {/* Full-screen iOS-like Control Center overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Blurred Backdrop overlay */}
              <motion.div
                className={classes.overlay}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  zIndex: 9999,
                }}
              />

              {/* iOS Control Center Card */}
              <motion.div
                className={classes.modalContent}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: "360px",
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "32px",
                  padding: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  zIndex: 10000,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  color: "#ffffff"
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255, 255, 255, 0.95)", letterSpacing: "-0.01em" }}>Control Center</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Grid row: 2x2 buttons and Music Card */}
                <div style={{ display: "flex", gap: "16px", height: "160px" }}>
                  {/* 2x2 grid container */}
                  <div style={{
                    width: "140px",
                    background: "rgba(0, 0, 0, 0.25)",
                    borderRadius: "24px",
                    padding: "12px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                    boxSizing: "border-box",
                    height: "100%"
                  }}>
                    {/* 1. Theme Toggle */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                      <ThemeToggle />
                    </div>

                    {/* 2. Voice Toggle */}
                    <button
                      onClick={() => { setIsMenuOpen(false); onVoiceMode?.(); }}
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "none",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%"
                      }}
                      title="Voice Mode"
                    >
                      <AudioLines size={20} strokeWidth={2} />
                    </button>

                    {/* 3. Image Toggle (Wallpaper changer) */}
                    <button
                      onClick={onImageToggle}
                      style={{
                        background: imageIndex === 2 ? "rgba(255, 140, 130, 0.3)" : "rgba(255, 255, 255, 0.15)",
                        border: imageIndex === 2 ? "1px solid rgba(255, 140, 130, 0.5)" : "none",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: imageIndex === 2 ? "#ff8c82" : "#fff",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%"
                      }}
                      title={`Image ${imageIndex}`}
                    >
                      <ImageIcon size={20} strokeWidth={2} />
                    </button>

                    {/* 4. Screenshot */}
                    <button
                      onClick={() => {
                        playShutterSound();
                        setIsMenuOpen(false);
                        onScreenshot?.();
                      }}
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "none",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%"
                      }}
                      title="Take Screenshot"
                    >
                      <Camera size={20} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Right Music Player */}
                  <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
                    <MusicCard player={player} />
                  </div>
                </div>

                {/* Brightness Slider */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <BrightnessSlider onBrightnessChange={handleBrightnessChange} isOpen={isMenuOpen} />
                </div>

                {/* Code Reveal Toggle */}
                <div style={{ display: "flex", justifyContent: "center", width: "100%", background: "rgba(0, 0, 0, 0.15)", borderRadius: "20px", padding: "10px 0" }}>
                  <CodeRevealToggle />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
