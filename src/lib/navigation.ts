export const NAV_LINKS = [
  { label: "_home", href: "/" },
  { label: "_about-me", href: "/editor" },
  { label: "_projects", href: "/projects" },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");
}
