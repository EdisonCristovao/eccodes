import type { ReactNode } from "react";

type EditorNoticeProps = {
  /** Linhas exibidas como comentários de código, uma por linha numerada. */
  lines: string[];
  /** Ação opcional (ex.: botão de retry), exibida na última linha numerada. */
  children?: ReactNode;
};

/**
 * Mensagem no estilo do editor: gutter numerado + linhas de comentário.
 * Usado pelo estado vazio e pelo error.tsx das páginas de código.
 */
export default function EditorNotice({ lines, children }: EditorNoticeProps) {
  const rows: ReactNode[] = lines.map((line, index) => (
    <span key={`line-${index}`} className="text-muted-foreground">
      {line}
    </span>
  ));
  if (children) rows.push(children);

  return (
    <ol className="px-6 py-4 text-sm leading-relaxed">
      {rows.map((content, index) => (
        <li key={index} className="flex min-h-6 items-center gap-4">
          <span
            aria-hidden="true"
            className="w-8 shrink-0 select-none text-right text-muted-foreground"
          >
            {index + 1}
          </span>
          {content}
        </li>
      ))}
    </ol>
  );
}
