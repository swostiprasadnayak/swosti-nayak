"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", flex: 1, display: "flex", width: "100%", minWidth: 0 }}>
            <Squircle
                cornerRadius={22}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    background: isActive
                        ? "var(--text-primary)"
                        : "var(--bg-glass)",
                    color: isActive ? "var(--bg-primary)" : "var(--text-primary)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border-subtle)",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: isActive
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(var(--text-primary-rgb), 0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <div style={{ opacity: 0.8, display: "flex" }}>{icon}</div>
                </div>
                <span style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: isActive ? "var(--bg-primary)" : "var(--text-primary)",
                }}>
                    {label}
                </span>
            </Squircle>
        </div>
    );
}
