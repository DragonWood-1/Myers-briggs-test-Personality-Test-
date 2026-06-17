import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TYPES, TYPE_CODES, getType, TypeCode } from "@/data/types";
import { getCompatibility, pairSlug } from "@/data/compatibility";

export const dynamicParams = false;

export function generateStaticParams() {
  return TYPE_CODES.map((code) => ({ slug: `${code.toLowerCase()}-personality` }));
}

function codeFromSlug(slug: string): TypeCode | null {
  const m = slug.match(/^([a-z]{4})-personality$/);
  if (!m) return null;
  const code = m[1].toUpperCase();
  return getType(code) ? (code as TypeCode) : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const code = codeFromSlug(slug);
  if (!code) return {};
  const t = TYPES[code];
  return {
    title: `${code} Personality (${t.nickname}) — Strengths, Careers & Relationships`,
    description: `In-depth ${code} (${t.nickname}) profile: ${t.tagline} Explore ${code} strengths, weaknesses, best careers, relationships, famous people and more.`,
    alternates: { canonical: `/${slug}` },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default async function TypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const code = codeFromSlug(slug);
  if (!code) notFound();
  const t = TYPES[code];

  // Best-fit relationship matches computed from the compatibility model.
  const matches = TYPE_CODES.map((other) => getCompatibility(code, other))
    .filter((c) => c.b !== code)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link href="/personality-types">Personality Types</Link> / {code}
      </p>

      <section className="hero" style={{ textAlign: "left", paddingTop: 20 }}>
        <span className="badge" style={{ background: t.groupColor }}>{t.group}</span>
        <h1 style={{ marginTop: 12 }}>
          <span className="type-pill">{code}</span> — {t.nickname}
        </h1>
        <p className="lead" style={{ margin: 0 }}>{t.tagline}</p>
        <p className="prose" style={{ maxWidth: 760 }}>{t.overview}</p>
        <div className="tag-list" style={{ marginTop: 10 }}>
          <li>{t.dimensions.mind}</li>
          <li>{t.dimensions.energy}</li>
          <li>{t.dimensions.nature}</li>
          <li>{t.dimensions.tactics}</li>
          <li>{t.population} of people</li>
        </div>
      </section>

      <div className="grid cols-2">
        <Section title="Strengths">
          <ul className="check">{t.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </Section>
        <Section title="Weaknesses">
          <ul className="check cross">{t.weaknesses.map((s) => <li key={s}>{s}</li>)}</ul>
        </Section>
      </div>

      <Section title="Career Matches">
        <p className="prose">{t.nickname}s tend to thrive in roles that reward their natural strengths. Strong fits include:</p>
        <ul className="tag-list">{t.careerMatches.map((c) => <li key={c}>{c}</li>)}</ul>
        <p style={{ marginTop: 14 }}>
          <Link className="btn secondary" href={`/careers/best-careers-for-${code.toLowerCase()}`}>
            See the full {code} career guide →
          </Link>
        </p>
      </Section>

      <Section title="Cognitive Functions">
        <div className="grid cols-2">
          <div className="card"><strong>Dominant:</strong> {t.cognitiveFunctions.dominant}</div>
          <div className="card"><strong>Auxiliary:</strong> {t.cognitiveFunctions.auxiliary}</div>
          <div className="card"><strong>Tertiary:</strong> {t.cognitiveFunctions.tertiary}</div>
          <div className="card"><strong>Inferior:</strong> {t.cognitiveFunctions.inferior}</div>
        </div>
      </Section>

      <div className="grid cols-2">
        <Section title="Leadership Style"><p className="prose">{t.leadershipStyle}</p></Section>
        <Section title="Relationship Style"><p className="prose">{t.relationshipStyle}</p></Section>
      </div>

      <div className="grid cols-3">
        <Section title="Learning Style"><p className="prose small">{t.learningStyle}</p></Section>
        <Section title="Parenting Style"><p className="prose small">{t.parentingStyle}</p></Section>
        <Section title="Communication Style"><p className="prose small">{t.communicationStyle}</p></Section>
      </div>

      <Section title="Famous People">
        <ul className="tag-list">{t.famousPeople.map((p) => <li key={p}>{p}</li>)}</ul>
      </Section>

      <Section title="Best Relationship Matches">
        <div className="grid cols-4">
          {matches.map((m) => (
            <Link key={m.b} href={`/compatibility/${pairSlug(code, m.b)}`} className="card">
              <h3 style={{ margin: 0 }}><span className="type-pill">{m.b}</span></h3>
              <p className="small" style={{ margin: "4px 0 0", color: "var(--good)" }}>{m.rating} · {m.score}%</p>
            </Link>
          ))}
        </div>
      </Section>

      <hr className="divider" />
      <section className="section center">
        <h2>Not sure {code} is your type?</h2>
        <Link className="btn" href="/myers-briggs-test">Take the free test →</Link>
      </section>
    </div>
  );
}
