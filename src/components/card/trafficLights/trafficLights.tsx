"use client";

import React from "react";

export default function TrafficLights({ onClose, onExpand, visible }: any) {
    const btnBase: React.CSSProperties = {
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: 0,
    };

    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", opacity: visible ? 1 : 0.5, transition: "opacity 0.2s" }}>
            {/* Close — red with ✕ */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                style={{ ...btnBase, background: "#FE5F57" }}
                title="Close"
            >
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <line x1="1" y1="1" x2="5" y2="5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="5" y1="1" x2="1" y2="5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
            </button>

            {/* Minimise — grey (non-functional) */}
            <button
                style={{ ...btnBase, background: "#D1D1D1", cursor: "default" }}
                title="Minimise"
            />

            {/* Expand — green with ✓ */}
            <button
                onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
                style={{ ...btnBase, background: "#28C840" }}
                title="Full screen"
            >
                <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                    <polyline points="1,3 2.8,5 6,1" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
            </button>
        </div>
    );
}
