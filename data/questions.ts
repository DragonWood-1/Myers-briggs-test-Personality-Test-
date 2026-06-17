// The MBTI assessment. Each question loads onto one of the four dichotomies.
// Answers run on a 5-point agree/disagree scale; "direction" says which pole a
// strong agreement supports.

export type Axis = "EI" | "SN" | "TF" | "JP";

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  // The pole that "Agree" points toward (first letter of the pair).
  direction: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
}

export const QUESTIONS: Question[] = [
  // E / I
  { id: 1, text: "You feel energized after spending time in a large group of people.", axis: "EI", direction: "E" },
  { id: 2, text: "You prefer a quiet evening alone to a lively party.", axis: "EI", direction: "I" },
  { id: 3, text: "You often start conversations with strangers.", axis: "EI", direction: "E" },
  { id: 4, text: "You think things through privately before sharing your opinion.", axis: "EI", direction: "I" },
  { id: 5, text: "You tend to be the one who keeps the conversation going.", axis: "EI", direction: "E" },
  { id: 6, text: "After socializing for a long time, you need time alone to recharge.", axis: "EI", direction: "I" },
  { id: 7, text: "You enjoy being the center of attention.", axis: "EI", direction: "E" },
  { id: 8, text: "You have a small circle of close friends rather than many acquaintances.", axis: "EI", direction: "I" },

  // S / N
  { id: 9, text: "You focus more on concrete facts than on abstract theories.", axis: "SN", direction: "S" },
  { id: 10, text: "You are drawn to new ideas and future possibilities.", axis: "SN", direction: "N" },
  { id: 11, text: "You trust experience and proven methods over hunches.", axis: "SN", direction: "S" },
  { id: 12, text: "You often notice patterns and underlying meanings.", axis: "SN", direction: "N" },
  { id: 13, text: "You prefer practical, hands-on tasks to theoretical ones.", axis: "SN", direction: "S" },
  { id: 14, text: "You frequently imagine how things could be different.", axis: "SN", direction: "N" },
  { id: 15, text: "You pay close attention to details others might miss.", axis: "SN", direction: "S" },
  { id: 16, text: "You enjoy discussing symbolism and big-picture concepts.", axis: "SN", direction: "N" },

  // T / F
  { id: 17, text: "You make decisions based on logic rather than feelings.", axis: "TF", direction: "T" },
  { id: 18, text: "You consider how a decision will affect others' emotions.", axis: "TF", direction: "F" },
  { id: 19, text: "You value being fair and consistent over being compassionate.", axis: "TF", direction: "T" },
  { id: 20, text: "You are deeply moved by others' struggles and want to help.", axis: "TF", direction: "F" },
  { id: 21, text: "You can stay objective even in emotionally charged situations.", axis: "TF", direction: "T" },
  { id: 22, text: "Harmony in your relationships matters more than winning an argument.", axis: "TF", direction: "F" },
  { id: 23, text: "You critique ideas to find flaws and improve them.", axis: "TF", direction: "T" },
  { id: 24, text: "You often put others' needs ahead of your own.", axis: "TF", direction: "F" },

  // J / P
  { id: 25, text: "You like to have a clear plan and stick to it.", axis: "JP", direction: "J" },
  { id: 26, text: "You prefer to keep your options open and stay flexible.", axis: "JP", direction: "P" },
  { id: 27, text: "You feel satisfied when you finish tasks ahead of deadlines.", axis: "JP", direction: "J" },
  { id: 28, text: "You work best in bursts of spontaneous energy.", axis: "JP", direction: "P" },
  { id: 29, text: "You like your environment to be organized and tidy.", axis: "JP", direction: "J" },
  { id: 30, text: "You adapt easily when plans change at the last minute.", axis: "JP", direction: "P" },
  { id: 31, text: "You make to-do lists and enjoy checking items off.", axis: "JP", direction: "J" },
  { id: 32, text: "You often leave decisions until the last possible moment.", axis: "JP", direction: "P" },
];

export const ANSWER_OPTIONS = [
  { value: 2, label: "Strongly agree" },
  { value: 1, label: "Agree" },
  { value: 0, label: "Neutral" },
  { value: -1, label: "Disagree" },
  { value: -2, label: "Strongly disagree" },
];

export interface ScoreResult {
  code: string;
  axes: {
    EI: { letter: "E" | "I"; ePercent: number };
    SN: { letter: "S" | "N"; sPercent: number };
    TF: { letter: "T" | "F"; tPercent: number };
    JP: { letter: "J" | "P"; jPercent: number };
  };
}

// answers: map of questionId -> value (-2..2)
export function scoreAnswers(answers: Record<number, number>): ScoreResult {
  const totals: Record<Axis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const maxima: Record<Axis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const q of QUESTIONS) {
    const v = answers[q.id] ?? 0;
    maxima[q.axis] += 2;
    // Positive value toward the question's "direction" pole.
    const firstPole = q.axis[0]; // E, S, T, J
    const towardFirst = q.direction === firstPole ? v : -v;
    totals[q.axis] += towardFirst;
  }

  const pct = (axis: Axis) => {
    // Convert -max..max to 0..100 for the first pole.
    const m = maxima[axis] || 1;
    return Math.round(((totals[axis] + m) / (2 * m)) * 100);
  };

  const ei = pct("EI");
  const sn = pct("SN");
  const tf = pct("TF");
  const jp = pct("JP");

  const code =
    (ei >= 50 ? "E" : "I") +
    (sn >= 50 ? "S" : "N") +
    (tf >= 50 ? "T" : "F") +
    (jp >= 50 ? "J" : "P");

  return {
    code,
    axes: {
      EI: { letter: ei >= 50 ? "E" : "I", ePercent: ei },
      SN: { letter: sn >= 50 ? "S" : "N", sPercent: sn },
      TF: { letter: tf >= 50 ? "T" : "F", tPercent: tf },
      JP: { letter: jp >= 50 ? "J" : "P", jPercent: jp },
    },
  };
}
