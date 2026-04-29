"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import DesktopSidebar from "@/components/desktopSidebar/desktopSidebar";
import CardStackContainer from "@/components/homePage/cardStackContainer/cardStackContainer";
import ExpandedProject from "@/components/homePage/expandedProject/ExpandedProject";
import Dock from "@/components/dock/dock";
import GradientBlur from "@/components/gradientBlur/gradientBlur";
import AboutModal from "@/components/aboutModal/AboutModal";
import VoiceModal from "@/components/voiceModal/VoiceModal";
import FilterButton from "@/components/homePage/projectControls/filterButton/filterButton";
import ControlsRow from "@/components/homePage/projectControls/controlsRow/controlsRow";
import ControlPanel from "@/components/homePage/projectControls/controlPanel/controlPanel";
import ControlButton from "@/components/ui/controlButton/controlButton";
import ThemeToggle from "@/components/homePage/projectControls/themeToggle/themeToggle";
import ViewToggle, { ViewMode } from "@/components/homePage/projectControls/viewToggle/viewToggle";
import CodeRevealToggle from "@/components/homePage/projectControls/codeRevealToggle/codeRevealToggle";
import ScreenshotThumbnail from "@/components/screenshot/screenshotThumbnail";
import MobileNav from "@/components/mobile/MobileNav";
import MobileControls from "@/components/mobile/MobileControls";
import MobileBlocker from "@/components/mobile/MobileBlocker";
import WidgetsGrid from "@/components/homePage/widgets/WidgetsGrid";
import { useWindowMode } from "@/app/hooks/useWindowMode";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import { PROJECTS } from "@/app/types/projects.types";
import { AudioLines, Terminal } from "lucide-react";

export default function Home() {
  const windowModeState = useWindowMode();
  const { openModal: openVoiceModal } = useVoiceModal();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("tab");
  const WALLPAPERS = ["/wallpapers/pexels-sergei-31959340.jpg", "/bg.jpg", "/wallpapers/bg1.jpg", "/wallpapers/bg2.jpg", "/wallpapers/bg3.jpg", "/wallpapers/bg4.jpg"];
  const bgImage = WALLPAPERS[imageIndex];

  // Screenshot State
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [captureKey, setCaptureKey] = useState(0);

  // Project Expansion State
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const getProjectLayoutId = useCallback((slug: string) => `project-card-${slug}`, []);

  // The function that takes the picture
  const handleScreenshot = useCallback(async () => {
    try {
      // Wait 350ms to ensure the dropdown menu has fully animated out of view
      setTimeout(async () => {
        const canvas = await html2canvas(document.body, {
          ignoreElements: (element) => element.hasAttribute('data-screenshot-exclude'),
          backgroundColor: null,
          scale: 2, // Captures in high-res (Retina quality)
          useCORS: true, // Crucial for capturing background images
          allowTaint: true,
        });
        const url = canvas.toDataURL("image/png");
        setScreenshotUrl(url);
        setCaptureKey(prev => prev + 1);
      }, 350);
    } catch (error) {
      console.error("Screenshot capture failed", error);
    }
  }, []);

  return (
    <main style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>

      {/* Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
        zIndex: 0
      }} />

      {/* 1. The Left Sidebar Navigation */}
      <div style={{ zIndex: 10, position: 'relative' }}>
        <DesktopSidebar />
      </div>

      {/* 2. The Main Desktop Area */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        <GradientBlur direction="top" />

        {/* Top Controls Container: Left, Center, Right components */}
        <div style={{ position: 'absolute', top: 24, left: 24, right: 24, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }} data-screenshot-exclude className="desktop-controls">

          {/* Top Left: Filter Dropdown */}
          <div style={{ pointerEvents: 'auto' }}>
            <FilterButton activeFilters={activeFilters} onFilterChange={setActiveFilters} />
          </div>

          {/* Top Center: View Toggle (Perfectly centered) */}
          <div style={{ pointerEvents: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Top Right: Actions */}
          <div style={{ pointerEvents: 'auto' }}>
            <ControlsRow>
              <ThemeToggle />
              <ControlButton label="Voice mode" onClick={openVoiceModal}>
                <AudioLines size={20} strokeWidth={2} />
              </ControlButton>
              <ControlPanel
                imageIndex={imageIndex + 1}
                onImageToggle={() => setImageIndex((prev) => (prev + 1) % WALLPAPERS.length)}
                onScreenshot={handleScreenshot}
              />
              <CodeRevealToggle />
            </ControlsRow>
          </div>
        </div>

        {/* Mobile Navigation - Top Left */}
        <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 50, pointerEvents: 'auto' }} className="mobile-nav-only">
          <MobileNav />
        </div>

        {/* Mobile Controls - Top Right (horizontal, reusing desktop components) */}
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 50, pointerEvents: 'auto' }} className="mobile-controls-only">
          <MobileControls
            onVoiceMode={openVoiceModal}
            imageIndex={imageIndex + 1}
            onImageToggle={() => setImageIndex((prev) => (prev + 1) % WALLPAPERS.length)}
            onScreenshot={handleScreenshot}
          />
        </div>

        {/* Widgets Grid - iOS-style home-screen widgets */}
        <div
          className="widgets-section"
          style={{
            position: 'absolute',
            top: 90,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <div style={{ pointerEvents: 'auto', width: '100%' }}>
            <WidgetsGrid />
          </div>
        </div>

        <CardStackContainer
          isExiting={false}
          activeFilters={activeFilters}
          windowModeState={windowModeState}
          expandedProject={expandedProject}
          onExpandProject={setExpandedProject}
          getProjectLayoutId={getProjectLayoutId}
        />

        <ExpandedProject
          projectName={expandedProject}
          onClose={() => setExpandedProject(null)}
          layoutId={expandedProject ? getProjectLayoutId(expandedProject.toLowerCase()) : ""}
        />

        <GradientBlur direction="bottom" />

        <Dock
          mode="multi"
          projects={PROJECTS}
          isVisible={true}
          openWindows={windowModeState.openWindows}
          onIconClick={(slug) => {
            windowModeState.bringToFront(slug);
          }}
        />
      </div>

      {/* Mobile blocker overlay */}
      <MobileBlocker />

      {/* 3. The Modals */}
      <AboutModal />
      <VoiceModal />

      {/* The Floating Screenshot Preview */}
      <ScreenshotThumbnail
        url={screenshotUrl}
        captureKey={captureKey}
        onDismiss={() => setScreenshotUrl(null)}
      />
    </main>
  );
}
