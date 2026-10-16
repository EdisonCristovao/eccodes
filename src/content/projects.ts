import type { PagesDictionary } from "@/dictionaries/pages";

export type ProjectSlug = keyof PagesDictionary["projects"]["items"];

export type ProjectItem = {
  slug: ProjectSlug;
  /** Nome "de arquivo" exibido acima do card (identificador; não se traduz). */
  name: string;
  /** Nome legível, usado no botão ("Go to {title}"). */
  title: string;
  img: string;
  techs: string[];
  /** Destino do botão. Sem URL (item 8 pendente) o botão fica sem ação. */
  url?: string;
};

/** Dados dos projetos; as descrições vivem em `pages[lang].projects.items`. */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "ongaia",
    name: "_ongaia",
    title: "OnGaia",
    img: "/imgs/projects/project-1.png",
    techs: ["next"],
  },
  {
    slug: "goodies",
    name: "_goodies",
    title: "Goodies",
    img: "/imgs/projects/project-2.png",
    techs: ["reactjs", "next"],
  },
];
