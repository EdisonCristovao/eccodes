"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight, Folder as FolderIcon } from "lucide-react";
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
    <Collapsible
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        onClick();
      }}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="group w-full justify-start gap-2 rounded-none h-auto px-2 py-1 font-normal text-muted-foreground border border-transparent"
        >
          <ChevronRight
            size={20}
            className="size-5 transition-transform duration-200 ease-out-expo group-data-[state=open]:rotate-90 motion-reduce:transition-none"
            aria-hidden
          />

          <FolderIcon size={16} className="size-4" aria-hidden />

          <span className="text-sm">{title}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
