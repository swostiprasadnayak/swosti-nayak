"use client";

import { useSyncExternalStore } from "react";

/** Night Shift (Control Center): tints the whole site a warm amber, like
 *  macOS Night Shift, by multiplying a fixed overlay over everything. Works
 *  on top of light or dark mode. Saved per browser in localStorage and
 *  mirrored as `data-night-shift` on <html>. */

const KEY = "night-shift";
const ATTR = "data-night-shift";
// White becomes a soft cream (255, 224, 196); dark stays dark.
const TINT = "rgb(255, 165, 90)";
const STRENGTH = 0.36;

let on = false;
let loaded = false;
let overlay: HTMLDivElement | null = null;
const listeners = new Set<() => void>();

function ensureOverlay(): HTMLDivElement {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        background: TINT,
        mixBlendMode: "multiply",
        opacity: "0",
        pointerEvents: "none",
        zIndex: "9999",
        transition: "opacity 600ms ease",
    });
    document.body.appendChild(overlay);
    return overlay;
}

function apply() {
    const el = document.documentElement;
    if (on) el.setAttribute(ATTR, "");
    else el.removeAttribute(ATTR);
    if (on || overlay) ensureOverlay().style.opacity = on ? String(STRENGTH) : "0";
}

function ensureLoaded() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
        on = localStorage.getItem(KEY) === "on";
    } catch { /* storage unavailable: off */ }
    apply();
}

export function setNightShift(value: boolean) {
    ensureLoaded();
    on = value;
    try { localStorage.setItem(KEY, value ? "on" : "off"); } catch { /* not persisted */ }
    apply();
    listeners.forEach((l) => l());
}

function getNightShift(): boolean {
    ensureLoaded();
    return on;
}

function subscribe(listener: () => void) {
    ensureLoaded();
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}

export function useNightShift(): boolean {
    return useSyncExternalStore(subscribe, getNightShift, () => false);
}
