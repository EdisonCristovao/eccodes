"use client";

import { useParams, usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { ui } from "@/dictionaries/ui";
import { NAV_LINKS, isActivePath } from "@/lib/navigation";
import { DEFAULT_LOCALE, hasLocale, localizedPath } from "@/lib/i18n";

export default function Nav() {
  const pathname = usePathname();
  const params = useParams<{ lang: string }>();
  const lang = hasLocale(params.lang) ? params.lang : DEFAULT_LOCALE;

  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background text-muted-foreground md:justify-start">
      <Logo lang={lang} />

      <nav aria-label={ui[lang].nav.main} className="hidden h-full md:flex">
        <ul className="flex h-full">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="flex h-full">
              <NavLink
                href={localizedPath(lang, link.href)}
                label={link.label}
                active={isActivePath(pathname, link.href)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu pathname={pathname} lang={lang} />
    </header>
  );
}
