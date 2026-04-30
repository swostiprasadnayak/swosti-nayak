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
      <div className={classes.sliderLayout}>
        <Sun size={20} className={classes.icon} />
        <div className={classes.sliderWrapper}>
          {/* Fill Layer */}
          <div className={classes.sliderFill} style={{ width: `${level}%` }} />
          {/* Ticks Layer (On top of fill) */}
          <div className={classes.ticks} />
          {/* Interactive Range Input */}
          <input 
            type="range" min="0" max="100" value={level} onChange={handleChange}
            className={classes.slider}
          />
        </div>
      </div>
    </div>
  );
}
