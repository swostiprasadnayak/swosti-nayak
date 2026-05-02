"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import classes from "./desktopSidebar.module.css";
import { useAboutModal } from "@/app/contexts/AboutModalContext";

type DesktopSidebarProps = {
    isProjectExpanded?: boolean;
    activePage?: string;
    onCollapseProject?: () => void;
};

const mainNavigationItems = ["Work", "About", "Post", "Resume"];
const socialItems = ["LinkedIn", "Instagram", "Contact", "Feedback"];

const getNavigationProps = (section: string) => {
    switch (section) {
        case "LinkedIn": return { href: "https://www.linkedin.com/in/swosti-nayak-49b2ba131", target: "_blank" };
        case "Twitter": return { href: "https://twitter.com", target: "_blank" };
        case "Instagram": return { href: "https://www.instagram.com/swosti_2001/", target: "_blank" };
        case "Contact": return { href: "tel:7978659329", target: "_self" };
        case "Work": return { href: "/", target: "_self" };
        case "Post": return { href: "#", target: "_self" };
        case "Resume": return { href: "https://drive.google.com/file/d/1Rajt_0Jg-7ywpB0bX3N1JPgLXnW3uPiF/view?usp=sharing", target: "_blank" };
        case "Feedback": return { href: "#", target: "_self" };
        default: return { href: "#", target: "_self" };
    }
};

const useCursorElement = (opts: any) => ({ ref: useRef(null) });

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    isProjectExpanded,
    activePage = "Work",
    onCollapseProject
}) => {
    const nameRef = useRef<HTMLAnchorElement>(null);
    const { openModal: openAboutModal } = useAboutModal();

    return (
        <div className={`${classes.sidebar} ${isProjectExpanded ? classes.sidebarOpaque : ""}`}>
            <div className={classes.sidebarContent}>
                <div className={classes.topSection}>
                    <div className={classes.header}>
                        <Link
                            ref={nameRef}
                            href="/"
                            className={classes.name}
                            onClick={
                                onCollapseProject
                                    ? (e) => { e.preventDefault(); onCollapseProject(); }
                                    : undefined
                            }
                        >
                            Swosti
                        </Link>
                        <p className={classes.bio}>
                            Product designer crafting thoughtful, user-centric interfaces.
                        </p>
                        <p className={classes.bioSecondary}>
                            Informed by cognitive science. Built for production.
                        </p>
                    </div>

                    <nav className={classes.navigation}>
                        {mainNavigationItems.map((section) => (
                            <NavItem
                                key={section}
                                section={section}
                                isActive={activePage === section}
                                navProps={getNavigationProps(section)}
                                onClick={
                                    section === "About"
                                        ? openAboutModal
                                        : section === "Work" && onCollapseProject
                                            ? onCollapseProject
                                            : undefined
                                }
                            />
                        ))}
                    </nav>
                </div>

                <div className={classes.bottomSection}>
                    <p className={classes.socialsHeading}>Socials & Contact</p>
                    <nav className={classes.socialsNavigation}>
                        {socialItems.map((section) => (
                            <NavItem
                                key={section}
                                section={section}
                                isActive={false}
                                isFeedback={section === "Feedback"}
                                navProps={getNavigationProps(section)}
                                onClick={
                                    section === "Feedback"
                                        ? () => console.log("Open Feedback Form") // Placeholder
                                        : undefined
                                }
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

const NavItem: React.FC<{
    section: string;
    isActive: boolean;
    navProps: { href: string; target: string };
    onClick?: () => void;
    isFeedback?: boolean;
}> = ({ section, isActive, navProps, onClick, isFeedback }) => {
    const { ref } = useCursorElement({
        mode: "block",
        cornerRadius: 12,
        resetOnClick: true,
    });

    const className = `${classes.navItem} ${isActive ? classes.navItemActive : ""} ${isFeedback ? classes.navItemFeedback : ""}`;
    const isExternal = navProps.target === "_blank";

    if (isExternal) {
        return (
            <a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={navProps.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {section}
                {isFeedback && <ArrowUpRight size={16} strokeWidth={2} />}
            </a>
        );
    }

    if (navProps.href === "#") {
        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={className}
                onClick={onClick}
            >
                {section}
                {isFeedback && <ArrowUpRight size={16} strokeWidth={2} />}
            </button>
        );
    }

    return (
        <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={navProps.href}
            className={className}
            onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
        >
            {section}
            {isFeedback && <ArrowUpRight size={16} strokeWidth={2} />}
        </Link>
    );
};

export default React.memo(DesktopSidebar);
