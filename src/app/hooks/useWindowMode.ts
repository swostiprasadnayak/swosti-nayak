import { useState, useCallback } from "react";

export type WindowModeAPI = {
    openWindows: string[];
    bringToFront: (slug: string) => void;
    closeWindow: (slug: string) => void;
    getPosition: (slug: string) => { x: number; y: number } | undefined;
    getZIndex: (slug: string) => number;
};

export function useWindowMode(viewMode: 'tab' | 'card' = 'tab'): WindowModeAPI {
    // Open Surrounding (syne), Unicef and Blinkit on startup
    const [openWindows, setOpenWindows] = useState<string[]>(["syne", "unicef", "blinkit"]);
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({ syne: 1, unicef: 2, blinkit: 3 });
    const [topZ, setTopZ] = useState(3);

    const bringToFront = useCallback((slug: string) => {
        setOpenWindows((prev) => {
            if (!prev.includes(slug)) {
                return [...prev, slug];
            }
            return prev;
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
        if (viewMode === 'card') {
            // Grid layout positions
            const gridPositions: Record<string, { x: number, y: number }> = {
                syne:      { x: -380, y: -20 },
                unicef:    { x:   50, y: -20 },
                blinkit:   { x: -380, y: 350 },
                aristotle: { x:   50, y: 350 },
                "pid-tool":{ x: -165, y: 350 },
            };
            return gridPositions[slug] || { x: 0, y: 0 };
        }

        // Initial staggered positions so they stack nicely like a desktop
        const positions: Record<string, { x: number, y: number }> = {
            syne:      { x: -160, y: -60 },
            unicef:    { x:    0, y:   0 },
            blinkit:   { x:  160, y:  60 },
            aristotle: { x:    0, y:   0 },
            "pid-tool":{ x:   80, y:  20 },
        };
        return positions[slug] || { x: 0, y: 0 };
    }, [viewMode]);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex };
}
