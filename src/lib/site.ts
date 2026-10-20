import type { Metadata, ResolvingMetadata } from "next";
import { pages } from "@/dictionaries/pages";
import {
  DEFAULT_LOCALE,
  HREFLANG,
  LOCALES,
  OG_LOCALE,
  hasLocale,
  localizedPath,
  type Locale,
} from "@/lib/i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://edison.cristovao.codes";
export const SITE_NAME = "EC.c";
export const AUTHOR = "Edison Cristovão";
export { GITHUB_URL, LINKEDIN_URL } from "@/lib/navigation";
/** Valores em inglês (idioma padrão); por idioma, usar `pages[lang]`. */
export const JOB_TITLE = pages.en.jsonld.jobTitle;
export const DEFAULT_TITLE = pages.en.seo.defaultTitle;
export const DEFAULT_DESCRIPTION = pages.en.seo.description;

/** URL absoluta a partir de um caminho já prefixado ("/pt/editor"). */
export const absoluteUrl = (path: string): string => `${SITE_URL}${path}`;

/** Os outros idiomas além de `lang` (hoje, sempre um). */
export const otherLocales = (lang: Locale): Locale[] =>
  LOCALES.filter((locale) => locale !== lang);

/** Lê e valida o `lang` dos `params` de uma rota em `app/[lang]/`. */
export async function localeFromParams(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  return hasLocale(lang) ? lang : DEFAULT_LOCALE;
}

/** `og:locale` ("pt_BR") → Locale ("pt"); usado para herdar o idioma do layout. */
function localeFromOgLocale(ogLocale: string | undefined): Locale | undefined {
  return LOCALES.find((locale) => OG_LOCALE[locale] === ogLocale);
}

/**
 * `alternates.languages` de um caminho lógico: hreflang `en`, `pt-BR` e
 * `x-default` (= inglês). Com `metadataBase`, o Next torna as URLs absolutas.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [HREFLANG[locale], localizedPath(locale, path)]),
  );
  return { ...languages, "x-default": localizedPath(DEFAULT_LOCALE, path) };
}

/** Metadata do layout raiz de um idioma (title.default, description, OG, robots…). */
export function siteMetadata(lang: Locale): Metadata {
  const { seo } = pages[lang];
  const home = localizedPath(lang, "/");

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.defaultTitle, template: `%s | ${SITE_NAME}` },
    description: seo.description,
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    keywords: [
      "Edison Cristovão",
      pages[lang].jsonld.jobTitle.toLowerCase(),
      lang === "pt" ? "portfólio" : "portfolio",
      "React Native",
      "React",
      "TypeScript",
    ],
    alternates: { canonical: home, languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: otherLocales(lang).map((locale) => OG_LOCALE[locale]),
      url: home,
      title: seo.defaultTitle,
      description: seo.description,
    },
    // Só o card: title/description o Next deriva do openGraph de cada rota.
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

type PageMetadataInput = {
  /** Idioma da rota. Se omitido, herda o `og:locale` do layout (`parent`). */
  lang?: Locale;
  title: string;
  description: string;
  /** Caminho lógico, sem prefixo de idioma, ex.: "/editor/bio". */
  path: string;
};

/**
 * Metadata de uma página interna. O `openGraph` exportado por uma página
 * SUBSTITUI o do layout (o Next não mescla), o que perderia type, siteName,
 * locale e a imagem do opengraph-image.tsx. Por isso parte do `parent` já
 * resolvido e só sobrescreve title/description/url/locale.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  { lang, title, description, path }: PageMetadataInput,
): Promise<Metadata> {
  const { openGraph } = await parent;
  const locale =
    lang ?? localeFromOgLocale(openGraph?.locale) ?? DEFAULT_LOCALE;
  const url = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: openGraph?.siteName ?? SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: otherLocales(locale).map((other) => OG_LOCALE[other]),
      images: openGraph?.images,
      title,
      description,
      url,
    },
  };
}
