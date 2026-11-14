"use client";
import React, { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ScreenFrame, { type ScreenFrameProps } from "./ScreenFrame";
import classes from "./navanta.module.css";

export type ScreenTab = {
    label: string;
    /** One line under the tabs — what to look at in this screen. */
    note?: string;
    screen: ScreenFrameProps;
};

/** Several screens of one experience behind small tabs, so the page shows
    more of the product without more words. */
export default function ScreenTabs({ items, label }: { items: ScreenTab[]; label: string }) {
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const current = items[active];

    const onKeyDown = (e: React.KeyboardEvent) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        const next = (active + step + items.length) % items.length;
        setActive(next);
        tabs.current[next]?.focus();
    };

    return (
        <div className={classes.screenTabs}>
            {items.length > 1 && (
                <div className={classes.tabRow} role="tablist" aria-label={label} onKeyDown={onKeyDown}>
                    {items.map((item, i) => (
                        <button
                            key={item.label}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`${id}-tab-${i}`}
                            aria-selected={i === active}
                            aria-controls={`${id}-panel`}
                            tabIndex={i === active ? 0 : -1}
                            className={`${classes.tab} ${i === active ? classes.tabActive : ""}`}
                            onClick={() => setActive(i)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

            <div
                id={`${id}-panel`}
                role={items.length > 1 ? "tabpanel" : undefined}
                aria-labelledby={items.length > 1 ? `${id}-tab-${active}` : undefined}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.label}
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        {current.note && <p className={classes.tabNote}>{current.note}</p>}
                        <ScreenFrame {...current.screen} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
