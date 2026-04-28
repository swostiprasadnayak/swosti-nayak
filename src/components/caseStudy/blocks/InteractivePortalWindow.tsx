"use client";
import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import classes from "./InteractivePortalWindow.module.css";

export default function InteractivePortalWindow() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const DESKTOP_WIDTH = 1440;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / DESKTOP_WIDTH);
      }
    };
    
    updateScale();
    window.addEventListener("resize", updateScale);
    // Extra update after a short delay to catch layout shifts
    const timer = setTimeout(updateScale, 100);
    
    return () => {
      window.removeEventListener("resize", updateScale);
      clearTimeout(timer);
    };
  }, [isFullscreen]);

  const visibleHeight = isFullscreen ? "calc(100vh - 45px)" : "700px";

  return (
    <div
      className={`${classes.container} ${
        isFullscreen ? classes.fullscreen : ""
      }`}
    >
      {/* Toolbar */}
      <div className={classes.toolbar}>
        <div className={classes.toolbarLeft}>
          <div className={classes.trafficLights}>
            <span className={`${classes.dot} ${classes.red}`} />
            <span className={`${classes.dot} ${classes.yellow}`} />
            <span className={`${classes.dot} ${classes.green}`} />
          </div>
          <div className={classes.urlBar}>
            <span className={classes.lockIcon}>🔒</span>
            <span>uneven-react-85281796.figma.site</span>
          </div>
        </div>
        <div className={classes.toolbarRight}>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={classes.actionBtn}
            title={isFullscreen ? "Minimize" : "Maximize"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <a
            href="https://uneven-react-85281796.figma.site"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.liveLink}
          >
            Open Live Site <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Scaled iframe container */}
      <div
        ref={containerRef}
        className={classes.iframeWrapper}
        style={{ height: visibleHeight }}
      >
        <iframe
          src="https://uneven-react-85281796.figma.site"
          title="UNICEF Learning & Skills Data Portal"
          allow="fullscreen"
          className={classes.iframe}
          style={{
            width: `${DESKTOP_WIDTH}px`,
            height: isFullscreen ? `calc((100vh - 45px) / ${scale})` : `${700 / scale}px`,
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
}
