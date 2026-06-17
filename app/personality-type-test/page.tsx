import type { Metadata } from "next";
import TestIntro from "@/components/TestIntro";

export const metadata: Metadata = {
  title: "Personality Type Test — Find Your Type",
  description:
    "Take the personality type test to find which of the 16 types you are. Get an instant, detailed breakdown of your four preferences and full type profile.",
  alternates: { canonical: "/personality-type-test" },
};

export default function Page() {
  return (
    <TestIntro
      title="Personality Type Test"
      intro="Find out which of the 16 personality types fits you best, with a clear percentage breakdown across all four dimensions."
    >
      <h2>How typing works</h2>
      <p className="prose">
        Each question nudges your score along one of four spectrums. We tally your answers, find
        which side of each spectrum you lean toward, and combine the four letters into your type.
        The percentage bars show how strong each preference is — many people sit close to the
        middle on at least one dimension, and that's perfectly normal.
      </p>
    </TestIntro>
  );
}
