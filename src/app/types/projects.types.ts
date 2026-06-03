export type ProjectContent = {
    name: string;
    slug: string;
    description: string;
    tags?: string[];
    video?: string;
    demo?: string;
    demoPoster?: string;
    disabled?: boolean;
};

export const PROJECTS: ProjectContent[] = [
    {
        name: "Insure-Tech",
        slug: "insure-tech",
        description: "AI-powered insurance product configuration — from document upload to stakeholder-ready plans in minutes.",
        tags: ["AI", "Enterprise", "B2B"],
        demoPoster: "/images/insure-tech-poster.png"
    },
    {
        name: "Blinkit",
        slug: "blinkit",
        description: "AI-powered grocery delivery experience redesign.",
        tags: ["Interaction", "Systems"],
        video: "/videos/blinkit.mp4",
        demoPoster: "/images/blinkit-portal.png"
    },
    {
        name: "Unicef",
        slug: "unicef",
        description: "Building a global education data portal with AI to track learning outcomes for every child.",
        tags: ["Interaction", "Web"],
        demoPoster: "/images/unicef-portal.png"
    },
    {
        name: "GC Dental",
        slug: "gc-dental",
        description: "B2B Healthcare Web Redesign. Discovery → Design System → Dev Handoff.",
        tags: ["B2B", "Healthcare", "Web"],
        video: "/videos/gc-dental.mp4",
        demoPoster: "/images/gc-banner.webp"
    },
    {
        name: "Surrounding",
        slug: "syne",
        description: "Designing a Multi-sensory IoT ecosystem for adaptive home environments based on emotional, activity-based feedback and a Smell Vocabulary of base Odorants.",
        tags: ["UX", "AI", "XR", "Flutter", "Next.js"],
        video: "/videos/syne-iot.mp4",
        demoPoster: "/images/project-1.jpg",
        disabled: true
    },
    {
        name: "Dynamic Map",
        slug: "aristotle",
        description: "Interactive dynamic mapping platform.",
        tags: ["AI", "Interaction"],
        demoPoster: "/images/project-3.jpg",
        disabled: true
    }
];
