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
    window: { width: "26rem", height: "23.5rem" }
};
