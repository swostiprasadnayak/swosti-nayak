"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import classes from "./navanta.module.css";

/* A rendered product film (an MP4 exported from the Motion film made for the
   demo), full-bleed in the same frame as FlowReel with a caption per chapter.
   No visible controls: clicking the film pauses or resumes it. It plays muted while
   on screen and pauses off screen; motion-sensitive viewers start on the
   poster and press play themselves. */

export type FilmChapter = {
    /** Names the chapter in the template (not shown). */
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
    const [paused, setPaused] = useState<boolean | null>(null);
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

    const play = () => setPaused(false);

    const current = chapters.reduce((acc, c, i) => (t >= c.at ? i : acc), 0);

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
                />
                {/* No visible controls: the whole film is the play/pause button. */}
                <button
                    type="button"
                    className={classes.reelToggle}
                    onClick={() => (isPaused ? play() : setPaused(true))}
                    aria-label={`${isPaused ? "Play" : "Pause"}: ${label}`}
                >
                    {isPaused && (
                        <span className={classes.reelBigPlay}>
                            <Play size={22} aria-hidden="true" />
                        </span>
                    )}
                </button>
            </div>

            <div className={classes.reelFoot}>
                <p className={classes.reelCaption} aria-live="polite">
                    {chapters[current]?.caption}
                </p>
            </div>
        </figure>
    );
}
