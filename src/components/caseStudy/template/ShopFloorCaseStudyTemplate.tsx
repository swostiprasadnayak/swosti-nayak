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
import CompareSlider from "../navanta/CompareSlider";
import FilmPlayer from "../navanta/FilmPlayer";
import LivePrototype from "../navanta/LivePrototype";
import LifecycleTracker from "../navanta/LifecycleTracker";
import SeatSwitcher from "../navanta/SeatSwitcher";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";

/* Repair Operations: a live shop-floor portal for a trailer and reefer repair
   network, designed and built at Navanta. Screens are captures of the working
   prototype at 1440 × 900, illustrative data, with the client's name, logo and
   branch masked and technician names swapped for fictional ones. Journey
   steps, SRT figures and Iris's actions come from the prototype's data. Same
   shape as the Supply Chain study: one record through the product first, then
   each desk. The hero film is a screen recording of the prototype, cut to its
   still-camera stretches, with the client's logo blanked, the branch name
   set to "Branch 04" and the branch sign blurred or painted out. */

const IMG = "/images/navanta/shop-floor";
const SHOT = "1440 / 900";
/** The journey shows only what moves: the live shop view and the RO tracker,
 *  cut out of each step's screen (flow-*.png, transparent around the cards). */
const FLOW = "1326 / 1067";

