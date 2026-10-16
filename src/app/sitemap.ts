import type { MetadataRoute } from "next";
import {
  EDITOR_FILES,
  EXPLORER_ORDER,
  type FileSlug,
} from "@/lib/editor-files";
import { LOCALES, localizedPath } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/site";

type Hints = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">;

/** Frequência/prioridade por arquivo; os caminhos vêm do registro único. */
const HINTS: Record<FileSlug, Hints> = {
  home: { changeFrequency: "weekly", priority: 1 },
  about: { changeFrequency: "monthly", priority: 0.8 },
  projects: { changeFrequency: "weekly", priority: 0.8 },
  bio: { changeFrequency: "monthly", priority: 0.6 },
  terminal: { changeFrequency: "monthly", priority: 0.6 },
  others: { changeFrequency: "monthly", priority: 0.6 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return EXPLORER_ORDER.flatMap((slug) => {
    const { path } = EDITOR_FILES[slug];
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([hreflang, href]) => [
        hreflang,
        absoluteUrl(href),
      ]),
    );

    return LOCALES.map((lang) => ({
      url: absoluteUrl(localizedPath(lang, path)),
      lastModified,
      ...HINTS[slug],
      alternates: { languages },
    }));
  });
}
