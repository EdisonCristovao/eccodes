import type { Metadata, ResolvingMetadata } from "next";
import CodeFilePage from "@/components/CodeFilePage";
import { pages } from "@/dictionaries/pages";
import { FILES } from "@/lib/files";
import { localeFromParams, pageMetadata } from "@/lib/site";

type AboutProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(
  { params }: AboutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang = await localeFromParams(params);
  return pageMetadata(parent, {
    lang,
    ...pages[lang].seo.pages.editor,
    path: FILES.about.path,
  });
}

/** About como `about.md`: fonte markdown colorida pelo shiki, com gutter. */
export default async function AboutPage({ params }: AboutProps) {
  const lang = await localeFromParams(params);
  return <CodeFilePage slug="about" lang={lang} />;
}