export default function ShopFloorCaseStudyTemplate() {
    const { openModal } = useVoiceModal();

    return (
        <div className={classes.pageWrapper}>
            <div className={classes.contentMaxWidth}>
                <div className={nav.page}>
                    {/* 00 · Header + hero */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <CaseStudyHeader
                            title="Repair Operations"
                            subtitle="One truck through the shop, and every desk can see where it is."
                            tags={["AI agent", "Field service", "3D", "Design + build"]}
                            onVoiceModeClick={openModal}
                        />
                        <RoleStrip
                            items={[
                                { label: "Role", value: "Designer and builder" },
                                { label: "When", value: "Oct 2026" },
                                { label: "Company", value: "Navanta" },
                                { label: "Client", value: "A US trailer and reefer repair network" },
                            ]}
                        />
                        <FilmPlayer
                            src="/videos/shop-floor.mp4"
                            poster={`${IMG}/film-poster.jpg`}
                            label="Film: one truck through the shop, from the gate to the invoice"
                            chapters={[
                                { name: "Intake", at: 0, caption: "Truck A comes through the gate. The RO opens, and the customer gets a live status link." },
                                { name: "Into the shop", at: 6.9, caption: "The branch in 3D: Truck A backs into the inspection bay, and a tech is matched." },
                                { name: "Repair", at: 10.6, caption: "Bay 3, the standard-time clock running. The customer sees the photo and approves the added work." },
                                { name: "Pickup", at: 13, caption: "Done at 2.0 hours and out to the pickup pad, picked up on time." },
                                { name: "Invoicing", at: 14.9, caption: "It leaves by the exit road. Navanta AI checks the RO, and the invoice goes out." },
                            ]}
                        />
                    </div>

                    {/* 01 · The problem */}
                    <ScenarioRows
                        heading="The truck nobody can see"
                        lead="10:40. A reefer trailer pulls up to the gate with a compressor fault."
                        rows={[
                            { statement: "The service writer opens a repair order.", consequence: "The diagnostic fee doesn't make it on." },
                            { statement: "A reefer-certified tech is free, somewhere.", consequence: "The shop lead walks the floor to find out." },
                            { statement: "The repair runs past its standard time.", consequence: "The customer hears when they call." },
                            { statement: "The repair order closes.", consequence: "Invoicing gets it days later, a fee short." },
                        ]}
                        closing="One truck. Four desks. Nobody watching the whole job."
                    />

                    {/* 02 · Approach */}
                    <Pillars
                        heading="Three rules"
                        intro="One branch, three desks, and Navanta's agent Iris working alongside each."
                        items={[
                            { title: "The shop is the screen", body: "Every truck, bay and tech in one live 3D view of the branch." },
                            { title: "One RO links it all", body: "Customer, truck, repair order, bay and tech. Open any one, reach the rest." },
                            { title: "Iris drafts, people send", body: "Every row asks for one decision, with Iris's reason and confidence." },
                        ]}
                    />

                    {/* 02b · The brief: what we were given, against what we built */}
                    <QuestionSection
                        eyebrow="The brief"
                        question="What we got, and what we made"
                        why={["A storyboard for a 30-second video, built into a working prototype. Drag to compare."]}
                    >
                        <CompareSlider
                            label="The brief and the first draft compared with the shop floor today"
                            aspect="2000 / 1161"
                            afterLabel="Today"
                            pairs={[
                                {
                                    label: "Intake",
                                    beforeLabel: "The brief",
                                    before: { src: `${IMG}/brief-intake.jpg`, alt: "The brief at intake: a flat layout of the gate, bays, trackers, a customer pop-up and a value tag" },
                                    after: { src: `${IMG}/now-intake.jpg`, alt: "Today at intake: the full 3D branch with Truck A's status card" },
                                },
                                {
                                    label: "Repair",
                                    beforeLabel: "First draft",
                                    note: "The first draft's placeholder image is blurred: it was a stock picture.",
                                    before: { src: `${IMG}/first-look-repair.jpg`, alt: "First draft at repair: a placeholder where the 3D scene would go" },
                                    after: { src: `${IMG}/now-repair.jpg`, alt: "Today at repair: Truck A in Bay 3 with the standard-time clock running" },
                                },
                            ]}
                        />
                    </QuestionSection>

                    {/* 03 · My role */}
                    <Split heading="My role">
                        <Paragraphs
                            items={[
                                "Designed the portal and built it as a working prototype, from the 3D shop floor to the three work queues, on Navanta's design system.",
                                "Modelled the branch in 3D, scripted one truck's repair order through it, and tied every Iris action to a value lever from the client's business case.",
                            ]}
                        />
                    </Split>

                    <ScreenFrame
                        title="The shop floor at one branch"
                        src={`${IMG}/shop-floor.png`}
                        aspect={SHOT}
                        caption="The branch as it is right now: eight bays, eleven trucks, and Truck A at the gate."
                    />

                    {/* 04 · Bridge */}
                    <BridgeQuestion
                        question="Where is the truck, and what does it need from me?"
                        note="One truck through the shop first, then each desk."
                    />

                    {/* 05 · The journey */}
                    <LifecycleTracker
                        eyebrow="The journey"
                        heading="Truck A, gate to invoice"
                        intro={["One repair order, five steps. The scene, the numbers and the list all move with it. Click through."]}
                        steps={[
                            {
                                name: "Intake",
                                note: "Backs into the inspection bay. Iris opens the RO with a diagnostic task and the fee on it. The customer gets a live status link.",
                                screen: { title: "Intake: Truck A in the inspection bay", src: `${IMG}/flow-intake.png`, aspect: FLOW, bare: true },
                            },
                            {
                                name: "Assigned",
                                note: "A reefer-certified tech is matched to Bay 3 and the compressor kit leaves the parts cage. The customer gets a promise time: 3:30 PM.",
                                screen: { title: "Assigned: kit leaves the parts cage", src: `${IMG}/flow-assigned.png`, aspect: FLOW, bare: true },
                            },
                            {
                                name: "Repair",
                                note: "The clock runs against the standard repair time: 1.4 of 2.0 hours. The tech finds a worn seal and the customer approves it from a photo.",
                                screen: { title: "Repair: Bay 3, SRT clock running", src: `${IMG}/flow-repair.png`, aspect: FLOW, bare: true },
                            },
                            {
                                name: "Pickup",
                                note: "Done at 2.0 hours, out to the pickup pad, collected at 2:45 PM. On-time moves from 91% to 92%.",
                                screen: { title: "Pickup: collected ahead of the promise", src: `${IMG}/flow-pickup.png`, aspect: FLOW, bare: true },
                            },
                            {
                                name: "Invoicing",
                                note: "Iris checks labor, parts and fees against the RO before the invoice goes. All five steps done.",
                                screen: { title: "Invoicing: RO checked and invoiced", src: `${IMG}/flow-invoicing.png`, aspect: FLOW, bare: true },
                            },
                        ]}
                    />

                    {/* 06 · Linked record */}
                    <QuestionSection
                        eyebrow="Linked"
                        question="Who's on this truck?"
                        why={["Click a truck, in the scene or the list, and the whole job opens: its bay, its customer, its tech, linked by the RO."]}
                        screen={{
                            title: "Truck A's card, linked by RO-24117",
                            src: `${IMG}/truck-panel.png`,
                            aspect: SHOT,
                            caption: "One toggle switches between the truck, the bay, the customer and the tech. Iris's next action sits on top.",
                        }}
                    />

                    {/* 07 · The desks */}
                    <SeatSwitcher
                        eyebrow="The desks"
                        heading="What each desk works on"
                        intro={["Pick a desk, then a screen. Same agent, same shape: a queue of decisions, each one a click."]}
                        seats={[
                            {
                                id: "writer",
                                name: "Service writer",
                                role: "Repair orders",
                                icon: "Headset",
                                agent: "Iris",
                                agentRole: "Navanta agent",
                                agentDoes: "Puts the fees on the RO and drafts the customer update.",
                                question: "Which repair orders need me before the customer calls?",
                                screens: [
                                    {
                                        label: "Queue",
                                        note: "Every open RO against its standard time and promise, with Iris's next action.",
                                        screen: { title: "Repair orders action center", src: `${IMG}/repair-orders.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "An RO",
                                        note: "Iris's summary, the change it recommends, and what it does to the estimate.",
                                        screen: { title: "RO-24117 with Iris's recommendation", src: `${IMG}/repair-orders-modal.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "lead",
                                name: "Shop lead",
                                role: "Bays & techs",
                                icon: "Gauge",
                                agent: "Iris",
                                agentRole: "Navanta agent",
                                agentDoes: "Matches techs to bays and flags a job running over.",
                                question: "Which bay is running over, and who's free?",
                                screens: [
                                    {
                                        label: "Bays",
                                        note: "Eight bays, each against its standard time, and what's up next.",
                                        screen: { title: "Bays and techs action center", src: `${IMG}/bays.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "A bay",
                                        note: "Bay 1 is free and Truck I is at the gate: Iris says pull it in now.",
                                        screen: { title: "Bay 1 with Iris's recommendation", src: `${IMG}/bays-modal.png`, aspect: SHOT },
                                    },
                                ],
                            },
                            {
                                id: "clerk",
                                name: "Invoicing clerk",
                                role: "Central invoicing",
                                icon: "Handshake",
                                agent: "Iris",
                                agentRole: "Navanta agent",
                                agentDoes: "Checks every closed RO against SRT, parts and the PO.",
                                question: "Is this invoice right before it goes?",
                                screens: [
                                    {
                                        label: "Queue",
                                        note: "Closed ROs, checked by Iris, with what it found missing.",
                                        screen: { title: "Central invoicing action center", src: `${IMG}/invoicing.png`, aspect: SHOT },
                                    },
                                    {
                                        label: "An invoice",
                                        note: "A missing diagnostic fee and unexplained labor, fixed and sent in one click.",
                                        screen: { title: "INV-80412 with Iris's check", src: `${IMG}/invoicing-modal.png`, aspect: SHOT },
                                    },
                                ],
                            },
                        ]}
                    />

                    {/* 08 · The value */}
                    <Pivot
                        lead="That's the shop."
                        statement="Every Iris action is tied to a lever in the client's business case."
                        body={[]}
                    />

                    <QuestionSection
                        eyebrow="Value"
                        question="What is each click worth?"
                        why={["Five levers, one per step of the journey. The scene tags each step with its lever as the truck reaches it."]}
                        legend={
                            <StateLegend
                                items={[
                                    { label: "Intake", note: "Diagnostic fee and call-out · $3.4M" },
                                    { label: "Assigned", note: "Labor planning · $3.0M · Parts · $1.5M" },
                                    { label: "Repair", note: "Customer updates and bays · $2.5M" },
                                    { label: "Invoicing", note: "Central invoicing · $2.5M" },
                                ]}
                            />
                        }
                    />

                    {/* 09 · Decisions */}
                    <Decisions
                        heading="Design calls"
                        intro={[]}
                        items={[
                            {
                                decision: "The 3D view is the dashboard, not decoration.",
                                why: "Hover a row and its bay lights up; click a truck and its job opens.",
                            },
                            {
                                decision: "Labor is measured against standard repair time.",
                                why: "SRT is what gets billed, so going over it is the signal.",
                            },
                            {
                                decision: "The customer hears first.",
                                why: "Iris drafts the new promise before the old one passes.",
                            },
                            {
                                decision: "Fees are checked twice: at intake and at invoicing.",
                                why: "A missed call-out fee is money the branch never sees.",
                            },
                            {
                                decision: "Every change shows its before and after.",
                                why: "$1,960 → $2,340, on confirm. Nothing changes quietly.",
                            },
                        ]}
                    />

                    {/* 10 · Outcome */}
                    <Outcomes
                        heading="What happened"
                        intro={[]}
                        items={[
                            { value: "5", label: "Steps of one repair order, on one screen" },
                            { value: "3", label: "Desks, one agent" },
                            { value: "$12.9M", label: "A year across five levers, in the client's case" },
                        ]}
                    />

                    {/* Live prototype */}
                    <LivePrototype
                        note="The 3D shop floor itself, running live. Click through it yourself."
                        href="https://wb-ro-3d-prototype.vercel.app/shop-floor"
                        poster={`${IMG}/shop-floor.png`}
                        title="Repair Operations"
                    />

                    {/* 11 · Next */}
                    <NextProject from="repair-operations" />
                </div>
            </div>
        </div>
    );
}
