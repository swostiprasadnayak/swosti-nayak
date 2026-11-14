import React from "react";
import { ArrowRight } from "lucide-react";
import ScreenFrame, { type ScreenFrameProps } from "./ScreenFrame";
import classes from "./navanta.module.css";

/* Static building blocks for the question-led Navanta case studies.
   Each one is content-in, layout-out: templates pass copy, never styles. */

export function Eyebrow({ children }: { children: React.ReactNode }) {
    return <p className={classes.eyebrow}>{children}</p>;
}

export function RoleStrip({ items }: { items: { label: string; value: string }[] }) {
    return (
        <div className={classes.roleStrip}>
            {items.map((item) => (
                <div key={item.label} className={classes.roleItem}>
                    <Eyebrow>{item.label}</Eyebrow>
                    <p className={classes.roleValue}>{item.value}</p>
                </div>
            ))}
        </div>
    );
}

/** Heading on the left, content on the right, ruled on top. */
export function Split({ heading, children }: { heading: React.ReactNode; children: React.ReactNode }) {
    return (
        <section className={classes.split}>
            <h2 className={classes.h2}>{heading}</h2>
            <div>{children}</div>
        </section>
    );
}

export function Paragraphs({ items }: { items: string[] }) {
    return (
        <>
            {items.map((text) => (
                <p key={text} className={classes.body}>
                    {text}
                </p>
            ))}
        </>
    );
}

export type ScenarioRow = { statement: string; consequence: string };

/** The opening scenario: a lead line, then statement → consequence rows. */
export function ScenarioRows({
    heading,
    lead,
    rows,
    closing,
}: {
    heading: string;
    lead: string;
    rows: ScenarioRow[];
    closing?: string;
}) {
    return (
        <Split heading={heading}>
            <p className={classes.statement} style={{ marginBottom: 20 }}>
                {lead}
            </p>
            <div className={classes.scenarioRows}>
                {rows.map((row) => (
                    <div key={row.statement} className={classes.scenarioRow}>
                        <p className={classes.statement}>{row.statement}</p>
                        <p className={classes.consequence}>{row.consequence}</p>
                    </div>
                ))}
            </div>
            {closing && <p className={classes.closing}>{closing}</p>}
        </Split>
    );
}

export type Pillar = { title: string; body: string };

export function Pillars({ heading, intro, items }: { heading: string; intro: string; items: Pillar[] }) {
    return (
        <Split heading={heading}>
            <p className={classes.body}>{intro}</p>
            <div className={classes.pillars}>
                {items.map((item, i) => (
                    <div key={item.title}>
                        <span className={classes.pillarNumber}>{i + 1}</span>
                        <p className={classes.pillarTitle}>{item.title}</p>
                        <p className={classes.body} style={{ fontSize: "0.95rem" }}>
                            {item.body}
                        </p>
                    </div>
                ))}
            </div>
        </Split>
    );
}

/** The one question the rest of the page answers. */
export function BridgeQuestion({ question, note }: { question: string; note: string }) {
    return (
        <section className={classes.bridge}>
            <h2 className={classes.bridgeQuestion}>{question}</h2>
            <p className={classes.body}>{note}</p>
        </section>
    );
}

export type LegendItem = { label: string; note?: string; color?: string };

