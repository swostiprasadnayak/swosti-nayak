"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import InteractiveNotes from "../blocks/InteractiveNotes";
import FinderWindow from "../blocks/FinderWindow";
import CaseStudyGPT from "../blocks/CaseStudyGPT";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./caseStudy.module.css";
export default function CaseStudyTemplate() {
    const { openModal } = useVoiceModal();
    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                {/* 1. Header with Voice Mode trigger */}
                <CaseStudyHeader
                    title="Syne"
                    subtitle="Supporting industrial design students to visualise and validate 3D models in realistic scales and environments with XR & AI."
                    tags={["Individual project", "'23 (7 months)", "UX & Engineering"]}
                    onVoiceModeClick={openModal}
                />
                {/* 2. Hero Media */}
                <Squircle cornerRadius={24} className={classes.heroMedia}>
                    <img src="/projectCardImages/syne/poster.jpg" alt="Syne Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Squircle>
                {/* 3. Text Intro */}
                <div className={classes.textSection}>
                    <h2 className={classes.sectionHeading}>Is virtual reality technology just hype?</h2>
                    <p className={classes.bodyText}>Is it merely hype about an imagined future, or could VR solve real problems today? To find out, I conducted an independent study exploring how virtual reality could add value to something tangible in my student environment.</p>
                </div>
                {/* 4. Highlights Reel */}
                <div className={classes.highlightsReel}>
                    <div className={classes.highlightCard}>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 500, maxWidth: "60%" }}>Interviewed multiple industrial design professors to uncover key challenges limiting student learning.</h3>
                    </div>
                    <div className={classes.highlightCard}>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 500, maxWidth: "60%" }}>Found that students often rush ideas, skip research, and lack access to real-world feedback.</h3>
                    </div>
                </div>
                {/* 5. Interactive Notes */}
                <InteractiveNotes />
                {/* 6. Pain Points */}
                <div className={classes.textSection}>
                    <h2 className={classes.sectionHeading}>I examined the viability of solving the discovered challenges, and focused on 3 pain points:</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {[
                        "The time-consuming process of building realistic models",
                        "The reduced access to relevant environments",
                        "The lack of feedback from real users"
                    ].map((point, i) => (
                        <Squircle key={i} cornerRadius={16} style={{ background: 'var(--bg-card)', padding: '32px', minHeight: '240px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border-subtle)' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{point}</p>
                        </Squircle>
                    ))}
                </div>
                {/* 7. Ideas Sticky Notes */}
                <div className={classes.textSection}>
                    <h2 className={classes.sectionHeading}>I brainstormed various potential ideas — from user testing to real-time modelling in XR</h2>
                </div>
                <div className={classes.ideasGrid}>
                    {["Uploading CAD models to XR", "Touring inaccessible locations virtually", "Multiplayer XR experience for doing user tests", "Real-time 3D modelling in XR"].map((idea, i) => (
                        <div key={i} className={classes.ideaSticky} style={{ background: ["#e0e7ff", "#fce7f3", "#fef08a", "#dcfce3"][i] }}>
                            {idea}
                        </div>
                    ))}
                </div>
                {/* 8. Radar Chart Placeholder */}
                <div className={classes.fullWidthAsset}>
                    <div style={{ textAlign: "center", color: "rgba(0,0,0,0.4)" }}>
                        <h2 style={{ color: "#111", marginBottom: "16px" }}>Existing tools mainly target architects and 3D modelling in VR.</h2>
                        <p>[ Radar Chart Comparison Graph ]</p>
                    </div>
                </div>
                {/* 9. Mac Finder Explorer */}
                <FinderWindow />
                {/* 10. User Testing iMessage Simulator */}
                <div className={classes.textSection}>
                    <h2 className={classes.sectionHeading}>I tested my prototypes with 12+ design students, hosting 20+ user testing sessions.</h2>
                </div>
                <div className={classes.chatGrid}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Testers</div>
                        <Squircle cornerRadius={8} style={{ padding: "12px", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <div style={{ fontWeight: 500, fontSize: "0.85rem" }}>Testers 1</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Yes totally agree with everything above!</div>
                        </Squircle>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ alignSelf: "center", fontSize: "0.75rem", color: "var(--text-secondary)" }}>18 May 2024 2:10 PM</div>
                        <div className={classes.chatBubbleOutgoing}>What were the things you all liked the most about using the tool?</div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>S1</div>
                            <div className={classes.chatBubbleIncoming}>I loved visualizing my models within realistic contexts.</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>S2</div>
                            <div className={classes.chatBubbleIncoming}>Really valued the ability to interact with and explore my designs in ways I never could before.</div>
                        </div>
                    </div>
                </div>
                {/* 11. Custom GPT Simulator */}
                <CaseStudyGPT />
            </div>
        </div>
    );
}
