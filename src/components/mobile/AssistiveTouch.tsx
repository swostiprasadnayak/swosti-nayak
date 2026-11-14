"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue } from "motion/react";
import { useIsClient } from "@/app/hooks/useIsClient";

const SIZE = 56;
const EDGE = 10;          // gap from the screen edge once docked
const TOP_SAFE = 88;      // stay clear of the name + menu button
const BOTTOM_SAFE = 110;  // stay clear of the dock
const DEFAULT_BOTTOM = 190; // first spot: above the dock and the "use desktop" banner
const IDLE_MS = 3000;     // fades back after this long untouched
const IDLE_OPACITY = 0.45;
const STORE_KEY = "assistive-touch-position";
const SNAP = { type: "spring" as const, stiffness: 520, damping: 40 };

type AssistiveTouchProps = {
    onTap: () => void;
};

/**
 * iPhone AssistiveTouch-style floating button: drag it anywhere, it snaps to
 * the nearest side edge; fades back when idle; tap to open. Remembers where
 * the visitor left it (per browser; works without storage too).
 */
export default function AssistiveTouch({ onTap }: AssistiveTouchProps) {
    const isClient = useIsClient();
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const opacity = useMotionValue(1);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const dragged = useRef(false);

    const wake = useCallback(() => {
        clearTimeout(idleTimer.current);
        animate(opacity, 1, { duration: 0.15 });
        idleTimer.current = setTimeout(() => animate(opacity, IDLE_OPACITY, { duration: 0.6 }), IDLE_MS);
    }, [opacity]);

    // Snap to the nearer side edge; keep vertically clear of the top bar and dock.
    const snap = useCallback((animated: boolean) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const left = x.get() + SIZE / 2 < vw / 2;
        const tx = left ? EDGE : vw - SIZE - EDGE;
        const ty = Math.min(Math.max(y.get(), TOP_SAFE), vh - SIZE - BOTTOM_SAFE);
        if (animated) {
            animate(x, tx, SNAP);
            animate(y, ty, SNAP);
        } else {
            x.set(tx);
            y.set(ty);
        }
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify({ side: left ? "left" : "right", yRatio: ty / vh }));
        } catch { /* storage unavailable: position just isn't remembered */ }
    }, [x, y]);

    useEffect(() => {
        // Restore the last spot; default is the right edge above the dock + banner.
        let side = "right";
        let yRatio: number | null = null;
        try {
            const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
            if (saved && (saved.side === "left" || saved.side === "right") && typeof saved.yRatio === "number") {
                side = saved.side;
                yRatio = saved.yRatio;
            }
        } catch { /* ignore */ }
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        x.set(side === "left" ? EDGE : vw - SIZE - EDGE);
        y.set(yRatio !== null ? yRatio * vh : vh - SIZE - DEFAULT_BOTTOM);
        snap(false);
        wake();

        const onResize = () => snap(false);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(idleTimer.current);
        };
    }, [x, y, snap, wake]);

    // Portalled to <body>: inside the page's stacking contexts (main area z-10)
    // even a high z-index stays under top-level layers like the banner.
    if (!isClient) return null;
    return createPortal(
        <motion.button
            type="button"
            aria-label="Open Control Center"
            title="Controls"
            drag
            dragMomentum={false}
            dragElastic={0}
            onPointerDown={() => { dragged.current = false; wake(); }}
            onDragStart={() => { dragged.current = true; }}
            onDragEnd={() => { snap(true); wake(); }}
            onTap={() => { if (!dragged.current) onTap(); }}
            whileTap={{ scale: 0.92 }}
            style={{
                x, y, opacity,
                position: "fixed",
                top: 0,
                left: 0,
                width: SIZE,
                height: SIZE,
                padding: 0,
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(28, 28, 30, 0.72)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                touchAction: "none",
                zIndex: 10000, // floats above page content and the "use desktop" banner, like iOS
                pointerEvents: "auto",
            }}
        >
            {/* The AssistiveTouch mark: three concentric discs */}
            <span aria-hidden="true" style={{ position: "relative", width: 38, height: 38 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)" }} />
                <span style={{ position: "absolute", inset: 4, borderRadius: "50%", background: "rgba(255, 255, 255, 0.32)" }} />
                <span style={{ position: "absolute", inset: 8, borderRadius: "50%", background: "rgba(255, 255, 255, 0.95)" }} />
            </span>
        </motion.button>,
        document.body
    );
}
