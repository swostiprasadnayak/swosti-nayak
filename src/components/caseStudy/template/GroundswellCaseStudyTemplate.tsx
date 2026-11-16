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
    Split,
    StateLegend,
} from "../navanta/blocks";
import ScreenFrame from "../navanta/ScreenFrame";
import ScreenTabs from "../navanta/ScreenTabs";
import FlowReel from "../navanta/FlowReel";
import FilmPlayer from "../navanta/FilmPlayer";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";

/* Demand Sensing: the Trend surge demo, built at Navanta on the Supply Chain
   platform: one store (a Dallas branch) sells ×1.48 of plan near a hospital
   award, the trend is applied and bought for, and a contractor's order that
   can't wait for the PO is covered from the branch network on a map.
   The hero is the product film made for the demo (exported from Motion, so
   it carries the client's own screens). Its map pane rendered blank, so the
   map gets its own camera-guided reel over the real screens. Screenshots have
   the client's logo masked (the product's mark stands in). Figures, people
   and stores are the demo's own demo data. */

const IMG = "/images/navanta/groundswell";
const SHOT = "1440 / 900";

export default function GroundswellCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero film */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="Demand Sensing"
                            subtitle="A surge at one store, caught before the contractor calls."
                            tags={["AI agents", "Demand planning", "Supply chain", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Designer and builder" },
                                { label: "When", value: "Nov 2026" },
                                { label: "Company", value: "Navanta" },
                                { label: "Scope", value: "4 seats · 4 agents · 1 map" },
                            ]}
                        />
                        <FilmPlayer
                            src="/videos/groundswell.mp4"
                            poster={`${IMG}/film-poster.jpg`}
                            label="Film: a trend surge at one Dallas branch, from the dashboard signal to covering a contractor's order"
                            chapters={[
                                { name: "Signal", at: 0, caption: "A hospital expansion lands in Dallas. One store's wedge anchors sell ×1.48 of plan." },
                                { name: "Atlas", at: 11.5, caption: "Atlas reads it overnight: four calls, each held for the seat that owns it." },
                                { name: "Apply", at: 15.5, caption: "Priya applies Iris's trend. The next 16 weeks go from 1,228 to 1,380." },
                                { name: "Buy", at: 22.5, caption: "Priya approves the units to order, and Mercer drafts the PO." },
                                { name: "PO", at: 28.5, caption: "Marcus approves the PO from his buying queue." },
                                { name: "Cover", at: 32.5, caption: "Rivera calls for 120; the branch has 38. Christy covers it from a Fort Worth branch." },
                                { name: "End", at: 39, caption: "The plan moved before the call came." },
                            ]}
                        />
                    </div>

                    {/* 01 · The problem */}
                    <ScenarioRows
                        heading="The call that comes too late"
                        lead="A hospital expansion breaks ground near a Dallas branch."
                        rows={[
                            {
                                statement: "Wedge anchors sell ×1.48 of plan, four weeks running.",
                                consequence: "The forecast still says ×1.00.",
                            },
                            {
                                statement: "It's one store out of seven.",
                                consequence: "So the spike hides inside the regional total.",
                            },
                            {
                                statement: "Rivera Concrete needs 120 anchors by 5 Nov.",
                                consequence: "The branch has 38.",
                            },
                            {
                                statement: "A new PO lands in weeks.",
                                consequence: "The contractor needs them this week.",
                            },
                        ]}
                        closing="Usually, the first anyone hears of it is the phone call. In this demo, the plan is already moving."
                    />

                    {/* 02 · Approach */}
                    <Pillars
                        heading="Three rules"
                        intro="A VP, a planner, a buyer and a branch associate, each with their own AI agent."
                        items={[
                            {
                                title: "Agents read, people decide",
                                body: "Iris proposes the trend. Nothing moves until the planner applies it, and every change is logged under their name.",
                            },
                            {
                                title: "Buy only what moved",
                                body: "The trend is applied at one store, and the buy covers that SKU. Every other branch orders nothing.",
                            },
                            {
                                title: "The network is stock too",
                                body: "When a PO can't land in time, the nearest branch with spare is the answer, shown on a map with its route.",
                            },
                        ]}
                    />

                    {/* 03 · My role */}
                    <Split heading="My role">
                        <Paragraphs
                            items={[
                                "Designed the planning, buying and branch seats, including the inventory map, and built them in code on the Navanta Supply Chain platform.",
                                "Scripted the demo and made its product film.",
                            ]}
                        />
                    </Split>

                    <ScreenFrame
                        title="The VP's executive dashboard"
                        src={`${IMG}/dallas-dashboard.jpg`}
                        aspect={SHOT}
                        caption="Dana's dashboard: five measures against plan, questions to ask Atlas, and Trend surge in demand at the top of Recent frames."
                    />

                    {/* 04 · Bridge */}
                    <BridgeQuestion
                        question="How does a trend at one store reach the plan, the PO and the branch, with a person deciding every step?"
                        note="The signal, the plan and the buy first. Then the map, where the order gets covered."
                    />

                    {/* 05 · Signal */}
                    <QuestionSection
                        eyebrow="Signal"
                        question="Is this a trend, or noise?"
                        why={[
                            "Atlas frames the surge on the VP's dashboard, then stops. Each of its four calls waits for the person who owns it.",
                        ]}
                        screen={{
                            title: "Atlas on the Trend surge frame",
                            src: `${IMG}/dallas-frame.jpg`,
                            aspect: SHOT,
                            caption: "Four recommendations, each held for a person, and Open Demand build-up to start.",
                        }}
                    />

                    {/* 06 · Apply */}
                    <QuestionSection
                        eyebrow="Apply"
                        question="How much more will we sell?"
                        why={[
                            "Iris reads ×1.48 at the Dallas branch. The forecast stays at ×1.00 until Priya applies it, and the change is logged as hers.",
                        ]}
                    >
                        <ScreenTabs
                            label="Applying the trend"
                            items={[
                                {
                                    label: "Not applied",
                                    note: "The Dallas branch sold 118 against a plan of 80. Iris's banner says so; the forecast hasn't moved yet.",
                                    screen: { title: "Demand build-up for the hospital award", src: `${IMG}/dallas-demand.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "Iris's card",
                                    note: "One store, the units to add, and the forecast before and after: 1,228 → 1,380.",
                                    screen: { title: "Iris proposing the trend for the Dallas branch", src: `${IMG}/dallas-review.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "Applied",
                                    note: "Applied and logged. The net requirement re-runs in Inventory planning.",
                                    screen: { title: "The trend applied at the Dallas branch", src: `${IMG}/dallas-applied.jpg`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 07 · Buy */}
                    <QuestionSection
                        eyebrow="Buy"
                        question="So what do we actually order?"
                        why={[
                            "The new forecast becomes a buy, with the maths on screen. Priya approves it, Mercer drafts the PO, and it lands in Marcus's queue.",
                        ]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "Target", note: "Weeks of supply at the new forecast." },
                                    { label: "Stock", note: "On hand plus on order." },
                                    { label: "Buy", note: "Target minus stock, up to the supplier's MOQ." },
                                ]}
                            />
                        }
                    >
                        <ScreenTabs
                            label="From needs stock to the PO"
                            items={[
                                {
                                    label: "Needs stock",
                                    note: "One SKU short against its target, with the supplier and lead time beside it.",
                                    screen: { title: "Needs stock for the Dallas DC", src: `${IMG}/dallas-needs.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "Approve",
                                    note: "Iris's card: the order, the price, and who gets the PO next.",
                                    screen: { title: "Approving the units with Iris", src: `${IMG}/dallas-approve.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "The PO",
                                    note: "Marcus's buying queue: one requisition, inside the month's budget.",
                                    screen: { title: "The buyer's queue", src: `${IMG}/dallas-queue.jpg`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 08 · Pivot to the map */}
                    <Pivot
                        lead="The PO is on its way."
                        statement="Rivera Concrete needs 120 anchors by Thursday, and the branch has 38."
                        body={[
                            "This is where the map comes in. The branch associate's desk isn't a stock list: it's the branch network on a map, showing who's short, who has spare, how far apart they are, and how stock would travel between them.",
                        ]}
                    />

                    {/* 09 · The map */}
                    <QuestionSection
                        eyebrow="The map"
                        question="Where's the nearest spare stock, and can it get here in time?"
                        why={[
                            "Every branch is a pin coloured by its stock. Christy searches 30 miles out, closest first, and maps her pick with its landing date.",
                        ]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "Short", color: "#e5484d", note: "Below what its orders need." },
                                    { label: "Balanced", color: "#30a46c", note: "Covered, nothing to spare." },
                                    { label: "Long", color: "#3e9bdc", note: "Spare stock to move." },
                                    { label: "Your branch", color: "#0b3d63", note: "Where the order is." },
                                ]}
                            />
                        }
                    >
                        <FlowReel
                            label="Film: covering a contractor's order from the branch network on the map"
                            hook="Rivera needs 120 anchors. The branch has 38."
                            end="The nearest spare stock, on a map, a day early."
                            shots={[
                                {
                                    src: `${IMG}/dallas-search.jpg`,
                                    alt: "Daniela's inventory map with the Dallas branch short and Rivera's order on the branch",
                                    caption: "Daniela's map: her branch is short on four SKUs, and Rivera's order is waiting on one.",
                                    dur: 5.5,
                                    to: { s: 1.8, x: 73, y: 32 },
                                    highlight: { x: 62.6, y: 18, w: 21, h: 28.5, at: 1.4 },
                                    click: { x: 68.3, y: 43.3, at: 4 },
                                },
                                {
                                    src: `${IMG}/dallas-request.jpg`,
                                    alt: "Christy's route on the map from a Fort Worth branch to Dallas",
                                    caption: "Christy searches a 30-mile ring. A Fort Worth branch has 270 spare; the route lands 150 by Wed 4 Nov.",
                                    dur: 5.5,
                                    to: { s: 1.75, x: 48, y: 52 },
                                    highlight: { x: 34, y: 41.6, w: 29, h: 18.4, at: 1.8 },
                                },
                                {
                                    src: `${IMG}/dallas-request.jpg`,
                                    alt: "Christy's three ways to cover the order",
                                    caption: "Three ways to cover it: a transfer, a DC shuttle or a pickup. Daniela keeps Christy's pick.",
                                    dur: 5.5,
                                    from: { s: 1.75, x: 48, y: 52 },
                                    to: { s: 1.6, x: 85, y: 60 },
                                    highlight: { x: 73.2, y: 50.4, w: 24.4, h: 6.6, at: 2.6 },
                                    click: { x: 93, y: 74.1, at: 4.3 },
                                },
                                {
                                    src: `${IMG}/dallas-instock.jpg`,
                                    alt: "The transfer approved, with the route and branch balances on the map",
                                    caption: "Approved in both ERPs. Rivera's order is promised for 4 Nov.",
                                    dur: 5,
                                    from: { s: 1.35, x: 42, y: 52 },
                                    to: { s: 1.6, x: 84, y: 56 },
                                },
                            ]}
                        />
                    </QuestionSection>

                    <Decisions
                        heading="Map decisions"
                        intro={["The map is the answer to “who can cover this?”, so each part of it carries a decision."]}
                        items={[
                            {
                                decision: "A ring, not a list",
                                why: "The search draws a 30-mile ring around the branch, closest first, so distance is visible before any number is read.",
                            },
                            {
                                decision: "The route is the recommendation",
                                why: "Christy's pick is drawn as a route with its landing date, 150 by 4 Nov, not as a row in a table.",
                            },
                            {
                                decision: "Three ways, one pick",
                                why: "Transfer, DC shuttle or customer pickup, each with units and a date. Christy picks; Daniela decides.",
                            },
                            {
                                decision: "Two ERPs, one move",
                                why: "Fort Worth stocks the anchor under its own item number, so the transfer posts in both systems and is logged to the order.",
                            },
                        ]}
                    />

                    <ScreenFrame
                        title="Christy's ways to cover the order"
                        src={`${IMG}/dallas-request.jpg`}
                        aspect={SHOT}
                        caption="The full desk: short SKUs on the left, the network on the map, and Christy's three ways to cover Rivera's order on the right."
                    />

                    {/* 10 · Outcome */}
                    <Outcomes
                        heading="What the demo shows"
                        intro={[]}
                        items={[
                            { value: "×1.48", label: "Applied at one store, by a person" },
                            { value: "150", label: "Units moved from a branch 30 miles away" },
                            { value: "4 Nov", label: "Rivera's order promised, a day early" },
                        ]}
                    />

                    {/* 11 · Next */}
                    <NextProject from="demand-sensing" />
                </div>
            </div>
        </div>
    );
}
