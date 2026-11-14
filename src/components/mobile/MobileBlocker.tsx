"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/app/contexts/ThemeContext";

const SHOW_DELAY_MS = 800;
const FADE_IN_MS = 900;
const VISIBLE_MS = 10000;

export default function MobileBlocker() {
    const [isVisible, setIsVisible] = useState(true);
    const { isDark } = useTheme();
    // Same glass as the dock (dock.module.css .dockBgFill).
    const ui = isDark
        ? { bg: "rgba(28, 28, 30, 0.45)", title: "#ffffff", body: "rgba(255, 255, 255, 0.7)", closeBg: "rgba(255, 255, 255, 0.1)", closeFg: "rgba(255, 255, 255, 0.8)" }
        : { bg: "rgba(255, 255, 255, 0.28)", title: "#111827", body: "rgba(0, 0, 0, 0.6)", closeBg: "rgba(0, 0, 0, 0.06)", closeFg: "rgba(0, 0, 0, 0.6)" };

    // Fades in shortly after load, stays ~10s, then fades away on its own.
    useEffect(() => {
        const hide = setTimeout(() => setIsVisible(false), SHOW_DELAY_MS + FADE_IN_MS + VISIBLE_MS);
        return () => clearTimeout(hide);
    }, []);

    return (
        <AnimatePresence>
        {isVisible && (
        <motion.div
            className="mobile-blocker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: SHOW_DELAY_MS / 1000, duration: FADE_IN_MS / 1000, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.6, ease: "easeIn" } }}
            style={{
                display: "none", // Overridden by CSS media query to 'flex'
                position: "fixed",
                bottom: 104, // 24px (dock bottom) + 64px (dock height) + 16px (gap)
                left: 16,
                right: 16,
                zIndex: 9999,
                background: ui.bg,
                backdropFilter: "blur(28px) saturate(160%)",
                WebkitBackdropFilter: "blur(28px) saturate(160%)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 12,
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
                textAlign: "left",
            }}
        >
            <div style={{ fontSize: 24 }}>🖥️</div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: ui.title, marginBottom: 4 }}>
                    Please use desktop version
                </div>
                <div style={{ fontSize: 12, color: ui.body, lineHeight: 1.4 }}>
                    Mobile version is currently in progress.
                </div>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                style={{
                    background: ui.closeBg,
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: ui.closeFg,
                    cursor: "pointer",
                    padding: 0,
                    flexShrink: 0
                }}
            >
                <X size={14} />
            </button>
        </motion.div>
        )}
        </AnimatePresence>
    );
}
