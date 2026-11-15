"use client";

import React from "react";
import { Squircle } from "corner-smoothing";
import classes from "./cardDescription.module.css";
import { splitDescription } from "./splitDescription";

interface CardDescriptionProps {
    title: string;
    description: string;
    tags?: string[];
    /** Grid view: the lead line and the first two pills only. */
    compact?: boolean;
}

/* The project name (Heading) is in the window's title bar; this panel holds
   Heading 2 (the lead) and Subtext (the detail), then the pills. */

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
