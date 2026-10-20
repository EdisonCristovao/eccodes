import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import CodeLine from "@/components/editor/CodeLine";
import EditorPane from "@/components/editor/EditorPane";
import Token from "@/components/editor/Token";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/dictionaries/pages";
import { EDITOR_FILES } from "@/lib/editor-files";
import { HTML_LANG, localizedPath } from "@/lib/i18n";
import {
  AUTHOR,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
  localeFromParams,
} from "@/lib/site";

type HomeProps = {
  params: Promise<{ lang: string }>;
};

// Não se traduzem. STACK é a linha 8 do home.tsx; KNOWS_ABOUT, a stack
// completa do perfil para o JSON-LD.
const STACK = ["React Native", "React", "TypeScript", "Node.js"];
const KNOWS_ABOUT = [
  "React Native",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Redux",
  "Material UI",
  "PostgreSQL",
  "Git",
];

const PHOTO = { src: "/imgs/profile-photo.png", width: 1024, height: 1214 };

export default async function Home({ params }: HomeProps) {
  const lang = await localeFromParams(params);
  const { home, jsonld } = pages[lang];

  // Mesmo @id nos dois idiomas: é a mesma pessoa; muda o idioma da página.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR,
    url: `${SITE_URL}${localizedPath(lang, "/")}`,
    inLanguage: HTML_LANG[lang],
    jobTitle: jsonld.jobTitle,
    image: `${SITE_URL}${PHOTO.src}`,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Braga",
      addressCountry: "PT",
    },
  };

  // A home é o arquivo home.tsx (item 4): o tamanho da fonte e a coluna de
  // preview seguem a largura do pane (@container), não a do viewport.
  return (
    <EditorPane file={EDITOR_FILES.home}>
      <JsonLd data={personJsonLd} />
      <div className="@container flex min-h-full">
        {/* `[&_*]`: span/a/h1 têm font-size fixo no @layer base; aqui herdam da linha.
            counter-reset: o @container tem contenção de estilo, que isola o
            contador `line` do .editor-body; o gutter reinicia aqui dentro. */}
        <div className="min-w-0 flex-1 pr-6 [counter-reset:line] text-sm leading-6 @lg:text-base @lg:leading-7 @3xl:text-lg @3xl:leading-8 [&_*]:text-[length:inherit]">
          <CodeLine kind="comment" wrap>
            {home.siteComment}
          </CodeLine>
          <CodeLine wrap>
            <Token kind="keyword">import</Token> <Token kind="name">photo</Token>{" "}
            <Token kind="keyword">from</Token>{" "}
            <Token kind="string">&quot;./profile-photo.png&quot;</Token>;
            {/* Decoração de editor no pane estreito; a foto "de verdade" é o preview. */}
            <Image
              src={PHOTO.src}
              width={19}
              height={22}
              alt=""
              aria-hidden="true"
              sizes="22px"
              loading="lazy"
              className="ml-3 inline-block h-[1.25em] w-auto align-[-0.25em] @5xl:hidden"
            />
          </CodeLine>
          <CodeLine wrap />
          <CodeLine kind="comment" wrap>
            {home.greeting}
          </CodeLine>
          <CodeLine wrap>
            <Token kind="keyword">const</Token> <Token kind="name">developer</Token> ={" "}
            {"{"}
          </CodeLine>
          <CodeLine indent={1} wrap>
            name: <Token kind="string">&quot;</Token>
            <h1 className="inline font-bold text-syntax-string">{AUTHOR}</h1>
            <Token kind="string">&quot;</Token>,
          </CodeLine>
          <CodeLine indent={1} wrap>
            role: <Token kind="string">&quot;{home.role}&quot;</Token>,
          </CodeLine>
          <CodeLine indent={1} wrap>
            stack: [
            {STACK.map((tech, index) => (
              <span key={tech}>
                {index > 0 && ", "}
                <Token kind="string">&quot;{tech}&quot;</Token>
              </span>
            ))}
            ],
          </CodeLine>
          <CodeLine indent={1} wrap>
            github: <Token kind="string">&quot;</Token>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-syntax-string underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {GITHUB_URL}
              <span className="sr-only">{home.newTab}</span>
            </a>
            <Token kind="string">&quot;</Token>,
          </CodeLine>
          <CodeLine indent={1} wrap>
            <Token kind="name">photo</Token>,
          </CodeLine>
          <CodeLine wrap>{"};"}</CodeLine>
          <CodeLine wrap />
          <CodeLine current wrap>
            <Token kind="keyword">export</Token> <Token kind="keyword">default</Token>{" "}
            <Token kind="name">developer</Token>;
            <span
              aria-hidden="true"
              className="ml-px inline-block h-[1.15em] w-[2px] translate-y-[0.15em] animate-cursor-blink bg-syntax-active motion-reduce:animate-none"
            />
          </CodeLine>
        </div>

        {/* Pane largo: preview da imagem importada, como no VS Code. */}
        <aside
          aria-label={home.previewLabel}
          className="hidden w-[300px] shrink-0 flex-col border-l border-border @5xl:flex"
        >
          <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-border px-4 text-xs text-muted-foreground">
            <ImageIcon size={12} aria-hidden="true" />
            <span className="text-xs">profile-photo.png</span>
            <span className="text-xs">
              · {PHOTO.width} × {PHOTO.height}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center p-6">
            <Image
              src={PHOTO.src}
              width={PHOTO.width}
              height={PHOTO.height}
              alt={AUTHOR}
              sizes="240px"
              loading="lazy"
              className="h-auto w-full max-w-60"
            />
          </div>
        </aside>
      </div>
    </EditorPane>
  );
}
