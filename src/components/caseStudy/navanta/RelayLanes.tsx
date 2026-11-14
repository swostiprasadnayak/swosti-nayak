"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { Eyebrow, Paragraphs } from "./blocks";
import SeatIcon, { type SeatIconName } from "./SeatIcon";
import { orbBackground, tintFor, type AgentTint } from "./agentPalette";
import classes from "./navanta.module.css";

export type RelayLane = { id: string; seat: string; person: string; agent: string; icon: SeatIconName };

export type RelayStep = {
    lane: string;
    actor: string;
    kind: "agent" | "person";
    /** The agent stopped here and waited for a person. */
    hold?: boolean;
    /** The frame record's own badge: Read, Held, Accepted, Approved, Notified, Committed. */
    badge: string;
    /** An agent acts under a version; a person does not. */
    version?: string;
    day: string;
    at: string;
    what: string;
    detail: string;
    /** The signal type and the record it touched — the record's two chips. */
    cause: string;
    ref: string;
};

/** A lane that watches every step without taking one — the VP and its agent. */
export type RelayObserver = { seat: string; person: string; agent: string; icon: SeatIconName };

const STEP_MS = 1800;

function PersonMark({ tint, icon, size }: { tint: AgentTint; icon: SeatIconName; size: number }) {
    return (
        <span className={classes.relayMark} style={{ width: size, height: size, background: tint.light, color: tint.ink }}>
            <SeatIcon name={icon} size={Math.round(size * 0.58)} />
        </span>
    );
}

function AgentMark({ tint, size }: { tint: AgentTint; size: number }) {
    return <span className={classes.relayMark} style={{ width: size, height: size, background: orbBackground(tint) }} />;
}

/** One signal crossing every seat, drawn as swimlanes in the product's own
    colours. Steps can be played, stepped through or picked; with nothing
    picked the whole relay shows at once. */
