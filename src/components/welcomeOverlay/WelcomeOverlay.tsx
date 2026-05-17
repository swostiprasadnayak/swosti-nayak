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
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      setIsVisible(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  // Toggle blur on the page-content wrapper.
  // Using filter: blur() directly on the content is far more reliable
  // than backdrop-filter, which fights with framer-motion's will-change.
  useEffect(() => {
    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;
    if (isVisible) {
      pageContent.classList.add("welcome-blurred");
    } else {
      pageContent.classList.remove("welcome-blurred");
    }
    return () => {
      pageContent.classList.remove("welcome-blurred");
    };
  }, [isVisible]);

  // Preload images in background
  useEffect(() => {
    if (!isVisible) return;
    const imagePaths = [
      '/bg.jpg',
      '/wallpapers/pexels-sergei-31959340.jpg',
      '/wallpapers/bg1.jpg',
      '/wallpapers/bg2.jpg',
      '/wallpapers/bg3.jpg',
      '/wallpapers/bg4.jpg',
      '/feedback-gradient.jpg',
      '/icon.png',
    ];
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isVisible]);

  const playTick = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === "suspended") return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    if (!isVisible) return;
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, index + 1));
        if (FULL_TEXT[index].trim() !== "") playTick();
        index++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, 45);
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [isVisible]);

  const handleClose = () => setIsVisible(false);
  const blocks = displayedText.split('\n\n');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-wrapper"
          className={classes.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dim layer for contrast — sits directly under the card */}
          <div className={classes.dimLayer} onClick={handleClose} />

          <motion.div
            className={classes.container}
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <button className={classes.closeBtn} onClick={handleClose} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
