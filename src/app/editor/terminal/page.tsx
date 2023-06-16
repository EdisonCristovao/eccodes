import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";

const content = `
# General

Currently I'm using the combo zsh + Oh my zsh in my terminal.

Ohmyzsh Shell: https://ohmyz.sh/

---

I'm also using Warp as my terminal emulator.

Warp: https://www.warp.dev/

---

For the theme, I chose Rosé Pine Moon variant: 

Theme: https://github.com/austintraver/warp-theme/blob/main/base16_rose_pine_moon.yaml
`.trim();

export default async function page() {
  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });
  const code = highlighter.codeToHtml(content, { lang: "md" });

  return <CodePreview code={code} />;
}
