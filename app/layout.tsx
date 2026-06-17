import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_NAME = "TypeFinder";
const SITE_DESC =
  "Free Myers-Briggs (MBTI) personality test plus in-depth profiles of all 16 personality types, career matches, relationship compatibility and cognitive functions.";

export const metadata: Metadata = {
  metadataBase: new URL("https://typefinder.example"),
  title: {
    default: "Free Myers-Briggs (MBTI) Personality Test | TypeFinder",
    template: "%s | TypeFinder",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Myers Briggs test", "MBTI test", "personality test", "free personality test",
    "personality type test", "16 personalities", "cognitive functions test",
    "career personality test", "relationship compatibility test",
  ],
  openGraph: { title: SITE_NAME, description: SITE_DESC, type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="visually-hidden">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
