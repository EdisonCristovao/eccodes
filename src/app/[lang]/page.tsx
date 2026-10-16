import Image from "next/image";
import EditorPane from "@/components/editor/EditorPane";
import Token from "@/components/editor/Token";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/dictionaries/pages";
import { EDITOR_FILES } from "@/lib/editor-files";
import { HTML_LANG, localizedPath } from "@/lib/i18n";
import { AUTHOR, GITHUB_URL, SITE_URL, localeFromParams } from "@/lib/site";

type HomeProps = {
  params: Promise<{ lang: string }>;
};

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
    image: `${SITE_URL}/imgs/profile-photo.png`,
    sameAs: [GITHUB_URL],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js"],
  };

  // Só "encaixa no pane" (D5): o conteúdo da home é o item 4.
  return (
    <EditorPane
      file={EDITOR_FILES.home}
      gutter="none"
      // Abaixo de lg o arquivo começa no topo (guia §1); a linha texto + foto só ≥1024,
      // onde o pane (viewport − explorer 240px) comporta as duas colunas.
      bodyClassName="flex flex-col gap-10 py-6 lg:flex-row lg:items-center lg:justify-center"
    >
      <JsonLd data={personJsonLd} />
      <div className="flex min-w-0 flex-col gap-8 text-foreground">
        <div className="min-w-0">
          <p className="text-lg">{home.greeting}</p>
          <h1 className="text-5xl font-bold tracking-tight break-words sm:text-6xl lg:text-7xl">
            {home.name}
          </h1>
          <h2 className="text-base text-syntax-keyword lg:text-3xl">
            {home.role}
          </h2>
        </div>

        <div className="min-w-0 text-sm lg:text-base">
          <p className="text-syntax-comment">{home.githubComment}</p>
          <p>
            <Token kind="keyword">const</Token>{" "}
            <Token kind="name">{home.githubVar}</Token>
            {" = "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-syntax-string break-all hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            >
              {`"${GITHUB_URL}"`}
            </a>
          </p>
        </div>
      </div>

      <div className="hidden min-w-0 lg:block lg:max-w-[40%]">
        <Image
          src={"/imgs/profile-photo.png"}
          width={500}
          height={593}
          alt={AUTHOR}
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 40vw, 0px"
          className="h-auto w-full"
        />
      </div>
    </EditorPane>
  );
}
