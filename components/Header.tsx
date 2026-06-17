"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/myers-briggs-test", label: "Take the Test" },
  { href: "/personality-types", label: "16 Types" },
  { href: "/career-personality-test", label: "Careers" },
  { href: "/relationship-personality-test", label: "Relationships" },
  { href: "/cognitive-functions-test", label: "Cognitive Functions" },
  { href: "/assessments", label: "Assessments" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="logo">PT</span>
          <span>PersonalityTypeCheck.com</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
