"use client";
import React, { useCallback, useId, useRef, useState } from "react";
import { ChevronLeft, Ear, Eye, Hand, Image as ImageIcon, Moon, Sun, Volume1, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { setA11yPref, useA11yPrefs, type A11yPref } from "@/app/hooks/useA11yPrefs";
import type { MusicPlayerState } from "@/app/hooks/useMusicPlayer";
import MusicCard from "../musicCard/musicCard";
import classes from "./controlCenterGrid.module.css";

type ControlCenterGridProps = {
    player: MusicPlayerState;
    brightness: number;
    onBrightnessChange: (percent: number) => void;
    imageIndex: number;
    onImageToggle?: () => void;
    onScreenshot?: () => void;
};

/** iOS-style Control Center body shared by the desktop panel and the mobile
 *  sheet: a wide Now Playing card on top, then four round buttons (2×2) and
 *  two tall vertical sliders (brightness, volume). Four equal columns, so it
 *  scales with whatever width the container gives it. */
export default function ControlCenterGrid({
    player, brightness, onBrightnessChange, imageIndex, onImageToggle, onScreenshot,
}: ControlCenterGridProps) {
    const { isDark, toggleTheme } = useTheme();
    const [view, setView] = useState<"main" | "accessibility">("main");
    const volume = player.volume;
    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

    if (view === "accessibility") return <AccessibilityView onBack={() => setView("main")} />;

    return (
        <div className={classes.grid}>
            <div className={classes.music}>
                <MusicCard player={player} />
            </div>

            <RoundButton label={isDark ? "Light mode" : "Dark mode"} onClick={toggleTheme}>
                {isDark ? <Sun size={24} strokeWidth={1.75} /> : <Moon size={24} strokeWidth={1.75} />}
            </RoundButton>
            <RoundButton label="Accessibility" onClick={() => setView("accessibility")}>
                <AccessibilityIcon />
            </RoundButton>

            <VerticalSlider
                label="Brightness"
                value={brightness}
                onChange={onBrightnessChange}
                icon={<Sun size={20} />}
                className={classes.colBrightness}
            />
            <VerticalSlider
                label="Volume"
                value={volume}
                onChange={player.setVolume}
                icon={<VolumeIcon size={20} />}
                className={classes.colVolume}
            />

            <RoundButton label={`Wallpaper ${imageIndex}`} onClick={onImageToggle}>
                <ImageIcon size={24} strokeWidth={1.75} />
            </RoundButton>
            <RoundButton label="Screenshot" onClick={onScreenshot}>
                <ScreenshotIcon />
            </RoundButton>
        </div>
    );
}

const A11Y_SECTIONS: { title: string; icon: React.ReactNode; items: { key: A11yPref; label: string; hint: string }[] }[] = [
    {
        title: "Vision",
        icon: <Eye size={16} strokeWidth={2} />,
        items: [
            { key: "largerText", label: "Larger text", hint: "Scales text up across the site" },
            { key: "moreContrast", label: "Increase contrast", hint: "Stronger text, borders and panels" },
        ],
    },
    {
        title: "Motor",
        icon: <Hand size={16} strokeWidth={2} />,
        items: [
            { key: "reduceMotion", label: "Reduce motion", hint: "Turns off animations and transitions" },
            { key: "standardCursor", label: "Standard cursor", hint: "Uses the system pointer only" },
        ],
    },
    {
        title: "Hearing",
        icon: <Ear size={16} strokeWidth={2} />,
        items: [
            { key: "largerCaptions", label: "Larger captions", hint: "Bigger subtitles in voice mode" },
            { key: "muteSounds", label: "Mute interface sounds", hint: "Silences the screenshot click" },
        ],
    },
];

/** Accessibility view, shown in place of the grid: Vision, Motor and Hearing
 *  settings as iOS-style switches. Saved per visitor (useA11yPrefs). */
function AccessibilityView({ onBack }: { onBack: () => void }) {
    const prefs = useA11yPrefs();
    return (
        <div className={classes.a11y}>
            <button type="button" className={classes.a11yBack} onClick={onBack}>
                <ChevronLeft size={18} strokeWidth={2.25} />
                <span>Accessibility</span>
            </button>
            {A11Y_SECTIONS.map((section) => (
                <section key={section.title} className={classes.a11ySection} aria-label={section.title}>
                    <h3 className={classes.a11yHeading}>{section.icon}{section.title}</h3>
                    {section.items.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            role="switch"
                            aria-checked={prefs[item.key]}
                            className={classes.a11yRow}
                            onClick={() => setA11yPref(item.key, !prefs[item.key])}
                        >
                            <span className={classes.a11yText}>
                                <span className={classes.a11yLabel}>{item.label}</span>
                                <span className={classes.a11yHint}>{item.hint}</span>
                            </span>
                            <span className={classes.switch} aria-hidden="true"><span /></span>
                        </button>
                    ))}
                </section>
            ))}
        </div>
    );
}

