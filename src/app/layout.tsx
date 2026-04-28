import { AboutModalProvider } from "./contexts/AboutModalContext";
import { ViewportProvider } from "./contexts/ViewportContext";
import { VoiceModalProvider } from "./contexts/VoiceModalContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Swosti - Portfolio",
  description: "Design engineer crafting AI-native interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <ThemeProvider>
          <ViewportProvider>
            <AboutModalProvider>
              <VoiceModalProvider>
                {children}
              </VoiceModalProvider>
            </AboutModalProvider>
          </ViewportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
