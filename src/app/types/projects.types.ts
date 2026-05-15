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
        video: "/videos/gc-dental.mov",
        demoPoster: "/images/gc-banner.png"
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
    },
    {
        name: "Adversal AI Model",
        slug: "pid-tool",
        description: "Adversarial AI model research and design.",
        tags: ["Enterprise", "App"],
        demoPoster: "/images/project-5.jpg",
        disabled: true
    }
];
