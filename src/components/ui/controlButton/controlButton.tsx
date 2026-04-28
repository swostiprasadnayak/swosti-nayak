"use client";

import React from "react";
import classes from "./controlButton.module.css";

type ControlButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    ariaExpanded?: boolean;
    ariaLabel?: string;
    label?: string;
    isActive?: boolean;
};

const ControlButton: React.FC<ControlButtonProps> = ({
    children, onClick, disabled, ariaExpanded, ariaLabel, label, isActive
}) => {
    return (
        <div className={classes.wrapper}>
            <button
                onClick={onClick}
                disabled={disabled}
                aria-expanded={ariaExpanded}
                aria-label={ariaLabel}
                className={`${classes.btn} ${isActive ? classes.active : ""}`}
            >
                {children}
            </button>
            {label && <span className={classes.label}>{label}</span>}
        </div>
    );
};

export default ControlButton;
