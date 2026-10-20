import { stripLocale } from "@/lib/i18n";

/** Perfil no GitHub (client-safe: usado na status bar e na home). */
export const GITHUB_URL = "https://github.com/EdisonCristovao";

/** Perfil no LinkedIn (client-safe: explorer, status bar e JSON-LD). */
export const LINKEDIN_URL = "https://www.linkedin.com/in/edisoncristovao";

/** Caminhos lógicos (sem prefixo de idioma); o prefixo entra na renderização via `localizedPath`. */
export const NAV_LINKS = [
  { label: "_home", href: "/" },
  { label: "_about-me", href: "/editor" },
  { label: "_projects", href: "/projects" },
] as const;

/** Compara um pathname real ("/pt/editor/bio") com um caminho lógico ("/editor"). */
export function isActivePath(pathname: string, href: string): boolean {
  const path = stripLocale(pathname);
  return href === "/"
    ? path === "/"
    : path === href || path.startsWith(href + "/");
}
