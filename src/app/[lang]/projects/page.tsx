import type { Metadata, ResolvingMetadata } from "next";
import { Fragment, type ReactNode } from "react";
import CodeLine from "@/components/editor/CodeLine";
import EditorPane from "@/components/editor/EditorPane";
import Token from "@/components/editor/Token";
import { EXPERIENCE, formatPeriod, type ExperienceEntry } from "@/content/experience";
import { pages } from "@/dictionaries/pages";
import type { Locale } from "@/lib/i18n";
import { EDITOR_FILES } from "@/lib/editor-files";
import { localeFromParams, pageMetadata } from "@/lib/site";

type ProjectsProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(
  { params }: ProjectsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang = await localeFromParams(params);
  return pageMetadata(parent, {
    lang,
    ...pages[lang].seo.pages.projects,
    path: "/projects",
  });
}

/** `"chave": ` — propriedade JSON em verde, como no VS Code. */
const Key = ({ name }: { name: string }) => (
  <>
    <Token kind="name">&quot;{name}&quot;</Token>:{" "}
  </>
);

const Str = ({ children }: { children: ReactNode }) => (
  <Token kind="string">&quot;{children}&quot;</Token>
);

/** Vírgula depois de cada item, menos do último (o JSON tem de ser válido). */
const comma = (index: number, length: number) => (index < length - 1 ? "," : "");

/** Campos de uma linha só, na ordem do JSON; `highlights` (várias linhas) fica à parte. */
function inlineFields(entry: ExperienceEntry, lang: Locale) {
  return [
    {
      key: "company",
      value: (
        <>
          <Token kind="string">&quot;</Token>
          <h2 className="inline font-bold text-syntax-string">{entry.company}</h2>
          <Token kind="string">&quot;</Token>
        </>
      ),
    },
    ...(entry.client ? [{ key: "client", value: <Str>{entry.client}</Str> }] : []),
    { key: "role", value: <Str>{entry.role[lang]}</Str> },
    { key: "period", value: <Str>{formatPeriod(entry.start, entry.end, lang)}</Str> },
    { key: "location", value: <Str>{entry.location[lang]}</Str> },
  ];
}

export default async function ProjectsPage({ params }: ProjectsProps) {
  const lang = await localeFromParams(params);
  const { seo } = pages[lang];

  // A experiência (item 8) como um projects.json de verdade: o texto das
  // linhas é JSON válido. Mesmo wrapper da home (@container + counter-reset).
  return (
    <EditorPane file={EDITOR_FILES.projects}>
      <h1 className="sr-only">{seo.pages.projects.title}</h1>
      <div className="@container">
        {/* `[&_*]`: span/h2 têm font-size fixo no @layer base; aqui herdam da linha.
            counter-reset: o @container isola o contador `line` do .editor-body. */}
        <div className="min-w-0 pr-6 [counter-reset:line] text-sm leading-6 text-syntax-punct @3xl:text-base @3xl:leading-7 [&_*]:text-[length:inherit]">
          <CodeLine wrap>{"{"}</CodeLine>
          <CodeLine indent={1} wrap>
            <Key name="experience" />[
          </CodeLine>
          {EXPERIENCE.map((entry, entryIndex) => {
            const hasStack = entry.stack.length > 0;
            return (
              <Fragment key={entry.id}>
                <CodeLine indent={2} wrap>
                  {"{"}
                </CodeLine>
                {inlineFields(entry, lang).map((field) => (
                  <CodeLine key={field.key} indent={3} wrap>
                    <Key name={field.key} />
                    {field.value},
                  </CodeLine>
                ))}
                <CodeLine indent={3} wrap>
                  <Key name="highlights" />[
                </CodeLine>
                {entry.highlights.map((highlight, index) => (
                  <CodeLine key={highlight.en} indent={4} wrap>
                    <Str>{highlight[lang]}</Str>
                    {comma(index, entry.highlights.length)}
                  </CodeLine>
                ))}
                <CodeLine indent={3} wrap>
                  ]{hasStack && ","}
                </CodeLine>
                {hasStack && (
                  <CodeLine indent={3} wrap>
                    <Key name="stack" />[
                    {entry.stack.map((tech, index) => (
                      <Fragment key={tech}>
                        <Str>{tech}</Str>
                        {index < entry.stack.length - 1 && ", "}
                      </Fragment>
                    ))}
                    ]
                  </CodeLine>
                )}
                <CodeLine indent={2} wrap>
                  {"}"}
                  {comma(entryIndex, EXPERIENCE.length)}
                </CodeLine>
              </Fragment>
            );
          })}
          <CodeLine indent={1} wrap>
            ]
          </CodeLine>
          <CodeLine wrap>{"}"}</CodeLine>
        </div>
      </div>
    </EditorPane>
  );
}
