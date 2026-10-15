import type { Metadata, ResolvingMetadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://edison.cristovao.codes";
export const SITE_NAME = "EC.c";
export const AUTHOR = "Edison Cristovão";
export const JOB_TITLE = "Full-stack developer";
export const GITHUB_URL = "https://github.com/EdisonCristovao";
export const DEFAULT_TITLE = "EC.c — Edison Cristovão, Full-stack developer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Edison Cristovão, full-stack developer. A personal site built to look and feel like a code editor: projects, bio, terminal and dev setup.";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Caminho da rota, ex.: "/editor/bio". Vira canonical e og:url. */
  path: string;
};

/**
 * Metadata de uma página interna. O `openGraph` exportado por uma página
 * SUBSTITUI o do layout (o Next não mescla), o que perderia type, siteName,
 * locale e a imagem do opengraph-image.tsx. Por isso parte do `parent` já
 * resolvido e só sobrescreve title/description/url.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  { title, description, path }: PageMetadataInput,
): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: openGraph?.siteName ?? SITE_NAME,
      locale: openGraph?.locale ?? "en_US",
      images: openGraph?.images,
      title,
      description,
      url: path,
    },
  };
}
