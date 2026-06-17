import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container center" style={{ padding: "80px 0" }}>
      <h1>Page not found</h1>
      <p className="lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="hero-cta">
        <Link className="btn" href="/">Go home</Link>
        <Link className="btn secondary" href="/myers-briggs-test">Take the test</Link>
      </div>
    </div>
  );
}
