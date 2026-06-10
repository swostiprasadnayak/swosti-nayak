"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, AlertTriangle, Info, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  Heuristic Analysis — Product Builder screen
//  Recreates the live Eicore Product Builder UI as a pure-TSX mockup (no PNG)
//  with numbered pins, then maps each pin to the Nielsen heuristic it violates.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = "#047857";
const BRAND_TINT = "#d1fae5";
const INK = "#0f172a";
const INK2 = "#1f2937";
const MUTED = "#475569";
const SUBTLE = "#64748b";
const LIGHT = "#94a3b8";
const BORDER = "#e2e8f0";
const BORDER_STRONG = "#d1d5db";
const SURFACE = "#f8fafc";
const CRITICAL = "#dc2626";
const CRITICAL_TINT = "#fee2e2";
const WARNING = "#d97706";
const WARNING_TINT = "#fef3c7";

// ─── Pins anchored to the mockup ─────────────────────────────────────────────
type Severity = "high" | "med" | "low";

type Pin = {
  n: number;
  // position is relative to the mockup container (percentages)
  top: string;
  left: string;
  severity: Severity;
  heuristic: string;        // e.g. "H1 · Visibility of system status"
  title: string;            // short heading
  body: string;             // 1-2 sentence finding
};

const BUILDER_PINS: Pin[] = [
  { n: 1,  top: "20%", left: "50%", severity: "high",
    heuristic: "H1 · Visibility of system status",
    title: "Contradictory status",
    body: "Yellow banner says “Needs Attention → 30/30”. The overview right next to it says “0 fields need review · 0 sections flagged”. User can’t tell if work is left." },
  { n: 2,  top: "20%", left: "92%", severity: "high",
    heuristic: "H9 · Error recognition",
    title: "Ambiguous “30/30” count",
    body: "Is it 30 of 30 done, or 30 remaining? The denominator doesn’t match the numerator semantics in any reading." },
  { n: 3,  top: "9%",  left: "50%", severity: "high",
    heuristic: "H4 · Consistency & standards",
    title: "Two competing progress models",
    body: "The 5-stage Builder Roadmap (left rail) and the 7-step pipeline at the top both claim to show “where you are”. User picks one, then keeps re-checking the other." },
  { n: 4,  top: "55%", left: "12%", severity: "high",
    heuristic: "H8 · Aesthetic & minimalist",
    title: "Product tree, copy #1 of 3",
    body: "Left rail shows Plans → Coverages as a navigation tree." },
  { n: 5,  top: "78%", left: "44%", severity: "high",
    heuristic: "H8 · Aesthetic & minimalist",
    title: "Product tree, copy #2 of 3",
    body: "Middle Plan Variants cards re-render the same structural data (Plan Limits / Member Details / Premium Raters / Coverages) with counts." },
  { n: 6,  top: "55%", left: "88%", severity: "high",
    heuristic: "H8 · Aesthetic & minimalist",
    title: "Product tree, copy #3 of 3",
    body: "Right panel’s “Tree” tab renders the structure a third time. Three copies of the same hierarchy on one screen." },
  { n: 7,  top: "42%", left: "78%", severity: "med",
    heuristic: "H7 · Flexibility & efficiency",
    title: "4-tab panel fights for attention",
    body: "Tree · Extraction · Issues · Docs — four competing surfaces. Each tab switch loses the user’s context in the others." },
  { n: 8,  top: "37%", left: "44%", severity: "med",
    heuristic: "H5 · Error prevention",
    title: "Bulk action, no confirmation",
    body: "“Mark Reviewed (0/151)” — one click could mark all 151 fields verified with no preview and no undo path shown." },
  { n: 9,  top: "75%", left: "11%", severity: "med",
    heuristic: "H6 · Recognition over recall",
    title: "37-coverage flat list",
    body: "Mini plan has 37 coverages dumped as a flat alphabetical list. No filter, no grouping, no jump-to-issue. Scrolling fatigue." },
  { n: 10, top: "82%", left: "92%", severity: "low",
    heuristic: "H10 · Help & documentation",
    title: "Red items lack actionable context",
    body: "“Age (Missing)” · “Family Construct” · “Pre-existing” — coloured red but no inline explanation of what to do, where the fix is, or why it matters." },
];

