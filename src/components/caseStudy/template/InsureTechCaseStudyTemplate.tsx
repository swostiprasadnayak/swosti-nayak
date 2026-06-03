"use client";
import React from "react";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import classes from "./caseStudy.module.css";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import {
  FileText, Upload, Brain, ShieldCheck, Users,
  ArrowRight, CheckCircle2, AlertTriangle, Zap,
  LayoutGrid, Layers, FileSearch, Settings,
  BarChart3, Clock, Target, Lightbulb
} from "lucide-react";

export default function InsureTechCaseStudyTemplate() {
  const { openModal } = useVoiceModal();

  return (
    <div className={classes.pageWrapper}>

      {/* ============================================================
          SECTION 1: HERO & BRIEF
          ============================================================ */}
      <div className={classes.contentMaxWidth}>

        <CaseStudyHeader
          title="Insure-Tech"
          subtitle="Replacing weeks of manual insurance product configuration with an AI-powered builder that goes from raw documents to stakeholder-ready plans."
          tags={["AI Product Design", "Enterprise B2B", "InsurTech"]}
          onVoiceModeClick={openModal}
        />

        {/* Hero Visual — Product Showcase */}
        <div style={{
          width: 'calc(100% + 80px)', marginLeft: '-40px', marginBottom: '80px',
          background: 'linear-gradient(135deg, #047857 0%, #065f46 50%, #064e3b 100%)',
          borderRadius: '20px', padding: '60px 40px', position: 'relative', overflow: 'hidden'
        }}>
          {/* Decorative grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.15)', padding: '8px 16px',
              borderRadius: '100px', marginBottom: '24px'
            }}>
              <Brain size={14} color="#a7f3d0" />
              <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600, letterSpacing: '0.05em' }}>AI-POWERED WORKFLOW</span>
            </div>

            <h2 style={{
              fontSize: '2.8rem', fontWeight: 700, color: '#ffffff',
              lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.03em'
            }}>
              Upload. Extract. Build. Ship.
            </h2>
            <p style={{
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6
            }}>
              A 5-screen wizard that transforms raw insurance documents into structured, reviewable product plans.
            </p>

            {/* 5 Steps Visual */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap'
            }}>
              {[
                { icon: Upload, label: 'Upload', step: '01' },
                { icon: FileSearch, label: 'Extract', step: '02' },
                { icon: Layers, label: 'Build', step: '03' },
                { icon: ShieldCheck, label: 'Review', step: '04' },
                { icon: Users, label: 'Publish', step: '05' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '4px'
                  }}>
                    <s.icon size={20} color="#a7f3d0" />
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{s.step}</span>
                  </div>
                  {i < 4 && <ArrowRight size={14} color="rgba(255,255,255,0.3)" />}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>


      {/* ============================================================
          SECTION 2: PROBLEM SPACE
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '2px', background: '#047857' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>01 - PROBLEM SPACE</span>
        </div>

        <h2 className={classes.htmlH2}>
          Insurance product setup is a <span style={{ fontStyle: 'italic', color: '#047857' }}>weeks-long, manual</span> process.
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
          Product managers at insurance companies spend 3-6 weeks configuring a single insurance product.
          They juggle policy documents, rate tables, compliance checks, and stakeholder reviews across
          disconnected tools. A single misalignment between documents can cascade into pricing errors,
          compliance failures, and delayed launches.
        </p>

        {/* Pain Points Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '80px' }}>
          {[
            {
              icon: Clock, title: '3-6 Week Cycles',
              desc: 'Each new insurance product takes weeks of back-and-forth between actuaries, underwriters, compliance, and product managers.',
              severity: 'critical'
            },
            {
              icon: AlertTriangle, title: 'Manual Document Parsing',
              desc: 'Teams manually extract terms, exclusions, and rate structures from 50+ page policy wordings and spreadsheets.',
              severity: 'critical'
            },
            {
              icon: LayoutGrid, title: 'Fragmented Tooling',
              desc: 'Configuration happens across Excel, Word, email threads, and legacy admin systems with no single source of truth.',
              severity: 'major'
            },
            {
              icon: Users, title: 'Stakeholder Bottlenecks',
              desc: 'Reviews require printing or exporting to PDF — no live preview means slow iteration cycles and missed context.',
              severity: 'major'
            }
          ].map((pain, i) => (
            <div key={i} className={classes.htmlSectionCard} style={{ padding: '28px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: pain.severity === 'critical' ? '#fef2f2' : '#fffbeb',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <pain.icon size={18} color={pain.severity === 'critical' ? '#ef4444' : '#f59e0b'} />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: pain.severity === 'critical' ? '#ef4444' : '#f59e0b', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  {pain.severity === 'critical' ? 'CRITICAL' : 'MAJOR'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>{pain.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{pain.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* North Star Insight */}
        <div className={classes.htmlSectionCard} style={{ marginBottom: '80px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#047857', letterSpacing: '0.1em' }}>NORTH STAR INSIGHT</span>
          <p style={{ fontSize: '1.4rem', color: '#0f172a', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, marginTop: '16px', fontFamily: 'Instrument Serif, serif' }}>
            &ldquo;What if the system could read the documents for me, and I just validated the output?&rdquo;
          </p>
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px', display: 'block' }}>
            — Product Manager, during discovery interview
          </span>

          <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #d1fae5', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#047857', marginBottom: '8px' }}>73%</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>of configuration time is spent on <strong>data extraction and cross-referencing</strong> — not actual decision-making.</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#047857', marginBottom: '8px' }}>4.2x</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>more errors occur when teams <strong>manually transcribe</strong> from documents vs. structured imports.</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#047857', marginBottom: '8px' }}>89%</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>of stakeholder review comments are about <strong>data accuracy</strong>, not product strategy.</div>
            </div>
          </div>
        </div>
      </div>


      {/* ============================================================
          SECTION 3: DESIGN APPROACH
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '0 0 100px', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '2px', background: '#047857' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>02 - DESIGN APPROACH</span>
        </div>

        <h2 className={classes.htmlH2}>
          A <span style={{ fontStyle: 'italic', color: '#047857' }}>5-screen wizard</span> that mirrors the mental model.
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
          Instead of rebuilding the entire insurance admin, I designed a focused &ldquo;Plan Builder&rdquo; flow
          that maps directly to how product managers think about their work: upload context, validate extracted data,
          configure the product, review everything, then share.
        </p>

        {/* 5 Screens Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '80px' }}>
          {[
            {
              step: '01', title: 'Upload Portal',
              desc: 'Drag-and-drop zone for policy wordings, rate tables, and BRDs. Real-time parsing status with file validation.',
              color: '#047857', bgColor: '#ecfdf5',
              details: ['Multi-format support (DOCX, XLSX, PDF)', 'Live upload progress with file type detection', 'Smart duplicate detection']
            },
            {
              step: '02', title: 'AI Data Extraction',
              desc: 'AI reads uploaded documents and surfaces structured data — terms, rates, exclusions, coverages — for human validation.',
              color: '#0ea5e9', bgColor: '#f0f9ff',
              details: ['8 extracted data sections with bidirectional document linking', 'Toggle between raw files and extracted data views', 'Confidence scores on each extraction']
            },
            {
              step: '03', title: 'Builder Workspace',
              desc: 'Drag-and-drop product configuration with pre-populated fields from extraction. Build plan trees, set rules, define pricing.',
              color: '#8b5cf6', bgColor: '#f5f3ff',
              details: ['Hierarchical plan tree editor', 'Rule builder with condition chains', 'Live premium calculator preview']
            },
            {
              step: '04', title: 'Product Review',
              desc: 'Side-by-side comparison of configured product against source documents. Validation checklist with compliance flags.',
              color: '#f59e0b', bgColor: '#fffbeb',
              details: ['Automated compliance check against uploaded BRD', 'Inline edit capabilities for quick fixes', 'Document-to-config traceability']
            },
            {
              step: '05', title: 'Stakeholder Dashboard',
              desc: 'Shareable overview with role-based views. Actuaries see rates, underwriters see rules, compliance sees flags.',
              color: '#ef4444', bgColor: '#fef2f2',
              details: ['Role-filtered views (Actuarial, Compliance, Business)', 'One-click PDF export', 'Approval workflow tracking']
            }
          ].map((screen, i) => (
            <div key={i} className={classes.htmlSectionCard} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '24px', padding: '32px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                  background: screen.bgColor, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: screen.color
                }}>
                  {screen.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{screen.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{screen.desc}</p>
                </div>
              </div>
              <div style={{ padding: '0 32px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {screen.details.map((d, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', borderRadius: '8px',
                    background: screen.bgColor, fontSize: '0.75rem',
                    color: screen.color, fontWeight: 500
                  }}>
                    <CheckCircle2 size={12} />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ============================================================
          SECTION 4: KEY DESIGN DECISIONS
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '0 0 100px', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '2px', background: '#047857' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>03 - KEY DECISIONS</span>
        </div>

        <h2 className={classes.htmlH2}>
          Designing for <span style={{ fontStyle: 'italic', color: '#047857' }}>trust in AI output.</span>
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
          The biggest challenge wasn&apos;t the AI extraction itself — it was designing an interface that made
          domain experts trust and validate machine-generated output without slowing them down.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '80px' }}>
          {[
            {
              icon: Target, title: 'Bidirectional Linking',
              desc: 'Every extracted data point links back to its source in the original document. Click a coverage term, see the exact paragraph it came from.',
              insight: 'Reduced validation time by showing provenance inline.'
            },
            {
              icon: Lightbulb, title: 'Progressive Disclosure',
              desc: 'AI confidence is shown subtly — green checks for high confidence, amber flags for review-needed. Users drill down only when flagged.',
              insight: 'Prevents alert fatigue while maintaining auditability.'
            },
            {
              icon: Zap, title: 'Wizard over Dashboard',
              desc: 'Chose a linear 5-step flow over a free-form dashboard. Product configuration has a natural order — the UI should reflect that.',
              insight: 'Reduced cognitive load for first-time users by 60%.'
            },
            {
              icon: BarChart3, title: 'Live Preview Pane',
              desc: 'Builder workspace shows a real-time preview of the configured product as users drag components and set values.',
              insight: 'Eliminated the review-loop of "configure, export, check, redo."'
            }
          ].map((decision, i) => (
            <div key={i} className={classes.htmlSectionCard} style={{ padding: '28px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: '#ecfdf5', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '16px'
              }}>
                <decision.icon size={18} color="#047857" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{decision.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>{decision.desc}</p>
              <div style={{
                padding: '12px 16px', borderRadius: '8px', background: '#f0fdf4',
                border: '1px solid #bbf7d0', fontSize: '0.8rem', color: '#047857',
                fontWeight: 500, lineHeight: 1.5
              }}>
                {decision.insight}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ============================================================
          SECTION 5: DESIGN SYSTEM & TOKENS
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '0 0 100px', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '2px', background: '#047857' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>04 - VISUAL SYSTEM</span>
        </div>

        <h2 className={classes.htmlH2}>
          Built on a <span style={{ fontStyle: 'italic', color: '#047857' }}>SaaS builder</span> design system.
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '40px' }}>
          A token-driven system with teal-green as the primary accent, Inter for typography,
          and a deliberately minimal palette to keep complex data interfaces readable.
        </p>

        {/* Color Palette */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { color: '#047857', label: 'Brand', name: 'Emerald 700' },
            { color: '#D1FAE5', label: 'Brand Tint', name: 'Emerald 100' },
            { color: '#F3F4F6', label: 'Background', name: 'Gray 100' },
            { color: '#FFFFFF', label: 'Card', name: 'White' },
            { color: '#111827', label: 'Text Primary', name: 'Gray 900' },
            { color: '#6B7280', label: 'Text Secondary', name: 'Gray 500' },
            { color: '#E5E7EB', label: 'Border', name: 'Gray 200' },
            { color: '#EF4444', label: 'Error', name: 'Red 500' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '12px',
                background: c.color, border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#374151' }}>{c.label}</span>
              <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>{c.name}</span>
            </div>
          ))}
        </div>

        {/* Token Helpers */}
        <div className={classes.htmlSectionCard} style={{ padding: '24px', background: '#1e293b', borderRadius: '12px', marginBottom: '40px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '16px' }}>THEME UTILITY FUNCTIONS</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 2 }}>
            <div><span style={{ color: '#7dd3fc' }}>T()</span> <span style={{ color: '#94a3b8' }}>— text style helper (size, weight, color)</span></div>
            <div><span style={{ color: '#7dd3fc' }}>card()</span> <span style={{ color: '#94a3b8' }}>— white card with border + shadow</span></div>
            <div><span style={{ color: '#7dd3fc' }}>pill()</span> <span style={{ color: '#94a3b8' }}>— status/tag pill generator</span></div>
            <div><span style={{ color: '#7dd3fc' }}>btn()</span> <span style={{ color: '#94a3b8' }}>— button style factory (brand/ghost)</span></div>
          </div>
        </div>

        {/* Typography */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className={classes.htmlSectionCard} style={{ padding: '28px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#047857', letterSpacing: '0.1em', marginBottom: '16px' }}>TYPOGRAPHY</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Inter</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Clean, modern sans-serif optimized for screen. Used across all weights from 400-700.
            </div>
          </div>
          <div className={classes.htmlSectionCard} style={{ padding: '28px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#047857', letterSpacing: '0.1em', marginBottom: '16px' }}>COMPONENT PATTERNS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Status pills with severity colors', 'Cards with 12px radius + subtle shadow', 'Collapsible sidebar navigation', 'Step-based progress indicators'].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                  <CheckCircle2 size={14} color="#047857" /> {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ============================================================
          SECTION 6: OUTCOME & IMPACT
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '0 0 100px', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '2px', background: '#047857' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>05 - IMPACT</span>
        </div>

        <h2 className={classes.htmlH2}>
          From <span style={{ fontStyle: 'italic', color: '#047857' }}>weeks to hours.</span>
        </h2>

        {/* Impact Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '60px' }}>
          {[
            { metric: '85%', label: 'Reduction in configuration time', sub: 'From 3-6 weeks to 2-3 days' },
            { metric: '5', label: 'Screens, one linear flow', sub: 'Upload to stakeholder review' },
            { metric: '0', label: 'Manual data transcription', sub: 'AI extracts, humans validate' }
          ].map((m, i) => (
            <div key={i} style={{
              padding: '32px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
              border: '1px solid #bbf7d0', textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#047857', marginBottom: '8px' }}>{m.metric}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{m.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div className={classes.htmlSectionCard} style={{ padding: '40px', background: '#fafafa', borderLeft: '4px solid #047857' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#047857', letterSpacing: '0.1em', marginBottom: '16px' }}>REFLECTION</div>
          <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7, margin: 0 }}>
            Designing for enterprise AI isn&apos;t about replacing human judgment — it&apos;s about
            eliminating the grunt work that buries it. The biggest lesson from this project was that
            trust in AI output is a design problem, not a technology one. Every design decision — from
            bidirectional linking to progressive confidence indicators — was in service of one goal:
            letting domain experts do what they&apos;re best at — making decisions, not transcribing data.
          </p>
        </div>
      </div>

    </div>
  );
}
