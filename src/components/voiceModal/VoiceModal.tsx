"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./voiceModal.module.css";

// Delay before audio starts — gives a breath before voice kicks in
const AUDIO_PRE_ROLL = 400; // ms

const SCRIPT = [
    { text: "", delay: 0 },
    { text: "Hey, I'm Swosti.", delay: 400 },
    { text: "I'm an AI Product Designer turning complex models into intuitive, human-centric experiences.", delay: 2400 },
    { text: "Over the past two years, I've designed scalable B2B and B2C systems that reduce friction and drive measurable impact.", delay: 8400 },
    { text: "I'm currently exploring new opportunities. Let's build something meaningful.", delay: 15400 },
    { text: "", delay: 19600 }
];

// ── Per-segment auto-calibrated timing ──
// Each segment's pace is computed from its OWN duration (gap to next segment),
// so words naturally match the voiceover even if pace varies across segments.
// Within a segment, words are distributed by character count (long words take longer).

// Fraction of the inter-segment gap that's actual speech (rest is breath/pause).
// SCRIPT delays were tuned for segment-level fade and include long pauses,
// so actual speech fills only ~70% of each gap.
// Lower this if voice still ahead of text; raise if voice lags behind.
const SPEECH_FILL = 0.7;

// Global offset added to every word timing. POSITIVE = words appear later (if voice lags).
// NEGATIVE = words appear earlier (if voice runs ahead). Start at 0, dial in 0.2s steps.
const AUDIO_OFFSET = 0;

const WORD_TIMING = SCRIPT.map((seg, segIdx) => {
    if (!seg.text) return [];
    const nextSeg = SCRIPT[segIdx + 1];
    const segStartSec = seg.delay / 1000;
    const segEndSec = nextSeg ? nextSeg.delay / 1000 : segStartSec + 3;
    const speechDurSec = (segEndSec - segStartSec) * SPEECH_FILL;
    const charsPerSec = seg.text.length / speechDurSec;

    const words = seg.text.split(/\s+/).filter(Boolean);
    let charsConsumed = 0;
    return words.map((word) => {
        const t = segStartSec + (charsConsumed / charsPerSec) + AUDIO_OFFSET;
        charsConsumed += word.length + 1; // +1 for the space after the word
        return { word, t: Math.max(0, t) };
    });
});

export default function VoiceModal() {
    const { isOpen, closeModal } = useVoiceModal();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [audioTime, setAudioTime] = useState(0);
    const timersRef = useRef<NodeJS.Timeout[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        audioRef.current = new Audio("/audio/voice-mode-ishan-new.mp3");
        audioRef.current.onended = () => {
            setIsPlaying(false);
            cancelAnimationFrame(rafRef.current);
        };
        return () => {
            cancelAnimationFrame(rafRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleClose = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        setIsPlaying(false);
        setCurrentTextIndex(0);
        setAudioTime(0);
        closeModal();
    }, [closeModal]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleClose]);

    const startVoice = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setAudioTime(0);

        // Pre-roll: short pause before voice starts, then play and drive time via RAF at 60fps
        const audioStartTimer = setTimeout(() => {
            if (!audioRef.current) return;
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));

            const tick = () => {
                if (audioRef.current && !audioRef.current.paused) {
                    setAudioTime(audioRef.current.currentTime);
                    rafRef.current = requestAnimationFrame(tick);
                }
            };
            rafRef.current = requestAnimationFrame(tick);
        }, AUDIO_PRE_ROLL);
        timersRef.current.push(audioStartTimer);

        // Text segment timers — offset by the same pre-roll so text stays in sync with audio
        SCRIPT.forEach((line, index) => {
            const timer = setTimeout(() => {
                setCurrentTextIndex(index);
                if (index === SCRIPT.length - 1) setIsPlaying(false);
            }, line.delay + AUDIO_PRE_ROLL);
            timersRef.current.push(timer);
        });
    };

    // Render words: spoken = dark, pending = faded — class swap happens at 60fps
    const renderWords = (segIdx: number) => {
        const words = WORD_TIMING[segIdx];
        if (!words || words.length === 0) return null;
        return (
            <>
                {words.map((w, i) => (
                    <span
                        key={i}
                        className={audioTime >= w.t ? classes.wordSpoken : classes.wordPending}
                    >
                        {w.word}{' '}
                    </span>
                ))}
            </>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className={classes.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} />
                    <div className={classes.modalContainer}>
                        <motion.div className={classes.modalWrapper} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}>
                            <div className={classes.windowHeader}>
                                <div className={classes.trafficLights}>
                                    <button className={classes.trafficLight} style={{ background: "#FE5F57" }} onClick={handleClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#4A0002" strokeWidth="1.25" strokeLinecap="round" /></svg>
                                    </button>
                                    <span className={classes.trafficLight} style={{ background: "#DFDFE2" }} />
                                    <span className={classes.trafficLight} style={{ background: "#DFDFE2" }} />
                                </div>
                            </div>

                            <div className={classes.contentArea}>
                                <div className={`${classes.avatarContainer} ${isPlaying ? classes.avatarFloat : ""}`}>
                                    <video
                                        poster="/swosti-avatar-poster.jpg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={classes.avatarVideo}
                                    >
                                        <source src="/swosti-avatar.mp4" type="video/mp4" />
                                    </video>
                                    <div className={classes.avatarShadow} />
                                </div>

                                {/* key={currentTextIndex} triggers AnimatePresence fade on segment change only.
                                    Word colour updates happen inside without re-triggering the animation. */}
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={currentTextIndex}
                                        className={classes.subtitle}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {renderWords(currentTextIndex)}
                                    </motion.p>
                                </AnimatePresence>

                                {!isPlaying && currentTextIndex === 0 && (
                                    <button className={classes.actionButton} onClick={startVoice}>
                                        Who is Swosti? 👆
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
