export const ICON_SIZE = 48;
export const springConfig = { type: "spring", bounce: 0, duration: 0.3 };
export const getDockRestWidth = (numIcons: number) => numIcons * ICON_SIZE + (numIcons - 1) * 14 + 40;

// These functions tell the frosted glass background to stretch outward when icons grow
export const getTotalExtra = (mouseX: number, numIcons: number) => {
    if (mouseX === Infinity) return 0;
    return 1.8; // Multiplier for how much the glass should stretch
};

export const getEffectiveFraction = (mouseX: number, numIcons: number, dockWidth: number) => {
    if (mouseX === Infinity) return 0.5;
    return Math.max(0, Math.min(1, mouseX / dockWidth));
};
