"use client";

import React, { useEffect, useState } from "react";

export default function AnalogClock() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = hours * 30 + minutes * 0.5;

    // Numbers 1..12 placed around the dial
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    const numberRadius = 38; // % from center
    const tickPositions = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1c1c1e",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.08)",
                }}
            >
                {/* Minute tick marks */}
                {tickPositions.map((i) => (
                    <div
                        key={`tick-${i}`}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: i % 5 === 0 ? 2 : 1,
                            height: "47%",
                            transform: `translate(-50%, -100%) rotate(${i * 6}deg)`,
                            transformOrigin: "50% 100%",
                            pointerEvents: "none",
                        }}
                    >
                        <div
                            style={{
                                width: i % 5 === 0 ? 2 : 1,
                                height: i % 5 === 0 ? 6 : 3,
                                background: "#1c1c1e",
                                opacity: i % 5 === 0 ? 0.85 : 0.35,
                                borderRadius: 1,
                            }}
                        />
                    </div>
                ))}

                {/* Hour numbers */}
                {numbers.map((n) => {
                    const angle = (n * 30 - 90) * (Math.PI / 180);
                    const x = 50 + numberRadius * Math.cos(angle);
                    const y = 50 + numberRadius * Math.sin(angle);
                    return (
                        <div
                            key={`num-${n}`}
                            style={{
                                position: "absolute",
                                top: `${y}%`,
                                left: `${x}%`,
                                transform: "translate(-50%, -50%)",
                                color: "#1c1c1e",
                                fontSize: "clamp(11px, 9.5%, 22px)",
                                fontWeight: 500,
                                fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif',
                                lineHeight: 1,
                            }}
                        >
                            {n}
                        </div>
                    );
                })}

                {/* Hour hand */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 5,
                        height: "28%",
                        background: "#1c1c1e",
                        borderRadius: 3,
                        transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                        transformOrigin: "50% 100%",
                    }}
                />

                {/* Minute hand */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 4,
                        height: "40%",
                        background: "#1c1c1e",
                        borderRadius: 2,
                        transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                        transformOrigin: "50% 100%",
                    }}
                />

                {/* Second hand (orange) */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 1.5,
                        height: "44%",
                        background: "#FF9500",
                        borderRadius: 2,
                        transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
                        transformOrigin: "50% 100%",
                        transition: "transform 0.1s linear",
                    }}
                />

                {/* Center dot */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        background: "#FF9500",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 0 2px #1c1c1e",
                    }}
                />
            </div>
        </div>
    );
}
