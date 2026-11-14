"use client";
import React from "react";
import Image from "next/image";
import { Play, Pause, FastForward, Rewind } from "lucide-react";
import type { MusicPlayerState } from "@/app/hooks/useMusicPlayer";
import classes from "./musicCard.module.css";

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
                    <Image src={track.thumbnail} alt={track.title} fill sizes="88px" style={{ objectFit: "cover" }} />
                )}
            </div>

            <div className={classes.info}>
                <div className={classes.meta}>
                    <p className={classes.title}>{track?.title || "No Track"}</p>
                    <p className={classes.artist}>{track?.artist || "Unknown Artist"}</p>
                </div>

                <div className={classes.controls}>
                    <button type="button" onClick={prevTrack} aria-label="Previous track" className={classes.ctrl}>
                        <Rewind size={20} fill="currentColor" stroke="none" />
                    </button>
                    <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className={classes.ctrl}>
                        {isPlaying
                            ? <Pause size={24} fill="currentColor" stroke="none" />
                            : <Play size={24} fill="currentColor" stroke="none" />}
                    </button>
                    <button type="button" onClick={nextTrack} aria-label="Next track" className={classes.ctrl}>
                        <FastForward size={20} fill="currentColor" stroke="none" />
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
                        <span>-{hasDuration ? formatTime(duration - currentTime) : "0:00"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
