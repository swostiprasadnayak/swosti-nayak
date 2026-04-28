"use client";
import React, { useState } from "react";
import { Squircle } from "corner-smoothing";
import classes from "../template/caseStudy.module.css";
const NOTES_DATA = [
    {
        id: "quotes",
        date: "May 2024",
        time: "01:42 AM",
        title: "Quotes from professors",
        emoji: "💬",
        content: (
            <div className={classes.noteContent}>
                <div className={classes.noteHeader}>
                    <span className={classes.noteDate}>April 2, 2026 at 01:42 AM</span>
                </div>
                <h3 className={classes.noteTitle}>Quotes from professors</h3>
                <p className={classes.noteText}>"CAD software is not a good space to weigh different ideas and make decisions."</p>
                <p className={classes.noteText}>"Reducing the time it takes to get contextual feedback on a design model is a big value add for students."</p>
                <div className={classes.highlightedText}>
                    "The biggest mistake students make is fixating on the first idea they come up with. They should spend more time diverging, then converging."
                </div>
            </div>
        )
    },
    {
        id: "interviews",
        date: "May 2024",
        time: "04:25 PM",
        title: "Interviewed 7 industrial...",
        emoji: "📏",
        content: (
            <div className={classes.noteContent}>
                <h3 className={classes.noteTitle}>Interview Insights</h3>
                <p className={classes.noteText}>Students tend to converge on ideas too quickly without proper environmental context in Delhi's manufacturing hubs.</p>
            </div>
        )
    }
];
export default function InteractiveNotes() {
    const [activeNote, setActiveNote] = useState(NOTES_DATA[0].id);
    return (
        <div className={classes.notesSection}>
            <div className={classes.notesSidebar}>
                {NOTES_DATA.map((note) => (
                    <div key={note.id} className={classes.noteSidebarGroup}>
                        <div className={classes.sidebarDate}>{note.date}</div>
                        <Squircle
                            cornerRadius={12}
                            className={`${classes.sidebarItem} ${activeNote === note.id ? classes.sidebarItemActive : ''}`}
                            onClick={() => setActiveNote(note.id)}
                        >
                            <div className={classes.sidebarItemHeader}>
                                <span>{note.emoji} {note.title}</span>
                            </div>
                            <div className={classes.sidebarItemTime}>{note.time} • Notes</div>
                        </Squircle>
                    </div>
                ))}
            </div>
            <div className={classes.notesBody}>
                <Squircle cornerRadius={16} className={classes.notesPaper}>
                    {NOTES_DATA.find(n => n.id === activeNote)?.content}
                </Squircle>
            </div>
        </div>
    );
}
