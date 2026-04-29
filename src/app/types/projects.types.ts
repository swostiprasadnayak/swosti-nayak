export type ProjectContent = {
    name: string;
    slug: string;
    description: string;
    tags?: string[];
    video?: string;
    demo?: string;
    demoPoster?: string;
};

export const PROJECTS: ProjectContent[] = [
    {
        name: "Syne",
        slug: "syne",
        description: "Supporting industrial design students to visualise and validate 3D models in realistic scales and environments with XR & AI.",
        tags: ["UX", "AI", "XR", "Flutter", "Next.js"],
        demoPoster: "/images/project-1.jpg"
    },
    {
        name: "Lighthouse",
        slug: "lighthouse",
        description: "Scalable design system architecture.",
        tags: ["Interaction", "Systems"],
        demoPoster: "/images/project-2.jpg"
    },
    {
        name: "Aristotle",
        slug: "aristotle",
        description: "Internal AI platform",
        tags: ["AI", "Interaction"],
        demoPoster: "/images/project-3.jpg"
    },
    {
        name: "Unicef",
        slug: "unicef",
        description: "Resource hub structural improvements.",
        tags: ["Interaction", "Web"],
        demoPoster: "/images/project-4.jpg"
    },
    {
        name: "P&ID tool",
        slug: "pid-tool",
        description: "Process and instrumentation design app.",
        tags: ["Enterprise", "App"],
        demoPoster: "/images/project-5.jpg"
    }
];
