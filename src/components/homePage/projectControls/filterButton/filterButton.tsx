/**
* FilterButton.tsx
*
* Dropdown filter button for filtering projects by category.
* Supports "Case study" and "Demo" filter options with checkbox UI.
* Uses a Squircle glass-morphism dropdown with spring animations.
* Reports open state to ControlsRow context.
*/

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Squircle } from "corner-smoothing";
import { useViewport } from "@/app/contexts/ViewportContext";
import { useControlsRow } from "@/components/homePage/projectControls/controlsRow/controlsRow";
import classes from "./filterButton.module.css";

// "Default" sits at the top as the initial / reset state. "All Works",
// "Featured", "Corporate" are the explicit filters below it.
const FILTER_OPTIONS = ["Default", "All Works", "Featured", "Corporate"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

type FilterButtonProps = {
    activeFilters: string[];
    onFilterChange: (filters: string[]) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
    activeFilters,
    onFilterChange,
}) => {
    const { isMobile, mounted } = useViewport();
    const { reportOpen } = useControlsRow();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            reportOpen(true);
            return () => reportOpen(false);
        }
    }, [isOpen, reportOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    if (!mounted || isMobile) return null;

    // Single-select (radio) behaviour: clicking an option replaces the
    // current filter with that one. "Default" maps to an empty filter
    // (the initial reset state); the others stay as-is.
    const selectFilter = (filter: FilterOption) => {
        if (filter === "Default") {
            onFilterChange([]);
        } else if (activeFilters[0] === filter) {
            // Re-clicking the active filter clears it back to default.
            onFilterChange([]);
        } else {
            onFilterChange([filter]);
        }
        setIsOpen(false);
    };

    const hasActiveFilters = activeFilters.length > 0;
    // Trigger label is always "Workspace"; the active state lives on the
    // highlighted radio inside the dropdown.
    const activeLabel = "Workspace";

    return (
        <div className={classes.container} ref={containerRef} data-component="FilterButton">
            <button
                className={classes.filterTrigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Filter projects"
                data-component-trigger="filter"
            >
                <span className={classes.buttonText}>{activeLabel}</span>
                <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={classes.chevron}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={classes.dropdown}
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                scale: { type: "spring", bounce: 0, duration: 0.2 },
                                y: { type: "spring", bounce: 0, duration: 0.2 },
                                opacity: { duration: 0.08 },
                            },
                        }}
                        exit={{
                            opacity: 0,
                            y: -8,
                            scale: 0.95,
                            transition: { type: "spring", bounce: 0, duration: 0.2 },
                        }}
                    >
                        <Squircle className={classes.dropdownInner} cornerRadius={12}>
                            {FILTER_OPTIONS.map((option) => {
                                // Radio behaviour: only the active filter shows
                                // as checked. With no active filter, "Default"
                                // is the implicit selection.
                                const isChecked = hasActiveFilters
                                    ? activeFilters[0] === option
                                    : option === "Default";
                                return (
                                    <button
                                        key={option}
                                        className={classes.filterOption}
                                        onClick={() => selectFilter(option)}
                                        aria-pressed={isChecked}
                                        role="radio"
                                        aria-checked={isChecked}
                                    >
                                        <span
                                            className={`${classes.checkbox} ${isChecked ? classes.checked : ""}`}
                                            style={{ borderRadius: '50%' }}
                                        />
                                        <span className={classes.filterLabel}>{option}</span>
                                    </button>
                                );
                            })}
                        </Squircle>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterButton;
