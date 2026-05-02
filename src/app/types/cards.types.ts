export type CardProps = {
    height: number | string;
    width: number | string;
    zIndex: number;
    projectName: string;
    projectDescription: string;
    isExiting?: boolean;
    video?: string;
    onExpandProject?: (name: string) => void;
    layoutId?: string;
    onVideoLoaded?: () => void;
    isProjectExpanded?: boolean;
    onCloseWindow?: () => void;
    demoPoster?: string;
};

export const CARD_STYLES = {
    window: { width: "31.61rem", height: "29.32rem" },
    grid: { width: "23.7rem", height: "22rem" }
};
