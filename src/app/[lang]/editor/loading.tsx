"use client";

import { useParams } from "next/navigation";
import { ui } from "@/dictionaries/ui";
import { DEFAULT_LOCALE, hasLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Larguras e indentação de 10 linhas "de código", para o skeleton parecer um arquivo.
const SKELETON_LINES = [
  { width: "w-5/12", indent: "" },
  { width: "w-8/12", indent: "ml-6" },
  { width: "w-3/12", indent: "ml-6" },
  { width: "w-7/12", indent: "ml-12" },
  { width: "w-9/12", indent: "ml-12" },
  { width: "w-4/12", indent: "ml-6" },
  { width: "w-2/12", indent: "" },
  { width: "w-6/12", indent: "" },
  { width: "w-8/12", indent: "ml-6" },
  { width: "w-5/12", indent: "" },
];

// Client component: é usado como fallback do Suspense no template (client) e
// precisa do idioma da rota via useParams.
export default function Loading() {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="px-6 py-4 text-sm leading-relaxed"
    >
      <span className="sr-only">{ui[lang].file.opening}</span>
      <ol aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        {SKELETON_LINES.map(({ width, indent }, index) => (
          <li key={index} className="flex h-6 items-center gap-4">
            <span className="w-8 shrink-0 select-none text-right text-muted-foreground">
              {index + 1}
            </span>
            <span className={cn("h-3.5 rounded-sm bg-accent", width, indent)} />
          </li>
        ))}
      </ol>
    </div>
  );
}
