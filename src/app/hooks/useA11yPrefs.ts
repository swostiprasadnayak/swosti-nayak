"use client";

import { useSyncExternalStore } from "react";

/** Visitor accessibility preferences (Control Center → Accessibility).
 *  Each one is mirrored as a `data-a11y-*` attribute on <html>; globals.css
 *  and a few components read those. Saved per browser in localStorage. */
export type A11yPrefs = {
    largerText: boolean;      // vision
    moreContrast: boolean;    // vision
    reduceMotion: boolean;    // motor
    standardCursor: boolean;  // motor
    largerCaptions: boolean;  // hearing
    muteSounds: boolean;      // hearing
};

export type A11yPref = keyof A11yPrefs;

const DEFAULTS: A11yPrefs = {
    largerText: false,
    moreContrast: false,
    reduceMotion: false,
    standardCursor: false,
    largerCaptions: false,
    muteSounds: false,
};

const KEY = "a11y-prefs";
const ATTR: Record<A11yPref, string> = {
    largerText: "data-a11y-larger-text",
    moreContrast: "data-a11y-more-contrast",
    reduceMotion: "data-a11y-reduce-motion",
    standardCursor: "data-a11y-standard-cursor",
    largerCaptions: "data-a11y-larger-captions",
    muteSounds: "data-a11y-mute-sounds",
};

let prefs: A11yPrefs = DEFAULTS;
let loaded = false;
const listeners = new Set<() => void>();

function applyToDocument() {
    const el = document.documentElement;
    (Object.keys(ATTR) as A11yPref[]).forEach((k) => {
        if (prefs[k]) el.setAttribute(ATTR[k], "");
        else el.removeAttribute(ATTR[k]);
    });
}

function ensureLoaded() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
        const raw = localStorage.getItem(KEY);
        if (raw) prefs = { ...DEFAULTS, ...JSON.parse(raw) };
    } catch { /* storage unavailable: defaults */ }
    applyToDocument();
}

export function setA11yPref(key: A11yPref, value: boolean) {
    ensureLoaded();
    prefs = { ...prefs, [key]: value };
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch { /* not persisted */ }
    applyToDocument();
    listeners.forEach((l) => l());
}

/** Non-React read (e.g. before playing a UI sound). */
export function getA11yPrefs(): A11yPrefs {
    ensureLoaded();
    return prefs;
}

function subscribe(listener: () => void) {
    ensureLoaded();
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}

export function useA11yPrefs(): A11yPrefs {
    return useSyncExternalStore(subscribe, getA11yPrefs, () => DEFAULTS);
}
