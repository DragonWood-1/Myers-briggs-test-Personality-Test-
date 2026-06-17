import type { Metadata } from "next";
import Link from "next/link";
import { ASSESSMENTS } from "@/data/assessments";

export const metadata: Metadata = {
  title: "Free Personality & Aptitude Assessments",
  description:
    "Explore free assessments: IQ, EQ, DISC, Enneagram, Big Five, Love Languages, Leadership Style, Entrepreneur Aptitude, Learning Style and Work Style.",
  alternates: { canonical: "/assessments" },
};

export default function Page() {
  return (
    <div className="container">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <h1>More Assessments</h1>
        <p className="lead">
          Beyond personality type, these assessments help you understand your intelligence,
          emotions, behavior, values and the way you work and learn.
        </p>
      </section>
      <section className="section">
        <div className="grid cols-2">
          {ASSESSMENTS.map((a) => (
            <Link key={a.slug} href={`/assessments/${a.slug}`} className="card">
              <h3 style={{ margin: "0 0 6px" }}>{a.name}</h3>
              <p className="small muted" style={{ margin: "0 0 8px" }}>{a.short}</p>
              <p className="small" style={{ margin: 0, color: "var(--accent)" }}>
                {a.duration} · Measures {a.measures.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
