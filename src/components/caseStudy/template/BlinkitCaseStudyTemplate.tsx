"use client";
import React from "react";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./caseStudy.module.css";
import { ExternalLink } from "lucide-react";

const ACCENT = "#F5C518";

// ── Shared style tokens ────────────────────────────────────────────────────
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
const bigNum: React.CSSProperties = {
    fontSize: "2.8rem",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    color: ACCENT,
};
const bodyText: React.CSSProperties = {
    fontSize: "0.97rem",
    lineHeight: 1.7,
    color: "var(--text-secondary)",
};

// ── Section header — numbered, bold, clearly separated ────────────────────
function SectionHeader({ num, label }: { num: string; label: string }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingBottom: 20,
            borderBottom: `2px solid ${ACCENT}`,
            marginBottom: 32,
        }}>
            <span style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                background: "rgba(245,197,24,0.12)",
                padding: "4px 10px",
                borderRadius: 100,
                flexShrink: 0,
            }}>{num}</span>
            <span style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
            }}>{label}</span>
        </div>
    );
}

// ── Section wrapper — spacing between sections ─────────────────────────────
function Section({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {children}
        </div>
    );
}

// ── Single prototype embed ─────────────────────────────────────────────────
// Both prototypes share the same layout:
//   body { padding: 32px top } → blank space before the phone
//   .phone { width:390, height:844, border-radius:52px }
//   nav bar below the phone (must be hidden)
//
// Fix: offset the iframe upward by (BODY_PAD_TOP × SCALE) so the phone
// sits flush at y=0; clip container to exactly (PHONE_H × SCALE) tall;
// match border-radius to the phone's own corners (PHONE_RADIUS × SCALE).
function ProtoEmbed({ href, title }: { href: string; title: string }) {
    const PROTO_W       = 390;   // phone width in the HTML
    const PROTO_H       = 844;   // phone height in the HTML
    const PHONE_RADIUS  = 52;    // border-radius of .phone in the HTML
    const BODY_PAD_TOP  = 32;    // body padding-top in the HTML
    const SCALE         = 0.72;  // display scale

    // Visible container — exactly the phone, nothing else
    const containerW  = Math.round(PROTO_W      * SCALE);   // 281
    const containerH  = Math.round(PROTO_H      * SCALE);   // 608
    const cornerR     = Math.round(PHONE_RADIUS * SCALE);   // 37  ← matches phone corners
    const topOffset   = -(BODY_PAD_TOP * SCALE);            // -23 ← skip body padding

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/*
              Container clips to exactly the phone dimensions.
              border: none — the phone itself provides the visual boundary.
            */}
            <div style={{
                width:        containerW,
                height:       containerH,
                position:     "relative",
                overflow:     "hidden",
                borderRadius: cornerR,
                flexShrink:   0,
                // Subtle shadow so the phone "floats" off the page
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}>
                <iframe
                    src={href}
                    title={title}
                    style={{
                        position:        "absolute",
                        top:             topOffset, // shift up to skip body padding
                        left:            0,
                        width:           PROTO_W,
                        height:          PROTO_H + BODY_PAD_TOP + 120, // include full phone height
                        border:          "none",
                        display:         "block",
                        transform:       `scale(${SCALE})`,
                        transformOrigin: "top left",
                        pointerEvents:   "auto",
                    }}
                    loading="lazy"
                />
            </div>
            <a href={href} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                Full screen <ExternalLink size={12} />
            </a>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BlinkitCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth} style={{ gap: 72 }}>

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <CaseStudyHeader
                    title="Grocery in 10 min"
                    subtitle="Cart takes 4. Designing an AI layer that makes building a grocery cart as fast as the delivery promise — through intelligent scanning, voice ordering, and predictive intelligence."
                    tags={["Blinkit · AI Personalization Layer", "Quick Commerce", "AI/ML", "Mobile UX"]}
                    onVoiceModeClick={openModal}
                />

                {/* Meta */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: -40 }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Swosti Nayak · Product Designer · 2025</span>
                    <span style={{ color: "var(--border-strong)" }}>·</span>
                    {["Quick Commerce", "AI/ML", "Product Design", "Mobile UX"].map((t, i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: 100, border: "1px dashed var(--border-strong)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>{t}</span>
                    ))}
                </div>

                {/* ── HERO BANNER ───────────────────────────────────────────── */}
                <div style={{
                    width: "100%",
                    aspectRatio: "16 / 7",
                    background: "#f0ebe0",
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                }}>
                    {/* Top-right Blinkit logo */}
                    <div style={{
                        position: "absolute",
                        top: 28,
                        right: 32,
                        fontWeight: 900,
                        fontSize: "1.5rem",
                        letterSpacing: "-0.03em",
                        color: "#1a8a2e",
                        fontFamily: "inherit",
                        lineHeight: 1,
                    }}>blinkit</div>

                    {/* Left: headline copy */}
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: 44,
                        transform: "translateY(-50%)",
                        zIndex: 2,
                    }}>
                        <div style={{
                            fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.03em",
                            color: "#1a1a1a",
                        }}>
                            Making Grocery<br />
                            Shopping{" "}
                            <span style={{ color: ACCENT }}>Effortless</span><br />
                            <span style={{ color: ACCENT }}>with AI</span>
                        </div>
                    </div>

                    {/* Right: 4 phone mockups at staggered heights */}
                    <div style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        top: 0,
                        width: "68%",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        gap: 12,
                        paddingRight: 32,
                        paddingBottom: 0,
                    }}>
                        {[
                            { src: "/images/blinkit/screen-1-home.png",         bottomOffset: "-2%",  height: "82%", label: "Home" },
                            { src: "/images/blinkit/screen-2-scan-list.png",    bottomOffset: "-2%",  height: "95%", label: "Scan" },
                            { src: "/images/blinkit/screen-3-product-match.png",bottomOffset: "-2%",  height: "88%", label: "Match" },
                            { src: "/images/blinkit/screen-4-upload.png",       bottomOffset: "-2%",  height: "96%", label: "Results" },
                        ].map((phone, i) => (
                            <div key={i} style={{
                                height: phone.height,
                                aspectRatio: "390 / 844",
                                borderRadius: "28px 28px 0 0",
                                overflow: "hidden",
                                boxShadow: "0 -8px 40px rgba(0,0,0,0.14), 0 -2px 8px rgba(0,0,0,0.08)",
                                background: "#e0dbd0",
                                flexShrink: 0,
                                position: "relative",
                                alignSelf: "flex-end",
                                marginBottom: phone.bottomOffset,
                            }}>
                                <img
                                    src={phone.src}
                                    alt={phone.label}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                                {/* Gradient overlay at bottom for depth */}
                                <div style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "30%",
                                    background: "linear-gradient(to top, rgba(240,235,224,0.5), transparent)",
                                    pointerEvents: "none",
                                }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 01 — CHALLENGE VS IMPACT ─────────────────────────────── */}
                <Section>
                    <SectionHeader num="01" label="Challenge vs Impact" />

                    <p style={{ ...bodyText, maxWidth: 680 }}>
                        Blinkit delivers groceries in 10 minutes — a genuine engineering achievement. But the pre-order experience is broken. The average cart takes <strong style={{ color: "var(--text-primary)" }}>4 minutes 12 seconds</strong> to build. That's the bottleneck the brand promise sits in front of.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {/* AS-IS */}
                        <div style={sSubtle}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>AS-IS — Current Experience</div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                                {["4m 12s", "41% abandon", "Zero learning"].map(c => (
                                    <span key={c} style={{ padding: "4px 10px", borderRadius: 100, background: "rgba(0,0,0,0.06)", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>{c}</span>
                                ))}
                            </div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li><strong style={{ color: "var(--text-primary)" }}>Cold start every session</strong> — Generic homepage, no memory of preferences.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>Keyword search fails intent</strong> — "Pasta tonight" returns nothing.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>Brand paralysis at staples</strong> — 3.8 PDP opens per atta/dal item.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>Physical list is invisible</strong> — 72% have a handwritten list typed manually.</li>
                            </ul>
                        </div>
                        {/* TO-BE */}
                        <div style={{ ...sCard, borderLeft: `3px solid ${ACCENT}` }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>TO-BE — With AI Layer</div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                                {["1m 45s", "<13% abandon", "Learns every order"].map(c => (
                                    <span key={c} style={{ padding: "4px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.78rem", color: "#1a1a1a", fontWeight: 600 }}>{c}</span>
                                ))}
                            </div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li><strong style={{ color: "var(--text-primary)" }}>Warm personalised home</strong> — AI-predicted reorder strip on open.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>Scan / speak / type intent</strong> — Camera reads the paper list. Any modality.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>Full cart in 1.5 seconds</strong> — Preferred brands pre-selected.</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>"Add All" — one tap</strong> — 9 items, 1 action. Cold start eliminated.</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* ── 02 — UNDERSTANDING THE PROBLEM ──────────────────────── */}
                <Section>
                    <SectionHeader num="02" label="Understanding the Problem" />

                    <p style={{ ...bodyText, maxWidth: 680 }}>
                        I examined the 10-minute promise and discovered <strong style={{ color: "var(--text-primary)" }}>3 structural friction points</strong> — each independent, each solvable with one AI pipeline.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            { n: "10 min", l: "What Blinkit promises — India's fastest grocery delivery, a genuine technical achievement." },
                            { n: "4:12",   l: "What users actually experience — a 20-tap gauntlet that contradicts the brand promise." },
                            { n: "72%",    l: "Users who had a physical list open while ordering — handwritten notes, WhatsApp threads, screenshots." },
                            { n: "3.8×",   l: "Product page opens per staple item. Users compare brands repeatedly. Six months of data, completely ignored." },
                        ].map((s, i) => (
                            <div key={i} style={sCard}>
                                <div style={bigNum}>{s.n}</div>
                                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>

                    {/* Goal callout */}
                    <div style={{ ...sSubtle, borderLeft: `3px solid ${ACCENT}`, padding: "20px 24px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Goal</div>
                        <p style={{ fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.55, color: "var(--text-primary)", margin: 0, fontStyle: "italic" }}>
                            "Make cart-building as fast as Blinkit's delivery — so the pre-order experience lives up to the 10-minute promise it sits in front of."
                        </p>
                    </div>
                </Section>

                {/* ── 03 — MY ROLE & RESEARCH ──────────────────────────────── */}
                <Section>
                    <SectionHeader num="03" label="My Role & Research" />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={sCard}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>My Role</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li>End-to-end Product Design (0 → prototype)</li>
                                <li>User Research & Synthesis</li>
                                <li>AI/UX interaction design</li>
                                <li>Competitive & systems analysis</li>
                                <li>Prototype: Figma + HTML/CSS (interactive)</li>
                            </ul>
                        </div>
                        <div style={sCard}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Research Methodology</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li><strong style={{ color: "var(--text-primary)" }}>24 interviews</strong> — 45-min semi-structured sessions</li>
                                <li><strong style={{ color: "var(--text-primary)" }}>6 weeks</strong> — Mumbai, Bangalore, Jodhpur</li>
                                <li>Screen-sharing + "walk me through your last order"</li>
                                <li>Network (8) · WhatsApp communities (9) · LinkedIn (7)</li>
                                <li>Screened for last-30-day Blinkit/Zepto/Instamart use</li>
                            </ul>
                        </div>
                    </div>

                    {/* Surprising finding */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "28px 32px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>The Surprising Finding</div>
                        <p style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.6, color: "#fff", margin: 0 }}>
                            I expected the primary pain to be delivery time. It wasn't. Every participant was satisfied with 10-minute delivery. The frustration was entirely pre-order — the gap between having a list and getting it into the cart.{" "}
                            <span style={{ color: ACCENT }}>The delivery problem was solved. The ordering problem wasn't.</span>
                        </p>
                    </div>
                </Section>

                {/* ── 04 — USER INSIGHTS & PERSONAS ───────────────────────── */}
                <Section>
                    <SectionHeader num="04" label="User Insights & Personas" />

                    {/* 3 personas */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            { emoji: "👩‍💼", name: "Priya, 32", role: "Primary · Mumbai · 2–3× orders/day", tier: "Primary", tierBg: ACCENT, points: ["Forgets items, places multiple orders daily", "Handwritten list the app can't read", "Brand selection fatigue on every staple"], quote: "I just want to say 'stuff for pasta' and have it figure it out." },
                            { emoji: "👨‍💻", name: "Rajan, 27", role: "Secondary · Bangalore · Voice-first",    tier: "Secondary", tierBg: "#e5e7eb", points: ["Mid-cook emergencies need instant ordering", "Instagram recipe → can't translate to cart", "Wants zero-touch while hands are busy"],      quote: "I want to place an order without looking at my phone." },
                            { emoji: "👩‍🦳", name: "Sunita, 62", role: "Edge Case · Jodhpur · Notebook user",  tier: "Edge Case", tierBg: "#f3f4f6", points: ["Asks family to order — app feels overwhelming", "Small fonts, confusing SKU results",    "No Hindi voice input for her language"],         quote: "I have the list right here. Why can't I show it to the phone?" },
                        ].map((p, i) => (
                            <div key={i} style={{ ...sCard, borderTop: i === 0 ? `3px solid ${ACCENT}` : "1px solid rgba(0,0,0,0.07)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                                    <span style={{ padding: "3px 10px", borderRadius: 100, background: p.tierBg, fontSize: "0.72rem", fontWeight: 600, color: "#1a1a1a" }}>{p.tier}</span>
                                </div>
                                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{p.role}</div>
                                <ul style={{ margin: "4px 0", paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.87rem", lineHeight: 1.55 }}>
                                    {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
                                </ul>
                                <div style={{ background: "rgba(0,0,0,0.04)", padding: "10px 14px", borderRadius: 10, fontSize: "0.87rem", color: "var(--text-primary)", fontStyle: "italic", borderLeft: `2px solid ${ACCENT}` }}>
                                    "{p.quote}"
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Research stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                        {[
                            { n: "41%", t: "Sessions end with 0 add-to-cart", d: "Mental models ≠ SKU taxonomy. Users said 'chai ingredients,' 'party snacks' — intent-driven language search engines fail completely." },
                            { n: "72%", t: "Users with an external list open", d: "Physical list is universal across age, city, and tech comfort. Users self-invented the workaround. The app simply didn't see it." },
                            { n: "3.8×", t: "PDP opens per staple item",       d: "Brand is the #1 stall point. App shows identical unranked results to every user. Six months of purchase history, completely ignored." },
                            { n: "JTBD", t: "Four-phase job map",               d: "Pre-Order Discovery · List Translation · Brand Selection · Post-Order Loop — each with its own pain and desired outcome." },
                        ].map((f, i) => (
                            <div key={i} style={sSubtle}>
                                <div style={bigNum}>{f.n}</div>
                                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", margin: "6px 0 4px" }}>{f.t}</div>
                                <div style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{f.d}</div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── 05 — IDEATION & WHAT I REJECTED ─────────────────────── */}
                <Section>
                    <SectionHeader num="05" label="Ideation — What I Explored & Rejected" />

                    {/* HMW */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "32px 36px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>How Might We</div>
                        <p style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.5, color: "#fff", margin: 0 }}>
                            How might we make Blinkit's pre-order experience as fast as its delivery — so that building a full grocery cart feels as effortless and instant as the 10-minute promise?
                        </p>
                    </div>

                    <p style={{ ...bodyText }}>
                        Ideas were audited against three filters: Does it require zero new behaviour from the user? Does it serve the 72% with a physical list immediately? Does it share a single AI pipeline to reduce engineering effort?
                    </p>

                    {/* Rejected ideas */}
                    <div style={{ ...sSubtle, padding: "24px 28px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 16 }}>Rejected Directions</div>
                        <div className={classes.ideasGrid}>
                            {[
                                { bg: "#fef3c7", t: "❌ Dedicated 'Import List' Screen",  d: "4/6 participants couldn't find it. Users don't think of ordering as list management." },
                                { bg: "#dbeafe", t: "❌ Voice FAB as Floating Button",    d: "4/6 thought it was customer support. Moved inside search bar — the association was immediate." },
                                { bg: "#dcfce7", t: "❌ Image Upload as Separate Entry",  d: "Splitting 3 flows = 3 chances to abandon. One tabbed screen fixed it." },
                                { bg: "#fce7f3", t: "❌ Full-Screen Spinner Modal",        d: "Users couldn't tell if the AI understood them. Progressive chip reveal gave control." },
                            ].map((s, i) => (
                                <div key={i} className={classes.ideaSticky} style={{ background: s.bg }}>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
                                    <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.65)", lineHeight: 1.45 }}>{s.d}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 16, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16, fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                            <strong>V1 assumption → What research showed:</strong> Users don't want to manage lists. They want their list to disappear into the cart as fast as possible. The metaphor isn't "import" — it's <em>"scan and forget."</em>
                        </div>
                    </div>
                </Section>

                {/* ── 06 — SOLUTION: F1 SCAN & BUILD CART ─────────────────── */}
                <Section>
                    <SectionHeader num="06" label="Solution: F1 — Scan & Build Cart" />

                    {/* Two-column: text LEFT · design logic RIGHT */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "flex-start" }}>

                        {/* ── Text column ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                            {/* Numbered badge + category label */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: ACCENT, color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", flexShrink: 0 }}>1</div>
                                <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)" }}>AI List Scanner</span>
                            </div>

                            {/* Big headline */}
                            <h3 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--text-primary)", margin: 0 }}>
                                Point. Scan.<br />Done.
                            </h3>

                            {/* Body */}
                            <p style={{ ...bodyText, margin: 0 }}>
                                Users photograph their handwritten grocery list. The AI reads it using multilingual OCR (Hindi + English), extracts each item with its quantity, maps to the Blinkit product catalog, and returns a fully editable cart — with brand swap options for every item.
                            </p>

                            {/* Feature bullets */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {[
                                    { icon: "📷", bold: "Handwriting-aware OCR", text: "— reads messy handwriting in Hindi and English, catches abbreviations" },
                                    { icon: "🔄", bold: "Brand swap UI", text: "— every item shows 2–3 brand options, tap to switch before checkout" },
                                    { icon: "✏️", bold: "Item-level control", text: "— uncheck items you already have at home, total updates live" },
                                    { icon: "🛒", bold: "One-tap bulk checkout", text: '— "Add All 9 to Cart" replaces 9 individual add actions' },
                                    { icon: "📝", bold: '"From list" attribution', text: "— shows the original text so users trust the AI understood correctly" },
                                ].map((pt, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.55 }}>{pt.icon}</span>
                                        <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                                            <strong style={{ color: "var(--text-primary)" }}>{pt.bold}</strong>{pt.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Design Logic column (RIGHT) ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 4 }}>Design Logic</div>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 1</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>3 tabs, not 3 flows</div>
                                <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Camera, upload, and paste-text unified under one screen. Items appear as dismissible chips — visible AI progress.</div>
                            </div>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 2</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Attribution on every card</div>
                                <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Every product shows the exact text from the list that triggered the AI match. Trust through transparency.</div>
                            </div>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 3</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Personalising, not loading</div>
                                <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>The processing screen shows AI steps in real time — brand matching, quantity parsing — so the wait feels purposeful.</div>
                            </div>
                        </div>
                    </div>

                    {/* ── 6 screens strip — full width below ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>Screen Flow — All 6 Screens</div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gap: 16,
                        }}>
                            {[
                                { src: "/images/blinkit/screen-1-home.png",          label: "Home" },
                                { src: "/images/blinkit/screen-2-scan-list.png",      label: "Scan List" },
                                { src: "/images/blinkit/screen-3-product-match.png",  label: "Product Match" },
                                { src: "/images/blinkit/screen-4-upload.png",         label: "Upload Image" },
                                { src: "/images/blinkit/screen-5-paste-text.png",     label: "Paste Text" },
                                { src: "/images/blinkit/screen-6-personalizing.png",  label: "Personalizing" },
                            ].map((s, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {/* Phone frame */}
                                    <div style={{
                                        width: "100%",
                                        aspectRatio: "390 / 844",
                                        borderRadius: 24,
                                        overflow: "hidden",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                                        background: "#f0f0f0",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        position: "relative",
                                    }}>
                                        <img
                                            src={s.src}
                                            alt={s.label}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                            onError={(e) => {
                                                // Graceful placeholder until images are added
                                                const target = e.currentTarget;
                                                target.style.display = "none";
                                                const parent = target.parentElement;
                                                if (parent && !parent.querySelector(".placeholder-label")) {
                                                    const ph = document.createElement("div");
                                                    ph.className = "placeholder-label";
                                                    ph.style.cssText = "position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:linear-gradient(160deg,#f5f5f5,#e8e8e8);";
                                                    ph.innerHTML = `<span style="font-size:1.5rem">${["🏠","📷","✅","🖼️","📋","✨"][${i}]}</span><span style="font-size:0.7rem;color:#999;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">${s.label}</span>`;
                                                    parent.appendChild(ph);
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Caption */}
                                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)", textAlign: "center", letterSpacing: "0.03em" }}>
                                        <span style={{ color: ACCENT, marginRight: 4 }}>{i + 1}</span>{s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ── 07 — SOLUTION: F2 VOICE QUICK ORDER ──────────────────── */}
                <Section>
                    <SectionHeader num="07" label="Solution: F2 — Voice Quick Order" />

                    {/* Two-column: prototype LEFT · text RIGHT  (alternating) */}
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 56, alignItems: "flex-start" }}>

                        {/* ── Prototype column ── */}
                        <ProtoEmbed href="/prototypes/blinkit-voice.html" title="F2 — Voice Quick Order" />

                        {/* ── Text column ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                            {/* Numbered badge + category label */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: ACCENT, color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", flexShrink: 0 }}>2</div>
                                <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)" }}>Voice Quick Order</span>
                            </div>

                            {/* Big headline */}
                            <h3 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--text-primary)", margin: 0 }}>
                                One tap.<br />Speak your order.
                            </h3>

                            {/* Body */}
                            <p style={{ ...bodyText, margin: 0 }}>
                                One tap to start. Speak in Hindi, English, or code-switched ("Milk aur eggs de do"). AI builds the cart, shows it in a chat thread, and lets users confirm or edit by voice or tap. Fully touchless end-to-end.
                            </p>

                            {/* Feature bullets */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {[
                                    { icon: "🎙️", bold: "Speak naturally", text: "— Hindi, English, or code-switched. 'Dahi aur bread le aao' is a valid order" },
                                    { icon: "📝", bold: "Real-time transcript", text: "— appears character-by-character, proof of active listening not a silent spinner" },
                                    { icon: "💬", bold: "Cart card in the thread", text: "— AI's response is an inline cart card, never breaks context or opens a new screen" },
                                    { icon: "✅", bold: "Fully touchless", text: "— confirm, edit, or cancel entirely by voice, no screen needed from intent to checkout" },
                                ].map((pt, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.55 }}>{pt.icon}</span>
                                        <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                                            <strong style={{ color: "var(--text-primary)" }}>{pt.bold}</strong>{pt.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Design logic cards */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                                <div style={sSubtle}>
                                    <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 1</div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Transcript, not a spinner</div>
                                    <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Yellow waveform + live transcript runs simultaneously — proof the AI is listening before results appear.</div>
                                </div>
                                <div style={sSubtle}>
                                    <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 2</div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Cart inside the thread</div>
                                    <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Inline cart card, not a modal. Users say "change brand" as natural continuation — context never breaks.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User testing — full width below */}
                    <div style={{ ...sCard }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 16 }}>Tested with 12+ design students · 20+ sessions</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                "I just showed the app my list and it built the cart. Felt like magic.",
                                "The voice order while cooking was a game-changer — no screen needed.",
                                "Finally, it remembered I always buy Aashirvaad atta. Saved me 3 taps.",
                            ].map((m, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>S{i + 1}</div>
                                    <div style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px 12px 12px 12px", fontSize: "0.87rem", color: "#111", lineHeight: 1.45 }}>{m}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ── 08 — SECONDARY FEATURES ──────────────────────────────── */}
                <Section>
                    <SectionHeader num="08" label="Secondary Features" />
                    <p style={{ ...bodyText, maxWidth: 680 }}>Three supporting features that close the full ordering loop — from prediction to post-order recovery.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            { tag: "F3", t: "Pantry Intelligence",    sub: "Predict before they forget",        pain: "Users place 2–3 orders/day due to forgetting. The app has 6 months of data and uses none of it proactively.", sol: "Post-order setup → 'Time to Reorder?' home strip. Users set duration; the app predicts run-out." },
                            { tag: "F4", t: "2-Minute Edit Window",   sub: "Catch the 'I forgot' moment",       pain: "After placing an order, users realise they forgot items. The only option is cancelling everything.", sol: "2-minute countdown after confirmation. AI suggests forgotten items as quick-add chips. Add or remove before the picker starts." },
                            { tag: "F5", t: "Meal Intent Search",     sub: "Type a dish, get a cart",           pain: "Instagram recipe inspiration requires 6+ separate searches to buy all ingredients.", sol: "User types meal name → AI parses intent → extracts ingredients → matches catalog → applies brand preferences." },
                        ].map((f, i) => (
                            <div key={i} style={{ ...sCard, display: "flex", flexDirection: "column", gap: 10 }}>
                                <span style={{ padding: "5px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.72rem", fontWeight: 700, color: "#1a1a1a", alignSelf: "flex-start" }}>{f.tag}</span>
                                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{f.t}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>{f.sub}</div>
                                <div style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}><strong style={{ color: "var(--text-primary)" }}>Pain:</strong> {f.pain}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}><strong style={{ color: "var(--text-primary)" }}>Solution:</strong> {f.sol}</div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── 09 — COMPETITIVE AUDIT ───────────────────────────────── */}
                <Section>
                    <SectionHeader num="09" label="Competitive Audit" />
                    <div style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                                <thead>
                                    <tr style={{ background: "rgba(0,0,0,0.03)" }}>
                                        {["Feature", "Blinkit", "Zepto", "Instamart", "Gap"].map((h, i) => (
                                            <th key={i} style={{ textAlign: "left", padding: "14px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Semantic / NL Search",  "⚡ Partial", "✓ Fast",        "✓ Swiggy Sense (2024)", "⚠ Instamart ahead"],
                                        ["Image / List Scan",     "✗ None",    "✗ None",         "✗ None",                "✓ First-mover gap"],
                                        ["Conversational Voice",  "✗ None",    "✗ None",         "✓ MCP (Jan 2026)",      "⚠ External only"],
                                        ["Pantry Intelligence",   "⚡ Partial", "⚡ Partial",     "⚡ Partial",            "✓ Predictive gap"],
                                        ["Post-Order Edit",       "✗ Cancel",  "✗ None",         "✗ None",                "✓ Category gap"],
                                        ["Brand Personalization", "⚡ Partial", "✗ None",         "✗ None",                "✓ First wins loyalty"],
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                                            <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", textAlign: "left" }}>{row[0]}</th>
                                            {row.slice(1).map((cell, j) => (
                                                <td key={j} style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Section>

                {/* ── 10 — ARCHITECTURE ────────────────────────────────────── */}
                <Section>
                    <SectionHeader num="10" label="Architecture — One Pipeline, Three Entry Points" />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                        {[
                            { n: "1", t: "Input Layer",        d: "Camera · Voice · Text — 3 modalities, 1 entry UX." },
                            { n: "2", t: "NLP / NLU Engine",   d: "Gemini Vision + Whisper + semantic parser." },
                            { n: "3", t: "Intent Resolution",  d: "Meal → ingredients · List → SKUs · Voice → query." },
                            { n: "4", t: "Personalization",    d: "Brand-preference scoring · Purchase history." },
                            { n: "5", t: "Cart Builder",       d: "Ranked results · Attribution tags · One-tap confirm." },
                        ].map((s, i) => (
                            <div key={i} style={sSubtle}>
                                <div style={{ width: 26, height: 26, borderRadius: "50%", background: ACCENT, color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.82rem", marginBottom: 8 }}>{s.n}</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{s.t}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{s.d}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ ...sSubtle, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Engineering Note</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                            One shared pipeline means F1, F2, and F5 share the same NLU backend. <strong>−40% engineering effort</strong> vs building 3 separate features.
                        </div>
                    </div>
                </Section>

                {/* ── 11 — RESULTS & IMPACT ────────────────────────────────── */}
                <Section>
                    <SectionHeader num="11" label="Results & Impact" />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={sSubtle}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Before</div>
                            <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li>Open app → cold home screen, no personalisation</li>
                                <li>Search keyword → wrong / irrelevant results</li>
                                <li>Open multiple PDPs → brand comparison paralysis</li>
                                <li>Add items one by one — 9 taps for 9 items</li>
                                <li>Forgot something → cancel entire order</li>
                            </ol>
                        </div>
                        <div style={{ ...sCard, borderLeft: `3px solid ${ACCENT}` }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>After</div>
                            <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                <li>Open app → warm home with predicted reorder strip</li>
                                <li>Scan list / speak intent / type meal → AI pipeline</li>
                                <li>Brand auto-selected from history → no PDP needed</li>
                                <li>"Add All" — 1 tap for the entire list</li>
                                <li>2-minute edit window — add forgotten items instantly</li>
                            </ol>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                        {[
                            { metric: "Cart-build time", before: "4m 12s", after: "1m 45s" },
                            { metric: "Avg order value", before: "—",      after: "+₹290" },
                            { metric: "Drop-off rate",   before: "41%",    after: "<13%" },
                            { metric: "Brand decision",  before: "3.8 PDPs", after: "1 glance" },
                            { metric: "Reorder gap",     before: "—",      after: "−34%" },
                        ].map((m, i) => (
                            <div key={i} style={sSubtle}>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{m.metric}</div>
                                <div style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.3)", marginTop: 2 }}>{m.before} →</div>
                                <div style={{ ...bigNum, fontSize: "1.5rem", marginTop: 4 }}>{m.after}</div>
                            </div>
                        ))}
                    </div>

                    {/* Metric honesty */}
                    <div style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.3)", borderLeft: `3px solid ${ACCENT}`, borderRadius: 16, padding: "20px 24px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Metric Honesty — Validated vs Projected</div>
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
                                    <li>&lt;13% abandon rate — analogous benchmarks from similar AI launches</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ── 12 — ROADMAP & WHAT I LEARNED ───────────────────────── */}
                <Section>
                    <SectionHeader num="12" label="Roadmap & What I Learned" />

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            { phase: "Phase 1", time: "0–3 months", t: "F1 Scan & Build Cart + F2 Voice Quick Order", d: "Highest ROI, shared pipeline, immediate user impact." },
                            { phase: "Phase 2", time: "3–6 months", t: "F3 Pantry Intelligence + F4 2-Minute Edit Window", d: "Requires back-end coordination with dark-store ops." },
                            { phase: "Phase 3", time: "6–12 months", t: "F5 Meal Intent Search + full personalization layer", d: "Catalog partnership, cuisine model training." },
                        ].map((p, i) => (
                            <div key={i} style={{ ...sCard, display: "flex", flexDirection: "column", gap: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ padding: "4px 10px", borderRadius: 100, background: ACCENT, fontSize: "0.72rem", fontWeight: 700, color: "#1a1a1a" }}>{p.phase}</span>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.time}</span>
                                </div>
                                <div style={{ fontSize: "0.97rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{p.t}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.d}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ ...sCard, padding: "32px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 20 }}>What I Learned</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            {[
                                { bold: "Research inversion:", body: "I expected delivery speed to be the pain. It was the ordering, not the delivery — that finding reframed the entire solution space." },
                                { bold: "Rejection is the design:", body: "The 4 rejected directions are as important as the final solution. They show the design pressure the right answer had to survive." },
                                { bold: "Trust is the hardest feature:", body: "Every AI feature needed a 'show your work' layer — chips, transcripts, attribution — before users felt safe to trust it." },
                            ].map((l, i) => (
                                <p key={i} style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                                    <strong style={{ color: "var(--text-primary)" }}>{l.bold}</strong> {l.body}
                                </p>
                            ))}
                        </div>
                    </div>
                </Section>

            </div>
        </div>
    );
}
