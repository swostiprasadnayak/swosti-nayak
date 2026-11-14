/* The five agents' colours, as the supply-chain demo draws them (its AgentOrb
   palette): a pale stop, the body, and a deep ink for glyphs on the pale stop.
   Shared by the seat menu and the relay so a seat reads as one colour. */

export type AgentTint = { ink: string; body: string; light: string };

const AGENT_TINT: Record<string, AgentTint> = {
    atlas: { ink: "#2a0e9e", body: "#7d5cff", light: "#d9d2ff" },
    mercer: { ink: "#0b2a7a", body: "#3d8bff", light: "#bfe3ff" },
    iris: { ink: "#7a0b5f", body: "#ff5ec4", light: "#ffd9f0" },
    christy: { ink: "#8f1533", body: "#ff6a4d", light: "#ffe0c2" },
    tova: { ink: "#03415f", body: "#17cfae", light: "#c2fbe8" },
};

const FALLBACK: AgentTint = { ink: "#59349c", body: "#7d5cff", light: "#f1e6ff" };

export function tintFor(agent: string): AgentTint {
    return AGENT_TINT[agent.toLowerCase()] ?? FALLBACK;
}

/** The agent's marble: light highlight, body, deep edge. */
export function orbBackground(tint: AgentTint): string {
    return `radial-gradient(circle at 35% 30%, ${tint.light} 0%, ${tint.body} 45%, ${tint.ink} 100%)`;
}
