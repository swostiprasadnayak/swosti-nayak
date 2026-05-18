"use client";

import React, { useEffect, useState, useRef } from "react";
import classes from "./welcomeOverlay.module.css";

const FULL_TEXT = `Welcome to my digital workspace..

Hey I'm Swosti...

This entire portfolio is built with AI and is still evolving.

Dive in, interact with the sliders and case studies, and help shape it by sharing your feedback.`;

export default function WelcomeOverlay() {
  const [mounted, setMounted] = useState(false);   // DOM presence
  const [visible, setVisible] = useState(false);   // CSS transition class
  const [displayedText, setDisplayedText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const hide = () => {
    // Trigger exit CSS transition, then unmount
    setVisible(false);
    hideTimerRef.current = setTimeout(() => {
      setMounted(false);
      // Remove page blur
      document.getElementById("page-content")?.classList.remove("welcome-blurred");
    }, 500);
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      localStorage.setItem("hasSeenWelcome", "true");
      setMounted(true);
      // Blur page content
      document.getElementById("page-content")?.classList.add("welcome-blurred");
      // Double rAF so CSS transition triggers after mount
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Preload images in background
  useEffect(() => {
    if (!mounted) return;
    const imagePaths = [
      '/bg.jpg', '/wallpapers/pexels-sergei-31959340.jpg',
      '/wallpapers/bg1.jpg', '/wallpapers/bg2.jpg',
      '/wallpapers/bg3.jpg', '/wallpapers/bg4.jpg',
      '/feedback-gradient.jpg', '/icon.png',
    ];
    imagePaths.forEach((src) => { const img = new Image(); img.src = src; });
  }, [mounted]);

  const playTick = () => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
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
    } catch (e) {}
  };

  useEffect(() => {
    if (!mounted) return;
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, index + 1));
        if (FULL_TEXT[index].trim() !== "") playTick();
        index++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setTimeout(() => hide(), 5000);
      }
    }, 45);
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  const blocks = displayedText.split('\n\n');

  return (
    // Plain divs — NO framer-motion, NO will-change → backdrop-filter works!
    <div className={`${classes.wrapper} ${visible ? classes.wrapperVisible : ''}`}>
      {/* Full-screen overlay: black 43% + blur 14 */}
      <div className={classes.bgOverlay} onClick={hide} />

      {/* Card: white 10% + blur 54, slides from top */}
      <div className={`${classes.container} ${visible ? classes.containerVisible : ''}`}>
        {/* Close button: white 40% + blur 27.38 */}
        <button className={classes.closeBtn} onClick={hide} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className={classes.textContent}>
          {blocks.map((block, i) => {
            if (i === 0) return <h3 className={classes.heading} key={i}>{block}</h3>;
            return <p className={classes.paragraph} key={i}>{block}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
