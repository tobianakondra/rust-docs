"use client";

import { useState } from "react";
import { QuizQuestionCard } from "@/components/QuizQuestionCard";
import { QUIZ } from "@/data/chapter2";
import type { QuizQuestion } from "@/data/chapter2";

type Props = {
  items?: QuizQuestion[];
  title?: string;
  description?: string;
  successHint?: string;
};

export function QuizSection({
  items = QUIZ,
  title = "Auto-évaluation : le move et la portée",
  description = "Trois questions pour valider l’essentiel avant le chapitre sur l’emprunt. Sélectionnez une réponse par question, puis révélez le corrigé.",
  successHint = "Maîtrisé — cap sur l’emprunt.",
}: Props) {
  const [answers, setAnswers] = useState<Array<number | null>>(() => items.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const answered = answers.filter((entry) => entry !== null).length;
  const score = items.filter((item, index) => answers[index] === item.answer).length;

  function handleSelect(question: number, choice: number): void {
    setAnswers((current) => current.map((entry, index) => (index === question ? choice : entry)));
  }

  function handleReset(): void {
    setAnswers(items.map(() => null));
    setSubmitted(false);
  }

  return (
    <section id="quiz" aria-label="Auto-évaluation" className="scroll-mt-20">
      <div className="border-b border-white/[0.06] pb-6">
        <p className="font-mono text-xs tracking-widest text-slate-500">
          06 <span className="mx-1.5 text-slate-700">/</span>
          <span className="uppercase">Vérification</span>
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{title}</h2>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <QuizQuestionCard
            key={index}
            position={index}
            item={item}
            selected={answers[index] ?? null}
            locked={submitted}
            onSelect={(choice) => handleSelect(index, choice)}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3">
        {submitted ? (
          <p className="text-sm text-slate-200">
            Score : <span className="font-mono font-semibold text-orange-400">{score}/{items.length}</span>
            <span className="ml-2 text-slate-500">
              {score === items.length ? successHint : "Relisez les explications ci-dessus."}
            </span>
          </p>
        ) : (
          <p className="font-mono text-xs text-slate-500">{answered}/{items.length} questions répondues</p>
        )}
        <span className="ml-auto flex gap-2">
          {submitted ? (
            <button
              type="button"
              onClick={() => handleReset()}
              className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5"
            >
              Recommencer
            </button>
          ) : (
            <button
              type="button"
              disabled={answered < items.length}
              onClick={() => setSubmitted(true)}
              className="rounded-md border border-orange-600/50 bg-orange-600/15 px-3 py-1.5 text-xs font-medium text-orange-200 hover:bg-orange-600/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Vérifier mes réponses
            </button>
          )}
        </span>
      </div>
    </section>
  );
}
