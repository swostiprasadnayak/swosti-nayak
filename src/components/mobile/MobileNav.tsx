"use client";

import React from "react";
import classes from "./mobileNav.module.css";

export default function MobileNav() {
  return (
    <div className={classes.navWrapper}>
      <div className={classes.navHeader} style={{ cursor: "default" }}>
        <span>Swosti</span>
      </div>
    </div>
  );
}
