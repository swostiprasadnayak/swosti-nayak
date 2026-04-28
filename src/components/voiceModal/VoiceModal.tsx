"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./voiceModal.module.css";

const SCRIPT = [
    { text: "", delay: 0 },
    { text: "Swosti is a product designer based in Delhi.", delay: 500 },
    { text: "For her, good design isn't just pretty;", delay: 4000 },
    { text: "it's rooted in research and cognitive science.", delay: 7000 },
    { text: "She aims to design interfaces that feel frictionless and intuitive.", delay: 10500 },
    { text: "From meaningful projects like The Children's Society,", delay: 15500 },
    { text: "she strives to build production-grade interfaces end-to-end.", delay: 19000 },
    { text: "Right now, she's exploring better interaction models,", delay: 23500 },
    { text: "bringing real clarity and craft to every project she touches.", delay: 27000 },
    { text: "", delay: 32000 }
];

export default function VoiceModal() {
    const { isOpen, closeModal } = useVoiceModal();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    const handleClose = useCallback(() => {
        window.speechSynthesis.cancel();
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

        const fullText = SCRIPT.filter(s => s.text).map(s => s.text).join(" ");
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);

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
