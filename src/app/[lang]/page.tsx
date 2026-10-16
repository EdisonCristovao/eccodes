import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/dictionaries/pages";
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

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center text-foreground grow mx-10 my-5 md:my-0">
      <JsonLd data={personJsonLd} />
      <div className="flex flex-col justify-around h-[80%] md:h-0 mt-40 md:mt-0">
        <div className="mb-10">
          <p className="text-lg md:text-lg">{home.greeting}</p>
          <h1 className="text-6xl md:text-7xl ml-[-8px] my-[-8px]">
            {home.name}
          </h1>
          <h2 className="text-base md:text-3xl text-secondary-blue">
            {home.role}
          </h2>
        </div>

        <div>
          <h3 className="text-sm md:text-base">{home.githubComment}</h3>
          <div>
            <span className="text-secondary-blue text-sm md:text-base">
              const
            </span>{" "}
            <span className="text-accent-green text-sm md:text-base">
              {home.githubVar}
            </span>
            {" = "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-nude hover:underline text-sm md:text-base focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            >
              {`"${GITHUB_URL}"`}
            </a>
          </div>
        </div>
      </div>

      <div className="hidden md:inline">
        <Image
          src={"/imgs/profile-photo.png"}
          width={500}
          height={593}
          alt={AUTHOR}
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
