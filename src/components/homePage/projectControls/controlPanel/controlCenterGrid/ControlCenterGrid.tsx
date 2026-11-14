"use client";
import React, { useCallback, useRef } from "react";
import { AudioLines, Image as ImageIcon, Moon, Sun, Volume1, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import type { MusicPlayerState } from "@/app/hooks/useMusicPlayer";
import MusicCard from "../musicCard/musicCard";
import classes from "./controlCenterGrid.module.css";

type ControlCenterGridProps = {
    player: MusicPlayerState;
    brightness: number;
    onBrightnessChange: (percent: number) => void;
    imageIndex: number;
    onImageToggle?: () => void;
    onVoiceMode?: () => void;
    onScreenshot?: () => void;
};

/** iOS-style Control Center body shared by the desktop panel and the mobile
 *  sheet: a wide Now Playing card on top, then four round buttons (2×2) and
 *  two tall vertical sliders (brightness, volume). Four equal columns, so it
 *  scales with whatever width the container gives it. */
export default function ControlCenterGrid({
    player, brightness, onBrightnessChange, imageIndex, onImageToggle, onVoiceMode, onScreenshot,
}: ControlCenterGridProps) {
    const { isDark, toggleTheme } = useTheme();
    const volume = player.volume;
    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

    return (
        <div className={classes.grid}>
            <div className={classes.music}>
                <MusicCard player={player} />
            </div>

            <RoundButton label={isDark ? "Light mode" : "Dark mode"} onClick={toggleTheme}>
                {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
            </RoundButton>
            <RoundButton label="Voice mode" onClick={onVoiceMode}>
                <AudioLines size={20} strokeWidth={2} />
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
                <ImageIcon size={20} strokeWidth={2} />
            </RoundButton>
            <RoundButton label="Screenshot" onClick={onScreenshot}>
                <ScreenshotIcon />
            </RoundButton>
        </div>
    );
}

/** Screenshot glyph in the style of macOS's camera.viewfinder: viewfinder
 *  corners around a small camera (a bare camera reads as "take a photo"). */
function ScreenshotIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7.5V5a2 2 0 0 1 2-2h2.5" />
            <path d="M16.5 3H19a2 2 0 0 1 2 2v2.5" />
            <path d="M21 16.5V19a2 2 0 0 1-2 2h-2.5" />
            <path d="M7.5 21H5a2 2 0 0 1-2-2v-2.5" />
            <path d="M8.6 8.8h1.3l.8-1.3h2.6l.8 1.3h1.3a1.2 1.2 0 0 1 1.2 1.2v4.6a1.2 1.2 0 0 1-1.2 1.2H8.6a1.2 1.2 0 0 1-1.2-1.2V10a1.2 1.2 0 0 1 1.2-1.2z" />
            <circle cx="12" cy="12.2" r="1.7" />
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
