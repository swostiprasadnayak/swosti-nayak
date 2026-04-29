"use client";

import React, { useState } from "react";
import classes from "./mobileMenu.module.css";
import { Menu, X, Grid3x3, Volume2, Sliders } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  onImageToggle?: () => void;
  onScreenshot?: () => void;
  onVoiceMode?: () => void;
  imageIndex?: number;
}

export default function MobileMenu({
  onImageToggle,
  onScreenshot,
  onVoiceMode,
  imageIndex = 1,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.menuWrapper}>
      {/* Menu button */}
      <button
        className={classes.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
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

            {/* Menu items */}
            <motion.div
              className={classes.menu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* View toggle */}
              <button
                className={classes.menuItem}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Grid3x3 size={18} />
                <span>View</span>
              </button>

              {/* Wallpaper toggle */}
              <button
                className={classes.menuItem}
                onClick={() => {
                  onImageToggle?.();
                  setIsOpen(false);
                }}
              >
                <span className={classes.badge}>{imageIndex}</span>
                <span>Wallpaper</span>
              </button>

              {/* Voice mode */}
              <button
                className={classes.menuItem}
                onClick={() => {
                  onVoiceMode?.();
                  setIsOpen(false);
                }}
              >
                <Volume2 size={18} />
                <span>Voice</span>
              </button>

              {/* Screenshot */}
              <button
                className={classes.menuItem}
                onClick={() => {
                  onScreenshot?.();
                  setIsOpen(false);
                }}
              >
                <Sliders size={18} />
                <span>Screenshot</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
