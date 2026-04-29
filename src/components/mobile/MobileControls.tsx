"use client";

import React, { useState } from "react";
import classes from "./mobileControls.module.css";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/homePage/projectControls/themeToggle/themeToggle";
import ControlButton from "@/components/ui/controlButton/controlButton";
import ControlPanel from "@/components/homePage/projectControls/controlPanel/controlPanel";
import CodeRevealToggle from "@/components/homePage/projectControls/codeRevealToggle/codeRevealToggle";
import { AudioLines } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileControlsProps {
  onVoiceMode?: () => void;
  imageIndex?: number;
  onImageToggle?: () => void;
  onScreenshot?: () => void;
}

export default function MobileControls({
  onVoiceMode,
  imageIndex = 1,
  onImageToggle,
  onScreenshot,
}: MobileControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={classes.controlsWrapper}>
      {/* Menu button */}
      <div className={classes.menuContainer}>
        <button
          className={classes.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="More"
        >
          <Menu size={20} />
        </button>

        {/* Dropdown menu with 4 control buttons */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className={classes.overlay}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className={classes.dropdown}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Controls inside menu - horizontal */}
                <div className={classes.controlsInMenu}>
                  <ThemeToggle />
                  <ControlButton label="Voice" onClick={onVoiceMode}>
                    <AudioLines size={20} strokeWidth={2} />
                  </ControlButton>
                  <ControlPanel
                    imageIndex={imageIndex}
                    onImageToggle={onImageToggle}
                    onScreenshot={onScreenshot}
                  />
                  <CodeRevealToggle />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
