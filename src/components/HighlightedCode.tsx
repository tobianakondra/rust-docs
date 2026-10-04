import { tokenizeLine } from "@/data/highlight";
import type { CodeLanguage, TokenTone } from "@/data/highlight";

type Props = {
  code: string;
  language: CodeLanguage;
};

const TONE_CLASS: Record<TokenTone, string> = {
  plain: "text-slate-300",
  keyword: "text-violet-300",
  string: "text-emerald-300",
  number: "text-amber-300",
  type: "text-sky-300",
  macro: "text-orange-300",
  function: "text-blue-300",
  comment: "text-slate-500 italic",
  error: "text-red-300 font-semibold",
  path: "text-sky-300",
  hint: "text-emerald-300/90",
  pipe: "text-slate-600",
};

export function HighlightedCode({ code, language }: Props) {
  const lines = code.split("\n");
  return (
    <div className="mockup-code rust-code-scroll overflow-x-auto border-0 !bg-[#0d1117] py-3 text-[12.5px] leading-relaxed">
      {lines.map((line, index) => {
        const tokens = tokenizeLine(line, language);
        return (
          <pre key={`${index}-${line.length}`} data-prefix={index + 1} className="!bg-transparent !text-slate-300">
            <code>
              {tokens.map((token, position) => (
                <span key={position} className={TONE_CLASS[token.tone]}>
                  {token.text}
                </span>
              ))}
            </code>
          </pre>
        );
      })}
    </div>
  );
}
