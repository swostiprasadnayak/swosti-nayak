"use client";
import React from "react";

import CaseStudyHeader from "../blocks/CaseStudyHeader";
import classes from "./caseStudy.module.css";
import nav from "../navanta/navanta.module.css";
import {
    BridgeQuestion,
    Decisions,
    NextProject,
    Outcomes,
    Paragraphs,
    Pillars,
    Pivot,
    QuestionSection,
    RoleStrip,
    ScenarioRows,
    SignalMap,
    Split,
    StateLegend,
} from "../navanta/blocks";
import ScreenFrame from "../navanta/ScreenFrame";
import FlowReel from "../navanta/FlowReel";
import ScreenTabs from "../navanta/ScreenTabs";
import RelayLanes from "../navanta/RelayLanes";
import SeatSwitcher from "../navanta/SeatSwitcher";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";

/* Navanta Supply Chain — the multi-seat AI demo, co-designed at Navanta.
   Screens are captures of the demo in a retail pack, plus two from a
   packaging pack to show the same demo dressed for another company. Client
   names and logos are masked (the product's own mark stands in), and
   Christy's draft email address is blanked. Relay steps, signal types and persona quotes are
   the product's own. Show more, say less: one line per section, the screens
   do the explaining. */

const IMG = "/images/navanta/supply-chain-demo";
const PACKAGING = "/images/navanta/supply-chain-packaging";
const SHOT = "1440 / 900";

