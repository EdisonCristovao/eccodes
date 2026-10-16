import type { Metadata, ResolvingMetadata } from "next";
import { pages } from "@/dictionaries/pages";
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
    path: "/editor",
  });
}

export default async function AboutPage({ params }: AboutProps) {
  const lang = await localeFromParams(params);
  const { about } = pages[lang];

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <div className="px-5 md:px-0 mt-5 md:mt-0 md:w-1/2">
        <h2 className="mb-4">{about.title}</h2>
        {about.paragraphs.map((paragraph, index) => (
          <p key={`paragraph-${index}`} className="mb-4">
            {paragraph}
          </p>
        ))}
        <p>{about.signoff}</p>
        <p>{about.signature}</p>
      </div>
    </div>
  );
}
