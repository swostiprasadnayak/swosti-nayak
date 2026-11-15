export type ProjectContent = {
    name: string;
    slug: string;
    /** Two sentences, "Lead. Detail.": desktop cards show the lead (up to the
     *  first full stop or colon) as the headline line and the detail beneath
     *  it; phone cards show the whole string under the name. Keep any full
     *  stop or colon out of the lead. */
    description: string;
    tags?: string[];
    video?: string;
    demo?: string;
    demoPoster?: string;
    /** The card's media as devices: a display playing `film` (a light,
     *  card-sized cut of the case study's film) and a laptop showing `still`.
     *  Takes precedence over `video` and `demoPoster` on the cards. */
    cardMockup?: {
        /** Which devices: "desk" (display + laptop), "laptop-phone" or
         *  "wall-tablet". Projects use different ones so cards don't repeat. */
        layout?: "desk" | "laptop-phone" | "wall-tablet" | "wall";
        film: string;
        poster: string;
        /** A still for the second device (not used by "wall"). */
        still?: string;
        /** The film's aspect ratio, e.g. "16 / 9". Defaults to 16 / 10. */
        filmAspect?: string;
    };
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
        name: "Supply Chain Intelligence",
        slug: "supply-chain-intelligence",
        description: "A supplier delay, seen by every team it touches. Five roles, five AI agents, one shared record, and a person on every big call.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/navanta/supply-chain-demo/executive-dashboard.png",
        cardMockup: {
            layout: "desk",
            film: "/videos/cards/supply-chain.mp4",
            poster: "/images/cards/supply-chain-poster.jpg",
            still: "/images/navanta/supply-chain-demo/executive-dashboard.png",
        },
    },
    {
        name: "Demand Sensing",
        slug: "demand-sensing",
        description: "A sales spike at one store, caught and covered. AI spots the trend, people approve the buy, a map finds spare stock nearby.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/navanta/groundswell/dallas-request.jpg",
        cardMockup: {
            layout: "laptop-phone",
            film: "/videos/cards/groundswell.mp4",
            poster: "/images/cards/groundswell-poster.jpg",
            still: "/images/cards/groundswell-phone.jpg",
            filmAspect: "16 / 9",
        },
    },
    {
        name: "Repair Operations",
        slug: "repair-operations",
        description: "Every truck in a trailer repair shop, live in 3D. One AI agent drafts the next step for three desks, from gate to invoice.",
        tags: ["AI", "Enterprise", "3D"],
        demoPoster: "/images/navanta/shop-floor/shop-floor.png",
        cardMockup: {
            layout: "wall",
            film: "/videos/cards/shop-floor.mp4",
            poster: "/images/cards/shop-floor-poster.jpg",
            filmAspect: "960 / 556",
        },
    },
    {
        name: "Insure-Tech",
        slug: "insure-tech",
        description: "AI-powered insurance product configuration: from document upload to stakeholder-ready plans in minutes.",
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
