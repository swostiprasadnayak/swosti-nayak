"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // High-performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device has a touch screen, don't show custom cursor if it does
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // 16px is half the width/height to center the dot on the tip of the mouse
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Detect if hovering over an interactive element
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" || 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest('button') ||
        target.closest('a');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        x: smoothX,
        y: smoothY,
        backgroundColor: (isHovering || isClicked) 
          ? "rgba(120, 120, 120, 0.4)" 
          : "rgba(100, 100, 100, 0.2)",
        border: "none",
        backdropFilter: (isHovering || isClicked) ? "blur(1px)" : "none",
      }}
      animate={{
        scale: isClicked ? 1.1 : (isHovering ? 1.35 : 0.6),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}
