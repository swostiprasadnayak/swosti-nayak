"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import ControlButton from "@/components/ui/controlButton/controlButton";
import { useTheme } from "@/app/contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <ControlButton
            label={isDark ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
            isActive={false}
        >
            {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
        </ControlButton>
    );
};

export default ThemeToggle;
