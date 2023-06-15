import React from "react";
import shiki from "shiki";
import CodePreview from "@/components/CodePreview";

const content = `
export default function Link({ label, href }: LinkProps) {
  return (
    <div className="flex items-center px-6 h-full border-x border-lines">
      <NextLink href={href}>
        <label className="hover:text-white hover:cursor-pointer">{label}</label>
      </NextLink>
    </div>
  );
}`.trim();

export default async function page() {
  const highlighter = await shiki.getHighlighter({
    theme: "dracula",
  });
  const code = highlighter.codeToHtml(content, { lang: "js" });

  return <CodePreview code={code} />;
}
