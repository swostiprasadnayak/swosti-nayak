"use client";

import React from "react";

export default function MobileBlocker() {
    return (
        <div
            style={{
                display: "none",
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0, 0, 0, 0.92)",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: 32,
                textAlign: "center",
            }}
            className="mobile-blocker"
        >
            <div style={{ fontSize: 40 }}>🖥️</div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.4,
                }}
            >
                Please use desktop version
            </div>
            <div
                style={{
                    fontSize: 13,
                    color: "rgba(255, 255, 255, 0.55)",
                    lineHeight: 1.6,
                    maxWidth: 260,
                }}
            >
                Mobile version is currently in progress. For the best experience, open this on a desktop or laptop.
            </div>
        </div>
    );
}
