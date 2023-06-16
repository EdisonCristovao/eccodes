import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";

const content = `
# Dev Setup

- MacBook Pro 15-inch, 2018 (16gb Memory)
- LG 29" UltraWide Display
- LG 25" Display
- Magic Keyboard
- Trackpad
- Slikdesk High, Tampo Carvalho Dakar
- Cadeira Tecton Golden Unique, Flexform

That's it, nothing more.
`.trim();

export default async function page() {
  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });
  const code = highlighter.codeToHtml(content, { lang: "md" });

  return <CodePreview code={code} />;
}
