import Image from "next/image";
import Link from "next/link";
import React from "react";
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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-16 border-r border-lines h-full flex flex-col items-center">
        <Link href={""}>
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
          <File href="/terminal/general">
            <Terminal size={16} />
            General
          </File>
          <File href="/terminal/fish">
            <Cog size={16} />
            config.fish
          </File>
        </Folder>

        <Folder title="Others">
          <File href="/others/dev-setup">
            <Cpu size={16} />
            dev.setup
          </File>
          <File href="/others/gaming-setup">
            <Joystick size={16} />
            gaming.setup
          </File>
        </Folder>
      </div>
      <div className="flex grow">
        <div className="w-full border-r border-lines">{children}</div>
      </div>
    </div>
  );
}
