import React from "react";
import Image from "next/image";
import classes from "./navanta.module.css";

export type ScreenFrameProps = {
    /** What the screen shows; doubles as the placeholder title until media exists. */
    title: string;
    /** Original .png/.jpg in public/ — next/image makes the modern formats. */
    src?: string;
    /** Short loop in public/videos/. Takes precedence over src. */
    video?: string;
    alt?: string;
    caption?: string;
    /** CSS aspect-ratio, e.g. "16 / 10". */
    aspect?: string;
    /** Blur the media for client work that can't be shown in full. */
    redact?: boolean;
};

/** A screenshot or video in a frame. Without media it renders a labelled
    placeholder so the page can be laid out before the assets exist. */
export default function ScreenFrame({ title, src, video, alt, caption, aspect = "16 / 10", redact }: ScreenFrameProps) {
    const hasMedia = Boolean(video || src);
    return (
        <figure className={classes.screen}>
            <div
                className={`${classes.screenSurface} ${redact ? classes.redacted : ""}`}
                style={{ aspectRatio: aspect }}
            >
                {video ? (
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={alt ?? title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                ) : src ? (
                    <Image
                        src={src}
                        alt={alt ?? title}
                        fill
                        sizes="(max-width: 768px) 100vw, 900px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                ) : null}
                {!hasMedia && (
                    <div className={classes.screenPlaceholder} role="img" aria-label={`Placeholder: ${title}`}>
                        <span className={classes.eyebrow} style={{ margin: 0 }}>
                            Screen
                        </span>
                        <span className={classes.screenPlaceholderTitle}>{title}</span>
                    </div>
                )}
            </div>
            {caption && <figcaption className={classes.caption}>{caption}</figcaption>}
        </figure>
    );
}
