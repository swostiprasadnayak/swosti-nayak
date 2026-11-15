"use client";

import React from "react";
import { Squircle } from "corner-smoothing";
import classes from "./cardDescription.module.css";

interface CardDescriptionProps {
    title: string;
    description: string;
    tags?: string[];
    /** Grid view: the lead line and the first two pills only. */
    compact?: boolean;
}

/** The name is already in the window's title bar, so the description carries
 *  its own hierarchy: "Lead: detail" becomes the lead line (what it is) with
 *  the detail quieter beneath it. Splits at the first colon, or at the first
 *  full stop when there's no colon. */
function splitDescription(text: string): { lead: string; detail: string | null } {
    const m = text.match(/^(.+?)(?::|\.)\s+(.+)$/);
    if (!m) return { lead: text, detail: null };
    return { lead: m[1], detail: m[2].charAt(0).toUpperCase() + m[2].slice(1) };
}

const CardDescription: React.FC<CardDescriptionProps> = ({
    description,
    tags,
    compact = false,
}) => {
    const { lead, detail } = splitDescription(description);
    const shownTags = compact ? tags?.slice(0, 2) : tags;
    return (
        <div className={classes.wrapper} data-component="CardDescription">
            <Squircle
                className={classes.descriptionContainer}
                cornerRadius={16}
                topLeftCornerRadius={0}
                topRightCornerRadius={0}
                bottomLeftCornerRadius={16}
                bottomRightCornerRadius={16}
            >
                <p className={classes.descText}>
                    <span className={classes.lead}>{lead}</span>
                    {detail && !compact && (
                        <>
                            {/* Keeps the sentence whole for screen readers. */}
                            <span className={classes.srOnly}>. </span>
                            <span className={classes.detail}>{detail}</span>
                        </>
                    )}
                </p>
                {shownTags && shownTags.length > 0 && (
                    <div className={classes.tagsContainer}>
                        {shownTags.map((tag) => (
                            <span key={tag} className={classes.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </Squircle>
        </div>
    );
};

export default React.memo(CardDescription);
