"use client";

import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { HighlightedCode } from "@/components/HighlightedCode";
import type { QuizQuestion } from "@/data/chapter2";

type Props = {
  position: number;
  item: QuizQuestion;
  selected: number | null;
  locked: boolean;
  onSelect: (choice: number) => void;
};

export function QuizQuestionCard({ position, item, selected, locked, onSelect }: Props) {
  return (
    <article className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Question {position + 1}</p>
      <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight text-slate-100">{item.question}</h3>
      <div className="mt-3 overflow-hidden rounded-md border border-white/10">
        <HighlightedCode code={item.code} language="rust" />
      </div>
      <div className="mt-4 space-y-2">
        {item.choices.map((choice, choiceIndex) => {
          const isSelected = selected === choiceIndex;
          const isAnswer = choiceIndex === item.answer;
          const showAnswer = locked && isAnswer;
          const showError = locked && isSelected && !isAnswer;
          return (
            <button
              key={choiceIndex}
              type="button"
              disabled={locked}
              onClick={() => onSelect(choiceIndex)}
              className={
                showAnswer
                  ? "flex w-full items-start gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/[0.07] px-3 py-2.5 text-left text-sm text-slate-200"
                  : showError
                    ? "flex w-full items-start gap-2.5 rounded-md border border-red-500/30 bg-red-500/[0.07] px-3 py-2.5 text-left text-sm text-slate-200"
                    : isSelected
                      ? "flex w-full items-start gap-2.5 rounded-md border border-orange-600/50 bg-orange-500/[0.07] px-3 py-2.5 text-left text-sm text-slate-200"
                      : "flex w-full items-start gap-2.5 rounded-md border border-white/10 px-3 py-2.5 text-left text-sm text-slate-400 hover:border-white/20 hover:text-slate-200"
              }
            >
              {showAnswer ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" /> : null}
              {showError ? <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" /> : null}
              {!locked ? <Circle size={16} className="mt-0.5 shrink-0 text-slate-600" /> : null}
              {locked && !isAnswer && !isSelected ? <Circle size={16} className="mt-0.5 shrink-0 text-slate-700" /> : null}
              {choice}
            </button>
          );
        })}
      </div>
      {locked ? <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{item.explanation}</p> : null}
    </article>
  );
}
