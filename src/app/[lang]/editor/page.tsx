import type { Metadata, ResolvingMetadata } from "next";
import CodeLine from "@/components/editor/CodeLine";
import EditorPane from "@/components/editor/EditorPane";
import { pages } from "@/dictionaries/pages";
import { EDITOR_FILES } from "@/lib/editor-files";
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

  // Prosa no pane (guia §5.4): um número por bloco lógico — 8 linhas.
  return (
    <EditorPane file={EDITOR_FILES.about}>
      <CodeLine kind="prose" className="mb-4">
        <h2 className="text-2xl font-medium text-foreground">{about.title}</h2>
      </CodeLine>
      {about.paragraphs.map((paragraph, index) => (
        <CodeLine key={`paragraph-${index}`} kind="prose" className="mb-4">
          <p className="text-base text-foreground">{paragraph}</p>
        </CodeLine>
      ))}
      <CodeLine kind="prose">
        <p className="text-base text-foreground">{about.signoff}</p>
      </CodeLine>
      <CodeLine kind="prose">
        <p className="text-base text-foreground">{about.signature}</p>
      </CodeLine>
    </EditorPane>
  );
}
