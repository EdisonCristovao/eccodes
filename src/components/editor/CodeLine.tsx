import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CodeLineProps = {
  /** comment: cor de comentário · code: monoespaçado com espaços preservados · prose: texto corrido (max 72ch). */
  kind?: "comment" | "code" | "prose";
  indent?: 0 | 1 | 2 | 3;
  /** Linha atual (número em laranja). */
  current?: boolean;
  /** false: alinhada ao gutter, sem número e sem contar (avisos). */
  numbered?: boolean;
  /** Word wrap (só a home): quebra linhas longas com recuo pendente de 2ch; a continuação não ganha número. */
  wrap?: boolean;
  className?: string;
  children?: ReactNode;
};

const INDENT: Record<NonNullable<CodeLineProps["indent"]>, string> = {
  0: "",
  1: "pl-6",
  2: "pl-12",
  3: "pl-18",
};

// Com wrap o recuo é em ch e pendente: a 1ª linha fica no indent, a
// continuação 2ch mais para dentro.
const WRAP_INDENT: Record<NonNullable<CodeLineProps["indent"]>, string> = {
  0: "pl-[2ch] -indent-[2ch]",
  1: "pl-[4ch] -indent-[2ch]",
  2: "pl-[6ch] -indent-[2ch]",
  3: "pl-[8ch] -indent-[2ch]",
};

/**
 * Uma linha do EditorPane: `.line` recebe o número pelo contador CSS do
 * `.editor-body` (globals.css). O conteúdo fica num span único para o flex
 * não engolir os espaços.
 */
export default function CodeLine({
  kind = "code",
  indent = 0,
  current = false,
  numbered = true,
  wrap = false,
  className,
  children,
}: CodeLineProps) {
  return (
    <div
      className={cn("line", kind === "comment" && "text-syntax-comment", className)}
      data-unnumbered={numbered ? undefined : ""}
      data-current={current ? "" : undefined}
    >
      <span
        className={cn(
          "min-w-0",
          kind === "prose"
            ? "max-w-[72ch] whitespace-normal"
            : wrap
              ? "whitespace-pre-wrap [overflow-wrap:anywhere]"
              : "whitespace-pre",
          wrap ? WRAP_INDENT[indent] : INDENT[indent],
        )}
      >
        {children}
      </span>
    </div>
  );
}
