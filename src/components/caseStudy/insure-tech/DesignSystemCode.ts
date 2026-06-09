// ─────────────────────────────────────────────────────────────────────────────
// Code snippets shown in the Design System tab — ready-to-paste TSX for each
// component. Strings only; no JSX so it can be imported anywhere.
// ─────────────────────────────────────────────────────────────────────────────

export const CODE = {
  // ── Button ────────────────────────────────────────────────────────────────
  button: `// Button.tsx
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const SIZE_MAP: Record<Size, string> = {
  xs: "h-6  px-2  text-[11px]",
  sm: "h-8  px-3  text-[12px]",
  md: "h-10 px-4  text-[13px]",
  lg: "h-12 px-5  text-[14px]",
};

const VARIANT_MAP: Record<Variant, string> = {
  primary:   "bg-green-700 text-white hover:bg-green-600 shadow-sm hover:shadow-md",
  secondary: "bg-gray-900  text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
  outline:   "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
  ghost:     "bg-transparent text-gray-600 hover:bg-gray-100",
  danger:    "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  link:      "bg-transparent text-green-700 underline hover:text-green-800",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={\`inline-flex items-center justify-center gap-1.5
                  font-semibold rounded-lg transition
                  disabled:opacity-45 disabled:cursor-not-allowed
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-green-100 focus-visible:ring-offset-1
                  \${SIZE_MAP[size]} \${VARIANT_MAP[variant]}\`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <span className="w-3.5 h-3.5 rounded-full border-[1.5px]
                     border-current border-t-transparent
                     animate-[spin_0.7s_linear_infinite]" />
  );
}

// Usage
<Button variant="primary" size="md" onClick={save}>
  Submit configuration
</Button>
<Button variant="outline" size="sm" loading>
  Saving…
</Button>`,

  // ── Tag / Chip ────────────────────────────────────────────────────────────
  tag: `// Tag.tsx — status chips, filter pills, content tags
import { ReactNode } from "react";

type Variant = "default" | "tint" | "success" | "warning" | "danger" | "dashed";

interface TagProps {
  variant?: Variant;
  pill?: boolean;            // rounded-full vs rounded-md
  dot?: boolean;             // shows status dot on the left
  removable?: boolean;       // shows × button
  onRemove?: () => void;
  children: ReactNode;
}

const STYLES: Record<Variant, string> = {
  default: "bg-white text-gray-900 border border-gray-200",
  dashed:  "bg-white text-gray-900 border border-dashed border-gray-200",
  tint:    "bg-green-100 text-green-700 border-transparent",
  success: "bg-green-100 text-green-700 border-transparent",
  warning: "bg-amber-100 text-amber-700 border-transparent",
  danger:  "bg-red-100  text-red-700  border-transparent",
};

const DOT: Record<Variant, string> = {
  default: "bg-gray-400",
  dashed:  "bg-gray-400",
  tint:    "bg-green-600",
  success: "bg-green-600",
  warning: "bg-amber-500",
  danger:  "bg-red-500",
};

export function Tag({
  variant = "default",
  pill = false,
  dot = false,
  removable,
  onRemove,
  children,
}: TagProps) {
  return (
    <span
      className={\`inline-flex items-center gap-1.5 px-2.5 py-1
                  text-[12px] font-semibold
                  \${pill ? "rounded-full" : "rounded-md"}
                  \${STYLES[variant]}\`}
    >
      {dot && <span className={\`w-1.5 h-1.5 rounded-full \${DOT[variant]}\`} />}
      {children}
      {removable && (
        <button onClick={onRemove} className="opacity-60 hover:opacity-100">
          ×
        </button>
      )}
    </span>
  );
}

// Usage
<Tag variant="success" dot>Verified</Tag>
<Tag variant="warning" dot>Low confidence</Tag>
<Tag variant="danger" dot>Blocker</Tag>
<Tag pill removable onRemove={remove}>Coverage Details</Tag>`,

  // ── Input field ────────────────────────────────────────────────────────────
  input: `// Input.tsx — form field with label + helper + error
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, disabled, readOnly, ...rest }, ref) => {
    const stateRing = error
      ? "border-red-500 focus:ring-red-100"
      : "border-gray-200 focus:border-green-700 focus:ring-green-100";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[12px] font-medium text-gray-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          className={\`h-9.5 px-3 rounded-lg text-[13px]
                      bg-white border-[1.5px] outline-none
                      focus:ring-[3px] transition
                      disabled:opacity-40 disabled:bg-gray-50
                      read-only:bg-gray-50 read-only:border-transparent
                      \${stateRing}\`}
          {...rest}
        />
        {error
          ? <span className="text-[11px] text-red-500">{error}</span>
          : helper && <span className="text-[11px] text-gray-500">{helper}</span>
        }
      </div>
    );
  }
);
Input.displayName = "Input";

// Usage
<Input label="Limit Value" placeholder="50,000" />
<Input label="Required field" error="Value is required" />
<Input label="Up to SI" readOnly value="Up to SI" />`,

  // ── Parameter Card ────────────────────────────────────────────────────────
  parameterCard: `// ParameterCard.tsx — the building block of the workspace
import { ArrowRight } from "lucide-react";

type State = "verified" | "low-confidence" | "missing" | "blocker";

interface ParameterCardProps {
  category: string;
  title: string;
  value: string;
  state: State;
  confidence: number;        // 0-100
  dependencies?: number;
  source: string;            // e.g. "BRD p.18"
  onEdit?: () => void;
}

const STATE_STYLE: Record<State, { badge: string; bg: string; border: string }> = {
  verified:        { badge: "bg-green-100 text-green-700",  bg: "bg-white",  border: "border-gray-200" },
  "low-confidence":{ badge: "bg-amber-100 text-amber-700",  bg: "bg-white",  border: "border-gray-200" },
  missing:         { badge: "bg-red-100   text-red-700",    bg: "bg-white",  border: "border-red-300" },
  blocker:         { badge: "bg-red-100   text-red-700",    bg: "bg-red-50", border: "border-red-300" },
};

const STATE_LABEL: Record<State, string> = {
  verified: "Verified",
  "low-confidence": "Review",
  missing: "Missing required",
  blocker: "Blocker",
};

export function ParameterCard({
  category, title, value, state, confidence, dependencies = 0, source, onEdit,
}: ParameterCardProps) {
  const s = STATE_STYLE[state];
  return (
    <article className={\`w-65 p-3.5 rounded-[10px] border shadow-sm
                          \${s.bg} \${s.border}\`}>
      <p className="text-[10px] font-bold text-green-600 mb-1.5">• {category}</p>
      <h4 className="text-[13px] font-bold text-gray-900 mb-1">{title}</h4>
      <p className={\`text-[14px] font-bold mb-2
                     \${state === "missing" ? "text-gray-500" : "text-gray-900"}\`}>
        {value}
      </p>
      <div className="flex gap-2.5 mb-2 text-[10px] text-gray-500">
        <span>AI {confidence}%</span>
        {dependencies > 0 && <span>+{dependencies} deps</span>}
        <span>{source}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className={\`text-[10px] font-bold px-2 py-0.5 rounded \${s.badge}\`}>
          {STATE_LABEL[state]}
        </span>
        <button
          onClick={onEdit}
          className="text-[11px] font-semibold text-green-700 inline-flex items-center gap-1"
        >
          Edit <ArrowRight size={11} />
        </button>
      </div>
    </article>
  );
}

// Usage
<ParameterCard
  category="Coverages"
  title="In-patient Hospitalisation"
  value="Up to SI"
  state="verified"
  confidence={92}
  dependencies={2}
  source="BRD p.18"
  onEdit={() => openDrawer(parameterId)}
/>`,

  // ── Activity Feed Item ───────────────────────────────────────────────────
  activityFeed: `// ActivityFeedItem.tsx — Auditor surface
type Severity = "blocker" | "warning";

interface ActivityFeedItemProps {
  severity: Severity;
  tier: "Mini" | "Medi" | "Max";
  ago: string;
  message: string;
  onOpen?: () => void;
  onResolve?: () => void;
}

const STYLES: Record<Severity, string> = {
  blocker: "text-red-500   ring-red-500",
  warning: "text-amber-500 ring-amber-500",
};

export function ActivityFeedItem({
  severity, tier, ago, message, onOpen, onResolve,
}: ActivityFeedItemProps) {
  return (
    <li className="flex gap-3 px-4 py-3.5 border-b border-gray-200 last:border-0">
      <span className={\`w-3.5 h-3.5 mt-0.5 rounded-full
                         ring-[1.5px] ring-inset \${STYLES[severity].split(" ")[1]}\`} />
      <div className="flex-1 min-w-0">
        <header className="flex items-center gap-2 mb-1">
          <span className={\`text-[10px] font-bold uppercase \${STYLES[severity].split(" ")[0]}\`}>
            {severity}
          </span>
          <span className="text-[11px] text-gray-500">· {tier}</span>
          <span className="text-[11px] text-gray-400 ml-auto">{ago}</span>
        </header>
        <p className="text-[12px] text-gray-900 mb-1.5 leading-[1.45]">{message}</p>
        <div className="flex gap-3.5">
          <button onClick={onOpen} className="text-[11px] font-semibold text-green-700">
            Open parameter
          </button>
          <button onClick={onResolve} className="text-[11px] font-semibold text-gray-500">
            Resolve
          </button>
        </div>
      </div>
    </li>
  );
}

// Usage
<ul className="border border-gray-200 rounded-xl overflow-hidden">
  <ActivityFeedItem
    severity="blocker"
    tier="Mini"
    ago="12m ago"
    message="Room rent cap missing in BRD for Mini tier."
    onOpen={() => openParameter("room-rent-cap")}
    onResolve={() => resolveIssue(issueId)}
  />
</ul>`,

  // ── Extraction Health Card ────────────────────────────────────────────────
  healthCard: `// ExtractionHealthCard.tsx — primary status panel
interface ExtractionHealthCardProps {
  productName: string;
  score: number;             // 0-100
  high: number;
  medium: number;
  low: number;
  blockers: number;
  warnings: number;
}

function tierColor(score: number) {
  if (score >= 85) return "#10B981";      // success
  if (score >= 65) return "#F59E0B";      // warning
  return "#EF4444";                        // error
}

export function ExtractionHealthCard({
  productName, score, high, medium, low, blockers, warnings,
}: ExtractionHealthCardProps) {
  const ring = tierColor(score);

  return (
    <section className="w-85 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500 mb-3">
        Extraction Health
      </p>

      <div className="flex gap-4 items-center mb-3">
        {/* Score ring */}
        <div
          className="w-16 h-16 rounded-full grid place-items-center relative"
          style={{
            background: \`conic-gradient(\${ring} 0 \${score}%, #E5E7EB \${score}% 100%)\`,
          }}
        >
          <div className="absolute inset-[7px] rounded-full bg-white grid place-items-center">
            <span className="text-[14px] font-bold text-gray-900">{score}%</span>
          </div>
        </div>

        {/* Metric breakdown */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-1.5">{productName}</p>
          <div className="flex gap-3 text-[12px]">
            <Metric color="#10B981" n={high}   label="High" />
            <Metric color="#F59E0B" n={medium} label="Med"  />
            <Metric color="#EF4444" n={low}    label="Low"  />
          </div>
        </div>
      </div>

      <div className="flex gap-3.5 text-[12px] font-bold">
        <span className={blockers > 0 ? "text-red-500"    : "text-gray-500"}>⚠ {blockers} Blockers</span>
        <span className={warnings > 0 ? "text-amber-500" : "text-gray-500"}>△ {warnings} Warnings</span>
      </div>
    </section>
  );
}

function Metric({ color, n, label }: { color: string; n: number; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="font-bold text-gray-900">{n}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

// Usage
<ExtractionHealthCard
  productName="D.I.Y Health Insurance"
  score={89}
  high={124} medium={40} low={15}
  blockers={2} warnings={4}
/>`,

  // ── Stage Pipeline ────────────────────────────────────────────────────────
  stagePipeline: `// StagePipeline.tsx — 5-step lifecycle indicator
interface StagePipelineProps {
  steps: string[];           // ["Upload","Extract","Verify","Audit","Publish"]
  activeIndex: number;       // -1 = not started, 0..n-1 = in progress, n = complete
}

export function StagePipeline({ steps, activeIndex }: StagePipelineProps) {
  return (
    <ol className="inline-flex items-center gap-0 px-4 py-2 bg-white
                   border border-gray-200 rounded-full">
      {steps.map((s, i) => {
        const done = i < activeIndex;
        const curr = i === activeIndex;
        const color = done ? "text-green-500" : curr ? "text-amber-500" : "text-gray-400";

        return (
          <li key={s} className="flex items-center">
            <span className="flex items-center gap-1.5">
              <Dot done={done} curr={curr} />
              <span className={\`text-[12px] \${curr ? "font-bold" : ""} \${color}\`}>
                {s}
              </span>
            </span>
            {i < steps.length - 1 && (
              <span className="w-3.5 h-px bg-gray-200 mx-1.5" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Dot({ done, curr }: { done: boolean; curr: boolean }) {
  if (done) return <span className="w-2 h-2 rounded-full bg-green-500" />;
  if (curr) return <span className="w-2 h-2 rounded-full bg-amber-500" />;
  return <span className="w-2 h-2 rounded-full border-[1.5px] border-gray-200" />;
}

// Usage
<StagePipeline
  steps={["Upload","Extract","Verify","Audit","Publish"]}
  activeIndex={2}
/>`,

  // ── Parameter Drawer ──────────────────────────────────────────────────────
  drawer: `// ParameterDrawer.tsx — the core Trust Loop surface
import { X } from "lucide-react";

interface ParameterDrawerProps {
  parameter: {
    title: string;
    tiers: { name: string; active: boolean }[];
    extractedValue: string;
    confidence: "High" | "Medium" | "Low";
    yourValue: string;
    source: { doc: string; page: number; passage: string };
  };
  onClose: () => void;
  onResetToAI: () => void;
  onVerify: () => void;
  onOpenDoc: () => void;
}

export function ParameterDrawer({
  parameter, onClose, onResetToAI, onVerify, onOpenDoc,
}: ParameterDrawerProps) {
  const conf = parameter.confidence;
  const confColor =
    conf === "High"   ? "text-green-600" :
    conf === "Medium" ? "text-amber-500" : "text-red-500";

  return (
    <aside className="w-85 bg-white border-l border-gray-200
                      shadow-[-4px_0_16px_rgba(0,0,0,0.08)]">
      <header className="flex items-start justify-between p-5 border-b border-gray-200">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500 mb-1">
            Parameter
          </p>
          <h3 className="text-[16px] font-bold text-gray-900">{parameter.title}</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
          <X size={14} />
        </button>
      </header>

      <div className="p-5 flex flex-col gap-4.5">
        {/* Tier pills */}
        <div className="flex gap-2">
          {parameter.tiers.map(t => (
            <span key={t.name} className={\`px-2.5 py-1 rounded-full text-[12px]
                                           border \${t.active
                                             ? "bg-green-100 border-green-700 text-green-700 font-bold"
                                             : "border-gray-200 text-gray-900"}\`}>
              {t.name}
            </span>
          ))}
        </div>

        {/* Extracted value */}
        <Field
          label="Extracted Value"
          trailing={<span className={\`text-[10px] font-bold \${confColor}\`}>{conf} confidence</span>}
          variant="readonly"
        >
          {parameter.extractedValue}
        </Field>

        {/* Your value */}
        <Field label="Your Value" variant="input">
          {parameter.yourValue}
        </Field>

        {/* Action row */}
        <div className="flex gap-2.5">
          <button
            onClick={onResetToAI}
            className="flex-1 h-9 rounded-lg border border-gray-200 text-[12px] font-medium"
          >
            Reset to AI
          </button>
          <button
            onClick={onVerify}
            className="flex-[2] h-9 rounded-lg bg-green-700 text-white text-[12px] font-bold"
          >
            ✓  Mark verified
          </button>
        </div>

        {/* Source passage with bidirectional link */}
        <section>
          <header className="flex justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500">
              Source Passage
            </span>
            <button onClick={onOpenDoc} className="text-[10px] font-semibold text-green-700">
              Open document →
            </button>
          </header>
          <p className="text-[11px] text-gray-600 mb-2">
            □ {parameter.source.doc} · p. {parameter.source.page}
          </p>
          <blockquote className="px-2.5 py-2 rounded bg-yellow-100 text-[12px] leading-[1.45]">
            {parameter.source.passage}
          </blockquote>
        </section>
      </div>
    </aside>
  );
}

function Field({
  label, children, trailing, variant,
}: {
  label: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
  variant: "readonly" | "input";
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500">
          {label}
        </span>
        {trailing}
      </div>
      <div className={\`px-3 py-2 rounded-lg text-[13px]
                       \${variant === "readonly"
                         ? "bg-gray-50 text-gray-600"
                         : "bg-white text-gray-900 border border-gray-200"}\`}>
        {children}
      </div>
    </div>
  );
}

// Usage
<ParameterDrawer
  parameter={{
    title: "In-patient Hospitalisation",
    tiers: [{ name: "Mini", active: true }, { name: "Medi", active: false }, { name: "Max", active: false }],
    extractedValue: "Up to SI",
    confidence: "High",
    yourValue: "Up to SI",
    source: { doc: "D.I.Y Health policy wording.docx", page: 18,
              passage: "Hospitalisation expenses payable up to Sum Insured." },
  }}
  onClose={() => setOpen(false)}
  onResetToAI={resetToAI}
  onVerify={markVerified}
  onOpenDoc={() => openDoc("policy-wording.docx", 18)}
/>`,
};
