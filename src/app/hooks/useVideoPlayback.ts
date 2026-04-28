"use client";

import { useEffect, RefObject } from "react";

export function useVideoPlayback(videoRef: RefObject<HTMLVideoElement | null>, shouldPlay: boolean) {
    useEffect(() => {
        if (videoRef.current) {
            if (shouldPlay) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [shouldPlay, videoRef]);
}
