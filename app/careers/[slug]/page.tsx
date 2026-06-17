import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TYPES, TYPE_CODES, getType, TypeCode } from "@/data/types";
import { CAREER_VARIANTS, CareerCategory, careersForType } from "@/data/careers";

export const dynamicParams = false;

const YEAR = "2026";

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const v of CAREER_VARIANTS) {
    for (const code of TYPE_CODES) {
      params.push({ slug: `${v.slug}-${code.toLowerCase()}` });
    }
  }
  return params;
}

function parse(slug: string): { variant: CareerCategory; code: TypeCode } | null {
  const m = slug.match(/^(.*)-([a-z]{4})$/);
  if (!m) return null;
  const variant = CAREER_VARIANTS.find((v) => v.slug === m[1]);
  const code = m[2].toUpperCase();
  if (!variant || !getType(code)) return null;
  return { variant, code: code as TypeCode };
}

function fill(template: string, code: TypeCode) {
  const t = TYPES[code];
  return template
    .replace(/\{TYPE\}/g, code)
    .replace(/\{type\}/g, code.toLowerCase())
    .replace(/\{NICK\}/g, t.nickname)
    .replace(/\{YEAR\}/g, YEAR);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parse(slug);
  if (!parsed) return {};
  const title = fill(parsed.variant.titleTemplate, parsed.code);
  return {
    title,
    description: fill(parsed.variant.intro, parsed.code),
    alternates: { canonical: `/careers/${slug}` },
  };
}

// Stable per-type seed so the recommended list is consistent.
function seedFor(code: TypeCode, variantSlug: string): number {
  return [...(code + variantSlug)].reduce((a, c) => a + c.charCodeAt(0), 0);
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parse(slug);
  if (!parsed) notFound();
  const { variant, code } = parsed;
  const t = TYPES[code];
  const careers = careersForType(t.careerMatches, seedFor(code, variant.slug), 14);

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link href="/career-personality-test">Careers</Link> /{" "}
        <Link href={`/${code.toLowerCase()}-personality`}>{code}</Link> / Career Guide
      </p>

      <section className="hero" style={{ textAlign: "left" }}>
        <h1>{fill(variant.headingTemplate, code)}</h1>
        <p className="lead" style={{ margin: 0 }}>{fill(variant.intro, code)}</p>
      </section>

      <section className="section">
        <h2>Recommended roles for {code}</h2>
        <div className="grid cols-3">
          {careers.map((c) => (
            <div className="card" key={c}>
              <h3 style={{ margin: 0, fontSize: "1.05rem" }}>{c}</h3>
              <p className="small muted" style={{ margin: "6px 0 0" }}>
                Plays to the {t.nickname}&apos;s {t.strengths[0].toLowerCase()} and{" "}
                {t.strengths[1].toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why these careers fit {code}s</h2>
        <p className="prose">{t.overview}</p>
        <p className="prose">
          {t.nickname}s do their best work when a role rewards their core strengths and gives them
          the right environment. Look for positions that offer:
        </p>
        <ul className="check">
          {t.strengths.slice(0, 4).map((s) => <li key={s}>Room to use your {s.toLowerCase()}</li>)}
        </ul>
      </section>

      <section className="section">
        <h2>Careers {code}s may want to approach with care</h2>
        <p className="prose">
          No type is locked out of any career, but roles that constantly clash with your natural
          wiring can be draining. For {code}s, watch for jobs that demand sustained{" "}
          {t.weaknesses[0].toLowerCase().replace(/^(can be |prone to |dislike of |difficulty )/, "")}
          {" "}or offer little of what energizes you.
        </p>
      </section>

      <section className="section">
        <h2>{code} work & communication style</h2>
        <div className="grid cols-2">
          <div className="card"><h3>Leadership</h3><p className="small muted">{t.leadershipStyle}</p></div>
          <div className="card"><h3>Communication</h3><p className="small muted">{t.communicationStyle}</p></div>
        </div>
      </section>

      <section className="section">
        <h3>More {code} career guides</h3>
        <div className="pagelinks">
          {CAREER_VARIANTS.filter((v) => v.slug !== variant.slug).map((v) => (
            <Link key={v.slug} href={`/careers/${v.slug}-${code.toLowerCase()}`}>
              {fill(v.titleTemplate, code).replace(` (${YEAR})`, "")}
            </Link>
          ))}
          <Link href={`/${code.toLowerCase()}-personality`}>Full {code} profile</Link>
        </div>
      </section>

      <hr className="divider" />
      <section className="section center">
        <h2>Don&apos;t know your type yet?</h2>
        <Link className="btn" href="/career-personality-test">Take the career personality test →</Link>
      </section>
    </div>
  );
}
