import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import classes from "./navanta.module.css";

/* The working prototype at the end of a case study: a screenshot in the
   reels' 16:10 frame that opens the live site in a new tab.
   Not embedded: the demos keep their sign-in in a SameSite=Lax cookie,
   which browsers refuse inside another site's frame, so an embedded demo
   drops back to its sign-in screen. A new tab is the real thing. */

export default function LivePrototype({
    heading = "Try it live",
    note,
    href,
    poster,
    title,
}: {
    heading?: string;
    note: string;
    href: string;
    /** A 16:10 screenshot of the prototype. */
    poster: string;
    /** Names the prototype, for the link's label. */
    title: string;
}) {
    return (
        <section className={classes.live}>
            <div>
                <h2 className={classes.h2}>{heading}</h2>
                <p className={`${classes.body} ${classes.liveNote}`}>{note}</p>
            </div>

            <a
                className={classes.liveFrame}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${title} live prototype in a new tab`}
            >
                <Image
                    src={poster}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 1100px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <span className={classes.liveLaunch} aria-hidden="true">
                    Open the live prototype
                    <ArrowUpRight size={16} />
                </span>
            </a>
        </section>
    );
}
