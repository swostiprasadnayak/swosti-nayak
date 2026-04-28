"use client";

import React from "react";
import { SquareStack, LayoutGrid } from "lucide-react";
import { Squircle } from "corner-smoothing";
import classes from "./viewToggle.module.css";

export type ViewMode = "tab" | "card";

type ViewToggleProps = {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
};

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
    return (
        <Squircle cornerRadius={12} className={classes.container}>
            <button
                className={`${classes.toggleButton} ${viewMode === "tab" ? classes.active : ""}`}
                onClick={() => onViewModeChange("tab")}
                aria-label="Tab View"
            >
                <SquareStack size={18} strokeWidth={2} />
            </button>
            <button
                className={`${classes.toggleButton} ${viewMode === "card" ? classes.active : ""}`}
                onClick={() => onViewModeChange("card")}
                aria-label="Card View"
            >
                <LayoutGrid size={18} strokeWidth={2} />
            </button>
        </Squircle>
    );
};

export default ViewToggle;
