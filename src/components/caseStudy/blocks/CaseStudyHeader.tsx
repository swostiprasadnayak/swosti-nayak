"use client";
import React from "react";
import { AudioLines, ChevronRight } from "lucide-react";
import classes from "../template/caseStudy.module.css";
interface CaseStudyHeaderProps {
    title: string;
    subtitle: string;
    tags: string[];
    onVoiceModeClick?: () => void;
}
export default function CaseStudyHeader({ title, subtitle, tags, onVoiceModeClick }: CaseStudyHeaderProps) {
    return (
        <div className={classes.headerContainer}>
            <h1 className={classes.title}>
                <span className={classes.titleHighlight}>{title}.</span> {subtitle}
            </h1>
            <div className={classes.tagsRow}>
                {tags.map((tag, i) => (
                    <div key={i} className={classes.tagPill}>{tag}</div>
                ))}
                <button className={classes.voiceModeBtn} onClick={onVoiceModeClick}>
                    Use voice mode <AudioLines size={14} />
                </button>
                <button className={classes.techStackBtn}>
                    View tech stack <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}
