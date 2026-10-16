"use client";

import { usePathname } from "next/navigation";
import { fill } from "@/lib/i18n";

type RequestedPathProps = {
  /** Modelo com `{path}`, ex.: "// the path {path} does not exist". */
  template: string;
};

/** Linha do 404 com o caminho pedido (só o cliente conhece a URL sem tornar a rota dinâmica). */
export default function RequestedPath({ template }: RequestedPathProps) {
  const pathname = usePathname();
  return <>{fill(template, { path: pathname })}</>;
}
