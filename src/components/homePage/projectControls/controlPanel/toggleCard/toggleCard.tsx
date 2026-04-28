"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", flex: 1, display: "flex", width: "100%", minWidth: 0 }}>
            <Squircle
                cornerRadius={20}
                style={{
                    display: "flex", alignItems: "center", gap: "12px", padding: "16px",
                    background: isActive ? "var(--text-primary)" : "var(--bg-glass)",
                    color: isActive ? "var(--bg-primary)" : "var(--text-secondary)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border-subtle)",
                    width: "100%"
                }}
            >
                <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isActive ? "rgba(100,100,100,0.2)" : "rgba(var(--text-primary-rgb), 0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                }}>
                    <div style={{ opacity: 0.8, display: "flex" }}>{icon}</div>
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "-0.01em" }}>{label}</span>
            </Squircle>
        </div>
    );
}
