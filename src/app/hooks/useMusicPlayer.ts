"use client";

import { useState, useRef, useCallback, type SyntheticEvent } from "react";

export function useMusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolumeState] = useState(100);

    // 0–100. The <audio> element keeps its volume across track changes.
    // iOS Safari ignores .volume (hardware buttons only), so 0 also mutes.
    const setVolume = useCallback((percent: number) => {
        setVolumeState(percent);
        const audio = audioRef.current;
        if (audio) {
            audio.volume = percent / 100;
            audio.muted = percent === 0;
        }
    }, []);

    const tracks = [
        { title: "Sunflower", artist: "Post Malone, Swae Lee", src: "/audio/sunflower.mp3", thumbnail: "/images/music/sunflower.png" },
        { title: "Intentions", artist: "Justin Bieber ft. Quavo", src: "/audio/intentions.mp3", thumbnail: "/images/music/intentions.jpg" },
        { title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar", src: "/audio/peaches.mp3", thumbnail: "/images/music/peaches.png" }
    ];

    const track = tracks[currentTrackIndex];

    const togglePlay = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => {
                    console.error("Audio playback failed:", e);
                });
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const seek = useCallback((percent: number) => {
        if (audioRef.current && audioRef.current.duration) {
            const newTime = (percent / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(percent);
        }
    }, []);

    const loadAndPlayTrack = useCallback((index: number) => {
        setCurrentTrackIndex(index);
        if (audioRef.current) {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch((e) => {
                        console.error("Playback failed after track switch:", e);
                    });
                    setIsPlaying(true);
                }
            }, 50);
        }
    }, []);

    const nextTrack = useCallback(() => {
        loadAndPlayTrack((currentTrackIndex + 1) % tracks.length);
    }, [currentTrackIndex, loadAndPlayTrack, tracks.length]);

    const prevTrack = useCallback(() => {
        loadAndPlayTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
    }, [currentTrackIndex, loadAndPlayTrack, tracks.length]);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Spread onto the <audio> element. React attaches these whenever the
    // element mounts — an effect reading audioRef.current ran before the
    // (client-only) control panel rendered its <audio>, found null, and never
    // re-ran until the track changed, so the time stayed at -0:00.
    const audioEvents = {
        onLoadedMetadata: (e: SyntheticEvent<HTMLAudioElement>) => setDuration(e.currentTarget.duration),
        onDurationChange: (e: SyntheticEvent<HTMLAudioElement>) => setDuration(e.currentTarget.duration),
        onTimeUpdate: (e: SyntheticEvent<HTMLAudioElement>) => {
            const audio = e.currentTarget;
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        },
        onEnded: nextTrack,
    };

    return { audioRef, audioEvents, volume, setVolume, isPlaying, progress, track, currentTime, duration, togglePlay, nextTrack, prevTrack, seek };
}

/** What the music UI needs — everything except the <audio> ref and events, which
 *  only the component rendering the <audio> element should hold. */
export type MusicPlayerState = Omit<ReturnType<typeof useMusicPlayer>, "audioRef" | "audioEvents">;
