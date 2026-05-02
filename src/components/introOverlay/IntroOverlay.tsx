"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import classes from "./introOverlay.module.css";

const STORAGE_KEY = "swosti_intro_seen";
const RESHOW_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

// Exact SVG connector line from Figma
const ConnectorSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="217" height="6" viewBox="0 0 217 6" fill="none">
    <path d="M-0.00260425 2.66797C-0.00260425 4.14073 1.1913 5.33464 2.66406 5.33464C4.13682 5.33464 5.33073 4.14073 5.33073 2.66797C5.33073 1.19521 4.13682 0.001302 2.66406 0.001302C1.1913 0.001302 -0.00260425 1.19521 -0.00260425 2.66797ZM2.66406 2.66797V3.16797H5.62934V2.66797V2.16797H2.66406V2.66797ZM11.5599 2.66797V3.16797H17.4905V2.66797V2.16797H11.5599V2.66797ZM23.421 2.66797V3.16797H29.3516V2.66797V2.16797H23.421V2.66797ZM35.2821 2.66797V3.16797H41.2127V2.66797V2.16797H35.2821V2.66797ZM47.1432 2.66797V3.16797H53.0738V2.66797V2.16797H47.1432V2.66797ZM59.0043 2.66797V3.16797H64.9349V2.66797V2.16797H59.0043V2.66797ZM70.8655 2.66797V3.16797H76.796V2.66797V2.16797H70.8655V2.66797ZM82.7266 2.66797V3.16797H88.6571V2.66797V2.16797H82.7266V2.66797ZM94.5877 2.66797V3.16797H100.518V2.66797V2.16797H94.5877V2.66797ZM106.449 2.66797V3.16797H112.379V2.66797V2.16797H106.449V2.66797ZM118.31 2.66797V3.16797H124.24V2.66797V2.16797H118.31V2.66797ZM130.171 2.66797V3.16797H136.102V2.66797V2.16797H130.171V2.66797ZM142.032 2.66797V3.16797H147.963V2.66797V2.16797H142.032V2.66797ZM153.893 2.66797V3.16797H159.824V2.66797V2.16797H153.893V2.66797ZM165.754 2.66797V3.16797H171.685V2.66797V2.16797H165.754V2.66797ZM177.615 2.66797V3.16797H183.546V2.66797V2.16797H177.615V2.66797ZM189.477 2.66797V3.16797H195.407V2.66797V2.16797H189.477V2.66797ZM201.338 2.66797V3.16797H207.268V2.66797V2.16797H201.338V2.66797ZM213.199 2.66797V3.16797H216.164V2.66797V2.16797H213.199V2.66797Z" fill="white"/>
  </svg>
);

// Speech content
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
    if (seg.type === "title") total += (seg.text as string).length;
    else for (const part of (seg as any).parts) total += part.text.length;
  }
  return total;
}

function renderPartialText(charCount: number, cls: typeof classes) {
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
        <h2 key={`title-${i}`} className={cls.speechTitle}>
          {slice}
          {remaining <= 0 && <span className={cls.cursor} />}
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
          partElements.push(<span key={`b-${i}-${j}`} className={cls.bold}>{slice}</span>);
        } else {
          partElements.push(<React.Fragment key={`t-${i}-${j}`}>{slice}</React.Fragment>);
        }
        if (remaining <= 0) {
          partElements.push(<span key={`cur-${i}-${j}`} className={cls.cursor} />);
        }
      }
      elements.push(<p key={`p-${i}`} className={cls.speechText}>{partElements}</p>);
    }
  }
  return elements;
}

const IntroOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const totalChars = getTotalChars();

  // Check if should show
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsVisible(true);
    } else {
      const lastSeen = parseInt(stored, 10);
      if (Date.now() - lastSeen > RESHOW_INTERVAL_MS) {
        setIsVisible(true);
      }
    }
  }, []);

  // Apply blur to page content behind overlay
  useEffect(() => {
    if (!isVisible) return;
    const mainEl = document.querySelector("main");
    if (!mainEl) return;
    const blurred: HTMLElement[] = [];
    Array.from(mainEl.children).forEach((child) => {
      const el = child as HTMLElement;
      if (!el.dataset.introOverlay) {
        el.style.filter = "blur(7px)";
        el.style.transition = "filter 0.4s ease";
        blurred.push(el);
      }
    });
    return () => { blurred.forEach((el) => { el.style.filter = ""; }); };
  }, [isVisible]);

  // ── Play media — attempt autoplay, unlock on first user interaction if blocked
  const playMedia = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    // Reset streams
    video.currentTime = 0;
    audio.currentTime = 0;

    // Attempt video (usually allows muted autoplay, but we want unmuted)
    video.play().then(() => {
      // If video started, try audio
      audio.play().catch(() => {
        // Audio blocked by policy — will resume on any document interaction
      });
    }).catch(() => {
      // Both blocked — register a one-time unlock on ANY user interaction
      const unlock = () => {
        video.play().catch(() => {});
        audio.play().catch(() => {});
        document.removeEventListener("click", unlock, true);
        document.removeEventListener("keydown", unlock, true);
        document.removeEventListener("touchstart", unlock, true);
        document.removeEventListener("pointerdown", unlock, true);
      };
      unlockRef.current = unlock;
      document.addEventListener("click", unlock, { capture: true, once: true });
      document.addEventListener("keydown", unlock, { capture: true, once: true });
      document.addEventListener("touchstart", unlock, { capture: true, once: true });
      document.addEventListener("pointerdown", unlock, { capture: true, once: true });
    });
  }, []);

  // Auto-start after 2 seconds
  useEffect(() => {
    if (!isVisible) return;

    autoStartTimerRef.current = setTimeout(() => {
      // Directly attempt playback
      playMedia();

      // Show bubble and start typing
      setShowBubble(true);

      const CHAR_DELAY = 35;
      let current = 0;
      intervalRef.current = setInterval(() => {
        current++;
        setCharCount(current);
        if (current >= totalChars) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, CHAR_DELAY);
    }, 2000);

    return () => {
      if (autoStartTimerRef.current) clearTimeout(autoStartTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, totalChars, playMedia]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoStartTimerRef.current) clearTimeout(autoStartTimerRef.current);
    // Clean up pending unlock listener
    if (unlockRef.current) {
      document.removeEventListener("click", unlockRef.current, true);
      document.removeEventListener("keydown", unlockRef.current, true);
      document.removeEventListener("touchstart", unlockRef.current, true);
      document.removeEventListener("pointerdown", unlockRef.current, true);
    }
    setIsVisible(false);
  }, []);

  // Auto-close: 5 seconds after VIDEO ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => {
        handleClose();
      }, 5000);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [handleClose]);

  // Fallback auto-close: 10s after typing finishes (if video never plays/ends)
  useEffect(() => {
    if (charCount >= totalChars && charCount > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [charCount, totalChars, handleClose]);

  // Escape key
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible, handleClose]);

  // Cleanup
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoStartTimerRef.current) clearTimeout(autoStartTimerRef.current);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={classes.overlay}
          data-intro-overlay="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={classes.scene}>
            <audio ref={audioRef} src="/audio/intro-voice.mp3" preload="auto" />
            
            {/* Avatar — independently positioned, NEVER shifts */}
            <motion.div
              className={classes.avatarContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <video
                ref={videoRef}
                className={classes.avatarVideo}
                src="/videos/intro-avatar.webm"
                playsInline
                preload="auto"
              />
            </motion.div>

            {/* Bubble — independently positioned, separate from avatar */}
            {showBubble && (
              <motion.div
                className={classes.bubbleAnchor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {/* Connector line */}
                <motion.div
                  className={classes.connectorLine}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{ transformOrigin: "left center" }}
                >
                  <ConnectorSVG />
                </motion.div>

                {/* Speech bubble — fixed padding, auto height */}
                <motion.div
                  className={classes.speechBubble}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Close button — outside bubble overflow */}
                  <button
                    className={classes.closeButton}
                    onClick={handleClose}
                    aria-label="Close introduction"
                  >
                    <X size={16} strokeWidth={2.5} color="#111111" />
                  </button>

                  {renderPartialText(charCount, classes)}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroOverlay);

