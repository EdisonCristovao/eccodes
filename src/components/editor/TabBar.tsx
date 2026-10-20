"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import CommandPaletteTrigger from "@/components/command/CommandPaletteTrigger";
import ExplorerDrawer from "@/components/explorer/ExplorerDrawer";
import Tab from "@/components/editor/Tab";
import { ui } from "@/dictionaries/ui";
import { useEditorStatus } from "@/hooks/useEditorStatus";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import { EDITOR_FILES, fileForPath, type FileSlug } from "@/lib/editor-files";
import {
  DEFAULT_LOCALE,
  hasLocale,
  localizedPath,
  stripLocale,
} from "@/lib/i18n";

/**
 * Barra de abas: links para os arquivos abertos (`useOpenFiles`), não um
 * `tablist` — cada aba navega entre rotas. Teclado: ←/→ movem o foco
 * (roving tabIndex), Delete/Backspace fecham, Enter navega.
 */
export default function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = hasLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { openFiles, open, close } = useOpenFiles();
  const { opening } = useEditorStatus();

  const activeSlug = fileForPath(stripLocale(pathname))?.slug ?? null;
  const activeIndex = activeSlug ? openFiles.indexOf(activeSlug) : -1;

  // Aba que recebe o Tab: a focada pelas setas ou, por padrão, a ativa.
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [previousActive, setPreviousActive] = useState(activeSlug);
  if (activeSlug !== previousActive) {
    setPreviousActive(activeSlug);
    setFocusIndex(null);
  }
  const rovingIndex =
    focusIndex !== null && focusIndex < openFiles.length
      ? focusIndex
      : Math.max(activeIndex, 0);

  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  // Só uma aba NOVA anima a entrada (§6): `fresh` = slugs que não estavam no
  // render anterior (estado derivado no render, sem ref nem effect). O 1º
  // snapshot (hidratação) conta como já visto.
  const [tracked, setTracked] = useState(() => ({
    seen: new Set<FileSlug>(openFiles),
    fresh: new Set<FileSlug>(),
  }));
  const added = openFiles.filter((slug) => !tracked.seen.has(slug));
  if (added.length > 0) {
    setTracked({
      seen: new Set([...Array.from(tracked.seen), ...added]),
      fresh: new Set(added),
    });
  }
  const isNew = (slug: FileSlug) => tracked.fresh.has(slug);

  // A aba ativa entra na viewport da lista (7+ abas em 375px rolam).
  useEffect(() => {
    links.current[activeIndex]?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
    });
  }, [activeIndex]);

  const focusTab = (index: number) => {
    setFocusIndex(index);
    requestAnimationFrame(() => links.current[index]?.focus());
  };

  const closeTab = (slug: FileSlug) => {
    const index = openFiles.indexOf(slug);
    const remaining = openFiles.filter((open) => open !== slug);
    close(slug);

    if (slug === activeSlug) {
      // Vizinha da esquerda, senão da direita; sem abas, home.
      const target = remaining[index - 1] ?? remaining[index] ?? "home";
      if (EDITOR_FILES[target].path === stripLocale(pathname)) {
        // Destino já é a rota atual (ex.: fechar home.tsx estando em /en):
        // o pathname não mudaria e a rota não reabriria a aba — reabre aqui.
        open(target);
      } else {
        router.push(localizedPath(lang, EDITOR_FILES[target].path));
      }
    }

    const next = Math.min(index, remaining.length - 1);
    if (next >= 0) focusTab(next);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number,
    slug: FileSlug,
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft": {
        event.preventDefault();
        const delta = event.key === "ArrowRight" ? 1 : -1;
        focusTab((index + delta + openFiles.length) % openFiles.length);
        break;
      }
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(openFiles.length - 1);
        break;
      case "Delete":
      case "Backspace":
        event.preventDefault();
        closeTab(slug);
        break;
    }
  };

  return (
    <nav
      aria-label={ui[lang].tabs.label}
      className="flex h-9 shrink-0 items-stretch border-b border-border bg-background"
    >
      <ExplorerDrawer />
      <ul className="flex min-w-0 flex-1 snap-x overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto">
        {openFiles.map((slug, index) => {
          const file = EDITOR_FILES[slug];
          return (
            <Tab
              key={slug}
              file={file}
              href={localizedPath(lang, file.path)}
              lang={lang}
              active={slug === activeSlug}
              opening={opening === slug}
              animate={isNew(slug)}
              focusable={index === rovingIndex}
              onClose={() => closeTab(slug)}
              onKeyDown={(event) => handleKeyDown(event, index, slug)}
              linkRef={(element) => {
                links.current[index] = element;
              }}
            />
          );
        })}
      </ul>
      <CommandPaletteTrigger lang={lang} />
    </nav>
  );
}
