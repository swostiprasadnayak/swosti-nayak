"use client";

import React, { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudMoon, Navigation } from "lucide-react";

type IconType = React.ComponentType<{ size?: number; color?: string }>;

interface HourForecast {
    time: string;
    temp: number;
    Icon: IconType;
}

interface WeatherData {
    city: string;
    temp: number;
    code: number;
    description: string;
    high: number;
    low: number;
    hourly: HourForecast[];
}

const weatherCodeMap = (code: number, isNight = false): { description: string; Icon: IconType } => {
    if (code === 0) return { description: "Clear", Icon: isNight ? CloudMoon : Sun };
    if (code === 1) return { description: "Mainly Clear", Icon: isNight ? CloudMoon : Sun };
    if (code === 2) return { description: "Partly Cloudy", Icon: isNight ? CloudMoon : Cloud };
    if (code === 3) return { description: "Mostly Cloudy", Icon: Cloud };
    if (code >= 45 && code <= 48) return { description: "Foggy", Icon: Cloud };
    if (code >= 51 && code <= 67) return { description: "Rainy", Icon: CloudRain };
    if (code >= 71 && code <= 77) return { description: "Snowy", Icon: CloudSnow };
    if (code >= 80 && code <= 82) return { description: "Showers", Icon: CloudRain };
    if (code >= 95) return { description: "Thunderstorm", Icon: CloudLightning };
    return { description: "Cloudy", Icon: Cloud };
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation unavailable");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const weatherRes = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
                    );
                    const weatherJson = await weatherRes.json();

                    const geoRes = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const geoData = await geoRes.json();

                    const code = weatherJson.current_weather.weathercode;
                    const { description } = weatherCodeMap(code);

                    // Build next 6-hour forecast starting from current hour
                    const nowIso = weatherJson.current_weather.time;
                    const hourlyTimes: string[] = weatherJson.hourly.time;
                    const hourlyTemps: number[] = weatherJson.hourly.temperature_2m;
                    const hourlyCodes: number[] = weatherJson.hourly.weathercode;

                    const startIdx = Math.max(hourlyTimes.indexOf(nowIso), 0);
                    const hourly: HourForecast[] = [];
                    for (let i = 1; i <= 6; i++) {
                        const idx = startIdx + i;
                        if (idx >= hourlyTimes.length) break;
                        const date = new Date(hourlyTimes[idx]);
                        const hr = date.getHours();
                        const isNight = hr < 6 || hr >= 19;
                        const label =
                            hr === 0 ? "12 AM" : hr < 12 ? `${hr} AM` : hr === 12 ? "12 PM" : `${hr - 12} PM`;
                        const { Icon } = weatherCodeMap(hourlyCodes[idx], isNight);
                        hourly.push({
                            time: label,
                            temp: Math.round(hourlyTemps[idx]),
                            Icon,
                        });
                    }

                    setWeather({
                        city: geoData.city || geoData.locality || "Your location",
                        temp: Math.round(weatherJson.current_weather.temperature),
                        code,
                        description,
                        high: Math.round(weatherJson.daily.temperature_2m_max[0]),
                        low: Math.round(weatherJson.daily.temperature_2m_min[0]),
                        hourly,
                    });
                } catch {
                    setError("Failed to load weather");
                }
            },
            () => setError("Permission denied")
        );
    }, []);

    const containerStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(170deg, #3a4a6b 0%, #1f2a44 100%)",
        color: "#fff",
    };

    if (error) {
        return (
            <div style={containerStyle}>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Weather: {error}</div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div style={containerStyle}>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Loading weather…</div>
            </div>
        );
    }

    const { Icon: HeaderIcon } = weatherCodeMap(weather.code);

    return (
        <div style={containerStyle}>
            {/* Top row: city + condition */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, fontWeight: 600 }}>
                        <span>{weather.city}</span>
                        <Navigation size={13} color="#fff" />
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 300, marginTop: 2, lineHeight: 1 }}>
                        {weather.temp}°
                    </div>
                </div>

                <div style={{ textAlign: "right" }}>
                    <HeaderIcon size={26} color="#fff" />
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{weather.description}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>
                        H:{weather.high}° L:{weather.low}°
                    </div>
                </div>
            </div>

            {/* Hourly forecast row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 4,
                    marginTop: 12,
                }}
            >
                {weather.hourly.map((h) => (
                    <div
                        key={h.time}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 500 }}>{h.time}</div>
                        <h.Icon size={18} color="#fff" />
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{h.temp}°</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
