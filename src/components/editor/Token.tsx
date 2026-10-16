import type { ReactNode } from "react";

export type TokenKind =
  | "keyword"
  | "name"
  | "string"
  | "comment"
  | "punct"
  | "active";

// Classes literais para o Tailwind gerar cada uma.
const CLASS: Record<TokenKind, string> = {
  keyword: "text-syntax-keyword",
  name: "text-syntax-name",
  string: "text-syntax-string",
  comment: "text-syntax-comment",
  punct: "text-syntax-punct",
  active: "text-syntax-active",
};

/** Trecho de código colorido pelos tokens `syntax-*` (guia §2.2). */
export default function Token({
  kind,
  children,
}: {
  kind: TokenKind;
  children: ReactNode;
}) {
  return <span className={CLASS[kind]}>{children}</span>;
}
