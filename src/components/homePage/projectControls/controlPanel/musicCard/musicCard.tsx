"use client";
import React from "react";
import Image from "next/image";
import type { MusicPlayerState } from "@/app/hooks/useMusicPlayer";
import classes from "./musicCard.module.css";

// iOS-style transport glyphs (SF Symbols play/backward/forward .fill look):
// slim triangles with softly rounded corners via a same-colour round-join stroke.
const glyph = { fill: "currentColor", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" as const };
const PlayIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path {...glyph} d="M7 4.8v14.4L19 12z" /></svg>
);
const PauseIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /></svg>
);
const ForwardIcon = () => (
    <svg width="24" height="18" viewBox="0 0 26 20" aria-hidden="true"><path {...glyph} d="M2 4v12l10-6z M13 4v12l10-6z" /></svg>
);
const BackwardIcon = () => (
    <svg width="24" height="18" viewBox="0 0 26 20" aria-hidden="true"><path {...glyph} d="M24 4v12l-10-6z M13 4v12L3 10z" /></svg>
);

const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

/** Wide "Now Playing" card (iOS Control Center style): large artwork on the
 *  left; title, artist, transport controls and a progress bar on the right. */
export default function MusicCard({ player }: { player: MusicPlayerState }) {
    const { track, progress, isPlaying, togglePlay, nextTrack, prevTrack, seek, currentTime, duration } = player;
    const hasDuration = Number.isFinite(duration) && duration > 0;

    return (
        <div className={classes.card}>
            <div className={classes.art}>
                {track?.thumbnail && (
                    <Image src={track.thumbnail} alt={track.title} fill sizes="108px" style={{ objectFit: "cover" }} />
                )}
            </div>

            <div className={classes.info}>
                <div className={classes.meta}>
                    <p className={classes.title}>{track?.title || "No Track"}</p>
                    <p className={classes.artist}>{track?.artist || "Unknown Artist"}</p>
                </div>

                <div className={classes.controls}>
                    <button type="button" onClick={prevTrack} aria-label="Previous track" className={classes.ctrl}>
                        <BackwardIcon />
                    </button>
                    <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className={classes.ctrl}>
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button type="button" onClick={nextTrack} aria-label="Next track" className={classes.ctrl}>
                        <ForwardIcon />
                    </button>
                </div>

                <div>
                    <div className={classes.track}>
                        <div className={classes.fill} style={{ width: `${progress || 0}%` }} />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={progress || 0}
                            onChange={(e) => seek(parseFloat(e.target.value))}
                            aria-label="Seek"
                            className={classes.rangeInput}
                        />
                    </div>
                    <div className={classes.times}>
                        <span>{formatTime(currentTime)}</span>
                        <span>−{hasDuration ? formatTime(duration - currentTime) : "0:00"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
