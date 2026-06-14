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
    // insure-tech has highest z (frontmost), blinkit middle, gc-dental back
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({ "gc-dental": 1, blinkit: 2, "insure-tech": 3 });
    const [topZ, setTopZ] = useState(3);

    // Initialize desktop open windows on mount — last item is frontmost.
    // Matches the "Default" filter (3 flagship projects in their original
    // staggered layout). The filter-change effect in CardStackContainer
    // brings in additional projects when the user switches filters.
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
            setOpenWindows(["gc-dental", "blinkit", "insure-tech"]);
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
                unicef:       { x: -380, y: -20 },
            };
            return gridPositions[slug] || { x: 0, y: 0 };
        }

        // Initial staggered positions — spread so all 4 default cards are
        // clearly visible without overlap. Unicef gets its own slot to the
        // right so it doesn't sit underneath GC Dental.
        const positions: Record<string, { x: number, y: number }> = {
            syne:         { x: -260, y: -60 },
            "gc-dental":  { x: -260, y: -60 },
            unicef:       { x:  340, y: -80 },
            "insure-tech":{ x:  -70, y:  -15 },
            blinkit:      { x:  150, y:   55 },
            aristotle:    { x:    0, y:    0 },
        };
        return positions[slug] || { x: 0, y: 0 };
    }, [viewMode]);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex };
}
