"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import ScreenTabs, { type ScreenTab } from "./ScreenTabs";
import SeatIcon, { type SeatIconName } from "./SeatIcon";
import { orbBackground, tintFor } from "./agentPalette";
import { Eyebrow, Paragraphs } from "./blocks";
import classes from "./navanta.module.css";

export type Seat = {
    id: string;
    name: string;
    role: string;
    /** The seat's glyph in the demo's profile menu. */
    icon: SeatIconName;
    agent: string;
    agentRole: string;
    agentDoes: string;
    /** The question this seat opens the day with. */
    question: string;
    quote?: string;
    /** The seat's screens, behind small tabs. */
    screens: ScreenTab[];
};

function SeatAvatar({ seat, size }: { seat: Seat; size: number }) {
    const tint = tintFor(seat.agent);
    return (
        <span
            className={classes.seatAvatar}
            style={{ width: size, height: size, background: tint.light, color: tint.ink }}
            aria-hidden="true"
        >
            <SeatIcon name={seat.icon} size={Math.round(size * 0.58)} />
        </span>
    );
}

/** The demo's own profile menu, rebuilt: pick a seat, see its person,
    their agent and the screens they work in. */
export default function SeatSwitcher({
    eyebrow,
    heading,
    intro,
    seats,
}: {
    eyebrow?: string;
    heading: string;
    intro: string[];
    seats: Seat[];
}) {
    const [activeId, setActiveId] = useState(seats[0].id);
    const reduceMotion = useReducedMotion();
    const seat = seats.find((s) => s.id === activeId) ?? seats[0];
    const tint = tintFor(seat.agent);

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

            <div className={classes.seats}>
                <div className={classes.seatMenu}>
                    <div className={classes.seatMenuHead}>
                        <SeatAvatar seat={seat} size={32} />
                        <span className={classes.seatText}>
                            <span className={classes.seatName}>{seat.name}</span>
                            <span className={classes.seatRole}>{seat.role}</span>
                        </span>
                    </div>

                    <div className={classes.seatDivider} />
                    <p className={classes.seatCaption} id="seat-switch-label">
                        Switch profile
                    </p>
                    <ul className={classes.seatList} aria-labelledby="seat-switch-label">
                        {seats.map((s) => {
                            const isActive = s.id === seat.id;
                            return (
                                <li key={s.id}>
                                    <button
                                        type="button"
                                        className={`${classes.seatButton} ${isActive ? classes.seatButtonActive : ""}`}
                                        aria-current={isActive ? "true" : undefined}
                                        onClick={() => setActiveId(s.id)}
                                    >
                                        <SeatAvatar seat={s} size={24} />
                                        <span className={classes.seatText}>
                                            <span className={classes.seatName}>{s.name}</span>
                                            <span className={classes.seatRole}>{s.role}</span>
                                        </span>
                                        {isActive && (
                                            <Check size={16} strokeWidth={2.5} aria-hidden="true" className={classes.seatCheck} />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={seat.id}
                        className={classes.seatDetail}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        aria-live="polite"
                    >
                        <Eyebrow>
                            {seat.name} · {seat.role}
                        </Eyebrow>
                        <p className={classes.seatQuestion}>{seat.question}</p>
                        {seat.quote && <blockquote className={classes.seatQuote}>“{seat.quote}”</blockquote>}
                        <div className={classes.seatAgent}>
                            <span className={classes.seatAgentName}>
                                <span
                                    className={classes.agentOrb}
                                    style={{ background: orbBackground(tint) }}
                                    aria-hidden="true"
                                />
                                {seat.agent} <span className={classes.seatAgentRole}>· {seat.agentRole}</span>
                            </span>
                            <span className={classes.legendNote}>{seat.agentDoes}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Keyed by seat, so each seat opens on its first screen. */}
            <ScreenTabs key={seat.id} items={seat.screens} label={`${seat.name}'s screens`} />
        </section>
    );
}
