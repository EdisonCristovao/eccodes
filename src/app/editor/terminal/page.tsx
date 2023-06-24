import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";
import { getBlockFromNotion } from "@/lib/getBlockFromNotion";

const notionTerminalId = "3dd50dfb9ce046c3a0b87a70508980e8";

export default async function page() {
  const notionBlock = await getBlockFromNotion(notionTerminalId);

  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });

  const code = highlighter.codeToHtml(
    notionBlock?.code.rich_text[0].text.content,
    { lang: "md" }
  );

  return <CodePreview code={code} />;
}
