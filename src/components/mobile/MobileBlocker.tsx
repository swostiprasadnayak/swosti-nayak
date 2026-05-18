"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function MobileBlocker() {
    const [isVisible, setIsVisible] = useState(true);

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
                background: "rgba(30, 30, 30, 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 12,
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                textAlign: "left",
            }}
        >
            <div style={{ fontSize: 24 }}>🖥️</div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", marginBottom: 4 }}>
                    Please use desktop version
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                    Mobile version is currently in progress.
                </div>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255, 255, 255, 0.8)",
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
