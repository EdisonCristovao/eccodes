"use client";

import { useParams, usePathname } from "next/navigation";
import EditorPane from "@/components/editor/EditorPane";
import FileSkeleton from "@/components/editor/FileSkeleton";
import { ui } from "@/dictionaries/ui";
import { OpeningSignal } from "@/hooks/useEditorStatus";
import { EDITOR_FILES, fileForPath } from "@/lib/editor-files";
import { DEFAULT_LOCALE, hasLocale, stripLocale } from "@/lib/i18n";

/**
 * Skeleton de /projects dentro do pane (mesmo do segmento editor). Fica no
 * segmento projects, e não em [lang]/: um loading.tsx em [lang] envolveria o
 * catch-all [...rest], e um notFound() disparado dentro de um boundary de
 * loading chega depois do shell já ter saído — o 404 viraria status 200.
 * A home (página raiz do segmento) fica sem skeleton pelo mesmo motivo.
 */
export default function Loading() {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const pathname = usePathname();
  const file = fileForPath(stripLocale(pathname)) ?? EDITOR_FILES.projects;

  return (
    <EditorPane file={file}>
      <OpeningSignal slug={file.slug} />
      <FileSkeleton label={ui[lang].file.opening} />
    </EditorPane>
  );
}