/** A colour key or a row of states, shown before the screen that uses them. */
export function StateLegend({ items, layout = "columns" }: { items: LegendItem[]; layout?: "columns" | "list" }) {
    if (layout === "list") {
        return (
            <div className={classes.legendList}>
                {items.map((item) => (
                    <div key={item.label} className={classes.legendListItem}>
                        <span className={classes.legendLabel}>
                            {item.color && <span className={classes.swatch} style={{ background: item.color }} />}
                            {item.label}
                        </span>
                        {item.note && <span className={classes.legendNote}>{item.note}</span>}
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className={classes.legendColumns}>
            {items.map((item) => (
                <div key={item.label} className={classes.legendItem}>
                    <span className={classes.legendLabel}>
                        {item.color && <span className={classes.swatch} style={{ background: item.color }} />}
                        {item.label}
                    </span>
                    {item.note && <span className={classes.legendNote}>{item.note}</span>}
                </div>
            ))}
        </div>
    );
}

/** A section titled as the question the user would ask. */
export function QuestionSection({
    eyebrow,
    question,
    why,
    legend,
    screen,
    children,
}: {
    eyebrow?: string;
    question: string;
    why: string[];
    legend?: React.ReactNode;
    screen?: ScreenFrameProps;
    children?: React.ReactNode;
}) {
    return (
        <section className={classes.question}>
            <div className={classes.questionHead}>
                <div>
                    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                    <h2 className={classes.h2}>{question}</h2>
                </div>
                <div>
                    <Paragraphs items={why} />
                </div>
            </div>
            {legend}
            {screen && <ScreenFrame {...screen} />}
            {children}
        </section>
    );
}

/** "That's one side. Behind it there's…" — the turn to the other seat. */
export function Pivot({
    lead,
    statement,
    body,
    screen,
}: {
    lead: string;
    statement: string;
    body: string[];
    screen?: ScreenFrameProps;
}) {
    return (
        <section className={classes.question}>
            <div className={classes.pivot}>
                <p className={classes.pivotLead}>{lead}</p>
                <p className={classes.pivotStatement}>{statement}</p>
                <Paragraphs items={body} />
            </div>
            {screen && <ScreenFrame {...screen} />}
        </section>
    );
}

export type SignalOwner = { seat: string; agent: string; signals: string[] };

/** Which seat owns which signal, as chips — and the stages every signal runs. */
export function SignalMap({ owners, stages }: { owners: SignalOwner[]; stages: string[] }) {
    return (
        <div className={classes.signalMap}>
            <div className={classes.signalOwners}>
                {owners.map((owner) => (
                    <div key={owner.seat} className={classes.signalOwner}>
                        <p className={classes.signalSeat}>
                            {owner.seat} <span>· {owner.agent}</span>
                        </p>
                        <ul className={classes.signalChips}>
                            {owner.signals.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <ol className={classes.signalStages} aria-label="Every signal runs the same stages">
                {stages.map((stage) => (
                    <li key={stage}>{stage}</li>
                ))}
            </ol>
        </div>
    );
}

export type Decision = { decision: string; why: string };

/** The calls behind the design: the decision, then why it was made. */
export function Decisions({ heading, intro, items }: { heading: string; intro: string[]; items: Decision[] }) {
    return (
        <Split heading={heading}>
            <Paragraphs items={intro} />
            <div className={`${classes.scenarioRows} ${classes.decisions}`}>
                {items.map((item) => (
                    <div key={item.decision} className={classes.scenarioRow}>
                        <p className={classes.statement}>{item.decision}</p>
                        <p className={classes.consequence}>{item.why}</p>
                    </div>
                ))}
            </div>
        </Split>
    );
}

export type Outcome = { value: string; label: string };

export function Outcomes({ heading, intro, items }: { heading: string; intro: string[]; items: Outcome[] }) {
    return (
        <Split heading={heading}>
            <Paragraphs items={intro} />
            <div className={classes.outcomes}>
                {items.map((item) => (
                    <div key={item.label}>
                        <p className={classes.outcomeValue}>{item.value}</p>
                        <p className={classes.legendNote}>{item.label}</p>
                    </div>
                ))}
            </div>
        </Split>
    );
}

export function NextProject({ label, title }: { label: string; title: string }) {
    return (
        <div className={classes.next}>
            <div>
                <Eyebrow>{label}</Eyebrow>
                <p className={classes.nextTitle}>{title}</p>
            </div>
            <ArrowRight size={28} aria-hidden="true" color="var(--text-secondary)" />
        </div>
    );
}
