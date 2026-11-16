"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Squircle } from "corner-smoothing";
import { PROJECTS, type ProjectContent } from "@/app/types/projects.types";
import DeviceMockup from "@/components/card/deviceMockup";
import CardDescription from "@/components/card/cardDescription";
import card from "@/components/card/card.module.css";
import { useCaseStudyNav } from "@/components/homePage/expandedProject/caseStudyNav";
import classes from "./navanta.module.css";

/* The end of a case study: the next two projects as small desktop cards on
   a painted sunset sky (an oil sketch of clouds), soft enough that the cards
   lead. Each card
   is the homepage card without its title bar or subtext: the devices, the
   project's name, and its two key pills. A card opens its case study in this
   window; "View all work" closes to the desktop. Order follows the project
   list, wrapping round, so it always matches the dock. */

const UPCOMING = 2;
const BACKDROP = "/images/backdrops/sunset-sky-study.jpg";

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

function NextCard({ project, onOpen }: { project: ProjectContent; onOpen: () => void }) {
    const [hovered, setHovered] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const descriptionHeight = useHeight(descriptionRef);

    return (
        <div
            className={classes.nextWindow}
            data-tilt-host
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Squircle className={`${card.card} ${classes.nextShell}`} cornerRadius={16}>
                <div className={card.contentArea}>
                    <Squircle className={card.videoContainer} cornerRadius={8} style={{ position: "relative" }}>
                        {project.cardMockup ? (
                            <DeviceMockup {...project.cardMockup} playing={hovered} bottomInset={descriptionHeight} />
                        ) : project.demoPoster ? (
                            <Image
                                src={project.demoPoster}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                style={{ objectFit: "contain", objectPosition: "center top", padding: "4% 4% 0" }}
                            />
                        ) : null}
                    </Squircle>
                    <div className={card.descriptionWrapper} ref={descriptionRef}>
                        {/* The name is the panel's heading here (no title bar, no subtext). */}
                        <CardDescription title={project.name} description={project.name} tags={project.tags} compact />
                    </div>
                </div>
            </Squircle>
            {/* One target over the whole card (it holds blocks, which can't sit
                inside a button). */}
            <button
                type="button"
                className={classes.nextHit}
                onClick={onOpen}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                aria-label={`Open the ${project.name} case study`}
            />
        </div>
    );
}

export default function NextProject({ from }: { /** The current project's slug. */ from: string }) {
    const { openProject, close } = useCaseStudyNav();

    // Projects flagged notInUpNext are never suggested; the rest follow the
    // project list, wrapping round, never repeating the current one.
    const list = PROJECTS.filter((p) => !p.disabled && !p.notInUpNext);
    const at = list.findIndex((p) => p.slug === from);
    const upcoming = Array.from({ length: list.length }, (_, i) => list[(at + 1 + i) % list.length])
        .filter((p) => p.slug !== from)
        .slice(0, UPCOMING);

    return (
        <section className={classes.upNext} aria-label="Up next">
            <div className={classes.upNextHead}>
                <h2 className={classes.h2}>Up next</h2>
                <button type="button" className={classes.nextAll} onClick={close}>
                    View all work
                </button>
            </div>
            <div className={classes.upNextStage}>
                <Image src={BACKDROP} alt="" fill sizes="(max-width: 768px) 100vw, 900px" className={classes.upNextBackdrop} />
                <div className={classes.upNextCards}>
                    {upcoming.map((p) => (
                        <NextCard key={p.slug} project={p} onOpen={() => openProject(p.name)} />
                    ))}
                </div>
            </div>
        </section>
    );
}
