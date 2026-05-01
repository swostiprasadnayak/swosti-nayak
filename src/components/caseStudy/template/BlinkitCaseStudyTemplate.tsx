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

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ num, label }: { num: string; label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 20, borderBottom: `2px solid ${ACCENT}`, marginBottom: 32 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, background: "rgba(245,197,24,0.12)", padding: "4px 10px", borderRadius: 100, flexShrink: 0 }}>{num}</span>
            <span style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{label}</span>
        </div>
    );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ children }: { children: React.ReactNode }) {
    return <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>{children}</div>;
}

// ── Feature bullet list item ───────────────────────────────────────────────
function FeaturePoint({ icon, bold, text }: { icon: string; bold: string; text: string }) {
    return (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", background: "var(--bg-secondary)", borderRadius: 12, border: "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                <strong style={{ color: "var(--text-primary)" }}>{bold}</strong> {text}
            </span>
        </div>
    );
}

// ── Image placeholder ──────────────────────────────────────────────────────
function ImgPlaceholder({ label, height = 200 }: { label: string; height?: number }) {
    return (
        <div style={{ width: "100%", height, borderRadius: 12, border: "1.5px dashed rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.02)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "0.82rem", fontStyle: "italic" }}>
            {label}
        </div>
    );
}

// ── Live prototypes — both side by side ────────────────────────────────────
function BlinkitPrototypes() {
    const PROTO_W = 390, PROTO_H = 844, SCALE = 0.65;
    const frameW = Math.round(PROTO_W * SCALE);
    const frameH = Math.round(PROTO_H * SCALE);
    const prototypes = [
        { label: "F1 — Scan & Build Cart", href: "/prototypes/blinkit-scanner.html", description: "Camera, image upload, or paste text. AI builds cart with preferred brands in one tap." },
        { label: "F2 — Voice Quick Order", href: "/prototypes/blinkit-voice.html", description: "Speak in Hindi, English, or code-switched. Hands-free ordering while cooking." },
    ];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {prototypes.map((proto, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                        <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 3px 0" }}>{proto.label}</h4>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>{proto.description}</p>
                    </div>
                    <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-subtle)", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", width: frameW, height: frameH, flexShrink: 0 }}>
                        <iframe
                            src={proto.href}
                            title={proto.label}
                            style={{ width: PROTO_W, height: PROTO_H, border: "none", display: "block", transform: `scale(${SCALE})`, transformOrigin: "top left", pointerEvents: "auto" }}
                            loading="lazy"
                        />
                    </div>
                    <a href={proto.href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                        Open full screen <ExternalLink size={11} />
                    </a>
                </div>
            ))}
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

                {/* Meta row */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: -40 }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Swosti Nayak · Product Designer · 2025</span>
                    <span style={{ color: "var(--border-strong)" }}>·</span>
                    {["Quick Commerce", "AI/ML", "Product Design", "Mobile UX"].map((t, i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: 100, border: "1px dashed var(--border-strong)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>{t}</span>
                    ))}
                </div>

                {/* ── HERO IMAGE ────────────────────────────────────────────── */}
                <div style={{ width: "100%", aspectRatio: "16 / 10", background: "linear-gradient(135deg, rgba(245,197,24,0.08) 0%, rgba(0,0,0,0.02) 100%)", border: "1px solid var(--border-subtle)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "0.9rem", fontStyle: "italic", overflow: "hidden" }}>
                    Hero image or key visual will go here
                </div>

                {/* ══════════════════════════════════════════════════════════
                    01 — CONTEXT & PROBLEM
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="01" label="Context & Problem" />

                    <div>
                        <h3 style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", margin: "0 0 12px 0" }}>
                            The brand contradiction<br />hiding in plain sight
                        </h3>
                        <p style={{ ...bodyText, maxWidth: 640, margin: 0 }}>
                            Blinkit has solved the hardest part of grocery delivery — getting items to your door in under 10 minutes. But the experience of building that order? It&apos;s a 4-minute, 20-tap gauntlet that betrays the very promise Blinkit is built on.
                        </p>
                    </div>

                    {/* 4 problem cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ ...sCard, borderColor: ACCENT, background: "rgba(245,197,24,0.04)" }}>
                            <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>⚡</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>What Blinkit promises</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>India&apos;s fastest grocery delivery. Order arrives before you&apos;ve even finished thinking about dinner. The &quot;10-minute&quot; brand is one of the strongest positioning stories in Indian consumer tech.</div>
                            <div style={{ ...bigNum, marginTop: 14 }}>10 min</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivery time · The brand promise</div>
                        </div>
                        <div style={{ ...sCard, borderColor: "#FFCDD2", background: "#FFF5F5" }}>
                            <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>😩</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>What users actually experience</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>Before a single item leaves the dark store, users spend over 4 minutes translating their mental shopping list into keyword searches — one item, one search, one brand decision at a time.</div>
                            <div style={{ ...bigNum, marginTop: 14 }}>4:12</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Average cart-building time · The hidden friction</div>
                        </div>
                        <div style={sCard}>
                            <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>📝</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>The physical list problem</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>72% of Indian grocery shoppers have a handwritten list, WhatsApp note, or screenshot open while ordering. The app offers zero support for this universal behavior — every item gets manually typed.</div>
                            <div style={{ ...bigNum, marginTop: 14 }}>72%</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Users with external list while ordering</div>
                        </div>
                        <div style={sCard}>
                            <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>🏷️</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>The brand decision paralysis</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>For staple categories like atta, dal, and oil — Blinkit shows 40+ SKUs with zero personalized guidance. Users open product detail pages 3.8x before making a single add-to-cart decision.</div>
                            <div style={{ ...bigNum, marginTop: 14 }}>3.8x</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Product page opens per staple item</div>
                        </div>
                    </div>

                    {/* User quote strip */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "32px 36px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                        {[
                            { q: "I never think 'I need Tata Tea Gold 500g.' I think I need to make chai for 4 people. The app has no idea what I mean.", attr: "Priya, 32 · Mumbai · Research participant" },
                            { q: "My grocery list is on paper right here. The app has no idea it exists. I end up typing every single item.", attr: "Suresh, 45 · Jodhpur · Research participant" },
                            { q: "Delivery is fast, but ordering itself takes forever. That contradiction bugs me every single time.", attr: "Arjun, 27 · Bangalore · Research participant" },
                        ].map((item, i) => (
                            <div key={i}>
                                <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, fontStyle: "italic", margin: "0 0 10px 0" }}>&quot;{item.q}&quot;</p>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.attr}</div>
                            </div>
                        ))}
                    </div>

                    {/* Pain across 8 behavior clusters */}
                    <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 14px 0" }}>Pain across 8 behavior clusters</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                            {[
                                { lbl: "Cluster A", title: "Planning & List Management", count: "8 use cases", items: ["Zero support for physical/WhatsApp lists", "No recipe-to-cart or paste-anything input", "Blank slate every single session", "No pantry / running-low tracker"] },
                                { lbl: "Cluster B", title: "Memory & Forgetfulness", count: "7 use cases", items: ["2-3 orders per day due to forgetting", "No pre-checkout 'did you forget?' nudge", "Cart abandoned mid-session (not by intent)", "No persistent 'add to next order' button"] },
                                { lbl: "Cluster C", title: "Brand & Product Preferences", count: "6 use cases", items: ["App ignores brand loyalty entirely", "Silent OOS substitutions = #1 trust-break", "Size variant confusion (100g vs 500g)", "No brand blacklist option"] },
                                { lbl: "Clusters D-H", title: "Health, Social, Financial & Context", count: "33 use cases", items: ["No dietary filter that actually works", "Cart total surprise at checkout", "Mid-cook emergency orders take 7+ steps", "Festival/occasion orders are chaos"] },
                            ].map((c, i) => (
                                <div key={i} style={{ background: "rgba(0,0,0,0.025)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: "18px" }}>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.35)", marginBottom: 5 }}>{c.lbl}</div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
                                    <span style={{ display: "inline-block", background: ACCENT, color: "#1a1a1a", fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px", borderRadius: 100, marginBottom: 10 }}>{c.count}</span>
                                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                                        {c.items.map((item, j) => (
                                            <li key={j} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.4, display: "flex", gap: 6, alignItems: "flex-start" }}>
                                                <span style={{ color: ACCENT, fontWeight: 900, flexShrink: 0 }}>·</span>{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    02 — RESEARCH & INSIGHTS
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="02" label="Research & Insights" />

                    <p style={{ ...bodyText, maxWidth: 700 }}>
                        6 weeks · 24 interviews · Mumbai, Bangalore, Jodhpur · Screened for last-30-day use of Blinkit/Zepto/Instamart.
                        {" "}<strong style={{ color: "var(--text-primary)" }}>My role:</strong> End-to-end product design (0 → prototype), AI/UX interaction design, competitive & systems analysis.
                    </p>

                    {/* Personas */}
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "4px 0 -4px 0" }}>User Personas</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            {
                                emoji: "👩‍💼", name: "Priya, 32", role: "Primary · Working Professional · Mumbai",
                                headBg: ACCENT, headColor: "#1a1a1a",
                                goals: ["Restock essentials fast, without brand decision paralysis", "Order from recipe inspiration without 6 separate searches", "Never forget items (places 2-3 orders/day due to forgetfulness)"],
                                pains: ["Has to type each item individually — 'feels like 1999'", "Keeps a handwritten list the app can't read", "Brand selection fatigue for every staple category"],
                                quote: "I just want to say 'stuff for pasta' and have it figure it out."
                            },
                            {
                                emoji: "👨‍💻", name: "Rajan, 27", role: "Secondary · Tech Professional · Bangalore",
                                headBg: "#E0F2FE", headColor: "#1a1a1a",
                                goals: ["Voice-first ordering — hands often occupied while cooking", "Recipe-to-cart from Instagram/YouTube inspiration", "Maximum speed, minimal taps for late-night emergency orders"],
                                pains: ["Mid-cook emergencies require 7+ steps in the current app", "No way to paste a recipe URL and get all ingredients", "Opens app 4-5 times to complete one grocery cycle"],
                                quote: "I want to place an order without looking at my phone."
                            },
                            {
                                emoji: "👩‍🦳", name: "Sunita, 62", role: "Edge Case · Homemaker · Jodhpur",
                                headBg: "#F3E8FF", headColor: "#1a1a1a",
                                goals: ["Order weekly staples without tech anxiety", "Use her physical notebook — not learn app navigation", "Trust the app to remember her brand preferences"],
                                pains: ["Often asks family to place orders for her", "Small fonts, confusing results for simple searches", "No voice input in her preferred language (Hindi)"],
                                quote: "I have the list right here. Why can't I just show it to the phone?"
                            },
                        ].map((p, i) => (
                            <div key={i} style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                                <div style={{ padding: "20px 20px 16px", background: p.headBg }}>
                                    <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: p.headColor, marginTop: 8 }}>{p.name}</div>
                                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(26,26,26,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.role}</div>
                                </div>
                                <div style={{ padding: "16px 20px 20px" }}>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 6 }}>Goals</div>
                                    <ul style={{ margin: "0 0 12px 0", paddingLeft: 16, color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                                        {p.goals.map((g, j) => <li key={j}>{g}</li>)}
                                    </ul>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 6 }}>Frustrations</div>
                                    <ul style={{ margin: "0 0 12px 0", paddingLeft: 16, color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                                        {p.pains.map((g, j) => <li key={j}>{g}</li>)}
                                    </ul>
                                    <div style={{ background: "rgba(245,197,24,0.1)", padding: "10px 12px", borderRadius: 8, fontSize: "0.83rem", fontStyle: "italic", color: "var(--text-primary)", borderLeft: `2px solid ${ACCENT}` }}>
                                        &quot;{p.quote}&quot;
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 4 key findings */}
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "4px 0 -4px 0" }}>4 Key Research Findings</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            { n: "01", title: "Mental models never match SKU taxonomy", body: "Not a single participant described their grocery need as a SKU keyword. They said 'chai ingredients,' 'party snacks,' 'baby food stuff' — intent-driven language that Blinkit's keyword search completely fails to process.", stat: "41%", statLbl: "Search sessions end without a single add-to-cart" },
                            { n: "02", title: "The physical list is a universal behavior", body: "72% of participants had a handwritten list, WhatsApp note, or screenshot open while ordering — across all age groups, cities, and tech comfort levels. The app offers zero support for this behavior. Entirely manual friction.", stat: "72%", statLbl: "Users with an external list open while ordering" },
                            { n: "03", title: "Brand selection is the #1 stall point", body: "For staple categories (atta, dal, oil, butter), users open PDPs 3.8x before adding to cart. The app provides zero personalized guidance — identical results to a first-time user and a user who has ordered 100 times.", stat: "3.8x", statLbl: "PDP opens per staple item before add-to-cart" },
                            { n: "04", title: "Speed expectation vs pre-order reality", body: "Blinkit's brand promise is 10-minute delivery. But avg cart-building time is 4m 12s. Each session is a cold start — no memory, no learning, no context. High-frequency users (2-3 orders/day) feel this every single time.", stat: "4:12", statLbl: "Average cart-building time vs 10-min delivery" },
                        ].map((f, i) => (
                            <div key={i} style={sSubtle}>
                                <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(0,0,0,0.06)", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: -8 }}>{f.n}</div>
                                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{f.title}</div>
                                <div style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.body}</div>
                                <div style={{ marginTop: 16, padding: "12px 16px", background: "#1a1a1a", borderRadius: 10, display: "inline-block" }}>
                                    <div style={{ fontSize: "1.6rem", fontWeight: 900, color: ACCENT, letterSpacing: "-0.04em", lineHeight: 1 }}>{f.stat}</div>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{f.statLbl}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    03 — OPPORTUNITY SPACE
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="03" label="Opportunity Space" />

                    {/* Surprising finding */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "28px 32px" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>The Surprising Finding</div>
                        <p style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.65, color: "#fff", margin: 0 }}>
                            I expected the primary pain to be delivery time. It wasn&apos;t. Every participant was satisfied with 10-minute delivery. The frustration was entirely pre-order — the gap between having a list and getting it into the cart.{" "}
                            <span style={{ color: ACCENT }}>The delivery problem was solved. The ordering problem wasn&apos;t.</span>
                        </p>
                    </div>

                    {/* HMW */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "44px 48px", textAlign: "center" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: ACCENT, marginBottom: 18 }}>How Might We</div>
                        <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 700, color: "#fff", lineHeight: 1.35, letterSpacing: "-0.03em", margin: "0 auto", maxWidth: 680 }}>
                            How might we make Blinkit&apos;s pre-order experience as fast as its delivery — so that building a full grocery cart feels as effortless and instant as the 10-minute promise?
                        </p>
                    </div>

                    {/* Opportunity cards: F1 + F2 */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            {
                                lbl: "Primary Feature · Highest ROI", icon: "📷", title: "Scan & Build Cart",
                                body: "Camera reads physical grocery lists (handwriting, screenshots, WhatsApp notes, recipe images). AI maps every detected item to the Blinkit catalogue instantly, pre-selects brand preferences, and presents a fully editable cart — not a search results page.",
                                metrics: [{ n: "40s", l: "Saved per order" }, { n: "9→1", l: "Taps for 9 items" }, { n: "72%", l: "Users benefit immediately" }],
                                bg: "#FFFBF0", border: "#E8D170"
                            },
                            {
                                lbl: "Primary Feature · New Modality", icon: "🎙️", title: "Voice Quick Order",
                                body: "Fully conversational, touchless ordering. User speaks their order in Hindi, English, or code-switched — AI builds the cart, confirms with the user via chat or voice, and places the order. Designed specifically for mid-cook, hands-busy scenarios.",
                                metrics: [{ n: "1 tap", l: "To start ordering" }, { n: "Hi+En", l: "Language support" }, { n: "Touchless", l: "Full flow possible" }],
                                bg: "#F0FAFB", border: "#B0DDE4"
                            },
                        ].map((opp, i) => (
                            <div key={i} style={{ ...sCard, background: opp.bg, borderColor: opp.border }}>
                                <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.4)", marginBottom: 8 }}>{opp.lbl}</div>
                                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{opp.icon}</div>
                                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 8 }}>{opp.title}</div>
                                <div style={{ fontSize: "0.87rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.65, marginBottom: 16 }}>{opp.body}</div>
                                <div style={{ display: "flex", gap: 20, paddingTop: 16, borderTop: "1.5px solid rgba(0,0,0,0.08)" }}>
                                    {opp.metrics.map((m, j) => (
                                        <div key={j}>
                                            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>{m.n}</div>
                                            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.l}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Rejected directions */}
                    <div style={{ ...sSubtle, padding: "24px 28px" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 16 }}>Rejected Directions — Ideas that didn&apos;t survive user testing</div>
                        <div className={classes.ideasGrid}>
                            {[
                                { bg: "#fef3c7", t: "Dedicated 'Import List' Screen", d: "4/6 participants couldn't find it. Users don't think of ordering as list management." },
                                { bg: "#dbeafe", t: "Voice FAB as Floating Button", d: "4/6 thought it was customer support. Moved inside search bar — association was immediate." },
                                { bg: "#dcfce7", t: "Image Upload as Separate Entry", d: "Splitting 3 flows = 3 chances to abandon. One tabbed screen fixed it." },
                                { bg: "#fce7f3", t: "Full-Screen Spinner Modal", d: "Users couldn't tell if the AI understood them. Progressive chip reveal gave control." },
                            ].map((s, i) => (
                                <div key={i} className={classes.ideaSticky} style={{ background: s.bg }}>
                                    <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>❌ {s.t}</div>
                                    <div style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.45 }}>{s.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    04 — PRIMARY FEATURES
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="04" label="Primary Features" />
                    <p style={{ ...bodyText, maxWidth: 700 }}>
                        F1 and F2 address the two biggest friction points — manual list transcription and intent-to-keyword translation — by replacing both with AI-native input methods that match how users actually think.
                    </p>

                    {/* F1 */}
                    <div style={{ ...sCard, padding: "28px 32px" }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
                            <span style={{ padding: "5px 12px", borderRadius: 100, background: ACCENT, fontSize: "0.75rem", fontWeight: 700, color: "#1a1a1a" }}>F1 · Highest ROI</span>
                            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>72% of users benefit immediately · No new behaviour required</span>
                        </div>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", margin: "0 0 10px 0" }}>Scan & Build Cart</h3>
                        <p style={{ ...bodyText, maxWidth: 600, margin: "0 0 20px 0" }}>
                            The physical grocery list is a universal artifact — 72% of Indian shoppers use one. Yet Blinkit ignores it entirely. Scan & Build Cart turns any external list (paper, screenshot, WhatsApp, recipe image, or pasted URL) into a personalized, ready-to-checkout cart.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                            <FeaturePoint icon="📷" bold="Multi-modal input:" text="Camera scan, image upload, URL paste, or free-text — all processed by the same AI pipeline." />
                            <FeaturePoint icon="🇮🇳" bold="Multilingual OCR:" text="Reads Devanagari Hindi + English Roman script. Handles handwriting, printed text, and screenshots." />
                            <FeaturePoint icon="⭐" bold="Brand intelligence:" text={'Pre-selects user\'s historically purchased brand for each item. "Your usual" is the default — not Blinkit\'s sponsored product.'} />
                            <FeaturePoint icon="✏️" bold="Full user control:" text="Every detected item is editable, removable, or replaceable. User confirms what AI built — AI doesn't decide." />
                            <FeaturePoint icon="🛒" bold='"Add All" in one tap:' text="Replaces 9 individual add-to-cart actions with a single bulk confirmation — the core conversion moment." />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 1</div>
                                <div style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>3 tabs, not 3 separate flows</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Camera, upload, and paste-text unified under one screen. Detected items appear as dismissible chips — visible AI progress, not a black-box spinner.</div>
                            </div>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 2</div>
                                <div style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>&quot;From list&quot; attribution on every card</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Every product shows the exact text from the user&apos;s list that triggered the AI match. Trust through transparency.</div>
                            </div>
                        </div>
                    </div>

                    {/* F2 */}
                    <div style={{ ...sCard, padding: "28px 32px" }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
                            <span style={{ padding: "5px 12px", borderRadius: 100, background: ACCENT, fontSize: "0.75rem", fontWeight: 700, color: "#1a1a1a" }}>F2 · New Modality</span>
                            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Mid-cook · Hands-busy · Emergency ordering</span>
                        </div>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", margin: "0 0 10px 0" }}>Voice Quick Order</h3>
                        <p style={{ ...bodyText, maxWidth: 600, margin: "0 0 20px 0" }}>
                            One tap to start. Speak in Hindi, English, or code-switched (&quot;Milk aur eggs de do&quot;). AI builds the cart, shows it in a chat thread, and lets users confirm or edit by voice or tap. Fully touchless end-to-end.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                            <FeaturePoint icon="🎙️" bold="Conversational ordering:" text={'Speak naturally in Hindi, English, or code-switched. "Dahi aur bread le aao" is a valid order — no reformatting needed.'} />
                            <FeaturePoint icon="📝" bold="Real-time transcript:" text="Transcript appears character-by-character. Yellow waveform runs simultaneously — proof of active listening, not silent black-box recording." />
                            <FeaturePoint icon="💬" bold="Cart card inside the thread:" text="The AI's response is an inline cart card. Users say 'change brand' as a natural continuation — context is never broken." />
                            <FeaturePoint icon="✅" bold="Fully touchless:" text="Confirm, edit, or cancel entirely by voice. No screen needed from order intent to checkout confirmation." />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 1</div>
                                <div style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Real-time transcript, not a spinner</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>Yellow waveform + live character-by-character transcript = proof the AI is listening. Users feel in control even before the cart appears.</div>
                            </div>
                            <div style={sSubtle}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>Design Logic 2</div>
                                <div style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>Cart card inside the chat thread</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>The AI&apos;s response is an inline cart card, not a modal or new screen. Users say &quot;change brand&quot; as a natural continuation. Context is never broken.</div>
                            </div>
                        </div>
                        {/* User testing quotes */}
                        <div style={sSubtle}>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 14 }}>Tested with 12+ design students · 20+ sessions</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {["I just showed the app my list and it built the cart. Felt like magic.", "The voice order while cooking was a game-changer — no screen needed.", "Finally, it remembered I always buy Aashirvaad atta. Saved me 3 taps."].map((m, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>S{i + 1}</div>
                                        <div style={{ background: "var(--bg-card)", padding: "8px 12px", borderRadius: "4px 12px 12px 12px", fontSize: "0.87rem", color: "var(--text-primary)", lineHeight: 1.45, border: "1px solid var(--border-subtle)" }}>{m}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Both prototypes side by side */}
                    <BlinkitPrototypes />
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    05 — SECONDARY FEATURES
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="05" label="Secondary Features" />
                    <p style={{ ...bodyText, maxWidth: 700 }}>F1 and F2 solve the pre-order experience. These three secondary features address what happens after the order — pantry intelligence, post-order editing, and meal-based discovery.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            {
                                tag: "F3 · Secondary Feature", title: "Pantry Intelligence", sub: "Post-order pantry setup -> 'Time to Reorder?' home strip", headBg: "#E8F5E9",
                                pain: "Users place 2-3 orders/day due to forgetting items. No predictive restocking. App has 6 months of order data and uses none of it proactively.",
                                solution: "After order confirmation, user sets consumption duration per item (1 week / 2 weeks / 1 month). App predicts runout dates and surfaces 'Time to Reorder?' strip on home screen before items run out.",
                                imgLabel: "F3 — Pantry setup & 'Time to Reorder?' home strip"
                            },
                            {
                                tag: "F4 · Secondary Feature", title: "2-Minute Edit Window", sub: "Catch the 'I forgot' moment before the picker starts", headBg: "#FFF3E0",
                                pain: "After placing an order, users realise they forgot items. The only option is cancelling everything — a hard decision for a Rs300 order with 8-minute delivery.",
                                solution: "2-minute countdown after confirmation. AI suggests forgotten items as quick-add chips. Add or remove before the picker starts. Window closes when picker status changes to 'started'.",
                                imgLabel: "F4 — Post-order edit window with AI suggestions"
                            },
                            {
                                tag: "F5 · Secondary Feature", title: "Meal Intent Search", sub: "Type a dish, get a full ingredient cart in one action", headBg: "#E3F2FD",
                                pain: "Instagram recipe inspiration requires 6+ separate searches to buy all ingredients. Mental model is 'pasta tonight' — not 'penne pasta 500g + tomato sauce + parmesan'.",
                                solution: "User types meal name -> AI parses intent -> extracts ingredients -> matches catalog -> applies brand preferences. From intent to full cart in one action.",
                                imgLabel: "F5 — Meal search & ingredient cart build"
                            },
                        ].map((f, i) => (
                            <div key={i} style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                                <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border-subtle)", background: f.headBg }}>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.45)", marginBottom: 5 }}>{f.tag}</div>
                                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 4 }}>{f.title}</div>
                                    <div style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{f.sub}</div>
                                </div>
                                <div style={{ padding: "18px 22px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
                                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px", background: "#FEE2E2", borderRadius: 10 }}>
                                        <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>⚠️</span>
                                        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#B71C1C", lineHeight: 1.4 }}>{f.pain}</div>
                                    </div>
                                    <div style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.78rem" }}>↓ AI solves this by</div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px", background: "#DCFCE7", borderRadius: 10 }}>
                                        <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>✅</span>
                                        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#16A34A", lineHeight: 1.4 }}>{f.solution}</div>
                                    </div>
                                    {/* Image placeholder */}
                                    <ImgPlaceholder label={f.imgLabel} height={160} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    06 — TECHNICAL ARCHITECTURE
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="06" label="Technical Architecture" />

                    <div>
                        <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", margin: "0 0 10px 0" }}>
                            One pipeline.<br />Three entry points.
                        </h3>
                        <p style={{ ...bodyText, maxWidth: 680 }}>All five features connect to a single shared AI backend. Scan, voice, and meal intent all run through identical layers. Build once, serve three surfaces — this is the core engineering argument for ~40% cost reduction.</p>
                    </div>

                    {/* 5-step pipeline flow */}
                    <div style={{ display: "flex", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 16, overflow: "hidden" }}>
                        {[
                            { lbl: "Input", icon: "📥", title: "Dual Input", body: "Camera frame, voice audio, or text query. All normalised to text before pipeline entry via OCR or STT." },
                            { lbl: "Extraction", icon: "🔬", title: "NER + OCR / STT", body: "Named Entity Recognition extracts food entities. Google Vision API handles Hindi + English handwriting OCR. Google Cloud STT for voice." },
                            { lbl: "Mapping", icon: "🗺️", title: "SKU Taxonomy", body: "Entity -> category -> product via food knowledge graph. 50k+ SKUs narrowed to ~5-15 candidates per extracted entity." },
                            { lbl: "Ranking", icon: "🏆", title: "Brand Ranker", body: "LightGBM model scores candidates by: (1) purchase frequency x recency, (2) current dark store inventory, (3) price band match, (4) local popularity." },
                            { lbl: "Output", icon: "🛒", title: "Bulk Cart", body: "Ranked SKUs + alternatives packaged as cart payload. Single Bulk Cart API call adds all items in one transaction." },
                        ].map((step, i, arr) => (
                            <div key={i} style={{ flex: 1, padding: "24px 18px", borderRight: i < arr.length - 1 ? "1.5px solid rgba(0,0,0,0.07)" : "none", position: "relative" }}>
                                {i < arr.length - 1 && (
                                    <div style={{ position: "absolute", top: "50%", right: -12, transform: "translateY(-50%)", width: 24, height: 24, background: "#1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT, fontSize: "0.65rem", fontWeight: 900, zIndex: 2 }}>→</div>
                                )}
                                <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>{step.lbl}</div>
                                <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{step.icon}</div>
                                <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 5 }}>{step.title}</div>
                                <div style={{ fontSize: "0.77rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{step.body}</div>
                            </div>
                        ))}
                    </div>

                    {/* Shared backend callout */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "32px 36px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>One AI backend powers everything</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>The strategic insight that reduces engineering cost by ~40%</div>
                                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>Whether a user scans a paper list, speaks a voice order, or types a meal name — the same shared intelligence layer processes all three. Three input methods, one backend, coherent UX that compounds over time.</p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {[
                                    { type: "Layer 1", title: "NER + Intent Model", body: "Extracts food entities from text, speech, or scanned image uniformly" },
                                    { type: "Layer 2", title: "SKU Taxonomy", body: "Knowledge graph mapping entities -> 50k+ catalogue products" },
                                    { type: "Layer 3", title: "Brand Ranker", body: "LightGBM model on purchase history, inventory & price preference" },
                                    { type: "Layer 4", title: "Bulk Cart API", body: "Single-transaction endpoint — 9 items, 1 API call" },
                                ].map((l, i) => (
                                    <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
                                        <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>{l.type}</div>
                                        <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{l.title}</div>
                                        <div style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{l.body}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    07 — IMPACT & COMPARISON
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="07" label="Impact & Comparison" />

                    {/* Metrics row */}
                    <div style={{ display: "flex", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 16, overflow: "hidden" }}>
                        {[
                            { metric: "Cart-build time", before: "4m 12s", after: "1m 45s", hi: false },
                            { metric: "Avg order value",  before: null,      after: "+Rs 290", hi: true  },
                            { metric: "Search drop-off",  before: "41%",     after: "<13%",    hi: false },
                            { metric: "Brand decision",   before: "3.8x PDPs", after: "1 glance", hi: false },
                            { metric: "Reorder gap",      before: "6.2 days", after: "4.1 days", hi: false },
                        ].map((m, i) => (
                            <div key={i} style={{ flex: 1, padding: "22px 14px", borderRight: i < 4 ? "1.5px solid rgba(0,0,0,0.07)" : "none", textAlign: "center", background: m.hi ? "#1a1a1a" : "transparent" }}>
                                {m.before && <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "#EF4444", textDecoration: "line-through", marginBottom: 4 }}>{m.before}</div>}
                                <div style={{ fontSize: "1.55rem", fontWeight: 900, color: m.hi ? ACCENT : "var(--text-primary)", letterSpacing: "-0.04em" }}>{m.after}</div>
                                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: m.hi ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 5 }}>{m.metric}</div>
                            </div>
                        ))}
                    </div>

                    {/* Before / After journey */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {/* Before */}
                        <div style={{ border: "1.5px solid #FFCDD2", borderRadius: 16, overflow: "hidden" }}>
                            <div style={{ padding: "14px 20px", background: "#FFEBEE", display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: "1.2rem" }}>❌</span>
                                <div>
                                    <div style={{ fontSize: "0.93rem", fontWeight: 800, color: "#1a1a1a" }}>AS-IS · Current experience</div>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#C62828" }}>4m 12s · 41% abandon · 0 learning</div>
                                </div>
                            </div>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                                {[
                                    { title: "Cold app open", desc: "Generic promo homepage. No memory of last session or preferences.", badge: "Pain" },
                                    { title: "Keyword after keyword", desc: '"Pasta" fails. Try "penne." Then "tomato sauce." 6 searches for 1 meal.', badge: "Major friction" },
                                    { title: "40+ results, no ranking", desc: "Same results for first-time and 100th-time user. 2.3 PDP opens per item.", badge: "Friction" },
                                    { title: "Brand paralysis", desc: "30 types of atta. 3.8 product page opens. Highest drop-off point (28% abandon).", badge: "Highest pain" },
                                    { title: "Manual cart, item by item", desc: "Physical list transcribed by hand. 9 items = 9 individual add-to-cart actions.", badge: "Friction" },
                                ].map((step, i) => (
                                    <li key={i} style={{ padding: "12px 18px", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#FFCDD2", color: "#C62828", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                                        <div>
                                            <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{step.title}</div>
                                            <div style={{ fontSize: "0.77rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{step.desc}</div>
                                            <span style={{ display: "inline-block", marginTop: 4, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 4, background: "#FEE2E2", color: "#C62828" }}>{step.badge}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* After */}
                        <div style={{ border: "1.5px solid #C8E6C9", borderRadius: 16, overflow: "hidden" }}>
                            <div style={{ padding: "14px 20px", background: "#E8F5E9", display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: "1.2rem" }}>✅</span>
                                <div>
                                    <div style={{ fontSize: "0.93rem", fontWeight: 800, color: "#1a1a1a" }}>TO-BE · With AI layer</div>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#16A34A" }}>1m 45s · &lt;13% abandon · Learns every order</div>
                                </div>
                            </div>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                                {[
                                    { title: "Warm home screen", desc: "AI-predicted reorder strip. Top items from last order, ranked by purchase frequency.", badge: "Personalised" },
                                    { title: "Scan / speak / type intent", desc: "Camera reads paper list. Voice order while cooking. Type a meal name. Any modality.", badge: "AI-powered" },
                                    { title: "Brand pre-selected", desc: "Preferred brand auto-selected from history. No PDP needed for staple items.", badge: "Zero friction" },
                                    { title: '"Add All" — 1 tap', desc: "9 items, 1 action. Entire list added to cart in one confirmation.", badge: "Core win" },
                                    { title: "2-minute edit window", desc: "Forgot something? AI suggests it. Add or remove before the picker starts.", badge: "Recovery" },
                                ].map((step, i) => (
                                    <li key={i} style={{ padding: "12px 18px", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#C8E6C9", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                                        <div>
                                            <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{step.title}</div>
                                            <div style={{ fontSize: "0.77rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{step.desc}</div>
                                            <span style={{ display: "inline-block", marginTop: 4, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 4, background: "#DCFCE7", color: "#16A34A" }}>{step.badge}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Metric honesty */}
                    <div style={{ background: "rgba(245,197,24,0.07)", border: "1px solid rgba(245,197,24,0.3)", borderLeft: `3px solid ${ACCENT}`, borderRadius: 16, padding: "20px 24px" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Metric Honesty — Validated vs Projected</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>✓ Validated (usability testing + interviews)</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                                    <li>Cart-build time reduction (usability testing, n=6)</li>
                                    <li>Drop-off rate pattern (session data)</li>
                                    <li>Physical-list behaviour (24 interviews)</li>
                                </ul>
                            </div>
                            <div>
                                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>📊 Projected (analogous benchmarks)</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                                    <li>+Rs 290 AOV uplift</li>
                                    <li>-34% reorder gap</li>
                                    <li>&lt;13% abandon rate — from similar AI launch benchmarks</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    08 — BUSINESS VALIDATION & CONSTRAINTS
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="08" label="Business Validation & Constraints" />

                    <p style={{ ...bodyText, maxWidth: 700 }}>
                        Every feature needs to clear three bars: user need is real, business impact is positive, and technical constraints are solvable. Including an honest analysis of why Blinkit hasn&apos;t built some of these yet.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            {
                                icon: "📈", title: "Business case — Revenue impact",
                                body: "The primary driver is average order value. When users build carts via AI scan instead of manual search, they add 3.8x more items. Secondary driver: retention via pantry intelligence reduces reorder gap from 6.2 -> 4.1 days, increasing order frequency by ~34%.",
                                items: ["+Rs 290 avg order value uplift (scan vs manual)", "+38% session-to-checkout conversion rate", "-34% reorder gap via pantry intelligence", "71% AI default brand acceptance = faster checkout"]
                            },
                            {
                                icon: "👤", title: "User need validation",
                                body: "All five features map directly to documented pain points from 24 user interviews. The strongest signal: 72% of participants were already doing the 'scan' behavior manually. They had self-invented the workaround — the feature just replaces their manual step with AI.",
                                items: ["72% immediately benefit from F1 (existing list behavior)", "Mid-cook voice orders confirmed in session data", "Pantry tracker: validated by '2-3 orders/day' pattern", "Meal intent: confirmed by Instagram-to-Blinkit behavior"]
                            },
                            {
                                icon: "⚡", title: "Competitive advantage",
                                body: "Zepto and Instamart have neither NLP search nor list scanning as dedicated features. Voice ordering exists only as basic mic input — not conversational AI. The shared AI backend creates a compounding advantage: every interaction trains the Brand Ranker.",
                                items: ["No direct competitor has scan-to-cart today", "Shared backend = compounding personalization moat", "First-mover on Hindi+English voice ordering in q-commerce"]
                            },
                            {
                                icon: "🔬", title: "What to validate in user testing",
                                body: "These features are designed from research but not yet validated in production. Critical questions that A/B testing and usability studies need to answer before full rollout.",
                                items: ["Does OOS countdown (90s) create urgency or anxiety?", '"Your usual" — helpful or surveillance-y?', "Is the voice FAB discoverable without onboarding?", "Optimal brand alternatives to show: 2, 3, or 5?"]
                            },
                        ].map((card, i) => (
                            <div key={i} style={sCard}>
                                <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{card.icon}</div>
                                <div style={{ fontSize: "0.97rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: 8 }}>{card.title}</div>
                                <div style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 14 }}>{card.body}</div>
                                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                                    {card.items.map((item, j) => (
                                        <li key={j} style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", padding: "7px 10px", background: "var(--bg-secondary)", borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                                            <span style={{ color: ACCENT, fontWeight: 900, flexShrink: 0 }}>→</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* F4 Analysis */}
                    <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "40px 44px" }}>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                            Why hasn&apos;t Blinkit built the 2-minute edit window? (F4 analysis)
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>
                            If I can design it, why hasn&apos;t Blinkit shipped it? An honest analysis of the real constraints — and how the design accounts for them.
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {[
                                {
                                    type: "Tech Constraint", title: "Dark store ops complexity",
                                    body: "Pickers begin immediately after order confirmation. Canceling individual items mid-pick creates operational chaos — picker must return items to shelf with correct inventory update. For 8-10 min delivery, even a 2-min edit window compresses the picking window dangerously.",
                                    resolve: "Design resolution: Edit window closes when picker status changes to 'started' — not purely time-based. Requires real-time picker status API integration."
                                },
                                {
                                    type: "Business Constraint", title: "Payment reconciliation",
                                    body: "Adding items post-authorization requires a second payment capture or pre-authorization for a higher amount. Removing items requires a partial refund to source. Both are complex payment flows that increase transaction costs and failure rates.",
                                    resolve: "Design resolution: 'Add' items use a small secondary authorization. 'Remove' items are issued as Blinkit wallet credits (faster, cheaper than bank refund). Two-tier reconciliation model."
                                },
                                {
                                    type: "Fraud Risk", title: "Post-order item manipulation",
                                    body: "An edit window can be exploited: user adds expensive items that weren't in their pre-authorized order. Fraud models for post-order edits are more complex than for original orders.",
                                    resolve: "Design resolution: Edit window locked to +/-20% of original order value. Additions above threshold require explicit re-confirmation. Anomaly detection on edit patterns per user."
                                },
                                {
                                    type: "Priority Constraint", title: "Feature prioritization",
                                    body: "Blinkit has been hyper-focused on delivery speed and dark store expansion. Post-order UX improvements have lower perceived ROI than dark store optimization and catalog expansion. Engineering team is stretched.",
                                    resolve: "Design resolution: Build as a phased rollout — Phase 1 is 'remove items only' (simpler). Phase 2 adds items with wallet credit. Phase 3 is full add + remove with pre-auth. Lower risk entry, higher confidence scaling."
                                },
                            ].map((card, i) => (
                                <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14 }}>
                                    <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{card.type}</div>
                                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>{card.title}</div>
                                    <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 12 }}>{card.body}</div>
                                    <div style={{ padding: "10px 12px", background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, color: ACCENT, lineHeight: 1.5 }}>{card.resolve}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ══════════════════════════════════════════════════════════
                    09 — COMPETITIVE AUDIT
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="09" label="Competitive Audit" />
                    <div style={{ ...sCard, padding: 0, overflow: "hidden" }}>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                                <thead>
                                    <tr style={{ background: "#1a1a1a" }}>
                                        {["Feature", "Blinkit", "Zepto", "Instamart", "Gap"].map((h, i) => (
                                            <th key={i} style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: i === 0 ? "#fff" : ACCENT, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Semantic / NL Search",  "Partial", "Fast",    "Swiggy Sense (2024)", "Instamart ahead"],
                                        ["Image / List Scan",     "None",    "None",    "None",                "First-mover gap"],
                                        ["Conversational Voice",  "None",    "None",    "MCP (Jan 2026)",      "External only"],
                                        ["Pantry Intelligence",   "Partial", "Partial", "Partial",             "Predictive gap"],
                                        ["Post-Order Edit",       "Cancel",  "None",    "None",                "Category gap"],
                                        ["Brand Personalization", "Partial", "None",    "None",                "First wins loyalty"],
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i % 2 === 1 ? "rgba(0,0,0,0.015)" : "transparent" }}>
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

                {/* ══════════════════════════════════════════════════════════
                    10 — IMPLEMENTATION ROADMAP
                ══════════════════════════════════════════════════════════ */}
                <Section>
                    <SectionHeader num="10" label="Implementation Roadmap" />

                    <div>
                        <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", margin: "0 0 10px 0" }}>
                            If I were shipping this<br />at Blinkit —
                        </h3>
                        <p style={{ ...bodyText, maxWidth: 680 }}>A phased approach starting with the highest-confidence, lowest-complexity wins. Each phase validates assumptions before investing in the next layer of AI sophistication and operational complexity.</p>
                    </div>

                    {/* Timeline */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 36, paddingLeft: 32, borderLeft: "2px solid #1a1a1a" }}>
                        {[
                            {
                                phase: "Phase 1", time: "Weeks 1–6", dotColor: "#1a1a1a", badgeBg: "#1a1a1a", badgeColor: ACCENT, badge: "6 weeks",
                                title: "Quick Wins — Ship & Validate",
                                items: [
                                    { title: "Semantic search upgrade", desc: "Replace keyword Elasticsearch with embedding-based search. Immediate relevance lift for all users — no new UI needed.", tag: "Infrastructure" },
                                    { title: "Basic OCR list scanner (printed text)", desc: "Camera reads printed/typed lists only. Google Vision API. No handwriting support yet — validate the concept first.", tag: "F1 Phase 1" },
                                    { title: "AI sparkle FAB + chat shell", desc: "Ship the entry point and chat interface. Voice capability comes in Phase 2 — keyboard input first to validate adoption.", tag: "F2 Phase 1" },
                                    { title: "Brand personalization (search results)", desc: "Surface user's most-purchased brand as Card 1 in search results. Small change, immediate trust signal for returning users.", tag: "Personalization" },
                                ]
                            },
                            {
                                phase: "Phase 2", time: "Weeks 7–14", dotColor: "#22C55E", badgeBg: "#DCFCE7", badgeColor: "#16A34A", badge: "8 weeks",
                                title: "Core AI Models — Train & Deploy",
                                items: [
                                    { title: "Handwriting OCR (Hindi + English)", desc: "Fine-tune on Indian handwriting dataset. Validate accuracy threshold (>85%) before shipping to users. Offer manual correction fallback.", tag: "F1 Phase 2" },
                                    { title: "Voice ordering (Hindi + English STT)", desc: "Google Cloud Speech API integration. Character-level live transcript. Conversational cart building with brand confirmation.", tag: "F2 Phase 2" },
                                    { title: "Brand Ranker model v1", desc: "LightGBM trained on 6-month order history. A/B test vs current listing. Target: 71% default brand acceptance rate.", tag: "AI Model" },
                                    { title: "Pantry tracker post-order setup", desc: "Duration picker on order confirmation. Reorder prediction strip on home screen. Validate: does reorder gap reduce?", tag: "F3" },
                                ]
                            },
                            {
                                phase: "Phase 3", time: "Weeks 15–24", dotColor: "#3B82F6", badgeBg: "#EFF6FF", badgeColor: "#3B82F6", badge: "10 weeks",
                                title: "Advanced Features — Scale & Compound",
                                items: [
                                    { title: "Meal intent search", desc: "Dish -> ingredient extraction via Gemini/GPT-4o. 500+ Indian meal dataset. Validate ingredient accuracy before scaling.", tag: "F5" },
                                    { title: "2-minute edit window (remove only)", desc: "Phase 3a: remove items only (simpler payment flow). Phase 3b: add items with wallet credit. Requires picker status API.", tag: "F4 Phase 1" },
                                    { title: "Smart OOS substitution", desc: "3-constraint matcher (brand tier + size ±20% + price ±15%). Proactive bottom sheet before dispatch, not at delivery.", tag: "OOS Feature" },
                                    { title: "Feedback loop + model retraining", desc: "Track accepted/rejected AI suggestions. Weekly LightGBM retraining. Seasonal inventory adjustment. The compounding moat.", tag: "AI Learning" },
                                ]
                            },
                        ].map((ph, i) => (
                            <div key={i} style={{ position: "relative" }}>
                                <div style={{ position: "absolute", left: -41, top: 14, width: 16, height: 16, borderRadius: "50%", background: ph.dotColor, border: "3px solid white", boxShadow: `0 0 0 2px ${ph.dotColor}` }} />
                                <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 6 }}>{ph.phase} · {ph.time}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{ph.title}</div>
                                    <span style={{ padding: "4px 10px", borderRadius: 100, background: ph.badgeBg, color: ph.badgeColor, fontSize: "0.7rem", fontWeight: 800 }}>{ph.badge}</span>
                                </div>
                                <div style={{ background: "rgba(0,0,0,0.025)", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
                                    {ph.items.map((item, j) => (
                                        <div key={j} style={{ padding: "14px 18px", borderRight: j % 2 === 0 ? "1px solid rgba(0,0,0,0.06)" : "none", borderBottom: j < 2 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{item.title}</div>
                                            <div style={{ fontSize: "0.77rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: 6 }}>{item.desc}</div>
                                            <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 4, background: "rgba(245,197,24,0.15)", color: "#8B6914" }}>{item.tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

            </div>
        </div>
    );
}
