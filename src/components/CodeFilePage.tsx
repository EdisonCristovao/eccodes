import { readFile } from "node:fs/promises";
import { join } from "node:path";
import shiki, { type Highlighter } from "shiki";
import CodePreview from "@/components/CodePreview";
import EditorNotice from "@/components/EditorNotice";
import { FILES, type FileSlug } from "@/lib/files";

const CONTENT_DIR = join(process.cwd(), "src", "content");

// Um highlighter por processo: carregar o tema a cada render custa ~100ms.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= shiki.getHighlighter({ theme: "dracula" });
  return highlighterPromise;
}

type CodeFilePageProps = {
  slug: FileSlug;
};

/**
 * Página de "arquivo" do editor: lê `src/content/<source>` em build/render
 * (rotas estáticas) e colore com o shiki.
 */
export default async function CodeFilePage({ slug }: CodeFilePageProps) {
  const file = FILES[slug];
  const code = await readFile(join(CONTENT_DIR, file.source), "utf8");

  if (code.trim() === "") {
    return (
      <EditorNotice
        lines={["// could not open file", `// ${file.title}: no content available`]}
      />
    );
  }

  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code, { lang: file.lang });

  return <CodePreview code={html} />;
}
