"use client";
import React, { useState } from "react";
import { Sun } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import classes from "./brightnessSlider.module.css";

export default function BrightnessSlider({ onBrightnessChange }: any) {
  const [level, setLevel] = useState(100);
  const { isDark } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLevel(val);
    if (onBrightnessChange) onBrightnessChange(val);
  };

  return (
    <div className={classes.container}>
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
            min="0"
            max="100"
            value={level}
            onChange={handleChange}
            className={`${classes.slider} ${isDark ? classes.sliderDark : classes.sliderLight}`}
          />
        </div>
      </div>
    </div>
  );
}
