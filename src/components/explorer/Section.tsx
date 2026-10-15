"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onClick(): void;
}

export function Section({
  title,
  children,
  defaultOpen = false,
  onClick,
}: SectionProps) {
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
          className="group w-full justify-start gap-2 rounded-none h-auto px-2 py-2 font-normal text-foreground border-x-transparent border-y-border"
        >
          <ChevronRight
            size={20}
            className="size-5 transition-transform duration-200 ease-out-expo group-data-[state=open]:rotate-90 motion-reduce:transition-none"
            aria-hidden
          />
          <span className="text-sm">{title}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="my-2 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
