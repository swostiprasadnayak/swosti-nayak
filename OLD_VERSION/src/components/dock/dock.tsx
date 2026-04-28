"use client";

import React, { useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { ProjectContent } from "@/app/types/projects.types";
import DockIcon from "./dockIcon";
import classes from "./dock.module.css";

type SingleModeProps = { mode: "single"; activeIndex: number; setActiveIndex: React.Dispatch<React.SetStateAction<number>>; };
type MultiModeProps = { mode: "multi"; openWindows: string[]; onIconClick: (slug: string) => void; };
type DockProps = { projects: ProjectContent[]; isVisible: boolean; } & (SingleModeProps | MultiModeProps);

const Dock: React.FC<DockProps> = (props) => {
    const { projects, isVisible, mode } = props;
    const mouseX = useMotionValue(Infinity);

    const multiOpenWindows = mode === "multi" ? props.openWindows : undefined;
    const multiOnIconClick = mode === "multi" ? props.onIconClick : undefined;
    const singleSetActiveIndex = mode === "single" ? props.setActiveIndex : undefined;
    const openWindowsSet = useMemo(() => (multiOpenWindows ? new Set(multiOpenWindows) : null), [multiOpenWindows]);

    const handleIconSelect = useCallback((slug: string) => {
        if (multiOnIconClick) multiOnIconClick(slug);
        else if (singleSetActiveIndex) {
            const index = projects.findIndex((p) => p.slug === slug);
            if (index !== -1) singleSetActiveIndex(index);
        }
    }, [projects, multiOnIconClick, singleSetActiveIndex]);

    return (
        <AnimatePresence initial={false}>
            {isVisible && (
                <motion.div
                    className={classes.dockWrapper}
                    initial={{ y: "calc(100% + 24px)", left: "50%", x: "-50%" }}
                    animate={{ y: 0, left: "50%", x: "-50%" }}
                    exit={{ y: "calc(100% + 24px)", left: "50%", x: "-50%" }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                >
                    <div className={classes.dock}>
                        <div className={classes.dockBgFill} />
                        {projects.map((project, index) => (
                            <DockIcon
                                key={project.slug}
                                slug={project.slug}
                                name={project.name}
                                isActive={mode === "multi" ? openWindowsSet!.has(project.slug) : index === props.activeIndex}
                                mouseX={mouseX}
                                onSelect={handleIconSelect}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(Dock);
