import type { Metadata, ResolvingMetadata } from "next";
import CodeFilePage from "@/components/CodeFilePage";
import { pages } from "@/dictionaries/pages";
import { FILES } from "@/lib/files";
import { localeFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang = await localeFromParams(params);
  const seo = pages[lang].seo.pages.terminal;
  const input = {
    lang,
    title: seo.title,
    description: seo.description,
    path: FILES.terminal.path,
  };
  return pageMetadata(parent, input);
}

export default async function Page({ params }: Props) {
  const lang = await localeFromParams(params);
  return <CodeFilePage slug="terminal" lang={lang} />;
}