export default function RelayLanes({
    eyebrow,
    heading,
    intro,
    lanes,
    observer,
    steps,
    summary,
    children,
}: {
    eyebrow?: string;
    heading: string;
    intro: string[];
    lanes: RelayLane[];
    observer?: RelayObserver;
    steps: RelayStep[];
    summary: string;
    /** Shown under the relay — the same story as the product records it. */
    children?: React.ReactNode;
}) {
    const [active, setActive] = useState<number | null>(null);
    const [playing, setPlaying] = useState(false);
    const reduceMotion = useReducedMotion();
    const last = steps.length - 1;
    const isPlaying = playing && active !== null && active < last;

    useEffect(() => {
        if (!isPlaying) return;
        const id = window.setTimeout(() => setActive((a) => (a === null ? 0 : a + 1)), STEP_MS);
        return () => window.clearTimeout(id);
    }, [isPlaying, active]);

    const laneIndex = (id: string) => lanes.findIndex((l) => l.id === id);
    const laneOf = (step: RelayStep) => lanes[laneIndex(step.lane)];
    const rows = lanes.length + (observer ? 1 : 0);
    const x = (i: number) => ((i + 0.5) / steps.length) * 100;
    const y = (i: number) => laneIndex(steps[i].lane) + 0.5;
    const reached = (i: number) => active === null || i <= active;

    // Consecutive steps on the same day share a header.
    const days = steps.reduce<{ day: string; start: number; end: number }[]>((acc, step, i) => {
        const prev = acc[acc.length - 1];
        if (prev && prev.day === step.day) prev.end = i;
        else acc.push({ day: step.day, start: i, end: i });
        return acc;
    }, []);

    const play = () => {
        if (active === null || active === last) setActive(0);
        setPlaying(true);
    };
    const go = (next: number | null) => {
        setPlaying(false);
        setActive(next);
    };

    const agents = steps.filter((s) => s.kind === "agent").length;
    const holds = steps.filter((s) => s.hold).length;
    const current = active === null ? null : steps[active];
    const currentLane = current ? laneOf(current) : null;
    const previous = active !== null && active > 0 ? steps[active - 1] : null;
    const handedFrom = current && previous && previous.actor !== current.actor ? previous.actor : null;
    const atlas = observer ? tintFor(observer.agent) : null;

    return (
        <section className={classes.question}>
            <div className={classes.questionHead}>
                <div>
                    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                    <h2 className={classes.h2}>{heading}</h2>
                </div>
                <div>
                    <Paragraphs items={intro} />
                </div>
            </div>

            <div className={classes.relay} style={{ "--rows": rows } as React.CSSProperties}>
                <div className={classes.relayDays} aria-hidden="true">
                    {days.map((d) => (
                        <span
                            key={d.day}
                            className={classes.relayDay}
                            style={{
                                left: `${(d.start / steps.length) * 100}%`,
                                width: `${((d.end - d.start + 1) / steps.length) * 100}%`,
                            }}
                        >
                            {d.day}
                        </span>
                    ))}
                </div>

                <div className={classes.relayGrid}>
                    <div className={classes.relayLabels}>
                        {lanes.map((lane, i) => {
                            const tint = tintFor(lane.agent);
                            return (
                                <div key={lane.id} className={`${classes.relayLabel} ${i % 2 ? classes.relayBandAlt : ""}`}>
                                    <PersonMark tint={tint} icon={lane.icon} size={28} />
                                    <span className={classes.relayLabelText}>
                                        <span className={classes.relaySeat}>{lane.seat}</span>
                                        <span className={classes.relayNames}>
                                            {lane.person} · {lane.agent}
                                        </span>
                                    </span>
                                </div>
                            );
                        })}
                        {observer && atlas && (
                            <div className={`${classes.relayLabel} ${classes.relayLabelObserver}`}>
                                <PersonMark tint={atlas} icon={observer.icon} size={28} />
                                <span className={classes.relayLabelText}>
                                    <span className={classes.relaySeat}>{observer.seat}</span>
                                    <span className={classes.relayNames}>
                                        {observer.person} · {observer.agent}
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={classes.relayTrack}>
                        {lanes.map((lane, i) => (
                            <div
                                key={lane.id}
                                className={`${classes.relayBand} ${i % 2 ? classes.relayBandAlt : ""}`}
                                style={{ "--lane": i } as React.CSSProperties}
                            />
                        ))}
                        {observer && (
                            <div
                                className={`${classes.relayBand} ${classes.relayObserver}`}
                                style={{ "--lane": lanes.length } as React.CSSProperties}
                            />
                        )}
                        {days.slice(1).map((d) => (
                            <span
                                key={d.day}
                                className={classes.relayDivider}
                                style={{ left: `${(d.start / steps.length) * 100}%` }}
                                aria-hidden="true"
                            />
                        ))}

                        <svg
                            className={classes.relayLines}
                            viewBox={`0 0 100 ${rows}`}
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            {steps.slice(1).map((step, k) => {
                                const i = k + 1;
                                const [x1, y1, x2, y2] = [x(i - 1), y(i - 1), x(i), y(i)];
                                const mid = (x1 + x2) / 2;
                                const d =
                                    y1 === y2
                                        ? `M ${x1} ${y1} L ${x2} ${y2}`
                                        : `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
                                return (
                                    <path
                                        key={`${step.day}-${step.at}`}
                                        d={d}
                                        fill="none"
                                        vectorEffect="non-scaling-stroke"
                                        className={reached(i) ? classes.relayLineDone : classes.relayLine}
                                    />
                                );
                            })}
                        </svg>

                        {/* Atlas sees every step land: one tick per step on the VP lane. */}
                        {observer &&
                            atlas &&
                            steps.map((step, i) => (
                                <span
                                    key={`tick-${step.day}-${step.at}`}
                                    className={`${classes.relayTick} ${reached(i) ? classes.relayTickOn : ""}`}
                                    style={
                                        {
                                            left: `${x(i)}%`,
                                            "--lane": lanes.length,
                                            "--tick": atlas.body,
                                        } as React.CSSProperties
                                    }
                                    aria-hidden="true"
                                />
                            ))}

                        {steps.map((step, i) => {
                            const lane = laneOf(step);
                            const tint = tintFor(lane.agent);
                            const isActive = i === active;
                            return (
                                <button
                                    key={`${step.day}-${step.at}`}
                                    type="button"
                                    className={[
                                        classes.relayDot,
                                        step.kind === "agent" ? classes.relayDotAgent : classes.relayDotPerson,
                                        step.hold ? classes.relayDotHold : "",
                                        isActive ? classes.relayDotActive : reached(i) ? "" : classes.relayDotAhead,
                                    ].join(" ")}
                                    style={
                                        {
                                            left: `${x(i)}%`,
                                            "--lane": laneIndex(step.lane),
                                            "--halo": tint.body,
                                            background: step.kind === "agent" ? orbBackground(tint) : tint.light,
                                            color: tint.ink,
                                        } as React.CSSProperties
                                    }
                                    aria-label={`Step ${i + 1}: ${step.actor}, ${step.day} ${step.at}. ${step.what}`}
                                    aria-current={isActive ? "step" : undefined}
                                    onClick={() => go(i)}
                                >
                                    {step.kind === "person" && <SeatIcon name={lane.icon} size={13} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={classes.relayAxis} aria-hidden="true">
                    {steps.map((step, i) => (
                        <span
                            key={`at-${step.day}-${step.at}`}
                            className={i === active ? classes.relayAxisActive : ""}
                            style={{ left: `${x(i)}%` }}
                        >
                            {step.at}
                        </span>
                    ))}
                </div>

                <div className={classes.relayFoot}>
                    <div className={classes.relayLegend} aria-hidden="true">
                        <span>
                            <i className={classes.relayKeyAgent} /> Agent acts
                        </span>
                        <span>
                            <i className={classes.relayKeyPerson} /> Person decides
                        </span>
                        <span>
                            <i className={classes.relayKeyHold} /> Held for a person
                        </span>
                        {observer && atlas && (
                            <span>
                                <i className={classes.relayKeyTick} style={{ background: atlas.body }} /> {observer.agent} sees it
                            </span>
                        )}
                    </div>
                    <div className={classes.relayControls}>
                        <button
                            type="button"
                            className={classes.relayIconButton}
                            onClick={() => go(active === null || active === 0 ? null : active - 1)}
                            disabled={active === null}
                            aria-label="Previous step"
                        >
                            <ChevronLeft size={16} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className={classes.relayPlay}
                            onClick={() => (isPlaying ? setPlaying(false) : play())}
                        >
                            {isPlaying ? (
                                <Pause size={14} aria-hidden="true" />
                            ) : active === last ? (
                                <RotateCcw size={14} aria-hidden="true" />
                            ) : (
                                <Play size={14} aria-hidden="true" />
                            )}
                            {isPlaying ? "Pause" : active === last ? "Replay" : "Play"}
                        </button>
                        <button
                            type="button"
                            className={classes.relayIconButton}
                            onClick={() => go(active === null ? 0 : Math.min(active + 1, last))}
                            disabled={active === last}
                            aria-label="Next step"
                        >
                            <ChevronRight size={16} aria-hidden="true" />
                        </button>
                        <span className={classes.relayCount}>
                            {active === null ? "All" : `${active + 1} / ${steps.length}`}
                        </span>
                    </div>
                </div>

                <div className={classes.relayDetail} aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={active ?? "all"}
                            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                            {current && currentLane ? (
                                <div className={`${classes.relayCard} ${current.hold ? classes.relayCardHold : ""}`}>
                                    {current.kind === "agent" ? (
                                        <AgentMark tint={tintFor(currentLane.agent)} size={32} />
                                    ) : (
                                        <PersonMark tint={tintFor(currentLane.agent)} icon={currentLane.icon} size={32} />
                                    )}
                                    <div className={classes.relayCardBody}>
                                        <div className={classes.relayCardMeta}>
                                            <span className={classes.relayCardTime}>
                                                {current.day} · {current.at}
                                            </span>
                                            <span className={classes.relayActor}>{current.actor}</span>
                                            {current.version && <span className={classes.relayVersion}>v{current.version}</span>}
                                            {handedFrom && <span className={classes.relayFrom}>→ from {handedFrom}</span>}
                                            <span
                                                className={`${classes.relayBadge} ${
                                                    current.hold
                                                        ? classes.relayBadgeHold
                                                        : /Accepted|Approved/.test(current.badge)
                                                          ? classes.relayBadgeYes
                                                          : ""
                                                }`}
                                            >
                                                {current.badge}
                                            </span>
                                        </div>
                                        <p className={classes.relayCardTitle}>{current.what}</p>
                                        <p className={classes.relayCardDetail}>{current.detail}</p>
                                        <div className={classes.relayChips}>
                                            <span>{current.cause}</span>
                                            <span>{current.ref}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={classes.relaySummary}>
                                    <dl className={classes.relayStats}>
                                        <div>
                                            <dt>Steps</dt>
                                            <dd>{steps.length}</dd>
                                        </div>
                                        <div>
                                            <dt>By agents</dt>
                                            <dd>{agents}</dd>
                                        </div>
                                        <div>
                                            <dt>By people</dt>
                                            <dd>{steps.length - agents}</dd>
                                        </div>
                                        <div>
                                            <dt>Held</dt>
                                            <dd>{holds}</dd>
                                        </div>
                                    </dl>
                                    <p className={classes.relaySummaryText}>{summary}</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            {children}
        </section>
    );
}
