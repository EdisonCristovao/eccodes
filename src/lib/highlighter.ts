import {
  createCssVariablesTheme,
  createHighlighter,
  type Highlighter,
  type ShikiTransformer,
} from "shiki";

/**
 * Tema por variáveis CSS: cada token sai como `color: var(--shiki-token-*)`
 * e o `globals.css` aponta essas variáveis para os tokens `syntax-*`. Fonte
 * única de cor para o shiki e para o `Token` da home.
 */
const theme = createCssVariablesTheme({
  name: "eccodes",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

/**
 * Cada `span.line` vira um flex (gutter por ::before); embrulha o conteúdo da
 * linha num span único com `whitespace-pre` para o flex não engolir os espaços
 * entre tokens. Opera na árvore hast, não no HTML.
 */
const lineWrapper: ShikiTransformer = {
  name: "eccodes:line-wrapper",
  line(node) {
    node.children = [
      {
        type: "element",
        tagName: "span",
        properties: { class: "min-w-0 whitespace-pre" },
        children: node.children,
      },
    ];
  },
};

/** Quem rola é o `.editor-body`; o `<pre>` focável seria uma parada de Tab vazia. */
const noTabStop: ShikiTransformer = {
  name: "eccodes:no-tab-stop",
  pre(node) {
    delete node.properties.tabindex;
  },
};

// Um highlighter por processo: carregar tema e gramáticas a cada render custa ~100ms.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: [theme],
    langs: ["javascript", "markdown"],
  });
  return highlighterPromise;
}

export async function highlight(code: string, lang: "js" | "md"): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "eccodes",
    transformers: [lineWrapper, noTabStop],
  });
}
