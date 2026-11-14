"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import classes from "./navanta.module.css";

/* A product flow as a short film, built from the product's real screens:
   a typed hook line, the app window floating in, the camera pushing into
   what matters on each screen, a cursor where something is clicked, and an
   end line. Same grammar as the Motion films made for the demos, played by
   the page itself so it stays sharp at any size and weighs a few images. */

/** A camera position: zoom `s`, and the point of the screen (in %) it centres on. */
export type ReelCam = { s: number; x: number; y: number };

export type ReelShot = {
    src: string;
    alt: string;
    /** Index into `steps` — which step the tracker shows as current. */
    step: number;
    caption: string;
    /** Seconds on screen. */
    dur: number;
    from?: ReelCam;
    to?: ReelCam;
    /** A box drawn around something on the screen (in %), from `at` seconds. */
    highlight?: { x: number; y: number; w: number; h: number; at?: number };
    /** A click at a point on the screen (in %), `at` seconds into the shot. */
    click?: { x: number; y: number; at: number };
    /** Text typed into a field on the screen (box in %), from `at` seconds. */
    type?: { x: number; y: number; w: number; h: number; text: string; at?: number };
};

const HOOK = 3.2;
const END = 3.6;
const FADE = 0.45;
const WIDE: ReelCam = { s: 1, x: 50, y: 50 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Where the camera is, `p` (0–1) through a shot: a short hold, an eased move, a hold. */
function camAt(shot: ReelShot, p: number): ReelCam {
    const from = shot.from ?? WIDE;
    const to = shot.to ?? from;
    const e = ease(clamp((p - 0.12) / 0.62, 0, 1));
    const s = lerp(from.s, to.s, e);
    const half = 50 / s;
    return {
        s,
        x: clamp(lerp(from.x, to.x, e), half, 100 - half),
        y: clamp(lerp(from.y, to.y, e), half, 100 - half),
    };
}

/** A point on the screen (in %) to where it sits in the window, under a camera. */
const onWindow = (cam: ReelCam, x: number, y: number) => ({
    left: 50 + (x - cam.x) * cam.s,
    top: 50 + (y - cam.y) * cam.s,
});

export default function FlowReel({
    label,
    hook,
    steps,
    shots,
    end,
}: {
    /** What the film shows, for screen readers. */
    label: string;
    hook: string;
    steps: string[];
    shots: ReelShot[];
    end: string;
}) {
    const reduceMotion = useReducedMotion();
    const [t, setT] = useState(0);
    const [paused, setPaused] = useState<boolean | null>(null);
    const [inView, setInView] = useState(false);
    const root = useRef<HTMLElement>(null);

    const starts = shots.reduce<number[]>((acc, s, i) => [...acc, i === 0 ? HOOK : acc[i - 1] + shots[i - 1].dur], []);
    const showEnd = HOOK + shots.reduce((a, s) => a + s.dur, 0);
    const total = showEnd + END;

    // Motion-sensitive viewers start on a still frame and press play themselves.
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
        if (!playing) return;
        let raf = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = Math.min(0.1, (now - last) / 1000);
            last = now;
            setT((v) => (v + dt) % total);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [playing, total]);

    // Before anything has played, show the first screen rather than a blank sky.
    const poster = t === 0 && !playing;
    const inHook = !poster && t < HOOK;
    const inEnd = !poster && t >= showEnd;

    let index = 0;
    for (let i = 0; i < shots.length; i++) if (t >= starts[i]) index = i;
    const shot = shots[index];
    const local = poster ? shot.dur : clamp(t - starts[index], 0, shot.dur);
    const p = local / shot.dur;
    const cam = reduceMotion || poster ? (shot.to ?? shot.from ?? WIDE) : camAt(shot, p);
    const prevIndex = index > 0 && local < FADE && !inHook ? index - 1 : -1;
    const prevCam = prevIndex >= 0 ? camAt(shots[prevIndex], 1) : null;

    // The window floats in after the hook, and settles back out for the end line.
    const enter = inHook ? 0 : clamp((t - HOOK) / 0.7, 0, 1);
    const leave = inEnd ? clamp((t - showEnd) / 0.5, 0, 1) : 0;
    const windowOpacity = poster ? 1 : ease(enter) * (1 - leave);
    const windowLift = poster ? 0 : (1 - ease(enter)) * 18 + leave * -10;

    const typedHook = reduceMotion ? hook : hook.slice(0, Math.round(clamp(t / (HOOK * 0.62), 0, 1) * hook.length));
    const endOpacity = inEnd ? clamp((t - showEnd - 0.35) / 0.5, 0, 1) : 0;

    const cursor = (() => {
        if (!shot.click || inHook || inEnd || poster) return null;
        const { x, y, at } = shot.click;
        const from = { x: x - 9, y: y + 12 };
        const travel = reduceMotion ? 1 : ease(clamp((local - (at - 0.9)) / 0.8, 0, 1));
        const pos = onWindow(cam, lerp(from.x, x, travel), lerp(from.y, y, travel));
        const sinceClick = local - at;
        return { ...pos, visible: local > at - 1.2, pressed: sinceClick >= 0 && sinceClick < 0.18, ring: sinceClick >= 0 && sinceClick < 0.6 ? sinceClick / 0.6 : null };
    })();

    const typed = shot.type && !poster ? shot.type.text.slice(0, reduceMotion ? shot.type.text.length : Math.round(clamp((local - (shot.type.at ?? 0.4)) * 26, 0, shot.type.text.length))) : shot.type?.text;

    const stepOf = (i: number) => {
        const idx = shots.map((s, k) => (s.step === i ? k : -1)).filter((k) => k >= 0);
        if (!idx.length) return { start: 0, end: 0, first: 0 };
        return { start: starts[idx[0]], end: starts[idx[idx.length - 1]] + shots[idx[idx.length - 1]].dur, first: idx[0] };
    };

    const seek = (time: number) => {
        setT(time);
        if (isPaused) setPaused(false);
    };

    const layer = (s: ReelShot, c: ReelCam, opacity: number, key: string, current: boolean) => (
        <div
            key={key}
            className={classes.reelLayer}
            style={{
                opacity,
                transform: `translate(${50 - c.x * c.s}%, ${50 - c.y * c.s}%) scale(${c.s})`,
            }}
            aria-hidden={!current}
        >
            <Image src={s.src} alt={current ? s.alt : ""} fill sizes="(max-width: 768px) 100vw, 1100px" style={{ objectFit: "cover", objectPosition: "top" }} />
            {current && s.highlight && local >= (s.highlight.at ?? 0) && (
                <span
                    className={classes.reelHighlight}
                    style={{ left: `${s.highlight.x}%`, top: `${s.highlight.y}%`, width: `${s.highlight.w}%`, height: `${s.highlight.h}%` }}
                />
            )}
            {current && s.type && (
                <span
                    className={classes.reelType}
                    style={{ left: `${s.type.x}%`, top: `${s.type.y}%`, width: `${s.type.w}%`, height: `${s.type.h}%` }}
                >
                    {typed}
                    {!poster && typed !== s.type.text && <i className={classes.reelCaret} />}
                </span>
            )}
        </div>
    );

    return (
        <figure ref={root} className={classes.reel} aria-label={label}>
            <div className={classes.reelStage}>
                {/* Every screen is mounted once so the next one is loaded before its cut. */}
                <div
                    className={classes.reelWindow}
                    style={{ opacity: windowOpacity, transform: `translateY(${windowLift}px)` }}
                >
                    {shots.map((s, i) => {
                        if (i === index) return layer(s, cam, prevIndex >= 0 ? clamp(local / FADE, 0, 1) : 1, `s${i}`, true);
                        if (i === prevIndex && prevCam) return layer(s, prevCam, 1, `s${i}`, false);
                        return layer(s, s.from ?? WIDE, 0, `s${i}`, false);
                    })}
                    {cursor && cursor.visible && (
                        <span className={classes.reelCursor} style={{ left: `${cursor.left}%`, top: `${cursor.top}%` }} aria-hidden="true">
                            {cursor.ring !== null && (
                                <i className={classes.reelRing} style={{ opacity: 1 - cursor.ring, transform: `scale(${0.4 + cursor.ring * 1.6})` }} />
                            )}
                            <svg width="22" height="22" viewBox="0 0 24 24" style={{ transform: cursor.pressed ? "scale(0.86)" : undefined }}>
                                <path d="M5 3l14 7.5-6.2 1.6L10 18.5z" fill="#111827" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                        </span>
                    )}
                </div>

                {inHook && (
                    <p className={classes.reelHook} aria-hidden="true">
                        {typedHook}
                        <i className={classes.reelCaret} />
                    </p>
                )}
                {inEnd && (
                    <div className={classes.reelEnd} style={{ opacity: endOpacity }} aria-hidden="true">
                        <p>{end}</p>
                        <span>Navanta</span>
                    </div>
                )}

                {poster && (
                    <button type="button" className={classes.reelBigPlay} onClick={() => seek(0.001)} aria-label={`Play: ${label}`}>
                        <Play size={22} aria-hidden="true" />
                    </button>
                )}
            </div>

            <div className={classes.reelFoot}>
                <p className={classes.reelCaption} aria-live="polite">
                    {inHook ? hook : inEnd ? end : shot.caption}
                </p>
                <div className={classes.reelBar}>
                    <ol className={classes.reelSteps} aria-label="Steps">
                        {steps.map((name, i) => {
                            const st = stepOf(i);
                            const fill = poster ? 0 : clamp((t - st.start) / Math.max(0.001, st.end - st.start), 0, 1);
                            const current = !poster && !inHook && !inEnd && shot.step === i;
                            return (
                                <li key={name}>
                                    <button
                                        type="button"
                                        className={`${classes.reelStep} ${current ? classes.reelStepOn : ""} ${fill >= 1 && !inHook ? classes.reelStepDone : ""}`}
                                        onClick={() => seek(st.start + 0.01)}
                                        aria-current={current ? "step" : undefined}
                                    >
                                        <span className={classes.reelStepNum}>{i + 1}</span>
                                        {name}
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
                            onClick={() => (poster ? seek(0.001) : setPaused(!isPaused))}
                            aria-label={isPaused || poster ? "Play" : "Pause"}
                        >
                            {isPaused || poster ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                        </button>
                        <button type="button" className={classes.relayIconButton} onClick={() => seek(0.001)} aria-label="Play from the start">
                            <RotateCcw size={14} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className={classes.reelProgress} aria-hidden="true">
                    <i style={{ transform: `scaleX(${poster ? 0 : t / total})` }} />
                </div>
            </div>
        </figure>
    );
}
