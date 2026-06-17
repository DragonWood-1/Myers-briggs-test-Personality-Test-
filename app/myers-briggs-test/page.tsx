import type { Metadata } from "next";
import TestIntro from "@/components/TestIntro";

export const metadata: Metadata = {
  title: "Free Myers-Briggs (MBTI) Personality Test",
  description:
    "Take the free Myers-Briggs personality test online. Answer 32 quick questions to discover your MBTI type and get an in-depth profile of your strengths, careers and relationships.",
  alternates: { canonical: "/myers-briggs-test" },
};

export default function Page() {
  return (
    <TestIntro
      title="Free Myers-Briggs Personality Test"
      intro="Answer 32 honest questions to reveal your four-letter type. It takes about 5 minutes, and your results stay private in your browser."
    >
      <h2>What is the Myers-Briggs Type Indicator?</h2>
      <p className="prose">
        The Myers-Briggs Type Indicator (MBTI) sorts personality across four dimensions —
        Extraversion vs Introversion, Sensing vs Intuition, Thinking vs Feeling, and Judging vs
        Perceiving. The combination produces one of 16 types, each with its own characteristic
        strengths, blind spots and way of engaging the world.
      </p>
      <p className="prose">
        This test is a free, self-report indicator designed for self-reflection. It is inspired by
        the work of Carl Jung and Isabel Briggs Myers, but it is not the official instrument and is
        not a clinical or diagnostic tool.
      </p>
    </TestIntro>
  );
}
