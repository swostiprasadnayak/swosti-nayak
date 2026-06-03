import { useState, useCallback, useEffect } from "react";

export type WindowModeAPI = {
    openWindows: string[];
    bringToFront: (slug: string) => void;
    closeWindow: (slug: string) => void;
    getPosition: (slug: string) => { x: number; y: number } | undefined;
    getZIndex: (slug: string) => number;
};

export function useWindowMode(viewMode: 'tab' | 'card' = 'tab'): WindowModeAPI {
    // Start empty for SSR safety and to keep mobile clear on startup
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({ "gc-dental": 1, "insure-tech": 2, blinkit: 3 });
    const [topZ, setTopZ] = useState(3);

    // Initialize desktop open windows on mount
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
            setOpenWindows(["gc-dental", "insure-tech", "blinkit"]);
        }
    }, []);

    const bringToFront = useCallback((slug: string) => {
        setOpenWindows((prev) => {
            const filtered = prev.filter((w) => w !== slug);
            return [...filtered, slug];
        });
        setTopZ((prev) => {
            const nextZ = prev + 1;
            setZIndexes((z) => ({ ...z, [slug]: nextZ }));
            return nextZ;
        });
    }, []);

    const closeWindow = useCallback((slug: string) => {
        setOpenWindows((prev) => prev.filter((w) => w !== slug));
    }, []);

    const getPosition = useCallback((slug: string) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        if (isMobile) {
            return { x: 0, y: 0 };
        }

        if (viewMode === 'card') {
            // Grid layout positions
            const gridPositions: Record<string, { x: number, y: number }> = {
                syne:         { x: -380, y: -20 },
                "insure-tech":{ x:   50, y: -20 },
                blinkit:      { x: -380, y: 350 },
                aristotle:    { x:   50, y: 350 },
                "gc-dental":  { x: -380, y: -20 },
            };
            return gridPositions[slug] || { x: 0, y: 0 };
        }

        // Initial staggered positions so they stack nicely like a desktop
        const positions: Record<string, { x: number, y: number }> = {
            syne:         { x: -160, y: -60 },
            "insure-tech":{ x:    0, y:   0 },
            blinkit:      { x:  160, y:  60 },
            aristotle:    { x:    0, y:   0 },
            "gc-dental":  { x: -160, y: -60 },
        };
        return positions[slug] || { x: 0, y: 0 };
    }, [viewMode]);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex };
}
