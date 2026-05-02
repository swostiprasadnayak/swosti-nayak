"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import classes from "./introOverlay.module.css";

const STORAGE_KEY = "swosti_intro_seen";

// Speech content segments for the typing effect
const SPEECH_SEGMENTS = [
  { type: "title", text: "Welcome to my digital workspace.." },
  {
    type: "paragraph",
    parts: [
      { text: "I'm " },
      { text: "Swosti", bold: true },
      { text: ", a product designer crafting AI-native interfaces. Everything you see here isn't just a mockup — it's a live, interactive prototype." },
    ],
  },
  {
    type: "paragraph",
    parts: [
      { text: "Grab the sliders, open the case studies, and explore." },
    ],
  },
];

function getTotalChars(): number {
  let total = 0;
  for (const seg of SPEECH_SEGMENTS) {
    if (seg.type === "title") {
      total += (seg.text as string).length;
    } else {
      for (const part of (seg as any).parts) {
        total += part.text.length;
      }
    }
  }
  return total;
}

function renderPartialText(charCount: number) {
  let remaining = charCount;
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < SPEECH_SEGMENTS.length; i++) {
    const seg = SPEECH_SEGMENTS[i];
    if (remaining <= 0) break;

    if (seg.type === "title") {
      const text = seg.text as string;
      const slice = text.slice(0, remaining);
      remaining -= slice.length;
      elements.push(
        <h2 key={`title-${i}`} className={classes.speechTitle}>
          {slice}
          {remaining <= 0 && <span className={classes.cursor} />}
        </h2>
      );
    } else {
      const parts = (seg as any).parts as { text: string; bold?: boolean }[];
      const partElements: React.ReactNode[] = [];

      for (let j = 0; j < parts.length; j++) {
        if (remaining <= 0) break;
        const part = parts[j];
        const slice = part.text.slice(0, remaining);
        remaining -= slice.length;

        if (part.bold) {
          partElements.push(
            <span key={`b-${i}-${j}`} className={classes.bold}>{slice}</span>
          );
        } else {
          partElements.push(
            <React.Fragment key={`t-${i}-${j}`}>{slice}</React.Fragment>
          );
        }

        if (remaining <= 0) {
          partElements.push(
            <span key={`cursor-${i}-${j}`} className={classes.cursor} />
          );
        }
      }

      elements.push(
        <p key={`p-${i}`} className={classes.speechText}>{partElements}</p>
      );
    }
  }

  return elements;
}

const IntroOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalChars = getTotalChars();

  // Only show on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setIsVisible(true);
    }
  }, []);

  // Start video silently on mount (no audio yet — browsers allow muted autoplay)
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  // User clicks to start audio + typing
  const handleStart = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.warn("Audio playback failed:", e);
      });
    }

    // Start typing effect after a small delay
    setTimeout(() => {
      const CHAR_DELAY = 35;
      let current = 0;

      intervalRef.current = setInterval(() => {
        current++;
        setCharCount(current);
        if (current >= totalChars) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, CHAR_DELAY);
    }, 300);
  }, [hasStarted, totalChars]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsVisible(false);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={classes.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={!hasStarted ? handleStart : undefined}
        >
          {/* Separate blur layer for reliable backdrop-filter */}
          <div className={classes.blurLayer} />

          {/* Hidden audio */}
          <audio ref={audioRef} src="/audio/intro-voice.mp3" preload="auto" />

          {/* Center Group: Avatar + Connector + Speech Bubble */}
          <div className={classes.content}>
            <div className={classes.centerGroup}>

              {/* Avatar Video */}
              <motion.div
                className={classes.avatarContainer}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                <video
                  ref={videoRef}
                  className={classes.avatarVideo}
                  src="/videos/intro-avatar.webm"
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </motion.div>

              {/* Connector dot */}
              {hasStarted && (
                <motion.div
                  className={classes.connector}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              )}

              {/* Speech Bubble */}
              {hasStarted && (
                <motion.div
                  className={classes.speechBubble}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
                >
                  {/* Close button on the bubble */}
                  <button
                    className={classes.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    aria-label="Close introduction"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>

                  {renderPartialText(charCount)}
                </motion.div>
              )}
            </div>

            {/* Click to start prompt (before audio starts) */}
            {!hasStarted && (
              <motion.div
                className={classes.startPrompt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className={classes.startText}>Click anywhere to begin</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroOverlay);
