"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

export default function ToggleCard({ icon, label, isActive, onClick }: any) {
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
                        ? "rgba(0, 0, 0, 0.08)"
                        : "rgba(255, 255, 255, 0.85)",
                    border: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                }}
            >
                <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "rgba(0, 0, 0, 0.6)",
                }}>
                    {icon}
                </div>
                <span style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "rgba(0, 0, 0, 0.8)",
                }}>
                    {label}
                </span>
            </Squircle>
        </div>
    );
}
