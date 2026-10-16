"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./Logo";
import MobileMenuLink from "./MobileMenuLink";
import LanguageSwitcher from "./LanguageSwitcher";
import { ui } from "@/dictionaries/ui";
import { useMobileMenuOpen } from "@/hooks/useMobileMenu";
import { NAV_LINKS, isActivePath } from "@/lib/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";

type MobileMenuProps = {
  pathname: string;
  lang: Locale;
};

export default function MobileMenu({ pathname, lang }: MobileMenuProps) {
  const [open, setOpen] = useMobileMenuOpen();
  const dict = ui[lang].nav;
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={dict.openMenu}
          className="mr-3 md:hidden"
        >
          <Menu className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        aria-modal="true"
        showCloseButton={false}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          firstLinkRef.current?.focus();
        }}
        className="inset-0 flex h-dvh w-full max-w-none flex-col gap-0 border-0 bg-background p-0 shadow-none md:hidden data-[side=top]:h-dvh data-[side=top]:border-0 data-[state=open]:duration-200 data-[state=open]:ease-out-expo data-[state=open]:fade-in-0 data-[side=top]:data-[state=open]:slide-in-from-top-2 data-[state=closed]:duration-150 data-[state=closed]:ease-in data-[state=closed]:fade-out-0 data-[side=top]:data-[state=closed]:slide-out-to-top-2 motion-reduce:animate-none"
      >
        <SheetHeader className="h-14 flex-row items-center justify-between space-y-0 border-b border-border pr-6 py-0">
          <SheetTitle className="sr-only">{dict.menuTitle}</SheetTitle>
          <SheetDescription className="sr-only">
            {dict.menuDescription}
          </SheetDescription>
          <SheetClose asChild>
            <Logo lang={lang} />
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={dict.closeMenu}
              className="-mr-3 animate-in spin-in-90 fade-in-0 duration-200 motion-reduce:animate-none"
            >
              <X className="size-6" aria-hidden />
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav aria-label={dict.mobile} className="flex flex-col overflow-y-auto">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <MobileMenuLink
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={localizedPath(lang, link.href)}
                  label={link.label}
                  index={index}
                  active={isActivePath(pathname, link.href)}
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Provisório: vai para a status bar no item 20. */}
        <LanguageSwitcher lang={lang} variant="sheet" />
      </SheetContent>
    </Sheet>
  );
}
