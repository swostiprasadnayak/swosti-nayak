"use client";
import { createContext, useContext } from "react";

/** Lets a case study move the open window to another project, or close it,
 *  without knowing about the homepage's state (ExpandedProject provides it). */
export type CaseStudyNav = {
    /** Open another project's case study in the same window, by name. */
    openProject: (name: string) => void;
    /** Close the case study and go back to the desktop. */
    close: () => void;
};

const noop = () => {};

export const CaseStudyNavContext = createContext<CaseStudyNav>({ openProject: noop, close: noop });

export function useCaseStudyNav(): CaseStudyNav {
    return useContext(CaseStudyNavContext);
}
