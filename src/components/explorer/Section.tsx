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
  /** Controlado (explorer do desktop, lembrado na sessão); sem ele, estado local. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Seção do explorer (guia §5.3): header h-8 em maiúsculas + chevron que gira 90°. */
export function Section({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
}: SectionProps) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = open ?? localOpen;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(value) => {
        setLocalOpen(value);
        onOpenChange?.(value);
      }}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          // Foco do guia (outline laranja por dentro, igual aos itens), sem o halo do
          // Button. `outline-solid`: o `outline-none` do Button zera o --tw-outline-style.
          className="group h-8 w-full justify-start gap-1 rounded-none px-2 text-xs font-normal uppercase tracking-wider text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring"
        >
          <ChevronRight
            size={16}
            className="size-4 transition-transform duration-200 ease-out-expo group-data-[state=open]:rotate-90 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="text-xs">{title}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        <ul>{children}</ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
