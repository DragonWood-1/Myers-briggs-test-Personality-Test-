import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introvert vs Extrovert — What's the Difference?",
  description:
    "Introvert vs extrovert explained: how the two differ in energy, social style and the brain — plus where ambiverts fit and how to find your place on the spectrum.",
  alternates: { canonical: "/introvert-vs-extrovert" },
};

export default function Page() {
  return (
    <div className="container">
      <section className="hero" style={{ textAlign: "left" }}>
        <h1>Introvert vs Extrovert</h1>
        <p className="lead" style={{ margin: 0 }}>
          The single most recognized personality difference — and one of the most misunderstood.
        </p>
      </section>

      <section className="section">
        <h2>It&apos;s about energy, not shyness</h2>
        <p className="prose">
          The core difference between introverts and extroverts isn&apos;t how outgoing or shy you
          are — it&apos;s where you get your energy. Extroverts are energized by interaction and the
          outer world; introverts recharge through solitude and reflection. An introvert can be a
          confident public speaker, and an extrovert can be quiet — what differs is what drains them
          and what restores them.
        </p>
      </section>

      <div className="grid cols-2">
        <div className="card">
          <h3>Signs you lean Extroverted</h3>
          <ul className="check">
            <li>You feel energized after socializing</li>
            <li>You think out loud and process by talking</li>
            <li>You seek variety and external stimulation</li>
            <li>You&apos;re quick to act and engage</li>
          </ul>
        </div>
        <div className="card">
          <h3>Signs you lean Introverted</h3>
          <ul className="check">
            <li>You recharge with alone time</li>
            <li>You think before you speak</li>
            <li>You prefer depth over breadth in relationships</li>
            <li>Too much stimulation feels draining</li>
          </ul>
        </div>
      </div>

      <section className="section">
        <h2>What about ambiverts?</h2>
        <p className="prose">
          Most people aren&apos;t at the extremes. Ambiverts sit near the middle, comfortable with
          both social engagement and solitude depending on context and mood. Personality preferences
          are a spectrum, not a binary switch.
        </p>
      </section>

      <hr className="divider" />
      <section className="section center">
        <h2>Where do you fall?</h2>
        <Link className="btn" href="/myers-briggs-test">Take the free test →</Link>
      </section>
    </div>
  );
}
