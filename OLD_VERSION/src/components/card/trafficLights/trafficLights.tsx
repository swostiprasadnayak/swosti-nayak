"use client";

import React from "react";

export default function TrafficLights({ onClose, onExpand, visible }: any) {
    return (
        <div style={{ display: "flex", gap: "6px", opacity: visible ? 1 : 0.5, transition: "opacity 0.2s" }}>
            <button
                onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                style={{ width: 12, height: 12, borderRadius: "50%", background: "#FE5F57", border: "none", cursor: "pointer" }}
            />
            <button
                style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", border: "none", cursor: "pointer" }}
            />
            <button
                onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
                style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", border: "none", cursor: "pointer" }}
            />
        </div>
    );
}
