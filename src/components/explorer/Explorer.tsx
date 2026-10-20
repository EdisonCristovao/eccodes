"use client";

import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { LinkedinMark } from "@/components/BrandIcons";
import FileIcon from "@/components/editor/FileIcon";
import { File } from "@/components/explorer/File";
import { Section } from "@/components/explorer/Section";
import { ui, whatsappUrl } from "@/dictionaries/ui";
import { EDITOR_FILES, EXPLORER_ORDER } from "@/lib/editor-files";
import { DEFAULT_LOCALE, hasLocale, localizedPath } from "@/lib/i18n";
import { LINKEDIN_URL } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export type ExplorerProps = {
  className?: string;
  /** Dentro da gaveta mobile (alvos de 44px, Contact fechado por padrão). */
  inDrawer?: boolean;
};

/**
 * Explorer (guia §5.3): `<aside>` de 240px com as seções Contact e Files,
 * a partir do registro EDITOR_FILES. No mobile vive dentro do ExplorerDrawer.
 */
export default function Explorer({ className, inDrawer = false }: ExplorerProps) {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = ui[lang].explorer;

  return (
    <aside
      aria-label={dict.label}
      className={cn(
        "flex-col overflow-y-auto border-r border-border bg-background text-editor",
        inDrawer ? "w-full border-r-0" : "w-60 shrink-0",
        className,
      )}
    >
      <Section title={dict.contact} defaultOpen={!inDrawer}>
        <File
          href={`mailto:${dict.email}`}
          icon={<Mail size={16} aria-hidden="true" />}
          inDrawer={inDrawer}
        >
          {dict.email}
          <ExternalLink size={12} className="ml-2 inline" aria-hidden="true" />
        </File>
        <File
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.linkedinAria}
          icon={<LinkedinMark size={16} />}
          inDrawer={inDrawer}
        >
          {dict.linkedin}
          <ExternalLink size={12} className="ml-2 inline" aria-hidden="true" />
        </File>
        <File
          href={whatsappUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.whatsappAria}
          icon={<MessageCircle size={16} aria-hidden="true" />}
          inDrawer={inDrawer}
        >
          {dict.whatsapp}
          <ExternalLink size={12} className="ml-2 inline" aria-hidden="true" />
        </File>
      </Section>

      <Section title={dict.files} defaultOpen>
        {EXPLORER_ORDER.map((slug) => {
          const file = EDITOR_FILES[slug];
          return (
            <File
              key={slug}
              href={localizedPath(lang, file.path)}
              icon={<FileIcon ext={file.ext} />}
              inDrawer={inDrawer}
            >
              {file.name}
            </File>
          );
        })}
      </Section>
    </aside>
  );
}
