import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";
import { getBlockFromNotion } from "@/lib/getBlockFromNotion";
import { NotionBlockEc } from "@/types/NotionBlockEc";

const notionBioId = "d2ee5920571945cf8a8037263db0878f";

export default async function page() {
  const notionBlock = (await getBlockFromNotion(
    notionBioId
  )) as unknown as NotionBlockEc;

  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });

  const code = highlighter.codeToHtml(
    notionBlock?.code.rich_text[0].text.content,
    { lang: "js" }
  );

  return <CodePreview code={code} />;
}
