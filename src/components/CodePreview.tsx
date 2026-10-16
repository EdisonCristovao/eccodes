type CodePreviewProps = {
  /** HTML do shiki (`<pre class="shiki"><code><span class="line">…`). */
  html: string | TrustedHTML;
  /** Idioma do conteúdo quando difere da página (fallback EN). */
  lang?: string;
};

/**
 * Código colorido dentro do EditorPane: o gutter vem do `.editor-body`
 * (cada `span.line` do shiki conta uma linha) e o scroll é do corpo do pane.
 */
export default function CodePreview({ html, lang }: CodePreviewProps) {
  return (
    <div
      className="min-w-0"
      lang={lang}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
