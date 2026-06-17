import Link from "next/link";
import { TYPE_CODES } from "@/data/types";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>TypeFinder</h4>
            <p className="small muted">
              Free, science-informed personality tests and in-depth type profiles to help you
              understand yourself, your career and your relationships.
            </p>
          </div>
          <div>
            <h4>Tests</h4>
            <Link href="/myers-briggs-test">Myers-Briggs Test</Link>
            <Link href="/free-personality-test">Free Personality Test</Link>
            <Link href="/personality-type-test">Personality Type Test</Link>
            <Link href="/career-personality-test">Career Test</Link>
            <Link href="/relationship-personality-test">Relationship Test</Link>
            <Link href="/cognitive-functions-test">Cognitive Functions</Link>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/personality-types">All 16 Types</Link>
            <Link href="/assessments">Assessments</Link>
            <Link href="/introvert-vs-extrovert">Introvert vs Extrovert</Link>
            <Link href="/personality-types-explained">Types Explained</Link>
          </div>
          <div>
            <h4>Popular Types</h4>
            {TYPE_CODES.slice(0, 6).map((c) => (
              <Link key={c} href={`/${c.toLowerCase()}-personality`}>
                {c} Personality
              </Link>
            ))}
          </div>
        </div>
        <hr className="divider" />
        <p className="small muted center">
          © {new Date().getFullYear()} TypeFinder. For self-discovery and entertainment. Not a
          substitute for professional psychological advice. No personal data is collected — results
          stay in your browser.
        </p>
      </div>
    </footer>
  );
}
