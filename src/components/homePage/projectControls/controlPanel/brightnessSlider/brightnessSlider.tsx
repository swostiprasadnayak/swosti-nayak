"use client";
import React, { useState } from "react";
import { Sun } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import classes from "./brightnessSlider.module.css";

type BrightnessSliderProps = {
  onBrightnessChange?: (percent: number) => void;
  isOpen?: boolean;
  /** "dark" forces the dark colours regardless of theme, for surfaces that are
   *  always dark (the mobile control sheet). "auto" follows the theme. */
  surface?: "auto" | "dark";
};

export default function BrightnessSlider({ onBrightnessChange, surface = "auto" }: BrightnessSliderProps) {
  const [level, setLevel] = useState(100);
  const { isDark } = useTheme();
  const dark = surface === "dark" || isDark;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLevel(val);
    if (onBrightnessChange) onBrightnessChange(val);
  };

  return (
    <div className={`${classes.container} ${dark ? classes.dark : ""}`}>
      <span className={classes.label}>Display</span>
      <div className={classes.sliderOuter}>
        <div className={classes.sunIcon}>
          <Sun size={20} />
        </div>
        <div className={classes.sliderInner}>
          <div className={classes.sliderFill} style={{ width: `${level}%` }} />
          <div className={classes.ticks} />
          <input
            type="range"
            aria-label="Brightness"
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
