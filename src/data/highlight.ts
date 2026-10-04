export type CodeLanguage = "cpp" | "rust" | "compiler";

export type TokenTone =
  | "plain"
  | "keyword"
  | "string"
  | "number"
  | "type"
  | "macro"
  | "function"
  | "comment"
  | "error"
  | "path"
  | "hint"
  | "pipe";

export type CodeToken = {
  text: string;
  tone: TokenTone;
};

const RUST_KEYWORDS = new Set([
  "let",
  "mut",
  "fn",
  "struct",
  "enum",
  "impl",
  "trait",
  "pub",
  "use",
  "mod",
  "crate",
  "if",
  "else",
  "match",
  "for",
  "while",
  "loop",
  "in",
  "return",
  "break",
  "continue",
  "where",
  "type",
  "const",
  "static",
  "ref",
  "move",
  "async",
  "await",
  "dyn",
  "as",
  "true",
  "false",
  "self",
  "Self",
]);

const RUST_TYPES = new Set([
  "Vec",
  "vec",
  "String",
  "str",
  "i32",
  "u32",
  "usize",
  "bool",
  "Option",
  "Result",
  "Box",
]);

const CPP_KEYWORDS = new Set([
  "auto",
  "int",
  "return",
  "const",
  "void",
  "namespace",
  "using",
  "template",
  "typename",
  "class",
  "struct",
  "public",
  "private",
  "true",
  "false",
]);

const CPP_TYPES = new Set(["vector", "string", "cout", "endl", "std"]);

const WORD_PATTERN = /([A-Za-z_][A-Za-z0-9_]*!|\b\d[\d_]*(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*(?:::[A-Za-z_][A-Za-z0-9_]*)*)/g;
const STRING_PATTERN = /("[^"\n]*")/g;

function findCommentStart(line: string): number {
  return line.indexOf("//");
}

function classifyWord(word: string, language: CodeLanguage, nextIsParen: boolean): TokenTone {
  if (/^\d/.test(word)) return "number";
  if (word.endsWith("!")) return "macro";
  if (word.includes("::")) return "type";
  if (language === "rust") {
    if (RUST_KEYWORDS.has(word)) return "keyword";
    if (RUST_TYPES.has(word)) return "type";
  } else {
    if (CPP_KEYWORDS.has(word)) return "keyword";
    if (CPP_TYPES.has(word)) return "type";
  }
  if (nextIsParen) return "function";
  return "plain";
}

function tokenizeCodeChunk(chunk: string, language: CodeLanguage, out: CodeToken[]): void {
  if (chunk === "") return;
  const parts = chunk.split(STRING_PATTERN);
  for (const part of parts) {
    if (part === "") continue;
    if (part.startsWith('"') && part.endsWith('"') && part.length >= 2) {
      out.push({ text: part, tone: "string" });
      continue;
    }
    let lastIndex = 0;
    WORD_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = WORD_PATTERN.exec(part)) !== null) {
      const index = match.index;
      if (index > lastIndex) {
        out.push({ text: part.slice(lastIndex, index), tone: "plain" });
      }
      const word = match[0];
      const after = part.slice(index + word.length);
      const nextIsParen = after.startsWith("(");
      out.push({ text: word, tone: classifyWord(word, language, nextIsParen) });
      lastIndex = index + word.length;
    }
    if (lastIndex < part.length) {
      out.push({ text: part.slice(lastIndex), tone: "plain" });
    }
  }
}

function tokenizeCompilerLine(line: string): CodeToken[] {
  const errorMatch = /^(error(?:\[[^\]]+\])?)(.*)$/.exec(line);
  if (errorMatch) {
    return [
      { text: errorMatch[1], tone: "error" },
      { text: errorMatch[2], tone: "plain" },
    ];
  }
  const arrowIndex = line.indexOf("-->");
  if (arrowIndex >= 0) {
    return [
      { text: line.slice(0, arrowIndex), tone: "plain" },
      { text: "-->", tone: "pipe" },
      { text: line.slice(arrowIndex + 3), tone: "path" },
    ];
  }
  if (line.trimStart().startsWith("=")) {
    return [{ text: line, tone: "hint" }];
  }
  const pipeIndex = line.indexOf("|");
  if (pipeIndex >= 0) {
    const left = line.slice(0, pipeIndex + 1);
    const right = line.slice(pipeIndex + 1);
    const tokens: CodeToken[] = [{ text: left, tone: "pipe" }];
    tokenizeCodeChunk(right, "rust", tokens);
    return tokens;
  }
  return [{ text: line, tone: "plain" }];
}

export function tokenizeLine(line: string, language: CodeLanguage): CodeToken[] {
  if (language === "compiler") return tokenizeCompilerLine(line);
  if (line.trim() === "") return [{ text: " ", tone: "plain" }];
  const commentIndex = findCommentStart(line);
  const tokens: CodeToken[] = [];
  if (commentIndex < 0) {
    tokenizeCodeChunk(line, language, tokens);
    return tokens;
  }
  tokenizeCodeChunk(line.slice(0, commentIndex), language, tokens);
  tokens.push({ text: line.slice(commentIndex), tone: "comment" });
  return tokens;
}
