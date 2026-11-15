"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import classes from "./deviceMockup.module.css";
import { useVideoPlayback } from "@/app/hooks/useVideoPlayback";

/* A card's media drawn as devices on a pale desk, like the Insure-Tech card:
   one device plays the project's film, a second shows another screen from the
   same product. Each project picks a layout that fits where its product is
   used, so the cards don't all look alike. Sizes are in container units, so
   the scene holds its shape in the window, grid and mobile cards alike. */

export type DeviceLayout =
    /** A desk display playing the film, a laptop beside it. */
    | "desk"
    /** A laptop playing the film, a phone in front of it. */
    | "laptop-phone"
    /** A thin wall screen playing the film, a tablet in front of it. */
    | "wall-tablet"
    /** A thin wall screen playing the film, on its own. */
    | "wall";

export type DeviceMockupProps = {
    layout?: DeviceLayout;
    /** The film (muted, looping). */
    film: string;
    /** First frame of the film, shown until it plays. */
    poster: string;
    /** A still for the second device (not used by "wall"). */
    still?: string;
    /** The film's aspect ratio, e.g. "16 / 10". The film's screen takes its shape. */
    filmAspect?: string;
    /** Plays while true (the card is on the desktop, not expanded). */
    playing: boolean;
    /** Pixels at the bottom that the card's description covers. */
    bottomInset?: number;
};

const LAYOUT_CLASS: Record<DeviceLayout, string> = {
    desk: classes.desk,
    "laptop-phone": classes.laptopPhone,
    "wall-tablet": classes.wallTablet,
    wall: classes.wallOnly,
};

function Still({ src, sizes }: { src: string; sizes: string }) {
    return <Image src={src} alt="" fill sizes={sizes} style={{ objectFit: "cover", objectPosition: "top left" }} />;
}

function Monitor({ aspect, children }: { aspect: string; children: React.ReactNode }) {
    return (
        <div className={classes.monitor}>
            <div className={classes.monitorScreen} style={{ aspectRatio: aspect }}>
                {children}
            </div>
            <div className={classes.neck} />
            <div className={classes.foot} />
        </div>
    );
}

function Laptop({ aspect = "16 / 10", children }: { aspect?: string; children: React.ReactNode }) {
    return (
        <div className={classes.laptop}>
            <div className={classes.lid}>
                <div className={classes.laptopScreen} style={{ aspectRatio: aspect }}>
                    {children}
                </div>
            </div>
            <div className={classes.base} />
        </div>
    );
}

function Phone({ children }: { children: React.ReactNode }) {
    return (
        <div className={classes.phone}>
            <div className={classes.phoneScreen}>
                {children}
                <span className={classes.island} />
            </div>
        </div>
    );
}

function Wall({ aspect, children }: { aspect: string; children: React.ReactNode }) {
    return (
        <div className={classes.wall}>
            <div className={classes.wallScreen} style={{ aspectRatio: aspect }}>
                {children}
            </div>
        </div>
    );
}

function Tablet({ children }: { children: React.ReactNode }) {
    return (
        <div className={classes.tablet}>
            <div className={classes.tabletScreen}>{children}</div>
        </div>
    );
}

export default function DeviceMockup({
    layout = "desk",
    film,
    poster,
    still,
    filmAspect = "16 / 10",
    playing,
    bottomInset = 0,
}: DeviceMockupProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reduceMotion = useReducedMotion();
    // Motion-sensitive viewers get the poster frame, still.
    useVideoPlayback(videoRef, playing && !reduceMotion);

    const filmEl = (
        <video
            ref={videoRef}
            className={classes.film}
            src={film}
            poster={poster}
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
        />
    );

    return (
        <div className={classes.scene} aria-hidden="true">
            <div className={classes.area} style={{ bottom: bottomInset }}>
                <div className={`${classes.stage} ${LAYOUT_CLASS[layout]}`}>
                    {layout === "desk" && (
                        <>
                            <Monitor aspect={filmAspect}>{filmEl}</Monitor>
                            <Laptop>{still && <Still src={still} sizes="240px" />}</Laptop>
                        </>
                    )}
                    {layout === "laptop-phone" && (
                        <>
                            <Laptop aspect={filmAspect}>{filmEl}</Laptop>
                            <Phone>{still && <Still src={still} sizes="120px" />}</Phone>
                        </>
                    )}
                    {layout === "wall-tablet" && (
                        <>
                            <Wall aspect={filmAspect}>{filmEl}</Wall>
                            <Tablet>{still && <Still src={still} sizes="240px" />}</Tablet>
                        </>
                    )}
                    {layout === "wall" && <Wall aspect={filmAspect}>{filmEl}</Wall>}
                </div>
            </div>
        </div>
    );
}
