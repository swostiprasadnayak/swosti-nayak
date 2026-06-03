"use client";
import React, { useState } from "react";
import {
  Check, ChevronDown, ChevronRight, ChevronUp, ExternalLink, Search, Filter,
  AlertTriangle, FileText, ArrowRight, Clock, Maximize2, Plus, GitBranch,
  Layers, Eye, Trash2, CheckCircle2, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

/* ─── Design tokens (matching Eicore prototype) ──────────────────────────── */
const C = {
  brand: "#047857", brandMid: "#059669", brandLight: "#10b981", brandTint: "#d1fae5",
  ink: "#0f172a", ink2: "#1f2937",
  text: "#374151", text2: "#6b7280", text3: "#9ca3af",
  border: "#e5e7eb", borderStrong: "#d1d5db", borderSubtle: "#f3f4f6",
  surf: "#ffffff", surf2: "#f9fafb", surf3: "#f3f4f6",
  amber: "#f59e0b", amberLight: "#fef3c7", amberDark: "#92400e",
  red: "#ef4444", redLight: "#fee2e2",
  success: "#10b981", successLight: "#d1fae5", successDark: "#065f46",
  shadowSm: "0 1px 2px rgba(0,0,0,0.05)",
};
const F = "Inter, system-ui, -apple-system, sans-serif";

/* ─── Data ────────────────────────────────────────────────────────────────── */
type StageState = "done" | "active" | "todo";
const STAGES: { label: string; state: StageState }[] = [
  { label: "Upload", state: "done" }, { label: "Extract", state: "done" },
  { label: "Verify", state: "active" }, { label: "Audit", state: "todo" },
  { label: "Publish", state: "todo" },
];
const TOP_TABS = ["Overview", "Basic Details", "Questions", "Exclusions"];
const SOURCES = [
  { label: "BRD v5.4", pages: "64p" }, { label: "Policy Wording", pages: "38p" },
  { label: "Rate Card 2025", pages: "12p" }, { label: "Proposal Form", pages: "6p" },
];
const STEPS = [
  { id: 1, name: "Configuration Method" },
  { id: 2, name: "AI Extraction & Audit" },
  { id: 3, name: "Unified Product Workspace" },
  { id: 4, name: "Product Review & Publish" },
  { id: 5, name: "Stakeholder Overview" },
];

// Deterministic heatmap
const FIELD_CELLS: ("high" | "medium" | "low")[] = (() => {
  let seed = 7;
  const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  return Array.from({ length: 155 }, () => {
    const r = rng();
    return r > 0.93 ? "low" : r > 0.78 ? "medium" : "high";
  });
})();
const CELL_COLOR = { high: C.brandLight, medium: C.amber, low: C.red };

type Status = "ok" | "amber" | "red";
const STATUS_DOT: Record<Status, string> = { ok: C.brand, amber: C.amber, red: C.red };
type PlanItem = { label: string; count: number; status: Status };
const planItems = (overrides: Partial<Record<string, Status>> = {}): PlanItem[] => [
  { label: "Plan Limits", count: 1, status: overrides["Plan Limits"] ?? "amber" },
  { label: "Member Details", count: 6, status: overrides["Member Details"] ?? "ok" },
  { label: "Premium Raters", count: 3, status: overrides["Premium Raters"] ?? "amber" },
  { label: "Coverages", count: 37, status: overrides["Coverages"] ?? "ok" },
];
const PLANS = [
  { name: "Mini", items: planItems({ Coverages: "red" }) },
  { name: "Medi", items: planItems() },
  { name: "Max", items: planItems() },
];

type TreeNodeData = { name: string; count: number; progress: number[]; dotColor?: Status; children?: TreeNodeData[] };
const TREE_DATA: TreeNodeData[] = [
  { name: "Coverages", count: 12, progress: [0.62, 0.23, 0.15], dotColor: "ok",
    children: [
      { name: "Plan Limits", count: 5, progress: [1, 0, 0], dotColor: "red" },
      { name: "Plan Limits", count: 5, progress: [1, 0, 0], dotColor: "amber" },
    ],
  },
  { name: "Premium Raters", count: 12, progress: [0.78, 0.12, 0.10], dotColor: "ok" },
];

type FeedItem = { kind: "blocker" | "warning"; tier: string; time: string; title: string };
const FEED: FeedItem[] = [
  { kind: "blocker", tier: "Mini", time: "12m ago", title: "Room rent cap missing in BRD for Mini tier." },
  { kind: "blocker", tier: "Mini", time: "1h ago", title: "Policy wording vs Brochure conflict on LASIK coverage." },
  { kind: "warning", tier: "Medi", time: "2h ago", title: "OPD limit differs between BRD (₹8,000) and Brochure (₹7,500)." },
  { kind: "warning", tier: "Max", time: "3h ago", title: "Initial wait conflict — Brochure 15d vs Policy 30d." },
  { kind: "warning", tier: "Max", time: "5h ago", title: "Experimental treatment — Brochure conflicts with Policy wording." },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT — Builder Workspace (no GlobalSidebar)
   ═══════════════════════════════════════════════════════════════════════════ */
export default function InsureTechCaseStudyTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      background: C.surf2, fontFamily: F, overflow: "hidden",
    }}>
      {/* Header */}
      <PrototypeHeader
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Step Sidebar */}
        <StepSidebar collapsed={sidebarCollapsed} />

        {/* Main Content + Right Rail */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <MainContent />
          <RightRail />
        </div>
      </div>
    </div>
  );
}

