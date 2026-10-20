"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useEditorStatus } from "@/hooks/useEditorStatus";
import { cn } from "@/lib/utils";

type PaneBodyProps = {
  gutter: "lines" | "none";
  className?: string;
  children: ReactNode;
};

/**
 * Corpo do EditorPane (único elemento que rola) e `@container` da escala do
 * conteúdo (`text-pane`). Wrapper client fino: ao
 * passar o ponteiro por uma `.line` numerada, atualiza o cursor (Ln/Col)
 * da status bar.
 */
export default function PaneBody({ gutter, className, children }: PaneBodyProps) {
  const { setCursor } = useEditorStatus();
  const lastLine = useRef<number | null>(null);

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    if (gutter === "none") return;
    const line = (event.target as HTMLElement).closest<HTMLElement>(".line");
    if (!line || line.hasAttribute("data-unnumbered")) return;
    const lines = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(".line:not([data-unnumbered])"),
    );
    const number = lines.indexOf(line) + 1;
    if (number > 0 && number !== lastLine.current) {
      lastLine.current = number;
      setCursor({ line: number, col: 1 });
    }
  };

  return (
    <div
      data-gutter={gutter}
      className={cn("editor-body @container min-h-0 flex-1 overflow-auto py-2 text-editor", className)}
      onMouseOver={handleMouseOver}
    >
      {/* O @container tem contenção de estilo: o contador `line` não atravessa
          a borda dele, nem a partir do próprio .editor-body. O reset fica aqui
          dentro (.editor-lines); flex-col + min-h-full deixam um filho ocupar
          a altura toda (a coluna de preview da home). */}
      <div className="editor-lines flex min-h-full flex-col">{children}</div>
    </div>
  );
}
