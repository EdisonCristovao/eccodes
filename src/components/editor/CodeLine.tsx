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
  className?: string;
  children?: ReactNode;
};

const INDENT: Record<NonNullable<CodeLineProps["indent"]>, string> = {
  0: "",
  1: "pl-6",
  2: "pl-12",
  3: "pl-18",
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
            : "whitespace-pre",
          INDENT[indent],
        )}
      >
        {children}
      </span>
    </div>
  );
}
