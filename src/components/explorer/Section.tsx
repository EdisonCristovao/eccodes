"use client";

import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

type SectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Seção do explorer (guia §5.3): header h-8 em maiúsculas + chevron que gira 90°. */
export function Section({
  title,
  children,
  defaultOpen = false,
  onOpenChange,
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        onOpenChange?.(value);
      }}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="group h-8 w-full justify-start gap-1 rounded-none px-2 text-xs font-normal uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ChevronRight
            size={16}
            className="size-4 transition-transform duration-200 ease-out-expo group-data-[state=open]:rotate-90 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span>{title}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        <ul>{children}</ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
