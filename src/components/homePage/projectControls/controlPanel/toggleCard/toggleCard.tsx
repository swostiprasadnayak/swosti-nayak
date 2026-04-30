"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
    const { isDark } = useTheme();

    return (
        <div onClick={onClick} style={{ cursor: "pointer", flex: 1, display: "flex", width: "100%", minWidth: 0 }}>
            <Squircle
                cornerRadius={24}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 18px",
                    background: isActive
                        ? (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)")
                        : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.85)"),
                    border: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.02)",
                    transition: "all 0.2s ease"
                }}
            >
                <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)",
                }}>
                    {React.cloneElement(icon as React.ReactElement, { size: 20 })}
                </div>
                <span style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
                }}>
                    {label}
                </span>
            </Squircle>
        </div>
    );
}
