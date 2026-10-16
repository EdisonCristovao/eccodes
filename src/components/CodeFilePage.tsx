import shiki, { type Highlighter } from "shiki";
import CodePreview from "@/components/CodePreview";
import EditorNotice from "@/components/EditorNotice";
import { ui } from "@/dictionaries/ui";
import { FILES, resolveContent, type FileSlug } from "@/lib/files";
import { HTML_LANG, fill, type Locale } from "@/lib/i18n";

// Um highlighter por processo: carregar o tema a cada render custa ~100ms.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= shiki.getHighlighter({ theme: "dracula" });
  return highlighterPromise;
}

type CodeFilePageProps = {
  slug: FileSlug;
  lang: Locale;
};

/**
 * Página de "arquivo" do editor: lê `src/content/<slug>[.<lang>].<ext>` em
 * build/render (rotas estáticas) e colore com o shiki. Sem versão no idioma
 * pedido, mostra o inglês com um aviso de uma linha acima do código.
 */
export default async function CodeFilePage({ slug, lang }: CodeFilePageProps) {
  const file = FILES[slug];
  const dict = ui[lang].file;
  const content = await resolveContent(file, lang);

  if (content.code.trim() === "") {
    return (
      <EditorNotice
        lines={[dict.couldNotOpen, fill(dict.noContent, { title: file.title })]}
      />
    );
  }

  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(content.code, { lang: file.lang });

  return (
    <>
      {content.fallback && <EditorNotice lines={[dict.englishOnly]} />}
      <div lang={content.fallback ? HTML_LANG[content.lang] : undefined}>
        <CodePreview code={html} />
      </div>
    </>
  );
}
