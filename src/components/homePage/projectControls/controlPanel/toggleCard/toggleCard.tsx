"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import { useTheme } from "@/app/contexts/ThemeContext";

type ToggleCardProps = {
    icon: React.ReactElement<{ size?: number }>;
    label: string;
    isActive?: boolean;
    onClick: () => void;
};

export default function ToggleCard({ icon, label, isActive, onClick }: ToggleCardProps) {
    const { isDark } = useTheme();

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            style={{
                cursor: "pointer", flex: 1, display: "flex", width: "100%", minWidth: 0,
                background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", textAlign: "left",
                // drop-shadow, not box-shadow: the squircle clip-path cuts box-shadow off.
                filter: isDark ? "none" : "drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.07)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.06))",
            }}
        >
            <Squircle
                cornerRadius={24}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 18px",
                    background: isActive
                        ? (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)")
                        : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.95)"),
                    border: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
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
                    {React.cloneElement(icon, { size: 20 })}
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
        </button>
    );
}
