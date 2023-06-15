import React from "react";

type CodePreviewProps = {
  code: string | TrustedHTML;
};
export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <div
      id="shiki-code"
      className="overflow-auto leading-relaxed scrollbar scrollbar-thumb-[#2B283B] scrollbar-track-transparent"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
