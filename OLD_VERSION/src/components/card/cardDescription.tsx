"use client";

import React from "react";
import { Squircle } from "corner-smoothing";
import classes from "./cardDescription.module.css";

interface CardDescriptionProps {
    title: string;
    description: string;
    tags?: string[];
}

const CardDescription: React.FC<CardDescriptionProps> = ({
    description,
    tags,
}) => {
    return (
        <div className={classes.wrapper}>
            <Squircle
                className={classes.descriptionContainer}
                topLeftCornerRadius={0}
                topRightCornerRadius={0}
                bottomLeftCornerRadius={16}
                bottomRightCornerRadius={16}
            >
                <p className={classes.descText}>{description}</p>
                {tags && tags.length > 0 && (
                    <div className={classes.tagsContainer}>
                        {tags.map((tag) => (
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
