"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { Files, Terminal, Cpu, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { Folder } from "@/components/explorer/Folder";
import { File } from "@/components/explorer/File";
import { useParams, usePathname } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import { Section } from "@/components/explorer/Section";
import Loading from "./loading";
import { DEFAULT_LOCALE, hasLocale, localizedPath } from "@/lib/i18n";
import { ui, whatsappUrl } from "@/dictionaries/ui";

export default function Template({ children }: { children: React.ReactNode }) {
  const { openFiles, markFileAsOpen, closeFile } = useOpenFiles();
  const pathName = usePathname();
  const params = useParams<{ lang: string }>();
  const lang = hasLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = ui[lang].explorer;

  const handleSetFolderOpen = (file: string) => {
    if (openFiles.includes(file)) {
      closeFile(file);
      return;
    }
    markFileAsOpen(file);
  };

  return (
    <div className="flex min-w-0 grow text-muted-foreground md:flex-row flex-col">
      {/* <div className="w-16 border-r border-lines h-full hidden md:flex flex-col items-center">
        <Link href={"/editor"}>
          <Files
            data-active={pathName.includes("editor")}
            className="mb-7 mt-5 hover:text-white data-[active=true]:text-white"
          />
        </Link> */}
      {/* 
        <Link href={""}>
          <User className="mb-7 hover:text-white" />
        </Link>

        <Link href={""}>
          <Gamepad2 className="mb-7 hover:text-white" />
        </Link> */}
      {/* </div> */}
      <div className="md:w-60 w-full min-w-0 border-r border-border h-full text-sm md:block">
        <Section title={dict.contact} onClick={() => {}} defaultOpen>
          <File href={`mailto:${dict.email}`}>
            <Mail size={16} aria-hidden />
            {dict.email}
            <ExternalLink size={12} className="ml-auto" aria-hidden />
          </File>
          <File
            href={whatsappUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.whatsappAria}
          >
            <MessageCircle size={16} aria-hidden />
            {dict.whatsapp}
            <ExternalLink size={12} className="ml-auto" aria-hidden />
          </File>
        </Section>

        <Section title={dict.more} onClick={() => {}} defaultOpen>
          <File href={localizedPath(lang, "/editor/bio")}>
            <Terminal size={16} />
            Bio
          </File>
          <File href={localizedPath(lang, "/editor/terminal")}>
            <Terminal size={16} />
            Terminal
          </File>
          <File href={localizedPath(lang, "/editor/others")}>
            <Cpu size={16} />
            dev.setup
          </File>
        </Section>
      </div>
      <div className="flex min-w-0 grow">
        <Suspense fallback={<Loading />}>
          <div className="w-full min-w-0 border-r border-border">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
