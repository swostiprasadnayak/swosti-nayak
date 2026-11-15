"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Squircle } from "corner-smoothing";
import { PROJECTS } from "@/app/types/projects.types";
import DeviceMockup from "@/components/card/deviceMockup";
import CardDescription from "@/components/card/cardDescription";
import card from "@/components/card/card.module.css";
import { useCaseStudyNav } from "@/components/homePage/expandedProject/caseStudyNav";
import classes from "./navanta.module.css";

/* The end of a case study, in the portfolio's own language: a ruled split
   section (heading left, content right, like "My role" and "In numbers"),
   and on the right the next project as the same desktop window it is on
   the homepage: traffic lights, title bar, its devices on the pale desk,
   and the description panel with its heading, subtext and pills. The whole
   window opens it here; "Next" follows the project list. */

function useHeight(ref: React.RefObject<HTMLElement | null>) {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref]);
    return height;
}

export default function NextProject({ from }: { /** The current project's slug. */ from: string }) {
    const { openProject, close } = useCaseStudyNav();
    const [hovered, setHovered] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const descriptionHeight = useHeight(descriptionRef);

    const list = PROJECTS.filter((p) => !p.disabled);
    const at = list.findIndex((p) => p.slug === from);
    const next = list.length > 1 ? list[(at + 1) % list.length] : undefined;

    return (
        <section className={classes.split} aria-label="Up next">
            <div className={classes.nextIntro}>
                <h2 className={classes.h2}>Up next</h2>
                <button type="button" className={classes.nextAll} onClick={close}>
                    View all work
                </button>
            </div>

            {next && (
                <div
                    className={classes.nextWindow}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Squircle className={card.card} cornerRadius={16}>
                        <div className={card.windowHeader}>
                            <span className={classes.nextLights} aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className={card.windowTitle}>{next.name}</span>
                            <div className={card.trafficLightsPlaceholder} />
                        </div>
                        <div className={card.contentArea}>
                            <Squircle className={card.videoContainer} cornerRadius={8} style={{ position: "relative" }}>
                                {next.cardMockup ? (
                                    <DeviceMockup {...next.cardMockup} playing={hovered} bottomInset={descriptionHeight} />
                                ) : next.demoPoster ? (
                                    <Image
                                        src={next.demoPoster}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 520px"
                                        style={{ objectFit: "contain", objectPosition: "center top", padding: "4% 4% 0" }}
                                    />
                                ) : null}
                            </Squircle>
                            <div className={card.descriptionWrapper} ref={descriptionRef}>
                                <CardDescription title={next.name} description={next.description} tags={next.tags} />
                            </div>
                        </div>
                    </Squircle>
                    {/* One target over the whole window (the window holds blocks,
                        which can't sit inside a button). */}
                    <button
                        type="button"
                        className={classes.nextHit}
                        onClick={() => openProject(next.name)}
                        onFocus={() => setHovered(true)}
                        onBlur={() => setHovered(false)}
                        aria-label={`Open the next case study: ${next.name}`}
                    />
                </div>
            )}
        </section>
    );
}
