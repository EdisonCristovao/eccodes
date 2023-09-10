"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { Files, Terminal, Cpu } from "lucide-react";
import { Folder } from "@/components/explorer/Folder";
import { File } from "@/components/explorer/File";
import { usePathname } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";

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
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-16 border-r border-lines h-full flex flex-col items-center">
        <Link href={"/editor"}>
          <Files
            data-active={pathName.includes("editor")}
            className="mb-7 mt-5 hover:text-white data-[active=true]:text-white"
          />
        </Link>
        {/* 
        <Link href={""}>
          <User className="mb-7 hover:text-white" />
        </Link>

        <Link href={""}>
          <Gamepad2 className="mb-7 hover:text-white" />
        </Link> */}
      </div>
      <div className="w-48 border-r border-lines h-full text-sm">
        <Folder
          title="Bio"
          onClick={() => handleSetFolderOpen("bio")}
          defaultOpen={openFiles.includes("bio")}
        >
          <File href="/editor/bio">
            <Terminal size={16} />
            General
          </File>
        </Folder>
        <Folder
          title="Terminal"
          onClick={() => handleSetFolderOpen("terminal")}
          defaultOpen={openFiles.includes("terminal")}
        >
          <File href="/editor/terminal">
            <Terminal size={16} />
            General
          </File>
        </Folder>

        <Folder
          title="Others"
          onClick={() => handleSetFolderOpen("others")}
          defaultOpen={openFiles.includes("others")}
        >
          <File href="/editor/others">
            <Cpu size={16} />
            dev.setup
          </File>
        </Folder>
      </div>
      <div className="flex grow">
        <Suspense fallback={<h1>Loading</h1>}>
          <div className="w-full border-r border-lines">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