export default function SupplyChainCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="Navanta Supply Chain"
                            subtitle="One vendor delay, five desks, and nobody finds out late."
                            tags={["AI agents", "Supply chain", "Multi-persona", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Co-designer and builder" },
                                { label: "When", value: "Sep – Nov 2026" },
                                { label: "Company", value: "Navanta" },
                                { label: "Scope", value: "5 seats · 5 agents · 12 industry packs" },
                            ]}
                        />
                        <FlowReel
                            label="Film: one vendor delay handled across five desks in the supply chain demo"
                            hook="02:14. A vendor emails: ten days late."
                            steps={["Buyer", "Planner", "Rep", "Truck", "VP"]}
                            end="One delay. Five desks. Nobody found out late."
                            shots={[
                                {
                                    src: `${IMG}/buying-mercer.png`,
                                    alt: "Buying action center with Mercer committing the new lead time",
                                    step: 0,
                                    caption: "Mercer commits the vendor's new date, and flags that the store hasn't been told.",
                                    dur: 5,
                                    to: { s: 1.75, x: 84, y: 44 },
                                    highlight: { x: 72.5, y: 34.6, w: 25, h: 5.6, at: 3.2 },
                                },
                                {
                                    src: `${IMG}/planning-stocking.png`,
                                    alt: "Planner's queue with Iris proposing more safety stock",
                                    step: 1,
                                    caption: "Iris sizes the bigger buffer the new lead time needs. Priya approves it.",
                                    dur: 5,
                                    to: { s: 1.6, x: 60, y: 60 },
                                    highlight: { x: 3, y: 58.6, w: 94, h: 6.6, at: 1.2 },
                                    click: { x: 73, y: 62.3, at: 3.6 },
                                },
                                {
                                    src: `${IMG}/service-christy.png`,
                                    alt: "Service action center with Christy re-promising the store order",
                                    step: 2,
                                    caption: "Christy moves the store's promise to 29 Aug and drafts the note for Daniela to send.",
                                    dur: 5,
                                    to: { s: 1.75, x: 84, y: 55 },
                                },
                                {
                                    src: `${IMG}/logistics-tova.png`,
                                    alt: "Logistics action center with Tova settling one arrival time",
                                    step: 3,
                                    caption: "Tova settles one arrival time from three systems and tells the customer the window.",
                                    dur: 5,
                                    to: { s: 1.75, x: 85, y: 45 },
                                },
                                {
                                    src: `${IMG}/frame-map.png`,
                                    alt: "The frame record as a hand-off map between agents and people",
                                    step: 4,
                                    caption: "Atlas keeps the record: every hand-off, and where a person decided.",
                                    dur: 5.5,
                                    from: { s: 1.35, x: 36, y: 55 },
                                    to: { s: 1.35, x: 64, y: 55 },
                                },
                                {
                                    src: `${IMG}/ops-overview.png`,
                                    alt: "Operations overview with each agent's acceptance rate",
                                    step: 4,
                                    caption: "Dana sees how much of each agent's work the business takes.",
                                    dur: 4.5,
                                    to: { s: 1.45, x: 50, y: 28 },
                                },
                            ]}
                        />
                    </div>

                    {/* 01 · The problem */}
                    <ScenarioRows
                        heading="The ten-day email"
                        lead="02:14. A vendor emails: your order ships ten days late."
                        rows={[
                            { statement: "The buyer has to accept the date.", consequence: "Finds out when it passes." },
                            { statement: "The planner's buffer is now too thin.", consequence: "Nobody tells them." },
                            { statement: "A store is waiting for a set date.", consequence: "The rep hears it when they call." },
                            { statement: "A truck is booked for the old date.", consequence: "It runs on the wrong day." },
                        ]}
                        closing="One fact. Four desks. Four different days."
                    />

                    {/* 02 · Approach */}
                    <Pillars
                        heading="Three rules"
                        intro="Five seats, each a person with their own AI agent."
                        items={[
                            { title: "One record", body: "PO-4471 is the same record on every seat." },
                            { title: "Agents act, people decide", body: "Money, a promise or a policy at stake? The agent holds it for a person." },
                            { title: "One shape", body: "Every seat has an action center, its reports and its settings." },
                        ]}
                    />

                    {/* 03 · My role */}
                    <Split heading="My role">
                        <Paragraphs
                            items={[
                                "Co-designed the demo with Navanta's product team (the seats, the signals, the relay) and built it in code.",
                                "Built or extended five industry packs, wrote the AI skills that stand up a new one, and ran a heuristic review of every action center.",
                            ]}
                        />
                    </Split>

                    <ScreenFrame
                        title="The profile switcher over the S&OP review"
                        src={`${IMG}/profile-switcher.png`}
                        aspect={SHOT}
                        caption="One demo, five seats, one profile menu to move between them."
                    />

                    {/* 04 · Bridge */}
                    <BridgeQuestion
                        question="What does each desk need to see, and when?"
                        note="One relay first, then each seat, then the VP."
                    />

                    {/* 05 · The relay */}
                    <RelayLanes
                        eyebrow="The relay"
                        heading="One delay, five desks"
                        intro={["PO-4471, step by step. Press play."]}
                        lanes={[
                            { id: "buy", seat: "Buy", person: "Marcus", agent: "Mercer", icon: "Handshake" },
                            { id: "plan", seat: "Plan", person: "Priya", agent: "Iris", icon: "Gauge" },
                            { id: "serve", seat: "Serve", person: "Daniela", agent: "Christy", icon: "Headset" },
                            { id: "move", seat: "Move", person: "Terrence", agent: "Tova", icon: "Truck" },
                        ]}
                        observer={{ seat: "VP", person: "Dana", agent: "Atlas", icon: "PresentationChart" }}
                        steps={[
                            {
                                lane: "plan",
                                actor: "Iris",
                                kind: "agent",
                                badge: "Read",
                                version: "4.2",
                                day: "11 Aug",
                                at: "02:14",
                                what: "Finishes the nightly cover run",
                                detail: "The throw blanket falls under its buffer in nine days.",
                                cause: "Coverage shortfall",
                                ref: "PO-4471",
                            },
                            {
                                lane: "buy",
                                actor: "Mercer",
                                kind: "agent",
                                hold: true,
                                badge: "Held",
                                version: "2.1",
                                day: "11 Aug",
                                at: "08:40",
                                what: "Recommends the new lead time, held for the buyer",
                                detail: "42 days against the quoted 32, on the vendor's own record.",
                                cause: "Supply constraint",
                                ref: "PO-4471",
                            },
                            {
                                lane: "buy",
                                actor: "Marcus",
                                kind: "person",
                                badge: "Accepted",
                                day: "11 Aug",
                                at: "09:20",
                                what: "Accepts it",
                                detail: "Ten more days for three months. Promise dates revised.",
                                cause: "Supply constraint",
                                ref: "PO-4471",
                            },
                            {
                                lane: "plan",
                                actor: "Iris",
                                kind: "agent",
                                hold: true,
                                badge: "Held",
                                version: "4.2",
                                day: "11 Aug",
                                at: "11:38",
                                what: "Proposes more safety stock, held for the planner",
                                detail: "A longer lead time needs a bigger buffer.",
                                cause: "Coverage shortfall",
                                ref: "PO-4471",
                            },
                            {
                                lane: "plan",
                                actor: "Priya",
                                kind: "person",
                                badge: "Approved",
                                day: "11 Aug",
                                at: "12:15",
                                what: "Approves it",
                                detail: "The only blocking decision in the relay.",
                                cause: "Coverage shortfall",
                                ref: "PO-4471",
                            },
                            {
                                lane: "serve",
                                actor: "Christy",
                                kind: "agent",
                                badge: "Notified",
                                version: "1.4",
                                day: "12 Aug",
                                at: "14:20",
                                what: "Tells the account, with two options",
                                detail: "Keep the date on a partial, or move it and ship complete.",
                                cause: "Supply constraint",
                                ref: "SO-4471",
                            },
                            {
                                lane: "serve",
                                actor: "Daniela",
                                kind: "person",
                                badge: "Notified",
                                day: "12 Aug",
                                at: "14:32",
                                what: "Puts both options to the store",
                                detail: "A 48-hour soft hold on their set date.",
                                cause: "Supply constraint",
                                ref: "SO-4471",
                            },
                            {
                                lane: "move",
                                actor: "Tova",
                                kind: "agent",
                                badge: "Committed",
                                version: "3.0",
                                day: "13 Aug",
                                at: "09:30",
                                what: "Re-dates the load",
                                detail: "Same carrier, same rate, new ready date.",
                                cause: "In-transit exception",
                                ref: "LD-70412",
                            },
                            {
                                lane: "buy",
                                actor: "Mercer",
                                kind: "agent",
                                hold: true,
                                badge: "Held",
                                version: "2.1",
                                day: "13 Aug",
                                at: "16:05",
                                what: "Recommends a second source, held for the buyer",
                                detail: "Four days faster on the same spec. Still open.",
                                cause: "Supply constraint",
                                ref: "PO-4515",
                            },
                        ]}
                        summary="Nine steps, three days. Agents took six, people took three. Nobody re-keyed the order."
                    >
                        <ScreenTabs
                            label="The relay in the product"
                            items={[
                                {
                                    label: "The record",
                                    note: "Every step, who took it, and whether it waited for a person.",
                                    screen: {
                                        title: "The PO-4471 frame record",
                                        src: `${IMG}/frame-record.png`,
                                        aspect: "1440 / 1600",
                                    },
                                },
                                {
                                    label: "The hand-offs",
                                    note: "Atlas assigns, an agent acts, a person decides, and it hands back.",
                                    screen: {
                                        title: "The PO-4471 frame as a hand-off map",
                                        src: `${IMG}/frame-map.png`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </RelayLanes>

                    {/* 06 · The seats */}
                    <SeatSwitcher
                        eyebrow="The seats"
                        heading="What each desk sees"
                        intro={["Pick a seat, then a screen."]}
                        seats={[
                            {
                                id: "dana",
                                name: "Dana",
                                role: "VP, Supply Chain",
                                icon: "PresentationChart",
                                agent: "Atlas",
                                agentRole: "Executive agent",
                                agentDoes: "Walks every gap back to the seat that owns it.",
                                question: "Where does the month stand?",
                                screens: [
                                    {
                                        label: "Dashboard",
                                        note: "Five measures for the whole chain. Each one drills into its seat.",
                                        screen: { title: "Executive dashboard", src: `${IMG}/executive-dashboard.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "Cost to serve",
                                        note: "What each segment costs to keep, and Atlas's fix.",
                                        screen: { title: "Cost to serve", src: `${IMG}/cost-to-serve.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "marcus",
                                name: "Marcus",
                                role: "Buyer / Commodity Manager",
                                icon: "Handshake",
                                agent: "Mercer",
                                agentRole: "Buying agent",
                                agentDoes: "Catches the date change and tells everyone it touches.",
                                question: "Did a vendor just move my date?",
                                quote: "I find out a container slipped when the promise date passes — three weeks after the factory knew.",
                                screens: [
                                    {
                                        label: "Action center",
                                        note: "Commit 40 days: Mercer writes it to the record and raises it with Daniela.",
                                        screen: { title: "Buying action center with Mercer", src: `${IMG}/buying-mercer.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "Opportunities",
                                        note: "Mercer's overnight sweep: eight savings plays, ranked by confidence.",
                                        screen: { title: "Sourcing opportunities", src: `${IMG}/buying-opportunities.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "A play",
                                        note: "Savings, suppliers and evidence, with approve, park or reject.",
                                        screen: { title: "Opportunity detail", src: `${IMG}/opportunity-detail.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "priya",
                                name: "Priya",
                                role: "Deployment Planner",
                                icon: "Gauge",
                                agent: "Iris",
                                agentRole: "Planning agent",
                                agentDoes: "Re-sizes the buffer the moment a lead time moves.",
                                question: "Which sites go short, and by when?",
                                quote: "I can only work the few hundred positions I can reach. The other forty thousand are hoping I picked the right ones.",
                                screens: [
                                    {
                                        label: "Action center",
                                        note: "Days of cover against need, and Iris's safety-stock change for each.",
                                        screen: { title: "Product stocking policy with Iris", src: `${IMG}/planning-stocking.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "Inventory",
                                        note: "Where the book is exposed, by value and by how steady demand is.",
                                        screen: { title: "Inventory planning", src: `${IMG}/inventory-planning.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "daniela",
                                name: "Daniela",
                                role: "Customer Service Rep",
                                icon: "Headset",
                                agent: "Christy",
                                agentRole: "Service agent",
                                agentDoes: "Tells the customer first, with options.",
                                question: "What do I tell the store before they call?",
                                quote: "By the time an account calls me, they already know something's wrong. I'm three systems behind the conversation.",
                                screens: [
                                    {
                                        label: "Action center",
                                        note: "Christy re-promises SO-4471, re-books the crew and drafts the note.",
                                        screen: { title: "Service action center with Christy", src: `${IMG}/service-christy.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "The order",
                                        note: "The promise, the cause, and the one action left to take.",
                                        screen: { title: "Order record SO-4471", src: `${IMG}/order-record.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "terrence",
                                name: "Terrence",
                                role: "Logistics Coordinator",
                                icon: "Truck",
                                agent: "Tova",
                                agentRole: "Logistics agent",
                                agentDoes: "Settles one arrival time from three systems.",
                                question: "Which of three arrival times is true?",
                                quote: "DC appointment book says delivered. The WMS says delivered. Ten units are crushed under the wrap and every system is perfectly happy.",
                                screens: [
                                    {
                                        label: "Action center",
                                        note: "Tova checks the appointment book and the carrier, then writes one time.",
                                        screen: { title: "Logistics action center with Tova", src: `${IMG}/logistics-tova.png`, aspect: SHOT },
                                    },
                                ],
                            },
                        ]}
                    />

                    {/* 07 · Signals */}
                    <QuestionSection eyebrow="Signals" question="Whose signal is it?" why={["Seven causes, one owner each. Every one runs the same four stages."]}>
                        <SignalMap
                            owners={[
                                { seat: "Buy", agent: "Mercer", signals: ["Supply constraint", "Awaiting confirmation"] },
                                { seat: "Plan", agent: "Iris", signals: ["Coverage shortfall", "Excess and obsolete"] },
                                { seat: "Serve", agent: "Christy", signals: ["Damage and claims"] },
                                { seat: "Move", agent: "Tova", signals: ["In-transit exception", "Cost variance"] },
                            ]}
                            stages={["Signal", "Assess", "Decide", "Act and verify"]}
                        />
                    </QuestionSection>

                    {/* 08 · The VP */}
                    <Pivot
                        lead="That's the desks."
                        statement="Dana runs the whole chain, and the agents working it."
                        body={[]}
                    />

                    <QuestionSection
                        eyebrow="The VP · Agents"
                        question="Are the agents earning their keep?"
                        why={["Acceptance by agent, site and frame. An override is a signal, not a failure."]}
                    >
                        <ScreenTabs
                            label="Agent performance"
                            items={[
                                {
                                    label: "All agents",
                                    note: "How much of each agent's work the business takes.",
                                    screen: { title: "Operations overview", src: `${IMG}/ops-overview.png`, aspect: SHOT },
                                },
                                {
                                    label: "One agent",
                                    note: "Atlas: accepted, overridden, rejected, and what it may never do.",
                                    screen: { title: "Atlas agent card", src: `${IMG}/atlas-card.png`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    <QuestionSection
                        eyebrow="The VP · Authority"
                        question="What can an agent do on its own?"
                        why={["Inside its ceiling, it acts. Above it, it recommends and waits. That's what a hold is."]}
                        screen={{
                            title: "Mercer's authority in the AI workflow",
                            src: `${IMG}/ai-workflow.png`,
                            aspect: SHOT,
                            caption: "Mercer: supplier and PO changes up to $100K, decided with the buyer.",
                        }}
                    />

                    <QuestionSection
                        eyebrow="The VP · S&OP"
                        question="Who disagrees, and by how much?"
                        why={["Commercial, Operations and Finance each bring a number. Atlas says which one rests on evidence."]}
                    >
                        <ScreenTabs
                            label="S&OP review"
                            items={[
                                {
                                    label: "Demand and supply",
                                    note: "Three positions, one gap, and what each rests on.",
                                    screen: { title: "S&OP demand and supply", src: `${IMG}/siop-demand.png`, aspect: SHOT },
                                },
                                {
                                    label: "Ask Atlas",
                                    note: "The answer comes back as a decision card, not a paragraph.",
                                    screen: { title: "Atlas answering in the S&OP review", src: `${IMG}/atlas-disagree.png`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 09 · Decisions */}
                    <Decisions
                        heading="Design calls"
                        intro={[]}
                        items={[
                            {
                                decision: "Stages are only what the buyer can see.",
                                why: "We cut “In production”: nobody sees inside a vendor's plant.",
                            },
                            {
                                decision: "A hold is the only place a person is required.",
                                why: "Authority ceilings decide it, so every hold has a reason.",
                            },
                            {
                                decision: "A link to another seat's record opens that seat.",
                                why: "No dead ends when records cross desks.",
                            },
                            {
                                decision: "A row must ask for a decision.",
                                why: "“Change nothing” never takes a queue row.",
                            },
                        ]}
                    />

                    {/* 10 · Scale */}
                    <QuestionSection
                        eyebrow="Scale"
                        question="Same demo, next prospect."
                        why={["A pack swaps the data and the words. The seats, signals and relay stay."]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "12 packs", note: "Retail, packaging, flooring, dairy, energy and more." },
                                    { label: "Skills", note: "Research, design, build and audit a new pack." },
                                    { label: "Review", note: "One heuristic audit across every action center." },
                                ]}
                            />
                        }
                    >
                        <ScreenTabs
                            label="The same page in two packs"
                            items={[
                                {
                                    label: "Retail",
                                    note: "A retail pack: stores, distribution centres, owned brands.",
                                    screen: { title: "S&OP review in the retail pack", src: `${IMG}/siop-demand.png`, aspect: SHOT },
                                },
                                {
                                    label: "Packaging",
                                    note: "An industrial packaging pack: same page, their numbers, their colours.",
                                    screen: { title: "S&OP review in the packaging pack", src: `${PACKAGING}/siop-demand.png`, aspect: SHOT },
                                },
                                {
                                    label: "Packaging · Plant",
                                    note: "Manufacturers get a sixth seat: the plant schedule, with Sawyer.",
                                    screen: { title: "Plant schedule with Sawyer", src: `${PACKAGING}/plant-schedule.png`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 11 · Outcome */}
                    <Outcomes
                        heading="In numbers"
                        intro={[]}
                        items={[
                            { value: "12", label: "Industry packs on one demo" },
                            { value: "7", label: "Signal types, one owner each" },
                            { value: "1", label: "Record for a delay, on every seat" },
                        ]}
                    />

                    {/* 12 · Next */}
                    <NextProject label="Next case study" title="LPS Planning: demand moves before the plan does" />
                </div>
            </div>
        </div>
    );
}
