"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import classes from "./mobileControls.module.css";
import { Menu, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import AssistiveTouch from "./AssistiveTouch";
import ControlCenterGrid from "@/components/homePage/projectControls/controlPanel/controlCenterGrid/ControlCenterGrid";
import { useAboutModal } from "@/app/contexts/AboutModalContext";
import { useFeedbackModal } from "@/app/contexts/FeedbackModalContext";
import { useTheme } from "@/app/contexts/ThemeContext";

interface MobileControlsProps {
  onVoiceMode?: () => void;
  imageIndex?: number;
  onImageToggle?: () => void;
  onScreenshot?: () => void;
  onShowPosts?: () => void;
}

// Shutter sound for screenshot feedback
let shutterSound: HTMLAudioElement | null = null;
function playShutterSound() {
    if (!shutterSound) shutterSound = new Audio("/shutter.mp3");
    shutterSound.currentTime = 0;
    shutterSound.play().catch(() => { });
}

// Colours for the mobile menu + Control Center. The floating buttons and the
// menu use the dock's glass (dock.module.css .dockBgFill: 28% white / dark
// --bg-glass, blur(28px) saturate(160%)); the Control Center sheet mirrors the
// desktop control panel.
const DOCK_BLUR = "blur(28px) saturate(160%)";

const DARK_UI = {
  fabBg: "rgba(28, 28, 30, 0.45)",
  fabBorder: "1px solid var(--border-subtle)",
  fabShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  text: "#ffffff",
  textStrong: "rgba(255, 255, 255, 0.95)",
  menuBg: "rgba(28, 28, 30, 0.45)",
  menuBorder: "1px solid var(--border-subtle)",
  menuShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  itemHover: "rgba(255, 255, 255, 0.08)",
  divider: "rgba(255, 255, 255, 0.1)",
  iconColor: "rgba(255, 255, 255, 0.85)",
  sheetBackdrop: "rgba(0, 0, 0, 0.4)",
  sheetBg: "rgba(255, 255, 255, 0.12)",
  sheetBorder: "1px solid rgba(255, 255, 255, 0.2)",
  sheetShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
};

const LIGHT_UI: typeof DARK_UI = {
  fabBg: "rgba(255, 255, 255, 0.28)",
  fabBorder: "1px solid var(--border-subtle)",
  fabShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  text: "#111827",
  textStrong: "rgba(0, 0, 0, 0.85)",
  menuBg: "rgba(255, 255, 255, 0.28)",
  menuBorder: "1px solid var(--border-subtle)",
  menuShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  itemHover: "rgba(0, 0, 0, 0.05)",
  divider: "rgba(0, 0, 0, 0.08)",
  iconColor: "rgba(0, 0, 0, 0.7)",
  sheetBackdrop: "rgba(0, 0, 0, 0.15)",
  sheetBg: "rgba(232, 234, 240, 0.72)",
  sheetBorder: "1px solid rgba(255, 255, 255, 0.6)",
  sheetShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

export default function MobileControls({
  onVoiceMode,
  imageIndex = 1,
  onImageToggle,
  onScreenshot,
  onShowPosts,
}: MobileControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isControlOpen, setIsControlOpen] = useState(false);
  const { isDark } = useTheme();
  const ui = isDark ? DARK_UI : LIGHT_UI;
  const { audioRef, audioEvents, ...player } = useMusicPlayer();

  const { openModal: openAboutModal } = useAboutModal();
  const { openModal: openFeedbackModal } = useFeedbackModal();

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

  // Kept here (not in the slider) so the level survives closing the sheet.
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

  return (
    <div className={classes.controlsWrapper}>
      <audio ref={audioRef} {...audioEvents} src={player.track?.src} preload="metadata" />

      {/* 1. TOP RIGHT: Hamburger Menu Trigger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        title="Menu"
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: ui.fabBg,
          backdropFilter: DOCK_BLUR,
          WebkitBackdropFilter: DOCK_BLUR,
          border: ui.fabBorder,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: ui.text,
          boxShadow: ui.fabShadow,
          pointerEvents: "auto",
          zIndex: 101,
          cursor: "pointer"
        }}
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {/* 2. AssistiveTouch-style button: draggable, snaps to an edge, opens
          Control Center. Hidden while the sheet is open, like on iOS. */}
      {!isControlOpen && <AssistiveTouch onTap={() => setIsControlOpen(true)} />}

      {/* Hamburger Navigation Overlay & Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              // Tap-outside-to-close layer only: the menu is a popover, so the
              // page behind stays sharp (only Control Center blurs the page).
              style={{
                position: "fixed",
                inset: 0,
                background: "transparent",
                zIndex: 9998,
                pointerEvents: "auto"
              }}
            />

            {/* Premium Glassmorphic Dropdown List */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "80px",
                right: "24px",
                width: "200px",
                background: ui.menuBg,
                backdropFilter: DOCK_BLUR,
                WebkitBackdropFilter: DOCK_BLUR,
                border: ui.menuBorder,
                borderRadius: "20px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                boxShadow: ui.menuShadow,
                zIndex: 9999,
                pointerEvents: "auto",
                boxSizing: "border-box"
              }}
            >
              <button
                onClick={() => { setIsMenuOpen(false); openAboutModal(); }}
                style={{
                  background: "none",
                  border: "none",
                  color: ui.text,
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                About
              </button>

              <button
                onClick={() => { setIsMenuOpen(false); onShowPosts?.(); }}
                style={{
                  background: "none",
                  border: "none",
                  color: ui.text,
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                Post
              </button>

              <a
                href="https://drive.google.com/file/d/14YY_rBCgFy0uUpNo_cUCu-8gag671-Mv/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ui.text,
                  padding: "10px 12px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  display: "block",
                  transition: "background 0.15s ease",
                  width: "100%",
                  boxSizing: "border-box"
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                Resume
              </a>

              <button
                onClick={() => { setIsMenuOpen(false); openFeedbackModal(); }}
                style={{
                  background: "none",
                  border: "none",
                  color: ui.text,
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                Feedback
              </button>

              {/* Divider */}
              <div style={{ height: "1px", background: ui.divider, margin: "8px 0" }} />

              {/* Socials & Contact — real brand glyphs */}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 6px" }}>
                <a
                  href="https://www.linkedin.com/in/swosti-nayak-49b2ba131"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: ui.iconColor, display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  {/* LinkedIn glyph (Simple Icons path) */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/swosti_2001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: ui.iconColor, display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  title="Instagram"
                  aria-label="Instagram"
                >
                  {/* Instagram glyph (Simple Icons path) */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a
                  href="tel:7978659329"
                  style={{ color: ui.iconColor, display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = ui.itemHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  title="Call"
                  aria-label="Call"
                >
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Control Center Overlay (iOS Control Center) */}
      <AnimatePresence>
        {isControlOpen && (
          <>
            {/* Blurred Backdrop overlay */}
            <motion.div
              className={classes.overlay}
              onClick={() => setIsControlOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                background: ui.sheetBackdrop,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                zIndex: 9999,
                pointerEvents: "auto"
              }}
            />

            {/* iOS Control Center Card */}
            <motion.div
              className={classes.modalContent}
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "calc(-50% + 30px)" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "calc(-50% + 30px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "320px",
                background: ui.sheetBg,
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: ui.sheetBorder,
                borderRadius: "32px",
                padding: "20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                zIndex: 10000,
                boxShadow: ui.sheetShadow,
                color: ui.text,
                pointerEvents: "auto"
              }}
            >
              <ControlCenterGrid
                player={player}
                brightness={brightness}
                onBrightnessChange={handleBrightnessChange}
                imageIndex={imageIndex}
                onImageToggle={onImageToggle}
                onVoiceMode={() => { setIsControlOpen(false); onVoiceMode?.(); }}
                onScreenshot={() => {
                  playShutterSound();
                  setIsControlOpen(false);
                  onScreenshot?.();
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
