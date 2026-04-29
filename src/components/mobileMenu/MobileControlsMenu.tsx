"use client";

import React, { useState } from "react";
import classes from "./mobileControls.module.css";
import { ChevronDown } from "lucide-react";
import ControlButton from "@/components/ui/controlButton/controlButton";
import ThemeToggle from "@/components/homePage/projectControls/themeToggle/themeToggle";
import CodeRevealToggle from "@/components/homePage/projectControls/codeRevealToggle/codeRevealToggle";
import { AnimatePresence, motion } from "framer-motion";
import { AudioLines } from "lucide-react";

interface MobileControlsMenuProps {
  onVoiceMode?: () => void;
  onScreenshot?: () => void;
}

export default function MobileControlsMenu({
  onVoiceMode,
  onScreenshot,
}: MobileControlsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.controlsMenuWrapper}>
      {/* Control button that opens dropdown */}
      <button
        className={classes.controlButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Controls menu"
      >
        <ChevronDown size={20} />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={classes.overlay}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Menu content with controls */}
            <motion.div
              className={classes.controlsDropdown}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Theme Toggle */}
              <div className={classes.controlItem}>
                <ThemeToggle />
              </div>

              {/* Voice Mode */}
              <div className={classes.controlItem}>
                <ControlButton label="Voice" onClick={onVoiceMode}>
                  <AudioLines size={20} strokeWidth={2} />
                </ControlButton>
              </div>

              {/* Code Reveal Toggle */}
              <div className={classes.controlItem}>
                <CodeRevealToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
