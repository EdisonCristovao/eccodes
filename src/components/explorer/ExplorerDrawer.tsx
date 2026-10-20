"use client";

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { PanelLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Explorer from "@/components/explorer/Explorer";
import { ui } from "@/dictionaries/ui";
import { DEFAULT_LOCALE, hasLocale } from "@/lib/i18n";

/**
 * Explorer no mobile (guia §5.3, D9): gaveta `Sheet side="left"` de 280px,
 * aberta por um botão no início da TabBar (só <768px). Fecha ao navegar.
 * Contrato: default export sem props.
 */
export default function ExplorerDrawer() {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = ui[lang].explorer;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fecha ao mudar de rota (mesmo padrão do menu mobile: ajuste durante o render).
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={dict.open}
          // size-9 cabe na TabBar de 36px; o pseudo-elemento dá os 44px de toque.
          className="relative size-9 shrink-0 rounded-none border-r border-border md:hidden before:absolute before:-inset-1 before:content-['']"
        >
          <PanelLeft className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] max-w-none gap-0 border-border bg-background p-0 shadow-none"
      >
        <SheetTitle className="sr-only">{dict.label}</SheetTitle>
        <SheetDescription className="sr-only">{dict.files}</SheetDescription>
        {/* × próprio, numa faixa de 36px como a TabBar, com o rótulo do dicionário. */}
        <div className="flex h-9 shrink-0 items-center justify-end border-b border-border px-1">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={dict.close}
              className="relative size-9 before:absolute before:-inset-1 before:content-['']"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </SheetClose>
        </div>
        <Explorer inDrawer className="flex min-h-0 flex-1" />
      </SheetContent>
    </Sheet>
  );
}
