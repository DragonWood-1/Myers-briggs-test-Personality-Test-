"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, ANSWER_OPTIONS, scoreAnswers, ScoreResult } from "@/data/questions";
import { getType } from "@/data/types";

const PAGE_SIZE = 4;

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [page, setPage] = useState(0);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const totalPages = Math.ceil(QUESTIONS.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const pageQuestions = QUESTIONS.slice(start, start + PAGE_SIZE);
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined);

  function select(id: number, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function next() {
    if (page < totalPages - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const r = scoreAnswers(answers);
      setResult(r);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function restart() {
    setAnswers({});
    setPage(0);
    setResult(null);
  }

  if (result) return <Result result={result} onRestart={restart} />;

  return (
    <div className="quiz-card card">
      <div className="progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="small muted">
        Question set {page + 1} of {totalPages} · {answeredCount}/{QUESTIONS.length} answered
      </p>

      {pageQuestions.map((q) => (
        <fieldset key={q.id} style={{ border: 0, padding: 0, margin: "22px 0 6px" }}>
          <legend style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 6 }}>
            {q.text}
          </legend>
          <div className="q-options" role="radiogroup" aria-label={q.text}>
            {ANSWER_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                role="radio"
                aria-checked={answers[q.id] === opt.value}
                className={`q-option ${answers[q.id] === opt.value ? "selected" : ""}`}
                onClick={() => select(q.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="quiz-nav">
        <button
          className="btn secondary"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{ opacity: page === 0 ? 0.5 : 1 }}
        >
          ← Back
        </button>
        <button className="btn" onClick={next} disabled={!pageComplete} style={{ opacity: pageComplete ? 1 : 0.5 }}>
          {page < totalPages - 1 ? "Next →" : "See my result"}
        </button>
      </div>
    </div>
  );
}

function Result({ result, onRestart }: { result: ScoreResult; onRestart: () => void }) {
  const type = useMemo(() => getType(result.code), [result.code]);
  const a = result.axes;

  const rows = [
    { left: "E", right: "I", leftPct: a.EI.ePercent, leftLabel: "Extraversion", rightLabel: "Introversion" },
    { left: "S", right: "N", leftPct: a.SN.sPercent, leftLabel: "Sensing", rightLabel: "Intuition" },
    { left: "T", right: "F", leftPct: a.TF.tPercent, leftLabel: "Thinking", rightLabel: "Feeling" },
    { left: "J", right: "P", leftPct: a.JP.jPercent, leftLabel: "Judging", rightLabel: "Perceiving" },
  ];

  return (
    <div className="quiz-card card">
      <p className="small muted">Your personality type</p>
      <h1 style={{ marginTop: 4 }}>
        <span className="type-pill">{result.code}</span>
        {type ? ` · ${type.nickname}` : ""}
      </h1>
      {type && <p className="lead muted">{type.tagline}</p>}

      <div style={{ margin: "22px 0" }}>
        {rows.map((r) => (
          <div key={r.left}>
            <div className="meter-row">
              <span className="lbl">{r.left} {r.leftPct}%</span>
              <span className="meter"><span style={{ width: `${r.leftPct}%` }} /></span>
              <span className="lbl" style={{ textAlign: "right" }}>{100 - r.leftPct}% {r.right}</span>
            </div>
            <p className="small muted" style={{ margin: "0 0 10px" }}>
              {r.leftLabel} vs {r.rightLabel}
            </p>
          </div>
        ))}
      </div>

      {type && <p className="prose">{type.overview}</p>}

      <div className="hero-cta" style={{ justifyContent: "flex-start", marginTop: 18 }}>
        {type && (
          <Link className="btn" href={`/${result.code.toLowerCase()}-personality`}>
            Read the full {result.code} profile →
          </Link>
        )}
        <button className="btn secondary" onClick={onRestart}>Retake the test</button>
      </div>

      <p className="small muted" style={{ marginTop: 16 }}>
        This is a free, self-report indicator for personal insight, not a clinical diagnosis. Your
        answers are processed in your browser and are never sent to a server.
      </p>
    </div>
  );
}
