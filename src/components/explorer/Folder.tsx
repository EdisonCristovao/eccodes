"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, Folder as FolderIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface FolderProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onClick(): void;
}

export function Folder({
  title,
  children,
  defaultOpen = false,
  onClick,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        onClick();
      }}
    >
      <Collapsible.Trigger className="flex items-center gap-2 px-2 py-1 w-full border border-transparent hover:text-white">
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}

        <FolderIcon size={16} />

        <span className="text-sm">{title}</span>
      </Collapsible.Trigger>

      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
}
