"use client";
import React from "react";
import Image from "next/image";
import { Squircle } from "corner-smoothing";
import { useTheme } from "@/app/contexts/ThemeContext";
import { Play, Pause, FastForward, Rewind } from "lucide-react";
import classes from "./musicCard.module.css";

export default function MusicCard({ player }: any) {
    const { track, progress, isPlaying, togglePlay, nextTrack, prevTrack, seek, currentTime, duration } = player;
    const { isDark } = useTheme();

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const remainingTime = (duration && !isNaN(duration))
        ? `-${formatTime(duration - currentTime)}`
        : "-0:00";

    return (
        <Squircle cornerRadius={24} style={{
            flex: 1, padding: "16px 14px 22px 14px",
            background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.7)",
            border: "none",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            width: "100%", height: "100%", boxSizing: "border-box", minWidth: 0, margin: 0,
            boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.02)",
            transition: "all 0.2s ease"
        }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <Squircle cornerRadius={16} style={{ width: 60, height: 60, background: isDark ? "#333" : "#eee", flexShrink: 0, overflow: "hidden", position: "relative" }}>
                    {track?.thumbnail ? (
                        <Image src={track.thumbnail} alt={track.title} fill sizes="60px" style={{ objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: isDark ? "linear-gradient(135deg, #444 0%, #333 100%)" : "linear-gradient(135deg, #eee 0%, #ddd 100%)" }} />
                    )}
                </Squircle>
                <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 600, color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0,0,0,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.01em" }}>{track?.title || "No Track"}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0,0,0,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{track?.artist || "Unknown Artist"}</p>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                <div style={{ position: "relative", flex: 1, height: 6, background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.04)", borderRadius: 10 }}>
                    <div style={{ width: `${progress || 0}%`, height: "100%", background: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0,0,0,0.12)", borderRadius: 10 }} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress || 0}
                        onChange={(e) => seek(parseFloat(e.target.value))}
                        className={classes.rangeInput}
                        style={{
                            position: "absolute", inset: "-10px 0", zIndex: 2
                        }}
                    />
                </div>
                <span style={{ fontSize: "0.95rem", color: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0,0,0,0.45)", fontWeight: 700, minWidth: "38px", textAlign: "right" }}>
                    {remainingTime}
                </span>
            </div>

            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "24px", 
                marginTop: "8px", 
                alignItems: "center", 
                color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.85)" 
            }}>
                <button 
                    onClick={prevTrack} 
                    style={{ 
                        background: "none", 
                        border: "none", 
                        padding: 0, 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "inherit"
                    }}
                >
                    <Rewind size={26} fill="currentColor" stroke="none" style={{ width: "26px", height: "26px" }} />
                </button>
                
                <button 
                    onClick={togglePlay} 
                    style={{ 
                        background: "none", 
                        border: "none", 
                        padding: 0, 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "inherit"
                    }}
                >
                    {isPlaying ? (
                        <Pause size={32} fill="currentColor" stroke="none" style={{ width: "32px", height: "32px" }} />
                    ) : (
                        <Play size={32} fill="currentColor" stroke="none" style={{ width: "32px", height: "32px" }} />
                    )}
                </button>
                
                <button 
                    onClick={nextTrack} 
                    style={{ 
                        background: "none", 
                        border: "none", 
                        padding: 0, 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "inherit"
                    }}
                >
                    <FastForward size={26} fill="currentColor" stroke="none" style={{ width: "26px", height: "26px" }} />
                </button>
            </div>
        </Squircle>
    );
}
