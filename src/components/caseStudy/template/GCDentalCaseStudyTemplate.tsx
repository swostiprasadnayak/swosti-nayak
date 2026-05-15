"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import classes from "./caseStudy.module.css";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import { 
  Search, ShieldAlert, FileText,
  Stethoscope, Settings, Microscope, ClipboardList,
  CheckCircle2, XCircle, ArrowRight,
  Download, Globe, Smartphone, Building2,
  Check, X, FileSearch, MessageSquare, ListTree,
  AlertTriangle, Zap, CheckCircle, Database
} from "lucide-react";

export default function GCDentalCaseStudyTemplate() {
  const { openModal } = useVoiceModal();

  return (
    <div className={classes.pageWrapper}>
      
      {/* ============================================================
          SECTION 1: HERO & BRIEF 
          ============================================================ */}
       <div className={classes.contentMaxWidth}>
         
         <CaseStudyHeader 
            title="GC Dental"
            subtitle="The silent user problem: 4 of 5 dental professionals left without finding what they needed."
            tags={["B2B Healthcare", "Web Redesign", "Design System"]}
            onVoiceModeClick={openModal}
         />

         {/* Hero Image */}
         <Squircle cornerRadius={24} style={{ width: '100%', overflow: 'hidden', marginBottom: '100px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <img src="/unicef-hero-container.png" alt="GC Dental Portal" style={{ width: '100%', height: 'auto', display: 'block' }} onError={(e) => e.currentTarget.style.display = 'none'} />
         </Squircle>
      </div>


      {/* ============================================================
          SECTION 2: PROBLEM STATEMENT & RESEARCH
          ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <div style={{ width: '24px', height: '2px', background: '#00B494' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>01 - PROBLEM STATEMENT & RESEARCH</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            Users come to <span style={{ fontStyle: 'italic', color: '#00B494' }}>verify,</span><br/>
            not discover.
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            Before touching a single component, I needed to understand why a global dental brand was losing users in silence. Two research methods. One converging insight.
          </p>

          {/* Core Problem Block */}
          <Squircle cornerRadius={16} style={{ background: '#f0fdfa', padding: '48px', boxShadow: 'inset 0 0 0 1.5px #99f6e4', marginBottom: '60px' }}>
             <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0d9488', letterSpacing: '0.1em' }}>NORTH STAR INSIGHT</span>
             <p style={{ fontSize: '1.4rem', color: '#0f172a', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, marginTop: '16px', fontFamily: 'Instrument Serif, serif' }}>
               "I just need the information — fast."
             </p>
             <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px', display: 'block' }}>— General Dentist, on-site between patient appointments (Usability Session 3)</span>
             
             <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #ccfbf1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
               <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00B494', marginBottom: '8px' }}>4/5</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}><strong>started with Google or peer recommendations</strong> — the GC site was their verification stop, not their discovery start.</div>
               </div>
               <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00B494', marginBottom: '8px' }}>5/5</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}><strong>scanned the PDP hero first</strong>, looking for product name and image before anything else.</div>
               </div>
               <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00B494', marginBottom: '8px' }}>3/5</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>would <strong>abandon if IFU wasn't one-click</strong> from the product page — the most critical failure we found.</div>
               </div>
             </div>
          </Squircle>

          {/* User Journey Map */}
          <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '80px', background: '#fff' }}>
            {[
              { icon: '🔍', title: 'Google / Peers', desc: 'Where discovery happens — 4/5 users start here' },
              { icon: '📄', title: 'Clinical Literature', desc: 'Specialists check evidence databases & journals' },
              { icon: '🦷', title: 'GC Website', desc: 'Verification layer — "Does this product do what I heard?"', active: true },
              { icon: '✅', title: 'Verify & Convert', desc: 'Find IFU → Find dealer → Request demo' },
              { icon: '❌', title: 'Silent Abandon', desc: 'No feedback. They just leave — 4/5 when IFU was hidden' }
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, padding: '24px 16px', textAlign: 'center', borderRight: i < 4 ? '1px solid #e2e8f0' : 'none', background: step.active ? '#f0fdfa' : 'transparent' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{step.icon}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: step.active ? '#0d9488' : '#1e293b', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Research Methods Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '100px' }}>
            
            {/* Heuristic Evaluation */}
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
                 <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>01</div>
                 <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', margin: '0 0 8px 0' }}>Heuristic Evaluation</h3>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Systematic review of existing homepage against Nielsen's 10 usability heuristics. Benchmarked against 3 competitors.</p>
                 </div>
              </div>
              <div style={{ padding: '24px', background: '#f8fafc', flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 {[
                   { title: 'Visibility of System Status', desc: 'Carousel has no progress indicators. Card states missing.' },
                   { title: 'User Control + Freedom', desc: 'Education redirects without warning. Users expect in-place expansion.' },
                   { title: 'Recognition not Recall', desc: 'Navigation requires memorizing product names. No taxonomy.' },
                   { title: 'Flexibility + Efficiency', desc: 'Hero lacks quick access to IFU or regional support.' }
                 ].map((fail, idx) => (
                   <div key={idx} style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '16px', borderRadius: '8px' }}>
                     <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#e11d48', letterSpacing: '0.05em', marginBottom: '8px' }}>FAILURE 0{idx+1} · MAJOR</div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111', marginBottom: '4px' }}>{fail.title}</div>
                     <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{fail.desc}</div>
                   </div>
                 ))}
              </div>
            </Squircle>

            {/* Usability Testing */}
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
                 <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>02</div>
                 <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', margin: '0 0 8px 0' }}>Usability Testing</h3>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>5 participants. Remote moderated. 45-min sessions. Task-based testing of 13 hypotheses across Europe & Australia.</p>
                 </div>
              </div>
              <div style={{ padding: '24px', background: '#f8fafc', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {[
                   { color: '#e11d48', bold: 'Critical: IFU was hidden.', text: '4 of 5 users said IFU was their first need. 3 of 5 would abandon if not one-click accessible.' },
                   { color: '#e11d48', bold: 'Critical: PDP hero was unclear.', text: 'All 5 users scanned the hero first. 3 of 5 paused and asked "What product is this?"' },
                   { color: '#0ea5e9', bold: 'Important: Visual clarity drives credibility.', text: '4 users said the design looked "dated", reducing trust in clinical claims.' },
                   { color: '#0ea5e9', bold: 'Important: 3 user archetypes emerged.', text: 'One PDP can\'t serve all equally without prioritization decisions.' },
                   { color: '#10b981', bold: 'Success: 4/5 completed tasks without help.', text: '"Remaining issues don\'t prevent use — they reduce confidence." Confidence was the real metric.' }
                 ].map((find, idx) => (
                   <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: idx < 4 ? '1px solid #e2e8f0' : 'none' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: find.color, marginTop: '6px', flexShrink: 0 }} />
                     <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}><strong style={{ color: '#111' }}>{find.bold}</strong> {find.text}</div>
                   </div>
                 ))}
              </div>
            </Squircle>
          </div>

       </div>
       
       {/* ============================================================
           SECTION 3: BEHAVIORAL ARCHETYPES & BENCHMARKING
           ============================================================ */}
       <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#00B494', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>02 - 4 BEHAVIORAL ARCHETYPES</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
               Not demographics. <span style={{ fontStyle: 'italic', color: '#00B494' }}>Behaviors.</span>
             </h2>
             <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%', marginBottom: '40px' }}>
               Each persona maps to specific heuristic failures and drove real component decisions.
             </p>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '100px' }}>
               {[
                 { 
                   icon: <Stethoscope size={20} color="#00B494" />,
                   title: "General Dentist", 
                   persona: "\"Prove it to me\"",
                   quote: "As a busy dentist, I need to quickly compare products, access clinical resources, and manage orders between patients.",
                   implication: "Clinical evidence visible on PDP hero. Side-by-side product comparison."
                 },
                 { 
                   icon: <Settings size={20} color="#00B494" />,
                   title: "Procurement Officer", 
                   persona: "\"Just give me the docs\"",
                   quote: "I need bulk orders, volume pricing, invoice history — the current system is slow and lacks repeat-order tools.",
                   implication: "SKU grid (3-column, paginated) with tabbed filters. Volume pricing visible."
                 },
                 { 
                   icon: <Microscope size={20} color="#00B494" />,
                   title: "Dental Specialist", 
                   persona: "\"Show me the evidence\"",
                   quote: "I need specialty-specific products, comparative studies, and the ability to bookmark clinical content for later.",
                   implication: "Specialty taxonomy in navigation. Documents section with tab filters."
                 },
                 { 
                   icon: <ClipboardList size={20} color="#00B494" />,
                   title: "Practice Manager", 
                   persona: "\"Tell me fast\"",
                   quote: "Managing multiple clinics — I need team permissions, spending breakdowns, and workflow accountability tools.",
                   implication: "Jump-to navigation (11 sections). IFU one-click above fold. No cognitive overhead."
                 }
               ].map((card, i) => (
                  <Squircle key={i} cornerRadius={16} style={{ background: '#fff', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {card.icon}
                    </div>
                    <div>
                       <span style={{ fontSize: '0.65rem', color: '#00B494', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{card.persona}</span>
                       <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '4px 0 0 0' }}>{card.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, fontStyle: 'italic', borderLeft: '2px solid #e2e8f0', paddingLeft: '12px', margin: 0 }}>"{card.quote}"</p>
                    <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginTop: 'auto' }}><strong style={{ color: '#0d9488', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>→ Design Decision</strong>{card.implication}</div>
                  </Squircle>
               ))}
             </div>

             {/* Competitive Benchmarking Table */}
             <div style={{ marginTop: '40px' }}>
               <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#00B494', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>COMPETITIVE BENCHMARKING</span>
               <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>GC vs. the field</h2>
               
               <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                   <thead>
                     <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                       <th style={{ padding: '16px', fontWeight: 600, color: '#475569', width: '20%' }}>Category</th>
                       <th style={{ padding: '16px', fontWeight: 700, color: '#00B494', width: '20%' }}>GC Dental (Before)</th>
                       <th style={{ padding: '16px', fontWeight: 600, color: '#475569', width: '20%' }}>Dentsply Sirona</th>
                       <th style={{ padding: '16px', fontWeight: 600, color: '#475569', width: '20%' }}>Ivoclar</th>
                       <th style={{ padding: '16px', fontWeight: 600, color: '#475569', width: '20%' }}>3M</th>
                     </tr>
                   </thead>
                   <tbody>
                     {[
                       { cat: "Clinical evidence visibility", gc: "🔴 Poor — buried in resources", ds: "🟢 Case studies on PDP", iv: "🟡 Clinical tabs on select PDPs", m3: "🟢 Publication links on hero" },
                       { cat: "Search & filter taxonomy", gc: "🔴 Keyword only, broad results", ds: "🟡 Category filter, no specialty", iv: "🟢 Specialty + material type", m3: "🟢 Taxonomy + guided search" },
                       { cat: "Document accessibility", gc: "🔴 'Resources & IFU' (vague)", ds: "🟡 PDF download, limited states", iv: "🟢 Tabbed, filterable", m3: "🟢 Product-integrated doc viewer" },
                       { cat: "Mobile navigation patterns", gc: "🟡 Inconsistent across devices", ds: "🟡 Mobile nav, not optimized", iv: "🟢 Mobile-first patterns", m3: "🟡 Responsive, not mobile-first" },
                       { cat: "PDP product clarity", gc: "🔴 Corporate hero, no product name", ds: "🟢 Product name + image visible", iv: "🟢 Clear product hierarchy", m3: "🟡 Clear but not sticky on scroll" }
                     ].map((row, idx) => (
                       <tr key={idx} style={{ borderBottom: idx < 4 ? '1px solid #f1f5f9' : 'none' }}>
                         <td style={{ padding: '16px', color: '#475569', fontWeight: 500 }}>{row.cat}</td>
                         <td style={{ padding: '16px', color: '#0f172a', fontWeight: 600 }}>{row.gc}</td>
                         <td style={{ padding: '16px', color: '#64748b' }}>{row.ds}</td>
                         <td style={{ padding: '16px', color: '#64748b' }}>{row.iv}</td>
                         <td style={{ padding: '16px', color: '#64748b' }}>{row.m3}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
       </div>

       {/* ============================================================
           SECTION 4: SHOWSTOPPERS & DESIGN DECISIONS
           ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
             <div style={{ width: '24px', height: '2px', background: '#e11d48' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#e11d48', letterSpacing: '0.1em' }}>03 - SHOWSTOPPER 01 OF 02</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            "Instructions for Use"<br/>
            were <span style={{ fontStyle: 'italic', color: '#e11d48' }}>nowhere to be found.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            4 of 5 users came to GC Dental specifically to find IFU or clinical documentation. 3 of 5 would leave the site entirely if they couldn't find it in 2 clicks. It was buried under an unclear label, 3+ scrolls below the fold.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
             {/* Before */}
             <Squircle cornerRadius={16} style={{ background: '#fff', boxShadow: 'inset 0 0 0 1.5px #fecdd3', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#e11d48', letterSpacing: '0.1em', display: 'inline-block', padding: '4px 10px', background: '#fff1f2', borderRadius: '100px', alignSelf: 'flex-start' }}>BEFORE</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: 0 }}>Resources & IFU — Buried, mislabeled</h3>
                
                <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #cbd5e1', marginBottom: '16px' }}>
                   <Database size={32} color="#94a3b8" style={{ marginBottom: '12px' }} />
                   <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Screenshot: Old Resources</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   {[
                     "Label 'Resources & IFU' is ambiguous",
                     "Located below fold — 4+ scrolls from hero",
                     "No tab filtering — IFU and brochures mixed",
                     "No checkbox for bulk download"
                   ].map((pt, j) => (
                     <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                       <XCircle size={16} color="#e11d48" style={{ marginTop: '2px', flexShrink: 0 }} />
                       <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{pt}</span>
                     </li>
                   ))}
                </ul>
             </Squircle>
             
             {/* After */}
             <Squircle cornerRadius={16} style={{ background: '#fff', boxShadow: 'inset 0 0 0 1.5px #bbf7d0', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#16a34a', letterSpacing: '0.1em', display: 'inline-block', padding: '4px 10px', background: '#f0fdf4', borderRadius: '100px', alignSelf: 'flex-start' }}>AFTER</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: 0 }}>Documents & Manuals — One click, filterable</h3>
                
                <div style={{ height: '200px', background: '#f0fdf4', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #bbf7d0', marginBottom: '16px' }}>
                   <CheckCircle size={32} color="#16a34a" style={{ marginBottom: '12px' }} />
                   <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>Your Design: IFU 3x3 Grid</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   {[
                     "Renamed 'Documents & Manuals' — explicit",
                     "Visible in sticky jump-to nav from anywhere",
                     "5 tab filters let users narrow document type",
                     "Bulk checkbox + download — 9 cards per grid"
                   ].map((pt, j) => (
                     <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                       <CheckCircle2 size={16} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                       <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{pt}</span>
                     </li>
                   ))}
                </ul>
             </Squircle>
          </div>

          {/* Decision Chain Table */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Research → Decision Chain</h3>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '64px' }}>
             {[
               { label: "Research Insight", val1: "4/5 users need IFU or clinical docs first. 3/5 abandon if not found.", val2: "Users scan the PDP hero expecting a 'Documents' link, not 4 sections below." },
               { label: "Design Decision", val1: "Rename: 'Resources & IFU' → 'Documents & Manuals.' Explicit, no ambiguity.", val2: "Relocate: Add 'Documents' link to jump-to navigation sticky bar." },
               { label: "Component", val1: "IFU Card: 3×3 grid, 4 states (Default, Hover, Selected, Focus).", val2: "Tab filter system: 5 tabs to narrow doc type without scrolling a list." },
               { label: "Outcome", val1: "Documents section is now 1-click from PDP hero via sticky nav.", val2: "Task success on finding IFU is a direct path. (Post-test validation)." }
             ].map((row, i) => (
               <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                  <div style={{ padding: '20px', borderRight: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center' }}>{row.label}</div>
                  <div style={{ padding: '20px', borderRight: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{row.val1}</div>
                  <div style={{ padding: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{row.val2}</div>
               </div>
             ))}
          </div>

          {/* Component Deep Dive: IFU Card */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Component Deep Dive: IFU Card (4 States)</h3>
          <Squircle cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', overflow: 'hidden', marginBottom: '100px' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>IFU Document Card</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Used in: Documents & Manuals section · Desktop (410px) & Mobile (350px)</div>
               </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #e2e8f0' }}>
               {[
                 { state: "Default", name: "Resting State", desc: "Card visible, download CTA, document type tag, file info." },
                 { state: "Hover", name: "Interaction Hint", desc: "Subtle elevation shadow, CTA color shifts to primary." },
                 { state: "Selected", name: "Bulk Download", desc: "Checkbox checked, card background tints teal." },
                 { state: "Focus", name: "Keyboard Nav", desc: "2px focus ring appears for keyboard accessibility (WCAG 2.1 AA)." }
               ].map((st, i) => (
                 <div key={i} style={{ padding: '24px', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', padding: '4px 8px', background: '#f1f5f9', borderRadius: '4px', marginBottom: '12px', display: 'inline-block' }}>{st.state}</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{st.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{st.desc}</div>
                 </div>
               ))}
            </div>
            <div style={{ padding: '24px', background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
               <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>DOCUMENT TYPE</span><code style={{ fontSize: '0.8rem', color: '#00B494', background: '#f0fdfa', padding: '2px 6px', borderRadius: '4px' }}>"IFU" | "Manual" | "Safety"</code></div>
               <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>LANGUAGES</span><code style={{ fontSize: '0.8rem', color: '#00B494', background: '#f0fdfa', padding: '2px 6px', borderRadius: '4px' }}>["EN", "DE", "FR"]</code></div>
               <div><span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>IS ARCHIVED</span><code style={{ fontSize: '0.8rem', color: '#00B494', background: '#f0fdfa', padding: '2px 6px', borderRadius: '4px' }}>Boolean (Disables CTA)</code></div>
            </div>
          </Squircle>

          {/* Showstopper 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
             <div style={{ width: '24px', height: '2px', background: '#e11d48' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#e11d48', letterSpacing: '0.1em' }}>04 - SHOWSTOPPER 02 OF 02</span>
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            The product page didn't know<br/>
            which product <span style={{ fontStyle: 'italic', color: '#00B494' }}>it was showing.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            All 5 users scanned the PDP hero first. 3 of 5 paused mid-task and asked "What product is this?" — before reading a single line. A corporate hero image was the first impression instead of a product name.
          </p>

          {/* Two Templates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
            <Squircle cornerRadius={16} style={{ background: '#f8fafc', boxShadow: 'inset 0 0 0 1px #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#00B494', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>TEMPLATE A: PDP DETAILED</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                For complex equipment like Aadva IOS Scanner or G-ænial Injectable. Includes full clinical imagery, video, Sticky Cart, Jump-to Nav (11 sections), Indications, Advantages, SKU Grid (paginated), Documents & Manuals.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {["Hero + Media Slider", "Sticky Cart (Scroll-aware)", "Jump-to Navigation (11 sections)", "SKU Grid (Lightbox Modal)", "Documents & Manuals"].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00B494' }}/> {item}
                  </li>
                ))}
              </ul>
            </Squircle>
            <Squircle cornerRadius={16} style={{ background: '#f8fafc', boxShadow: 'inset 0 0 0 1px #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#00B494', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>TEMPLATE B: PDP SIMPLE</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                For preventive materials like Fuji Triage. Simpler content block with Hero Image + Text, Sticky Cart, Jump-to Nav. No SKU grid, as the product is simpler. Documents & Manuals grid remains the same.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {["Hero (Image + Text)", "Sticky Cart (Simpler content)", "Jump-to Navigation (11 sections)", "NO SKU Grid (Product is simple)", "Documents & Manuals"].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: idx === 3 ? '#94a3b8' : '#334155', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: idx === 3 ? '#cbd5e1' : '#00B494' }}/> 
                    {item}
                  </li>
                ))}
              </ul>
            </Squircle>
          </div>

          {/* Component Deep Dive: Sticky Cart */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Key Component: PDP Top Sticky Cart</h3>
          <Squircle cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', overflow: 'hidden', marginBottom: '100px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
               {[
                 { state: "Expanded", name: "On Scroll Up", desc: "297px height. Full product card: name, image, description, SKU, award badges, CTAs. User looking for context." },
                 { state: "Collapsed", name: "On Scroll Down", desc: "98px height. Minimal: product name + small image + primary CTA. User reading content — stay out of the way." },
                 { state: "Mobile", name: "390px Viewport", desc: "Stacked layout. 392px height expanded. Full touch targets (48px+). Same 3 CTAs." }
               ].map((st, i) => (
                 <div key={i} style={{ padding: '24px', borderRight: i < 2 ? '1px solid #e2e8f0' : 'none' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: i === 2 ? '#6366f1' : '#00B494', letterSpacing: '0.05em', padding: '4px 8px', background: i === 2 ? '#e0e7ff' : '#f0fdfa', borderRadius: '4px', marginBottom: '12px', display: 'inline-block' }}>{st.state}</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{st.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{st.desc}</div>
                 </div>
               ))}
            </div>
            <div style={{ padding: '20px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
               <strong style={{ color: '#0f172a' }}>The "So What":</strong> Product name and image are always visible. Users never lose context of which product they're reading about. Especially critical on long PDPs with 11+ sections.
            </div>
          </Squircle>

          {/* AI Search (Bonus) */}
          <div style={{ padding: '64px 48px', background: '#0f172a', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,180,148,0.15) 0%, transparent 70%)' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#00B494', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>→ FORWARD THINKING</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>The search problem, solved with AI.</h2>
             <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '80%', marginBottom: '40px' }}>
               Research showed users come with a specific product in mind. But when they search, results are too broad. I designed an AI-powered search layer that goes from keyword to clinical recommendation in 2 steps.
             </p>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <Zap size={20} color="#eab308" />
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>AI Assistant Flow</div>
                   </div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> User types "adhesive" → AI shows specialty-specific suggestions</li>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> Conversational recommendation via chat interface</li>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> Smart scoring: 95% Products · 80% Events · 0% Careers</li>
                   </ul>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <Search size={20} color="#0ea5e9" />
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Smart Search States</div>
                   </div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> Recent searches surface last 3 sessions (returning users)</li>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> Suggested searches: Aadva IOS / Preferred Milling Partners</li>
                      <li style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '8px' }}><Check size={16} color="#00B494" style={{ flexShrink: 0, marginTop: '2px' }}/> Tab filters: All / Products / Events / Education / News</li>
                   </ul>
                </div>
             </div>
          </div>
       </div>

       {/* ============================================================
           SECTION 5: SYSTEM AND SCALE
           ============================================================ */}
        <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '100px 0' }}>
          <div className={classes.contentMaxWidth} style={{ maxWidth: '1200px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '60px', marginBottom: '60px' }}>
                <div>
                   <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#00B494', letterSpacing: '0.1em', display: 'block' }}>04 - DESIGN SYSTEM</span>
                   <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '16px 0' }}>
                     From pages to rules.<br/>
                     From rules <span style={{ fontStyle: 'italic', color: '#00B494' }}>to scale.</span>
                   </h2>
                   <div style={{ background: '#f0fdfa', padding: '24px', borderRadius: '12px', border: '1.5px solid #99f6e4', color: '#0f172a', fontWeight: 500, fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.4, marginTop: '24px' }}>
                     "1 template → 100+ product pages. No redesign needed."
                   </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                     100+ dental products. 30+ regional websites. 4 persona types. You can't design each page. You design the system that designs the pages.
                   </p>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[
                        { color: '#00B494', text: '30+ Component Types' },
                        { color: '#00B494', text: '100+ Variants' },
                        { color: '#00B494', text: '2 Breakpoints' },
                        { color: '#00B494', text: '30+ Regional Variants' }
                      ].map((tag, i) => (
                         <span key={i} style={{ padding: '6px 14px', boxShadow: 'inset 0 0 0 1px #e2e8f0', background: '#fff', borderRadius: '100px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tag.color }} />
                            {tag.text}
                         </span>
                      ))}
                   </div>
                </div>
             </div>

              {/* Architecture Pyramid */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginBottom: '24px' }}>Component Architecture: Atoms to Pages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 {[
                   { level: 5, name: "Pages", count: "5+ pages", items: ["PDP Detailed", "PDP Simple", "Homepage", "Resource Hub", "Language Selector"] },
                   { level: 4, name: "Templates (Orchestrations)", count: "7 templates", items: ["PDP Detailed Template", "PDP Simple Template", "Corp Page Template", "Blog Template"] },
                   { level: 3, name: "Organisms (Complex Components)", count: "14 organisms", items: ["PDP Top Sticky Cart", "Jump-to Navigation (11 sections)", "IFU Grid", "Media Slider"] },
                   { level: 2, name: "Molecules (Reusable Elements)", count: "16+ molecules", items: ["IFU Card (4 states)", "SKU Info Card (5 variants)", "Body Card", "Indications Badge"] },
                   { level: 1, name: "Atoms (Design Tokens)", count: "Foundation", items: ["Color Tokens", "Typography Scale", "Spacing Grid", "Shadows", "Icon Library"] }
                 ].map((tier, i) => (
                   <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00B494', opacity: 0.5, width: '40px' }}>{tier.level}</div>
                      <div style={{ width: '250px' }}>
                         <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{tier.name}</div>
                         <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{tier.count}</div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flexGrow: 1 }}>
                         {tier.items.map((item, j) => (
                           <span key={j} style={{ fontSize: '0.8rem', color: '#475569', background: '#f8fafc', padding: '4px 12px', borderRadius: '100px', border: '1px solid #e2e8f0' }}>{item}</span>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
          </div>
       </div>

       {/* ============================================================
           SECTION 6: REFLECTION
           ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
             <div style={{ width: '24px', height: '2px', background: '#00B494' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>05 - REFLECTION</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            What designing for experts<br/>
            <span style={{ fontStyle: 'italic', color: '#00B494' }}>taught me.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            B2C design teaches you to hide complexity. B2B healthcare taught me that expert users want control, not simplicity — and that the difference between the two is everything.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '64px' }}>
             <Squircle cornerRadius={20} style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #e2e8f0', padding: '32px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1, marginBottom: '16px' }}>01</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>Research changes how you prioritize.</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                   Before usability testing, I thought the problem was "users don't understand the navigation." After testing, the real problem was "users arrive late in their journey and need verification tools, not discovery tools." That single reframe shifted everything: PDP focus over homepage storytelling, IFU prominence over marketing visuals, search over browse.
                </p>
             </Squircle>
             
             <Squircle cornerRadius={20} style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #e2e8f0', padding: '32px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1, marginBottom: '16px' }}>02</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>Systems thinking is a multiplier, not a constraint.</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                   My first instinct was to redesign every page with full control. My team pushed back: "Build a system first." I resisted — I wanted to pixel-polish. But building the system meant iterating faster, scaling to 30+ regions without multiplying work, and responding to stakeholder feedback by changing one component, not 30 pages.
                </p>
             </Squircle>
          </div>

          {/* If I could do it again */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '40px', marginBottom: '80px' }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>If I could do it again</span>
             <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#92400e', margin: '0 0 16px 0' }}>I'd add competitive usability testing, not just heuristic benchmarking.</h4>
             <p style={{ fontSize: '0.9rem', color: '#92400e', lineHeight: 1.6, margin: 0 }}>
               We benchmarked Dentsply and Ivoclar visually and evaluated their heuristics. But we never tested our actual users on their sites to see what patterns they found intuitive. "What works for our users" is more valuable than "what's popular in dental design." That's a research gap, not a design gap — and it's fixable in week 2 of any future discovery sprint.
             </p>
          </div>

          {/* 90 Second Interview Story */}
          <Squircle cornerRadius={24} style={{ background: '#0f172a', padding: '48px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#00B494' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#00B494', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>The 90-Second Interview Story</span>
             <h3 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#fff', margin: '0 0 32px 0', fontFamily: 'Playfair Display, serif' }}>If you ask me "tell me about this project" in an interview, here's exactly what I'll say:</h3>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               {[
                 <>I worked on a B2B healthcare website redesign where the core problem wasn't what the client thought — <span style={{ color: '#00B494' }}>4 of 5 dental professionals arrived late in their research journey, looking to verify a decision, not explore the brand.</span></>,
                 <>I ran heuristic evaluation and usability testing and found <span style={{ color: '#00B494' }}>two critical blockers: IFU was buried, and the product page hero didn't communicate which product you were on</span> — both causing silent abandonment.</>,
                 <>I solved them with two research-backed components: a <span style={{ color: '#00B494' }}>redesigned Documents & Manuals grid (one-click from anywhere) and two PDP templates (Simple and Detailed)</span> with a sticky product cart that follows you through 11 sections.</>,
                 <>Then I scaled this into a <span style={{ color: '#00B494' }}>30+ component design system across 2 breakpoints and 30+ regions</span> — so the team ships faster, stays consistent, and never designs the same component twice.</>
               ].map((text, i) => (
                 <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: '24px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#00B494', opacity: 0.6 }}>{i+1}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 300, color: '#cbd5e1', lineHeight: 1.6 }}>{text}</div>
                 </div>
               ))}
             </div>
             
             <div style={{ marginTop: '24px', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>Practice saying this out loud. Time it. It should take 90–120 seconds. Land the pauses. Own it.</div>
          </Squircle>

       </div>

    </div>
  );
}
