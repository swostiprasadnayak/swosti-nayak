import { useState, useCallback } from "react";

export type WindowModeAPI = {
    openWindows: string[];
    bringToFront: (slug: string) => void;
    closeWindow: (slug: string) => void;
    getPosition: (slug: string) => { x: number; y: number } | undefined;
    getZIndex: (slug: string) => number;
};

export function useWindowMode(): WindowModeAPI {
    // Open Surrounding (syne) and Unicef on startup
    const [openWindows, setOpenWindows] = useState<string[]>(["syne", "unicef"]);
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({ syne: 1, unicef: 2 });
    const [topZ, setTopZ] = useState(2);

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
        // Initial staggered positions so they stack nicely like a desktop
        const positions: Record<string, { x: number, y: number }> = {
            unicef:     { x: -380, y: -160 },
            syne:       { x:  100, y: -160 },
            blinkit:    { x: -300, y:  130 },
            aristotle:  { x:   80, y:  130 },
            "pid-tool": { x:  100, y:    0 },
        };
        return positions[slug] || { x: 0, y: 0 };
    }, []);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex };
}
