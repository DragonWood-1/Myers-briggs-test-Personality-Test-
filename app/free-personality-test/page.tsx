import type { Metadata } from "next";
import TestIntro from "@/components/TestIntro";

export const metadata: Metadata = {
  title: "Free Personality Test — No Sign-Up Required",
  description:
    "A completely free personality test with no email or sign-up. Discover your personality type and read a detailed, honest profile in minutes.",
  alternates: { canonical: "/free-personality-test" },
};

export default function Page() {
  return (
    <TestIntro
      title="Free Personality Test"
      intro="No paywall. No email. No catch. Answer 32 questions and get your full personality type profile instantly."
    >
      <h2>Genuinely free — and private</h2>
      <p className="prose">
        Many personality tests show you a teaser and then ask for payment or an email address to see
        your real results. This one doesn't. Every part of your result — your type, your trait
        breakdown and your full profile — is available immediately and free.
      </p>
      <p className="prose">
        Because the test runs entirely in your browser, your answers are never uploaded or stored on
        a server. Close the tab and they're gone.
      </p>
    </TestIntro>
  );
}
