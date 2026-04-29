"use client";

import React, { useState } from "react";
import classes from "./mobileControls.module.css";
import { Menu, Moon, Sun, Volume2, Code2 } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

interface MobileControlsProps {
  onVoiceMode?: () => void;
}

export default function MobileControls({ onVoiceMode }: MobileControlsProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={classes.controlsWrapper}>
      {/* Horizontal invisible buttons */}
      <button
        className={classes.invisibleButton}
        onClick={toggleTheme}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <button
        className={classes.invisibleButton}
        onClick={onVoiceMode}
        title="Voice mode"
      >
        <Volume2 size={20} />
      </button>

      <button
        className={classes.invisibleButton}
        title="Code reveal"
      >
        <Code2 size={20} />
      </button>

      {/* Menu button that opens dropdown */}
      <div className={classes.menuContainer}>
        <button
          className={classes.invisibleButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="More options"
        >
          <Menu size={20} />
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className={classes.overlay}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Menu items */}
              <motion.div
                className={classes.dropdown}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={classes.dropdownItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  View
                </button>
                <button
                  className={classes.dropdownItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wallpaper
                </button>
                <button
                  className={classes.dropdownItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Screenshot
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
