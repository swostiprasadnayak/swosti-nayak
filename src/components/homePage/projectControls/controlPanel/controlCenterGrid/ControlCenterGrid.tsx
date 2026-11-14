"use client";
import React, { useCallback, useRef } from "react";
import { AudioLines, Camera, Image as ImageIcon, Moon, Sun, Volume1, Volume2, VolumeX } from "lucide-react";
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
                {isDark ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
            </RoundButton>
            <RoundButton label="Voice mode" onClick={onVoiceMode}>
                <AudioLines size={22} strokeWidth={2} />
            </RoundButton>

            <VerticalSlider
                label="Brightness"
                value={brightness}
                onChange={onBrightnessChange}
                icon={<Sun size={22} strokeWidth={2.25} />}
                accent="#f5a524"
                className={classes.colBrightness}
            />
            <VerticalSlider
                label="Volume"
                value={volume}
                onChange={player.setVolume}
                icon={<VolumeIcon size={22} strokeWidth={2.25} />}
                accent="#0a84ff"
                className={classes.colVolume}
            />

            <RoundButton label={`Wallpaper ${imageIndex}`} onClick={onImageToggle}>
                <ImageIcon size={22} strokeWidth={2} />
            </RoundButton>
            <RoundButton label="Screenshot" onClick={onScreenshot}>
                <Camera size={22} strokeWidth={2} />
            </RoundButton>
        </div>
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
    /** Icon colour once the fill has risen over it. */
    accent: string;
    className?: string;
};

/** Tall pill that fills from the bottom. Drag or tap anywhere on it; arrow
 *  keys / Home / End when focused. */
function VerticalSlider({ label, value, onChange, icon, accent, className }: VerticalSliderProps) {
    const ref = useRef<HTMLDivElement>(null);

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

    // The fill covers the icon (which sits ~16px above the bottom) from ~24%.
    const covered = value >= 24;

    return (
        <div
            ref={ref}
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
            <div className={classes.vFill} style={{ height: `${value}%` }} />
            <div className={classes.vIcon} style={covered ? { color: accent } : undefined}>{icon}</div>
        </div>
    );
}
