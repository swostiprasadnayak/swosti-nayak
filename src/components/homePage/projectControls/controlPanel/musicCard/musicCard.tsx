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
        <Squircle cornerRadius={20} style={{
            flex: 1, padding: "18px 16px", background: "var(--bg-glass)",
            backdropFilter: "blur(30px)", border: "1px solid var(--border-subtle)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            width: "100%", height: "100%", boxSizing: "border-box", minWidth: 0
        }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Squircle cornerRadius={12} style={{ width: 52, height: 52, background: "#eee", flexShrink: 0, overflow: "hidden" }}>
                    {track?.thumbnail ? (
                        <img src={track.thumbnail} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" }} />
                    )}
                </Squircle>
                <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.01em" }}>{track?.title || "No Track"}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{track?.artist || "Unknown Artist"}</p>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "2px 0" }}>
                <div style={{ position: "relative", flex: 1, height: 20, display: "flex", alignItems: "center" }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress || 0}
                        onChange={(e) => seek(parseFloat(e.target.value))}
                        style={{
                            width: "100%", cursor: "pointer", appearance: "none", background: "transparent", zIndex: 2, height: "100%"
                        }}
                    />
                    <div style={{ position: "absolute", left: 0, right: 0, height: 5, background: "rgba(var(--text-primary-rgb),0.15)", borderRadius: 10, zIndex: 0 }}>
                        <div style={{ width: `${progress}%`, height: "100%", background: "rgba(var(--text-primary-rgb),0.6)", borderRadius: 10 }} />
                    </div>
                    {/* Hide default range slider thumb */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        input[type=range]::-webkit-slider-thumb { appearance: none; width: 0; height: 0; }
                        input[type=range]::-moz-range-thumb { appearance: none; width: 0; height: 0; border: none; }
                    `}} />
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-primary)", minWidth: "35px", textAlign: "right", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                    {remainingTime}
                </span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "4px", color: "var(--text-primary)" }}>
                <Rewind size={20} fill="currentColor" style={{ cursor: "pointer", opacity: 0.6 }} onClick={prevTrack} />
                <div onClick={togglePlay} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </div>
                <FastForward size={20} fill="currentColor" style={{ cursor: "pointer", opacity: 0.6 }} onClick={nextTrack} />
            </div>
        </Squircle>
    );
}
