import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";
import { getBlockFromNotion } from "@/lib/getBlockFromNotion";
import { NotionBlockEc } from "@/types/NotionBlockEc";
import { pageMetadata } from "@/lib/site";

const notionTerminalId = "3dd50dfb9ce046c3a0b87a70508980e8";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Terminal",
    description:
      "Edison Cristovão's terminal setup: shell, prompt and tools.",
    path: "/editor/terminal",
  });
}

export default async function page() {
  const notionBlock = (await getBlockFromNotion(
    notionTerminalId
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
