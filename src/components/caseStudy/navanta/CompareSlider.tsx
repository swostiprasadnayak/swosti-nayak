"use client";
import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import nav from "./navanta.module.css";
import classes from "./compareSlider.module.css";

/* Before and after of one screen, framed alike: the before is clipped over
   the after, and a divider wipes between them. Drag anywhere on the screen,
   or focus the handle and use the arrow keys. */

type Shot = { src: string; alt: string };

export type ComparePair = {
    label: string;
    /** One line above the screens: what changed here. */
    note?: string;
    before: Shot;
    after: Shot;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export default function CompareSlider({
    pairs,
    aspect,
    beforeLabel = "First look",
    afterLabel = "Now",
    label,
}: {
    pairs: ComparePair[];
    /** CSS aspect-ratio shared by every screen, e.g. "2000 / 1161". */
    aspect: string;
    beforeLabel?: string;
    afterLabel?: string;
    /** What the comparison shows, for the tab list and the handle. */
    label: string;
}) {
    const [active, setActive] = useState(0);
    const [pos, setPos] = useState(50);
    const [dragging, setDragging] = useState(false);
    const surface = useRef<HTMLDivElement>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const id = useId();
    const pair = pairs[active];

    const fromPointer = (clientX: number) => {
        const box = surface.current?.getBoundingClientRect();
        if (!box || box.width === 0) return;
        setPos(clamp(((clientX - box.left) / box.width) * 100));
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        fromPointer(e.clientX);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragging) fromPointer(e.clientX);
    };
    const endDrag = () => setDragging(false);

    const onHandleKey = (e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 20 : 5;
        const next =
            e.key === "ArrowLeft" || e.key === "ArrowDown"
                ? pos - step
                : e.key === "ArrowRight" || e.key === "ArrowUp"
                  ? pos + step
                  : e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 100
                      : null;
        if (next === null) return;
        e.preventDefault();
        setPos(clamp(next));
    };

    const onTabKey = (e: React.KeyboardEvent) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        const next = (active + step + pairs.length) % pairs.length;
        setActive(next);
        tabs.current[next]?.focus();
    };

    return (
        <div className={nav.screenTabs}>
            {pairs.length > 1 && (
                <div className={nav.tabRow} role="tablist" aria-label={label} onKeyDown={onTabKey}>
                    {pairs.map((p, i) => (
                        <button
                            key={p.label}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`${id}-tab-${i}`}
                            aria-selected={i === active}
                            aria-controls={`${id}-panel`}
                            tabIndex={i === active ? 0 : -1}
                            className={`${nav.tab} ${i === active ? nav.tabActive : ""}`}
                            onClick={() => setActive(i)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            )}

            <div
                id={`${id}-panel`}
                role={pairs.length > 1 ? "tabpanel" : undefined}
                aria-labelledby={pairs.length > 1 ? `${id}-tab-${active}` : undefined}
            >
                {pair.note && <p className={nav.tabNote}>{pair.note}</p>}
                <figure className={nav.screen}>
                    <div
                        ref={surface}
                        className={`${nav.screenSurface} ${classes.surface} ${dragging ? classes.dragging : ""}`}
                        style={{ aspectRatio: aspect }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    >
                        <Image
                            src={pair.after.src}
                            alt={pair.after.alt}
                            fill
                            draggable={false}
                            sizes="(max-width: 768px) 100vw, 900px"
                            style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                        <div className={classes.before} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                            <Image
                                src={pair.before.src}
                                alt={pair.before.alt}
                                fill
                                draggable={false}
                                sizes="(max-width: 768px) 100vw, 900px"
                                style={{ objectFit: "cover", objectPosition: "top" }}
                            />
                        </div>

                        <span className={`${classes.tag} ${classes.tagBefore}`} style={{ opacity: pos < 18 ? 0 : 1 }} aria-hidden="true">
                            {beforeLabel}
                        </span>
                        <span className={`${classes.tag} ${classes.tagAfter}`} style={{ opacity: pos > 82 ? 0 : 1 }} aria-hidden="true">
                            {afterLabel}
                        </span>

                        <div className={classes.divider} style={{ left: `${pos}%` }} aria-hidden="true" />
                        <div
                            className={classes.handle}
                            style={{ left: `${pos}%` }}
                            role="slider"
                            tabIndex={0}
                            aria-label={`${label}: ${beforeLabel.toLowerCase()} on the left, ${afterLabel.toLowerCase()} on the right`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(pos)}
                            aria-valuetext={`${Math.round(pos)}% ${beforeLabel.toLowerCase()}`}
                            onKeyDown={onHandleKey}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M7.5 5 3 10l4.5 5M12.5 5 17 10l-4.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
    );
}
