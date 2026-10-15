"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, isActivePath } from "@/lib/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 w-full items-center justify-between border border-border bg-background text-muted-foreground md:justify-start">
      <Logo />

      <nav aria-label="Main" className="hidden h-full md:flex">
        <ul className="flex h-full">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="flex h-full">
              <NavLink
                href={link.href}
                label={link.label}
                active={isActivePath(pathname, link.href)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu pathname={pathname} />
    </header>
  );
}
