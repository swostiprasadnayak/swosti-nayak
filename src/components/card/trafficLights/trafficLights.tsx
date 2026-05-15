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
                    <path d="M1.2 1.2L4.8 4.8M4.8 1.2L1.2 4.8" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
            </button>

            {/* Minimise — grey (non-functional) */}
            <button
                style={{ ...btnBase, background: "#D1D1D1", cursor: "default" }}
                title="Minimise"
            />

            {/* Expand — green with diagonal triangles */}
            <button
                onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
                style={{ ...btnBase, background: "#28C840" }}
                title="Full screen"
            >
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <path d="M1 2.5V1H2.5M3.5 5H5V3.5" stroke="rgba(0,0,0,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
}
