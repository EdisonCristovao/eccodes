import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import CodeLine from "@/components/editor/CodeLine";
import PaneBody from "@/components/editor/PaneBody";
import { ui } from "@/dictionaries/ui";
import type { EditorFile } from "@/lib/editor-files";
import { cn } from "@/lib/utils";

export type EditorPaneProps = {
  /** Nome para o breadcrumb e aria-label. */
  file: Pick<EditorFile, "name"> & Partial<EditorFile>;
  /** default "lines". */
  gutter?: "lines" | "none";
  /** default true: "src › bio.js". */
  breadcrumb?: boolean;
  /** Linhas "// …" ANTES do children, alinhadas ao gutter e SEM número. */
  notice?: string[];
  /** <CodeLine>s, <CodePreview> (shiki) ou conteúdo livre. */
  children: ReactNode;
  className?: string;
  /** Classes extras do corpo (ex.: centralizar a home). */
  bodyClassName?: string;
};

/**
 * Janela de "arquivo aberto" (guia §5.4): breadcrumb + corpo com gutter por
 * contador CSS (`.editor-body`, globals.css). Só o corpo rola. Client-safe
 * (usado também por loading/error/not-found).
 */
export default function EditorPane({
  file,
  gutter = "lines",
  breadcrumb = true,
  notice,
  children,
  className,
  bodyClassName,
}: EditorPaneProps) {
  // "src" é igual nos dois idiomas; evita precisar do idioma aqui.
  const root = ui.en.pane.breadcrumbRoot;

  return (
    <section
      aria-label={file.name}
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      {breadcrumb && (
        <div className="flex h-7 shrink-0 items-center gap-1 border-b border-border px-4 text-xs text-muted-foreground">
          <span>{root}</span>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-foreground">{file.name}</span>
        </div>
      )}
      <PaneBody
        gutter={gutter}
        className={cn(gutter === "none" && "px-6", bodyClassName)}
      >
        {notice?.map((line, index) => (
          <CodeLine key={`notice-${index}`} kind="comment" numbered={false}>
            {line}
          </CodeLine>
        ))}
        {children}
      </PaneBody>
    </section>
  );
}
