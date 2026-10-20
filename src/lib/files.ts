import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { EDITOR_FILES, type EditorFile } from "@/lib/editor-files";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/** Arquivos com conteúdo em `src/content/` (subconjunto do registro). */
export type ContentSlug = "about" | "bio" | "terminal" | "others";
/** @deprecated alias de `ContentSlug`; o registro geral está em `@/lib/editor-files`. */
export type FileSlug = ContentSlug;

type ContentLoader = () => Promise<string>;

export type CodeFile = {
  slug: ContentSlug;
  /** Rota lógica (sem prefixo de idioma): canonical, og:url, sitemap. */
  path: EditorFile["path"];
  /** Nome exibido (aba/explorer/breadcrumb) — vem do registro, não se traduz. */
  name: string;
  /** Linguagem do shiki (do registro). */
  lang: "js" | "md";
  description: string;
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

function define(
  slug: ContentSlug,
  description: string,
  content: CodeFile["content"],
): CodeFile {
  const file = EDITOR_FILES[slug];
  return {
    slug,
    path: file.path,
    name: file.name,
    // Todos os arquivos de conteúdo têm `shiki` no registro.
    lang: file.shiki ?? "md",
    description,
    content,
  };
}

/** Loaders de conteúdo dos arquivos do editor (só servidor). */
export const FILES: Record<ContentSlug, CodeFile> = {
  about: define(
    "about",
    "About Edison Cristovão: mobile and full-stack developer with 10+ years of experience, currently at TED and open to remote roles.",
    { en: load("about.md"), pt: load("about.pt.md") },
  ),
  bio: define(
    "bio",
    "Edison Cristovão's bio as a code file: background, stack and what he's working on.",
    { en: load("bio.js"), pt: load("bio.pt.js") },
  ),
  terminal: define(
    "terminal",
    "Edison Cristovão's terminal setup: shell, prompt and tools.",
    // Só comandos/links: um arquivo para os dois idiomas (aviso de fallback em PT).
    { en: load("terminal.md") },
  ),
  others: define(
    "others",
    "Edison Cristovão's dev setup: editor, extensions, fonts and configs.",
    { en: load("others.md") },
  ),
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
