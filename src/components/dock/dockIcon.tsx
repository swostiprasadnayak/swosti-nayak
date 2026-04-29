"use client";

import React, { useRef, useState } from "react";
import { motion, useTransform, useSpring, MotionValue, AnimatePresence } from "motion/react";
import classes from "./dock.module.css";
import { PROJECTS } from "@/app/types/projects.types";

interface DockIconProps {
    slug: string;
    name: string;
    isActive: boolean;
    mouseX: MotionValue<number>;
    onSelect: (slug: string) => void;
}

// Per-project colored border — matches the reference image palette
const ICON_COLORS: Record<string, string> = {
    unicef:     "#00AEEF",
    syne:       "#30D158",
    blinkit:    "#FFD60A",
    aristotle:  "#BF5AF2",
    "pid-tool": "#FF453A",
};

export default function DockIcon({ slug, name, isActive, mouseX, onSelect }: DockIconProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const project = PROJECTS.find((p) => p.slug === slug);
    const isDisabled = project?.disabled ?? false;

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - (bounds.x + bounds.width / 2);
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
    const size = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

    // Two-letter abbreviation: first two chars capitalised like "Sy", "Bl", "Un"
    const abbr = name.slice(0, 2).charAt(0).toUpperCase() + name.slice(1, 2).toLowerCase();
    const color = ICON_COLORS[slug] ?? "rgba(255,255,255,0.6)";

    return (
        <motion.button
            ref={ref}
            className={classes.iconButton}
            onClick={() => !isDisabled && onSelect(slug)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: size, height: size, opacity: isDisabled ? 0.4 : 1, cursor: isDisabled ? "not-allowed" : "pointer" }}
            title={isDisabled ? `${name} — coming soon` : name}
        >
            {/* Colored border ring */}
            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "28%",
                border: `1.5px solid ${color}`,
                opacity: isHovered && !isDisabled ? 1 : 0.6,
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
            }} />

            {/* Dark body */}
            <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "28%",
                background: "rgba(18, 18, 20, 0.88)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isHovered && !isDisabled
                    ? `0 0 16px 3px ${color}44, 0 4px 14px rgba(0,0,0,0.45)`
                    : "0 4px 12px rgba(0,0,0,0.35)",
                transition: "box-shadow 0.2s ease",
            }}>
                <span style={{
                    fontSize: "clamp(11px, 27%, 18px)",
                    fontWeight: 700,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Mono', monospace",
                    color: color,
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                }}>
                    {abbr}
                </span>
            </div>

            {isActive && !isDisabled && <div className={classes.activeDot} />}

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={classes.dockTooltip}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                    >
                        {isDisabled ? `${name} · coming soon` : name}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
