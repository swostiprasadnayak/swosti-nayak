"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import classes from "./caseStudy.module.css";

// Blinkit accent (brand yellow) — used only as a localized inline accent on chips/highlights.
const ACCENT = "#F5C518";

const card = {
    background: "var(--bg-card)",
    border: "1px solid var(--border-subtle)",
    padding: "28px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
};

const subtleCard = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-subtle)",
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
};

const statNumber: React.CSSProperties = {
    fontSize: "2.4rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "var(--text-primary)",
};

const statLabel: React.CSSProperties = {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
};

const chipStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: 100,
    background: "var(--bg-card)",
    border: "1px solid var(--border-subtle)",
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    fontWeight: 500,
};

const accentChipStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: 100,
    background: ACCENT,
    color: "#1a1a1a",
    fontSize: "0.78rem",
    fontWeight: 600,
};

const sectionEyebrow: React.CSSProperties = {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-secondary)",
    fontWeight: 600,
    marginBottom: 12,
};

export default function BlinkitCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>

                {/* SECTION 1 — HERO */}
                <CaseStudyHeader
                    title="Grocery in 10 min"
                    subtitle="Cart takes 4. Designing an AI layer that makes building a grocery cart as fast as the delivery promise — through intelligent scanning, voice ordering, and predictive intelligence."
                    tags={[
                        "Blinkit · AI Personalization Layer",
                        "Swosti Nayak · Product Designer · 2025",
                        "Quick Commerce",
                        "AI/ML",
                        "Mobile UX",
                    ]}
                    onVoiceModeClick={openModal}
                />

                {/* Hero stat chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { n: "24", l: "User interviews" },
                        { n: "4", l: "Pain points mapped" },
                        { n: "5", l: "AI features designed" },
                        { n: "−58%", l: "Cart build time" },
                        { n: "+₹290", l: "Projected AOV uplift" },
                    ].map((s, i) => (
                        <Squircle key={i} cornerRadius={16} style={subtleCard}>
                            <div style={{ ...statNumber, fontSize: "1.6rem" }}>{s.n}</div>
                            <div style={statLabel}>{s.l}</div>
                        </Squircle>
                    ))}
                </div>

                {/* Hero media placeholder */}
                <Squircle cornerRadius={24} className={classes.heroMedia} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* PLACEHOLDER: Blinkit hero poster image (16:10) — provide /projectCardImages/blinkit/poster.jpg */}
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Hero poster</span>
                </Squircle>

                {/* SECTION 2 — THE PROBLEM (Challenge vs Impact) */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>The Problem</div>
                    <h2 className={classes.sectionHeading}>Challenge vs Impact — From AS-IS to TO-BE</h2>
                    <p className={classes.bodyText}>Blinkit delivers in 10 minutes. Building the cart takes 4. The pre-order experience is the bottleneck the brand promise sits in front of.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Squircle cornerRadius={16} style={card}>
                        <div style={sectionEyebrow}>AS-IS — Current Experience</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <span style={chipStyle}>4m 12s</span>
                            <span style={chipStyle}>41% abandon</span>
                            <span style={chipStyle}>Zero learning across sessions</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                            <li><strong style={{ color: "var(--text-primary)" }}>Cold start every session</strong> — Generic homepage, no memory of preferences.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Keyword search fails intent</strong> — “Pasta tonight” returns nothing. 6 separate searches for 1 meal.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Brand paralysis at staples</strong> — 3.8 PDP opens per atta/dal item. 28% abandon here entirely.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Physical list is invisible</strong> — 72% have a handwritten list. Every item typed manually.</li>
                        </ul>
                    </Squircle>

                    <Squircle cornerRadius={16} style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={sectionEyebrow}>TO-BE — With AI Layer</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <span style={accentChipStyle}>1m 45s</span>
                            <span style={accentChipStyle}>&lt;13% abandon</span>
                            <span style={accentChipStyle}>Learns every order</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                            <li><strong style={{ color: "var(--text-primary)" }}>Warm personalised home</strong> — AI-predicted reorder strip. Scan button visible in search bar.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Scan / speak / type intent</strong> — Camera reads paper list. Say “pasta tonight.” Any modality, same AI pipeline.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>Full cart in 1.5 seconds</strong> — Preferred brands pre-selected. “From list” attribution on every card.</li>
                            <li><strong style={{ color: "var(--text-primary)" }}>“Add All” — one tap</strong> — 9 items, 1 action. AI gets smarter each order.</li>
                        </ul>
                    </Squircle>
                </div>

                {/* Metrics delta row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { before: "4m 12s", after: "1m 45s", label: "Cart-build time" },
                        { before: "—", after: "+₹290", label: "Avg order value" },
                        { before: "41%", after: "<13%", label: "Drop-off rate" },
                        { before: "3.8 PDPs", after: "1 glance", label: "Brand decision" },
                        { before: "—", after: "−34%", label: "Reorder gap" },
                    ].map((m, i) => (
                        <Squircle key={i} cornerRadius={16} style={subtleCard}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{m.before} →</div>
                            <div style={{ ...statNumber, fontSize: "1.4rem", color: ACCENT }}>{m.after}</div>
                            <div style={statLabel}>{m.label}</div>
                        </Squircle>
                    ))}
                </div>

                {/* SECTION 3 — UNDERSTANDING THE PROBLEM */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Understanding the Problem</div>
                    <h2 className={classes.sectionHeading}>The 10-minute promise hides a 4-minute friction.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {[
                        { n: "10 min", l: "What Blinkit promises — India's fastest grocery delivery, a genuine technical achievement." },
                        { n: "4:12", l: "What users actually experience. A 20-tap gauntlet that contradicts the brand promise." },
                        { n: "72%", l: "Users with a physical list open while ordering — handwritten notes, WhatsApp threads, screenshots. Unsupported by the app." },
                        { n: "3.8×", l: "Product page opens per staple item. Users compare brands repeatedly. Zero personalised guidance." },
                    ].map((s, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={statNumber}>{s.n}</div>
                            <div style={statLabel}>{s.l}</div>
                        </Squircle>
                    ))}
                </div>

                <Squircle cornerRadius={20} style={{ background: "var(--bg-secondary)", border: `1px solid var(--border-subtle)`, padding: "40px", borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={sectionEyebrow}>Goal</div>
                    <p style={{ fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.5, color: "var(--text-primary)", margin: 0 }}>
                        “Make cart-building as fast as Blinkit's delivery — so the pre-order experience lives up to the 10-minute promise it sits in front of.”
                    </p>
                </Squircle>

                {/* SECTION 4 — RESEARCH */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Research</div>
                    <h2 className={classes.sectionHeading}>24 Interviews. One clear pattern.</h2>
                    <p className={classes.bodyText}>Six weeks of primary research with urban Indian Blinkit/Zepto/Instamart users — household grocery decision-makers screened for last-30-day activity.</p>
                </div>

                {/* Personas */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        {
                            name: "Priya, 32",
                            role: "Primary · Mumbai · Orders 2–3x/day",
                            emoji: "👩‍💼",
                            points: ["Forgets items constantly — places multiple orders daily", "Keeps a handwritten list the app can't read", "Brand selection fatigue for every staple"],
                            quote: "I just want to say 'stuff for pasta' and have it figure it out.",
                        },
                        {
                            name: "Rajan, 27",
                            role: "Secondary · Bangalore · Voice-first user",
                            emoji: "👨‍💻",
                            points: ["Mid-cook emergencies need instant ordering", "Instagram recipe → can't translate to cart easily", "Wants zero-touch experience while hands are busy"],
                            quote: "I want to place an order without looking at my phone.",
                        },
                        {
                            name: "Sunita, 62",
                            role: "Edge Case · Jodhpur · Notebook user",
                            emoji: "👩‍🦳",
                            points: ["Asks family to order for her — app feels overwhelming", "Small fonts, confusing SKU results for simple searches", "No Hindi voice input for her preferred language"],
                            quote: "I have the list right here. Why can't I show it to the phone?",
                        },
                    ].map((p, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={{ fontSize: "2rem" }}>{p.emoji}</div>
                            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{p.role}</div>
                            <ul style={{ margin: "8px 0", paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.55 }}>
                                {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
                            </ul>
                            <div style={{ background: "var(--bg-secondary)", padding: "12px 14px", borderRadius: 12, fontSize: "0.88rem", color: "var(--text-primary)", fontStyle: "italic", borderLeft: `2px solid ${ACCENT}` }}>
                                “{p.quote}”
                            </div>
                        </Squircle>
                    ))}
                </div>

                {/* Research provenance */}
                <Squircle cornerRadius={16} style={subtleCard}>
                    <div style={sectionEyebrow}>Research Provenance</div>
                    <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        <li>6 weeks primary research. Semi-structured 45-min interviews. Screened for urban India, last-30-day quick-commerce users, household grocery decision-makers.</li>
                        <li>Recruitment: 8 personal network · 9 WhatsApp community · 7 LinkedIn outreach (working professionals, 25–55, metro India). 3 sessions discarded for data quality.</li>
                        <li>Script: “Walk me through your last grocery order, screen-share included.” / “Show me how you build a list before ordering.” Screen recordings reviewed post-session.</li>
                    </ul>
                </Squircle>

                {/* Surprising finding */}
                <Squircle cornerRadius={20} style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", padding: "32px", borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={sectionEyebrow}>The Surprising Finding</div>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--text-primary)", margin: 0 }}>
                        I expected the primary pain to be delivery time — that users wanted faster delivery. It wasn't. Every participant was satisfied with 10-minute delivery. The frustration was entirely pre-order: the gap between having a list and getting it into the cart. The delivery problem was solved. The ordering problem wasn't.
                    </p>
                </Squircle>

                {/* 4 Research findings */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                        { n: "41%", t: "Sessions end with 0 add-to-cart", d: "Mental models ≠ SKU taxonomy. Not one participant described a grocery need as a category. They said “chai ingredients,” “party snacks” — intent-driven language search engines fail." },
                        { n: "72%", t: "Users with external list open", d: "Physical list is universal across age, city, and tech comfort. Users had self-invented the workaround. The app simply didn't see it." },
                        { n: "3.8×", t: "PDP opens per staple item", d: "Brand is the #1 stall point. App shows identical unranked results to every user. Six months of purchase history, completely ignored." },
                        { n: "JTBD", t: "Four-phase job map", d: "Pre-Order Discovery · List Translation · Brand Selection · Post-Order Loop — each with its own ⚠ pain and ✓ desired outcome." },
                    ].map((f, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={{ ...statNumber, color: ACCENT }}>{f.n}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{f.t}</div>
                            <div style={statLabel}>{f.d}</div>
                        </Squircle>
                    ))}
                </div>

                {/* SECTION 5 — HOW MIGHT WE */}
                <Squircle cornerRadius={24} style={{ background: "#111", color: "#fff", padding: "60px 40px", textAlign: "center" }}>
                    <div style={{ ...sectionEyebrow, color: ACCENT }}>How Might We</div>
                    <p style={{ fontSize: "1.6rem", fontWeight: 500, lineHeight: 1.4, margin: 0, letterSpacing: "-0.01em" }}>
                        How might we make Blinkit's pre-order experience as fast as its delivery — so that building a full grocery cart feels as effortless and instant as the 10-minute promise?
                    </p>
                </Squircle>

                {/* SECTION 6 — PRIMARY FEATURES (F1) */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Solution · Primary Features</div>
                    <h2 className={classes.sectionHeading}>Making the app a decision partner</h2>
                </div>

                {/* F1 */}
                <Squircle cornerRadius={20} style={{ ...card, padding: "32px" }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={accentChipStyle}>F1</span>
                        <span style={chipStyle}>Highest ROI</span>
                        <span style={chipStyle}>72% of users benefit immediately</span>
                    </div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 600, margin: "8px 0 0", letterSpacing: "-0.01em" }}>Scan &amp; Build Cart</h3>
                    <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                        Any external list — paper, screenshot, WhatsApp, recipe image, or pasted URL — turns into a personalised, brand-ranked, ready-to-checkout cart. Three input modes, one AI pipeline, nine items in one tap.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                        <Squircle cornerRadius={12} style={subtleCard}>
                            <div style={sectionEyebrow}>Design Logic 1</div>
                            <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>3 tabs, not 3 separate flows</div>
                            <div style={statLabel}>Camera, upload, and paste-text unified under one screen. Detected items appear as dismissible chips before the cart builds — visible AI progress, not a black-box spinner.</div>
                        </Squircle>
                        <Squircle cornerRadius={12} style={subtleCard}>
                            <div style={sectionEyebrow}>Design Logic 2</div>
                            <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>“From list” attribution on every card</div>
                            <div style={statLabel}>Every product shows the exact text from the user's list that triggered the AI match. Trust through transparency.</div>
                        </Squircle>
                    </div>

                    {/* F1 Prototype embed */}
                    <div style={{ marginTop: 16 }}>
                        <div style={{ ...sectionEyebrow, marginBottom: 8 }}>📱 Interactive Prototype — Scan &amp; Build Cart</div>
                        <Squircle cornerRadius={16} style={{ overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                            <iframe
                                src="/prototypes/blinkit-scanner.html"
                                title="Blinkit Scan & Build Cart Prototype"
                                style={{ width: "100%", minHeight: 700, border: "none", display: "block" }}
                            />
                        </Squircle>
                    </div>

                    {/* What I rejected */}
                    <div style={{ marginTop: 16 }}>
                        <div style={sectionEyebrow}>What I Tried First &amp; Rejected</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {[
                                { t: "Dedicated “Import List” Screen", d: "Users don't think of grocery ordering as list management. 4/6 usability participants couldn't find it without prompting." },
                                { t: "Voice FAB as Floating Button", d: "4/6 thought it was customer support. Moved inside search bar — association was immediate." },
                                { t: "Image Upload as Separate Entry", d: "Splitting 3 flows = 3 chances to abandon. Unifying under one tabbed screen reduced abandonment." },
                                { t: "AI Processing Modal (Full-Screen Spinner)", d: "Users couldn't tell if the AI understood them. Progressive chip reveal gave control mid-process." },
                            ].map((r, i) => (
                                <div key={i} style={{ ...subtleCard, padding: 16 }}>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>❌ {r.t}</div>
                                    <div style={{ ...statLabel, fontSize: "0.82rem" }}>{r.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...subtleCard, marginTop: 12, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={sectionEyebrow}>V1 Assumption → What Research Showed</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                            Users don't want to manage lists. They want their list to disappear into the cart as fast as possible. The metaphor isn't “import” — it's “scan and forget.”
                        </div>
                    </div>

                    {/* Screens flow placeholders */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 12 }}>
                        {["Home entry", "Upload tab", "Paste text", "Camera scan", "App screenshot", "Processing"].map((s, i) => (
                            <Squircle key={i} cornerRadius={12} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", aspectRatio: "9/16", display: "flex", alignItems: "flex-end", padding: 8, fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                                {/* PLACEHOLDER: F1 mobile screen — {s} */}
                                {i + 1}. {s}
                            </Squircle>
                        ))}
                    </div>
                </Squircle>

                {/* F2 */}
                <Squircle cornerRadius={20} style={{ ...card, padding: "32px" }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={accentChipStyle}>F2</span>
                        <span style={chipStyle}>New modality</span>
                        <span style={chipStyle}>Mid-cook · Hands-busy · Emergency</span>
                    </div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 600, margin: "8px 0 0", letterSpacing: "-0.01em" }}>Voice Quick Order</h3>
                    <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                        One tap to start. Speak in Hindi, English, or code-switched (“Milk aur eggs de do”). AI builds the cart, shows it in a chat thread, and lets users confirm or edit by voice or tap. Fully touchless end-to-end.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                        <Squircle cornerRadius={12} style={subtleCard}>
                            <div style={sectionEyebrow}>Design Logic 1</div>
                            <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>Real-time transcript, not a spinner</div>
                            <div style={statLabel}>Transcript appears character-by-character. Yellow waveform runs simultaneously — proof of active listening, not silent recording.</div>
                        </Squircle>
                        <Squircle cornerRadius={12} style={subtleCard}>
                            <div style={sectionEyebrow}>Design Logic 2</div>
                            <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>Cart card inside the chat thread</div>
                            <div style={statLabel}>The AI's response is an inline cart card, not a modal or new screen. Users say “change brand” as a natural continuation. Context is never broken.</div>
                        </Squircle>
                    </div>

                    {/* F2 Prototype embed */}
                    <div style={{ marginTop: 16 }}>
                        <div style={{ ...sectionEyebrow, marginBottom: 8 }}>📱 Interactive Prototype — Voice Quick Order</div>
                        <Squircle cornerRadius={16} style={{ overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                            <iframe
                                src="/prototypes/blinkit-voice.html"
                                title="Blinkit Voice Quick Order Prototype"
                                style={{ width: "100%", minHeight: 700, border: "none", display: "block" }}
                            />
                        </Squircle>
                    </div>

                    <div style={{ ...subtleCard, marginTop: 12, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={sectionEyebrow}>Design Win</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                            First conversational AI ordering in Indian quick commerce. Native Hindi/English code-switching. One FAB tap → full touchless order. Reaches the mid-cook use case current UX completely ignores.
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
                        {["Chat welcome", "Listening", "AI processing", "Cart built"].map((s, i) => (
                            <Squircle key={i} cornerRadius={12} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", aspectRatio: "9/16", display: "flex", alignItems: "flex-end", padding: 8, fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                                {/* PLACEHOLDER: F2 mobile screen — {s} */}
                                {i + 1}. {s}
                            </Squircle>
                        ))}
                    </div>
                </Squircle>

                {/* SECTION 8 — SECONDARY FEATURES */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Secondary Features</div>
                    <h2 className={classes.sectionHeading}>Closing the full loop</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        { tag: "F3", title: "Pantry Intelligence", sub: "Predict before they forget", pain: "Users place 2–3 orders/day due to forgetting. App has 6 months of purchase data and uses none of it proactively.", solution: "Post-order setup → “Time to Reorder?” home strip. Users set how long each item lasts; the app predicts run-out and surfaces the reminder." },
                        { tag: "F4", title: "2-Minute Edit Window", sub: "Catch the “I forgot” moment", pain: "After placing an order, users realise they forgot items. The only option is cancelling everything and starting over.", solution: "2-minute countdown after confirmation. AI suggests forgotten items as quick-add chips. Add or remove before the picker starts." },
                        { tag: "F5", title: "Meal Intent Search", sub: "Type a dish, get a cart", pain: "Instagram recipe inspiration requires 6+ separate searches to buy all ingredients.", solution: "User types meal name → AI parses intent → extracts ingredients → matches catalog → applies brand preferences. Cart grouped by dish." },
                    ].map((f, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={{ display: "flex", gap: 8 }}>
                                <span style={accentChipStyle}>{f.tag}</span>
                            </div>
                            <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-primary)" }}>{f.title}</div>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic" }}>{f.sub}</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}><strong style={{ color: "var(--text-primary)" }}>Pain:</strong> {f.pain}</div>
                            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}><strong style={{ color: "var(--text-primary)" }}>Solution:</strong> {f.solution}</div>
                            {f.tag === "F4" && (
                                <div style={{ ...subtleCard, padding: 12, fontSize: "0.8rem" }}>
                                    <strong style={{ color: "var(--text-primary)" }}>Why hasn't Blinkit built this?</strong> Dark store ops complexity, payment reconciliation overhead, and fraud risk.
                                </div>
                            )}
                        </Squircle>
                    ))}
                </div>

                {/* SECTION 9 — COMPETITIVE AUDIT */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Competitive Audit · March 2026</div>
                    <h2 className={classes.sectionHeading}>What Zepto &amp; Instamart are already building</h2>
                    <p className={classes.bodyText}>
                        Blinkit's two closest competitors are both moving toward AI-assisted ordering. Sourced from published product releases, app-store reviews, and design teardowns — here's exactly where the gap is, and why building now matters.
                    </p>
                </div>

                <Squircle cornerRadius={16} style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                            <thead>
                                <tr style={{ background: "var(--bg-secondary)" }}>
                                    {["Feature", "Blinkit", "Zepto", "Swiggy Instamart", "Gap / Opportunity"].map((h, i) => (
                                        <th key={i} style={{ textAlign: "left", padding: "14px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--border-subtle)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Semantic / NL Search", "⚡ Partial — keyword + voice, no ingredient parsing", "✓ Predictive search, fast", "✓ Swiggy Sense — meal → ingredients (2024)", "⚠ Instamart ahead"],
                                    ["Image / List Scan", "✗ Not available", "✗ Not available", "✗ Not available", "✓ First-mover gap"],
                                    ["Conversational / Voice Ordering", "✗ Not in-app", "✗ Not available", "✓ MCP — ChatGPT/Claude/Gemini (Jan 2026)", "⚠ Instamart first, external app only"],
                                    ["Pantry / Reorder Intelligence", "⚡ Partial — “Order Again,” no prediction", "⚡ Partial — reorder from past", "⚡ Partial — order history only", "✓ Predictive first-mover gap"],
                                    ["Post-Order Edit Window", "✗ Cancel & restart only", "✗ Not available", "✗ Not available", "✓ Category-wide gap"],
                                    ["Brand Personalization", "⚡ Partial — “Frequently Bought,” not ranked in search", "✗ Not in search results", "✗ Not in search results", "✓ First to personalise search wins loyalty"],
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                                        {row.map((cell, j) => (
                                            <td key={j} style={{ padding: "14px 16px", color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: j === 0 ? 600 : 400, verticalAlign: "top" }}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Squircle>

                {/* SECTION 10 — ARCHITECTURE */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Architecture</div>
                    <h2 className={classes.sectionHeading}>One pipeline. Three entry points.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { n: "1", t: "Input Layer", d: "Camera · Voice · Text — 3 modalities, 1 entry UX." },
                        { n: "2", t: "NLP / NLU Engine", d: "Gemini Vision + Whisper + semantic parser." },
                        { n: "3", t: "Intent Resolution", d: "Meal → ingredients · List → SKUs · Voice → structured query." },
                        { n: "4", t: "Personalization Layer", d: "Brand-preference scoring · Purchase history · Pantry state." },
                        { n: "5", t: "Cart Builder", d: "Ranked results · Attribution tags · One-tap confirm." },
                    ].map((s, i) => (
                        <Squircle key={i} cornerRadius={16} style={subtleCard}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: ACCENT, color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>{s.n}</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.t}</div>
                            <div style={{ ...statLabel, fontSize: "0.82rem" }}>{s.d}</div>
                        </Squircle>
                    ))}
                </div>

                <Squircle cornerRadius={16} style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                            <thead>
                                <tr style={{ background: "var(--bg-secondary)" }}>
                                    {["Layer", "Technology", "Rationale"].map((h, i) => (
                                        <th key={i} style={{ textAlign: "left", padding: "14px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--border-subtle)" }}>{h}</th>
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
                                    <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                                        {row.map((cell, j) => (
                                            <td key={j} style={{ padding: "14px 16px", color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Squircle>

                <div style={{ ...subtleCard, borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={sectionEyebrow}>Engineering Note</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                        One shared pipeline means F1, F2, and F5 share the same NLU backend. −40% engineering effort vs. building 3 separate features.
                    </div>
                </div>

                {/* SECTION 11 — BEFORE / AFTER + METRICS */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Before · After</div>
                    <h2 className={classes.sectionHeading}>The journey, side by side.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Squircle cornerRadius={16} style={card}>
                        <div style={sectionEyebrow}>Before</div>
                        <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                            <li>Open app → cold home screen (no personalisation)</li>
                            <li>Search keyword → wrong / irrelevant results</li>
                            <li>Open multiple PDPs → brand comparison paralysis</li>
                            <li>Add items one by one (9 taps for 9 items)</li>
                            <li>Realise you forgot something → cancel entire order</li>
                        </ol>
                    </Squircle>
                    <Squircle cornerRadius={16} style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
                        <div style={sectionEyebrow}>After</div>
                        <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                            <li>Open app → warm home with predicted reorder strip</li>
                            <li>Scan list / speak intent / type meal → AI pipeline</li>
                            <li>Brand auto-selected from history → no PDP needed</li>
                            <li>“Add All” — 1 tap for the entire list</li>
                            <li>2-minute edit window — add forgotten items instantly</li>
                        </ol>
                    </Squircle>
                </div>

                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                    {[
                        { metric: "Cart-build time", before: "4m 12s", after: "1m 45s" },
                        { metric: "Avg order value", before: "—", after: "+₹290" },
                        { metric: "Drop-off rate", before: "41%", after: "<13%" },
                        { metric: "Brand decision", before: "3.8 PDPs", after: "1 glance" },
                        { metric: "Reorder gap", before: "—", after: "−34%" },
                    ].map((m, i) => (
                        <Squircle key={i} cornerRadius={16} style={subtleCard}>
                            <div style={statLabel}>{m.metric}</div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Before: {m.before}</div>
                            <div style={{ ...statNumber, fontSize: "1.4rem", color: ACCENT }}>{m.after}</div>
                        </Squircle>
                    ))}
                </div>

                {/* Metric Honesty */}
                <Squircle cornerRadius={16} style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
                    <div style={sectionEyebrow}>Metric Honesty — What's Validated vs Projected</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>✓ Validated</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                                <li>Cart-build time reduction (usability testing, n=6)</li>
                                <li>Drop-off rate pattern (session data)</li>
                                <li>Physical-list behaviour (24 interviews)</li>
                            </ul>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>📊 Projected</div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                                <li>+₹290 AOV uplift</li>
                                <li>−34% reorder gap</li>
                                <li>&lt;13% abandon rate</li>
                                <li>Based on analogous benchmarks from similar AI feature launches.</li>
                            </ul>
                        </div>
                    </div>
                </Squircle>

                {/* SECTION 12 — BUSINESS VALIDATION */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Business Validation</div>
                    <h2 className={classes.sectionHeading}>Why this is worth building now.</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {[
                        { t: "Business case — Revenue impact", d: "Higher AOV through bigger, more complete carts. Reduced support costs from fewer repeat orders. The reorder loop reduces churn." },
                        { t: "User need validation", d: "24 interviews, all converging on the same 3 pain points. Zero AI competition in list-scan. 72% of users already doing the workaround." },
                        { t: "Competitive advantage", d: "First mover on image-to-cart in Indian quick commerce. Differentiation from Zepto and Instamart on the pre-order experience layer." },
                        { t: "What to validate in user testing", d: "Does the scan confidence threshold (85%+) meet user trust? Does the voice transcript reassure or create anxiety? Does the 2-min edit window interrupt dark-store operations?" },
                    ].map((c, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.t}</div>
                            <div style={{ ...statLabel, fontSize: "0.92rem" }}>{c.d}</div>
                        </Squircle>
                    ))}
                </div>

                {/* SECTION 13 — ROADMAP */}
                <div className={classes.textSection}>
                    <div style={sectionEyebrow}>Roadmap · Future Scope</div>
                    <h2 className={classes.sectionHeading}>Three phases. Shared pipeline. Increasing scope.</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {[
                        { phase: "Phase 1", time: "0–3 months", t: "Scan & Build Cart (F1) + Voice Quick Order (F2)", d: "Highest ROI, shared pipeline, immediate user impact." },
                        { phase: "Phase 2", time: "3–6 months", t: "Pantry Intelligence (F3) + 2-Minute Edit Window (F4)", d: "Requires back-end coordination with dark-store ops." },
                        { phase: "Phase 3", time: "6–12 months", t: "Meal Intent Search (F5) + full personalization layer", d: "Catalog partnership, cuisine model training." },
                    ].map((p, i) => (
                        <Squircle key={i} cornerRadius={16} style={card}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={accentChipStyle}>{p.phase}</span>
                                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{p.time}</span>
                            </div>
                            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.t}</div>
                            <div style={statLabel}>{p.d}</div>
                        </Squircle>
                    ))}
                </div>

                {/* What I learned */}
                <Squircle cornerRadius={20} style={{ ...card, padding: 32 }}>
                    <div style={sectionEyebrow}>What I Learned</div>
                    <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65 }}>
                        <li><strong style={{ color: "var(--text-primary)" }}>Research inversion:</strong> I expected delivery speed to be the pain. It was the ordering, not the delivery — that finding reframed the entire solution space.</li>
                        <li><strong style={{ color: "var(--text-primary)" }}>Rejection is the design:</strong> The 4 rejected directions are as important as the final solution. They show the design pressure the right answer had to survive.</li>
                        <li><strong style={{ color: "var(--text-primary)" }}>Trust is the hardest feature:</strong> Every AI feature needed a “show your work” layer — chips, transcripts, attribution — before users felt safe to trust it.</li>
                    </ul>
                </Squircle>

            </div>
        </div>
    );
}
