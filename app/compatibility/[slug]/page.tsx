import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TYPES, TYPE_CODES } from "@/data/types";
import { getCompatibility, pairSlug, parsePairSlug } from "@/data/compatibility";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const a of TYPE_CODES) {
    for (const b of TYPE_CODES) {
      params.push({ slug: pairSlug(a, b) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) return {};
  const [a, b] = pair;
  return {
    title: `${a} and ${b} Compatibility — Relationship Match`,
    description: `How compatible are ${a} (${TYPES[a].nickname}) and ${b} (${TYPES[b].nickname})? Explore their relationship strengths, challenges and advice for love and friendship.`,
    alternates: { canonical: `/compatibility/${slug}` },
  };
}

export default async function CompatibilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) notFound();
  const [a, b] = pair;
  const c = getCompatibility(a, b);
  const ta = TYPES[a];
  const tb = TYPES[b];

  const ratingColor =
    c.score >= 75 ? "var(--good)" : c.score >= 60 ? "var(--accent)" : "var(--warn)";

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link href="/relationship-personality-test">Relationships</Link> / {a} &amp; {b}
      </p>

      <section className="hero" style={{ textAlign: "left" }}>
        <h1>{a} &amp; {b} Compatibility</h1>
        <p className="lead" style={{ margin: "0 0 6px" }}>
          {ta.nickname} + {tb.nickname}
        </p>
        <p style={{ fontWeight: 800, fontSize: "1.3rem", color: ratingColor, margin: 0 }}>
          {c.rating} match · {c.score}%
        </p>
        <div className="meter" style={{ maxWidth: 420, marginTop: 10 }}>
          <span style={{ width: `${c.score}%` }} />
        </div>
      </section>

      <section className="section">
        <p className="prose">{c.summary}</p>
      </section>

      <div className="grid cols-2">
        <section className="section">
          <h2>Where they click</h2>
          <ul className="check">{c.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </section>
        <section className="section">
          <h2>Potential friction</h2>
          <ul className="check cross">
            {c.challenges.length ? c.challenges.map((s, i) => <li key={i}>{s}</li>) : <li>Few inherent friction points — this is a naturally smooth pairing.</li>}
          </ul>
        </section>
      </div>

      <section className="section">
        <h2>Advice for {a} &amp; {b}</h2>
        <ul className="check">{c.advice.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </section>

      <div className="grid cols-2">
        <section className="section">
          <h3><Link href={`/${a.toLowerCase()}-personality`}>About {a}</Link></h3>
          <p className="small muted">{ta.relationshipStyle}</p>
        </section>
        <section className="section">
          <h3><Link href={`/${b.toLowerCase()}-personality`}>About {b}</Link></h3>
          <p className="small muted">{tb.relationshipStyle}</p>
        </section>
      </div>

      <section className="section">
        <h3>Compare {a} with other types</h3>
        <div className="pagelinks">
          {TYPE_CODES.filter((x) => x !== b).map((x) => (
            <Link key={x} href={`/compatibility/${pairSlug(a, x)}`}>{a} &amp; {x}</Link>
          ))}
        </div>
      </section>

      <hr className="divider" />
      <section className="section center">
        <h2>Find your own type first</h2>
        <Link className="btn" href="/relationship-personality-test">Take the compatibility test →</Link>
      </section>
    </div>
  );
}
