"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./welcomeOverlay.module.css";

const FULL_TEXT = `Welcome to my digital workspace..

Hey I'm Swosti...

This entire portfolio is built with AI and is still evolving.

Dive in, interact with the sliders and case studies, and help shape it by sharing your feedback.`;

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user has seen this before
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      setIsVisible(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  // Use Web Audio API for a subtle synth "tick" on each character
  const playTick = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      if (ctx.state === "suspended") {
        // Will be suspended if no user interaction has occurred
        // We catch this to prevent errors, but sound won't play until interaction
        return;
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime); // very quiet
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
      // Ignore audio errors (mostly autoplay restrictions)
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    
    // Typewriter effect
    typingIntervalRef.current = setInterval(() => {
      if (index < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, index + 1));
        // Only play tick for visible characters, not spaces/newlines
        if (FULL_TEXT[index].trim() !== "") {
          playTick();
        }
        index++;
      } else {
        // Finished typing
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        
        // Close after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
    }, 45); // typing speed in ms

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const blocks = displayedText.split('\n\n');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={classes.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={classes.container}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className={classes.closeBtn} onClick={handleClose} aria-label="Close">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            
            <div className={classes.textContent}>
              {blocks.map((block, i) => {
                if (i === 0) return <h3 className={classes.heading} key={i}>{block}</h3>;
                return <p className={classes.paragraph} key={i}>{block}</p>;
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
