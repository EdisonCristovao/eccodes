import shiki, { type Highlighter } from "shiki";
import CodePreview from "@/components/CodePreview";
import EditorNotice from "@/components/EditorNotice";
import EditorPane from "@/components/editor/EditorPane";
import { ui } from "@/dictionaries/ui";
import { EDITOR_FILES } from "@/lib/editor-files";
import { FILES, resolveContent, type ContentSlug } from "@/lib/files";
import { HTML_LANG, fill, type Locale } from "@/lib/i18n";

// Um highlighter por processo: carregar o tema a cada render custa ~100ms.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= shiki.getHighlighter({ theme: "dracula" });
  return highlighterPromise;
}

/**
 * Cada `span.line` do shiki vira um flex (gutter por ::before); embrulha o
 * conteúdo da linha num span único com `whitespace-pre` para o flex não
 * engolir os espaços entre tokens.
 */
function wrapLines(html: string): string {
  return html.replace(
    /<span class="line">([\s\S]*?)<\/span>(?=\n|<\/code>)/g,
    '<span class="line"><span class="min-w-0 whitespace-pre">$1</span></span>',
  );
}

type CodeFilePageProps = {
  slug: ContentSlug;
  lang: Locale;
};

/**
 * Página de "arquivo" do editor: lê `src/content/<slug>[.<lang>].<ext>` em
 * build/render (rotas estáticas) e colore com o shiki. Sem versão no idioma
 * pedido, mostra o inglês com um aviso (sem número) acima do código.
 */
export default async function CodeFilePage({ slug, lang }: CodeFilePageProps) {
  const file = FILES[slug];
  const editorFile = EDITOR_FILES[slug];
  const dict = ui[lang].file;
  const content = await resolveContent(file, lang);

  if (content.code.trim() === "") {
    return (
      <EditorPane file={editorFile}>
        <EditorNotice
          lines={[dict.couldNotOpen, fill(dict.noContent, { title: file.name })]}
        />
      </EditorPane>
    );
  }

  const highlighter = await getHighlighter();
  const html = wrapLines(highlighter.codeToHtml(content.code, { lang: file.lang }));

  return (
    <EditorPane
      file={editorFile}
      notice={content.fallback ? [dict.englishOnly] : undefined}
    >
      <CodePreview
        html={html}
        lang={content.fallback ? HTML_LANG[content.lang] : undefined}
      />
    </EditorPane>
  );
}
