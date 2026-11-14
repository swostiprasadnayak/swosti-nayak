"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsClient } from "@/app/hooks/useIsClient";
import { useA11yPrefs } from "@/app/hooks/useA11yPrefs";

export default function CustomCursor() {
  const isMounted = useIsClient();
  const { standardCursor } = useA11yPrefs(); // Accessibility → Motor
  const [isHovering, setIsHovering] = useState(false);
  // Over sliders the hover blob covered the track/handle, so scrubbing was
  // guesswork. There the cursor becomes a slim beam across the direction of
  // travel: vertical over horizontal sliders, horizontal over vertical ones.
  const [precise, setPrecise] = useState<"h" | "v" | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  // High-performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
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
        
      const slider = target.closest('input[type="range"], [role="slider"], [data-cursor="precise"]');
      setPrecise(slider ? (slider.getAttribute("aria-orientation") === "vertical" ? "v" : "h") : null);
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

  if (!isMounted || standardCursor) return null;

  const isActive = isHovering || isClicked;
  // Soft blue tint (not grey) so over a slider it can't be mistaken for the
  // handle, but quiet enough not to glare.
  const beam = "rgba(0, 122, 255, 0.45)";
  const shape = precise === "h"
    ? { width: 2, height: 22, borderRadius: 1, backgroundColor: beam }
    : precise === "v"
    ? { width: 22, height: 2, borderRadius: 1, backgroundColor: beam }
    : isActive
      ? { width: 43, height: 43, borderRadius: 21.5, backgroundColor: "rgba(120, 120, 120, 0.4)" }
      : { width: 19, height: 19, borderRadius: 9.5, backgroundColor: "rgba(100, 100, 100, 0.2)" };

  // Outer box tracks the pointer (32px, centred on the tip); the inner shape
  // is centred in it and morphs between dot, hover blob and slider beam.
  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        pointerEvents: "none",
        zIndex: 99999,
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          backdropFilter: isActive && !precise ? "blur(1px)" : "none",
        }}
        initial={false}
        animate={shape}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
}
