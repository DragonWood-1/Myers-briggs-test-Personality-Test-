import type { Metadata } from "next";
import Link from "next/link";
import { TYPES, TYPE_CODES } from "@/data/types";

export const metadata: Metadata = {
  title: "The 16 Personality Types — Full List & Profiles",
  description:
    "Explore all 16 Myers-Briggs personality types. Read in-depth profiles covering strengths, weaknesses, careers, relationships and famous examples for each type.",
  alternates: { canonical: "/personality-types" },
};

const GROUPS = ["Analyst", "Diplomat", "Sentinel", "Explorer"] as const;

export default function Page() {
  return (
    <div className="container">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <h1>The 16 Personality Types</h1>
        <p className="lead">
          Four-letter codes, grouped into four families. Click any type for a full profile of its
          strengths, careers, relationships and more.
        </p>
      </section>

      {GROUPS.map((group) => {
        const codes = TYPE_CODES.filter((c) => TYPES[c].group === group);
        const color = TYPES[codes[0]].groupColor;
        return (
          <section className="section" key={group}>
            <h2 style={{ color }}>{group}s</h2>
            <div className="grid cols-4">
              {codes.map((code) => {
                const t = TYPES[code];
                return (
                  <Link key={code} href={`/${code.toLowerCase()}-personality`} className="card">
                    <span className="badge" style={{ background: t.groupColor }}>{code}</span>
                    <h3 style={{ margin: "10px 0 2px" }}>{t.nickname}</h3>
                    <p className="small muted" style={{ margin: 0 }}>{t.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
