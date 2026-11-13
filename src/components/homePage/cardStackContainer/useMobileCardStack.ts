import { useEffect, useState } from "react";
import type { PROJECTS } from "@/app/types/projects.types";

type Project = (typeof PROJECTS)[number];

/**
 * Order of the swipeable mobile card stack, kept in sync with the active filter
 * and the dock's active project. Moved verbatim out of CardStackContainer.
 *
 * These effects set state in response to prop changes, which the React Compiler
 * flags (react-hooks/set-state-in-effect). They are deliberately left as effects:
 * they depend on running in this order within one commit, and an earlier version
 * looped infinitely. Rewrite as a reducer when the mobile design is finalised.
 * Isolating them here keeps the suppressions out of CardStackContainer, so the
 * compiler still analyses that component.
 */
export function useMobileCardStack({ isMobile, activeFilters, filteredProjects, activeSlug }: {
    isMobile: boolean;
    activeFilters: string[];
    filteredProjects: Project[];
    activeSlug: string;
}) {
    const [mobileCards, setMobileCards] = useState<Project[]>([]);

    // Reset the mobile-stack cache whenever the filter changes so the new
    // set of projects shows up at the front instead of stale cards.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- see hook docs above
        if (isMobile) setMobileCards([]);
    }, [activeFilters, isMobile]);

    // Initialize mobile card order (insure-tech first)
    useEffect(() => {
        if (isMobile && filteredProjects.length > 0 && mobileCards.length === 0) {
            const sorted = [...filteredProjects];
            const insureIdx = sorted.findIndex(p => p.slug === "insure-tech");
            if (insureIdx > 0) {
                const [item] = sorted.splice(insureIdx, 1);
                sorted.unshift(item);
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect -- see hook docs above
            setMobileCards(sorted);
        }
    }, [isMobile, filteredProjects, mobileCards.length]);

    // Sync mobileCards front with windowModeState's activeSlug.
    // - Dock tap on a card already in the stack → reorder to front.
    // - Dock tap on a previously-closed card → re-add to the front.
    // NOTE: do NOT depend on mobileCards here — that causes an infinite
    // re-add loop (every setMobileCards triggers the effect, which adds again).
    // Use the functional updater to access the latest state.
    useEffect(() => {
        if (!isMobile || filteredProjects.length === 0) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- see hook docs above
        setMobileCards(prev => {
            if (prev[0]?.slug === activeSlug) return prev;
            const idx = prev.findIndex(p => p.slug === activeSlug);
            if (idx > 0) {
                const next = [...prev];
                const [target] = next.splice(idx, 1);
                next.unshift(target);
                return next;
            }
            if (idx === -1) {
                const project = filteredProjects.find(p => p.slug === activeSlug);
                // Defensive: don't re-add if already present.
                if (project && !prev.some(p => p.slug === project.slug)) {
                    return [project, ...prev];
                }
            }
            return prev;
        });
    }, [activeSlug, isMobile, filteredProjects]);

    return [mobileCards, setMobileCards] as const;
}
