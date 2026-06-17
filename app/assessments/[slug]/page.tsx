import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ASSESSMENTS, getAssessment } from "@/data/assessments";

export const dynamicParams = false;

export function generateStaticParams() {
  return ASSESSMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAssessment(slug);
  if (!a) return {};
  return {
    title: `${a.name} — Free Online Assessment`,
    description: `${a.short} ${a.overview.slice(0, 110)}`,
    alternates: { canonical: `/assessments/${a.slug}` },
  };
}

export default async function AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAssessment(slug);
  if (!a) notFound();

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link href="/assessments">Assessments</Link> / {a.name}
      </p>

      <section className="hero" style={{ textAlign: "left" }}>
        <h1>{a.name}</h1>
        <p className="lead" style={{ margin: "0 0 6px" }}>{a.short}</p>
        <div className="tag-list" style={{ marginTop: 8 }}>
          <li>⏱ {a.duration}</li>
          <li>Measures: {a.measures}</li>
        </div>
      </section>

      <section className="section">
        <h2>About the {a.name}</h2>
        <p className="prose">{a.overview}</p>
      </section>

      <section className="section">
        <h2>What it measures</h2>
        <div className="grid cols-2">
          {a.dimensions.map((d) => (
            <div className="card" key={d.name}>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem" }}>{d.name}</h3>
              <p className="small muted" style={{ margin: 0 }}>{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Who it&apos;s for</h2>
        <p className="prose">{a.whoFor}</p>
      </section>

      <div className="notice">
        This assessment is offered for self-reflection and educational purposes. It is not a clinical
        or diagnostic instrument. For decisions with significant consequences, consult a qualified
        professional.
      </div>

      <hr className="divider" />
      <section className="section">
        <h3>Other assessments</h3>
        <div className="pagelinks">
          {ASSESSMENTS.filter((x) => x.slug !== a.slug).map((x) => (
            <Link key={x.slug} href={`/assessments/${x.slug}`}>{x.name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
