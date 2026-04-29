"use client";

import React from "react";
import classes from "./widgetsGrid.module.css";
import NotesWidget from "./NotesWidget";
import WeatherWidget from "./WeatherWidget";
import AnalogClock from "./AnalogClock";
import MusicCard from "@/components/homePage/projectControls/controlPanel/musicCard/musicCard";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";

export default function WidgetsGrid() {
    const player = useMusicPlayer(true);

    return (
        <div className={classes.widgetsGrid}>
            {/* Top-left: Large Notes (2x2) */}
            <div className={`${classes.widget} ${classes.notes}`}>
                <NotesWidget />
            </div>

            {/* Top-right column: Weather (1x1) */}
            <div className={`${classes.widget} ${classes.weather}`}>
                <WeatherWidget />
            </div>

            {/* Top-right column: Clock (1x1) */}
            <div className={`${classes.widget} ${classes.clock}`}>
                <AnalogClock />
            </div>

            {/* Bottom: Wide Music (3x1) */}
            <div className={`${classes.widget} ${classes.music}`}>
                <MusicCard player={player} />
                <audio ref={player.audioRef} src={player.track?.src} preload="metadata" />
            </div>
        </div>
    );
}
