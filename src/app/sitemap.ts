import type { MetadataRoute } from "next";
import { LOCALES, localizedPath } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/site";

type Entry = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority"> & {
  path: string;
};

/** Caminhos lógicos; cada um vira uma URL por idioma. */
const ENTRIES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/editor", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/editor/bio", changeFrequency: "monthly", priority: 0.6 },
  { path: "/editor/terminal", changeFrequency: "monthly", priority: 0.6 },
  { path: "/editor/others", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ENTRIES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([hreflang, href]) => [
        hreflang,
        absoluteUrl(href),
      ]),
    );

    return LOCALES.map((lang) => ({
      url: absoluteUrl(localizedPath(lang, path)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
