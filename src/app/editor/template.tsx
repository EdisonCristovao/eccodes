"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { Files, Terminal, Cpu, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { Folder } from "@/components/explorer/Folder";
import { File } from "@/components/explorer/File";
import { usePathname } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import { Section } from "@/components/explorer/Section";
import Loading from "./loading";

export default function Template({ children }: { children: React.ReactNode }) {
  const { openFiles, markFileAsOpen, closeFile } = useOpenFiles();
  const pathName = usePathname();

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
        <Section title="Contact" onClick={() => {}} defaultOpen>
          <File href="mailto:edison@cristovao.codes">
            <Mail size={16} aria-hidden />
            edison@cristovao.codes
            <ExternalLink size={12} className="ml-auto" aria-hidden />
          </File>
          <File
            href="https://wa.me/351924738990?text=Hi%20Edison%21%20I%20found%20you%20through%20your%20website%20%28edison.cristovao.codes%29%20and%20I%27d%20like%20to%20talk."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Edison on WhatsApp (opens in a new tab)"
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp
            <ExternalLink size={12} className="ml-auto" aria-hidden />
          </File>
        </Section>

        <Section title="More" onClick={() => {}} defaultOpen>
          <File href="/editor/bio">
            <Terminal size={16} />
            Bio
          </File>
          <File href="/editor/terminal">
            <Terminal size={16} />
            Terminal
          </File>
          <File href="/editor/others">
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
