"use client";

import { useEffect, RefObject } from "react";

export function useVideoPlayback(videoRef: RefObject<HTMLVideoElement | null>, shouldPlay: boolean) {
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.loop = true;
            if (shouldPlay) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [shouldPlay, videoRef]);
}
