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

/* LPS Planning — the Trend surge demo, built at Navanta on the Supply Chain
   platform: one store (Dallas 440) sells ×1.48 of plan near a hospital
   award, the trend is applied and bought for, and a contractor's order that
   can't wait for the PO is covered from the branch network on a map.
   The hero is the product film made for the demo (exported from Motion, so
   it carries the client's own screens). Its map pane rendered blank, so the
   map gets its own camera-guided reel over the real screens. Screenshots have
   the client's logo masked (the product's mark stands in). Figures, people
   and stores are the demo's own demo data. */

const IMG = "/images/navanta/lps";
const SHOT = "1440 / 900";

export default function LpsCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero film */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="LPS Planning"
                            subtitle="A surge at one store, caught before the contractor calls."
                            tags={["AI agents", "Demand planning", "Supply chain", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Co-designer and builder" },
                                { label: "When", value: "Nov 2026" },
                                { label: "Company", value: "Navanta" },
                                { label: "Scope", value: "4 seats · 4 agents · 1 map" },
                            ]}
                        />
                        <FilmPlayer
                            src="/videos/lps-trend-surge.mp4"
                            poster={`${IMG}/film-poster.jpg`}
                            label="Film: a trend surge at Dallas 440, from the dashboard signal to covering a contractor's order"
                            chapters={[
                                { name: "Signal", at: 0, caption: "A hospital expansion lands in Dallas. One store's wedge anchors sell ×1.48 of plan." },
                                { name: "Atlas", at: 11.5, caption: "Atlas reads it overnight: four calls, each held for the seat that owns it." },
                                { name: "Apply", at: 15.5, caption: "Priya applies Iris's trend. The next 16 weeks go from 1,228 to 1,380." },
                                { name: "Buy", at: 22.5, caption: "Priya approves the units to order, and Mercer drafts the PO." },
                                { name: "PO", at: 28.5, caption: "Marcus approves the PO from his buying queue." },
                                { name: "Cover", at: 32.5, caption: "Rivera calls for 120; Dallas 440 has 38. Christy covers it from Fort Worth 583." },
                                { name: "End", at: 39, caption: "The plan moved before the call came." },
                            ]}
                        />
                    </div>

                    {/* 01 · The problem */}
                    <ScenarioRows
                        heading="The call that comes too late"
                        lead="A hospital expansion breaks ground near Dallas 440."
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
                                "Co-designed the planning, buying and branch seats with Navanta's product team, including the inventory map, and built them in code on the Navanta Supply Chain platform.",
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
                            "Atlas reads the signal on the VP's dashboard and opens a frame: what happened, what it means, and who has to decide.",
                            "It doesn't act. It makes four calls and holds each one for the seat that owns it: two for Priya, one for Marcus, one for Daniela.",
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
                            "Demand build-up lists the stores under the Valley View award with their trend. Iris reads ×1.48 at Dallas 440, but the column stays ×1.00, marked “not applied”, until a person applies it.",
                            "Applying shows the next 16 weeks before and after, and logs the change to the audit trail as Priya's.",
                        ]}
                    >
                        <ScreenTabs
                            label="Applying the trend"
                            items={[
                                {
                                    label: "Not applied",
                                    note: "Dallas 440 sold 118 against a plan of 80. Iris's banner says so; the forecast hasn't moved yet.",
                                    screen: { title: "Demand build-up for the Valley View award", src: `${IMG}/dallas-demand.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "Iris's card",
                                    note: "One store, the units to add, and the forecast before and after: 1,228 → 1,380.",
                                    screen: { title: "Iris proposing the trend for Dallas 440", src: `${IMG}/dallas-review.jpg`, aspect: SHOT },
                                },
                                {
                                    label: "Applied",
                                    note: "Applied and logged. The net requirement re-runs in Inventory planning.",
                                    screen: { title: "The trend applied at Dallas 440", src: `${IMG}/dallas-applied.jpg`, aspect: SHOT },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 07 · Buy */}
                    <QuestionSection
                        eyebrow="Buy"
                        question="So what do we actually order?"
                        why={[
                            "Inventory planning turns the new forecast into a buy with the arithmetic on screen: the next four weeks, plus the branch's max, minus what's on hand.",
                            "Priya approves the units with Iris, Mercer drafts the PO, and it lands in Marcus's buying queue with what's left of the month's budget.",
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
                        statement="Rivera Concrete needs 120 anchors by Thursday, and Dallas 440 has 38."
                        body={[
                            "This is where the map comes in. The branch associate's desk isn't a stock list: it's the branch network on a map — who's short, who has spare, how far apart they are, and how stock would travel between them.",
                        ]}
                    />

                    {/* 09 · The map */}
                    <QuestionSection
                        eyebrow="The map"
                        question="Where's the nearest spare stock, and can it get here in time?"
                        why={[
                            "Daniela opens her branch on the map. Every branch is a pin coloured by its stock, and the order waiting on a short SKU sits right on her branch.",
                            "Christy searches a 30-mile ring, closest first, checks every location and prices the routes. Her pick is drawn on the map with its landing date; the alternatives sit beside it.",
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
                            hook="Rivera needs 120 anchors. Dallas 440 has 38."
                            steps={["Short", "Search", "Choose", "Covered"]}
                            end="The nearest spare stock, on a map, a day early."
                            shots={[
                                {
                                    src: `${IMG}/dallas-search.jpg`,
                                    alt: "Daniela's inventory map with Dallas 440 short and Rivera's order on the branch",
                                    step: 0,
                                    caption: "Daniela's map: Dallas 440 is short on four SKUs, and Rivera's order is waiting on one.",
                                    dur: 5.5,
                                    to: { s: 1.8, x: 73, y: 32 },
                                    highlight: { x: 62.6, y: 18, w: 21, h: 28.5, at: 1.4 },
                                    click: { x: 68.3, y: 43.3, at: 4 },
                                },
                                {
                                    src: `${IMG}/dallas-request.jpg`,
                                    alt: "Christy's route on the map from Fort Worth 583 to Dallas 440",
                                    step: 1,
                                    caption: "Christy searches a 30-mile ring. Fort Worth 583 has 270 spare; the route lands 150 by Wed 4 Nov.",
                                    dur: 5.5,
                                    to: { s: 1.75, x: 48, y: 52 },
                                    highlight: { x: 34, y: 41.6, w: 29, h: 18.4, at: 1.8 },
                                },
                                {
                                    src: `${IMG}/dallas-request.jpg`,
                                    alt: "Christy's three ways to cover the order",
                                    step: 2,
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
                                    step: 3,
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
                                why: "Christy's pick is drawn as a route with its landing date — 150 by 4 Nov — not as a row in a table.",
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
                            { value: "150", label: "Units moved from Fort Worth 583" },
                            { value: "4 Nov", label: "Rivera's order promised, a day early" },
                        ]}
                    />

                    {/* 11 · Next */}
                    <NextProject label="Next case study" title="Insure-Tech: insurance plans from a document upload" />
                </div>
            </div>
        </div>
    );
}
