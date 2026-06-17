// Metadata for the additional assessment pages. The MBTI test is the flagship
// interactive quiz; these provide structured, SEO-ready landing pages with real
// explanatory content and a clear description of what each assessment measures.

export interface Assessment {
  slug: string;
  name: string;
  short: string;
  duration: string;
  measures: string;
  overview: string;
  dimensions: { name: string; description: string }[];
  whoFor: string;
}

export const ASSESSMENTS: Assessment[] = [
  {
    slug: "iq-test",
    name: "IQ Test",
    short: "Measure your reasoning and problem-solving ability.",
    duration: "25–35 min",
    measures: "General cognitive ability (g factor)",
    overview:
      "An IQ test estimates general intelligence by sampling reasoning across several domains. Rather than testing what you know, it measures how you think — pattern recognition, logic, spatial reasoning and working memory.",
    dimensions: [
      { name: "Logical Reasoning", description: "Deducing rules and conclusions from premises." },
      { name: "Pattern Recognition", description: "Identifying sequences and relationships in abstract figures." },
      { name: "Numerical Reasoning", description: "Working with quantities, ratios and arithmetic logic." },
      { name: "Spatial Reasoning", description: "Mentally rotating and manipulating shapes." },
      { name: "Verbal Reasoning", description: "Understanding analogies and relationships between words." },
    ],
    whoFor: "Anyone curious about their cognitive strengths, students, and professionals benchmarking analytical ability.",
  },
  {
    slug: "eq-test",
    name: "EQ (Emotional Intelligence) Test",
    short: "Gauge how well you perceive and manage emotions.",
    duration: "10–15 min",
    measures: "Emotional intelligence across self and others",
    overview:
      "Emotional intelligence (EQ) is the ability to recognize, understand and manage your own emotions while reading and responding to the emotions of others. High EQ predicts strong relationships, leadership and resilience.",
    dimensions: [
      { name: "Self-Awareness", description: "Recognizing your own emotions as they happen." },
      { name: "Self-Regulation", description: "Managing impulses and adapting to change." },
      { name: "Motivation", description: "Channeling emotion toward goals." },
      { name: "Empathy", description: "Sensing and understanding others' feelings." },
      { name: "Social Skills", description: "Managing relationships and building rapport." },
    ],
    whoFor: "Leaders, team members, and anyone wanting stronger relationships and self-management.",
  },
  {
    slug: "disc-assessment",
    name: "DISC Assessment",
    short: "Understand your behavioral and communication style.",
    duration: "10 min",
    measures: "Behavioral style across four dimensions",
    overview:
      "DISC maps observable behavior onto four styles. It's widely used in the workplace to improve teamwork, communication and leadership by clarifying how people prefer to act and interact.",
    dimensions: [
      { name: "Dominance", description: "Direct, results-driven, decisive." },
      { name: "Influence", description: "Outgoing, enthusiastic, persuasive." },
      { name: "Steadiness", description: "Patient, supportive, dependable." },
      { name: "Conscientiousness", description: "Analytical, precise, systematic." },
    ],
    whoFor: "Teams, managers and professionals improving workplace communication.",
  },
  {
    slug: "enneagram-test",
    name: "Enneagram Test",
    short: "Discover your core motivation among nine types.",
    duration: "15 min",
    measures: "Core motivations, fears and desires",
    overview:
      "The Enneagram describes nine interconnected personality types, each driven by a core motivation, fear and desire. It's valued for its depth in personal growth and understanding what really drives behavior.",
    dimensions: [
      { name: "Type 1 — The Reformer", description: "Principled, purposeful, self-controlled." },
      { name: "Type 2 — The Helper", description: "Caring, generous, people-pleasing." },
      { name: "Type 3 — The Achiever", description: "Adaptable, driven, image-conscious." },
      { name: "Type 4 — The Individualist", description: "Expressive, sensitive, self-aware." },
      { name: "Type 5 — The Investigator", description: "Perceptive, innovative, private." },
      { name: "Type 6 — The Loyalist", description: "Committed, security-oriented, vigilant." },
      { name: "Type 7 — The Enthusiast", description: "Spontaneous, versatile, optimistic." },
      { name: "Type 8 — The Challenger", description: "Powerful, decisive, self-confident." },
      { name: "Type 9 — The Peacemaker", description: "Receptive, reassuring, agreeable." },
    ],
    whoFor: "Anyone seeking deeper self-understanding and personal growth.",
  },
  {
    slug: "big-five-personality-test",
    name: "Big Five Personality Test",
    short: "The most scientifically validated model of personality.",
    duration: "10–15 min",
    measures: "Five broad personality traits (OCEAN)",
    overview:
      "The Big Five (OCEAN) is the gold standard in academic personality psychology. Instead of types, it places you on five continuous dimensions, each strongly predictive of real-world outcomes.",
    dimensions: [
      { name: "Openness", description: "Curiosity, imagination and openness to experience." },
      { name: "Conscientiousness", description: "Organization, discipline and dependability." },
      { name: "Extraversion", description: "Sociability, energy and assertiveness." },
      { name: "Agreeableness", description: "Compassion, cooperation and trust." },
      { name: "Neuroticism", description: "Emotional sensitivity and stress response." },
    ],
    whoFor: "Anyone wanting a research-backed, nuanced view of their personality.",
  },
  {
    slug: "love-languages-test",
    name: "Love Languages Test",
    short: "Learn how you give and receive love.",
    duration: "8 min",
    measures: "Preferred ways of expressing and receiving affection",
    overview:
      "The five love languages describe how people prefer to give and receive love. Knowing yours — and your partner's — helps relationships flourish by ensuring affection is expressed in a way that truly lands.",
    dimensions: [
      { name: "Words of Affirmation", description: "Verbal expressions of appreciation and love." },
      { name: "Acts of Service", description: "Doing helpful things for your partner." },
      { name: "Receiving Gifts", description: "Thoughtful, meaningful tokens of love." },
      { name: "Quality Time", description: "Undivided, focused attention together." },
      { name: "Physical Touch", description: "Affection through closeness and touch." },
    ],
    whoFor: "Couples, partners and anyone wanting stronger relationships.",
  },
  {
    slug: "leadership-style-assessment",
    name: "Leadership Style Assessment",
    short: "Identify how you naturally lead and influence.",
    duration: "12 min",
    measures: "Dominant leadership approach",
    overview:
      "This assessment identifies your natural leadership style, helping you lead more effectively, adapt to your team and recognize when a different approach is needed.",
    dimensions: [
      { name: "Visionary", description: "Inspires with a compelling future direction." },
      { name: "Coaching", description: "Develops people and unlocks potential." },
      { name: "Democratic", description: "Builds consensus through participation." },
      { name: "Pacesetting", description: "Sets high standards and leads by example." },
      { name: "Commanding", description: "Provides clear direction in a crisis." },
      { name: "Affiliative", description: "Creates harmony and emotional bonds." },
    ],
    whoFor: "Managers, aspiring leaders and team leads.",
  },
  {
    slug: "entrepreneur-aptitude-test",
    name: "Entrepreneur Aptitude Test",
    short: "See how well-suited you are to starting a business.",
    duration: "10 min",
    measures: "Entrepreneurial traits and readiness",
    overview:
      "Entrepreneurship rewards a specific blend of traits — risk tolerance, resilience, vision and drive. This assessment gauges how naturally those traits come to you and where to build strength.",
    dimensions: [
      { name: "Risk Tolerance", description: "Comfort with uncertainty and bold bets." },
      { name: "Resilience", description: "Bouncing back from setbacks and failure." },
      { name: "Vision", description: "Spotting opportunities others miss." },
      { name: "Drive", description: "Self-motivation and relentless execution." },
      { name: "Adaptability", description: "Pivoting quickly as conditions change." },
    ],
    whoFor: "Aspiring founders, side-hustlers and innovators.",
  },
  {
    slug: "learning-style-test",
    name: "Learning Style Test",
    short: "Discover how you absorb information best.",
    duration: "8 min",
    measures: "Preferred learning modality",
    overview:
      "People absorb information differently. Identifying your preferred learning style helps you study smarter, retain more and choose strategies that play to your strengths.",
    dimensions: [
      { name: "Visual", description: "Learns through images, diagrams and spatial layout." },
      { name: "Auditory", description: "Learns through listening and discussion." },
      { name: "Reading/Writing", description: "Learns through text, notes and lists." },
      { name: "Kinesthetic", description: "Learns through hands-on practice and movement." },
    ],
    whoFor: "Students, lifelong learners and educators.",
  },
  {
    slug: "work-style-assessment",
    name: "Work Style Assessment",
    short: "Understand how you work best and thrive at work.",
    duration: "10 min",
    measures: "Workplace preferences and strengths",
    overview:
      "Your work style shapes how you collaborate, focus and deliver. This assessment clarifies the conditions where you do your best work so you can shape your role and environment around them.",
    dimensions: [
      { name: "Independent vs Collaborative", description: "Whether you thrive solo or in teams." },
      { name: "Structured vs Flexible", description: "Your need for routine versus autonomy." },
      { name: "Detail vs Big-Picture", description: "Where your attention naturally goes." },
      { name: "Steady vs Fast-Paced", description: "Your preferred pace and intensity." },
    ],
    whoFor: "Professionals, job seekers and teams optimizing how they work.",
  },
];

export function getAssessment(slug: string): Assessment | undefined {
  return ASSESSMENTS.find((a) => a.slug === slug);
}
