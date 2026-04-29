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

// Colored border per project — matches reference palette
const ICON_COLORS: Record<string, string> = {
    unicef:      "#00AEEF",
    syne:        "#30D158",
    blinkit:     "#FFD60A",
    aristotle:   "#BF5AF2",
    "pid-tool":  "#FF453A",
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

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
    const size = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

    const letters = name.substring(0, 2).charAt(0).toUpperCase() + name.substring(1, 2).toLowerCase();
    const color = ICON_COLORS[slug] ?? "rgba(255,255,255,0.5)";

    return (
        <motion.button
            ref={ref}
            className={classes.iconButton}
            onClick={() => !isDisabled && onSelect(slug)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: size,
                height: size,
                opacity: isDisabled ? 0.38 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
            }}
        >
            {/* Colored border ring */}
            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "26%",
                border: `2px solid ${color}`,
                opacity: isHovered && !isDisabled ? 1 : 0.7,
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
            }} />

            {/* Dark squircle body */}
            <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "26%",
                background: "rgba(18, 18, 20, 0.90)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isHovered && !isDisabled
                    ? `0 0 14px 3px ${color}40, 0 4px 12px rgba(0,0,0,0.4)`
                    : "0 4px 10px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.2s ease",
            }}>
                <span style={{
                    fontSize: "clamp(12px, 28%, 20px)",
                    fontWeight: 700,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Mono', monospace",
                    color: color,
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                }}>
                    {letters}
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
                        {name}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
