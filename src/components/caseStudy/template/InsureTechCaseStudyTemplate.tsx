"use client";
import React from "react";
import EicoreApp from "../insure-tech/EicorePrototype";
import "../insure-tech/insure-tech.css";

export default function InsureTechCaseStudyTemplate() {
  // The parent `.content` container has overflow-y:scroll; the Eicore app
  // manages its own scroll regions, so we use absolute positioning to fill
  // the parent and bypass that outer scroll context.
  return (
    <div
      className="insure-tech-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <EicoreApp />
    </div>
  );
}
