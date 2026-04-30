"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import { Play, Pause, FastForward, Rewind } from "lucide-react";

export default function MusicCard({ player }: any) {
    const { track, progress, isPlaying, togglePlay, nextTrack, prevTrack, seek, currentTime, duration } = player;

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
            flex: 1, padding: "18px 16px",
            background: "rgba(255, 255, 255, 0.85)",
            border: "none",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            width: "100%", height: "100%", boxSizing: "border-box", minWidth: 0, margin: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Squircle cornerRadius={14} style={{ width: 56, height: 56, background: "#eee", flexShrink: 0, overflow: "hidden" }}>
                    {track?.thumbnail ? (
                        <img src={track.thumbnail} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #eee 0%, #ddd 100%)" }} />
                    )}
                </Squircle>
                <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "rgba(0,0,0,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.02em" }}>{track?.title || "No Track"}</h4>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(0,0,0,0.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600 }}>{track?.artist || "Unknown Artist"}</p>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
                <div style={{ position: "relative", flex: 1, height: 6, background: "rgba(0,0,0,0.05)", borderRadius: 10 }}>
                    <div style={{ width: `${progress || 0}%`, height: "100%", background: "rgba(0,0,0,0.15)", borderRadius: 10 }} />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress || 0}
                        onChange={(e) => seek(parseFloat(e.target.value))}
                        style={{
                            position: "absolute", inset: "-10px 0", width: "100%", cursor: "pointer", appearance: "none", background: "transparent", zIndex: 2
                        }}
                    />
                </div>
                <span style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.4)", fontWeight: 600, minWidth: "35px", textAlign: "right" }}>
                    {remainingTime}
                </span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "36px", marginTop: "12px", color: "rgba(0,0,0,0.6)" }}>
                <Rewind size={22} fill="currentColor" style={{ cursor: "pointer", opacity: 0.8 }} onClick={prevTrack} />
                <div onClick={togglePlay} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </div>
                <FastForward size={22} fill="currentColor" style={{ cursor: "pointer", opacity: 0.8 }} onClick={nextTrack} />
            </div>
        </Squircle>
    );
}
