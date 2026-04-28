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
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>01 - PROBLEM STATEMENT</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           The data existed.<br/>
           The <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>access layer</span> didn't.
         </h2>
         
         <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
           UNICEF maintains one of the world's most comprehensive education datasets — 190 countries, 120+ indicators, 25 years of time-series data. But the infrastructure to access it was broken. The data was authoritative. The problem was entirely about access, trust, and usability.
         </p>

         {/* 3 Pillar Cards */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {/* Card 1 */}
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #fecdd3', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <Search size={24} color="#e11d48" style={{ marginBottom: '8px' }} />
               <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e11d48', letterSpacing: '0.05em' }}>DISCOVERABILITY FAILURE</h3>
               <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                 Education data was fragmented across PDFs, internal dashboards, and disconnected microsites. No unified search, no taxonomy, no cross-referencing. Users couldn't find what they needed — and couldn't trust what they found.
               </p>
               <div style={{ background: '#fff1f2', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #e11d48', fontSize: '0.85rem', fontStyle: 'italic', color: '#be123c' }}>
                 "I spent two hours triangulating a single indicator before I could start my analysis."
               </div>
            </Squircle>

            {/* Card 2 */}
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #fef08a', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <ShieldAlert size={24} color="#ca8a04" style={{ marginBottom: '8px' }} />
               <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ca8a04', letterSpacing: '0.05em' }}>TRUST & CITATION BREAKDOWN</h3>
               <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                 No inline methodology links, no data provenance labels, no citation strings. Researchers couldn't formally cite UNICEF data without emailing the team directly and waiting days for a response — making it unusable for peer-reviewed work.
               </p>
               <div style={{ background: '#fefce8', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #ca8a04', fontSize: '0.85rem', fontStyle: 'italic', color: '#a16207' }}>
                 "I couldn't put this in a peer-reviewed paper without knowing the methodology."
               </div>
            </Squircle>

            {/* Card 3 */}
            <Squircle cornerRadius={16} style={{ background: '#fff', border: '1px solid #fed7aa', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <Clock size={24} color="#ea580c" style={{ marginBottom: '8px' }} />
               <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ea580c', letterSpacing: '0.05em' }}>EDITORIAL BOTTLENECK</h3>
               <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, flexGrow: 1 }}>
                 Every chart update required a developer ticket. A 3-week queue for 5-minute changes. Static image charts went out of date immediately with no live data connection. Editors had zero autonomy over the content they were responsible for.
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
              "UNICEF cannot ensure its authoritative data reaches the people who can act on it — because there is no accessible, unified, trustworthy public interface to the data. Meanwhile, its editorial team is dependent on developers to publish even the simplest update."
            </p>
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px', display: 'block' }}>— Problem framing synthesised from RFP brief & stakeholder documentation</span>
         </Squircle>

         {/* Big Stats */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            {[
              { num: "617M", val: "Children who cannot read a simple text — the crisis this data must surface to decision-makers", color: "#e11d48" },
              { num: "57%", val: "Learning poverty rate in low & middle-income countries — invisible to policymakers without a portal", color: "#ea580c" },
              { num: "190", val: "Country datasets with 2000-2024 time series — all previously inaccessible without a unified system", color: "#0284c7" },
              { num: "120+", val: "Indicators across 6 thematic areas — impossible to navigate without taxonomy and search", color: "#16a34a" }
            ].map((stat, i) => (
               <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                 <div style={{ fontSize: '3rem', fontFamily: 'Instrument Serif, serif', color: stat.color, fontWeight: 300 }}>{stat.num}</div>
                 <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, maxWidth: '80%' }}>{stat.val}</p>
               </div>
            ))}
         </div>
      </div>
      
      {/* ============================================================
          SECTION 3: AS-IS - PAIN POINTS
          ============================================================ */}
      <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
         <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '-40px', display: 'block' }}>AS-IS - PAIN POINTS</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
              Where the current experience <span style={{ fontStyle: 'italic', color: '#ea580c' }}>breaks down</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%' }}>
              Journey mapping revealed critical failure modes that the portal must resolve.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
              {[
                { 
                  icon: "🔍",
                  title: "Researcher trying to answer a policy question", 
                  persona: "Persona P1 · Academic Researcher",
                  points: [
                    "Searches UNICEF website — gets a PDF from 2021 with no interactive filtering",
                    "Downloads 4 different CSV files with inconsistent column naming conventions",
                    "Spends 2+ hours in Excel rebuilding a comparison that should take minutes",
                    "Cannot verify indicator methodology — emails UNICEF directly, waits 5 days"
                  ]
                },
                { 
                  icon: "📊",
                  title: "Policymaker building a cross-country brief", 
                  persona: "Persona P2 · Government Analyst",
                  points: [
                    "No tool exists to compare multiple countries on a single indicator at once",
                    "Map visuals in reports are static PNGs — no interactivity, no context",
                    "Insight is presented as <<[insert data]>> placeholders until day-before deadline",
                    "Can't share a live link — sends screenshots that quickly go stale"
                  ]
                },
                { 
                  icon: "🤝",
                  title: "Partner finding data for a funding proposal", 
                  persona: "Persona P3 · Development Partner",
                  points: [
                    "Navigates 3 different UNICEF sub-portals to find related indicators",
                    "No unified download — must stitch together files from separate systems",
                    "Data has no provenance labels — unclear if it's the most recent estimate",
                    "No citation format — builds citation string manually, introduces error risk"
                  ]
                },
                { 
                  icon: "✏️",
                  title: "Editor publishing a story with charts", 
                  persona: "Persona P4 · UNICEF Content Editor",
                  points: [
                    "Raises a Jira ticket to update a chart default — 3-week developer queue",
                    "Static image charts go out of date — no connection to live data API",
                    "Cannot preview how a story will look with data until it's in production",
                    "Map compliance review is ad-hoc — non-compliant boundaries slip through"
                  ]
                }
              ].map((card, i) => (
                 <Squircle key={i} cornerRadius={16} style={{ background: '#f8fafc', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #e2e8f0' }}>
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
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>02 - RESEARCH & DISCOVERY</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           Understanding before <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>designing.</span>
         </h2>
         <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
           The research phase ran for two weeks before any design work began. Good research context is also good AI prompt context — every finding here became an input that shaped the quality and precision of the AI-assisted build.
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
               <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Before designing anything, I audited 6 analogous data portals to extract UX patterns, IA structures, and known failure modes. This wasn't about copying — it was about understanding the design space and identifying where every existing portal fails its users.</p>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {[
                   { name: "World Bank Open Data", desc: "Strong download infrastructure, weak discoverability — users must know indicator names before searching. No country-first navigation." },
                   { name: "Our World in Data", desc: "Excellent editorial storytelling, but methodology depth is buried 3 clicks deep. Citation workflow requires manual URL copying." },
                   { name: "OECD.Stat", desc: "Technically comprehensive, but overwhelming for non-expert users. No progressive disclosure — everything shown at once creates cognitive overload." },
                   { name: "WHO GHO", desc: "Good accessibility foundation, but comparison tool is limited to 2 countries. No URL state sharing for comparisons." },
                   { name: "ODI & UN Stats", desc: "Trusted by researchers but require academic familiarity with indicator terminology. No entry point for policy or partner audiences." }
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
                    All research outputs were compiled into a single structured Markdown context document. This became the master input for every AI session — the reason the product outputs were coherent and client-ready rather than generic. <strong style={{ color: '#111' }}>Research quality directly determined AI output quality.</strong>
                  </p>
               </Squircle>
            </div>
         </div>

         {/* Key Insight */}
         <Squircle cornerRadius={16} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '32px', marginBottom: '80px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0284c7', letterSpacing: '0.1em', textTransform: 'uppercase' }}>KEY RESEARCH INSIGHT</span>
            <p style={{ fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.6, marginTop: '12px', fontWeight: 500 }}>
              Every comparable portal optimises for one user type. None successfully serve a researcher, a policymaker, and an editorial team with a single coherent architecture. <span style={{ color: '#0284c7' }}>Progressive disclosure was not a UX preference — it was the only structurally honest solution.</span>
            </p>
         </Squircle>

         {/* Personas */}
         <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '24px', display: 'block' }}>5 USER PERSONAS — SYNTHESISED FROM RESEARCH</span>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {[
              { icon: "🎓", id: "P1 · ACADEMIC", title: "The Researcher", pain: "45+ min triangulating indicator definitions across 6 PDFs before any analysis.", needs: "Needs methodology depth, data provenance, citable CSV" },
              { icon: "🏛️", id: "P2 · GOVERNMENT", title: "The Policymaker", pain: "No cross-country benchmarking tool — rebuilds comparisons in Excel from inconsistent files.", needs: "Needs defensible comparison exportable in <3 min" },
              { icon: "🤝", id: "P3 · NGO / DONOR", title: "The Partner", pain: "Stitches 3 separate portal downloads together to compile one funding proposal appendix.", needs: "Needs provenance-labelled datasets in one place" },
              { icon: "✍️", id: "P4 · EDITORIAL", title: "The Editor", pain: "3-week developer queue for 5-minute chart updates. Zero editorial autonomy.", needs: "Needs CMS viz blocks, zero-code publish flow" },
              { icon: "🗺️", id: "P5 · GEOSPATIAL", title: "Data Steward", pain: "No systematic UN map compliance gate — non-compliant boundaries can reach production.", needs: "Needs mandatory CMS review gate before publish" }
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
      <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '100px 0' }}>
         <div className={classes.contentMaxWidth} style={{ maxWidth: '1000px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', marginBottom: '-40px', display: 'block' }}>03 - JOBS TO BE DONE</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0' }}>
              What users <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>actually</span> need to accomplish
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '60%', marginBottom: '40px' }}>
              Every feature in this product traces back to one of these five jobs. If it doesn't serve a real user outcome, it didn't get built.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {[
                 { icon: "🎓", role: "Researcher", jtbd: "When I'm analyzing education gaps across regions, I want to compare countries on the same indicator with normalized, time-aligned data so I can identify statistically valid trends without manual data wrangling." },
                 { icon: "🏛️", role: "Policy Analyst", jtbd: "When I need evidence for a policy brief, I want to pull indicator data with full methodology and citation strings so my analysis is defensible in peer review and committee presentations." },
                 { icon: "✍️", role: "UNICEF Editor", jtbd: "When I have an analytical narrative, I want to embed live data visuals inside my story without writing code, so I can publish data stories at editorial speed, not developer speed." },
                 { icon: "🌍", role: "Country Rep", jtbd: "When I'm preparing a country-level briefing, I want a single profile page with all learning indicators for my country so I can brief stakeholders without cross-referencing multiple data sources." },
                 { icon: "👤", role: "General Public", jtbd: "When I land on the portal with no domain expertise, I want to understand the global education picture instantly so I can decide where to explore without needing to know the indicator taxonomy." }
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

            {/* Placeholder Photo Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginTop: '40px' }}>
               {[
                 { bg: '#fee2e2', text: 'Literacy & Numeracy', color: '#b91c1c' },
                 { bg: '#fef08a', text: 'Technical & Vocational', color: '#a16207' },
                 { bg: '#fed7aa', text: 'Gender, Disability & Poverty', color: '#c2410c' },
                 { bg: '#e0f2fe', text: 'Digital Skills & Access', color: '#0369a1' },
                 { bg: '#dcfce7', text: 'Early Childhood Development', color: '#15803d' },
               ].map((img, i) => (
                  <Squircle key={i} cornerRadius={12} style={{ aspectRatio: '16/10', background: img.bg, display: 'flex', alignItems: 'flex-end', padding: '16px', border: `1px solid ${img.color}30` }}>
                     <span style={{ fontSize: '0.75rem', fontWeight: 600, color: img.color }}>{img.text}</span>
                  </Squircle>
               ))}
            </div>
         </div>
      </div>

      {/* ============================================================
          SECTION 6: AI METHODOLOGY
          ============================================================ */}
      <div className={classes.contentMaxWidth} style={{ padding: '100px 0', maxWidth: '1000px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}>04 - AI METHODOLOGY</span>
         </div>
         
         <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 24px 0' }}>
           How I <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>actually</span> used AI<br/>to build this product.
         </h2>
         <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, maxWidth: '80%', marginBottom: '60px' }}>
           Using AI effectively for product design isn't about asking it to "make something beautiful." It's about giving it structured research context, specific user problems, clear constraints, and measurable acceptance criteria — and knowing when to iterate vs. when to change approach.
         </p>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {[
              { icon: "📄", title: "Research-first prompting", desc: "Every AI session started with the full research context document — personas, JTBD, constraints, tech stack, and feature definitions. The quality of research input directly determines the quality of AI output. Sessions without structured context produced generic components. Sessions with full context produced client-ready product decisions." },
              { icon: "⚡", title: "Vibe vs. direct prompting — knowing which to use", desc: "I used two distinct prompt modes. Vibe prompting (high-level intent, let AI propose implementation): effective for visual design, layout composition, and color decisions. Direct prompting (specific technical requirements, exact behavior): essential for accessibility compliance, performance budgets, and CMS architecture." },
              { icon: "🎯", title: "Problem-framing, not solution-asking", desc: "Instead of \"build a map with a tooltip,\" I prompted, \"When a user clicks a country on the choropleth map, they expect an immediate data preview without a full page navigation. Design an inline panel that shows Learning Poverty %, global rank, 5-year trend sparkline, and primary CTAs — optimized for a policymaker making a briefing in under 3 minutes.\" The difference in output quality is significant." },
              { icon: "🧱", title: "Design system as AI context", desc: "After the first variation of the design system was established, it became a permanent part of every prompt context — CSS variables, token names, component patterns, color usage rules. This is what maintained visual consistency across 15 screen templates built across multiple AI sessions." },
              { icon: "🔄", title: "Structured iteration cycles", desc: "Each feature had a defined iteration protocol: (1) First-pass build from full context → (2) Specific refinement prompts per component → (3) Performance / accessibility audit prompt → (4) Final integration test. This prevented prompt drift and maintained design system consistency across 15+ screens." },
              { icon: "🔍", title: "Testing as a prompt input", desc: "Each iteration cycle ended with a testing prompt: \"Review this component against UAT scenario UAT-02 (Policymaker — Compare 4 countries, keyboard-only). Identify any keyboard navigation gaps, ARIA label issues, or flow breaks. Output a list of specific changes required.\" Using AI to self-audit against acceptance criteria significantly reduced manual testing cycles." }
            ].map((card, i) => (
               <Squircle key={i} cornerRadius={16} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

         {/* 4 Colored Context Prompts */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Squircle cornerRadius={12} style={{ border: '1px solid #3b82f6', background: '#fff', padding: '24px' }}>
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SYSTEM / ARCHITECTURE</span>
               <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>Full-context build prompts</h4>
               <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Injecting the entire research context document at session start. Used for initial screen builds and major architectural decisions.</p>
               <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"Given this JTBD framework, persona set, constraint list, and tech stack, build the Compare page with the following features..."</div>
            </Squircle>

            <Squircle cornerRadius={12} style={{ border: '1px solid #a855f7', background: '#fff', padding: '24px' }}>
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#a855f7', letterSpacing: '0.05em', textTransform: 'uppercase' }}>FEATURE / VIBE</span>
               <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>User problem framing</h4>
               <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Describing the user job and expected behavior without specifying the implementation. Used for new interaction patterns.</p>
               <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"When a user clicks a country on the globe, they expect a data preview panel — not a page redirect. Design this interaction for a policymaker in a 3-minute briefing window."</div>
            </Squircle>

            <Squircle cornerRadius={12} style={{ border: '1px solid #f97316', background: '#fff', padding: '24px' }}>
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ITERATION / DIRECT</span>
               <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', margin: '8px 0' }}>Specific component refinement</h4>
               <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>Targeted changes to specific components after first-pass build. Precise, technical, with exact acceptance criteria.</p>
               <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>"The country tooltip panel must be dismissible with Escape key, focus trapped when open, and announce via aria-live to screen readers. Fix these 3 issues."</div>
            </Squircle>

            <Squircle cornerRadius={12} style={{ border: '1px solid #22c55e', background: '#fff', padding: '24px' }}>
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
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '100px 0' }}>
         <div className={classes.contentMaxWidth} style={{ maxWidth: '1200px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '60px', marginBottom: '60px' }}>
               <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', display: 'block' }}>05 - KEY FEATURES</span>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '16px 0' }}>
                    8 features.<br/>
                    5 problems <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>solved.</span>
                  </h2>
                  <div style={{ background: '#e0f2fe', padding: '24px', borderRadius: '12px', border: '1px solid #bae6fd', color: '#0f172a', fontWeight: 500, fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.4, marginTop: '24px' }}>
                    "Explore, compare, trust, cite, and publish learning data — all in one accessible public portal."
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
               {[
                 { 
                   id: '01', icon: '🔍', title: 'Unified Data Discovery', solves: 'Findability', impact: 'Highest',
                   bg: '#eff6ff', border: '#bfdbfe', pillBg: '#dbeafe', color: '#2563eb',
                   desc: "One portal to search countries, indicators, datasets, stories, and methodology — instead of jumping between PDFs and scattered microsites. The clearest \"problem solved\" feature. It directly fixes the findability crisis."
                 },
                 { 
                   id: '02', icon: '🌍', title: 'Country Profile Pages', solves: 'Findability + Trust', impact: 'Policymaker',
                   bg: '#f0fdf4', border: '#bbf7d0', pillBg: '#dcfce7', color: '#16a34a',
                   desc: "Dynamic pages with headline indicators, trend charts, stories, downloads, and comparison entry point. Powerful because policymakers think in country-first terms — the mental model becomes the navigation model."
                 },
                 { 
                   id: '03', icon: '📋', title: 'Indicator Trust Layer', solves: 'Trust', impact: 'Researcher',
                   bg: '#fefce8', border: '#fef08a', pillBg: '#fef9c3', color: '#ca8a04',
                   desc: "Every indicator backed by definition, methodology, source, last updated date, coverage notes, and related indicators. Shows design for data trust and citation confidence — not just usability."
                 },
                 { 
                   id: '04', icon: '⚖️', title: 'Comparison Tool', solves: 'Comparison', impact: 'P2 + P3',
                   bg: '#fff7ed', border: '#fed7aa', pillBg: '#ffedd5', color: '#ea580c',
                   desc: "Side-by-side country comparison with URL state preservation — users share the exact same view. Heatmap, scatter, and percentile views for ministries, donors, and analysts preparing briefings."
                 },
                 { 
                   id: '05', icon: '📥', title: 'Download + Citation', solves: 'Trust', impact: 'Differentiator',
                   bg: '#faf5ff', border: '#e9d5ff', pillBg: '#f3e8ff', color: '#9333ea',
                   desc: "CSVs with full metadata and a pre-formatted citation or stable permalink. Turns the portal from a \"nice dashboard\" into a research-grade tool that academics and ministries can formally cite."
                 },
                 { 
                   id: '06', icon: '📈', title: 'Interactive Stories with Live Data', solves: 'Publishing', impact: 'Editor',
                   bg: '#fff1f2', border: '#fecdd3', pillBg: '#ffe4e6', color: '#e11d48',
                   desc: "Editors publish analytical stories with embedded charts and maps tied to live data — narrative and evidence permanently connected. Shows product thinking beyond dashboards."
                 },
                 { 
                   id: '07', icon: '⚡', title: 'No-Code CMS Publishing', solves: 'Publishing speed', impact: 'Highest (client)',
                   bg: '#f0fdf2', border: '#bcf0da', pillBg: '#d1fae5', color: '#059669',
                   desc: "Editors configure chart type, default year, region, annotations, and featured indicators — zero developer involvement. Eliminates the editorial bottleneck. Highest client value of all features."
                 },
                 { 
                   id: '08', icon: '♿', title: 'Accessibility & Compliance by Design', solves: 'Access + Risk', impact: 'Global audience',
                   bg: '#f0f9ff', border: '#bae6fd', pillBg: '#e0f2fe', color: '#0284c7',
                   desc: "WCAG AA, keyboard navigation, table fallbacks for all charts, progressive loading, mobile responsiveness, and UN-compliant map approval workflows — baked into the system from day one."
                 }
               ].map((card, i) => (
                  <Squircle key={i} cornerRadius={20} style={{ background: card.bg, border: `1px solid ${card.border}`, padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
           From RFP to live product —<br/>how the <span style={{ fontStyle: 'italic', color: '#0ea5e9' }}>work actually happened.</span>
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
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Translating a UN/academic brief (UNICEF's RFP). The mandate was clear: a public-facing data portal. Redacting out 80 pages of UN procurement docs to extract competitive constraints, tech stack baselines, and audience definitions. This wasn't just "We need a map." This was "We need maps from 2000-2024, multiple sources, datasets, and strict UN map compliance requirements."</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>KEY REQUIREMENTS EXTRACTED FROM RFP</span>
                     <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {["Public access — zero login wall allowed. Target audiences: Policymakers, NGOs, academic public.", "WCAG 2.0 AA accessibility — strict UN requirement (contrast, nav, screen readers).", "Headless CMS architecture — editors update securely without interacting with code/version control.", "UN Map compliance — geospatial boundaries in maps must reflect latest UN cartography layer.", "Citation-ready output — every dataset downloaded with full provenance and a DOI citation string."].map((req, i) => (
                           <li style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, display: 'flex', gap: '12px' }} key={i}>
                              <span style={{ color: '#0ea5e9' }}>—</span> {req}
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
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Design thinking — primary, secondary, analogous</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Before opening any design tool or writing any AI prompt, I ran a strict research phase using a Design Thinking framework. This level of rigorous synthesis before execution is what separates AI enabling true value creation. Without my structured research output, AI output would just form a nice aesthetic map with no use cases.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#16a34a', letterSpacing: '0.05em' }}>RESEARCH METHODOLOGY</span>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #dcfce7', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}>— Secondary research:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Audited 6 analogous portals (World Bank Open Data, OECD.Stat, Our World in Data, UN DESA, ODI, WHO) — mapped UX patterns, IA structure, and known failure modes.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #dcfce7', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}>— Persona synthesis:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Built 5 personas (Researcher, Policymaker, UNICEF Editor, Partner, General Public) from user surveys and past UN user testing documentation.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginTop: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d' }}>— JTBD framework:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Wrote 8 Jobs-to-be-Done statements that framed every feature decision — "When I x, I want to y, so I can z."</span>
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
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Client research completed, findings shared, and client signs off. We lock the features list, define the tech stack, and establish a clear north star before any building begins. This was a critical bridge between research and AI-assisted execution — this exact document produced here became the master context for all subsequent prompts.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#9333ea', letterSpacing: '0.05em' }}>DELIVERABLES SIGNED OFF FOR BUILD SPRINT</span>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                           <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7e22ce' }}>— Core features:</span>
                           <span style={{ fontSize: '0.85rem', color: '#475569' }}>Unified Explore Hub, Country Profiles, Comparison Tool, Indicator Trust Layer, Downloads & Citation, Interactive Stories, WCAG AA, CMS No-Code Publishing.</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                           <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7e22ce' }}>— Tech stack defined:</span>
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
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Feeding AI with structured research — direct and vibe prompting</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>This is where the AI actually provides immense leverage. I feed exactly the Master context document — the JTBD statements, the 5 personas, the constraints list, and the tech stack decisions. The difference between a generic output and a client-ready product is the quality and structure of the context prompt.</p>
                  
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
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>The build was not a single prompt — it was a systematic iteration process. Each screen went through multiple AI-assisted revision cycles. When a component hit performance issues, I prompted on a tech stack upgrade. When a feature needed a new interaction pattern (like the map-to-compare flow), I described the user job and let the AI propose the implementation.</p>
                  
                  <Squircle cornerRadius={16} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px' }}>
                     <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>KEY ITERATION CYCLES</span>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>— Global Map Integration:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Iterated from standard Leaflet pins to a custom Three.js 3D globe rendering 190 geojson paths — solving performance block.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>— Compare Tool upgrade:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Shifted from simple table list to scatter plots and heatmaps to visually show data distance vs simple numerical list.</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', marginTop: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>— Country tooltip flow:</span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>Discovered in testing that users clicking a map pin expected immediate brief preview — not full page reload. Added inline data panel sidebars preserving map context.</span>
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
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', margin: '8px 0 16px 0' }}>Phase 1 delivered — client approved — Phase 2 engaged</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>Phase 1 delivered 15 screen templates with full Figma design system, UAT acceptance criteria, and a coded prototype. The client's response was to immediately move forward with the full engagement — full product development from design system through to engineering handoff, UI kit, CI/CD setup, and live go-live.</p>
                  
                  <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '24px' }}>
                     <Check size={20} color="#0891b2" style={{ marginTop: '2px', flexShrink: 0 }} />
                     <p style={{ fontSize: '0.85rem', color: '#164e63', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                        The AI-assisted approach reduced the traditional design-to-prototype timeline significantly while maintaining production-grade quality. The client's criterion for Phase 2 approval was a working prototype that addressed all 5 user personas with WCAG compliance — delivered in full.
                     </p>
                  </div>
               </div>
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
           Every significant product decision involved a real tradeoff. These three had the highest downstream impact — on system architecture, editorial velocity, and institutional trust.
         </p>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { 
                num: "01", type: "ARCHITECTURE DECISION", title: "Headless CMS + SSG over a monolithic CMS build",
                whyItMattered: "UNICEF's editorial team needed zero-dependency publishing — the ability to update chart defaults, featured indicators, and story content without developer involvement. A traditional CMS-rendered frontend would couple every design change to a release cycle.",
                whatWeChose: "Drupal 11 headless API + Next.js SSG. SSG renders at build time — near-zero origin load under traffic spikes. Editors own chart defaults and featured content in Drupal without touching code. The design system decouples — brand refreshes require token changes, not 15 template rewrites.",
                result: "Editors publish stories with live data visuals in <2hrs, zero developer involvement. ~80% reduction in content-related dev tickets."
              },
              { 
                num: "02", type: "UX DECISION", title: "Progressive disclosure over a single \"dashboard\" for data exploration",
                whyItMattered: "The initial brief framed Explore as a \"dashboard.\" But 5-persona research revealed irreconcilable divergence: a PhD researcher needs raw tables, uncertainty ranges, and methodology links. A policymaker needs a chart, a headline number, and a download button. One dashboard would have served none of them.",
                whatWeChose: "Three tiers of progressive disclosure. Tier 1: scannable headline stats. Tier 2: Interactive charts on Explore. Tier 3: full methodology, coverage tables, and downloads one click deeper. A policymaker gets their answer in under 3 minutes. The researcher gets full academic rigour.",
                result: "Post-task confidence scores >4.2/5 — \"trusted the data enough to cite it\" — across both Researcher and Policymaker personas."
              },
              { 
                num: "03", type: "GOVERNANCE DECISION", title: "UN map compliance enforced via CMS workflow gate — not design spec or training",
                whyItMattered: "UNICEF operates under strict UN map policy: disputed boundaries must render as dashed lines. The original approach documented this in specs and relied on editors to comply. With 190 countries and a growing editorial team, spec-based compliance is inherently fragile.",
                whatWeChose: "A mandatory Geospatial Review workflow state in Drupal's CMS. Any map-containing content cannot publish until the Geospatial Reviewer role approves. The UN disclaimer renders at framework level — not editable by content authors. Process design as product design.",
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
               Built in Figma Sites — functional web application. Maps are interactive, charts respond to indicator selection, navigation is fully wired.
            </p>
            <div style={{ height: '1px', background: '#e2e8f0', width: '300px', margin: '32px auto', position: 'relative' }}>
               <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 16px', background: '#fafafa', fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.05em' }}>Drag the globe · Switch indicators · Explore country profiles</span>
            </div>
         </div>
         
         <InteractivePortalWindow />

         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
               <Info size={14} /> Globe on homepage is draggable — click any country to open its profile.
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
               <div>
                  <div style={{ fontSize: '3.5rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9', fontWeight: 300 }}>15</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Screen templates designed and built in Phase 1</div>
               </div>
               <div>
                  <div style={{ fontSize: '3.5rem', fontFamily: 'Instrument Serif, serif', color: '#16a34a', fontWeight: 300 }}>6+</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Iteration cycles from first build to Phase 1 delivery</div>
               </div>
               <div>
                  <div style={{ fontSize: '3.5rem', fontFamily: 'Instrument Serif, serif', color: '#9333ea', fontWeight: 300 }}>8</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Core features delivered including new map-to-compare flow</div>
               </div>
               <div>
                  <div style={{ fontSize: '3.5rem', fontFamily: 'Instrument Serif, serif', color: '#eab308', fontWeight: 300 }}>Phase 2</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Client approved full engagement — design through engineering handoff</div>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '80px' }}>
               {[
                 { icon: "🎨", title: "Figma Design System", tags: ["Design tokens", "Components", "Viz patterns"], desc: "Token architecture (CSS variables via Style Dictionary), component library, visualization pattern rules, responsive grid system, WCAG-compliant color system" },
                 { icon: "🌐", title: "15 Screen Templates", tags: ["375 / 768 / 1440px", "WCAG AA"], desc: "Home, Explore, Country Profile, Countries Grid, Compare (Heatmap + Scatter + Normalized), Global Map (2D + 3D), Insights, Data & Downloads, Methodology — all responsive" },
                 { icon: "📋", title: "Service Blueprint", tags: ["5 Personas", "4 Journeys"], desc: "AS-IS and TO-BE journey maps for all 5 personas, CMS workflow state diagram, Geospatial Review gate design, editorial publishing flow" },
                 { icon: "🧪", title: "Validation Plan", tags: ["4 UAT scenarios", "Success metrics"], desc: "4 UAT scenarios with written acceptance criteria, usability test scripts, WCAG audit checklist, performance budget targets, success metric definitions" },
                 { icon: "📱", title: "Interactive Prototype", tags: ["Live prototype", "Interactive"], desc: "Fully interactive Figma Sites prototype with working maps, chart interactions, navigation flows, and the new map-to-compare interaction — delivered for client Phase 1 review" },
                 { icon: "⚙️", title: "Tech Architecture Spec", tags: ["CMS Architecture", "Dev handoff"], desc: "Drupal 11 headless CMS field design, Next.js SSG architecture decisions, Geospatial Review CMS workflow gate, visualization config block specifications for engineering handoff" },
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
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>SUCCESS CRITERIA — PHASE 1 VALIDATION TARGETS</span>
               <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <AlertTriangle size={16} color="#ca8a04" />
                  <span style={{ fontSize: '0.8rem', color: '#a16207', fontWeight: 600 }}>RFP stage — these are validation targets, not post-launch measurements</span>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <Squircle cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '24px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '1.2rem' }}>⚡</span>
                        <div>
                           <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Task success</div>
                           <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Journey completion</div>
                        </div>
                     </div>
                     <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Task success rate</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9', margin: '4px 0' }}>&gt;80%</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Moderated usability — Researcher, Policymaker, Partner flows</div>
                     </div>
                     <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Policymaker comparison flow</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#0ea5e9', margin: '4px 0' }}>&lt;3 <span style={{ fontSize: '1rem' }}>min</span></div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Landing → Compare → Export, keyboard-only UAT-02</div>
                     </div>
                  </Squircle>

                  <Squircle cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '24px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '1.2rem' }}>🔒</span>
                        <div>
                           <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Trust</div>
                           <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Data confidence</div>
                        </div>
                     </div>
                     <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Post-task confidence score</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#16a34a', margin: '4px 0' }}>&gt;4<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/5</span></div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>"Confident enough to cite this data" — exit survey</div>
                     </div>
                     <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Citation feature usage</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#16a34a', margin: '4px 0' }}>15%</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sessions using citation string or permalink copy</div>
                     </div>
                  </Squircle>

                  <Squircle cornerRadius={16} style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '24px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '1.2rem' }}>✏️</span>
                        <div>
                           <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Editorial</div>
                           <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Publishing velocity</div>
                        </div>
                     </div>
                     <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dev tickets for content updates</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111', margin: '4px 0' }}>Zero</div>
                        <div style={{ height: '4px', background: '#e2e8f0', width: '100%', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}><div style={{ width: '100%', height: '100%', background: '#10b981' }} /></div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px' }}>All chart defaults + stories in CMS, no code required</div>
                     </div>
                     <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>LCP on 4G</div>
                        <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif, serif', color: '#111', margin: '4px 0' }}>&lt;2.5<span style={{ fontSize: '1rem', color: '#94a3b8' }}>s</span></div>
                        <div style={{ height: '4px', background: '#e2e8f0', width: '100%', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}><div style={{ width: '60%', height: '100%', background: '#f59e0b' }} /></div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px' }}>Lighthouse CI, simulated 4G — equity performance target</div>
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
           This wasn't about using AI to skip the work — it was about using AI to do better work, faster. The research and judgment were still mine. The AI was the execution layer. Here's what that actually means in practice.
         </p>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '80px' }}>
            {[
              { icon: "🧭", title: "Research quality determines AI output quality", desc: "The most important work happened before any prompt was written. The research document — personas, JTBD, constraints, tech decisions — was the real product design work. Every session that started with full context produced production-ready output. Every session without it required 3x more iteration cycles. AI amplifies your research quality." },
              { icon: "🔍", title: "Problem framing beats solution prescribing", desc: "The biggest leap in output quality came from switching from \"build X\" prompts to \"when a user needs Y, design the interaction that solves it.\" Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions. The country tooltip + Compare Selection panel was built this way in one session." },
              { icon: "🔄", title: "Structured iteration beats open-ended exploration", desc: "Each feature had a defined 4-step iteration protocol (first-pass → refinement → accessibility audit → integration test). Unstructured iteration produced design drift — components that stopped being consistent with the system. The protocol kept the design system coherent across 15 screens and 6+ iteration cycles." },
              { icon: "⚙️", title: "AI as execution layer — judgment stays human", desc: "The decisions that mattered most — progressive disclosure over a dashboard, governance in the CMS workflow, honest missing-data patterns — were all human judgment calls. AI built what I designed. The design work was understanding the tradeoffs deeply enough to describe the right solution. That part didn't change with AI in the loop." }
            ].map((card, i) => (
               <Squircle key={i} cornerRadius={20} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{card.icon}</div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 12px 0' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                     {card.desc.split(/(The research document — personas, JTBD, constraints, tech decisions — was the real product design work\.|Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions\.|Unstructured iteration produced design drift|were all human judgment calls\.)/).map((part, index) => 
                        ["The research document — personas, JTBD, constraints, tech decisions — was the real product design work.", "Describing the user problem and letting AI propose the implementation consistently produced more creative, more appropriate solutions.", "Unstructured iteration produced design drift", "were all human judgment calls."].includes(part) ? <strong key={index} style={{ color: '#111' }}>{part}</strong> : part
                     )}
                  </p>
               </Squircle>
            ))}
         </div>

         <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '60px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>— WHAT I'D DO DIFFERENTLY</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
               {[
                 { icon: "🔗", title: "API contract earlier", desc: "Align on the data API schema with engineering in week 2, not week 6. The normalized percentile endpoint required a full iteration cycle when discovered late." },
                 { icon: "📱", title: "Mobile-first baseline", desc: "Start prompting at 375px, not 1440px. Retrofitting the Explore filter panel to mobile required significant re-architecture that wouldn't exist with a mobile-first prompt strategy." },
                 { icon: "❓", title: "Missing data as day-one requirement", desc: "The honesty patterns — hatching for missing data, dotted lines for estimates — were designed in the final sprint. They should be in the design system brief from the first session." }
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
