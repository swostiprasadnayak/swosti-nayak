"use client";

import React from "react";
import { MotionConfig } from "motion/react";
import { useA11yPrefs } from "@/app/hooks/useA11yPrefs";

/** Motion-library side of "Reduce motion": "always" when the visitor turns it
 *  on in Accessibility; otherwise follow the OS-level reduced-motion setting. */
export default function A11yMotionConfig({ children }: { children: React.ReactNode }) {
    const { reduceMotion } = useA11yPrefs();
    return <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>;
}
