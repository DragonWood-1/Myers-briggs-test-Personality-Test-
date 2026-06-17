import type { MetadataRoute } from "next";
import { TYPE_CODES } from "@/data/types";
import { CAREER_VARIANTS } from "@/data/careers";
import { pairSlug } from "@/data/compatibility";
import { ASSESSMENTS } from "@/data/assessments";

const BASE = "https://personalitytypecheck.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: string[] = [
    "/",
    "/myers-briggs-test",
    "/free-personality-test",
    "/personality-type-test",
    "/career-personality-test",
    "/relationship-personality-test",
    "/cognitive-functions-test",
    "/personality-types",
    "/personality-types-explained",
    "/introvert-vs-extrovert",
    "/assessments",
  ];

  for (const code of TYPE_CODES) urls.push(`/${code.toLowerCase()}-personality`);
  for (const v of CAREER_VARIANTS)
    for (const code of TYPE_CODES) urls.push(`/careers/${v.slug}-${code.toLowerCase()}`);
  for (const a of TYPE_CODES)
    for (const b of TYPE_CODES) urls.push(`/compatibility/${pairSlug(a, b)}`);
  for (const a of ASSESSMENTS) urls.push(`/assessments/${a.slug}`);

  return urls.map((u) => ({
    url: `${BASE}${u}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: u === "/" ? 1 : 0.7,
  }));
}
