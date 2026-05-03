"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./voiceModal.module.css";

const SCRIPT = [
    { text: "", delay: 0 },
    { text: "Hey there, I'm Swosti. I’m a Product Designer who loves turning complex problems into clear, scalable, and meaningful digital experiences.", delay: 500 },
    { text: "Over the past 2+ years, I’ve worked across B2B and B2C products  from internal platforms to customer-facing solutions.", delay: 8500 },
    { text: "My approach combines systems thinking, user psychology, and business strategy to design products that don’t just look good, but perform.", delay: 15500 },
    { text: "I’ve worked on platform integrations, feature redesigns, experience audits, and end-to-end journey improvements.", delay: 24500 },
    { text: "Always focusing on clarity, usability, and measurable impact.", delay: 31000 },
    { text: "What drives me? Designing systems that scale. Creating experiences that reduce friction.", delay: 35000 },
    { text: "Building products that users actually enjoy using.", delay: 41000 },
    { text: "Currently exploring opportunities where I can contribute to high-impact product teams.", delay: 44000 },
    { text: "Let’s build something meaningful.", delay: 49500 },
    { text: "", delay: 52000 }
];

export default function VoiceModal() {
    const { isOpen, closeModal } = useVoiceModal();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const timersRef = useRef<NodeJS.Timeout[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio("/audio/voice-mode-ishan.mp3");
        audioRef.current.onended = () => setIsPlaying(false);
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleClose = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        setIsPlaying(false);
        setCurrentTextIndex(0);
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

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }

        SCRIPT.forEach((line, index) => {
            const timer = setTimeout(() => {
                setCurrentTextIndex(index);
                if (index === SCRIPT.length - 1) setIsPlaying(false);
            }, line.delay);
            timersRef.current.push(timer);
        });
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
                                        src="/swosti-avatar.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={classes.avatarVideo}
                                    />
                                    <div className={classes.avatarShadow} />
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={currentTextIndex}
                                        className={classes.subtitle}
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                    >
                                        {SCRIPT[currentTextIndex].text}
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
