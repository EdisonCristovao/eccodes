import type { Lang } from "shiki";

export type FileSlug = "bio" | "terminal" | "others";

export type CodeFile = {
  slug: FileSlug;
  /** Rota da página (canonical, og:url, sitemap). */
  path: `/editor/${FileSlug}`;
  title: string;
  description: string;
  /** Nome do arquivo em `src/content/` com o conteúdo exibido. */
  source: string;
  /** Linguagem usada pelo shiki para colorir o conteúdo. */
  lang: Lang;
};

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
    source: "bio.js",
    lang: "js",
  },
  terminal: {
    slug: "terminal",
    path: "/editor/terminal",
    title: "Terminal",
    description: "Edison Cristovão's terminal setup: shell, prompt and tools.",
    source: "terminal.md",
    lang: "md",
  },
  others: {
    slug: "others",
    path: "/editor/others",
    title: "dev.setup",
    description:
      "Edison Cristovão's dev setup: editor, extensions, fonts and configs.",
    source: "others.md",
    lang: "md",
  },
};
