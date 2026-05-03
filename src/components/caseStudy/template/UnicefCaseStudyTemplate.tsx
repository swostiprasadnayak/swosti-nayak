"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import CaseStudyHeader from "../blocks/CaseStudyHeader";
import InteractivePortalWindow from "../blocks/InteractivePortalWindow";
import classes from "./caseStudy.module.css";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import { 
  Search, ShieldAlert, Clock, ArrowUpRight, CheckCircle2, 
  Map, Fingerprint, Database, Copy, Briefcase, FileText, Globe, Key, LayoutGrid, Check, Info, FileSpreadsheet, Compass,
  Layers, AlertTriangle, ChevronDown
} from "lucide-react";

export default function UnicefCaseStudyTemplate() {
  const { openModal } = useVoiceModal();

  return (
    <div className={classes.pageWrapper}>
      
      {/* ============================================================
          SECTION 1: HERO & BRIEF 
          ============================================================ */}
       <div className={classes.contentMaxWidth}>
         
         <CaseStudyHeader 
            title="Unicef"
            subtitle="Building a global education data portal with AI to track learning outcomes for every child."
            tags={["Client Project", "Data Viz", "UX & Engineering"]}
            onVoiceModeClick={openModal}
         />

         {/* Hero Image */}
         <Squircle cornerRadius={24} style={{ width: '100%', overflow: 'hidden', marginBottom: '80px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <img src="/unicef-hero-container.png" alt="Unicef Portal" style={{ width: '100%', height: 'auto', display: 'block' }} onError={(e) => e.currentTarget.style.display = 'none'} />
         </Squircle>
      </div>


      {/* ============================================================
          SECTION 2: PROBLEM STATEMENT
          ============================================================ */}
       {/* ============================================================
           SECTION 2: PROBLEM STATEMENT
           ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '80px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>01 - PROBLEM STATEMENT</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            The data existed.<br/>
            The <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>access layer</span> didn't.
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            The data existed. The access layer didn't. 190 countries, 120+ indicators and no unified way to reach any of it.
          </p>

          {/* 3 Pillar Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
             {/* Card 1 */}
             <Squircle cornerRadius={16} style={{ background: '#fff', border: '1.5px solid #fecdd3', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                <Search size={24} color="#e11d48" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e11d48', letterSpacing: '0.05em' }}>DISCOVERABILITY FAILURE</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                  No unified search. No taxonomy. Data scattered across PDFs, dashboards, and microsites with no cross-referencing.
                </p>
                <div style={{ background: '#fff1f2', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #e11d48', fontSize: '0.85rem', fontStyle: 'italic', color: '#be123c' }}>
                  "I spent two hours triangulating a single indicator before I could start my analysis."
                </div>
             </Squircle>

             {/* Card 2 */}
             <Squircle cornerRadius={16} style={{ background: '#fff', border: '1.5px solid #fef08a', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                <ShieldAlert size={24} color="#ca8a04" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ca8a04', letterSpacing: '0.05em' }}>TRUST & CITATION BREAKDOWN</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                  No methodology links. No provenance. Researchers couldn't formally cite UNICEF data without emailing the team and waiting days.
                </p>
                <div style={{ background: '#fefce8', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #ca8a04', fontSize: '0.85rem', fontStyle: 'italic', color: '#a16207' }}>
                  "I couldn't put this in a peer-reviewed paper without knowing the methodology."
                </div>
             </Squircle>

             {/* Card 3 */}
             <Squircle cornerRadius={16} style={{ background: '#fff', border: '1.5px solid #fed7aa', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                <Clock size={24} color="#ea580c" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ea580c', letterSpacing: '0.05em' }}>EDITORIAL BOTTLENECK</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                  Every chart update required a developer ticket. 3-week queue for 5-minute changes. Zero editorial autonomy.
                </p>
                <div style={{ background: '#fff7ed', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #ea580c', fontSize: '0.85rem', fontStyle: 'italic', color: '#c2410c' }}>
                  "I raised a Jira ticket three weeks ago to change the default year on one chart."
                </div>
             </Squircle>
          </div>

          {/* Core Problem Block */}
          <Squircle cornerRadius={16} style={{ background: '#f0f9ff', padding: '48px', border: '1px solid #bae6fd', marginBottom: '80px' }}>
             <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0284c7', letterSpacing: '0.1em' }}>CORE PROBLEM STATEMENT</span>
             <p style={{ fontSize: '1.4rem', color: '#0f172a', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, marginTop: '16px', fontFamily: 'Instrument Serif, serif' }}>
               "No accessible, unified interface to UNICEF's own data. The editorial team can't publish without a developer. The people who can act on the data can't reach it."
             </p>
             <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px', display: 'block' }}> Problem framing synthesised from RFP brief & stakeholder documentation</span>
          </Squircle>

          {/* Big Stats */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '80px', marginBottom: '80px' }}>
             <h3 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#111', marginBottom: '40px', textAlign: 'center' }}>
               Education data remains <span style={{ fontStyle: 'italic', color: '#e11d48' }}>inaccessible</span> at a global scale.
             </h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {[
                  { num: "617M", val: "Children who cannot read a simple text", color: "#e11d48", bg: "#fff1f2", border: "#fecdd3" },
                  { num: "57%", val: "Learning poverty rate in low & middle-income countries", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
                  { num: "190", val: "Country datasets 2000–2024 time series, all previously inaccessible", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
                  { num: "120+", val: "Indicators across 6 thematic areas, impossible to navigate without taxonomy", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" }
                ].map((stat, i) => (
                   <Squircle key={i} cornerRadius={16} style={{ background: stat.bg, border: `1px solid ${stat.border}`, padding: '32px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                     <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: stat.color, fontWeight: 300, lineHeight: 1 }}>{stat.num}</div>
                     <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, margin: '8px 0 0 0', fontWeight: 500 }}>{stat.val}</p>
                   </Squircle>
                ))}
             </div>
          </div>
       </div>
       
       {/* ============================================================
           SECTION 3: AS-IS - PAIN POINTS
           ============================================================ */}
       <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div className={classes.contentMaxWidth} style={{ padding: '80px 0', maxWidth: '1000px' }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>AS-IS - PAIN POINTS</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
               Where the current experience <span style={{ fontStyle: 'italic', color: '#ea580c' }}>breaks down</span>
             </h2>
             <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%', marginBottom: '40px' }}>
               Journey mapping revealed critical failure modes that the portal must resolve.
             </p>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
               {[
                 { 
                   icon: "🔍",
                   title: "Researcher trying to answer a policy question", 
                   persona: "Persona P1 · Academic Researcher",
                   points: [
                     "PDF from 2021. No filtering.",
                     "4 CSVs with inconsistent column names",
                     "2+ hours in Excel for a 5-minute task",
                     "Emails UNICEF. Waits 5 days."
                   ]
                 },
                 { 
                   icon: "📊",
                   title: "Policymaker building a cross-country brief", 
                   persona: "Persona P2 · Government Analyst",
                   points: [
                     "No multi-country comparison tool",
                     "Static PNG maps. No interactivity.",
                     "Data placeholders until the night before",
                     "Screenshots that go stale immediately"
                   ]
                 },
                 { 
                   icon: "🤝",
                   title: "Partner finding data for a funding proposal", 
                   persona: "Persona P3 · Development Partner",
                   points: [
                     "3 separate portals for related indicators",
                     "Manual stitching across systems",
                     "No provenance. Is this even current?",
                     "Manual citation → error risk"
                   ]
                 },
                 { 
                   icon: "✏️",
                   title: "Editor publishing a story with charts", 
                   persona: "Persona P4 · UNICEF Content Editor",
                   points: [
                     "3-week queue to change a chart default",
                     "Static charts go stale immediately",
                     "Can't preview before production",
                     "Non-compliant boundaries slip through"
                   ]
                 }
               ].map((card, i) => (
                  <Squircle key={i} cornerRadius={16} style={{ background: '#f8fafc', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                         {card.icon}
                       </div>
                       <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: 0 }}>{card.title}</h3>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>{card.persona}</span>
                       </div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                      {card.points.map((pt, j) => (
                        <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#ea580c', fontSize: '1.2rem', lineHeight: '1rem', marginTop: '2px' }}>•</span>
                          <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </Squircle>
               ))}
             </div>
          </div>
       </div>

       {/* ============================================================
           SECTION 4: RESEARCH & DISCOVERY
           ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '80px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
             <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>02 - RESEARCH & DISCOVERY</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            Understanding before <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>designing.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            Two weeks of research before any design. Every finding became an AI prompt input research quality determined output quality.
          </p>

          {/* 5-Step Process Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '80px', position: 'relative' }}>
              {/* Background connecting line */}
              <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '1px', background: '#e2e8f0', zIndex: 0 }} />
              
              {[
                { id: "1", title: "EMPATHIZE", sum: "Understand users & context", list: "Analogous portal audit · Persona literature review · Stakeholder docs · UNICEF data landscape mapping" },
                { id: "2", title: "DEFINE", sum: "Frame the real problem", list: "Pain synthesis · 5 personas · 8 JTBD statements · AS-IS journey maps · Constraint definition" },
                { id: "3", title: "IDEATE", sum: "Generate solutions", list: "Feature prioritization · IA design · Tech stack selection · Prompt context document · North Star definition" },
                { id: "4", title: "PROTOTYPE", sum: "AI-assisted build", list: "AI prompt cycles · 15 screen templates · Design system · Coded prototype · 13+ variation iterations" },
                { id: "5", title: "TEST", sum: "Validate & refine", list: "UAT scenarios · WCAG audit · Keyboard-only testing · UN map compliance gate · Performance testing" }
              ].map((st, i) => (
                 <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9' }}>
                      {st.id}
                    </div>
                    <div style={{ marginTop: '8px' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#16a34a', letterSpacing: '0.05em' }}>{st.title}</span>
                       <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '4px 0 8px 0' }}>{st.sum}</h4>
                       <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{st.list}</p>
                    </div>
                 </div>
              ))}
          </div>

          {/* Portals & Stats Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '80px' }}>
             <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Analogous Portal Benchmark</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#111', lineHeight: 1.2, margin: '12px 0 24px 0' }}>What 6 comparable portals <span style={{ fontStyle: 'italic' }}>taught us</span> about what not to do.</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Before designing anything, I audited 6 analogous data portals to extract UX patterns, IA structures, and known failure modes. This wasn't about copying it was about understanding the design space and identifying where every existing portal fails its users.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { name: "World Bank Open Data", desc: "Strong downloads. Zero discoverability. No country-first navigation." },
                    { name: "Our World in Data", desc: "Best-in-class storytelling. Methodology buried 3 clicks deep." },
                    { name: "OECD.Stat", desc: "Technically comprehensive. Overwhelming for non-experts. Everything shown at once." },
                    { name: "WHO GHO", desc: "Good accessibility base. Comparison limited to 2 countries. No URL sharing." },
                    { name: "ODI & UN Stats", desc: "Trusted by researchers. Requires academic familiarity. No entry point for policy." }
                  ].map((portal, i) => (
                     <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>{portal.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>{portal.desc}</span>
                     </div>
                  ))}
                </div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                   <Squircle cornerRadius={12} style={{ border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111' }}>6</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Analogous portals benchmarked & audited</span>
                   </Squircle>
                   <Squircle cornerRadius={12} style={{ border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111' }}>5</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Distinct user personas built from research</span>
                   </Squircle>
                   <Squircle cornerRadius={12} style={{ border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111' }}>8</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>JTBD statements that drove every feature decision</span>
                   </Squircle>
                   <Squircle cornerRadius={12} style={{ border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111' }}>5</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Non-negotiable constraints mapped before any design</span>
                   </Squircle>
                </div>
                
                <Squircle cornerRadius={12} style={{ border: '1px solid #e2e8f0', padding: '24px' }}>
                   <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Research → Prompt Pipeline</span>
                   <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginTop: '12px' }}>
                     All outputs compiled into a structured Markdown context document the master input for every AI session. <strong style={{ color: '#111' }}>Research quality directly determined AI output quality.</strong>
                   </p>
                </Squircle>
             </div>
          </div>

          {/* Key Insight */}
          <Squircle cornerRadius={16} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '32px', marginBottom: '80px' }}>
             <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0284c7', letterSpacing: '0.1em', textTransform: 'uppercase' }}>KEY RESEARCH INSIGHT</span>
             <p style={{ fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.6, marginTop: '12px', fontWeight: 500 }}>
               Every comparable portal serves one user type. None serve all three. <span style={{ color: '#0284c7' }}>Progressive disclosure wasn't a preference it was the only honest solution.</span>
             </p>
          </Squircle>

          {/* Personas */}
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '24px', display: 'block' }}>5 USER PERSONAS SYNTHESISED FROM RESEARCH</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
             {[
               { icon: "🎓", id: "P1 · ACADEMIC", title: "The Researcher", pain: "45+ min triangulating indicator definitions across 6 PDFs before any analysis.", needs: "Needs methodology depth, data provenance, citable CSV" },
               { icon: "🏛️", id: "P2 · GOVERNMENT", title: "The Policymaker", pain: "No cross-country benchmarking tool rebuilds comparisons in Excel from inconsistent files.", needs: "Needs defensible comparison exportable in <3 min" },
               { icon: "🤝", id: "P3 · NGO / DONOR", title: "The Partner", pain: "Stitches 3 separate portal downloads together to compile one funding proposal appendix.", needs: "Needs provenance-labelled datasets in one place" },
               { icon: "✍️", id: "P4 · EDITORIAL", title: "The Editor", pain: "3-week developer queue for 5-minute chart updates. Zero editorial autonomy.", needs: "Needs CMS viz blocks, zero-code publish flow" },
               { icon: "🗺️", id: "P5 · GEOSPATIAL", title: "Data Steward", pain: "No systematic UN map compliance gate non-compliant boundaries can reach production.", needs: "Needs mandatory CMS review gate before publish" }
             ].map((p, i) => (
                <Squircle key={i} cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{p.icon}</div>
                  <div>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>{p.id}</span>
                     <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#111', margin: '4px 0 0 0' }}>{p.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, flexGrow: 1 }}>
                    <strong style={{ color: '#e11d48' }}>Pain:</strong> {p.pain}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#16a34a', lineHeight: 1.5, fontWeight: 500 }}>
                    ↗ {p.needs}
                  </p>
                </Squircle>
             ))}
          </div>
       </div>
       
       {/* ============================================================
           SECTION 5: JOBS TO BE DONE
           ============================================================ */}
       <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '80px 0' }}>
          <div className={classes.contentMaxWidth} style={{ maxWidth: '1000px' }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>03 - JOBS TO BE DONE</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
               What users <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>actually</span> need to accomplish
             </h2>
             <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%', marginBottom: '40px' }}>
               Every feature in this product traces back to one of these five jobs. If it doesn't serve a real user outcome, it didn't get built.
             </p>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: "🎓", role: "Researcher", jtbd: "Compare countries on the same indicator normalized, time-aligned without manual wrangling." },
                  { icon: "🏛️", role: "Policy Analyst", jtbd: "Pull indicator data with methodology and citation defensible in peer review and committee." },
                  { icon: "✍️", role: "UNICEF Editor", jtbd: "Embed live data visuals in a story without code publish at editorial speed, not developer speed." },
                  { icon: "🌍", role: "Country Rep", jtbd: "One profile page with all learning indicators brief stakeholders without cross-referencing sources." },
                  { icon: "👤", role: "General Public", jtbd: "Understand the global education picture instantly explore without knowing the indicator taxonomy." }
                ].map((job, i) => (
                   <Squircle key={i} cornerRadius={12} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '24px 32px', display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '180px' }}>
                        <div style={{ fontSize: '1.2rem' }}>{job.icon}</div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>{job.role}</span>
                     </div>
                     <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0, paddingLeft: '32px', borderLeft: '1px solid #e2e8f0' }}>
                        {job.jtbd.split(/(I want to.*?)( so|$)/).map((part, index) => 
                           part.startsWith("I want to") ? <strong key={index} style={{ color: '#111' }}>{part}</strong> : part
                        )}
                     </p>
                   </Squircle>
                ))}
             </div>

             {/* Thematic Data Areas with context */}
             <div style={{ marginTop: '80px' }}>
               <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#111', marginBottom: '16px', textAlign: 'center' }}>
                 Structured by <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>thematic data areas</span>
               </h3>
               <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                 To solve the discoverability failure, we organized the entire indicator taxonomy into five core thematic areas, allowing users to browse by subject rather than digging through raw datasets.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                  {[
                    { bg: '#fee2e2', text: 'Literacy & Numeracy', color: '#b91c1c' },
                    { bg: '#fef08a', text: 'Technical & Vocational', color: '#a16207' },
                    { bg: '#fed7aa', text: 'Gender, Disability & Poverty', color: '#c2410c' },
                    { bg: '#e0f2fe', text: 'Digital Skills & Access', color: '#0369a1' },
                    { bg: '#dcfce7', text: 'Early Childhood Development', color: '#15803d' },
                  ].map((img, i) => (
                     <Squircle key={i} cornerRadius={12} style={{ aspectRatio: '16/10', background: img.bg, display: 'flex', alignItems: 'flex-end', padding: '16px', border: `1.5px solid ${img.color}50`, overflow: 'hidden' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: img.color }}>{img.text}</span>
                     </Squircle>
                  ))}
               </div>
             </div>
          </div>
       </div>

       {/* ============================================================
           SECTION 6: AI METHODOLOGY
           ============================================================ */}
       <div className={classes.contentMaxWidth} style={{ padding: '80px 0', maxWidth: '1000px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
             <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
             <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>04 - AI METHODOLOGY</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
            How I <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>actually</span> used AI<br/>to build this product.
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
            Using AI effectively for product design isn't about asking it to "make something beautiful." It's about giving it structured research context, specific user problems, clear constraints, and measurable acceptance criteria and knowing when to iterate vs. when to change approach.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
             {[
               { icon: "📄", title: "Research-first prompting", desc: "Full research context injected at session start personas, JTBD, constraints. Research quality directly determined AI output quality." },
               { icon: "⚡", title: "Vibe vs. direct prompting knowing which to use", desc: "Vibe prompting for visual/layout decisions. Direct prompting for accessibility, performance, and CMS architecture. Knowing which to use is the skill." },
               { icon: "🎯", title: "Problem-framing, not solution-asking", desc: "Prompt the user job and expected behavior not the implementation. The output quality difference is significant." },
               { icon: "🧱", title: "Design system as AI context", desc: "Design system tokens became permanent prompt context maintaining visual consistency across 15 templates built in multiple AI sessions." },
               { icon: "🔄", title: "Structured iteration cycles", desc: "Defined 4-step iteration protocol per feature: build → refine → audit → integrate. Prevented prompt drift across 15+ screens." },
               { icon: "🔍", title: "Testing as a prompt input", desc: "Each cycle ended with an AI self-audit against UAT acceptance criteria significantly reducing manual testing cycles." }
             ].map((card, i) => (
                <Squircle key={i} cornerRadius={16} style={{ background: '#fff', border: '1.5px solid #e2e8f0', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
                  <div style={{ fontSize: '1.5rem' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: 0 }}>{card.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                     {card.desc.split(/(The quality of research input directly determines the quality of AI output\.|Vibe prompting|Direct prompting|This is what maintained visual consistency across 15 screen templates built across multiple AI sessions\.|Output a list of specific changes required\.)/).map((part, index) => 
                       ["The quality of research input directly determines the quality of AI output.", "Vibe prompting", "Direct prompting", "This is what maintained visual consistency across 15 screen templates built across multiple AI sessions.", "Output a list of specific changes required."].includes(part) ? <strong key={index} style={{ color: '#111' }}>{part}</strong> : part
                     )}
                  </p>
                </Squircle>
             ))}
          </div>

          {/* 4 Colored Context Prompts with improved strokes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
             <Squircle cornerRadius={12} style={{ border: '2px solid #3b82f6', background: '#fff', padding: '24px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SYSTEM / ARCHITECTURE</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>Full-context build prompts</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Injecting the entire research context document at session start. Used for initial screen builds and major architectural decisions.</p>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"Given this JTBD framework, persona set, constraint list, and tech stack, build the Compare page with the following features..."</div>
             </Squircle>

             <Squircle cornerRadius={12} style={{ border: '2px solid #a855f7', background: '#fff', padding: '24px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#a855f7', letterSpacing: '0.05em', textTransform: 'uppercase' }}>FEATURE / VIBE</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>User problem framing</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Describing the user job and expected behavior without specifying the implementation. Used for new interaction patterns.</p>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"When a user clicks a country on the globe, they expect a data preview panel not a page redirect. Design this interaction for a policymaker in a 3-minute briefing window."</div>
             </Squircle>

             <Squircle cornerRadius={12} style={{ border: '2px solid #f97316', background: '#fff', padding: '24px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ITERATION / DIRECT</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>Specific component refinement</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Targeted changes to specific components after first-pass build. Precise, technical, with exact acceptance criteria.</p>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"The country tooltip panel must be dismissible with Escape key, focus trapped when open, and announce via aria-live to screen readers. Fix these 3 issues."</div>
             </Squircle>

             <Squircle cornerRadius={12} style={{ border: '2px solid #22c55e', background: '#fff', padding: '24px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#22c55e', letterSpacing: '0.05em', textTransform: 'uppercase' }}>AUDIT / TESTING</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>Self-review against UAT</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Prompting AI to audit its own output against defined acceptance criteria. Used at end of each iteration cycle.</p>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"Audit this Compare Heatmap against WCAG 2.0 AA. Output a list of contrast failures, keyboard navigation gaps, and missing ARIA attributes."</div>
             </Squircle>
          </div>

       </div>

       {/* ============================================================
           SECTION 7: KEY FEATURES
           ============================================================ */}
       <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '80px 0' }}>
          <div className={classes.contentMaxWidth} style={{ maxWidth: '1200px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '60px', marginBottom: '60px' }}>
                <div>
                   <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block' }}>05 - KEY FEATURES</span>
                   <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '16px 0' }}>
                     8 features.<br/>
                     5 problems <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>solved.</span>
                   </h2>
                   <div style={{ background: '#e0f2fe', padding: '24px', borderRadius: '12px', border: '1.5px solid #bae6fd', color: '#0f172a', fontWeight: 500, fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.4, marginTop: '24px' }}>
                     "Explore, compare, trust, cite, and publish learning data all in one accessible public portal."
                   </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                     These are the features that directly fix UNICEF's biggest problems: findability, trust, comparison, publishing speed, and global accessibility. Each delivers measurable user value and lasting client value.
                   </p>
                   <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>8 PORTFOLIO HEADLINE FEATURES</span>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[
                        { color: '#3b82f6', text: 'Unified Explore Hub' },
                        { color: '#22c55e', text: 'Country Profiles' },
                        { color: '#f97316', text: 'Compare Countries' },
                        { color: '#eab308', text: 'Methodology + Citation' },
                        { color: '#a855f7', text: 'No-Code Story Publishing' }
                      ].map((tag, i) => (
                         <span key={i} style={{ padding: '6px 14px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '100px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tag.color }} />
                            {tag.text}
                         </span>
                      ))}
                   </div>
                </div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
                {[
                  { 
                    id: '01', icon: '🔍', title: 'Unified Data Discovery', solves: 'Findability', impact: 'Highest',
                    bg: '#eff6ff', border: '#bfdbfe', pillBg: '#dbeafe', color: '#2563eb',
                    desc: "One portal for countries, indicators, datasets, stories, and methodology instead of jumping between PDFs and microsites."
                  },
                  { 
                    id: '02', icon: '🌍', title: 'Country Profile Pages', solves: 'Findability + Trust', impact: 'Policymaker',
                    bg: '#f0fdf4', border: '#bbf7d0', pillBg: '#dcfce7', color: '#16a34a',
                    desc: "Dynamic pages with headline indicators, trend charts, downloads, and a comparison entry point country-first navigation."
                  },
                  { 
                    id: '03', icon: '📋', title: 'Indicator Trust Layer', solves: 'Trust', impact: 'Researcher',
                    bg: '#fefce8', border: '#fef08a', pillBg: '#fef9c3', color: '#ca8a04',
                    desc: "Every indicator backed by definition, methodology, source, coverage notes, and related indicators."
                  },
                  { 
                    id: '04', icon: '⚖️', title: 'Comparison Tool', solves: 'Comparison', impact: 'P2 + P3',
                    bg: '#fff7ed', border: '#fed7aa', pillBg: '#ffedd5', color: '#ea580c',
                    desc: "Side-by-side country comparison with URL state preservation. Heatmap, scatter, and percentile views."
                  },
                  { 
                    id: '05', icon: '📥', title: 'Download + Citation', solves: 'Trust', impact: 'Differentiator',
                    bg: '#faf5ff', border: '#e9d5ff', pillBg: '#f3e8ff', color: '#9333ea',
                    desc: "CSVs with full metadata and a pre-formatted citation string turns the portal into a research-grade citable tool."
                  },
                  { 
                    id: '06', icon: '📈', title: 'Interactive Stories with Live Data', solves: 'Publishing', impact: 'Editor',
                    bg: '#fff1f2', border: '#fecdd3', pillBg: '#ffe4e6', color: '#e11d48',
                    desc: "Editors publish analytical stories with embedded charts tied to live data narrative and evidence permanently connected."
                  },
                  { 
                    id: '07', icon: '⚡', title: 'No-Code CMS Publishing', solves: 'Publishing speed', impact: 'Highest (client)',
                    bg: '#f0fdf2', border: '#bcf0da', pillBg: '#d1fae5', color: '#059669',
                    desc: "Editors configure chart type, year, region, and annotations zero developer involvement."
                  },
                  { 
                    id: '08', icon: '♿', title: 'Accessibility & Compliance by Design', solves: 'Access + Risk', impact: 'Global audience',
                    bg: '#f0f9ff', border: '#bae6fd', pillBg: '#e0f2fe', color: '#0284c7',
                    desc: "WCAG AA, keyboard navigation, table fallbacks, mobile-responsive, and UN map compliance baked in from day one."
                  }
                ].map((card, i) => (
                   <Squircle key={i} cornerRadius={20} style={{ background: card.bg, border: `1.5px solid ${card.border}`, padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                         <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8' }}>Feature {card.id}</span>
                         <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#fff', background: card.color, padding: '2px 8px', borderRadius: '100px', letterSpacing: '0.05em' }}>★ HEADLINE</span>
                      </div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{card.icon}</div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>{card.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0, flexGrow: 1 }}>{card.desc}</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
                         <div style={{ background: card.pillBg, padding: '6px', borderRadius: '100px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: card.color }}>
                            Solves: {card.solves}
                         </div>
                         <div style={{ background: card.border, padding: '6px', borderRadius: '100px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: card.color }}>
                            Impact: {card.impact}
                         </div>
                      </div>
                   </Squircle>
                ))}
             </div>
          </div>
       </div>      </div>
                     </div>
                  </Squircle>
               ))}
            </div>
         </div>
      </div>

      {/* ============================================================
          SECTION 8: THE PROCESS (TIMELINE)
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>06 - THE PROCESS</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           From RFP to live product <br/>how the <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>work actually happened.</span>
         </h2>
         <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '80px' }}>
           This is an honest account of an AI-assisted product design engagement. It is precisely because I leaned on AI heavily for execution that I needed immense upfront strategy, strict alignment, and systematic testing. AI is not a shortcut to a ready product that earned the client's trust.
         </p>

         <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Timeline Vertical Line */}
            <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '0', width: '2px', background: '#e2e8f0', zIndex: 0 }} />

            {/* Step 01 */}
            <div style={{ position: 'relative', marginBottom: '80px' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 1, color: '#0ea5e9' }}>
                 <FileText size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>WEEK 01</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Understanding the RFP and client requirements</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>80 pages of UN procurement docs reduced to competitive constraints, tech stack baselines, and audience definitions.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>KEY REQUIREMENTS EXTRACTED FROM RFP</span>
                     <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {["Public access  zero login wall allowed. Target audiences: Policymakers, NGOs, academic public.", "WCAG 2.0 AA accessibility  strict UN requirement (contrast, nav, screen readers).", "Headless CMS architecture  editors update securely without interacting with code/version control.", "UN Map compliance  geospatial boundaries in maps must reflect latest UN cartography layer.", "Citation-ready output  every dataset downloaded with full provenance and a DOI citation string."].map((req, i) => (
                           <li style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, display: 'flex', gap: '12px' }} key={i}>
                              <span style={{ color: '#0ea5e9' }}></span> {req}
                           </li>
                        ))}
                     </ul>
                  </Squircle>
               </div>
            </div>

            {/* Step 02 */}
            <div style={{ position: 'relative', marginBottom: '80px' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#16a34a' }}>
                 <Search size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#16a34a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>WEEK 02-03</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Design thinking  primary, secondary, analogous</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Strict research phase before any design tool. Without structured research output, AI produces aesthetically nice but purposeless components.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#16a34a', letterSpacing: '0.05em' }}>RESEARCH METHODOLOGY</span>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #dcfce7', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}> Secondary research:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Audited 6 analogous portals (World Bank Open Data, OECD.Stat, Our World in Data, UN DESA, ODI, WHO)  mapped UX patterns, IA structure, and known failure modes.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #dcfce7', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}> Persona synthesis:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Built 5 personas (Researcher, Policymaker, UNICEF Editor, Partner, General Public) from user surveys and past UN user testing documentation.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}> JTBD framework:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Wrote 8 Jobs-to-be-Done statements that framed every feature decision  "When I x, I want to y, so I can z."</span>
                     </div>
                  </Squircle>
               </div>
            </div>

            {/* Step 03 */}
            <div style={{ position: 'relative', marginBottom: '80px' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#9333ea' }}>
                 <Layers size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#9333ea', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CLIENT APPROVAL</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Client deliverable alignment + feature and tech stack definition</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Research findings presented, client signs off. Features locked, tech stack defined. This document became the master context for all subsequent AI prompts.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#9333ea', letterSpacing: '0.05em' }}>DELIVERABLES SIGNED OFF FOR BUILD SPRINT</span>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                           <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7e22ce' }}> Core features:</span>
                           <span style={{ fontSize: '0.85rem', color: '#475569' }}>Unified Explore Hub, Country Profiles, Comparison Tool, Indicator Trust Layer, Downloads & Citation, Interactive Stories, WCAG AA, CMS No-Code Publishing.</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                           <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7e22ce' }}> Tech stack defined:</span>
                           <span style={{ fontSize: '0.85rem', color: '#475569' }}>Next.js (SSG performance), Tailwind CSS (UI), Drupal 11 Headless (Content API), Three.js (3D globe), Leaflet (2D maps), Figma Design System.</span>
                        </div>
                     </div>
                  </Squircle>
               </div>
            </div>

            {/* Step 04 */}
            <div style={{ position: 'relative', marginBottom: '80px' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#f97316' }}>
                 <Database size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#f97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CONSTRUCTING UX/UI</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Feeding AI with structured research  direct and vibe prompting</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Master context document  JTBD, personas, constraints, tech stack  injected at session start. Context quality determines output quality.</p>
                  
                  {/* Dark Mode Prompt Terminal */}
                  <Squircle cornerRadius={16} style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '32px', color: '#f8fafc', boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.5)' }}>
                     <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />
                        MASTER CONTEXT INJECTION IN SESSION START
                     </div>
                     <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        <span style={{ color: '#818cf8' }}># PROJECT: UNICEF EDUCATION DATA PORTAL</span><br/>
                        <span style={{ color: '#38bdf8' }}>AUDIENCE:</span> Policymaker, Researcher, Partner, Editor, Public<br/>
                        <span style={{ color: '#38bdf8' }}>TECH STACK:</span> Next.js SSG, Tailwind, Recharts, Three.js, Lucide Icons<br/>
                        <span style={{ color: '#38bdf8' }}>JTBD 3:</span> "When I'm preparing a country briefing..." (ref: Country Rep)<br/>
                        <span style={{ color: '#38bdf8' }}>CONSTRAINTS:</span> WCAG 2.0 AA, No login wall, Max map state = 100K geojson points<br/>
                        <br/>
                        <span style={{ color: '#4ade80' }}>// Provide the Country Profile Wireframe</span><br/>
                        <span style={{ color: '#e2e8f0' }}>👉 Build the component layout in TSX implementing above context, ensuring Learning Poverty headline metrics are visually dominant, map interaction matches JTBD 3, and all chart color palettes map to the `--unicef-chart-palette` CSS variables.</span>
                     </div>
                  </Squircle>
               </div>
            </div>

            {/* Step 05 */}
            <div style={{ position: 'relative', marginBottom: '80px' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#3b82f6' }}>
                 <CheckCircle2 size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ITERATION CYCLES</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Multiple variations, tech stack upgrades, feature integration, testing</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Systematic iteration, not a single prompt. Each screen through multiple AI-assisted revision cycles  tech upgrades, interaction patterns, edge cases.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>KEY ITERATION CYCLES</span>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}> Global Map Integration:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Iterated from standard Leaflet pins to a custom Three.js 3D globe rendering 190 geojson paths  solving performance block.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}> Compare Tool upgrade:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Shifted from simple table list to scatter plots and heatmaps to visually show data distance vs simple numerical list.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}> Country tooltip flow:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Discovered in testing that users clicking a map pin expected immediate brief preview  not full page reload. Added inline data panel sidebars preserving map context.</span>
                     </div>
                  </Squircle>
               </div>
            </div>

            {/* Step 06 - Final */}
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', left: '-40px', top: '0', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#0ea5e9' }}>
                 <ArrowUpRight size={20} />
               </div>
               <div style={{ paddingLeft: '32px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CLIENT DELIVERY & PHASE 2</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Phase 1 delivered  client approved  Phase 2 engaged</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>15 screen templates, full design system, UAT criteria, coded prototype. Client immediately moved to full engagement.</p>
                  
                  <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '24px' }}>
                     <Check size={20} color="#0891b2" style={{ marginTop: '2px', flexShrink: 0 }} />
                     <p style={{ fontSize: '0.85rem', color: '#164e63', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                        The AI-assisted approach reduced the traditional design-to-prototype timeline significantly while maintaining production-grade quality. The client's criterion for Phase 2 approval was a working prototype that addressed all 5 user personas with WCAG compliance  delivered in full.
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* ============================================================
          SECTION: UNIFIED DISCOVERY  HOMEPAGE
          ============================================================ */}
      <div style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className={classes.contentMaxWidth} style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>UNIFIED DISCOVERY  HOMEPAGE</span>
          </div>

          {/* Globe Hero */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
                Globe hero {' '}
                <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>the global picture, instantly.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                The homepage opens with a 3D interactive globe showing live Learning Poverty choropleth data  draggable, zoomable, and clickable to any country profile. Two action buttons ("Explore the Data" and "Browse Countries") give users the two primary entry paths without requiring any knowledge of the indicator taxonomy. A prominent search field handles the direct-lookup use case.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {['3D globe (Three.js)', 'Two entry paths', 'Indicator toggle', 'Global search'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '100px', border: '1px solid #cbd5e1', color: '#475569', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
              <Squircle cornerRadius={12} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  The globe is not decorative  it's the first interaction. Dragging it to a region and clicking a country opens the Country Profile without any menu navigation.
                </p>
              </Squircle>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
                "When I land on the portal, I want to see the global picture instantly so I can decide where to dig deeper."
              </p>
            </div>
            <div>
              <img src="/unicef/globe-hero.png" alt="Homepage Globe hero & entry point" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            </div>
          </div>

          {/* Persona Entry */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <img src="/unicef/persona-entry.png" alt="Homepage persona-segmented entry band" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>HOMEPAGE · UNIFIED ENTRY POINT</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem' }}>⚡</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#7c3aed' }}>3 AI iteration cycles</span>
              </div>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
                Persona-segmented entry {' '}
                <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>not one door for everyone.</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {['Persona-segmented CTAs', '3D Globe hero', 'Stats band', '2D Choropleth below'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '100px', border: '1px solid #cbd5e1', color: '#475569', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
              <Squircle cornerRadius={12} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  The persona cards were added in iteration cycle 2 after testing revealed that users landing on the homepage without a persona-specific entry point had significantly lower task completion rates. One prompt + one iteration cycle.
                </p>
              </Squircle>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
                "When I land on this portal, I need to immediately understand whether this tool is for someone like me  before I commit to exploring it."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION: ACCESSIBILITY & COMPLIANCE  GLOBAL MAP
          ============================================================ */}
      <div style={{ padding: '100px 0' }}>
        <div className={classes.contentMaxWidth} style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>ACCESSIBILITY & COMPLIANCE BY DESIGN  GLOBAL MAP</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
            Two map views {' '}
            <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>same data, enforced compliance.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, maxWidth: '820px', marginBottom: '48px' }}>
            The Global Map page offers 3D Globe (Three.js) and 2D Choropleth (Leaflet)  toggleable with state preserved. Both views show the same indicator with the same year filter. The "UN-Compliant Boundaries" badge is permanent and non-dismissable. The UN disclaimer renders at framework level  not editable by content authors.
          </p>

          {/* Two map images side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            <div>
              <img src="/unicef/globe-3d.png" alt="3D Globe  drag, zoom, click for profile" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>3D Globe  drag · zoom · click for profile</p>
            </div>
            <div>
              <img src="/unicef/choropleth-2d.png" alt="2D Choropleth  UN-compliant + data table" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>2D Choropleth  UN-compliant + data table</p>
            </div>
          </div>

          {/* Two detail callouts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>3D GLOBE  CONTROLS ALWAYS VISIBLE</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '16px' }}>
                The on-screen controls panel ("Drag to rotate · Scroll to zoom · Click for details") is always shown on first load  reducing abandonment from users unfamiliar with 3D interaction. A "Rotate" button provides an auto-rotate mode for presentation contexts. The globe uses the same choropleth colour scale as the 2D map  Learning Poverty from 0% (best) to 100% (worst).
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>"I'm presenting to ministers  I want to show the global picture rotating on screen as I speak."</p>
            </Squircle>
            <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>2D MAP  UN COMPLIANCE IS THE DESIGN</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '16px' }}>
                The "★ UN-Compliant Boundaries" badge appears on every 2D map view  permanent, non-removable by editors. The UN Map Disclaimer paragraph renders at framework level and cannot be edited by content authors. Below the map: a ranked country data table showing Learning Poverty %, rank, and On track / Needs attention / Critical status  providing an accessible alternative to the visual choropleth.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>"I need to publish a map of learning poverty that I'm confident won't violate UN territorial policy."</p>
            </Squircle>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION: 3D GLOBE · MAP-TO-COMPARE FLOW
          ============================================================ */}
      <div style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className={classes.contentMaxWidth} style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <img src="/unicef/map-to-compare.png" alt="Globe to Compare  map-to-comparison flow" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>3D GLOBE · MAP-TO-COMPARE FLOW</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#7c3aed' }}>New interaction  iterated from user testing</span>
              </div>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
                Build a comparison{' '}
                <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>from the map itself.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                The most significant new interaction discovered in testing: when a policymaker clicks multiple countries on the globe, they're building a mental comparison  but previously had no way to translate that into a side-by-side view without navigating away. The Compare Selection panel solves this: clicking "+ Compare" on any country tooltip adds it to a persistent selection sidebar. When 2+ countries are selected, a "Compare N Countries →" button appears  navigating directly to the Compare page pre-loaded with those selections.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {['Ethiopia 90% Critical', 'India 56%', 'China 18% On track', 'Compare 3 Countries →'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '100px', border: '1px solid #cbd5e1', color: '#475569', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
              <Squircle cornerRadius={12} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  This entire interaction  country tooltip, Compare Selection panel, and multi-select state  was designed and built in one AI session after describing the user job. The key prompt: "A policymaker is spinning the globe and mentally building a comparison  design the interaction that makes that comparison shareable in one click without page navigation."
                </p>
              </Squircle>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
                "I've identified 3 countries I want to compare while looking at the globe  I want to compare them without having to navigate away and search for them again."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION: COMPARE · COUNTRY SEARCH FILTER
          ============================================================ */}
      <div style={{ padding: '100px 0' }}>
        <div className={classes.contentMaxWidth} style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>COMPARE · COUNTRY SEARCH FILTER</span>
              </div>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
                Filtered comparison {' '}
                <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>search within 31 countries.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                The updated Compare page added a country search field within the heatmap  allowing users to filter down from 31 countries to specific selections without leaving the comparison view. Users can search by country name while the heatmap updates in real time. The region pills above maintain the broader regional context. A "Countries: In" search field below them enables typing a specific country name.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {['Country search within heatmap', 'Region pills', 'Real-time update'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '100px', border: '1px solid #cbd5e1', color: '#475569', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
              <Squircle cornerRadius={12} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  This filter pattern was added after testing revealed that users scrolling a 31-country heatmap looking for a specific country frequently lost their orientation. Prompt: "Add an inline country search field that filters the heatmap rows in real time  without removing any countries from the dataset, just hiding non-matching rows."
                </p>
              </Squircle>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
                "I'm looking at the heatmap with 31 countries  I want to quickly find India without scrolling through the full list."
              </p>
            </div>
            <div>
              <img src="/unicef/country-search-filter.png" alt="Compare  Country search filter within heatmap" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION: COMPARE · FOCUSED 3-COUNTRY VIEW
          ============================================================ */}
      <div style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className={classes.contentMaxWidth} style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>COMPARE · FOCUSED 3-COUNTRY VIEW  THRESHOLD + NORMALIZED</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
            From 31 countries to 3 {' '}
            <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>the exact comparison a policymaker needs.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, maxWidth: '820px', marginBottom: '48px' }}>
            When a user selects specific countries (Indonesia, China, Nigeria) via the globe Compare Selection panel or country search, the heatmap collapses to show only those countries  removing the cognitive overhead of 31 rows. Two views: Threshold (absolute traffic-light status) and Normalized Percentile (P0–P100 global rank). The pattern "3 selected  region filters disabled" confirms the mode change clearly.
          </p>

          {/* Three comparison images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '48px' }}>
            <img src="/unicef/compare-threshold.png" alt="Compare  Threshold heatmap focused view" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            <img src="/unicef/compare-scatter.png" alt="Compare  Scatter plot view" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
            <img src="/unicef/compare-normalized.png" alt="Compare  Normalized percentile view" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
          </div>

          {/* Two callout columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>THRESHOLD VIEW  ABSOLUTE STATUS</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '16px' }}>
                China shows green across all 6 indicators (On track). Indonesia shows mixed  Learning Poverty amber, other indicators green or yellow. Nigeria shows orange/red across most indicators  Off track on Learning Poverty, OOS Rate, and Digital. This view answers: "Which countries have a problem, and in which areas?" The 3-country focused view makes the pattern immediately readable without scrolling.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>"I need to brief on China vs Indonesia vs Nigeria  which indicators are each off track on?"</p>
            </Squircle>
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>NORMALIZED VIEW  RELATIVE RANK</span>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: '16px' }}>
                The same 3 countries in percentile terms: China ranks P100 (top of all 190 countries) across every indicator. Indonesia P67 (above median). Nigeria P33 (lower third). All cells show green in this view  not because Nigeria is "On track" in absolute terms, but because P33 is above the P0–P20 bottom band. This view answers: "Relative to the world, where does each country sit?" A crucial distinction for academic and policy contexts.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>"I need to use Nigeria's relative position globally  not just its absolute numbers  to contextualise our development argument."</p>
            </Squircle>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 9: KEY DESIGN DECISIONS
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>07 - KEY DESIGN DECISIONS</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           Three decisions that shaped<br/>the <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>entire system.</span>
         </h2>
         <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
           Every significant product decision involved a real tradeoff. These three had the highest downstream impact  on system architecture, editorial velocity, and institutional trust.
         </p>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { 
                num: "01", type: "ARCHITECTURE DECISION", title: "Headless CMS + SSG over a monolithic CMS build",
                whyItMattered: "UNICEF's editorial team needed zero-dependency publishing. A traditional CMS would couple every update to a developer release cycle.",
                whatWeChose: "Drupal 11 headless + Next.js SSG. Editors own chart defaults without touching code. Brand refreshes require token changes, not 15 template rewrites.",
                result: "Editors publish stories with live data visuals in <2hrs, zero developer involvement. ~80% reduction in content-related dev tickets."
              },
              { 
                num: "02", type: "UX DECISION", title: "Progressive disclosure over a single \"dashboard\" for data exploration",
                whyItMattered: "5-persona research revealed irreconcilable divergence. One dashboard would have served none of them.",
                whatWeChose: "Three tiers of progressive disclosure. Policymaker gets the answer in under 3 minutes. Researcher gets full academic rigour one click deeper.",
                result: "Post-task confidence scores >4.2/5  \"trusted the data enough to cite it\"  across both Researcher and Policymaker personas."
              },
              { 
                num: "03", type: "GOVERNANCE DECISION", title: "UN map compliance enforced via CMS workflow gate  not design spec or training",
                whyItMattered: "UN map policy requires disputed boundaries as dashed lines. Spec-based compliance with 190 countries and a growing team is inherently fragile.",
                whatWeChose: "Mandatory Geospatial Review CMS workflow gate  map content can't publish without approval. UN disclaimer renders at framework level, not editable by authors.",
                result: "Zero non-compliant boundary representations in production since implementation. Map compliance became a system guarantee, not a training requirement."
              }
            ].map((dec, i) => (
               <Squircle key={i} cornerRadius={20} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                     <div style={{ display: 'flex', gap: '24px' }}>
                        <span style={{ fontSize: '1.5rem', fontFamily: 'Instrument Serif, serif', color: '#cbd5e1' }}>{dec.num}</span>
                        <div>
                           <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{dec.type}</span>
                           <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', margin: '4px 0 0 0' }}>{dec.title}</h3>
                        </div>
                     </div>
                     <span style={{ padding: '6px 16px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, color: '#0ea5e9' }}>{dec.type.split(" ")[0]}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                     <div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>WHY IT MATTERED</span>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginTop: '12px' }}>{dec.whyItMattered}</p>
                     </div>
                     <div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.05em' }}>WHAT WE CHOSE & WHY</span>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginTop: '12px' }}>
                           {dec.whatWeChose.split(/(Drupal 11 headless API \+ Next\.js SSG|Three tiers of progressive disclosure|A mandatory Geospatial Review workflow state in Drupal's CMS)/).map((part, index) => 
                              ["Drupal 11 headless API + Next.js SSG.", "Three tiers of progressive disclosure.", "A mandatory Geospatial Review workflow state in Drupal's CMS."].includes(part + ".") || ["Drupal 11 headless API + Next.js SSG", "Three tiers of progressive disclosure", "A mandatory Geospatial Review workflow state in Drupal's CMS"].includes(part) ? <strong key={index} style={{ color: '#111' }}>{part}</strong> : part
                           )}
                        </p>
                        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', marginTop: '16px' }}>
                           <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                           <span style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: 1.5 }}>{dec.result}</span>
                        </div>
                     </div>
                  </div>
               </Squircle>
            ))}
         </div>
      </div>

      {/* ============================================================
          SECTION 07: LIVE PROTOTYPE
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ maxWidth: '1000px', marginBottom: '120px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '100px' }}>
         <div style={{ marginBottom: '48px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>08 - LIVE PROTOTYPE</span>
         </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#111', margin: '16px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Interact with <br/><span style={{ color: '#0ea5e9', fontStyle: 'italic' }}>the actual product.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
               Built in Figma Sites  functional web application. Maps are interactive, charts respond to indicator selection, navigation is fully wired.
            </p>
            <div style={{ height: '1px', background: '#e2e8f0', width: '300px', margin: '32px auto', position: 'relative' }}>
               <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 16px', background: '#fafafa', fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.05em' }}>Drag the globe · Switch indicators · Explore country profiles</span>
            </div>
         </div>
         
         <InteractivePortalWindow />

         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
               <Info size={14} /> Globe on homepage is draggable  click any country to open its profile.
            </div>
            <a href="https://uneven-react-85281796.figma.site" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
               Open in new tab <ArrowUpRight size={14} />
            </a>
         </div>
      </div>

      {/* ============================================================
          SECTION 08: IMPACT & DELIVERABLES
          ============================================================ */}
      <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '100px 0' }}>
         <div className={classes.contentMaxWidth} style={{ maxWidth: '1200px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>09 - IMPACT & DELIVERABLES</span>
         </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
              Phase 1 delivered.<br/>
              <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>Phase 2 earned.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%', marginBottom: '60px' }}>
              The client's criterion for Phase 2 approval was a working prototype that addressed all 5 user personas with WCAG compliance and demonstrated the full feature set. This is what the AI-assisted approach produced.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '80px', textAlign: 'center' }}>
               {[
                 { num: "15", label: "Screen templates", sub: "Designed and built in Phase 1", color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
                 { num: "6+", label: "Iteration cycles", sub: "From first build to Phase 1 delivery", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
                 { num: "8", label: "Core features", sub: "Delivered including new map-to-compare flow", color: "#9333ea", bg: "#faf5ff", border: "#e9d5ff" },
                 { num: "Phase 2", label: "Client approved", sub: "Design through engineering handoff", color: "#eab308", bg: "#fffbeb", border: "#fef08a" }
               ].map((item, i) => (
                  <Squircle key={i} cornerRadius={16} style={{ background: item.bg, border: `1.5px solid ${item.border}`, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                     <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: item.color, fontWeight: 300, lineHeight: 1 }}>{item.num}</div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111', marginTop: '8px' }}>{item.label}</div>
                     <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{item.sub}</div>
                  </Squircle>
               ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '80px' }}>
               {[
                 { icon: "🎨", title: "Figma Design System", tags: ["Design tokens", "Components", "Viz patterns"], desc: "Token architecture, component library, WCAG-compliant color system, and visualization pattern rules." },
                 { icon: "🌐", title: "15 Screen Templates", tags: ["375 / 768 / 1440px", "WCAG AA"], desc: "Home, Explore, Country Profile, Compare (Heatmap + Scatter + Normalized), Global Map (2D + 3D), Insights, Downloads  all responsive." },
                 { icon: "📋", title: "Service Blueprint", tags: ["5 Personas", "4 Journeys"], desc: "AS-IS and TO-BE journey maps for all 5 personas, CMS workflow diagram, and editorial publishing flow." },
                 { icon: "🧪", title: "Validation Plan", tags: ["4 UAT scenarios", "Success metrics"], desc: "4 UAT scenarios with written acceptance criteria, WCAG audit checklist, and success metric definitions." },
                 { icon: "📱", title: "Interactive Prototype", tags: ["Live prototype", "Interactive"], desc: "Fully interactive Figma Sites prototype with working maps, chart interactions, and the map-to-compare flow." },
                 { icon: "⚙️", title: "Tech Architecture Spec", tags: ["CMS Architecture", "Dev handoff"], desc: "Drupal 11 headless CMS field design, Next.js SSG decisions, and visualization config specifications for engineering handoff." },
               ].map((card, i) => (
                  <Squircle key={i} cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                     <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{card.icon}</div>
                     <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>{card.title}</h4>
                     <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>{card.desc}</p>
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                        {card.tags.map((t, index) => <span key={index} style={{ padding: '4px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '100px', fontSize: '0.7rem', color: '#64748b' }}>{t}</span>)}
                     </div>
                  </Squircle>
               ))}
            </div>

            {/* Validation Targets */}
            <div>
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>SUCCESS CRITERIA  PHASE 1 VALIDATION TARGETS</span>
               <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <AlertTriangle size={16} color="#ca8a04" />
                  <span style={{ fontSize: '0.8rem', color: '#a16207', fontWeight: 600 }}>RFP stage  these are validation targets, not post-launch measurements</span>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  <Squircle cornerRadius={20} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>⚡</div>
                        <div>
                           <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>Task success</div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Journey completion</div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>OVERALL TASK SUCCESS RATE</div>
                           <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                              <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9', fontWeight: 300 }}>&gt;80%</div>
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>of users</span>
                           </div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, marginTop: '4px' }}>Target for moderated usability flows across Researcher & Policymaker personas</div>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: '#f1f5f9' }} />
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>POLICYMAKER COMPARISON SPEED</div>
                           <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                              <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9', fontWeight: 300 }}>&lt;3 <span style={{ fontSize: '1.2rem' }}>min</span></div>
                           </div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, marginTop: '4px' }}>Total time from Landing → Compare → Export (keyboard-only UAT scenario)</div>
                        </div>
                     </div>
                  </Squircle>

                  <Squircle cornerRadius={20} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🔒</div>
                        <div>
                           <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>Trust</div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data confidence</div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>CONFIDENCE SCORE (OUT OF 5)</div>
                           <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                              <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#16a34a', fontWeight: 300 }}>&gt;4</div>
                              <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>/5</span>
                           </div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, marginTop: '4px' }}>"Confident enough to cite this data" target in post-task exit survey</div>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: '#f1f5f9' }} />
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>CITATION FEATURE UPTAKE</div>
                           <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#16a34a', fontWeight: 300 }}>15%</div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, marginTop: '4px' }}>Target percentage of sessions using the citation string or permalink copy feature</div>
                        </div>
                     </div>
                  </Squircle>

                  <Squircle cornerRadius={20} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✏️</div>
                        <div>
                           <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>Editorial</div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Publishing velocity</div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>DEV TICKETS FOR CONTENT UPDATES</div>
                           <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#111', fontWeight: 300, margin: '4px 0' }}>Zero</div>
                           <div style={{ height: '6px', background: '#f1f5f9', width: '100%', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
                              <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
                           </div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '12px', lineHeight: 1.4 }}>Goal: All chart defaults + stories manageable in CMS with no code required</div>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: '#f1f5f9' }} />
                        <div>
                           <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>LCP ON SIMULATED 4G</div>
                           <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                              <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: '#111', fontWeight: 300 }}>&lt;2.5<span style={{ fontSize: '1.2rem' }}>s</span></div>
                           </div>
                           <div style={{ height: '6px', background: '#f1f5f9', width: '100%', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
                              <div style={{ width: '60%', height: '100%', background: '#f59e0b' }} />
                           </div>
                           <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '12px', lineHeight: 1.4 }}>Lighthouse CI target for global equity performance (simulated 4G)</div>
                        </div>
                     </div>
                  </Squircle>
               </div>
            </div>

         </div>
      </div>

      {/* ============================================================
          SECTION 09: REFLECTION
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>10 - REFLECTION</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           What this project taught me<br/>about <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>AI-assisted product design.</span>
         </h2>
         <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
           This wasn't about using AI to skip the work  it was about using AI to do better work, faster. The research and judgment were still mine. The AI was the execution layer. Here's what that actually means in practice.
         </p>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '80px' }}>
            {[
              { icon: "🧭", title: "Research quality determines AI output quality", desc: "The most important work happened before any prompt was written. The research document  personas, JTBD, constraints, tech decisions  was the real product design work. Every session that started with full context produced production-ready output. Every session without it required 3x more iteration cycles. AI amplifies your research quality." },
              { icon: "🔍", title: "Problem framing beats solution prescribing", desc: "The biggest leap in output quality came from switching from \"build X\" prompts to \"when a user needs Y, design the interaction that solves it.\" Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions. The country tooltip + Compare Selection panel was built this way in one session." },
              { icon: "🔄", title: "Structured iteration beats open-ended exploration", desc: "Each feature had a defined 4-step iteration protocol (first-pass → refinement → accessibility audit → integration test). Unstructured iteration produced design drift  components that stopped being consistent with the system. The protocol kept the design system coherent across 15 screens and 6+ iteration cycles." },
              { icon: "⚙️", title: "AI as execution layer  judgment stays human", desc: "The decisions that mattered most  progressive disclosure over a dashboard, governance in the CMS workflow, honest missing-data patterns  were all human judgment calls. AI built what I designed. The design work was understanding the tradeoffs deeply enough to describe the right solution. That part didn't change with AI in the loop." }
            ].map((card, i) => (
               <Squircle key={i} cornerRadius={20} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{card.icon}</div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                     {card.desc.split(/(The research document  personas, JTBD, constraints, tech decisions  was the real product design work\.|Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions\.|Unstructured iteration produced design drift|were all human judgment calls\.)/).map((part, index) => 
                        ["The research document  personas, JTBD, constraints, tech decisions  was the real product design work.", "Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions.", "Unstructured iteration produced design drift", "were all human judgment calls."].includes(part) ? <strong key={index} style={{ color: '#111' }}>{part}</strong> : part
                     )}
                  </p>
               </Squircle>
            ))}
         </div>

         <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '60px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}> WHAT I'D DO DIFFERENTLY</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
               {[
                 { icon: "🔗", title: "API contract earlier", desc: "Align on the data API schema with engineering in week 2, not week 6. The normalized percentile endpoint required a full iteration cycle when discovered late." },
                 { icon: "📱", title: "Mobile-first baseline", desc: "Start prompting at 375px, not 1440px. Retrofitting the Explore filter panel to mobile required significant re-architecture that wouldn't exist with a mobile-first prompt strategy." },
                 { icon: "❓", title: "Missing data as day-one requirement", desc: "The honesty patterns  hatching for missing data, dotted lines for estimates  were designed in the final sprint. They should be in the design system brief from the first session." }
               ].map((card, i) => (
                  <Squircle key={i} cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px' }}>
                     <div style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{card.icon}</div>
                     <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '0 0 8px 0' }}>{card.title}</h4>
                     <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                  </Squircle>
               ))}
            </div>
         </div>

      </div>

    </div>
  );
}
