"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import classes from "./navanta.module.css";

/* A rendered product film (an MP4 exported from the Motion film made for the
   demo), in the same frame and controls as FlowReel: chapter steps that seek,
   a caption per chapter, play/pause, sound and restart. It plays muted while
   on screen and pauses off screen; motion-sensitive viewers start on the
   poster and press play themselves. */

export type FilmChapter = {
    name: string;
    /** Second the chapter starts at. */
    at: number;
    caption: string;
};

export default function FilmPlayer({
    src,
    poster,
    label,
    chapters,
}: {
    src: string;
    poster: string;
    /** What the film shows, for screen readers. */
    label: string;
    chapters: FilmChapter[];
}) {
    const reduceMotion = useReducedMotion();
    const video = useRef<HTMLVideoElement>(null);
    const root = useRef<HTMLElement>(null);
    const [t, setT] = useState(0);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState<boolean | null>(null);
    const [muted, setMuted] = useState(true);
    const [inView, setInView] = useState(false);

    const isPaused = paused ?? !!reduceMotion;
    const playing = !isPaused && inView;

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const v = video.current;
        if (!v) return;
        if (playing) v.play().catch(() => setPaused(true));
        else v.pause();
    }, [playing]);

    useEffect(() => {
        if (video.current) video.current.muted = muted;
    }, [muted]);

    const seek = (time: number) => {
        const v = video.current;
        if (v) v.currentTime = time;
        setT(time);
        setPaused(false);
    };

    const current = chapters.reduce((acc, c, i) => (t >= c.at ? i : acc), 0);
    const chapterEnd = (i: number) => (i + 1 < chapters.length ? chapters[i + 1].at : duration || chapters[i].at + 1);
    const started = t > 0.05 || !isPaused;

    return (
        <figure ref={root} className={classes.reel} aria-label={label}>
            <div className={classes.reelStage}>
                <video
                    ref={video}
                    className={classes.filmVideo}
                    src={src}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={label}
                    onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                />
                {!started && (
                    <button type="button" className={classes.reelBigPlay} onClick={() => seek(0)} aria-label={`Play: ${label}`}>
                        <Play size={22} aria-hidden="true" />
                    </button>
                )}
            </div>

            <div className={classes.reelFoot}>
                <p className={classes.reelCaption} aria-live="polite">
                    {chapters[current]?.caption}
                </p>
                <div className={classes.reelBar}>
                    <ol className={classes.reelSteps} aria-label="Chapters">
                        {chapters.map((c, i) => {
                            const fill = started ? Math.min(1, Math.max(0, (t - c.at) / Math.max(0.001, chapterEnd(i) - c.at))) : 0;
                            const on = started && i === current;
                            return (
                                <li key={c.name}>
                                    <button
                                        type="button"
                                        className={`${classes.reelStep} ${on ? classes.reelStepOn : ""} ${fill >= 1 ? classes.reelStepDone : ""}`}
                                        onClick={() => seek(c.at + 0.01)}
                                        aria-current={on ? "step" : undefined}
                                    >
                                        <span className={classes.reelStepNum}>{i + 1}</span>
                                        {c.name}
                                        <i className={classes.reelStepFill} style={{ transform: `scaleX(${fill})` }} />
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <div className={classes.reelControls}>
                        <button
                            type="button"
                            className={classes.relayIconButton}
                            onClick={() => setMuted(!muted)}
                            aria-label={muted ? "Turn sound on" : "Turn sound off"}
                            aria-pressed={!muted}
                        >
                            {muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
                        </button>
                        <button
                            type="button"
                            className={classes.relayIconButton}
                            onClick={() => (isPaused ? seek(t) : setPaused(true))}
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                        </button>
                        <button type="button" className={classes.relayIconButton} onClick={() => seek(0)} aria-label="Play from the start">
                            <RotateCcw size={14} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className={classes.reelProgress} aria-hidden="true">
                    <i style={{ transform: `scaleX(${duration ? t / duration : 0})` }} />
                </div>
            </div>
        </figure>
    );
}
