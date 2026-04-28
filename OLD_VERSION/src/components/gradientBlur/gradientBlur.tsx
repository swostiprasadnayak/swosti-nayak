/**
* GradientBlur.tsx
*
* A visual effect component that creates a smooth gradient blur
* at the edges of content areas. Uses dual pseudo-element layers
* in CSS for a progressive blur effect.
*/

import React from "react";
import classes from "./gradientBlur.module.css";

type GradientBlurProps = {
    direction: "top" | "bottom";
};

const GradientBlur: React.FC<GradientBlurProps> = ({ direction }) => {
    return (
        <div
            className={classes.gradBlur}
            style={{
                transform: direction === "bottom" ? "rotate(180deg)" : "none",
                ...(direction === "bottom"
                    ? { bottom: 0, height: "3.25rem" }
                    : { top: 0 }),
            }}
        >
            {/* 6 empty divs styled via CSS for layered blur effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default React.memo(GradientBlur);
