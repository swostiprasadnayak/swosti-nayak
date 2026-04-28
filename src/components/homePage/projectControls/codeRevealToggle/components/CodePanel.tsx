"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodePanel({ selectedFile }: { selectedFile: string | null }) {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (!selectedFile) return;
        import("@/data/codeDB.json").then((module) => {
            setContent((module.default as any)[selectedFile] || "// File not found in database.");
        });
    }, [selectedFile]);

    if (!selectedFile) {
        return <div style={{ flex: 1, background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>Select a file from the explorer to view its code.</div>;
    }

    // Format breadcrumbs "portfolio-site / folder / folder / file.tsx"
    const parts = selectedFile.split('/');
    const fileName = parts.pop();
    const folderPath = parts.length > 0 ? parts.join(" / ") + " / " : "";

    return (
        <div style={{ flex: 1, background: "var(--bg-card)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--border-subtle)",
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
                zIndex: 10,
                display: "flex",
                alignItems: "center"
            }}>
                portfolio / {folderPath} <span style={{ fontWeight: 600, color: "var(--text-primary)", marginLeft: "4px" }}>{fileName}</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", background: "var(--bg-card)" }}>
                <SyntaxHighlighter
                    language={selectedFile.endsWith('.css') ? 'css' : 'tsx'}
                    style={vs}
                    customStyle={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '0.95rem',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        lineHeight: '1.7',
                        margin: 0,
                        padding: '24px 0px'
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{
                        display: 'inline-block',
                        color: 'rgba(var(--text-primary-rgb), 0.4)',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        minWidth: '46px',
                        textAlign: 'right',
                        borderRight: '1px solid var(--border-subtle)',
                        marginRight: '16px'
                    }}
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
