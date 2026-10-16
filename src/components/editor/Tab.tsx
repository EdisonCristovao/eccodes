"use client";

import type { KeyboardEvent, Ref } from "react";
import NextLink from "next/link";
import { X } from "lucide-react";
import FileIcon from "@/components/editor/FileIcon";
import { ui } from "@/dictionaries/ui";
import type { EditorFile } from "@/lib/editor-files";
import { fill, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type TabProps = {
  file: EditorFile;
  href: string;
  lang: Locale;
  /** Arquivo da rota atual. */
  active: boolean;
  /** Carregando (loading.tsx montado): ● no lugar do ×. */
  opening: boolean;
  /** Aba recém-aberta: anima a entrada (as restauradas na hidratação, não). */
  animate: boolean;
  /** Roving tabIndex: só uma aba (e o seu ×) entram na ordem do Tab. */
  focusable: boolean;
  onClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
  linkRef: Ref<HTMLAnchorElement>;
};

export default function Tab({
  file,
  href,
  lang,
  active,
  opening,
  animate,
  focusable,
  onClose,
  onKeyDown,
  linkRef,
}: TabProps) {
  const dict = ui[lang].tabs;
  const tabIndex = focusable ? 0 : -1;

  return (
    <li
      data-active={active}
      className={cn(
        "group flex shrink-0 snap-start items-stretch border-r border-border data-[active=true]:bg-card data-[active=true]:shadow-[inset_0_2px_0_0_var(--color-ring)]",
        animate &&
          "animate-in fade-in-0 slide-in-from-left-2 duration-200 motion-reduce:animate-none",
      )}
    >
      <NextLink
        ref={linkRef}
        href={href}
        tabIndex={tabIndex}
        aria-current={active ? "page" : undefined}
        data-active={active}
        onKeyDown={onKeyDown}
        className="flex items-center gap-2 pl-4 pr-1 text-editor text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[active=true]:text-foreground motion-reduce:transition-none"
      >
        <FileIcon ext={file.ext} className="shrink-0" />
        <span className="whitespace-nowrap">{file.name}</span>
      </NextLink>

      {opening ? (
        <span
          role="img"
          aria-label={fill(dict.opening, { name: file.name })}
          className="mr-2 flex size-5 shrink-0 animate-pulse items-center justify-center self-center text-syntax-active motion-reduce:animate-none"
        >
          ●
        </span>
      ) : (
        <button
          type="button"
          tabIndex={tabIndex}
          aria-label={fill(dict.close, { name: file.name })}
          data-active={active}
          onClick={onClose}
          className={cn(
            "relative mr-2 flex size-5 shrink-0 items-center justify-center self-center rounded-sm text-muted-foreground transition-opacity duration-150 hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
            // Mobile: área de toque 44×36 via pseudo-elemento; desktop: só no hover/foco ou na aba ativa.
            "before:absolute before:-inset-x-3 before:-inset-y-2 before:content-[''] md:before:hidden",
            "md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:data-[active=true]:opacity-100",
          )}
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </li>
  );
}
