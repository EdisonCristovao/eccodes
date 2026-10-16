"use client";

import { useParams } from "next/navigation";
import EditorNotice from "@/components/EditorNotice";
import { Button } from "@/components/ui/button";
import { ui } from "@/dictionaries/ui";
import { DEFAULT_LOCALE, fill, hasLocale } from "@/lib/i18n";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Erro ao abrir um arquivo (guia §5.6): três linhas de comentário + retry,
 * no idioma da rota. A mensagem real fica nos logs do servidor; só o digest
 * aparece aqui.
 */
export default function EditorError({ error, reset }: ErrorProps) {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = ui[lang].file;
  const lines = [dict.couldNotOpen, dict.couldNotLoad];
  if (error.digest) lines.push(fill(dict.ref, { digest: error.digest }));

  return (
    <div role="alert" className="flex min-w-0 grow flex-col">
      <EditorNotice lines={lines}>
        <Button
          variant="link"
          size="sm"
          onClick={reset}
          className="h-auto px-0 text-sm"
        >
          {dict.tryAgain}
        </Button>
      </EditorNotice>
    </div>
  );
}