/* ─── Header ──────────────────────────────────────────────────────────────── */
function PrototypeHeader({ sidebarCollapsed, onToggleSidebar }: { sidebarCollapsed: boolean; onToggleSidebar: () => void }) {
  return (
    <header style={{
      height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", background: C.surf, borderBottom: `1px solid ${C.border}`,
      zIndex: 10, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h1 style={{ fontWeight: 600, fontSize: 15, color: C.ink, margin: 0, fontFamily: F }}>Product Plan Builder</h1>
        <button onClick={onToggleSidebar} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: 6, border: "none",
          background: sidebarCollapsed ? C.brandTint : "transparent",
          cursor: "pointer", color: sidebarCollapsed ? C.brand : C.text2,
        }}>
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 8, background: C.surf3, border: `1px solid ${C.border}` }}>
          {[{ label: "Builder", active: true }, { label: "Tree Mode", active: false }].map(t => (
            <span key={t.label} style={{
              padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: F,
              background: t.active ? C.surf : "transparent",
              color: t.active ? C.brand : C.text3,
              boxShadow: t.active ? C.shadowSm : "none",
            }}>{t.label}</span>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${C.border}`, borderRadius: 6, width: 28, height: 28,
          color: C.text2, background: C.surf,
        }}><Eye size={14} /></div>
      </div>
    </header>
  );
}

/* ─── Step Sidebar ────────────────────────────────────────────────────────── */
function StepSidebar({ collapsed }: { collapsed: boolean }) {
  const currentStep = 3;
  return (
    <aside style={{
      width: collapsed ? 0 : 240, minWidth: collapsed ? 0 : 240,
      background: C.surf, borderRight: collapsed ? "none" : `1px solid ${C.border}`,
      overflow: "hidden", transition: "width .22s ease, min-width .22s ease", flexShrink: 0,
    }}>
      <div style={{ width: 240, height: "100%", boxSizing: "border-box", overflowY: "auto", padding: "20px 14px", display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: 700, fontSize: 13, color: C.ink, marginBottom: 14, padding: "0 4px", fontFamily: F }}>Builder Roadmap</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {STEPS.map(step => {
            const isActive = currentStep === step.id;
            const isPast = currentStep > step.id;
            return (
              <div key={step.id} style={{
                background: isActive ? C.surf : "transparent", borderRadius: 8,
                padding: "10px 12px", cursor: "pointer",
                border: `1px solid ${isActive ? C.border : "transparent"}`,
                boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  {isPast ? (
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.brandTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={11} color={C.brand} strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                    </div>
                  ) : (
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${C.borderStrong}`, background: "transparent", flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: 12.5, fontWeight: isActive ? 600 : 500, color: isActive ? C.ink : isPast ? C.text2 : C.text3, fontFamily: F }}>{step.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Content (center area) ──────────────────────────────────────────── */
function MainContent() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar />
      <main style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <ExtractionHealthCard />
        <FieldMapCard />
        <PlanVariantsGrid />
      </main>
    </div>
  );
}

