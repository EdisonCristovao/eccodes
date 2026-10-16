/**
 * Registro único dos "arquivos" do editor (client-safe: sem node:fs).
 * Explorer, TabBar, StatusBar, sitemap e ⌘K leem daqui. Nomes exibidos e
 * `language` não se traduzem; `path` é lógico (sem prefixo de idioma).
 */
export type FileSlug =
  | "home"
  | "about"
  | "bio"
  | "terminal"
  | "others"
  | "projects";

export type FileExt = "tsx" | "md" | "js" | "json";

export type FilePath =
  | "/"
  | "/editor"
  | "/editor/bio"
  | "/editor/terminal"
  | "/editor/others"
  | "/projects";

export type EditorFile = {
  slug: FileSlug;
  path: FilePath;
  /** Nome exibido (aba/explorer) — NÃO se traduz. */
  name: string;
  ext: FileExt;
  /** Label da status bar. */
  language: string;
  /** Só para arquivos com conteúdo colorido pelo shiki. */
  shiki?: "js" | "md";
  /** Futuro: pastas. */
  section: "files";
};

export const EDITOR_FILES: Record<FileSlug, EditorFile> = {
  home: {
    slug: "home",
    path: "/",
    name: "home.tsx",
    ext: "tsx",
    language: "TypeScript JSX",
    section: "files",
  },
  about: {
    slug: "about",
    path: "/editor",
    name: "about.md",
    ext: "md",
    language: "Markdown",
    section: "files",
  },
  bio: {
    slug: "bio",
    path: "/editor/bio",
    name: "bio.js",
    ext: "js",
    language: "JavaScript",
    shiki: "js",
    section: "files",
  },
  terminal: {
    slug: "terminal",
    path: "/editor/terminal",
    name: "terminal.md",
    ext: "md",
    language: "Markdown",
    shiki: "md",
    section: "files",
  },
  others: {
    slug: "others",
    path: "/editor/others",
    name: "dev-setup.md",
    ext: "md",
    language: "Markdown",
    shiki: "md",
    section: "files",
  },
  projects: {
    slug: "projects",
    path: "/projects",
    name: "projects.json",
    ext: "json",
    language: "JSON",
    section: "files",
  },
};

/** Ordem de exibição no explorer. */
export const EXPLORER_ORDER: FileSlug[] = [
  "home",
  "about",
  "bio",
  "terminal",
  "others",
  "projects",
];

/** Arquivo de um caminho lógico ("/editor/bio" → bio; "/" → home); undefined se não houver. */
export function fileForPath(logicalPath: string): EditorFile | undefined {
  const path = logicalPath === "" ? "/" : logicalPath.replace(/\/+$/, "") || "/";
  return Object.values(EDITOR_FILES).find((file) => file.path === path);
}
