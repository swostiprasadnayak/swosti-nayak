"use client";
import React, { useState } from "react";
import { Sun, Volume1, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import classes from "./brightnessSlider.module.css";

type Surface = "auto" | "dark";

type LevelSliderProps = {
  ariaLabel: string;
  /** Icon to the left of the pill; receives the current level (0–100). */
  icon: (level: number) => React.ReactNode;
  /** Controlled value. Omit to let the slider keep its own state. */
  value?: number;
  defaultValue?: number;
  onChange?: (percent: number) => void;
  /** "dark" forces the dark colours regardless of theme; "auto" follows it. */
  surface?: Surface;
};

/** The Control Center level bar (icon + ticked pill + thin handle), shared by
 *  the brightness and volume sliders so both look identical. */
export function LevelSlider({ ariaLabel, icon, value, defaultValue = 100, onChange, surface = "auto" }: LevelSliderProps) {
  const [ownLevel, setOwnLevel] = useState(defaultValue);
  const level = value ?? ownLevel;
  const { isDark } = useTheme();
  const dark = surface === "dark" || isDark;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (value === undefined) setOwnLevel(val);
    onChange?.(val);
  };

  return (
    <div className={`${classes.container} ${dark ? classes.dark : ""}`}>
      <div className={classes.sliderOuter}>
        <div className={classes.sunIcon}>{icon(level)}</div>
        <div className={classes.sliderInner}>
          <div className={classes.sliderFill} style={{ width: `${level}%` }} />
          <div className={classes.ticks} />
          <input
            type="range"
            aria-label={ariaLabel}
            min="0"
            max="100"
            value={level}
            onChange={handleChange}
            className={classes.slider}
          />
        </div>
      </div>
    </div>
  );
}

type BrightnessSliderProps = {
  onBrightnessChange?: (percent: number) => void;
  isOpen?: boolean;
  surface?: Surface;
};

export default function BrightnessSlider({ onBrightnessChange, surface = "auto" }: BrightnessSliderProps) {
  return (
    <LevelSlider
      ariaLabel="Brightness"
      icon={() => <Sun size={20} />}
      onChange={onBrightnessChange}
      surface={surface}
    />
  );
}

type VolumeSliderProps = {
  value: number;
  onChange: (percent: number) => void;
  surface?: Surface;
};

const volumeIcon = (level: number) =>
  level === 0 ? <VolumeX size={20} /> : level < 50 ? <Volume1 size={20} /> : <Volume2 size={20} />;

export function VolumeSlider({ value, onChange, surface = "auto" }: VolumeSliderProps) {
  return <LevelSlider ariaLabel="Volume" icon={volumeIcon} value={value} onChange={onChange} surface={surface} />;
}