/* ─── Top Bar (product info + stage chips) ────────────────────────────────── */
function TopBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "10px 20px",
      borderBottom: `1px solid ${C.border}`, background: C.surf, flexShrink: 0, minHeight: 56,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: C.brandTint, color: C.brand,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>E</div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.2, whiteSpace: "nowrap", fontFamily: F }}>D.I.Y Health Insurance</p>
          <p style={{ fontSize: 11, color: C.text2, margin: "2px 0 0", lineHeight: 1.2, whiteSpace: "nowrap", fontFamily: F }}>Health &middot; UIN EIC-HLT-P-V-001-25</p>
        </div>
      </div>

      {/* Stage chips */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
        {STAGES.map((s, i) => (
          <React.Fragment key={s.label}>
            <StageChip stage={s} />
            {i < STAGES.length - 1 && <div style={{ width: 18, height: 1, background: C.border, margin: "0 6px" }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 2, padding: 3, background: C.surf2, borderRadius: 7, border: `1px solid ${C.border}` }}>
        {TOP_TABS.map((t, i) => (
          <span key={t} style={{
            padding: "5px 11px", borderRadius: 5, fontSize: 12, fontWeight: 600, fontFamily: F,
            background: i === 0 ? C.surf : "transparent",
            color: i === 0 ? C.ink : C.text2,
            boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
          }}>{t}</span>
        ))}
      </div>

      <button style={{
        display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 7,
        background: C.brand, color: "#fff", fontSize: 12.5, fontWeight: 600, border: "none", fontFamily: F,
      }}>Submit configuration <ArrowRight size={13} /></button>

      <div style={{
        width: 32, height: 32, borderRadius: 7, background: "transparent", color: C.text2,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${C.border}`,
      }}><Trash2 size={13} /></div>
    </div>
  );
}

function StageChip({ stage }: { stage: { label: string; state: StageState } }) {
  const { label, state } = stage;
  const done = state === "done";
  const active = state === "active";
  const color = done ? C.brand : active ? C.amberDark : C.text3;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        background: done ? C.brand : active ? C.amber : "transparent",
        border: state === "todo" ? `1.5px solid ${C.borderStrong}` : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {done && <Check size={9} color="#fff" strokeWidth={3.5} />}
        {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
      </div>
      <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color, fontFamily: F }}>{label}</span>
    </div>
  );
}

/* ─── Extraction Health Card ──────────────────────────────────────────────── */
function ExtractionHealthCard() {
  const [sourceIdx, setSourceIdx] = useState(2);
  const HIGH = 61, MED = 12, LOW = 5;
  const total = HIGH + MED + LOW;
  const highPct = (HIGH / total) * 100;
  const medPct = (MED / total) * 100;

  return (
    <div style={{ background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <p style={{ fontSize: 10.5, fontWeight: 700, color: C.text2, letterSpacing: "0.06em", margin: 0, textTransform: "uppercase", fontFamily: F }}>EXTRACTION BRIEF</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.text2, fontFamily: F }}><Clock size={11} /> Jun 1, 2026</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: "-0.015em", fontFamily: F }}>D.I.Y Health Insurance</h2>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px", borderRadius: 100,
          background: C.successLight, border: `1px solid ${C.brand}33`, flexShrink: 0,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.brand }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.successDark, fontFamily: F }}>89% healthy</span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: C.text2, margin: "0 0 14px", lineHeight: 1.5, fontFamily: F }}>
        Health &middot; Indemnity &middot; EIC-HLT-P-V-001-25 &middot; 78 fields &middot; 4 sources
      </p>

      {/* Health bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          {[{ c: C.brand, v: HIGH, l: "High" }, { c: C.amber, v: MED, l: "Medium" }, { c: C.red, v: LOW, l: "Low" }].map(d => (
            <div key={d.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.c }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: C.ink, fontFamily: F }}>{d.v}</span>
              <span style={{ fontSize: 11.5, color: C.text2, fontFamily: F }}>{d.l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 100, overflow: "hidden", background: C.borderSubtle }}>
          <div style={{ width: `${highPct}%`, background: C.brand }} />
          <div style={{ width: `${medPct}%`, background: C.amber }} />
          <div style={{ flex: 1, background: C.red }} />
        </div>
      </div>

      {/* Source pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, color: C.text2, fontWeight: 500, fontFamily: F }}>Source:</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SOURCES.map((s, i) => {
            const active = i === sourceIdx;
            return (
              <button key={s.label} onClick={() => setSourceIdx(i)} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 9px", borderRadius: 6,
                background: active ? C.successLight : C.surf,
                color: active ? C.successDark : C.ink,
                border: `1px solid ${active ? C.brand + "55" : C.border}`,
                fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: F,
              }}>
                <FileText size={10} />
                {s.label}
                <span style={{ color: active ? C.brand : C.text3, fontWeight: 500, marginLeft: 1 }}>&middot; {s.pages}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, padding: "7px 11px", background: C.surf2, border: `1px solid ${C.border}`, borderRadius: 7 }}>
          <Search size={13} color={C.text3} />
          <span style={{ fontSize: 12.5, color: C.text3, fontFamily: F }}>Find parameter...</span>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "7px 11px", borderRadius: 7,
          background: C.surf, color: C.text2,
          border: `1px solid ${C.border}`, fontSize: 11.5, fontWeight: 600, fontFamily: F,
        }}>
          <Filter size={11} /> Needs review only
        </div>
      </div>
    </div>
  );
}

/* ─── Field Map Card ──────────────────────────────────────────────────────── */
function FieldMapCard() {
  return (
    <div style={{ background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: C.text2, letterSpacing: "0.06em", margin: "0 0 4px", textTransform: "uppercase", fontFamily: F }}>FIELD MAP</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: F }}>89%</span>
            <span style={{ fontSize: 13, color: C.text2, fontFamily: F }}>extraction health</span>
            <ChevronDown size={14} color={C.text2} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {[{ c: C.brandLight, l: "High" }, { c: C.amber, l: "Medium" }, { c: C.red, l: "Low" }].map(d => (
            <div key={d.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.c }} />
              <span style={{ fontSize: 11, color: C.text2, fontWeight: 500, fontFamily: F }}>{d.l}</span>
            </div>
          ))}
          <div style={{ background: C.surf, border: `1px solid ${C.border}`, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.text2 }}>
            <Maximize2 size={14} />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(31, 1fr)", gap: 4 }}>
        {FIELD_CELLS.map((c, i) => (
          <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: CELL_COLOR[c] }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Plan Variants Grid ──────────────────────────────────────────────────── */
function PlanVariantsGrid() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, fontFamily: F }}>Plan Variants</span>
          <span style={{ fontSize: 12, color: C.text2, marginLeft: 5, fontFamily: F }}>&middot; 3 fields</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ display: "flex", gap: 2, width: 70, height: 5, borderRadius: 100, overflow: "hidden" }}>
            <div style={{ flex: 0.62, background: C.brand }} />
            <div style={{ flex: 0.23, background: C.amber }} />
            <div style={{ flex: 0.15, background: C.red }} />
          </div>
          <span style={{ fontSize: 11.5, color: C.text2, fontWeight: 500, fontFamily: F }}>77% quality</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {PLANS.map(p => (
          <div key={p.name} style={{
            background: C.surf, border: `1px solid ${C.border}`, borderRadius: 10,
            padding: 14, display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: 0, fontFamily: F }}>{p.name}</p>
              <ExternalLink size={12} color={C.text2} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {p.items.map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: STATUS_DOT[item.status] }} />
                    <span style={{ fontSize: 12, color: C.ink, fontFamily: F }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.ink, fontFamily: F }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Plan card */}
        <div style={{
          background: C.surf2, border: `1.5px dashed ${C.borderStrong}`, borderRadius: 10,
          padding: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.brandTint, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={16} color={C.brand} />
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: C.ink, margin: 0, fontFamily: F }}>Add Plan</p>
          <p style={{ fontSize: 11, color: C.text2, margin: 0, textAlign: "center", fontFamily: F }}>Create a new plan variant</p>
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 7,
          background: C.surf, color: C.ink, border: `1px solid ${C.borderStrong}`,
          fontSize: 12.5, fontWeight: 600, fontFamily: F,
        }}>
          <GitBranch size={13} /> Tree Mode
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 7,
          background: C.brand, color: "#fff", border: "none",
          fontSize: 12.5, fontWeight: 600, fontFamily: F,
        }}>
          Continue verifying <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}

/* ─── Right Rail ──────────────────────────────────────────────────────────── */
function RightRail() {
  const [tab, setTab] = useState<"tree" | "issues" | "data" | "document">("tree");
  const [activeTier, setActiveTier] = useState("Mini");
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([0]));

  const toggleNode = (idx: number) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const tabs: { id: "tree" | "issues" | "data" | "document"; label: string; Icon: typeof GitBranch }[] = [
    { id: "tree", label: "Tree", Icon: GitBranch },
    { id: "issues", label: "Issues", Icon: AlertTriangle },
    { id: "data", label: "Data Extracted", Icon: Layers },
    { id: "document", label: "Document", Icon: FileText },
  ];

  return (
    <aside style={{
      width: 300, flexShrink: 0, borderLeft: `1px solid ${C.border}`, background: C.surf,
      display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: F,
    }}>
      {/* Tab bar */}
      <div style={{ display: "flex", padding: "10px 12px 0", borderBottom: `1px solid ${C.border}`, gap: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 8px 10px", background: "transparent",
            color: tab === t.id ? C.brand : C.text2,
            fontSize: 11.5, fontWeight: 600, border: "none", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
            borderBottom: `2px solid ${tab === t.id ? C.brand : "transparent"}`,
            marginBottom: -1, fontFamily: F, flex: 1, justifyContent: "center",
          }}><t.Icon size={11} /> {t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px" }}>
        {/* Plan Variants tier picker */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: C.text2, letterSpacing: "0.06em", margin: "0 0 8px", textTransform: "uppercase", fontFamily: F }}>PLAN VARIANTS</p>
          <div style={{ display: "flex", gap: 4, padding: 3, background: C.surf2, borderRadius: 9, border: `1px solid ${C.border}` }}>
            {["Mini", "Medi", "Max"].map(t => (
              <button key={t} onClick={() => setActiveTier(t)} style={{
                flex: 1, padding: "7px 0", borderRadius: 6,
                background: activeTier === t ? C.surf : "transparent", color: C.ink,
                fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
                boxShadow: activeTier === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: F,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: t === "Mini" ? C.brand : t === "Medi" ? C.amber : C.red }} />
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Mini Structure */}
        <div style={{
          background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16,
          backgroundImage: `radial-gradient(circle, ${C.border} 0.8px, transparent 0.8px)`,
          backgroundSize: "10px 10px", backgroundPosition: "5px 5px",
          overflow: "hidden", marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.brand }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, letterSpacing: "0.05em", fontFamily: F }}>MINI STRUCTURE</span>
              <span style={{ fontSize: 12, color: C.text2, fontFamily: F }}>&middot; 26 fields</span>
            </div>
            <div style={{ background: C.surf, border: `1px solid ${C.border}`, width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.text2 }}>
              <Maximize2 size={12} />
            </div>
          </div>

          {/* Tree nodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TREE_DATA.map((n, i) => (
              <React.Fragment key={i}>
                <TreeNodeCard node={n} expanded={expandedNodes.has(i)} onToggle={() => toggleNode(i)} />
                {expandedNodes.has(i) && n.children && n.children.map((ch, j) => (
                  <TreeNodeCard key={j} node={ch} isChild />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: C.text2, letterSpacing: "0.06em", margin: "0 0 10px", textTransform: "uppercase", fontFamily: F }}>ACTIVITY FEED</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FEED.map((f, i) => {
              const isBlocker = f.kind === "blocker";
              const color = isBlocker ? C.red : C.amber;
              return (
                <div key={i} style={{ display: "flex", gap: 9 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${color}`, background: "transparent", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: F }}>
                        {f.kind} <span style={{ color: C.text2, fontWeight: 500 }}>&middot; {f.tier}</span>
                      </span>
                      <span style={{ fontSize: 10, color: C.text3, fontFamily: F }}>{f.time}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: C.ink, margin: "0 0 5px", lineHeight: 1.4, fontFamily: F }}>{f.title}</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: C.brand, fontSize: 10.5, fontWeight: 600, fontFamily: F }}>Open parameter</span>
                      <span style={{ color: C.text2, fontSize: 10.5, fontWeight: 600, fontFamily: F }}>Resolve</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Tree Node Card ──────────────────────────────────────────────────────── */
