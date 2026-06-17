// Computes relationship compatibility between any two of the 16 types.
// Produces the 16 × 16 = 256 compatibility pages from a deterministic model
// grounded in MBTI theory (shared functions, complementary preferences).

import { TypeCode, TYPES } from "./types";

export interface Compatibility {
  a: TypeCode;
  b: TypeCode;
  score: number; // 0-100
  rating: "Excellent" | "Strong" | "Good" | "Moderate" | "Challenging";
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string[];
}

function letters(code: TypeCode) {
  return { ei: code[0], sn: code[1], tf: code[2], jp: code[3] };
}

// Golden-pair theory: best matches share intuition/sensing (N/S) and the
// dominant energy axis, while differing on E/I and J/P for balance.
function rawScore(a: TypeCode, b: TypeCode): number {
  const la = letters(a);
  const lb = letters(b);
  let score = 50;

  // Shared S/N is the single biggest driver of mutual understanding.
  score += la.sn === lb.sn ? 18 : -10;

  // Complementary E/I (one in, one out) tends to balance well.
  score += la.ei !== lb.ei ? 8 : 2;

  // Shared T/F helps value alignment; a small mismatch can still work.
  score += la.tf === lb.tf ? 8 : -2;

  // Complementary J/P balances structure and spontaneity.
  score += la.jp !== lb.jp ? 7 : 3;

  // Classic "golden pair" bonus: same middle letters flipped energy/judging.
  if (la.sn === lb.sn && la.tf === lb.tf && la.ei !== lb.ei && la.jp !== lb.jp) {
    score += 12;
  }

  // Identical type: deep understanding but risk of shared blind spots.
  if (a === b) score = 72;

  return Math.max(20, Math.min(98, score));
}

function ratingFor(score: number): Compatibility["rating"] {
  if (score >= 85) return "Excellent";
  if (score >= 75) return "Strong";
  if (score >= 62) return "Good";
  if (score >= 50) return "Moderate";
  return "Challenging";
}

export function getCompatibility(aCode: TypeCode, bCode: TypeCode): Compatibility {
  const score = rawScore(aCode, bCode);
  const rating = ratingFor(score);
  const a = TYPES[aCode];
  const b = TYPES[bCode];
  const la = letters(aCode);
  const lb = letters(bCode);

  const sharedSN = la.sn === lb.sn;
  const sharedTF = la.tf === lb.tf;
  const complementEI = la.ei !== lb.ei;
  const complementJP = la.jp !== lb.jp;

  const strengths: string[] = [];
  const challenges: string[] = [];
  const advice: string[] = [];

  if (sharedSN) {
    strengths.push(
      `${aCode} and ${bCode} share the same ${la.sn === "N" ? "intuitive" : "sensing"} way of taking in the world, so they naturally speak the same language and understand each other's priorities.`
    );
  } else {
    challenges.push(
      `${aCode} processes information ${la.sn === "N" ? "abstractly and future-focused" : "concretely and present-focused"}, while ${bCode} leans the opposite way — a frequent source of "we're talking past each other" moments.`
    );
    advice.push("Translate between the big picture and the concrete details deliberately rather than assuming the other sees it your way.");
  }

  if (sharedTF) {
    strengths.push(
      `Both make decisions through ${la.tf === "T" ? "logic and objective analysis" : "values and how choices affect people"}, which keeps conflict-resolution aligned.`
    );
  } else {
    strengths.push("One partner brings warmth and empathy while the other brings logic and objectivity — a balance that, when respected, covers each other's blind spots.");
    advice.push(`When you disagree, remember the ${la.tf === "T" ? aCode : bCode} needs the reasoning and the ${la.tf === "F" ? aCode : bCode} needs the emotional impact acknowledged.`);
  }

  if (complementEI) {
    strengths.push("Their energy levels complement each other: one draws the pair outward into the world, the other anchors it with depth and reflection.");
  } else {
    challenges.push(
      la.ei === "E"
        ? "Both are extraverts, so they bring great social energy together but may compete for airtime and need to manage overstimulation."
        : "Both are introverts, so they enjoy calm, deep connection but must make a conscious effort to stay socially active and initiate."
    );
  }

  if (complementJP) {
    strengths.push("Structure meets spontaneity: the Judging partner brings planning and follow-through, the Perceiving partner brings flexibility and openness.");
    advice.push("Agree on which decisions need a plan and which can stay open, so neither feels boxed in or unmoored.");
  } else if (la.jp === "J") {
    challenges.push("Both are planners, which makes for a well-run life but can turn into power struggles over whose plan wins.");
  } else {
    challenges.push("Both are spontaneous, which keeps things exciting but means logistics, finances and follow-through can slip without a system.");
  }

  advice.push("Schedule regular, judgment-free check-ins so small frictions get aired before they harden.");

  const summary =
    aCode === bCode
      ? `${aCode} with ${bCode} is a mirror match. ${a.nickname}s understand each other almost instinctively, sharing values, communication style and pace. The intimacy comes easily; the risk is reinforcing each other's blind spots, so deliberately invite outside perspectives.`
      : `${aCode} (${a.nickname}) and ${bCode} (${b.nickname}) form a ${rating.toLowerCase()} match with an estimated compatibility of ${score}%. ${
          sharedSN ? "They see the world similarly" : "They see the world quite differently"
        }, and ${
          complementEI ? "their complementary energy keeps the relationship balanced." : "their shared energy style gives them natural common ground."
        } With mutual respect for their differences, this pairing can be deeply rewarding.`;

  return { a: aCode, b: bCode, score, rating, summary, strengths, challenges, advice };
}

export function pairSlug(a: TypeCode, b: TypeCode): string {
  return `${a.toLowerCase()}-and-${b.toLowerCase()}`;
}

export function parsePairSlug(slug: string): [TypeCode, TypeCode] | null {
  const m = slug.match(/^([a-z]{4})-and-([a-z]{4})$/i);
  if (!m) return null;
  const a = m[1].toUpperCase() as TypeCode;
  const b = m[2].toUpperCase() as TypeCode;
  if (!TYPES[a] || !TYPES[b]) return null;
  return [a, b];
}
