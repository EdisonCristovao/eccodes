"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { defaultFilter } from "cmdk";
import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/BrandIcons";
import FileIcon from "@/components/editor/FileIcon";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogClose } from "@/components/ui/dialog";
import { ui, whatsappUrl } from "@/dictionaries/ui";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import {
  EDITOR_FILES,
  EXPLORER_ORDER,
  fileForPath,
  type FileSlug,
} from "@/lib/editor-files";
import {
  LOCALES,
  fill,
  localizedPath,
  rememberLocale,
  stripLocale,
  swapLocale,
  type Locale,
} from "@/lib/i18n";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/navigation";

export type CommandPaletteProps = {
  lang: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Para onde o foco volta ao fechar (gatilho ou o elemento focado antes do atalho). */
  returnFocus: () => void;
};

/** Prefixo do VS Code: `>` mostra só os comandos e filtra pelo resto. */
const COMMAND_PREFIX = ">";

// Os dois idiomas entram na busca: "sobre" acha o about.md em /en.
const fileKeywords = (slug: FileSlug): string[] => [
  slug,
  EDITOR_FILES[slug].language,
  ...LOCALES.flatMap((locale) => ui[locale].palette.keywords[slug]),
];

const filter = (value: string, search: string, keywords?: string[]) =>
  defaultFilter(
    value,
    search.startsWith(COMMAND_PREFIX) ? search.slice(1).trim() : search,
    keywords,
  );

const openInNewTab = (url: string) =>
  window.open(url, "_blank", "noopener,noreferrer");

/**
 * Palette (item 9): Files · Commands · Links sobre o `CommandDialog`. Só é
 * carregada no primeiro pedido de abertura (`CommandPaletteTrigger`).
 */
export default function CommandPalette({
  lang,
  open,
  onOpenChange,
  returnFocus,
}: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { openFiles, open: openTab, closeOthers, closeAll } = useOpenFiles();
  const dict = ui[lang].palette;
  const newTab = ui[lang].file.newTab;

  const [search, setSearch] = useState("");
  // Cada abertura começa com a busca vazia (ajuste durante o render).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSearch("");
  }

  const commandMode = search.startsWith(COMMAND_PREFIX);
  const activeSlug = fileForPath(stripLocale(pathname))?.slug ?? null;
  const otherLang = LOCALES.find((locale) => locale !== lang) ?? lang;

  const run = (action: () => void) => () => {
    onOpenChange(false);
    action();
  };

  const switchLanguage = () => {
    rememberLocale(otherLang);
    router.push(`${swapLocale(pathname, otherLang)}${window.location.search}`);
  };

  const closeAllTabs = () => {
    closeAll();
    // Mesma regra do closeTab da TabBar: já na home, reabre home.tsx.
    if (stripLocale(pathname) === EDITOR_FILES.home.path) openTab("home");
    else router.push(localizedPath(lang, EDITOR_FILES.home.path));
  };

  const links: {
    id: string;
    label: string;
    icon: ReactNode;
    external: boolean;
    action: () => void;
  }[] = [
    {
      id: "github",
      label: dict.links.github,
      icon: <GithubMark size={16} />,
      external: true,
      action: () => openInNewTab(GITHUB_URL),
    },
    {
      id: "linkedin",
      label: dict.links.linkedin,
      icon: <LinkedinMark size={16} />,
      external: true,
      action: () => openInNewTab(LINKEDIN_URL),
    },
    {
      id: "email",
      label: dict.links.email,
      icon: <Mail size={16} aria-hidden="true" />,
      external: false,
      action: () => window.location.assign(`mailto:${ui[lang].explorer.email}`),
    },
    {
      id: "whatsapp",
      label: dict.links.whatsapp,
      icon: <MessageCircle size={16} aria-hidden="true" />,
      external: true,
      action: () => openInNewTab(whatsappUrl(lang)),
    },
  ];

  // "Language: Switch to …": a categoria em muted, como no VS Code.
  const commandLabel = (category: string, text: string) => (
    <span className="truncate">
      <span className="text-muted-foreground group-data-selected/command-item:text-foreground/80">
        {category}
      </span>{" "}
      {text}
    </span>
  );
  const switchLabel = fill(dict.commands.switchTo, {
    name: ui[lang].lang[otherLang],
  });

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={dict.title}
      description={dict.description}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocus();
      }}
      className="top-2 w-[calc(100vw-16px)] max-w-none translate-y-0 gap-0 sm:top-[12vh] sm:w-[min(560px,calc(100vw-16px))] sm:max-w-none"
    >
      <Command loop filter={filter} vimBindings={false} label={dict.title}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder={dict.placeholder}
          // Nome acessível = placeholder sem o "(type > for commands)".
          aria-label={dict.placeholder.replace(/\s*\(.*\)$/, "")}
          end={
            <DialogClose className="min-h-11 shrink-0 px-3 text-editor text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:hidden">
              {dict.cancel}
            </DialogClose>
          }
        />
        <CommandList>
          <CommandEmpty>{fill(dict.empty, { query: search })}</CommandEmpty>

          {!commandMode && (
            <CommandGroup heading={dict.groups.files}>
              {EXPLORER_ORDER.map((slug) => {
                const file = EDITOR_FILES[slug];
                const current = slug === activeSlug;
                return (
                  <CommandItem
                    key={slug}
                    value={file.name}
                    keywords={fileKeywords(slug)}
                    onSelect={run(() =>
                      router.push(localizedPath(lang, file.path)),
                    )}
                  >
                    <FileIcon ext={file.ext} />
                    <span className="truncate">{file.name}</span>
                    {openFiles.includes(slug) && (
                      <span className="text-syntax-active">
                        <span aria-hidden="true">●</span>
                        <span className="sr-only">{dict.open}</span>
                      </span>
                    )}
                    <CommandShortcut>
                      {current ? dict.current : file.path}
                    </CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          <CommandGroup heading={dict.groups.commands}>
            <CommandItem
              value={`${dict.commands.language} ${switchLabel}`}
              onSelect={run(switchLanguage)}
            >
              {commandLabel(dict.commands.language, switchLabel)}
            </CommandItem>
            <CommandItem
              value={`${dict.commands.tabs} ${dict.commands.closeOthers}`}
              disabled={!activeSlug || openFiles.length <= 1}
              onSelect={run(() => {
                if (activeSlug) closeOthers(activeSlug);
              })}
            >
              {commandLabel(dict.commands.tabs, dict.commands.closeOthers)}
            </CommandItem>
            <CommandItem
              value={`${dict.commands.tabs} ${dict.commands.closeAll}`}
              onSelect={run(closeAllTabs)}
            >
              {commandLabel(dict.commands.tabs, dict.commands.closeAll)}
            </CommandItem>
          </CommandGroup>

          {!commandMode && (
            <CommandGroup heading={dict.groups.links}>
              {links.map((link) => (
                <CommandItem
                  key={link.id}
                  value={link.label}
                  onSelect={run(link.action)}
                >
                  {link.icon}
                  <span className="truncate">
                    {link.label}
                    {link.external && <span className="sr-only">{newTab}</span>}
                  </span>
                  {link.external && (
                    <CommandShortcut>
                      <ExternalLink size={12} aria-hidden="true" />
                    </CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <p className="hidden h-7 shrink-0 items-center border-t border-border px-3 text-xs text-muted-foreground sm:flex">
          {dict.hints}
        </p>
      </Command>
    </CommandDialog>
  );
}
