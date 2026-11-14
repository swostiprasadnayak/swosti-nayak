import { useState, useCallback, useEffect } from "react";

export type WindowModeAPI = {
    openWindows: string[];
    bringToFront: (slug: string) => void;
    closeWindow: (slug: string) => void;
    getPosition: (slug: string) => { x: number; y: number } | undefined;
    getZIndex: (slug: string) => number;
    /** Restore the default desktop layout: original windows, stacking order
     *  and positions (bumps layoutVersion so dragged windows remount). */
    resetLayout: () => void;
    layoutVersion: number;
};

// The order visitors see on load (back → front): CardStackContainer's filter
// sync brings Blinkit, then GC Dental, then Insure-Tech to the front on mount.
// resetLayout restores exactly this.
const DEFAULT_OPEN = ["blinkit", "gc-dental", "insure-tech"];
const DEFAULT_Z: Record<string, number> = { blinkit: 1, "gc-dental": 2, "insure-tech": 3 };

export function useWindowMode(viewMode: 'tab' | 'card' = 'tab'): WindowModeAPI {
    // Start empty for SSR safety and to keep mobile clear on startup
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    // insure-tech frontmost, gc-dental middle, blinkit back
    const [zIndexes, setZIndexes] = useState<Record<string, number>>(DEFAULT_Z);
    const [, setTopZ] = useState(3);
    const [layoutVersion, setLayoutVersion] = useState(0);

    // Initialize desktop open windows on mount — last item is frontmost.
    // Matches the "Default" filter (3 flagship projects in their original
    // staggered layout). The filter-change effect in CardStackContainer
    // brings in additional projects when the user switches filters.
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
            // Viewport width is only knowable after hydration; seeding it in
            // useState would make server and client markup disagree.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpenWindows(DEFAULT_OPEN);
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
                "insure-tech":{ x:   50, y: -20 },
                blinkit:      { x: -380, y: 350 },
                "gc-dental":  { x: -380, y: -20 },
            };
            return gridPositions[slug] || { x: 0, y: 0 };
        }

        // Initial staggered positions — spread so every card stays visible.
        const positions: Record<string, { x: number, y: number }> = {
            "gc-dental":  { x: -260, y: -60 },
            "insure-tech":{ x:  -70, y:  -15 },
            blinkit:      { x:  150, y:   55 },
        };
        return positions[slug] || { x: 0, y: 0 };
    }, [viewMode]);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    const resetLayout = useCallback(() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
            setOpenWindows(DEFAULT_OPEN);
        }
        setZIndexes(DEFAULT_Z);
        setTopZ(3);
        setLayoutVersion((v) => v + 1);
    }, []);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex, resetLayout, layoutVersion };
}
