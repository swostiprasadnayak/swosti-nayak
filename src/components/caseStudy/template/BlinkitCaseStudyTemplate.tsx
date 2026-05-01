"use client";
import React, { useState } from "react";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import InteractiveNotes from "../blocks/InteractiveNotes";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./caseStudy.module.css";
import { MonitorPlay, FileText, ExternalLink, Menu } from "lucide-react";

const ACCENT = "#F5C518";

// Shared card shell – no glassmorphism, matches Syne template
const sCard: React.CSSProperties = {
    background: "var(--bg-card)",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    padding: "24px",
};

const sSubtle: React.CSSProperties = {
    background: "rgba(0,0,0,0.025)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 16,
    padding: "24px",
};

const eyebrow: React.CSSProperties = {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: 8,
};

const bigNum: React.CSSProperties = {
    fontSize: "2.8rem",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    color: ACCENT,
};

const label: React.CSSProperties = {
    fontSize: "0.88rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
};

// Blinkit-specific Finder window (shows prototype files)
function BlinkitFinderWindow() {
    const [active, setActive] = useState<"scanner" | "voice">("scanner");
    const files = {
        scanner: { name: "blinkit-scanner.html", href: "/prototypes/blinkit-scanner.html", desc: "F1 · Scan & Build Cart — camera, upload, paste-text prototype" },
        voice: { name: "blinkit-voice.html", href: "/prototypes/blinkit-voice.html", desc: "F2 · Voice Quick Order — conversational cart-building prototype" },
    };
    const current = files[active];
    return (
        <div style={{ width: "100%", background: "var(--bg-card)", borderRadius: 12, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", height: 400 }}>
            {/* Title bar */}
            <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)", gap: 16 }}>
                <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FE5F57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
                </div>
                <div style={{ display: "flex", gap: 12, color: "var(--text-secondary)" }}>
                    <Menu size={16} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>Blinkit Prototypes</span>
                </div>
            </div>
            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                {/* Sidebar */}
                <div style={{ width: 200, background: "var(--bg-secondary)", borderRight: "1px solid var(--border-subtle)", padding: "16px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", padding: "0 8px", marginBottom: 4, fontWeight: 600 }}>Prototypes</div>
                    {(["scanner", "voice"] as const).map(key => (
                        <button key={key} onClick={() => setActive(key)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, border: "none", background: active === key ? "rgba(0,0,0,0.06)" : "transparent", cursor: "pointer", textAlign: "left", fontSize: "0.85rem", color: active === key ? "#111" : "rgba(0,0,0,0.6)", fontWeight: active === key ? 500 : 400 }}>
                            <MonitorPlay size={14} color="#3b82f6" />
                            {key === "scanner" ? "F1 · Scanner" : "F2 · Voice"}
                        </button>
                    ))}
                </div>
                {/* Content */}
                <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: 72, height: 54, background: "var(--bg-secondary)", borderRadius: 6, border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FileText size={24} color={ACCENT} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{current.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 16 }}>{current.desc}</div>
                        <a href={current.href} target="_blank" rel="noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#111", color: "#fff", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}>
                            Open prototype <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BlinkitCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>

                {/* ── SECTION 1 — HERO ── */}
                <CaseStudyHeader
                    title="Grocery in 10 min"
                    subtitle="Cart takes 4. Designing an AI layer that makes building a grocery cart as fast as the delivery promise."
                    tags={["Blinkit · AI Personalization Layer", "Quick Commerce", "AI/ML", "Mobile UX"]}
                    onVoiceModeClick={openModal}
                />

                {/* Meta row */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: -32 }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Swosti Nayak · Product Designer · 2025</span>
                    <span style={{ color: "var(--border-strong)" }}>·</span>
                    {["⚡ Quick Commerce", "AI/ML", "Product Design", "Mobile UX"].map((t, i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: 100, border: "1px dashed var(--border-strong)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>{t}</span>
                    ))}
                </div>

                {/* ── HIGHLIGHTS reel (stat cards) ── */}
                <div>
                    <div style={{ ...eyebrow, textAlign: "center", marginBottom: 16 }}>Highlights</div>
                    <div className={classes.highlightsReel}>
                        {[
                            { bg: "#1a1a1a", color: "#fff", n: "24", l: "User interviews across Mumbai, Bangalore, Jodhpur" },
                            { bg: ACCENT, color: "#1a1a1a", n: "−58%", l: "Cart-build time after the AI layer" },
                            { bg: "#f0f0f0", color: "#111", n: "72%", l: "Users had a physical list open while ordering" },
                            { bg: "#1a1a1a", color: "#fff", n: "41%", l: "Sessions ended with zero add-to-cart" },
                            { bg: "#f5f5f5", color: "#111", n: "3.8×", l: "PDP opens per staple item — brand paralysis" },
                        ].map((c, i) => (
                            <div key={i} className={classes.highlightCard} style={{ background: c.bg, color: c.color, minWidth: "45%" }}>
                                <div style={{ fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>{c.n}</div>
                                <div style={{ fontSize: "1rem", lineHeight: 1.4, marginTop: "auto", opacity: 0.85 }}>{c.l}</div>
                            </div>
                        ))}
                    </div>
                    {/* Dot pagination */}
                    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                        {[0,1,2,3,4].map(i => <div key={i} style={{ width: i===0?24:8, height: 8, borderRadius: 100, background: i===0 ? "#111" : "rgba(0,0,0,0.15)" }} />)}
                    </div>
                </div>

                {/* ── SECTION 2 — INTRO ── */}
                <div style={{ ...sCard, maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
                    <p style={{ fontSize: "1.15rem", fontWeight: 500, color: "var(--text-primary)", margin: "0 0 12px", fontStyle: "italic" }}>
                        Is Blinkit's cart experience breaking the 10-minute promise?
                    </p>
                    <p style={{ fontSize: "0.97rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 10px" }}>
                        Blinkit delivers groceries in 10 minutes — a genuine engineering achievement. But the pre-order experience is broken. The average cart takes 4 minutes and 12 seconds to build. That's the bottleneck the brand promise sits in front of.
                    </p>
                    <p style={{ fontSize: "0.97rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
                        I set out to design an AI layer — scanning, voice, and predictive intelligence — that makes building a full grocery cart as fast as the delivery it triggers.
                    </p>
                </div>

                {/* ── AS-IS / TO-BE split ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={sSubtle}>
                        <div style={eyebrow}>Current experience (AS-IS)</div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                            {["4m 12s", "41% abandon", "Zero learning"].map(c => (
                                <span key={c} style={{ padding: "4px 10px", borderRadius: 100, background: "rgba(0,0,0,0.06)", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>{c}</span>
                            ))}
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                            <li><strong style={{ color: "var(--text-primary)" }}>Cold start every session</strong> — Generic homepage, no memory of preferences.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Keyword search fails intent</strong> — "Pasta tonight" returns nothing.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Brand paralysis at staples</strong> — 3.8 PDP opens per atta/dal item.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Physical list is invisible</strong> — 72% have a handwritten list typed manually.</li>
                        </ul>
                    </div>
                    <div style={{ ...sCard, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={eyebrow}>With the AI layer (TO-BE)</div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                            {["1m 45s", "<13% abandon", "Learns every order"].map(c => (
                                <span key={c} style={{ padding: "4px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.78rem", color: "#1a1a1a", fontWeight: 600 }}>{c}</span>
                            ))}
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                            <li><strong style={{ color: "var(--text-primary)" }}>Warm personalised home</strong> — AI-predicted reorder strip on open.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Scan / speak / type intent</strong> — Camera reads the paper list. Any modality.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Full cart in 1.5 seconds</strong> — Preferred brands pre-selected.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>“Add All” — one tap</strong> — 9 items, 1 action. Cold start eliminated.</li>
                        </ul>
                    </div>
                </div>

                {/* ── SECTION 3 — UNDERSTANDING THE PROBLEM ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Understanding the problem</div>
                    <p style={{ fontSize: "1.45rem", fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)", margin: 0 }}>
                        I examined the 10-minute promise and discovered <strong>3 structural friction points</strong>:
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                        { n: "10 min", l: "What Blinkit promises — India's fastest grocery delivery, a genuine technical achievement." },
                        { n: "4:12", l: "What users actually experience — a 20-tap gauntlet that contradicts the brand promise." },
                        { n: "72%", l: "Users who had a physical list open while ordering — handwritten notes, WhatsApp threads, screenshots. Completely unsupported." },
                        { n: "3.8×", l: "Product page opens per staple item. Users compare brands repeatedly. Six months of purchase history, completely ignored." },
                    ].map((s, i) => (
                        <div key={i} style={sCard}>
                            <div style={bigNum}>{s.n}</div>
                            <div style={label}>{s.l}</div>
                        </div>
                    ))}
                </div>

                {/* Goal callout */}
                <div style={{ ...sSubtle, borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={eyebrow}>Design goal</div>
                    <p style={{ fontSize: "1.15rem", fontWeight: 500, lineHeight: 1.5, color: "var(--text-primary)", margin: 0 }}>
                        "Make cart-building as fast as Blinkit's delivery — so the pre-order experience lives up to the 10-minute promise it sits in front of."
                    </p>
                </div>

                {/* ── SECTION 4 — RESEARCH ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Research</div>
                    <h2 className={classes.sectionHeading}>24 Interviews. One clear pattern.</h2>
                    <p className={classes.bodyText}>Six weeks of primary research with urban Indian Blinkit/Zepto/Instamart users — household grocery decision-makers screened for last-30-day activity.</p>
                </div>

                {/* Research notes (InteractiveNotes block) */}
                <InteractiveNotes />

                {/* Surprising finding */}
                <div style={{ ...sCard, borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={eyebrow}>The surprising finding</div>
                    <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "var(--text-primary)", margin: 0 }}>
                        I expected the primary pain to be delivery time. It wasn't. Every participant was satisfied with 10-minute delivery. The frustration was entirely pre-order — the gap between having a list and getting it into the cart. <strong>The delivery problem was solved. The ordering problem wasn't.</strong>
                    </p>
                </div>

                {/* Personas */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        { name: "Priya, 32", role: "Primary · Mumbai · Orders 2–3×/day", emoji: "👩‍💼", tier: "Primary", tierColor: ACCENT, points: ["Forgets items constantly, places multiple orders daily", "Keeps a handwritten list the app can't read", "Brand selection fatigue for every staple"], quote: "I just want to say 'stuff for pasta' and have it figure it out." },
                        { name: "Rajan, 27", role: "Secondary · Bangalore · Voice-first", emoji: "👨‍💻", tier: "Secondary", tierColor: "#e5e7eb", points: ["Mid-cook emergencies need instant ordering", "Instagram recipe → can't translate to cart", "Wants zero-touch experience while hands are busy"], quote: "I want to place an order without looking at my phone." },
                        { name: "Sunita, 62", role: "Edge Case · Jodhpur · Notebook user", emoji: "👩‍🦳", tier: "Edge Case", tierColor: "#f3f4f6", points: ["Asks family to order — app feels overwhelming", "Small fonts, confusing SKU results", "No Hindi voice input for her language"], quote: "I have the list right here. Why can't I show it to the phone?" },
                    ].map((p, i) => (
                        <div key={i} style={{ ...sCard, borderTop: i === 0 ? `3px solid ${ACCENT}` : "1px solid rgba(0,0,0,0.07)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                                <span style={{ padding: "3px 10px", borderRadius: 100, background: p.tierColor, fontSize: "0.72rem", fontWeight: 600, color: "#1a1a1a" }}>{p.tier}</span>
                            </div>
                            <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{p.role}</div>
                            <ul style={{ margin: "8px 0", paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.87rem", lineHeight: 1.55 }}>
                                {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
                            </ul>
                            <div style={{ background: "rgba(0,0,0,0.04)", padding: "10px 14px", borderRadius: 10, fontSize: "0.87rem", color: "var(--text-primary)", fontStyle: "italic", borderLeft: `2px solid ${ACCENT}` }}>
                                "{p.quote}"
                            </div>
                        </div>
                    ))}
                </div>

                {/* Research findings row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                        { n: "41%", t: "Sessions end with 0 add-to-cart", d: "Mental models ≠ SKU taxonomy. Users said “chai ingredients,” “party snacks” — intent-driven language search engines fail completely." },
                        { n: "72%", t: "Users with external list open", d: "Physical list is universal across age, city, and tech comfort. Users self-invented the workaround. The app simply didn't see it." },
                        { n: "3.8×", t: "PDP opens per staple item", d: "Brand is the #1 stall point. App shows identical unranked results to every user. Six months of purchase history, completely ignored." },
                        { n: "JTBD", t: "Four-phase job map", d: "Pre-Order Discovery · List Translation · Brand Selection · Post-Order Loop — each with its own pain and desired outcome." },
                    ].map((f, i) => (
                        <div key={i} style={sSubtle}>
                            <div style={bigNum}>{f.n}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: "6px 0 4px" }}>{f.t}</div>
                            <div style={label}>{f.d}</div>
                        </div>
                    ))}
                </div>

                {/* ── SECTION 5 — HMW ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
                    <div>
                        <div style={eyebrow}>How might we</div>
                        <p style={{ fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.45, color: "var(--text-primary)", margin: "0 0 16px" }}>
                            How might we make Blinkit's pre-order experience as fast as its delivery — so that building a full grocery cart feels as effortless and instant as the 10-minute promise?
                        </p>
                        {/* Dot indicator (like Syne) */}
                        <div style={{ display: "flex", gap: 6 }}>
                            {[0,1,2].map(i => <div key={i} style={{ width: i===0?20:8, height: 8, borderRadius: 100, background: i===0?"#111":"rgba(0,0,0,0.15)" }} />)}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { bg: "#1a1a1a", c: "#fff", t: "Users may build a full cart by scanning one photo." },
                            { bg: "#2d2d2d", c: "#fff", t: "Users may order hands-free while mid-cook." },
                        ].map((c, i) => (
                            <div key={i} style={{ background: c.bg, color: c.c, borderRadius: 12, padding: "20px 20px", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.45 }}>
                                {c.t}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 6 — IDEATION / WHAT I REJECTED ── */}
                <div style={sSubtle}>
                    <div style={eyebrow}>What I brainstormed — and what I rejected</div>
                    <p style={{ fontSize: "0.97rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: "0 0 20px" }}>
                        Ideas were audited on: Does it require zero new behaviour from the user? Does it serve the 72% with a physical list immediately? Does it share a single AI pipeline to reduce eng effort?
                    </p>
                    <div className={classes.ideasGrid}>
                        {[
                            { bg: "#fef3c7", t: "❌ Dedicated “Import List” Screen", d: "4/6 participants couldn't find it. Users don't think of ordering as list management." },
                            { bg: "#dbeafe", t: "❌ Voice FAB as Floating Button", d: "4/6 thought it was customer support. Moved inside search bar — association was immediate." },
                            { bg: "#dcfce7", t: "❌ Image Upload as Separate Entry", d: "Splitting 3 flows = 3 chances to abandon. One tabbed screen fixed it." },
                            { bg: "#fce7f3", t: "❌ Full-Screen Spinner Modal", d: "Users couldn't tell if the AI understood them. Progressive chip reveal gave control." },
                        ].map((s, i) => (
                            <div key={i} className={classes.ideaSticky} style={{ background: s.bg }}>
                                <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
                                <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.65)", lineHeight: 1.45 }}>{s.d}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 16, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16, fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                        <strong>V1 assumption → What research showed:</strong> Users don't want to manage lists. They want their list to disappear into the cart as fast as possible. The metaphor isn't “import” — it's <em>“scan and forget.”</em>
                    </div>
                </div>

                {/* ── SECTION 7 — PRIMARY FEATURES ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Solution · Primary features</div>
                    <h2 className={classes.sectionHeading}>Making the app a decision partner</h2>
                </div>

                {/* F1 */}
                <div style={sCard}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ padding: "5px 12px", borderRadius: 100, background: ACCENT, fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a" }}>F1</span>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Highest ROI · 72% of users benefit immediately</span>
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "4px 0 8px", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>Scan &amp; Build Cart</h3>
                    <p style={{ fontSize: "0.97rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 20px" }}>
                        Any external list — paper, screenshot, WhatsApp, recipe image, or pasted URL — turns into a personalised, brand-ranked, ready-to-checkout cart. Three input modes, one AI pipeline, nine items in one tap.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                        <div style={sSubtle}>
                            <div style={eyebrow}>Design logic 1</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>3 tabs, not 3 separate flows</div>
                            <div style={label}>Camera, upload, and paste-text unified under one screen. Detected items appear as dismissible chips — visible AI progress, not a black-box spinner.</div>
                        </div>
                        <div style={sSubtle}>
                            <div style={eyebrow}>Design logic 2</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>“From list” attribution on every card</div>
                            <div style={label}>Every product shows the exact text from the user's list that triggered the AI match. Trust through transparency.</div>
                        </div>
                    </div>

                    {/* Finder window for F1 prototype */}
                    <BlinkitFinderWindow />

                    {/* Screen flow placeholders */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 16 }}>
                        {["Home entry", "Upload", "Paste text", "Camera", "Screenshot", "Processing"].map((s, i) => (
                            <div key={i} style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, aspectRatio: "9/16", display: "flex", alignItems: "flex-end", padding: 8, fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                                {/* PLACEHOLDER: F1 screen — {s} */}
                                {i + 1}. {s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* F2 */}
                <div style={sCard}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ padding: "5px 12px", borderRadius: 100, background: ACCENT, fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a" }}>F2</span>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>New modality · Mid-cook · Hands-busy · Emergency</span>
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "4px 0 8px", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>Voice Quick Order</h3>
                    <p style={{ fontSize: "0.97rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 20px" }}>
                        One tap to start. Speak in Hindi, English, or code-switched ("Milk aur eggs de do"). AI builds the cart, shows it in a chat thread, and lets users confirm or edit by voice or tap. Fully touchless end-to-end.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                        <div style={sSubtle}>
                            <div style={eyebrow}>Design logic 1</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Real-time transcript, not a spinner</div>
                            <div style={label}>Transcript appears character-by-character. Yellow waveform runs simultaneously — proof of active listening, not silent black-box recording.</div>
                        </div>
                        <div style={sSubtle}>
                            <div style={eyebrow}>Design logic 2</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Cart card inside the chat thread</div>
                            <div style={label}>The AI's response is an inline cart card, not a modal or new screen. Users say “change brand” as a natural continuation. Context is never broken.</div>
                        </div>
                    </div>

                    <BlinkitFinderWindow />

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16 }}>
                        {["Chat welcome", "Listening", "AI processing", "Cart built"].map((s, i) => (
                            <div key={i} style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, aspectRatio: "9/16", display: "flex", alignItems: "flex-end", padding: 8, fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                                {/* PLACEHOLDER: F2 screen — {s} */}
                                {i + 1}. {s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── USER TESTING SECTION ── */}
                <div style={{ ...sCard }}>
                    <div style={eyebrow}>I tested my prototypes with 12+ design students, hosting 20+ user testing sessions.</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24, alignItems: "start" }}>
                        {/* Fanned photo placeholders */}
                        <div style={{ position: "relative", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {[
                                { rotate: "-6deg", offset: "-24px", zIndex: 1 },
                                { rotate: "-2deg", offset: "-8px", zIndex: 2 },
                                { rotate: "3deg", offset: "8px", zIndex: 3 },
                                { rotate: "7deg", offset: "24px", zIndex: 4 },
                            ].map((s, i) => (
                                <div key={i} style={{ position: "absolute", width: 110, height: 160, background: "#e5e7eb", border: "2px solid #fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.12)", transform: `rotate(${s.rotate}) translateX(${s.offset})`, zIndex: s.zIndex, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                                    📷
                                </div>
                            ))}
                        </div>
                        {/* Chat feedback */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ alignSelf: "flex-end", background: "#007aff", color: "#fff", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", maxWidth: "80%", fontSize: "0.88rem" }}>
                                What made ordering feel easier?
                            </div>
                            {[
                                { label: "User 1", text: "I just showed the app my list and it built the cart. Felt like magic." },
                                { label: "User 2", text: "The voice order while cooking was a game-changer — no screen needed." },
                                { label: "User 3", text: "Finally, it remembered I always buy Aashirvaad atta. Saved me 3 taps." },
                            ].map((m, i) => (
                                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>
                                        {`S${i + 1}`}
                                    </div>
                                    <div style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px 12px 12px 12px", fontSize: "0.87rem", color: "#111", lineHeight: 1.45 }}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 8 — SECONDARY FEATURES ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Secondary features</div>
                    <h2 className={classes.sectionHeading}>Closing the full loop</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        { tag: "F3", t: "Pantry Intelligence", sub: "Predict before they forget", pain: "Users place 2–3 orders/day due to forgetting. The app has 6 months of purchase data and uses none of it proactively.", sol: "Post-order setup → “Time to Reorder?” home strip. Users set duration; the app predicts run-out and surfaces the reminder." },
                        { tag: "F4", t: "2-Minute Edit Window", sub: "Catch the “I forgot” moment", pain: "After placing an order, users realise they forgot items. The only option is cancelling everything and starting over.", sol: "2-minute countdown after confirmation. AI suggests forgotten items as quick-add chips. Add or remove before the picker starts.", note: "Why hasn't Blinkit built this? Dark store ops complexity, payment reconciliation overhead, and fraud risk." },
                        { tag: "F5", t: "Meal Intent Search", sub: "Type a dish, get a cart", pain: "Instagram recipe inspiration requires 6+ separate searches to buy all ingredients.", sol: "User types meal name → AI parses intent → extracts ingredients → matches catalog → applies brand preferences. Cart grouped by dish." },
                    ].map((f, i) => (
                        <div key={i} style={sCard}>
                            <span style={{ padding: "5px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.72rem", fontWeight: 700, color: "#1a1a1a", alignSelf: "flex-start" }}>{f.tag}</span>
                            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>{f.t}</div>
                            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontStyle: "italic" }}>{f.sub}</div>
                            <div style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.55 }}><strong style={{ color: "var(--text-primary)" }}>Pain:</strong> {f.pain}</div>
                            <div style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.55 }}><strong style={{ color: "var(--text-primary)" }}>Solution:</strong> {f.sol}</div>
                            {f.note && <div style={{ ...sSubtle, padding: 12, fontSize: "0.8rem", marginTop: 4 }}><strong style={{ color: "var(--text-primary)" }}>Constraint note:</strong> {f.note}</div>}
                        </div>
                    ))}
                </div>

                {/* ── SECTION 9 — COMPETITIVE AUDIT ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 24, alignItems: "start" }}>
                    <div>
                        <div style={eyebrow}>Competitive audit · March 2026</div>
                        <p style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.45, color: "var(--text-primary)", margin: "0 0 12px" }}>
                            Existing tools mainly target competitors moving toward AI — here's exactly where the gap is.
                        </p>
                        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                            Sourced from published product releases, app-store reviews, and design teardowns.
                        </p>
                    </div>
                    <div style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                                <thead>
                                    <tr style={{ background: "rgba(0,0,0,0.03)" }}>
                                        {["Feature", "Blinkit", "Zepto", "Instamart", "Gap"].map((h, i) => (
                                            <th key={i} scope="col" style={{ textAlign: "left", padding: "12px 14px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Semantic / NL Search", "⚡ Partial", "✓ Fast", "✓ Swiggy Sense (2024)", "⚠ Instamart ahead"],
                                        ["Image / List Scan", "✗ None", "✗ None", "✗ None", "✓ First-mover gap"],
                                        ["Conversational Voice", "✗ None", "✗ None", "✓ MCP (Jan 2026)", "⚠ External only"],
                                        ["Pantry Intelligence", "⚡ Partial", "⚡ Partial", "⚡ Partial", "✓ Predictive gap"],
                                        ["Post-Order Edit", "✗ Cancel only", "✗ None", "✗ None", "✓ Category gap"],
                                        ["Brand Personalization", "⚡ Partial", "✗ None", "✗ None", "✓ First wins loyalty"],
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                                            <th scope="row" style={{ padding: "12px 14px", fontWeight: 600, color: "var(--text-primary)", textAlign: "left", whiteSpace: "nowrap" }}>{row[0]}</th>
                                            {row.slice(1).map((cell, j) => (
                                                <td key={j} style={{ padding: "12px 14px", color: "var(--text-secondary)", verticalAlign: "top" }}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 10 — ARCHITECTURE ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Architecture</div>
                    <h2 className={classes.sectionHeading}>One pipeline. Three entry points.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { n: "1", t: "Input Layer", d: "Camera · Voice · Text — 3 modalities, 1 entry UX." },
                        { n: "2", t: "NLP / NLU Engine", d: "Gemini Vision + Whisper + semantic parser." },
                        { n: "3", t: "Intent Resolution", d: "Meal → ingredients · List → SKUs · Voice → query." },
                        { n: "4", t: "Personalization", d: "Brand-preference scoring · Purchase history · Pantry state." },
                        { n: "5", t: "Cart Builder", d: "Ranked results · Attribution tags · One-tap confirm." },
                    ].map((s, i) => (
                        <div key={i} style={sSubtle}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: ACCENT, color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.82rem", marginBottom: 8 }}>{s.n}</div>
                            <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{s.t}</div>
                            <div style={{ ...label, fontSize: "0.8rem" }}>{s.d}</div>
                        </div>
                    ))}
                </div>

                <div style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                        <thead>
                            <tr style={{ background: "rgba(0,0,0,0.03)" }}>
                                {["Layer", "Technology", "Rationale"].map((h, i) => (
                                    <th key={i} scope="col" style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["OCR / Vision", "Gemini Vision API", "Best-in-class Indian handwriting recognition"],
                                ["Speech-to-Text", "OpenAI Whisper", "Hindi/English code-switching support"],
                                ["Semantic Parsing", "Custom fine-tuned LLM on grocery corpus", "Meal intent → SKU mapping"],
                                ["Personalization", "Collaborative filtering + rules engine", "Low latency (<200ms)"],
                                ["Backend", "Existing Blinkit microservices", "No new infrastructure"],
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                                    <th scope="row" style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", textAlign: "left" }}>{row[0]}</th>
                                    <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{row[1]}</td>
                                    <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ ...sSubtle, borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={eyebrow}>Engineering note</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                        One shared pipeline means F1, F2, and F5 share the same NLU backend. <strong>−40% engineering effort</strong> vs. building 3 separate features.
                    </div>
                </div>

                {/* ── SECTION 11 — BEFORE / AFTER + METRICS ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Before · After</div>
                    <h2 className={classes.sectionHeading}>The journey, side by side.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={sSubtle}>
                        <div style={eyebrow}>Before</div>
                        <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                            <li>Open app → cold home screen, no personalisation</li>
                            <li>Search keyword → wrong / irrelevant results</li>
                            <li>Open multiple PDPs → brand comparison paralysis</li>
                            <li>Add items one by one — 9 taps for 9 items</li>
                            <li>Realise you forgot something → cancel entire order</li>
                        </ol>
                    </div>
                    <div style={{ ...sCard, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={eyebrow}>After</div>
                        <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                            <li>Open app → warm home with predicted reorder strip</li>
                            <li>Scan list / speak intent / type meal → AI pipeline</li>
                            <li>Brand auto-selected from history → no PDP needed</li>
                            <li>“Add All” — 1 tap for the entire list</li>
                            <li>2-minute edit window — add forgotten items instantly</li>
                        </ol>
                    </div>
                </div>

                {/* Big metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { metric: "Cart-build time", before: "4m 12s", after: "1m 45s" },
                        { metric: "Avg order value", before: "—", after: "+₹290" },
                        { metric: "Drop-off rate", before: "41%", after: "<13%" },
                        { metric: "Brand decision", before: "3.8 PDPs", after: "1 glance" },
                        { metric: "Reorder gap", before: "—", after: "−34%" },
                    ].map((m, i) => (
                        <div key={i} style={sSubtle}>
                            <div style={label}>{m.metric}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>{m.before} →</div>
                            <div style={{ ...bigNum, fontSize: "1.6rem", marginTop: 4 }}>{m.after}</div>
                        </div>
                    ))}
                </div>

                {/* Metric honesty callout */}
                <div style={{ background: `rgba(245,197,24,0.10)`, border: `1px solid rgba(245,197,24,0.35)`, borderLeft: `3px solid ${ACCENT}`, borderRadius: 16, padding: "20px 24px" }}>
                    <div style={eyebrow}>Metric honesty — what's validated vs projected</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>✓ Validated</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                                <li>Cart-build time reduction (usability testing, n=6)</li>
                                <li>Drop-off rate pattern (session data)</li>
                                <li>Physical-list behaviour (24 interviews)</li>
                            </ul>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>📊 Projected</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                                <li>+₹290 AOV uplift</li>
                                <li>−34% reorder gap</li>
                                <li>&lt;13% abandon rate</li>
                                <li>Based on analogous benchmarks from similar AI feature launches.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 12 — BUSINESS VALIDATION ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Business validation</div>
                    <h2 className={classes.sectionHeading}>Why this is worth building now.</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                        { t: "Business case — Revenue impact", d: "Higher AOV through bigger, more complete carts. Reduced support costs from fewer repeat orders. The reorder loop reduces churn." },
                        { t: "User need validation", d: "24 interviews, all converging on the same 3 pain points. Zero AI competition in list-scan. 72% of users already doing the workaround." },
                        { t: "Competitive advantage", d: "First mover on image-to-cart in Indian quick commerce. Differentiation from Zepto and Instamart on the pre-order experience layer." },
                        { t: "What to validate in user testing", d: "Does the scan confidence threshold (85%+) meet user trust? Does the voice transcript reassure or create anxiety? Does the 2-min window interrupt dark-store operations?" },
                    ].map((c, i) => (
                        <div key={i} style={sSubtle}>
                            <div style={{ fontSize: "0.97rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{c.t}</div>
                            <div style={{ ...label, fontSize: "0.92rem" }}>{c.d}</div>
                        </div>
                    ))}
                </div>

                {/* ── SECTION 13 — ROADMAP ── */}
                <div className={classes.textSection}>
                    <div style={eyebrow}>Roadmap · Future scope</div>
                    <h2 className={classes.sectionHeading}>Three phases. Shared pipeline. Increasing scope.</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        { phase: "Phase 1", time: "0–3 months", t: "Scan & Build Cart (F1) + Voice Quick Order (F2)", d: "Highest ROI, shared pipeline, immediate user impact." },
                        { phase: "Phase 2", time: "3–6 months", t: "Pantry Intelligence (F3) + 2-Minute Edit Window (F4)", d: "Requires back-end coordination with dark-store ops." },
                        { phase: "Phase 3", time: "6–12 months", t: "Meal Intent Search (F5) + full personalization layer", d: "Catalog partnership, cuisine model training." },
                    ].map((p, i) => (
                        <div key={i} style={sCard}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <span style={{ padding: "4px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.72rem", fontWeight: 700, color: "#1a1a1a" }}>{p.phase}</span>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.time}</span>
                            </div>
                            <div style={{ fontSize: "0.97rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{p.t}</div>
                            <div style={label}>{p.d}</div>
                        </div>
                    ))}
                </div>

                {/* What I learned */}
                <div style={{ ...sCard, padding: "32px" }}>
                    <div style={eyebrow}>What I learned</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {[
                            { bold: "Research inversion:", body: "I expected delivery speed to be the pain. It was the ordering, not the delivery — that finding reframed the entire solution space." },
                            { bold: "Rejection is the design:", body: "The 4 rejected directions are as important as the final solution. They show the design pressure the right answer had to survive." },
                            { bold: "Trust is the hardest feature:", body: "Every AI feature needed a “show your work” layer — chips, transcripts, attribution — before users felt safe to trust it." },
                        ].map((l, i) => (
                            <p key={i} style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                                <strong style={{ color: "var(--text-primary)" }}>{l.bold}</strong> {l.body}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
