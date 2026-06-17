import type { Metadata } from "next";
import TestIntro from "@/components/TestIntro";

export const metadata: Metadata = {
  title: "Cognitive Functions Test — Discover Your Function Stack",
  description:
    "Go beyond four letters. Learn about the eight cognitive functions, take the test, and understand the function stack behind your personality type.",
  alternates: { canonical: "/cognitive-functions-test" },
};

const FUNCTIONS = [
  ["Ni — Introverted Intuition", "Sees underlying patterns and future implications; pursues a single, deep insight."],
  ["Ne — Extraverted Intuition", "Generates possibilities and connections; thrives on brainstorming and what-ifs."],
  ["Si — Introverted Sensing", "Anchors in past experience, detail and proven routine; values consistency."],
  ["Se — Extraverted Sensing", "Lives in the present moment; sharp, hands-on awareness of the physical world."],
  ["Ti — Introverted Thinking", "Builds precise internal logic; seeks accuracy and consistency of reasoning."],
  ["Te — Extraverted Thinking", "Organizes the outer world efficiently; drives toward measurable results."],
  ["Fi — Introverted Feeling", "Guided by deep personal values and authenticity; strong inner moral compass."],
  ["Fe — Extraverted Feeling", "Attuned to others' emotions and group harmony; seeks connection and consensus."],
];

export default function Page() {
  return (
    <TestIntro
      title="Cognitive Functions Test"
      intro="Your four-letter type is shorthand for a deeper 'function stack' — the order in which you use eight mental processes. Take the test, then learn your stack."
    >
      <h2>The eight cognitive functions</h2>
      <div className="grid cols-2" style={{ marginTop: 12 }}>
        {FUNCTIONS.map(([name, desc]) => (
          <div className="card" key={name}>
            <h3 style={{ margin: "0 0 6px" }}>{name}</h3>
            <p className="small muted" style={{ margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
      <p className="prose" style={{ marginTop: 18 }}>
        Every type has a dominant, auxiliary, tertiary and inferior function. For example, INTJs lead
        with Introverted Intuition (Ni) supported by Extraverted Thinking (Te). Your full type profile
        lists your complete stack.
      </p>
    </TestIntro>
  );
}
