import type { Metadata } from "next";
import Link from "next/link";
import TestIntro from "@/components/TestIntro";
import { TYPE_CODES } from "@/data/types";

export const metadata: Metadata = {
  title: "Relationship Compatibility Test — Personality Match",
  description:
    "Take the relationship personality test and explore compatibility between all 16 personality types. See how any two types match in love, friendship and communication.",
  alternates: { canonical: "/relationship-personality-test" },
};

export default function Page() {
  return (
    <TestIntro
      title="Relationship Compatibility Test"
      intro="Find your type, then explore how it pairs with every other type in love, friendship and communication."
    >
      <h2>Check any compatibility pairing</h2>
      <p className="prose">
        Curious how two types get along? Pick a type below to see its compatibility with all 16
        others, including shared strengths, likely friction points and practical advice.
      </p>
      <div className="grid cols-4" style={{ marginTop: 16 }}>
        {TYPE_CODES.map((code) => (
          <Link key={code} href={`/compatibility/${code.toLowerCase()}-and-enfp`} className="card">
            <h3 style={{ margin: 0 }}><span className="type-pill">{code}</span></h3>
            <p className="small muted" style={{ margin: "4px 0 0" }}>Compatibility with all types</p>
          </Link>
        ))}
      </div>
    </TestIntro>
  );
}
