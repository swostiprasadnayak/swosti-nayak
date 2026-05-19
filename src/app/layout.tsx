import { AboutModalProvider } from "./contexts/AboutModalContext";
import { FeedbackModalProvider } from "./contexts/FeedbackModalContext";
import { ViewportProvider } from "./contexts/ViewportContext";
import { VoiceModalProvider } from "./contexts/VoiceModalContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomCursor from "@/components/ui/customCursor/CustomCursor";
import FeedbackModal from "@/components/feedbackModal/FeedbackModal";
import FeedbackPopup from "@/components/feedbackPopup/FeedbackPopup";
import WelcomeOverlay from "@/components/welcomeOverlay/WelcomeOverlay";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Swosti - Portfolio",
  description: "Design engineer crafting AI-native interfaces.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className} style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <CustomCursor />
        {/* page-content wraps everything that should be blurred when the
            welcome overlay is visible. WelcomeOverlay toggles a class on
            this div to apply filter: blur() — much more reliable than
            backdrop-filter, which fights with framer-motion's will-change. */}
        <div id="page-content">
          <ThemeProvider>
            <ViewportProvider>
              <AboutModalProvider>
                <FeedbackModalProvider>
                  <VoiceModalProvider>
                    {children}
                    <FeedbackModal />
                    <FeedbackPopup />
                  </VoiceModalProvider>
                </FeedbackModalProvider>
              </AboutModalProvider>
            </ViewportProvider>
          </ThemeProvider>
        </div>
        {/* Overlay sits OUTSIDE the blurred wrapper so it stays sharp */}
        <WelcomeOverlay />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
