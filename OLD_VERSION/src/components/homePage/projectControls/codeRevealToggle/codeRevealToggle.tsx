"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { SquareTerminal, X } from "lucide-react";
import ControlButton from "@/components/ui/controlButton/controlButton";
import FileSidebar from "./components/FileSidebar";
import CodePanel from "./components/CodePanel";
import classes from "./codeRevealToggle.module.css";

const CLIP_PATH_CLOSED = "inset(0% 0% 100% 0%)";

export default function CodeRevealToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (isOpen) document.body.setAttribute("data-code-reveal-open", "true");
        else document.body.removeAttribute("data-code-reveal-open");

        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => { window.removeEventListener("keydown", handleKeyDown); document.body.removeAttribute("data-code-reveal-open"); };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            <ControlButton label="View code" onClick={() => setIsOpen(true)} ariaExpanded={isOpen}>
                <SquareTerminal size={20} strokeWidth={2} />
            </ControlButton>

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={classes.overlay}
                            initial={{ clipPath: CLIP_PATH_CLOSED }}
                            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                            exit={{ clipPath: CLIP_PATH_CLOSED }}
                            transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
                        >
                            <div className={classes.header}>
                                <div className={classes.headerContent}>
                                    <SquareTerminal size={18} strokeWidth={2} color="#94a3b8" />
                                    <span style={{ color: "#94a3b8", fontWeight: 400 }}>code snippets</span>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        width: "36px", height: "36px", borderRadius: "10px",
                                        border: "none", background: "#f1f5f9", color: "#64748b",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer", transition: "background 0.2s"
                                    }}
                                >
                                    <X size={18} strokeWidth={2} />
                                </button>
                            </div>

                            <div className={classes.mainContainer}>
                                <FileSidebar selectedFile={selectedFile} onSelectFile={setSelectedFile} />
                                <CodePanel selectedFile={selectedFile} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
