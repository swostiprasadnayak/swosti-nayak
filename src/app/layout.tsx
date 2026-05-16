import { AboutModalProvider } from "./contexts/AboutModalContext";
import { FeedbackModalProvider } from "./contexts/FeedbackModalContext";
import { ViewportProvider } from "./contexts/ViewportContext";
import { VoiceModalProvider } from "./contexts/VoiceModalContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomCursor from "@/components/ui/customCursor/CustomCursor";
import FeedbackModal from "@/components/feedbackModal/FeedbackModal";
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
        <ThemeProvider>
          <ViewportProvider>
            <AboutModalProvider>
              <FeedbackModalProvider>
                <VoiceModalProvider>
                  {children}
                  <FeedbackModal />
                </VoiceModalProvider>
              </FeedbackModalProvider>
            </AboutModalProvider>
          </ViewportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
