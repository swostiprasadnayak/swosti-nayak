"use client";
import React, { useState } from "react";
import { Sun } from "lucide-react";
import classes from "./brightnessSlider.module.css";

export default function BrightnessSlider({ onBrightnessChange }: any) {
  const [level, setLevel] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLevel(val);
    if (onBrightnessChange) onBrightnessChange(val);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={classes.label}>Display</span>
      </div>
      <div className={classes.sliderWrapper}>
        <Sun size={14} className={classes.icon} />
        <div className={classes.trackContainer}>
          {/* Tick marks rendered via a repeating gradient in CSS */}
          <div className={classes.ticks} />
          <input
            type="range"
            min="20"
            max="100"
            value={level}
            onChange={handleChange}
            className={classes.slider}
            style={{ "--val": `${((level - 20) / 80) * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}
