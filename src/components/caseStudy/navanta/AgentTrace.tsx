"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import classes from "./navanta.module.css";

export type TraceStep = { label: string; detail?: string };

type Phase = "idle" | "playing" | "done";

const STEP_MS = 650;

/** The agent's working, replayed: steps appear one at a time, then fold into
    a one-line summary above the answer. Mirrors the pattern in the product. */
export default function AgentTrace({
    agent,
    prompt,
    steps,
    result,
}: {
    agent: string;
    prompt: string;
    steps: TraceStep[];
    result: string;
}) {
    const [phase, setPhase] = useState<Phase>("idle");
    const [shown, setShown] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const reduceMotion = useReducedMotion();
    // One array for the component's life; never reassigned, so cleanup can hold it.
    const timers = useRef<number[]>([]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach((id) => window.clearTimeout(id));
    }, []);

    const clearTimers = () => {
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current.length = 0;
    };

    const play = () => {
        clearTimers();
        setExpanded(false);
        if (reduceMotion) {
            setShown(steps.length);
            setPhase("done");
            return;
        }
        setShown(0);
        setPhase("playing");
        steps.forEach((_, i) => {
            timers.current.push(window.setTimeout(() => setShown(i + 1), STEP_MS * (i + 1)));
        });
        timers.current.push(window.setTimeout(() => setPhase("done"), STEP_MS * (steps.length + 1)));
    };

    const showSteps = phase === "playing" || (phase === "done" && expanded);
    const visibleSteps = phase === "playing" ? steps.slice(0, shown) : steps;

    return (
        <div className={classes.trace}>
            <div className={classes.traceHeader}>
                <p className={classes.traceTitle}>
                    {agent} · <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>“{prompt}”</span>
                </p>
                <button type="button" className={classes.traceButton} onClick={play} disabled={phase === "playing"}>
                    {phase === "idle" ? "Play" : "Replay"}
                </button>
            </div>

            {phase === "done" && (
                <button
                    type="button"
                    className={classes.traceButton}
                    style={{ border: "none", padding: 0, marginBottom: showSteps ? 10 : 0 }}
                    aria-expanded={expanded}
                    onClick={() => setExpanded((v) => !v)}
                >
                    <span className={classes.traceSummary}>
                        {agent} worked through {steps.length} steps · {expanded ? "Hide" : "Show"}
                    </span>
                </button>
            )}

            {phase === "idle" && <p className={classes.traceSummary}>Press play to watch {agent} work.</p>}

            <AnimatePresence initial={false}>
                {showSteps && (
                    <motion.ol
                        key="steps"
                        className={classes.traceSteps}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        aria-live="polite"
                    >
                        {visibleSteps.map((step) => (
                            <motion.li
                                key={step.label}
                                className={classes.traceStep}
                                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <span className={classes.traceDot} aria-hidden="true" />
                                <span>
                                    <span className={classes.traceLabel}>{step.label}</span>
                                    {step.detail && <span className={classes.traceDetail}> — {step.detail}</span>}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ol>
                )}
            </AnimatePresence>

            {phase === "done" && <div className={classes.traceResult}>{result}</div>}
        </div>
    );
}
