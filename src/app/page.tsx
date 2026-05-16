"use client";
// Triggering fresh deploy for Grid view updates

import { useState, useCallback, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import DesktopSidebar from "@/components/desktopSidebar/desktopSidebar";
import CardStackContainer from "@/components/homePage/cardStackContainer/cardStackContainer";
import ExpandedProject from "@/components/homePage/expandedProject/ExpandedProject";
import PostsFeed from "@/components/posts/PostsFeed";
import Dock from "@/components/dock/dock";
import GradientBlur from "@/components/gradientBlur/gradientBlur";
import AboutModal from "@/components/aboutModal/AboutModal";
import VoiceModal from "@/components/voiceModal/VoiceModal";
import { AnimatePresence, motion } from "framer-motion";
import { Squircle } from "corner-smoothing";
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
import { useWindowMode } from "@/app/hooks/useWindowMode";
import IntroOverlay from "@/components/introOverlay/IntroOverlay";
import { useVoiceModal } from "@/app/contexts/VoiceModalContext";
import { PROJECTS } from "@/app/types/projects.types";
import { AudioLines } from "lucide-react";

function HomeContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("tab");
  const windowModeState = useWindowMode(viewMode);
  const { openModal: openVoiceModal } = useVoiceModal();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const WALLPAPERS = ["/wallpapers/pexels-sergei-31959340.jpg", "/bg.jpg", "/wallpapers/bg1.jpg", "/wallpapers/bg2.jpg", "/wallpapers/bg3.jpg", "/wallpapers/bg4.jpg"];
  const bgImage = WALLPAPERS[imageIndex];

  // Screenshot State
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [captureKey, setCaptureKey] = useState(0);

  // Project Expansion State
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const getProjectLayoutId = useCallback((slug: string) => `project-card-${slug}`, []);

  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Sync URL -> State on mount
  useEffect(() => {
    const projectSlug = searchParams.get("project");
    if (projectSlug) {
      const project = PROJECTS.find(p => p.slug.toLowerCase() === projectSlug.toLowerCase());
      if (project) {
        setExpandedProject(project.name);
      }
    }
  }, [searchParams]);

  // 2. Sync State -> URL on change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (expandedProject) {
      const project = PROJECTS.find(p => p.name === expandedProject);
      if (project) {
        params.set("project", project.slug.toLowerCase());
      }
    } else {
      params.delete("project");
    }

    const newPathname = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
    router.replace(newPathname, { scroll: false });
  }, [expandedProject, isPostsOpen, router]);

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
        <DesktopSidebar 
          onShowPosts={() => setIsPostsOpen(true)}
          onCollapseProject={() => { setExpandedProject(null); setIsPostsOpen(false); }}
          activePage={isPostsOpen ? "Post" : (expandedProject ? undefined : "Work")}
        />
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

        <CardStackContainer
          isExiting={false}
          activeFilters={activeFilters}
          windowModeState={windowModeState}
          expandedProject={expandedProject}
          onExpandProject={setExpandedProject}
          getProjectLayoutId={getProjectLayoutId}
          viewMode={viewMode}
        />

        <ExpandedProject
          projectName={expandedProject}
          onClose={() => setExpandedProject(null)}
          layoutId={expandedProject ? getProjectLayoutId(expandedProject.toLowerCase()) : ""}
        />

        {/* Posts Overlay Window */}
        <AnimatePresence>
          {isPostsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Backdrop */}
              <div 
                onClick={() => setIsPostsOpen(false)}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }} 
              />
              
              {/* The Window */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{ position: 'relative', width: '82vw', maxWidth: '1200px', height: '88vh', pointerEvents: 'none' }}
              >
                <Squircle
                  cornerRadius={24}
                  style={{ width: '100%', height: '100%', background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto' }}
                >
                  {/* macOS Title bar */}
                  <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #f2f2f2', background: '#F0F0F0', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', left: '16px', display: 'flex', gap: '8px' }}>
                      <div onClick={() => setIsPostsOpen(false)} style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f56', cursor: 'pointer' }} />
                      <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ffbd2e' }} />
                      <div style={{ width: 12, height: 12, borderRadius: 6, background: '#27c93f' }} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Posts</div>
                  </div>

                  {/* Content area */}
                  <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <PostsFeed />
                  </div>
                </Squircle>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* Mobile blocker */}
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

      {/* First-visit Introduction Overlay */}
      <IntroOverlay />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
