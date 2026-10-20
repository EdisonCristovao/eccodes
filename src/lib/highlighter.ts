import "server-only";
import {
  createCssVariablesTheme,
  createHighlighterCore,
  type HighlighterCore,
  type ShikiTransformer,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

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

type Lang = "js" | "md";
type HastElement = Parameters<NonNullable<ShikiTransformer["span"]>>[0];
type HastContent = HastElement["children"][number];

/**
 * Classes do span de conteúdo da linha. Markdown tem word wrap (como o VS
 * Code): prosa quebra sem rolar de lado e a continuação não ganha número.
 */
const LINE_CLASS: Record<Lang, string> = {
  js: "min-w-0 whitespace-pre",
  md: "min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]",
};

/**
 * Cada `span.line` vira um flex (gutter por ::before); embrulha o conteúdo da
 * linha num span único com `whitespace-pre(-wrap)` para o flex não engolir os
 * espaços entre tokens. Opera na árvore hast, não no HTML.
 */
function lineWrapper(lang: Lang): ShikiTransformer {
  return {
    name: "eccodes:line-wrapper",
    line(node) {
      node.children = [
        {
          type: "element",
          tagName: "span",
          properties: { class: LINE_CLASS[lang] },
          children: node.children,
        },
      ];
    },
  };
}

const LINK_PATTERN = /(https?:\/\/[^\s)"'<>]+)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;
// `relative`: o sr-only (absolute) fica preso ao link; sem isso o containing
// block vira a viewport e o span escapa do overflow do .editor-body.
// Pontuação de fim de frase colada no link fica fora dele ("…/ohmyz.sh/." → ".").
const TRAILING_PUNCT = /[.,;:!?]+$/;
const LINK_CLASS =
  "relative rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function linkElement(target: string, isUrl: boolean, newTab: string): HastElement {
  const text: HastContent = { type: "text", value: target };
  if (!isUrl) {
    return {
      type: "element",
      tagName: "a",
      properties: { href: `mailto:${target}`, class: LINK_CLASS },
      children: [text],
    };
  }
  return {
    type: "element",
    tagName: "a",
    properties: {
      href: target,
      target: "_blank",
      rel: ["noopener", "noreferrer"],
      class: LINK_CLASS,
    },
    children: [
      text,
      {
        type: "element",
        tagName: "span",
        properties: { class: "sr-only" },
        children: [{ type: "text", value: newTab }],
      },
    ],
  };
}

/** Separa URLs e e-mails de um texto em nós de texto e `<a>`. */
function splitLinks(value: string, newTab: string): HastContent[] {
  const parts: HastContent[] = [];
  let last = 0;
  for (const match of Array.from(value.matchAll(LINK_PATTERN))) {
    const target = match[0].replace(TRAILING_PUNCT, "");
    const start = match.index;
    if (start > last) parts.push({ type: "text", value: value.slice(last, start) });
    parts.push(linkElement(target, match[1] !== undefined, newTab));
    last = start + target.length;
  }
  if (last === 0) return [{ type: "text", value }];
  if (last < value.length) parts.push({ type: "text", value: value.slice(last) });
  return parts;
}

/**
 * URLs e e-mails clicáveis: a URL chega inteira dentro do texto de um token,
 * então o texto é dividido. A cor vem do token (o `<a>` fica dentro do span).
 */
function linkify(newTab: string): ShikiTransformer {
  return {
    name: "eccodes:linkify",
    span(node) {
      node.children = node.children.flatMap((child) =>
        child.type === "text" ? splitLinks(child.value, newTab) : [child],
      );
    },
  };
}

/** Quem rola é o `.editor-body`; o `<pre>` focável seria uma parada de Tab vazia. */
const noTabStop: ShikiTransformer = {
  name: "eccodes:no-tab-stop",
  pre(node) {
    delete node.properties.tabindex;
  },
};

// Um highlighter por processo: carregar tema e gramáticas a cada render custa ~100ms.
// Núcleo enxuto (item 13): só as 2 gramáticas usadas e o motor de regex em JS,
// sem o bundle completo de linguagens nem o WASM do Oniguruma.
let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [theme],
    langs: [import("shiki/langs/javascript.mjs"), import("shiki/langs/markdown.mjs")],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighterPromise;
}

type HighlightOptions = {
  /** Texto sr-only dos links externos: " (opens in a new tab)". */
  newTab: string;
};

export async function highlight(
  code: string,
  lang: Lang,
  { newTab }: HighlightOptions,
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "eccodes",
    transformers: [linkify(newTab), lineWrapper(lang), noTabStop],
  });
}
