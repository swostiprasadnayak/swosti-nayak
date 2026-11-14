"use client";
import React from "react";

import CaseStudyHeader from "../blocks/CaseStudyHeader";
import classes from "./caseStudy.module.css";
import nav from "../navanta/navanta.module.css";
import {
    BridgeQuestion,
    NextProject,
    Outcomes,
    Paragraphs,
    Pillars,
    Pivot,
    QuestionSection,
    RoleStrip,
    ScenarioRows,
    Split,
    StateLegend,
} from "../navanta/blocks";
import ScreenFrame from "../navanta/ScreenFrame";
import ScreenTabs from "../navanta/ScreenTabs";
import FlowReel from "../navanta/FlowReel";
import LifecycleTracker from "../navanta/LifecycleTracker";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";

/* LPS Planning — demand planning for a pro building-supply business, built at
   Navanta on the Supply Chain platform. Two demos, one product loop:
   Houston (a seasonal shift: ×2.38 at five stores, two suppliers, an MOQ)
   and Dallas (a trend surge: ×1.48 at one store near a project award, one
   PO, then a branch transfer to cover a contractor's order). Screens are
   captures of the running demos with the client's logo masked (the
   product's own mark stands in). Figures, people and stores are the demos'
   own demo data. The two films are FlowReels, one per signal. */

const IMG = "/images/navanta/lps";
const SHOT = "1440 / 900";

