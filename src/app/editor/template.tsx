import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import {
  Files,
  User,
  Gamepad2,
  Terminal,
  Cog,
  Cpu,
  Joystick,
} from "lucide-react";
import { Folder } from "@/components/explorer/Folder";
import { File } from "@/components/explorer/File";

export default async function template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-16 border-r border-lines h-full flex flex-col items-center">
        <Link href={"/editor"}>
          <Files className="mb-7  mt-5 hover:text-white" />
        </Link>

        <Link href={""}>
          <User className="mb-7 hover:text-white" />
        </Link>

        <Link href={""}>
          <Gamepad2 className="mb-7 hover:text-white" />
        </Link>
      </div>
      <div className="w-48 border-r border-lines h-full text-sm">
        <Folder title="Bio">
          <File href="/editor/bio">
            <Terminal size={16} />
            General
          </File>
        </Folder>
        <Folder title="Terminal">
          <File href="/editor/terminal">
            <Terminal size={16} />
            General
          </File>
        </Folder>

        <Folder title="Others">
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
