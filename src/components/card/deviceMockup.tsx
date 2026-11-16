"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "motion/react";
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

/* On hover the devices lean towards the pointer, a few degrees in 3D, as if
   the side under it came forward; they settle flat again when it leaves. The
   card's tile stays still. It follows the pointer anywhere over the card that
   holds them (the nearest [data-tilt-host]), not just over the devices. */
const TILT_MAX = 8; // degrees, at the card's edge
const TILT_SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

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
    const sceneRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    // Motion-sensitive viewers get the poster frame, still.
    useVideoPlayback(videoRef, playing && !reduceMotion);

    const rotateX = useSpring(0, TILT_SPRING);
    const rotateY = useSpring(0, TILT_SPRING);
    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene || reduceMotion) return;
        const host = scene.closest<HTMLElement>("[data-tilt-host]") ?? scene;
        const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
        const move = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const r = scene.getBoundingClientRect();
            const x = clamp((e.clientX - r.left) / r.width - 0.5);
            const y = clamp((e.clientY - r.top) / r.height - 0.5);
            // The side under the pointer comes forward.
            rotateY.set(-x * 2 * TILT_MAX);
            rotateX.set(y * 2 * TILT_MAX);
        };
        const settle = () => {
            rotateX.set(0);
            rotateY.set(0);
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", settle);
        return () => {
            host.removeEventListener("pointermove", move);
            host.removeEventListener("pointerleave", settle);
            settle();
        };
    }, [reduceMotion, rotateX, rotateY]);

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
        <div className={classes.scene} ref={sceneRef} aria-hidden="true">
            <div className={classes.area} style={{ bottom: bottomInset }}>
                <motion.div className={`${classes.stage} ${LAYOUT_CLASS[layout]}`} style={{ rotateX, rotateY }}>
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
                </motion.div>
            </div>
        </div>
    );
}
