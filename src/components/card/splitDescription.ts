/** A project description is "Lead. Detail.": the lead (Heading 2, what it
 *  achieves) and the detail (Subtext, what I did). Splits at the first colon,
 *  or at the first full stop when there's no colon, so keep both out of the
 *  lead. Shared by the desktop and phone cards so both keep the same three
 *  text levels under the project name. */
export function splitDescription(text: string): { lead: string; detail: string | null } {
    const m = text.match(/^(.+?)(?::|\.)\s+(.+)$/);
    if (!m) return { lead: text, detail: null };
    return { lead: m[1], detail: m[2].charAt(0).toUpperCase() + m[2].slice(1) };
}
