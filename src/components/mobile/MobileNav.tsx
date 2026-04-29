"use client";

import React, { useState } from "react";
import classes from "./mobileNav.module.css";
import { ChevronDown, Share2, Heart, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Post", href: "#post" },
    { label: "Resume", href: "#resume" },
  ];

  return (
    <div className={classes.navWrapper}>
      {/* Swosti text with chevron */}
      <div
        className={classes.navHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Swosti</span>
        <ChevronDown
          size={18}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </div>

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
              className={classes.dropdown}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Navigation items */}
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={classes.navItem}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </button>
              ))}

              {/* Divider */}
              <div className={classes.divider} />

              {/* Socials & Contact - Icons only in separate box */}
              <div className={classes.socialsBox}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialIcon}
                  title="LinkedIn"
                >
                  <Share2 size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialIcon}
                  title="Instagram"
                >
                  <Heart size={18} />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className={classes.socialIcon}
                  title="Contact"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
