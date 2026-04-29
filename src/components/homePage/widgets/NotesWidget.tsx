"use client";

import React, { useState, useEffect } from "react";
import { Folder } from "lucide-react";

interface Note {
    id: number;
    title: string;
    date: string;
    preview: string;
}

const seedNotes: Note[] = [
    {
        id: 1,
        title: "Why what how in your best project",
        date: "20/02/26",
        preview: "How are you able to deliver it with tigh…",
    },
    {
        id: 2,
        title: "Ahaa moment",
        date: "20/02/26",
        preview: "Key features improvement which creat…",
    },
    {
        id: 3,
        title: "Hello,",
        date: "09/12/25",
        preview: "I'm a Product Designer transitioning in…",
    },
    {
        id: 4,
        title: "Filter",
        date: "30/10/25",
        preview: "Search…",
    },
    {
        id: 5,
        title: "Projects",
        date: "01/06/25",
        preview: "Delhi Metro sitting *…",
    },
    {
        id: 6,
        title: "Designing a Multi-sensory IoT Ecosystem for Ad…",
        date: "24/04/25",
        preview: "Designing a Multi-sensory IoT Ecosys…",
    },
];

export default function NotesWidget() {
    const [notes, setNotes] = useState<Note[]>(seedNotes);

    useEffect(() => {
        const saved = localStorage.getItem("widget_notes");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) setNotes(parsed);
            } catch {
                /* keep seed */
            }
        }
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                background: "#1c1c1e",
                color: "#fff",
            }}
        >
            {/* Yellow header */}
            <div
                style={{
                    background: "#FFD60A",
                    color: "#1c1c1e",
                    padding: "14px 18px",
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Folder size={18} fill="#1c1c1e" strokeWidth={0} />
                <span>Notes</span>
            </div>

            {/* List body */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "12px 18px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {notes.map((note, idx) => (
                    <div
                        key={note.id}
                        style={{
                            padding: "12px 0",
                            borderBottom:
                                idx < notes.length - 1
                                    ? "1px solid rgba(255, 255, 255, 0.08)"
                                    : "none",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 4,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {note.title}
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: "rgba(255, 255, 255, 0.55)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <span style={{ marginRight: 10 }}>{note.date}</span>
                            <span>{note.preview}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
