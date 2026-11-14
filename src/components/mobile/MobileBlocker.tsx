"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function MobileBlocker() {
    const [isVisible, setIsVisible] = useState(true);
    const { isDark } = useTheme();
    // Light: same cool-grey glass as the mobile menu; dark: the original.
    const ui = isDark
        ? { bg: "rgba(30, 30, 30, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", shadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            title: "#ffffff", body: "rgba(255, 255, 255, 0.7)", closeBg: "rgba(255, 255, 255, 0.1)", closeFg: "rgba(255, 255, 255, 0.8)" }
        : { bg: "rgba(232, 234, 240, 0.85)", border: "1px solid rgba(255, 255, 255, 0.6)", shadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            title: "#111827", body: "rgba(0, 0, 0, 0.6)", closeBg: "rgba(0, 0, 0, 0.06)", closeFg: "rgba(0, 0, 0, 0.6)" };

    if (!isVisible) return null;

    return (
        <div
            className="mobile-blocker"
            style={{
                display: "none", // Overridden by CSS media query to 'flex'
                position: "fixed",
                bottom: 104, // 24px (dock bottom) + 64px (dock height) + 16px (gap)
                left: 16,
                right: 16,
                zIndex: 9999,
                background: ui.bg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 12,
                padding: "16px",
                borderRadius: "16px",
                border: ui.border,
                boxShadow: ui.shadow,
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
        </div>
    );
}
