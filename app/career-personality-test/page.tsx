import type { Metadata } from "next";
import Link from "next/link";
import TestIntro from "@/components/TestIntro";
import { TYPE_CODES, TYPES } from "@/data/types";
import { CAREER_VARIANTS } from "@/data/careers";

export const metadata: Metadata = {
  title: "Career Personality Test — Find Careers That Fit You",
  description:
    "Take the career personality test to discover the jobs and career paths that match your personality type, strengths and working style.",
  alternates: { canonical: "/career-personality-test" },
};

export default function Page() {
  return (
    <TestIntro
      title="Career Personality Test"
      intro="Discover the careers where your personality naturally thrives. Take the test, then explore tailored career guides for your type."
    >
      <h2>Career guides for every type</h2>
      <p className="prose">
        Once you know your type, dig into our career guides. Each one covers the best-fit roles,
        highest-paying options, remote-friendly jobs and more — tailored to how your type works
        best.
      </p>
      <div className="grid cols-4" style={{ marginTop: 16 }}>
        {TYPE_CODES.map((code) => (
          <Link key={code} href={`/careers/best-careers-for-${code.toLowerCase()}`} className="card">
            <h3 style={{ margin: 0 }}><span className="type-pill">{code}</span></h3>
            <p className="small muted" style={{ margin: "4px 0 0" }}>Best careers for {TYPES[code].nickname}s</p>
          </Link>
        ))}
      </div>

      <h3 style={{ marginTop: 28 }}>Browse by guide type</h3>
      <div className="pagelinks">
        {CAREER_VARIANTS.map((v) => (
          <Link key={v.slug} href={`/careers/${v.slug}-intj`}>
            {v.titleTemplate.replace("{TYPE}", "INTJ").replace(" ({YEAR})", "")}
          </Link>
        ))}
      </div>
    </TestIntro>
  );
}
