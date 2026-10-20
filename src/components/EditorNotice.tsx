import type { ReactNode } from "react";
import CodeLine from "@/components/editor/CodeLine";

type EditorNoticeProps = {
  /** Linhas exibidas como comentários de código ("// …"). */
  lines: string[];
  /** Linha extra opcional (ex.: botão de retry ou link). */
  children?: ReactNode;
  /** false: alinhadas ao gutter sem número (avisos); true (default): contam como linhas do arquivo. */
  numbered?: boolean;
};

/**
 * Açúcar sobre `CodeLine kind="comment"` — sem lista ou gutter próprio: o
 * número vem do `.editor-body` do EditorPane que envolve o aviso. Com word
 * wrap: um aviso longo quebra em 375px em vez de rolar de lado.
 */
export default function EditorNotice({
  lines,
  children,
  numbered = true,
}: EditorNoticeProps) {
  return (
    <>
      {lines.map((line, index) => (
        <CodeLine key={`line-${index}`} kind="comment" numbered={numbered} wrap>
          {line}
        </CodeLine>
      ))}
      {children && (
        <CodeLine numbered={numbered} wrap className="items-center">
          {children}
        </CodeLine>
      )}
    </>
  );
}
