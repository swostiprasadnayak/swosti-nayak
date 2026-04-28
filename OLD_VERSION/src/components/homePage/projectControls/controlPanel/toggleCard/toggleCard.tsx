"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", flex: 1, display: "flex" }}>
            <Squircle
                cornerRadius={20}
                style={{
                    display: "flex", alignItems: "center", gap: "12px", padding: "16px",
                    background: isActive ? "rgba(var(--text-primary-rgb), 0.9)" : "rgba(255,255,255,0.15)",
                    color: isActive ? "#fff" : "rgba(var(--text-primary-rgb), 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    width: "100%"
                }}
            >
                <div style={{ opacity: 0.8 }}>{icon}</div>
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{label}</span>
            </Squircle>
        </div>
    );
}
