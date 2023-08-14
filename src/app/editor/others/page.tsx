import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";
import { getBlockFromNotion } from "@/lib/getBlockFromNotion";
import { NotionBlockEc } from "@/types/NotionBlockEc";

const notionOthersId = "08f7daaf6cfb409091dfa27ecf8093bf";

export default async function page() {
  const notionBlock = (await getBlockFromNotion(
    notionOthersId
  )) as unknown as NotionBlockEc;

  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });
  const code = highlighter.codeToHtml(
    notionBlock?.code.rich_text[0].text.content,
    { lang: "md" }
  );
  return <CodePreview code={code} />;
}