const SEVERITY_LABEL: Record<Severity, string> = { high: "High", med: "Medium", low: "Low" };
const SEVERITY_COLOR: Record<Severity, { fg: string; bg: string; ring: string }> = {
  high: { fg: CRITICAL, bg: CRITICAL_TINT, ring: "#fca5a5" },
  med:  { fg: WARNING,  bg: WARNING_TINT,  ring: "#fcd34d" },
  low:  { fg: "#0ea5e9", bg: "#e0f2fe",   ring: "#7dd3fc" },
};

// ─── The annotated mockup at its NATURAL width (renders inside the responsive
//     wrapper below). Container width is fixed so internal flex/grid math stays
//     stable regardless of viewport. ResponsiveBuilderMockup scales it down.
const MOCKUP_NATURAL_W = 720;
const MOCKUP_NATURAL_H = 500; // approximate; the wrapper observes actual height

function BuilderMockupInner({ hoveredPin, setHoveredPin }: { hoveredPin: number | null; setHoveredPin: (n: number | null) => void }) {
  return (
    <div style={{
      position: "relative",
      background: BORDER_STRONG,
      borderRadius: 18,
      padding: 14,
      border: `1px solid ${BORDER_STRONG}`,
      boxShadow: "0 12px 40px -8px rgba(15,23,42,.12), 0 2px 4px rgba(15,23,42,.04)",
      width: MOCKUP_NATURAL_W,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Top bar */}
        <div style={{
          height: 36, display: "flex", alignItems: "center", padding: "0 12px",
          gap: 10, borderBottom: `1px solid ${BORDER}`, background: "#fff",
        }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: BRAND }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: INK2 }}>Eicore</span>
          <span style={{ fontSize: 11, color: LIGHT }}>/</span>
          <span style={{ fontSize: 11, color: SUBTLE }}>Products</span>
          <span style={{ fontSize: 11, color: LIGHT }}>/</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: INK2 }}>D.I.Y Health Insurance</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: SUBTLE }}>Prototype</span>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: SURFACE, border: `1px solid ${BORDER}` }} />
          </div>
        </div>

        {/* Stepper row */}
        <div style={{
          padding: "8px 12px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", fontSize: 9.5,
        }}>
          {["Config Product", "Config Rules", "Config Rating"].map((s, i) => (
            <React.Fragment key={s}>
              <span style={{ color: BRAND, display: "flex", gap: 3, alignItems: "center", fontWeight: 500 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: BRAND, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 6, fontWeight: 700 }}>✓</span>
                {s}
              </span>
              <span style={{ color: LIGHT }}>›</span>
            </React.Fragment>
          ))}
          <span style={{
            color: BRAND, fontWeight: 700, background: BRAND_TINT,
            padding: "2px 8px", borderRadius: 999, border: "1px solid #bbf7d0",
            display: "flex", gap: 4, alignItems: "center",
          }}>
            <span style={{ width: 13, height: 13, borderRadius: "50%", background: BRAND, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700 }}>4</span>
            Issues Resolved
          </span>
          <span style={{ color: LIGHT }}>›</span>
          {["Product Review", "Approved", "Published"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <span style={{ color: LIGHT }}>{s}</span>
              {i < arr.length - 1 && <span style={{ color: LIGHT }}>›</span>}
            </React.Fragment>
          ))}
          <span style={{
            marginLeft: "auto", background: INK, color: "#fff",
            padding: "3px 10px", borderRadius: 6, fontSize: 9, fontWeight: 600,
          }}>Proceed to Review →</span>
        </div>

        {/* Yellow banner */}
        <div style={{
          background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 6,
          margin: "8px 12px", padding: "8px 10px",
          display: "flex", alignItems: "center", gap: 8, fontSize: 10,
          fontWeight: 500, color: "#92400E",
        }}>
          <Info size={10} />
          <span>Next: Verify extracted fields for <strong>OPD Cover · in Mini</strong></span>
          <span style={{
            marginLeft: "auto", background: "#fff", border: "1px solid #FDE68A",
            color: "#92400E", fontWeight: 700, padding: "2px 8px",
            borderRadius: 4, fontSize: 9,
          }}>Needs Attention → 30/30</span>
        </div>

        {/* 3-col content */}
        <div style={{
          display: "grid", gridTemplateColumns: "115px 1fr 175px",
          gap: 8, padding: "4px 12px 14px",
        }}>
          {/* Left rail */}
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 8 }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, margin: "0 0 6px" }}>D.I.Y Health Insurance</p>
            <p style={{ fontSize: 8.5, fontWeight: 700, color: LIGHT, letterSpacing: "0.1em", margin: "8px 0 4px" }}>NAVIGATION</p>
            <div style={{ fontSize: 9.5, padding: "4px 6px", borderRadius: 4, background: BRAND_TINT, color: BRAND, fontWeight: 600 }}>Overview</div>
            {["Basic Details", "Questions", "Exclusions"].map(item => (
              <div key={item} style={{ fontSize: 9.5, padding: "4px 6px", color: MUTED, display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: BRAND, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 6, fontWeight: 700 }}>✓</span>
                {item}
              </div>
            ))}
            <p style={{ fontSize: 8.5, fontWeight: 700, color: LIGHT, letterSpacing: "0.1em", margin: "8px 0 4px" }}>PLANS +</p>
            <div style={{ fontSize: 9, padding: "3px 6px", color: MUTED, display: "flex", alignItems: "center", gap: 4 }}>
              ▾ <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND }} /> Mini
            </div>
            <div style={{ paddingLeft: 14, display: "flex", flexDirection: "column", gap: 2 }}>
              {["Organ Donor Expenses", "Cumulative Bonus", "Restoration of SI", "ICU Charges", "Room Rent", "Wellness Benefits", "Cataract Surgery", "OPD Cover"].map(c => (
                <div key={c} style={{ fontSize: 8.5, color: SUBTLE, padding: "1px 4px" }}>{c}</div>
              ))}
            </div>
            <div style={{ fontSize: 9, padding: "3px 6px", color: MUTED, display: "flex", alignItems: "center", gap: 4 }}>
              ▸ <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} /> Medi
            </div>
            <div style={{ fontSize: 9, padding: "3px 6px", color: MUTED, display: "flex", alignItems: "center", gap: 4 }}>
              ▸ <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A855F7" }} /> Max
            </div>
          </div>

          {/* Middle */}
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>Builder Overview</p>
              <span style={{ background: INK, color: "#fff", padding: "3px 10px", fontSize: 9, borderRadius: 4, fontWeight: 600 }}>✓ Mark Reviewed (0/151)</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: BRAND, lineHeight: 1 }}>89%</div>
                <div style={{ fontSize: 9, color: SUBTLE, marginTop: 4 }}>
                  145 of 155 fields extracted ·{" "}
                  <span style={{ color: BRAND }}>0 fields need review · 0 sections flagged</span>
                </div>
              </div>
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Product Summary</div>
                {[["Plans", "3 Variants"], ["Sum Insured", "₹4L – ₹15L"], ["Coverages", "111 Total"]].map(([k, v]) => (
                  <div key={k} style={{ fontSize: 9, color: MUTED, display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                    <span>{k}</span>
                    <span style={{ color: INK, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, margin: "0 0 6px" }}>Plan Variants</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {["Mini", "Medi", "Max"].map(name => (
                <div key={name} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6, padding: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>● {name}</div>
                  {[["Plan Limits", "1"], ["Member Details", "6"], ["Premium Raters", "3"], ["Coverages", "37"]].map(([k, v]) => (
                    <div key={k} style={{ fontSize: 8.5, color: SUBTLE, display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                      <span>{k}</span>
                      <span style={{ color: INK }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel (Tree) */}
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 10 }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, margin: "-10px -10px 8px" }}>
              {["Tree", "Extr.", "Iss.", "Docs"].map((t, i) => (
                <div key={t} style={{
                  flex: 1, textAlign: "center", padding: "7px 4px",
                  fontSize: 8.5, fontWeight: 700, color: i === 0 ? BRAND : LIGHT,
                  letterSpacing: "0.05em", textTransform: "uppercase" as const,
                  borderBottom: `2px solid ${i === 0 ? BRAND : "transparent"}`,
                }}>{t}</div>
              ))}
            </div>
            <div style={{ fontSize: 9.5, padding: "3px 4px", color: INK, fontWeight: 600 }}>
              ⌥ D.I.Y Health Insurance
            </div>
            <div style={{ fontSize: 9.5, padding: "3px 4px", color: MUTED, fontWeight: 600 }}>▾ Plans</div>
            <div style={{ fontSize: 9.5, padding: "3px 4px 3px 14px", color: BRAND, fontWeight: 600 }}>▾ Mini</div>
            {["▸ Plan Limits", "▸ Member Details", "▸ Coverages", "▾ Premium Raters"].map(item => (
              <div key={item} style={{ fontSize: 9, padding: "2px 4px 2px 24px", color: MUTED }}>{item}</div>
            ))}
            {["Age (Missing)", "Family Construct", "Pre-existing"].map(item => (
              <div key={item} style={{
                fontSize: 9, padding: "2px 4px 2px 34px", color: CRITICAL,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: CRITICAL }} />
                {item}
              </div>
            ))}
            <div style={{ fontSize: 9.5, padding: "3px 4px 3px 14px", color: MUTED }}>▸ Medi</div>
            <div style={{ fontSize: 9.5, padding: "3px 4px 3px 14px", color: MUTED }}>▸ Max</div>
          </div>
        </div>
      </div>

      {/* Numbered pins overlaid on the mockup */}
      {BUILDER_PINS.map(p => {
        const c = SEVERITY_COLOR[p.severity];
        const isHovered = hoveredPin === p.n;
        return (
          <button
            key={p.n}
            onMouseEnter={() => setHoveredPin(p.n)}
            onMouseLeave={() => setHoveredPin(null)}
            onFocus={() => setHoveredPin(p.n)}
            onBlur={() => setHoveredPin(null)}
            aria-label={`Finding ${p.n}: ${p.title}`}
            style={{
              position: "absolute", top: p.top, left: p.left,
              transform: "translate(-50%, -50%)",
              width: 22, height: 22, borderRadius: "50%",
              background: c.fg, color: "#fff",
              border: `2px solid #fff`, padding: 0,
              boxShadow: isHovered
                ? `0 0 0 4px ${c.ring}, 0 4px 12px rgba(15,23,42,.18)`
                : `0 2px 6px rgba(15,23,42,.18)`,
              fontSize: 11, fontWeight: 800,
              cursor: "pointer", lineHeight: 1,
              transition: "box-shadow 120ms ease, transform 120ms ease",
              zIndex: 5,
            }}
          >
            {p.n}
          </button>
        );
      })}
    </div>
  );
}

// ─── Responsive wrapper: renders the natural-width mockup, then scales it to
//     fit whatever column width the parent grid gives it. Keeps the pins
//     anchored proportionally because they live INSIDE the scaled element.
function BuilderMockup(props: { hoveredPin: number | null; setHoveredPin: (n: number | null) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const [scale, setScale]   = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner   = innerRef.current;
    if (!wrapper || !inner) return;

    const compute = () => {
      const wrapW = wrapper.getBoundingClientRect().width;
      const s = Math.min(1, wrapW / MOCKUP_NATURAL_W);
      const naturalH = inner.scrollHeight || MOCKUP_NATURAL_H;
      setScale(s);
      setHeight(naturalH * s);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrapper);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{
      position: "relative",
      width: "100%",
      height: height || undefined,
      overflow: "hidden",
    }}>
      <div ref={innerRef} style={{
        width: MOCKUP_NATURAL_W,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "absolute",
        top: 0, left: 0,
      }}>
        <BuilderMockupInner {...props} />
      </div>
    </div>
  );
}

// ─── Single legend row — visual-first, click to reveal body ─────────────────
function FindingRow({ p, hovered }: { p: Pin; hovered: boolean }) {
  const c = SEVERITY_COLOR[p.severity];
  const [open, setOpen] = useState(false);
  // Hovering the matching pin on the mockup also expands the row.
  const expanded = open || hovered;

  return (
    <div
      onClick={() => setOpen(v => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(v => !v); } }}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 12, padding: "12px 14px",
        borderRadius: 10,
        // Left border carries the severity colour for at-a-glance scanning.
        borderLeft: `4px solid ${c.fg}`,
        border: `1px solid ${BORDER}`,
        borderLeftWidth: 4,
        background: expanded ? c.bg : "#fff",
        cursor: "pointer",
        transition: "background 120ms ease, border-color 120ms ease",
        alignItems: "center",
      }}
    >
      {/* Number badge — large, severity-coloured */}
      <span style={{
        width: 30, height: 30, borderRadius: "50%",
        background: c.fg, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 800, flexShrink: 0,
      }}>{p.n}</span>

      {/* Title + heuristic tag — single row, scannable */}
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{
          fontSize: 14, fontWeight: 700, color: INK, margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{p.title}</p>
        <span style={{
          fontSize: 10.5, fontWeight: 700, color: BRAND,
          background: BRAND_TINT, padding: "2px 8px", borderRadius: 100,
          letterSpacing: "0.02em", alignSelf: "flex-start",
          maxWidth: "100%",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{p.heuristic}</span>
      </div>

      {/* Severity dot — minimal visual cue (label appears on expand) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          fontSize: 10.5, fontWeight: 700, color: c.fg,
          background: c.bg, padding: "3px 8px", borderRadius: 6,
          textTransform: "uppercase" as const, letterSpacing: "0.04em",
        }}>{SEVERITY_LABEL[p.severity]}</span>
        <ChevronRight size={14} color={LIGHT} style={{
          transform: expanded ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 180ms ease",
        }} />
      </div>

      {/* Expanded body */}
      {expanded && (
        <p style={{
          gridColumn: "2 / 4",
          fontSize: 12.5, color: MUTED,
          margin: "6px 0 0", lineHeight: 1.5,
        }}>{p.body}</p>
      )}
    </div>
  );
}

// ─── Additional screens (collapsed behind "Read more") ───────────────────────
// Compact, list-only — no embedded mockups; the Product Builder screen is the
// star, the others are referenced so readers know the audit was full-journey.
const OTHER_SCREENS: { screen: string; findings: { title: string; heuristic: string; body: string; severity: Severity }[] }[] = [
  {
    screen: "AI Extraction Preview",
    findings: [
      { severity: "high", heuristic: "H7 · Flexibility", title: "8 sections all collapsed by default", body: "User sees 8 chevrons + 8 confidence pills but no content. Expand-everything would dump 200 fields, expand-each is 8 clicks before useful work begins." },
      { severity: "med",  heuristic: "H10 · Help & documentation", title: "Mysterious “Documents” toggle", body: "A toggle labelled “Documents” sits next to the 89% score with no affordance. Toggle what? Hide left pane? Compare docs? Unguessable." },
    ],
  },
  {
    screen: "Mini expanded in Tree",
    findings: [
      { severity: "high", heuristic: "H9 · Error recognition", title: "Red items without inline context", body: "“Age” · “Family Construct” · “Pre-existing” — coloured red but offer no inline explanation of what to do, where to fix it, or why it matters." },
      { severity: "med",  heuristic: "H6 · Recognition", title: "Indentation depth is the only cue", body: "Tree depth is the only signal of hierarchy. After 4 levels, indent becomes ambiguous — user can’t tell whether a row belongs to Mini or Member Details." },
    ],
  },
  {
    screen: "Pre-publish Review",
    findings: [
      { severity: "high", heuristic: "H1 · Visibility of system status", title: "Mixed severity in one list", body: "Publishing Checklist mixes blockers (red) and warnings (amber) in one flat list. Distinguished only by tint — no sequencing or grouping by severity." },
      { severity: "med",  heuristic: "H4 · Consistency", title: "Subsystem categories appear out of nowhere", body: "Rules / Field Confidence / Members  & Raters appear only on this screen. The same data lived under different labels (Coverages, Plan Limits) in earlier steps." },
    ],
  },
];

// ─── A simpler findings row used in the "Read more" panel ────────────────────
function OtherFindingRow({ f }: { f: { title: string; heuristic: string; body: string; severity: Severity } }) {
  const c = SEVERITY_COLOR[f.severity];
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(v => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(v => !v); } }}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 12, padding: "12px 14px",
        borderRadius: 10,
        borderLeft: `4px solid ${c.fg}`,
        border: `1px solid ${BORDER}`,
        borderLeftWidth: 4,
        background: open ? c.bg : "#fff",
        cursor: "pointer",
        transition: "background 120ms ease",
        alignItems: "center",
      }}
    >
      <AlertTriangle size={16} color={c.fg} style={{ flexShrink: 0 }} />
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{
          fontSize: 14, fontWeight: 700, color: INK, margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{f.title}</p>
        <span style={{
          fontSize: 10.5, fontWeight: 700, color: BRAND,
          background: BRAND_TINT, padding: "2px 8px", borderRadius: 100,
          letterSpacing: "0.02em", alignSelf: "flex-start",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: "100%",
        }}>{f.heuristic}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          fontSize: 10.5, fontWeight: 700, color: c.fg,
          background: c.bg, padding: "3px 8px", borderRadius: 6,
          textTransform: "uppercase" as const, letterSpacing: "0.04em",
        }}>{SEVERITY_LABEL[f.severity]}</span>
        <ChevronRight size={14} color={LIGHT} style={{
          transform: open ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 180ms ease",
        }} />
      </div>
      {open && (
        <p style={{
          gridColumn: "2 / 4",
          fontSize: 12.5, color: MUTED,
          margin: "6px 0 0", lineHeight: 1.5,
        }}>{f.body}</p>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function HeuristicAnalysis({ isMobile }: { isMobile: boolean }) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const highCount = BUILDER_PINS.filter(p => p.severity === "high").length;
  const medCount  = BUILDER_PINS.filter(p => p.severity === "med").length;
  const lowCount  = BUILDER_PINS.filter(p => p.severity === "low").length;

  return (
    <div>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 24, height: 2, background: BRAND }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: SUBTLE, letterSpacing: "0.1em" }}>
          03 — HEURISTIC ANALYSIS
        </span>
      </div>
      <h2 style={{
        fontSize: isMobile ? 20 : 28, fontWeight: 700,
        color: INK, margin: "0 0 16px", letterSpacing: "-0.02em",
      }}>
        Nielsen&apos;s 10, scored against the live Product Builder.
      </h2>
      <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.7, color: MUTED, margin: "0 0 28px" }}>
        Ten numbered findings pinned to the live screen. Hover the pin to highlight the
        finding; severity is rated by frequency × user impact × disruption to the core task.
      </p>

      {/* Severity strip */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { count: highCount, label: "High",   sev: "high" as const },
          { count: medCount,  label: "Medium", sev: "med"  as const },
          { count: lowCount,  label: "Low",    sev: "low"  as const },
        ].map(s => {
          const c = SEVERITY_COLOR[s.sev];
          return (
            <div key={s.label} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px", borderRadius: 100,
              background: c.bg, border: `1px solid ${c.ring}`,
              fontSize: 12, fontWeight: 600, color: c.fg,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.fg }} />
              {s.count} {s.label}
            </div>
          );
        })}
      </div>

      {/* Annotated screen + findings (legend) — stacks on tablet & mobile */}
      <div style={{
        display: "grid",
        // Stack below the desktop breakpoint so the mockup gets full width and
        // doesn't get crushed into a narrow side column.
        gridTemplateColumns: "1fr",
        gap: 28, alignItems: "start",
      }}>
        <div>
          <BuilderMockup hoveredPin={hoveredPin} setHoveredPin={setHoveredPin} />
          <p style={{
            fontSize: 11.5, color: LIGHT, marginTop: 10, marginBottom: 0,
            textAlign: "center", fontStyle: "italic",
          }}>
            Live Product Builder screen, annotated with 10 findings — tap a row to read more
          </p>
        </div>
        <div style={{
          display: "grid",
          // Findings flow as a responsive grid of compact cards.
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 10,
        }}>
          {BUILDER_PINS.map(p => (
            <FindingRow key={p.n} p={p} hovered={hoveredPin === p.n} />
          ))}
        </div>
      </div>

      {/* Read more — other screens */}
      <div style={{ marginTop: 36, borderTop: `1px solid ${BORDER}`, paddingTop: 28 }}>
        <button
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 16px", borderRadius: 100,
            border: `1px solid ${BORDER_STRONG}`,
            background: expanded ? BRAND_TINT : "#fff",
            color: expanded ? BRAND : INK,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          <ChevronDown size={14} style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms ease",
          }} />
          {expanded ? "Hide rest of journey" : `Read more — ${OTHER_SCREENS.length} other screens audited`}
        </button>

        {expanded && (
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            {OTHER_SCREENS.map((s, si) => (
              <div key={s.screen}>
                <p style={{
                  fontSize: 11, fontWeight: 700, color: SUBTLE,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  margin: "0 0 12px",
                }}>
                  Screen {si + 2}
                </p>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, margin: "0 0 14px" }}>
                  {s.screen}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.findings.map((f, fi) => (
                    <OtherFindingRow key={fi} f={f} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
