"use client";

import { useNightShift } from "@/app/hooks/useNightShift";

/** Applies a visitor's saved Night Shift on load, before the Control Center
 *  is ever opened (the hook draws the tint). Renders nothing. */
export default function NightShift() {
    useNightShift();
    return null;
}
