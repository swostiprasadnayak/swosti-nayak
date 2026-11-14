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
import FlowReel from "../navanta/FlowReel";
import LifecycleTracker from "../navanta/LifecycleTracker";
import AgentTrace from "../navanta/AgentTrace";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";

/* Reed — AI purchase requisitions, built at Navanta for a US flooring manufacturer.
   Screens are captures of the working prototype with
   the client's name and logo masked; trace steps and stage names are the product's
   own. */

const IMG = "/images/navanta/reed";
const SHOT = "1440 / 900";

export default function ReedCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="Reed"
                            subtitle="Buying a part shouldn't take a week of email."
                            tags={["AI agent", "Procurement", "Enterprise", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Product designer, designed and built end to end" },
                                { label: "When", value: "Sep 2026 · 9 days" },
                                { label: "Company", value: "Navanta" },
                                { label: "Client", value: "A US flooring manufacturer" },
                            ]}
                        />
                        <FlowReel
                            label="Film: a requester asks Reed for a part and it becomes a purchase order"
                            hook="A pump on line 4 needs a rebuild mid-shift."
                            steps={["Ask", "Find", "Request", "Quote", "Track", "Approve"]}
                            end="From “I need this” to a purchase order, in one conversation."
                            shots={[
                                {
                                    src: `${IMG}/reed-home.png`,
                                    alt: "Reed's requester home with the ask box",
                                    step: 0,
                                    caption: "The requester asks in plain words.",
                                    dur: 5,
                                    to: { s: 1.5, x: 44, y: 68 },
                                    type: { x: 13.6, y: 69.2, w: 60, h: 3.6, text: "Rebuild kit for the pump on line 4, 2 kits by Friday", at: 1.4 },
                                },
                                {
                                    src: `${IMG}/catalog-match.png`,
                                    alt: "Reed matching a request to the catalog",
                                    step: 1,
                                    caption: "Bought before? Reed checks three sources and recommends one, with the last price paid.",
                                    dur: 5,
                                    to: { s: 1.45, x: 52, y: 46 },
                                },
                                {
                                    src: `${IMG}/special-request.png`,
                                    alt: "Reed reading back a special request",
                                    step: 2,
                                    caption: "Not in the catalog: Reed works through the policy, then reads the request back.",
                                    dur: 5.5,
                                    from: { s: 1.5, x: 42, y: 28 },
                                    to: { s: 1.5, x: 42, y: 56 },
                                },
                                {
                                    src: `${IMG}/quote-compare.png`,
                                    alt: "Three vendor quotes compared",
                                    step: 3,
                                    caption: "Three quotes back. Reed compares what can actually go on the PR.",
                                    dur: 5,
                                    to: { s: 1.5, x: 50, y: 58 },
                                    click: { x: 23.7, y: 68.4, at: 3.6 },
                                },
                                {
                                    src: `${IMG}/track-pr.png`,
                                    alt: "Reed answering where a request is",
                                    step: 4,
                                    caption: "Where's my request? The route, the date, and what's still open.",
                                    dur: 4.5,
                                    to: { s: 1.45, x: 42, y: 52 },
                                },
                                {
                                    src: `${IMG}/review-detail.png`,
                                    alt: "The buyer's review of a requisition",
                                    step: 5,
                                    caption: "The buyer sees what Reed found and fixed, then approves.",
                                    dur: 5,
                                    to: { s: 1.4, x: 45, y: 45 },
                                    click: { x: 65, y: 72.8, at: 3.6 },
                                },
                                {
                                    src: `${IMG}/activity-status.png`,
                                    alt: "Every request with its stage and next move",
                                    step: 5,
                                    caption: "Every request shows its stage and the next move.",
                                    dur: 4.5,
                                    to: { s: 1.3, x: 50, y: 42 },
                                },
                            ]}
                        />
                    </div>

                    {/* 01 · The scenario */}
                    <ScenarioRows
                        heading="The part nobody stocked"
                        lead="Imagine you keep a carpet line running. A pump needs a rebuild mid-shift."
                        rows={[
                            {
                                statement: "The kit isn't in the catalog.",
                                consequence: "So it's a special request, with its own rules.",
                            },
                            {
                                statement: "Policy says some vendors need a quote first.",
                                consequence: "Which ones? That's a lookup in a spreadsheet nobody can find.",
                            },
                            {
                                statement: "The request goes to a buyer.",
                                consequence: "Then it waits, and you chase it by email.",
                            },
                        ]}
                        closing="Meanwhile, the line is down."
                    />

                    {/* 02 · How Navanta approaches it */}
                    <Pillars
                        heading="How Navanta approaches it"
                        intro="Reed is an AI agent that sits with the person asking for something and does the procurement legwork with them. It covers three jobs:"
                        items={[
                            { title: "Find", body: "Search the catalog, or punch out to a supplier's site and bring the cart back." },
                            { title: "Request", body: "Turn a need into a purchase request that already follows policy." },
                            { title: "Quote", body: "When a quote is needed, ask vendors, read what comes back, and line them up." },
                        ]}
                    />

                    {/* 03 · My role */}
                    <Split heading="My role">
                        <Paragraphs
                            items={[
                                "I designed the requisition experience end to end and built it as a working front end, on the client's real requisition data: about 120 vendors that need a quote first and 300 category codes.",
                                "I ran the client review, and applied their feedback the same day.",
                            ]}
                        />
                    </Split>

                    <ScreenFrame
                        title="Reed's requester home"
                        src={`${IMG}/reed-home.png`}
                        aspect={SHOT}
                        caption="The requester's home: what changed overnight, one place to ask, and the five jobs people come here for."
                    />

                    {/* 04 · Bridge question */}
                    <BridgeQuestion
                        question="How does “I need this” become a purchase order, without a week of email?"
                        note="Here's the product, walked through the way a requester meets it."
                    />

                    {/* 05 · Q: catalog */}
                    <QuestionSection
                        eyebrow="Find"
                        question="Is it already in the catalog?"
                        why={[
                            "Most requests are for things the plant has bought before, so Reed starts there.",
                            "Ask in plain words. Reed checks existing orders, site standards and the vendors' catalogs, then recommends one item — with the last price paid — and two that also fit.",
                        ]}
                        screen={{
                            title: "Reed matching “safety vests” to the catalog",
                            src: `${IMG}/catalog-match.png`,
                            aspect: SHOT,
                            caption: "“Safety vests”: one vendor has no match, another does. Reed recommends it, offers two alternatives, and adds it to the cart in one step.",
                        }}
                    />

                    {/* 06 · Q: not in the catalog */}
                    <QuestionSection
                        eyebrow="Request"
                        question="It isn't. Now what?"
                        why={[
                            "A request with no catalog match falls under a written purchasing policy. Few requesters have read it.",
                            "Reed works through the policy for them, reads the need back as fields they can change, and spots when the same job is already in motion.",
                        ]}
                        screen={{
                            title: "Special request: Reed reading back a pump rebuild",
                            src: `${IMG}/special-request.png`,
                            aspect: SHOT,
                            caption: "A pump rebuild with no catalog match. Six checks, then “What I read”: outlined tiles are the requester's to change, flat ones come from their profile. An earlier request for the same job is flagged before a second one is written.",
                        }}
                    />

                    {/* 07 · Q: quotes */}
                    <QuestionSection
                        eyebrow="Quote"
                        question="Which vendor, and is this quote OK?"
                        why={[
                            "When quotes come back, the cheapest total isn't the answer: charges can't go on a requisition line, and a quote can expire.",
                            "Reed compares what can actually go on the PR, keeps charges apart, and runs the policy checks on each quote. The requester only makes the choice.",
                        ]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "On PR lines", note: "What can go on the requisition, compared like for like." },
                                    { label: "Charges", note: "Freight and fees, shown apart — never a PO line." },
                                    { label: "Checks", note: "How many policy checks each quote passes." },
                                ]}
                            />
                        }
                        screen={{
                            title: "Three quotes for a dust-collector rebuild",
                            src: `${IMG}/quote-compare.png`,
                            aspect: SHOT,
                            caption: "Three vendors replied. The lowest on PR lines is highlighted; one quote has expired and would have to be asked for again.",
                        }}
                    />

                    {/* 08 · Lifecycle */}
                    <LifecycleTracker
                        eyebrow="Track"
                        heading="Where's my request?"
                        intro={[
                            "Every requisition moves through the same five stages. Click through them: each one is a real screen from the product.",
                        ]}
                        steps={[
                            {
                                name: "Raised",
                                note: "The requester describes the need. Reed checks orders, standards and catalogs before anything is created.",
                                screen: { title: "Raised", src: `${IMG}/catalog-trace.png`, aspect: SHOT },
                            },
                            {
                                name: "Sent via Oracle Fusion",
                                note: "The PR goes to the ERP with a number. Asking “where is it?” gets the route, the date and what's still open.",
                                screen: { title: "Sent via Oracle Fusion", src: `${IMG}/track-pr.png`, aspect: SHOT },
                            },
                            {
                                name: "Mercer review",
                                note: "It lands in the reviewer's queue, ranked by policy risk, value and age.",
                                screen: { title: "Mercer review", src: `${IMG}/review-queue.png`, aspect: SHOT },
                            },
                            {
                                name: "Approved",
                                note: "The reviewer sees what Reed found and corrected — with the policy clause — and approves or returns it.",
                                screen: { title: "Approved", src: `${IMG}/review-detail.png`, aspect: SHOT },
                            },
                            {
                                name: "PO created",
                                note: "Back on the requester's side, every request shows its stage and the next move.",
                                screen: { title: "PO created", src: `${IMG}/activity-status.png`, aspect: SHOT },
                            },
                        ]}
                    />

                    {/* 09 · How Reed shows its work */}
                    <QuestionSection
                        eyebrow="Pattern"
                        question="How does Reed show its work?"
                        why={[
                            "An agent that just answers isn't trusted with money. Reed's checks play out one at a time, then fold into a single line above the answer — there when you want them, out of the way when you don't.",
                        ]}
                    >
                        <AgentTrace
                            agent="Reed"
                            prompt="Rebuild kit for the pump on line 4, 2 kits by Friday"
                            steps={[
                                { label: "Searching hosted catalogs" },
                                { label: "Searching supplier catalogs" },
                                { label: "Checking quote-to-PO availability" },
                                { label: "Checking for a comparable catalog item" },
                                { label: "Checking purchase history" },
                                { label: "Checking supplier status" },
                            ]}
                            result="What I read — ready to write the letter. A request for this pump is already in motion and was returned for correction, so fixing that one is faster than starting over."
                        />
                    </QuestionSection>

                    {/* 10 · The other side */}
                    <Pivot
                        lead="That's the requester."
                        statement="Behind every request there's a buyer, deciding what to approve."
                        body={[
                            "Mercer, the buyer's agent, ranks the requisitions that need a decision and says why each one is there — a better alternative, an off-catalog purchase, the wrong category — with a confidence for each.",
                        ]}
                        screen={{
                            title: "Mercer's requisition review",
                            src: `${IMG}/mercer-seat.png`,
                            aspect: SHOT,
                            caption: "The buyer's seat: what needs review, what was auto-approved, and Mercer's read on each requisition.",
                        }}
                    />

                    {/* 11 · Outcome */}
                    <Outcomes
                        heading="What happened"
                        intro={[]}
                        items={[
                            { value: "9 days", label: "From kickoff to client review" },
                            { value: "Same day", label: "Client feedback shipped" },
                            { value: "120", label: "Quote-first vendors, from real data" },
                        ]}
                    />

                    {/* 12 · Next */}
                    <NextProject label="Next case study" title="Insure-Tech: insurance plans from a document upload" />
                </div>
            </div>
        </div>
    );
}