export default function LpsCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="LPS Planning"
                            subtitle="Demand moves before the plan does. Two signals, one way to catch them."
                            tags={["AI agents", "Demand planning", "Supply chain", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Co-designer and builder" },
                                { label: "When", value: "Nov 2026" },
                                { label: "Company", value: "Navanta" },
                                { label: "Scope", value: "2 signals · 5 people · 4 agents" },
                            ]}
                        />
                        <FlowReel
                            label="Film: a Houston cold snap goes from a dashboard signal to two purchase orders"
                            hook="Three weeks of freezing nights in Houston."
                            steps={["Signal", "Review", "Apply", "Buy", "Order"]}
                            end="Cold nights to purchase orders. A person signed every step."
                            shots={[
                                {
                                    src: `${IMG}/houston-dashboard.jpg`,
                                    alt: "The VP's executive dashboard with Seasonal shift in demand at the top of Recent frames",
                                    step: 0,
                                    caption: "Dana's dashboard opens a frame: Seasonal shift in demand.",
                                    dur: 4.5,
                                    to: { s: 1.6, x: 30, y: 60 },
                                    highlight: { x: 7.5, y: 52.4, w: 41.5, h: 6.6, at: 1.6 },
                                    click: { x: 46, y: 54.6, at: 3.4 },
                                },
                                {
                                    src: `${IMG}/houston-frame.jpg`,
                                    alt: "Atlas's frame review holding two decisions for the planner",
                                    step: 1,
                                    caption: "Atlas reads the signal and holds two calls for Maya, the planner.",
                                    dur: 5,
                                    to: { s: 1.7, x: 85, y: 56 },
                                    click: { x: 78.3, y: 75.7, at: 3.8 },
                                },
                                {
                                    src: `${IMG}/houston-demand.jpg`,
                                    alt: "Demand build-up for the Houston cold snap with Iris's banner and five stores at ×1.00",
                                    step: 2,
                                    caption: "Five stores sell ×2.38 of plan. The forecast stays ×1.00 until Maya applies the trend.",
                                    dur: 5.5,
                                    to: { s: 1.55, x: 62, y: 40 },
                                    highlight: { x: 29.7, y: 28.2, w: 64.2, h: 4.3, at: 1.4 },
                                    click: { x: 90, y: 29.8, at: 4 },
                                },
                                {
                                    src: `${IMG}/houston-inventory.jpg`,
                                    alt: "Inventory planning's Needs stock tab with the heater kit and gas line expanded by store",
                                    step: 3,
                                    caption: "Needs stock: the heater kit is 29 short, the gas line 190 — rounded up to a 500 MOQ.",
                                    dur: 5,
                                    to: { s: 1.45, x: 50, y: 52 },
                                    highlight: { x: 6.7, y: 47.2, w: 88.3, h: 12.3, at: 1.4 },
                                },
                                {
                                    src: `${IMG}/houston-pos.jpg`,
                                    alt: "Purchase orders with two requisitions, one per supplier",
                                    step: 4,
                                    caption: "Two requisitions, one per supplier: 529 units, $7.2K, inside February's budget.",
                                    dur: 5,
                                    to: { s: 1.45, x: 55, y: 48 },
                                    click: { x: 87.8, y: 40.9, at: 3.4 },
                                },
                                {
                                    src: `${IMG}/houston-gaps.jpg`,
                                    alt: "Supply gaps: units short by reason until the orders land",
                                    step: 4,
                                    caption: "Until the POs land, Supply gaps shows who is still short, and why.",
                                    dur: 4.5,
                                    to: { s: 1.35, x: 50, y: 32 },
                                },
                            ]}
                        />
                    </div>

                    {/* 01 · The problem */}
                    <ScenarioRows
                        heading="Two signals the plan didn't see"
                        lead="The forecast says ×1.00. The stores say otherwise."
                        rows={[
                            {
                                statement: "Houston: three weeks of freezing nights.",
                                consequence: "Heater kits and gas lines sell twice their plan at five stores.",
                            },
                            {
                                statement: "Dallas: a hospital build breaks ground.",
                                consequence: "One store sells ×1.48 of plan on a single wedge anchor.",
                            },
                            {
                                statement: "Both forecasts still read ×1.00.",
                                consequence: "So the 16-week targets come up short, and nobody buys.",
                            },
                            {
                                statement: "A contractor needs 120 anchors by 5 Nov.",
                                consequence: "The branch hears about it when they call.",
                            },
                        ]}
                        closing="One signal is wide and seasonal. One is narrow and tied to a project. The product has to catch both."
                    />

                    {/* 02 · Approach */}
                    <Pillars
                        heading="Three rules"
                        intro="A VP, a planner, a buyer and a branch, each with their own AI agent."
                        items={[
                            {
                                title: "Agents read, people apply",
                                body: "Iris proposes the trend. Nothing in the forecast moves until the planner applies it.",
                            },
                            {
                                title: "Show the math",
                                body: "Every buy shows target, stock and order, so the number can be checked, not trusted.",
                            },
                            {
                                title: "Buy only what moved",
                                body: "The order covers the SKU and stores that rose. Every other branch orders nothing.",
                            },
                        ]}
                    />

                    {/* 03 · My role */}
                    <Split heading="My role">
                        <Paragraphs
                            items={[
                                "Co-designed the planning seats with Navanta's product team — demand build-up, inventory planning, purchase orders, supply gaps and events — and built them in code on the Navanta Supply Chain platform.",
                                "Scripted both demos and their product films: one for a seasonal shift across a region, one for a surge at a single store.",
                            ]}
                        />
                    </Split>

                    <ScreenFrame
                        title="The VP's executive dashboard"
                        src={`${IMG}/houston-dashboard.jpg`}
                        aspect={SHOT}
                        caption="Dana's dashboard: Atlas's summary, five measures against target, and the frames waiting for review."
                    />

                    {/* 04 · Bridge */}
                    <BridgeQuestion
                        question="How does a trend at a store become a purchase order, with a person deciding every step?"
                        note="The loop once, then the second signal, then the weeks before the stock lands."
                    />

                    {/* 05 · Signal */}
                    <QuestionSection
                        eyebrow="Signal"
                        question="Is this a trend, or noise?"
                        why={[
                            "Atlas reads the signal on the VP's dashboard and opens a frame: what happened, what it means, and who has to decide.",
                            "It doesn't act. Each recommendation is held for the seat that owns it — two for the planner in Houston, four across four people in Dallas.",
                        ]}
                    >
                        <ScreenTabs
                            label="The frame in each demo"
                            items={[
                                {
                                    label: "Houston",
                                    note: "Two calls from Iris, both for Maya: apply the trend, then approve the units.",
                                    screen: {
                                        title: "Atlas on the Seasonal shift frame",
                                        src: `${IMG}/houston-frame.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Dallas",
                                    note: "Four calls, each held for a different person: Priya twice, Marcus, Daniela.",
                                    screen: {
                                        title: "Atlas on the Trend surge frame",
                                        src: `${IMG}/dallas-frame.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 06 · Apply */}
                    <QuestionSection
                        eyebrow="Apply"
                        question="How much more will we sell?"
                        why={[
                            "Demand build-up lists the stores under the event with their trend. Iris reads the real multiplier, but the column stays ×1.00, marked “not applied”, until a person applies it.",
                            "Applying shows the next 16 weeks before and after, and logs the change to the audit trail under the planner's name.",
                        ]}
                    >
                        <ScreenTabs
                            label="Applying the trend"
                            items={[
                                {
                                    label: "Five stores",
                                    note: "Houston: five stores at ×1.00 while Iris reads ×2.36 to ×2.43. The heater kit's 16 weeks go 1,357 → 1,829.",
                                    screen: {
                                        title: "Demand build-up for the Houston cold snap",
                                        src: `${IMG}/houston-demand.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "One store",
                                    note: "Dallas: Iris's card shows the one store, the units to add, and the forecast 1,228 → 1,380.",
                                    screen: {
                                        title: "Iris proposing the trend for Dallas 440",
                                        src: `${IMG}/dallas-review.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Applied",
                                    note: "Applied, and logged to the audit trail as Priya's change. Next stop: Inventory planning.",
                                    screen: {
                                        title: "The trend applied at Dallas 440",
                                        src: `${IMG}/dallas-applied.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 07 · Buy */}
                    <QuestionSection
                        eyebrow="Buy"
                        question="So what do we actually order?"
                        why={[
                            "Inventory planning turns the new forecast into a buy, SKU by SKU and store by store, with the arithmetic on screen. In Dallas: 118 for the next 4 weeks + 160 branch max − 38 on hand = 240.",
                            "Supplier rules are part of the answer. The gas line is 190 short, but its supplier sells in 500s, so the line rounds up. Store lines can be edited, never below the MOQ.",
                        ]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "Target", note: "16 weeks of supply at the new forecast." },
                                    { label: "Stock", note: "On hand plus on order, at the stores." },
                                    { label: "Buy", note: "Target minus stock, then up to the supplier's MOQ." },
                                ]}
                            />
                        }
                    >
                        <ScreenTabs
                            label="Needs stock in each demo"
                            items={[
                                {
                                    label: "Houston",
                                    note: "Two SKUs, six store orders. Each SKU opens to the stores that need it.",
                                    screen: {
                                        title: "Needs stock for the Houston Hub",
                                        src: `${IMG}/houston-inventory.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Dallas",
                                    note: "One SKU, one store: 240 units, $9,216. Approve, and Mercer drafts the PO for Marcus.",
                                    screen: {
                                        title: "Approving the wedge anchor's units with Iris",
                                        src: `${IMG}/dallas-approve.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 08 · Order */}
                    <LifecycleTracker
                        eyebrow="Order"
                        heading="From a trend to a PO"
                        intro={[
                            "Approved buys become requisitions, one per supplier, routed by value and sent to SAP. Click through the Dallas anchor's path: each step is a real screen.",
                        ]}
                        steps={[
                            {
                                name: "Signal",
                                note: "Dana's dashboard opens the Trend surge frame for Dallas 440.",
                                screen: { title: "Signal", src: `${IMG}/dallas-dashboard.jpg`, aspect: SHOT },
                            },
                            {
                                name: "Trend applied",
                                note: "Priya applies ×1.48 at one store. The next 16 weeks go 1,228 → 1,380.",
                                screen: { title: "Trend applied", src: `${IMG}/dallas-applied.jpg`, aspect: SHOT },
                            },
                            {
                                name: "Needs stock",
                                note: "The requirement re-runs: Dallas DC is 240 short of a 278 target.",
                                screen: { title: "Needs stock", src: `${IMG}/dallas-needs.jpg`, aspect: SHOT },
                            },
                            {
                                name: "Units approved",
                                note: "Priya approves 240 units, $9,216. Mercer drafts the PO.",
                                screen: { title: "Units approved", src: `${IMG}/dallas-approve.jpg`, aspect: SHOT },
                            },
                            {
                                name: "Buyer approves",
                                note: "One requisition in Marcus's queue. February's budget keeps $59.8K.",
                                screen: { title: "Buyer approves", src: `${IMG}/dallas-queue.jpg`, aspect: SHOT },
                            },
                        ]}
                    />

                    {/* 09 · The second signal */}
                    <Pivot
                        lead="Houston is a season across a region."
                        statement="Dallas is one store, one project, and a customer about to call."
                        body={[
                            "Same loop, a different shape. The trend is applied at one store only, the buy is scoped to one SKU, and the last step isn't a PO at all: it's covering an order that can't wait for one.",
                        ]}
                    />
                    <FlowReel
                        label="Film: a single-store surge in Dallas, from the trend to covering a contractor's order"
                        hook="A contractor is about to call Dallas 440."
                        steps={["Signal", "Apply", "Buy", "Approve", "Cover"]}
                        end="The plan moved before the phone rang."
                        shots={[
                            {
                                src: `${IMG}/dallas-frame.jpg`,
                                alt: "Atlas holding four recommendations for four people",
                                step: 0,
                                caption: "Dallas 440 sells ×1.48 near a hospital build. Atlas holds four calls for four people.",
                                dur: 5,
                                to: { s: 1.7, x: 85, y: 44 },
                                click: { x: 78.3, y: 75.6, at: 3.8 },
                            },
                            {
                                src: `${IMG}/dallas-review.jpg`,
                                alt: "Iris's card proposing the trend for one store",
                                step: 1,
                                caption: "Priya applies Iris's trend: the next 16 weeks go from 1,228 to 1,380.",
                                dur: 5,
                                to: { s: 1.6, x: 85, y: 62 },
                                click: { x: 91.1, y: 76.1, at: 3.6 },
                            },
                            {
                                src: `${IMG}/dallas-approve.jpg`,
                                alt: "Iris's card approving 240 units to order",
                                step: 2,
                                caption: "240 units to order, $9,216. Mercer drafts the PO for the buyer.",
                                dur: 5,
                                to: { s: 1.6, x: 84, y: 62 },
                                click: { x: 93.1, y: 75.2, at: 3.6 },
                            },
                            {
                                src: `${IMG}/dallas-queue.jpg`,
                                alt: "The buyer's queue with one requisition",
                                step: 3,
                                caption: "Marcus approves it from his buying queue.",
                                dur: 4.5,
                                to: { s: 1.55, x: 60, y: 52 },
                                click: { x: 80.1, y: 58.6, at: 3.2 },
                            },
                            {
                                src: `${IMG}/dallas-search.jpg`,
                                alt: "The branch associate's inventory map with Dallas 440 short",
                                step: 4,
                                caption: "Rivera needs 120 by 5 Nov. Dallas 440 has 38, and the PO lands in February.",
                                dur: 5,
                                to: { s: 1.7, x: 73, y: 36 },
                                click: { x: 68.3, y: 43.3, at: 3.6 },
                            },
                            {
                                src: `${IMG}/dallas-request.jpg`,
                                alt: "Christy proposing three ways to cover the order",
                                step: 4,
                                caption: "Christy finds 150 at Fort Worth 583, landing 4 Nov. Daniela approves the transfer.",
                                dur: 5.5,
                                to: { s: 1.5, x: 80, y: 58 },
                                click: { x: 93, y: 74.1, at: 4 },
                            },
                            {
                                src: `${IMG}/dallas-instock.jpg`,
                                alt: "The transfer approved and the order promised for 4 Nov",
                                step: 4,
                                caption: "The order is promised for 4 Nov, logged in both ERPs.",
                                dur: 4.5,
                                to: { s: 1.6, x: 84, y: 60 },
                            },
                        ]}
                    />

                    {/* 10 · Cover */}
                    <QuestionSection
                        eyebrow="Cover"
                        question="What about the order that can't wait for the PO?"
                        why={[
                            "Rivera Concrete needs 120 anchors by 5 Nov; Dallas 440 has 38. Christy searches the network, prices the routes and offers three ways to cover it: a transfer, a shuttle from the DC, or a pickup.",
                            "Daniela keeps the transfer from Fort Worth 583: 150 units, a day before the shuttle, and no branch left short. It's approved in both ERPs, because Fort Worth stocks the anchor under its own item number.",
                        ]}
                    >
                        <ScreenTabs
                            label="Covering the order"
                            items={[
                                {
                                    label: "Short",
                                    note: "Daniela's branch view: four SKUs short, and the order that's waiting on one of them.",
                                    screen: {
                                        title: "Inventory search at Dallas 440",
                                        src: `${IMG}/dallas-search.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Three ways",
                                    note: "Christy's pick, the route on the map, and two alternatives with their dates.",
                                    screen: {
                                        title: "Christy's ways to cover the order",
                                        src: `${IMG}/dallas-request.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Covered",
                                    note: "TR-WC-0912 moves 150 by 4 Nov, and the customer's order is promised for the same day.",
                                    screen: {
                                        title: "The transfer approved",
                                        src: `${IMG}/dallas-instock.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 11 · Before it lands */}
                    <QuestionSection
                        eyebrow="Before it lands"
                        question="Who's still short until the stock arrives?"
                        why={[
                            "Supply gaps covers the weeks before a PO lands: 619 units short in Houston, and why — 92% because stores need more than the hub holds, 8% held back by an MOQ.",
                            "Events adds the demand that's planned rather than sensed. A campaign and two promotions sit on top of the forecast, so trend and events land in one number.",
                        ]}
                    >
                        <ScreenTabs
                            label="Gaps and events"
                            items={[
                                {
                                    label: "Supply gaps",
                                    note: "Each short SKU with its reason, the stores it touches, and Iris's next step.",
                                    screen: {
                                        title: "Supply gaps for the Houston Hub",
                                        src: `${IMG}/houston-gaps.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                                {
                                    label: "Events",
                                    note: "Holiday property prep is running; Black Friday and year-end promotions are next.",
                                    screen: {
                                        title: "Planned demand events",
                                        src: `${IMG}/houston-events.jpg`,
                                        aspect: SHOT,
                                    },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 12 · Outcome */}
                    <Outcomes
                        heading="What the two demos show"
                        intro={[]}
                        items={[
                            { value: "529", label: "Units bought in Houston, across two POs" },
                            { value: "4 Nov", label: "Rivera's order promised, a day early" },
                            { value: "0", label: "Forecast changes made without a person" },
                        ]}
                    />

                    {/* 13 · Next */}
                    <NextProject label="Next case study" title="Insure-Tech: insurance plans from a document upload" />
                </div>
            </div>
        </div>
    );
}
