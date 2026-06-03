"use client";
import React from "react";
import EicoreApp from "../insure-tech/EicorePrototype";

export default function InsureTechCaseStudyTemplate() {
  // The parent `.content` container in expandedProject.module.css has
  // `overflow-y: scroll`. The Eicore app expects to manage its own scroll
  // regions internally, so we use absolute positioning to fill the parent
  // and bypass that scroll context.
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: "#f9fafb",
    }}>
      <EicoreApp />
    </div>
  );
}
