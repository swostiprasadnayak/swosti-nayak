"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import classes from "./introOverlay.module.css";

const STORAGE_KEY = "swosti_intro_seen";

// The speech content — broken into segments for the typing effect
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

// Flatten all text to compute total character count for the typing effect
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

// Render partial text up to `charCount` characters across all segments
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
      let paragraphComplete = false;

      for (let j = 0; j < parts.length; j++) {
        if (remaining <= 0) break;
        const part = parts[j];
        const slice = part.text.slice(0, remaining);
        remaining -= slice.length;

        if (part.bold) {
          partElements.push(
            <span key={`b-${i}-${j}`} className={classes.bold}>
              {slice}
            </span>
          );
        } else {
          partElements.push(<React.Fragment key={`t-${i}-${j}`}>{slice}</React.Fragment>);
        }

        if (remaining <= 0) {
          partElements.push(<span key={`cursor-${i}-${j}`} className={classes.cursor} />);
        }
      }

      // Check if all parts have been fully rendered
      let totalPartsLen = 0;
      for (const p of parts) totalPartsLen += p.text.length;
      paragraphComplete = charCount >= totalPartsLen;

      elements.push(
        <p key={`p-${i}`} className={classes.speechText}>
          {partElements}
        </p>
      );
    }
  }

  return elements;
}

const IntroOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalChars = getTotalChars();

  // Check localStorage on mount — only show if first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setIsVisible(true);
    }
  }, []);

  // Start typing animation + audio when visible
  useEffect(() => {
    if (!isVisible) return;

    // Small delay before starting typing
    const startDelay = setTimeout(() => {
      // Start audio playback
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }

      // Typing speed: ~40ms per character
      const CHAR_DELAY = 35;
      let currentChar = 0;

      const interval = setInterval(() => {
        currentChar++;
        setCharCount(currentChar);
        if (currentChar >= totalChars) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, CHAR_DELAY);

      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(startDelay);
  }, [isVisible, totalChars]);

  // Start video playback when visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  const handleClose = useCallback(() => {
    // Mark as seen
    localStorage.setItem(STORAGE_KEY, "true");
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsVisible(false);
  }, []);

  // Handle Escape key
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={classes.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Hidden audio element */}
          <audio ref={audioRef} src="/audio/intro-voice.mp3" preload="auto" />

          {/* Close button */}
          <button
            className={classes.closeButton}
            onClick={handleClose}
            aria-label="Close introduction"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Content: Avatar + Speech Bubble */}
          <div className={classes.content}>
            {/* Avatar Video */}
            <motion.div
              className={classes.avatarContainer}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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

            {/* Speech Bubble */}
            <motion.div
              className={classes.speechBubble}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              {renderPartialText(charCount)}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroOverlay);
