import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";
import { getBlockFromNotion } from "@/lib/getBlockFromNotion";
import { NotionBlockEc } from "@/types/NotionBlockEc";
import { pageMetadata } from "@/lib/site";

const notionBioId = "d2ee5920571945cf8a8037263db0878f";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata(parent, {
    title: "Bio",
    description:
      "Edison Cristovão's bio as a code file: background, stack and what he's working on.",
    path: "/editor/bio",
  });
}

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
