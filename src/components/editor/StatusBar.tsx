"use client";

import { useParams, usePathname } from "next/navigation";
import { GitBranch, Mail } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/BrandIcons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ui } from "@/dictionaries/ui";
import { useEditorStatus } from "@/hooks/useEditorStatus";
import { EDITOR_FILES, fileForPath } from "@/lib/editor-files";
import { DEFAULT_LOCALE, fill, hasLocale, stripLocale } from "@/lib/i18n";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/navigation";

export type StatusBarProps = {
  /** Branch do deploy (VERCEL_GIT_COMMIT_REF) ou "main". */
  branch: string;
};

const linkClass =
  "flex min-h-6 items-center px-1 transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none";

/**
 * Status bar (guia §5.5): branch · linguagem do arquivo · Ln/Col · "opening …"
 * · EN · PT · GitHub · LinkedIn · e-mail. Parte do flex do shell (não é fixed).
 */
export default function StatusBar({ branch }: StatusBarProps) {
  const pathname = usePathname();
  const params = useParams<{ lang: string }>();
  const lang = hasLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { opening, cursor } = useEditorStatus();
  const dict = ui[lang];

  const file = fileForPath(stripLocale(pathname));
  const openingFile = opening ? EDITOR_FILES[opening] : null;

  return (
    <footer
      role="contentinfo"
      aria-label={dict.status.label}
      className="flex h-6 shrink-0 items-center gap-4 border-t border-border bg-background px-4 text-xs text-muted-foreground tabular-nums"
    >
      <span className="flex shrink-0 items-center gap-1">
        <GitBranch size={12} aria-hidden="true" />
        <span className="sr-only">{fill(dict.status.branch, { name: branch })}</span>
        <span aria-hidden="true">{branch}</span>
      </span>

      {file && (
        <span className="hidden shrink-0 sm:inline">
          <span className="sr-only">
            {fill(dict.status.language, { name: file.language })}
          </span>
          <span aria-hidden="true">{file.language}</span>
        </span>
      )}

      <span className="hidden shrink-0 sm:inline">
        {fill(dict.status.position, cursor)}
      </span>

      <span
        aria-live="polite"
        className="min-w-0 flex-1 truncate text-center"
      >
        {openingFile && fill(dict.status.opening, { name: openingFile.name })}
      </span>

      <LanguageSwitcher lang={lang} />

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.status.github}
        className={linkClass}
      >
        <GithubMark />
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.status.linkedin}
        className={linkClass}
      >
        <LinkedinMark />
      </a>
      <a
        href={`mailto:${dict.explorer.email}`}
        aria-label={dict.status.email}
        className={linkClass}
      >
        <Mail size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