/** The iOS Accessibility glyph, measured from iOS (fractions of the ring
 *  diameter): head centre 0.22 down, arm bar at 0.33 spanning 0.26–0.75,
 *  torso to 0.6, legs ending at 0.8 and 0.38/0.62 across, ring ≈ 0.05 thick.
 *  Drawn at 34px so the ring is ≈47% of the 62px button, as on iOS. */
function AccessibilityIcon() {
    return (
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="12" cy="6.05" r="1.5" fill="currentColor" />
            <path d="M7 8.5h10.25" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
            <rect x="10.65" y="8.2" width="2.7" height="5.9" rx="0.8" fill="currentColor" />
            <path d="M11.35 13.5L9.55 18.3M12.65 13.5l1.8 4.8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
    );
}

/** Screenshot glyph modelled on macOS's Screenshot icon: four corner brackets
 *  out at the frame edges, a solid camera centred with clear space around it,
 *  and a knocked-out lens ring (masked, so it works on any button colour). */
function ScreenshotIcon() {
    const lens = `ss-lens-${useId().replace(/:/g, "")}`;
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8.5V5A2.5 2.5 0 0 1 5 2.5h3.5" />
                <path d="M15.5 2.5H19A2.5 2.5 0 0 1 21.5 5v3.5" />
                <path d="M21.5 15.5V19a2.5 2.5 0 0 1-2.5 2.5h-3.5" />
                <path d="M8.5 21.5H5A2.5 2.5 0 0 1 2.5 19v-3.5" />
            </g>
            <mask id={lens}>
                <rect width="24" height="24" fill="white" />
                <circle cx="12" cy="12.6" r="2.45" fill="none" stroke="black" strokeWidth="1.1" />
            </mask>
            <path
                mask={`url(#${lens})`}
                fill="currentColor"
                d="M8 8.7h1.7l.85-1.4h2.9l.85 1.4H16a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 8 8.7z"
            />
        </svg>
    );
}

function RoundButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
    return (
        <button type="button" className={classes.round} onClick={onClick} aria-label={label} title={label}>
            {children}
        </button>
    );
}

type VerticalSliderProps = {
    label: string;
    value: number;
    onChange: (percent: number) => void;
    icon: React.ReactNode;
    className?: string;
};

/** The original brightness-bar look (raised tile, grey rail, lighter fill,
 *  ticks, thin handle, grey icon) stood upright: the fill rises from the
 *  bottom. Drag or tap anywhere on the tile; arrow keys / Home / End. */
function VerticalSlider({ label, value, onChange, icon, className }: VerticalSliderProps) {
    const ref = useRef<HTMLDivElement>(null); // the rail: level is measured against it

    const setFromY = useCallback((clientY: number) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const pct = ((r.bottom - clientY) / r.height) * 100;
        onChange(Math.round(Math.min(100, Math.max(0, pct))));
    }, [onChange]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 20 : 5;
        let next: number | null = null;
        if (e.key === "ArrowUp" || e.key === "ArrowRight") next = value + step;
        else if (e.key === "ArrowDown" || e.key === "ArrowLeft") next = value - step;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = 100;
        if (next === null) return;
        e.preventDefault();
        onChange(Math.min(100, Math.max(0, next)));
    };

    return (
        <div
            className={`${classes.vSlider} ${className ?? ""}`}
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            onPointerDown={(e) => {
                setFromY(e.clientY);
                // Keep receiving moves while dragging outside the pill.
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }
            }}
            onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromY(e.clientY); }}
            onKeyDown={onKeyDown}
        >
            <div ref={ref} className={classes.vRail}>
                <div className={classes.vFill} style={{ height: `${value}%` }} />
                <div className={classes.vTicks} />
                <div className={classes.vHandle} style={{ bottom: `calc(6px + (100% - 16px) * ${value / 100})` }} />
            </div>
            <div className={classes.vIcon}>{icon}</div>
        </div>
    );
}
