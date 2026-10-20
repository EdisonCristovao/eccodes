/**
 * Infraestrutura de idiomas (item 27). Dois idiomas, URLs sempre prefixadas
 * (`/en/...`, `/pt/...`); `en` é o padrão e o `x-default`.
 */
export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** `<html lang>`: o conteúdo em `pt` é PT-BR. */
export const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };
/** `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };
/** `hreflang` dos `<link rel="alternate">` e do sitemap. */
export const HREFLANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };

/** Cookie gravado pelo seletor de idioma: 1 ano, path=/, SameSite=Lax. */
export const LANG_COOKIE = "lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Grava a escolha de idioma no cookie `lang` (só no cliente). */
export function rememberLocale(to: Locale): void {
  document.cookie = `${LANG_COOKIE}=${to}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export const hasLocale = (value: string | undefined | null): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);

/** Prefixa um caminho lógico ("/", "/editor/bio") com o idioma: "/en", "/en/editor/bio". */
export const localizedPath = (lang: Locale, path: string): string =>
  `/${lang}${path === "/" ? "" : path}`;

/** Remove o prefixo de idioma de um pathname real: "/pt/editor/bio" → "/editor/bio"; "/pt" → "/". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (!hasLocale(first)) return pathname;
  const path = `/${rest.join("/")}`;
  return path === "/" || path === "" ? "/" : path.replace(/\/+$/, "");
}

/** Troca (ou acrescenta) o prefixo de idioma de um pathname, preservando o resto. */
export function swapLocale(pathname: string, to: Locale): string {
  return localizedPath(to, stripLocale(pathname));
}

/**
 * Escolhe o idioma de um pedido sem prefixo: cookie `lang` válido vence;
 * senão o primeiro `Accept-Language` (por q) que comece com `pt` → "pt",
 * com `en` → "en"; senão o padrão.
 */
export function pickLocale(
  acceptLanguage: string | null | undefined,
  cookie?: string | null,
): Locale {
  if (hasLocale(cookie)) return cookie;

  const candidates = (acceptLanguage ?? "")
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isNaN(quality) ? 0 : quality,
        index,
      };
    })
    .filter((c) => c.tag !== "" && c.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { tag } of candidates) {
    if (tag === "pt" || tag.startsWith("pt-")) return "pt";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return DEFAULT_LOCALE;
}

/** Idioma a partir dos `params` de page/generateMetadata (inválido → padrão). */
export async function localeFromParams(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  return hasLocale(lang) ? lang : DEFAULT_LOCALE;
}

/** Interpolação mínima: fill("// ref: {digest}", { digest }) — sem ICU. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
