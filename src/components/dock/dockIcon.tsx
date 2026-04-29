"use client";

import React, { useRef, useState } from "react";
import { motion, useTransform, useSpring, MotionValue, AnimatePresence } from "motion/react";
import classes from "./dock.module.css";

interface DockIconProps {
    slug: string;
    name: string;
    isActive: boolean;
    mouseX: MotionValue<number>;
    onSelect: (slug: string) => void;
}

export default function DockIcon({ slug, name, isActive, mouseX, onSelect }: DockIconProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate distance from mouse to the exact center of this icon
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - (bounds.x + bounds.width / 2);
    });

    // Map the distance to a size (Base: 48px, Max Hover: 85px)
    const widthSync = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
    const size = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

    const letters = name.substring(0, 2).charAt(0).toUpperCase() + name.substring(1, 2).toLowerCase();

    return (
        <motion.button
            ref={ref}
            className={classes.iconButton}
            onClick={() => onSelect(slug)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: size, height: size }}
        >
            <div style={{
                width: "100%", height: "100%", borderRadius: 12,
                background: "rgba(20, 20, 25, 0.85)", color: "#ff8c82",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", fontWeight: "bold", fontFamily: "monospace",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                flexShrink: 0 // Prevent text area from collapsing
            }}>
                <span style={{ fontSize: "18px" }}>{letters}</span>
            </div>

            {isActive && <div className={classes.activeDot} />}

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
