export type ProjectContent = {
    name: string;
    slug: string;
    description: string;
    tags?: string[];
    video?: string;
    demo?: string;
    demoPoster?: string;
    disabled?: boolean;
    /** Taken off the site entirely (dock, card stack, grid, filters and
     *  ?project= links). The case study stays in the repo; drop the flag to
     *  bring it back (and add its slug to the default layout in useWindowMode
     *  if it should open on load). Unlike `disabled`, which shows a greyed-out
     *  dock icon. */
    hidden?: boolean;
};

const ALL_PROJECTS: ProjectContent[] = [
    {
        name: "Navanta Supply Chain",
        slug: "navanta-supply-chain",
        description: "One supply chain, five seats, five AI agents — a vendor delay handled at every desk before the promise date passes.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/navanta/supply-chain-demo/executive-dashboard.png",
    },
    {
        name: "LPS Planning",
        slug: "lps-planning",
        description: "Demand planning for a pro building-supply business — a cold snap and a single-store surge, each taken from trend to purchase order with an AI agent at every desk.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/navanta/lps/houston-demand.jpg",
    },
    {
        name: "Insure-Tech",
        slug: "insure-tech",
        description: "AI-powered insurance product configuration — from document upload to stakeholder-ready plans in minutes.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/insure-tech-poster.webp"
    },
    {
        name: "Blinkit",
        slug: "blinkit",
        description: "AI-powered grocery delivery experience redesign.",
        tags: ["Interaction", "Systems"],
        video: "/videos/blinkit.mp4",
        demoPoster: "/images/blinkit-portal.png",
        hidden: true,
    },
    {
        name: "GC Dental",
        slug: "gc-dental",
        description: "B2B Healthcare Web Redesign. Discovery → Design System → Dev Handoff.",
        tags: ["B2B", "Healthcare", "Web"],
        video: "/videos/gc-dental.mp4",
        demoPoster: "/images/gc-banner.webp"
    }
];

/** Every project the site shows: `hidden` ones are left out here, so no
 *  consumer has to remember to filter them. */
export const PROJECTS = ALL_PROJECTS.filter((p) => !p.hidden);
