import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Personality Types Explained — A Beginner's Guide",
  description:
    "Personality types explained simply: what the four MBTI dimensions mean, how the 16 types are built, and how to read your four-letter code.",
  alternates: { canonical: "/personality-types-explained" },
};

const DIMS = [
  ["Extraversion (E) vs Introversion (I)", "Where you direct and draw energy — the outer world of people and activity, or the inner world of thought and reflection."],
  ["Sensing (S) vs Intuition (N)", "How you take in information — through concrete facts and the five senses, or through patterns, meanings and possibilities."],
  ["Thinking (T) vs Feeling (F)", "How you make decisions — through objective logic and consistency, or through values and the human impact of choices."],
  ["Judging (J) vs Perceiving (P)", "How you approach the outside world — with structure, planning and closure, or with flexibility, openness and spontaneity."],
];

export default function Page() {
  return (
    <div className="container">
      <section className="hero" style={{ textAlign: "left" }}>
        <h1>Personality Types Explained</h1>
        <p className="lead" style={{ margin: 0 }}>
          A friendly, no-jargon guide to what those four letters actually mean.
        </p>
      </section>

      <section className="section">
        <h2>The four dimensions</h2>
        <p className="prose">
          Your personality type is built from four preferences. On each dimension you lean one way or
          the other, and the four letters together form your type — one of 16 combinations.
        </p>
        <div className="grid cols-2">
          {DIMS.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3 style={{ margin: "0 0 6px" }}>{title}</h3>
              <p className="small muted" style={{ margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>How to read your code</h2>
        <p className="prose">
          Take <span className="type-pill">INFJ</span> as an example: Introverted, iNtuitive,
          Feeling, Judging. That&apos;s someone who recharges alone (I), focuses on meaning and
          patterns (N), decides through values (F), and prefers structure and closure (J). Every
          four-letter code unpacks the same way.
        </p>
        <p className="prose">
          A &quot;preference&quot; doesn&apos;t mean you can&apos;t use the other side — just like
          being right-handed doesn&apos;t mean you never use your left. It describes what comes most
          naturally.
        </p>
      </section>

      <section className="section">
        <h2>The four families</h2>
        <p className="prose">
          The 16 types are often grouped into four temperaments: <strong>Analysts</strong> (intuitive
          thinkers), <strong>Diplomats</strong> (intuitive feelers), <strong>Sentinels</strong>{" "}
          (practical, dependable organizers) and <strong>Explorers</strong> (hands-on, spontaneous
          doers).
        </p>
        <Link className="btn secondary" href="/personality-types">Browse all 16 types →</Link>
      </section>

      <hr className="divider" />
      <section className="section center">
        <h2>Ready to find yours?</h2>
        <Link className="btn" href="/myers-briggs-test">Take the free test →</Link>
      </section>
    </div>
  );
}
