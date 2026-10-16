"use client";

import { useParams, usePathname } from "next/navigation";
import EditorPane from "@/components/editor/EditorPane";
import FileSkeleton from "@/components/editor/FileSkeleton";
import { ui } from "@/dictionaries/ui";
import { OpeningSignal } from "@/hooks/useEditorStatus";
import { EDITOR_FILES, fileForPath } from "@/lib/editor-files";
import { DEFAULT_LOCALE, hasLocale, stripLocale } from "@/lib/i18n";

/**
 * Skeleton dos arquivos de /editor/* dentro do pane (guia §5.6) e sinal de
 * "abrindo" para a aba e a status bar. Client component: lê idioma e rota.
 */
export default function Loading() {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const pathname = usePathname();
  const file = fileForPath(stripLocale(pathname)) ?? EDITOR_FILES.about;

  return (
    <EditorPane file={file}>
      <OpeningSignal slug={file.slug} />
      <FileSkeleton label={ui[lang].file.opening} />
    </EditorPane>
  );
}
