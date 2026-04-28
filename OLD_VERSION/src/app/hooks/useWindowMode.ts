import { useState, useCallback } from "react";

export type WindowModeAPI = {
    openWindows: string[];
    bringToFront: (slug: string) => void;
    closeWindow: (slug: string) => void;
    getPosition: (slug: string) => { x: number; y: number } | undefined;
    getZIndex: (slug: string) => number;
};

export function useWindowMode(): WindowModeAPI {
    // Start with three windows open by default
    const [openWindows, setOpenWindows] = useState<string[]>(["syne", "lighthouse", "aristotle"]);
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({ syne: 1, lighthouse: 2, aristotle: 3 });
    const [topZ, setTopZ] = useState(3);

    const bringToFront = useCallback((slug: string) => {
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
            syne: { x: -120, y: -60 },
            lighthouse: { x: 0, y: 0 },
            aristotle: { x: 120, y: 60 }
        };
        return positions[slug] || { x: 0, y: 0 };
    }, []);

    const getZIndex = useCallback((slug: string) => zIndexes[slug] || 1, [zIndexes]);

    return { openWindows, bringToFront, closeWindow, getPosition, getZIndex };
}
