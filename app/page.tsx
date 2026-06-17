import Link from "next/link";
import { TYPES, TYPE_CODES } from "@/data/types";
import { ASSESSMENTS } from "@/data/assessments";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <h1>Discover Your Personality Type</h1>
        <p className="lead">
          Take the free Myers-Briggs–style personality test and unlock in-depth insights into your
          strengths, ideal careers, relationships and how your mind works — in about 5 minutes.
        </p>
        <div className="hero-cta">
          <Link className="btn" href="/myers-briggs-test">Take the Free Test →</Link>
          <Link className="btn secondary" href="/personality-types">Explore the 16 Types</Link>
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>
          100% free · No sign-up · Private — results never leave your browser
        </p>
      </section>

      <section className="section container">
        <h2>The 16 Personality Types</h2>
        <div className="grid cols-4">
          {TYPE_CODES.map((code) => {
            const t = TYPES[code];
            return (
              <Link key={code} href={`/${code.toLowerCase()}-personality`} className="card">
                <span className="badge" style={{ background: t.groupColor }}>{t.group}</span>
                <h3 style={{ margin: "10px 0 2px" }}>
                  <span className="type-pill">{code}</span>
                </h3>
                <p className="small" style={{ margin: "0 0 6px", fontWeight: 700 }}>{t.nickname}</p>
                <p className="small muted" style={{ margin: 0 }}>{t.tagline}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section container">
        <h2>Explore by Topic</h2>
        <div className="grid cols-3">
          <Link href="/career-personality-test" className="card">
            <h3>Career Personality Test</h3>
            <p className="small muted">Find the careers where your type naturally thrives.</p>
          </Link>
          <Link href="/relationship-personality-test" className="card">
            <h3>Relationship Compatibility</h3>
            <p className="small muted">See how any two of the 16 types match in love and life.</p>
          </Link>
          <Link href="/cognitive-functions-test" className="card">
            <h3>Cognitive Functions</h3>
            <p className="small muted">Go deeper than four letters — understand how you process the world.</p>
          </Link>
          <Link href="/introvert-vs-extrovert" className="card">
            <h3>Introvert vs Extrovert</h3>
            <p className="small muted">Where do you really fall on the energy spectrum?</p>
          </Link>
          <Link href="/personality-types-explained" className="card">
            <h3>Personality Types Explained</h3>
            <p className="small muted">A clear, friendly guide to what the theory actually means.</p>
          </Link>
          <Link href="/free-personality-test" className="card">
            <h3>Free Personality Test</h3>
            <p className="small muted">No paywall, no sign-up — just honest insight.</p>
          </Link>
        </div>
      </section>

      <section className="section container">
        <h2>More Assessments</h2>
        <div className="grid cols-3">
          {ASSESSMENTS.map((a) => (
            <Link key={a.slug} href={`/assessments/${a.slug}`} className="card">
              <h3>{a.name}</h3>
              <p className="small muted">{a.short}</p>
              <p className="small" style={{ color: "var(--accent)" }}>{a.duration}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
