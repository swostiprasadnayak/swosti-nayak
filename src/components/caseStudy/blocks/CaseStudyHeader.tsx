"use client";
import React from "react";
import { AudioLines, ChevronRight } from "lucide-react";
import classes from "../template/caseStudy.module.css";
interface CaseStudyHeaderProps {
    title: string;
    subtitle: string;
    tags: string[];
    /** Voice mode is coming soon (its button is disabled); kept so the
     *  templates can wire it back up without changes. */
    onVoiceModeClick?: () => void;
}
export default function CaseStudyHeader({ title, subtitle, tags }: CaseStudyHeaderProps) {
    return (
        <div className={classes.headerContainer}>
            <h1 className={classes.title}>
                <span className={classes.titleHighlight}>{title}.</span> {subtitle}
            </h1>
            <div className={classes.tagsRow}>
                {tags.map((tag, i) => (
                    <div key={i} className={classes.tagPill}>{tag}</div>
                ))}
                {/* Both are coming soon: shown disabled on every case study.
                    aria-disabled (not disabled) keeps the "Coming soon"
                    tooltip on hover. */}
                <button type="button" className={classes.voiceModeBtn} aria-disabled="true" title="Coming soon">
                    Use voice mode <AudioLines size={14} aria-hidden="true" />
                </button>
                <button type="button" className={classes.techStackBtn} aria-disabled="true" title="Coming soon">
                    View tech stack <ChevronRight size={14} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
