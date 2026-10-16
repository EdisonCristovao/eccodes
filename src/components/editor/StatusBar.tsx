"use client";

import { useParams, usePathname } from "next/navigation";
import { GitBranch, Mail } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ui } from "@/dictionaries/ui";
import { useEditorStatus } from "@/hooks/useEditorStatus";
import { EDITOR_FILES, fileForPath } from "@/lib/editor-files";
import { DEFAULT_LOCALE, fill, hasLocale, stripLocale } from "@/lib/i18n";
import { GITHUB_URL } from "@/lib/navigation";

export type StatusBarProps = {
  /** Branch do deploy (VERCEL_GIT_COMMIT_REF) ou "main". */
  branch: string;
};

// O lucide 1.x não traz mais ícones de marca; marca do GitHub inline.
function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const linkClass =
  "flex min-h-6 items-center px-1 transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none";

/**
 * Status bar (guia §5.5): branch · linguagem do arquivo · Ln/Col · "opening …"
 * · EN · PT · GitHub · e-mail. Parte do flex do shell (não é fixed).
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
        href={`mailto:${dict.explorer.email}`}
        aria-label={dict.status.email}
        className={linkClass}
      >
        <Mail size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
