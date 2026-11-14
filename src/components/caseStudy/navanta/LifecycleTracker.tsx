"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ScreenFrame, { type ScreenFrameProps } from "./ScreenFrame";
import { Eyebrow, Paragraphs } from "./blocks";
import classes from "./navanta.module.css";

export type LifecycleStep = {
    name: string;
    /** What the user knows and can do at this step. */
    note: string;
    screen: ScreenFrameProps;
};

/** The life of one record, step by step. Readers click through the states
    instead of reading annotations about them. */
export default function LifecycleTracker({
    eyebrow,
    heading,
    intro,
    steps,
}: {
    eyebrow?: string;
    heading: string;
    intro: string[];
    steps: LifecycleStep[];
}) {
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();
    const current = steps[active];

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

            <div className={classes.lifecycle}>
                <ol className={classes.steps} aria-label={`${heading}: steps`}>
                    {steps.map((step, i) => {
                        const isActive = i === active;
                        return (
                            <li key={step.name}>
                                <button
                                    type="button"
                                    className={`${classes.stepButton} ${isActive ? classes.stepActive : ""}`}
                                    aria-current={isActive ? "step" : undefined}
                                    onClick={() => setActive(i)}
                                >
                                    <span className={classes.stepIndex}>{i + 1}</span>
                                    <span className={classes.stepName}>{step.name}</span>
                                    {isActive && <span className={classes.stepNote}>{step.note}</span>}
                                </button>
                            </li>
                        );
                    })}
                </ol>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.name}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <ScreenFrame {...current.screen} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
