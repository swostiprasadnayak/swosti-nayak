"use client";

import React, { useState } from "react";
import classes from "./mobileNav.module.css";
import ThemeToggle from "@/components/homePage/projectControls/themeToggle/themeToggle";
import CodeRevealToggle from "@/components/homePage/projectControls/codeRevealToggle/codeRevealToggle";
import { ChevronDown, Share2, Heart, Mail, MessageSquare, AudioLines } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAboutModal } from "@/app/contexts/AboutModalContext";
import { useFeedbackModal } from "@/app/contexts/FeedbackModalContext";

type MobileNavProps = {
  onShowPosts?: () => void;
  onWorkClick?: () => void;
  onVoiceMode?: () => void;
};

export default function MobileNav({ onShowPosts, onWorkClick, onVoiceMode }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal: openAboutModal } = useAboutModal();
  const { openModal: openFeedbackModal } = useFeedbackModal();

  const navItems = [
    { label: "Work", href: "#", isAction: true },
    { label: "About", href: "#", isAction: true },
    { label: "Post", href: "#", isAction: true },
    { label: "Resume", href: "https://drive.google.com/file/d/1Rajt_0Jg-7ywpB0bX3N1JPgLXnW3uPiF/view?usp=sharing" },
  ];

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    if (item.isAction) {
      e.preventDefault();
      setIsOpen(false);
      if (item.label === "Work" && onWorkClick) onWorkClick();
      else if (item.label === "About") openAboutModal();
      else if (item.label === "Post" && onShowPosts) onShowPosts();
    } else {
      setIsOpen(false);
    }
  };

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
                <Link
                  key={item.label}
                  href={item.href}
                  className={classes.navItem}
                  onClick={(e) => handleNavClick(e, item)}
                  target={item.label === "Resume" ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              ))}

              {/* Divider */}
              <div className={classes.divider} />

              {/* System controls */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 12px 8px", width: "100%", boxSizing: "border-box" }}>
                <div style={{ display: "flex", transform: "scale(0.9)" }}>
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => { setIsOpen(false); onVoiceMode?.(); }}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  title="Voice Mode"
                >
                  <AudioLines size={18} strokeWidth={2} />
                </button>
                <div style={{ display: "flex", transform: "scale(0.9)" }}>
                  <CodeRevealToggle />
                </div>
              </div>

              {/* Divider */}
              <div className={classes.divider} />

              {/* Socials & Contact - Icons only in separate box */}
              <div className={classes.socialsBox}>
                <a
                  href="https://www.linkedin.com/in/swosti-nayak-49b2ba131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialIcon}
                  title="LinkedIn"
                >
                  <Share2 size={18} />
                </a>
                <a
                  href="https://www.instagram.com/swosti_2001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialIcon}
                  title="Instagram"
                >
                  <Heart size={18} />
                </a>
                <button
                  onClick={() => { setIsOpen(false); openFeedbackModal(); }}
                  className={classes.socialIcon}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  title="Feedback"
                >
                  <MessageSquare size={18} />
                </button>
                <a
                  href="tel:7978659329"
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
