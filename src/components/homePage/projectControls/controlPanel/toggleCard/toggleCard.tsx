"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", flex: 1, display: "flex", width: "100%", minWidth: 0 }}>
            <Squircle
                cornerRadius={18}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    background: isActive
                        ? "rgba(var(--text-primary-rgb), 0.80)"
                        : "rgba(var(--text-primary-rgb), 0.06)",
                    border: "none",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: isActive
                        ? "rgba(var(--text-primary-rgb), 0.15)"
                        : "rgba(var(--text-primary-rgb), 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: isActive ? "var(--bg-primary)" : "var(--text-primary)",
                }}>
                    {icon}
                </div>
                <span style={{
                    fontSize: "0.9rem",
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
