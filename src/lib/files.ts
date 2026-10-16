import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Lang } from "shiki";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export type FileSlug = "bio" | "terminal" | "others";

type ContentLoader = () => Promise<string>;

export type CodeFile = {
  slug: FileSlug;
  /** Rota lógica da página (sem prefixo de idioma): canonical, og:url, sitemap. */
  path: `/editor/${FileSlug}`;
  /** Nome do arquivo no explorer/aba — não se traduz. */
  title: string;
  description: string;
  /** Linguagem usada pelo shiki para colorir o conteúdo. */
  lang: Lang;
  /**
   * Conteúdo por idioma, lido de `src/content/`. `en` é obrigatório; sem
   * versão no idioma pedido, `resolveContent` cai no inglês e avisa.
   */
  content: { en: ContentLoader } & Partial<Record<Locale, ContentLoader>>;
};

const CONTENT_DIR = join(process.cwd(), "src", "content");
const load =
  (name: string): ContentLoader =>
  () =>
    readFile(join(CONTENT_DIR, name), "utf8");

/**
 * Fonte única dos "arquivos" do editor. O conteúdo vive em `src/content/`
 * (versionado, sem serviço externo). O item 6 do backlog estende este mapa
 * (label, extensão, ícone) para o explorer, abas e ⌘K.
 */
export const FILES: Record<FileSlug, CodeFile> = {
  bio: {
    slug: "bio",
    path: "/editor/bio",
    title: "Bio",
    description:
      "Edison Cristovão's bio as a code file: background, stack and what he's working on.",
    lang: "js",
    content: { en: load("bio.js"), pt: load("bio.pt.js") },
  },
  terminal: {
    slug: "terminal",
    path: "/editor/terminal",
    title: "Terminal",
    description: "Edison Cristovão's terminal setup: shell, prompt and tools.",
    lang: "md",
    // Só comandos/links: um arquivo para os dois idiomas (aviso de fallback em PT).
    content: { en: load("terminal.md") },
  },
  others: {
    slug: "others",
    path: "/editor/others",
    title: "dev.setup",
    description:
      "Edison Cristovão's dev setup: editor, extensions, fonts and configs.",
    lang: "md",
    content: { en: load("others.md") },
  },
};

export type ResolvedContent = {
  code: string;
  /** Idioma do conteúdo devolvido (pode diferir do pedido). */
  lang: Locale;
  /** true quando o arquivo não existe no idioma pedido e veio o inglês. */
  fallback: boolean;
};

/** Conteúdo do arquivo no idioma pedido, ou o inglês com `fallback: true`. */
export async function resolveContent(
  file: CodeFile,
  lang: Locale,
): Promise<ResolvedContent> {
  const loader = file.content[lang];
  if (loader) return { code: await loader(), lang, fallback: false };
  return {
    code: await file.content.en(),
    lang: DEFAULT_LOCALE,
    fallback: lang !== DEFAULT_LOCALE,
  };
}
