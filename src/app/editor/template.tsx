"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { Files, Terminal, Cpu, Mail, Phone } from "lucide-react";
import { Folder } from "@/components/explorer/Folder";
import { File } from "@/components/explorer/File";
import { usePathname } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import { Section } from "@/components/explorer/Section";

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
    <div className="flex ml-[2px] grow text-secondary-grey md:flex-row flex-col">
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
      <div className="md:w-60 w-full border-r border-lines h-full text-sm md:block">
        <Section title="Contact" onClick={() => {}} defaultOpen>
          <File href="">
            <Mail size={16} />
            Edison@cristovao.codes
          </File>
          <File href="">
            <Phone size={16} />
            +55 (48) 998080084
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
      <div className="flex grow">
        <Suspense fallback={<h1>Loading</h1>}>
          <div className="w-full border-r border-lines">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
