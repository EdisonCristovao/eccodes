"use client";

import { useParams, usePathname } from "next/navigation";
import EditorNotice from "@/components/EditorNotice";
import EditorPane from "@/components/editor/EditorPane";
import { Button } from "@/components/ui/button";
import { ui } from "@/dictionaries/ui";
import { EDITOR_FILES, fileForPath } from "@/lib/editor-files";
import { DEFAULT_LOCALE, fill, hasLocale, stripLocale } from "@/lib/i18n";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Erro ao abrir um arquivo (guia §5.6): linhas de comentário + retry dentro
 * do pane, no idioma da rota. A mensagem real fica nos logs do servidor; só
 * o digest aparece aqui.
 */
export default function EditorError({ error, reset }: ErrorProps) {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const pathname = usePathname();
  const file = fileForPath(stripLocale(pathname)) ?? EDITOR_FILES.about;
  const dict = ui[lang].file;
  const lines = [dict.couldNotOpen, dict.couldNotLoad];
  if (error.digest) lines.push(fill(dict.ref, { digest: error.digest }));

  return (
    <EditorPane file={file}>
      <div role="alert">
        <EditorNotice lines={lines}>
          <Button
            variant="link"
            size="sm"
            onClick={reset}
            className="h-auto px-0 text-editor"
          >
            {dict.tryAgain}
          </Button>
        </EditorNotice>
      </div>
    </EditorPane>
  );
}
