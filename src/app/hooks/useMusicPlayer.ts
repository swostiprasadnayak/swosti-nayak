"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function useMusicPlayer(isOpen: boolean) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

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

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleMetadata = () => setDuration(audio.duration);
        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        audio.addEventListener("loadedmetadata", handleMetadata);
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", nextTrack);
        return () => {
            audio.removeEventListener("loadedmetadata", handleMetadata);
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", nextTrack);
        };
    }, [nextTrack]);

    return { audioRef, isPlaying, progress, track, currentTime, duration, togglePlay, nextTrack, prevTrack, seek };
}