function TreeNodeCard({ node, isChild, expanded, onToggle }: {
  node: TreeNodeData; isChild?: boolean; expanded?: boolean; onToggle?: () => void;
}) {
  const dotColor = node.dotColor === "red" ? C.red : node.dotColor === "amber" ? C.amber : C.brand;
  return (
    <div onClick={onToggle} style={{
      background: C.surf, border: `1px solid ${C.border}`, borderRadius: 10,
      padding: isChild ? "8px 10px" : "10px 12px", marginLeft: isChild ? 8 : 0,
      display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
      boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: isChild ? 12.5 : 13.5, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.2, fontFamily: F }}>{node.name}</p>
        <p style={{ fontSize: 11, color: C.text2, margin: "2px 0 0", lineHeight: 1.2, fontFamily: F }}>{node.count} fields</p>
      </div>
      <div style={{ display: "flex", gap: 1.5, width: 72, height: 4.5, borderRadius: 100, overflow: "hidden", flexShrink: 0, background: C.borderSubtle }}>
        <div style={{ flex: node.progress[0], background: C.brand }} />
        {node.progress[1] > 0 && <div style={{ flex: node.progress[1], background: C.amber }} />}
        {node.progress[2] > 0 && <div style={{ flex: node.progress[2], background: C.red }} />}
      </div>
      {isChild ? <ChevronRight size={14} color={C.text3} /> : expanded ? <ChevronUp size={14} color={C.text3} /> : <ChevronDown size={14} color={C.text3} />}
    </div>
  );
}
