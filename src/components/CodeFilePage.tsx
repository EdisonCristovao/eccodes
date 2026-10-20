import CodePreview from "@/components/CodePreview";
import EditorNotice from "@/components/EditorNotice";
import CodeLine from "@/components/editor/CodeLine";
import EditorPane from "@/components/editor/EditorPane";
import { pages } from "@/dictionaries/pages";
import { ui } from "@/dictionaries/ui";
import { EDITOR_FILES } from "@/lib/editor-files";
import { FILES, resolveContent, type ContentSlug } from "@/lib/files";
import { highlight } from "@/lib/highlighter";
import { HTML_LANG, fill, type Locale } from "@/lib/i18n";

type CodeFilePageProps = {
  slug: ContentSlug;
  lang: Locale;
};

/**
 * Página de "arquivo" do editor: lê `src/content/<slug>[.<lang>].<ext>` em
 * build/render (rotas estáticas) e colore com o shiki. Sem versão no idioma
 * pedido, mostra o inglês com um aviso (sem número) acima do código. Os `#`
 * do markdown não são headings no DOM: o título de SEO entra como h1 sr-only.
 */
export default async function CodeFilePage({ slug, lang }: CodeFilePageProps) {
  const file = FILES[slug];
  const editorFile = EDITOR_FILES[slug];
  const dict = ui[lang].file;
  const content = await resolveContent(file, lang);
  // O About é a rota /editor: o SEO dele fica em `seo.pages.editor`.
  const seo = pages[lang].seo.pages[slug === "about" ? "editor" : slug];
  const heading = <h1 className="sr-only">{seo.title}</h1>;

  if (content.code.trim() === "") {
    return (
      <EditorPane file={editorFile}>
        {heading}
        <EditorNotice
          lines={[dict.couldNotOpen, fill(dict.noContent, { title: file.name })]}
        />
      </EditorPane>
    );
  }

  const html = await highlight(content.code, file.lang, {
    newTab: dict.newTab,
  });

  return (
    <EditorPane file={editorFile}>
      {heading}
      {/* Aviso próprio (não o `notice` do pane) para quebrar em 375px. */}
      {content.fallback && (
        <CodeLine kind="comment" numbered={false} wrap>
          {dict.englishOnly}
        </CodeLine>
      )}
      <CodePreview
        html={html}
        lang={content.fallback ? HTML_LANG[content.lang] : undefined}
      />
    </EditorPane>
  );
}
