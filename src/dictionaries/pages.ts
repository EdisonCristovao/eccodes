import "server-only";
import type { Locale } from "@/lib/i18n";

/**
 * Textos das páginas, SEO, OG e JSON-LD (só servidor — não importar em
 * client components). `en` é a fonte de verdade; `pt` é checado com
 * `satisfies`. Nomes de arquivo (Bio, Terminal, dev.setup), identificadores e
 * código não se traduzem. Interpolação com `fill()` ({name}).
 */
const en = {
  home: {
    siteComment: "// edison.cristovao.codes",
    greeting: "// Hi all, I am",
    role: "Mobile & full-stack developer",
    newTab: " (opens in a new tab)",
    previewLabel: "profile-photo.png preview",
  },
  seo: {
    defaultTitle: "EC.c — Edison Cristovão, Mobile & full-stack developer",
    description:
      "Portfolio of Edison Cristovão, mobile and full-stack developer (React Native, React, TypeScript, Node.js). A personal site that looks and feels like a code editor: about, experience, bio and dev setup.",
    pages: {
      editor: {
        title: "About me",
        description:
          "About Edison Cristovão: mobile and full-stack developer with 10+ years of experience, currently at TED and open to remote roles.",
      },
      bio: {
        title: "Bio",
        description:
          "Edison Cristovão's bio as a code file: background, stack and what he's working on.",
      },
      terminal: {
        title: "Terminal",
        description:
          "Edison Cristovão's terminal setup: shell, prompt and tools.",
      },
      others: {
        title: "dev.setup",
        description:
          "Edison Cristovão's dev setup: editor, extensions, fonts and configs.",
      },
      projects: {
        title: "Experience",
        description:
          "Edison Cristovão's work experience as a JSON file: TED, Popstand, Supero, GETMORE and CIASC — React Native, React, TypeScript and Node.js.",
      },
    },
  },
  og: {
    alt: "EC.c — Edison Cristovão, Mobile & full-stack developer",
    role: "Mobile & full-stack developer",
  },
  jsonld: {
    jobTitle: "Mobile & full-stack developer",
  },
};

export type PagesDictionary = typeof en;

const pt = {
  home: {
    siteComment: "// edison.cristovao.codes",
    greeting: "// Olá, eu sou",
    role: "Desenvolvedor mobile e full stack",
    newTab: " (abre em nova aba)",
    previewLabel: "pré-visualização de profile-photo.png",
  },
  seo: {
    defaultTitle: "EC.c — Edison Cristovão, desenvolvedor mobile e full stack",
    description:
      "Portfólio de Edison Cristovão, desenvolvedor mobile e full stack (React Native, React, TypeScript, Node.js). Um site pessoal com cara de editor de código: sobre, experiência, bio e setup.",
    pages: {
      editor: {
        title: "Sobre mim",
        description:
          "Sobre Edison Cristovão: desenvolvedor mobile e full stack com mais de 10 anos de experiência, hoje no TED e aberto a oportunidades remotas.",
      },
      bio: {
        title: "Bio",
        description:
          "A bio de Edison Cristovão como um arquivo de código: trajetória, stack e no que ele está trabalhando.",
      },
      terminal: {
        title: "Terminal",
        description:
          "O terminal de Edison Cristovão: shell, prompt e ferramentas.",
      },
      others: {
        title: "dev.setup",
        description:
          "O setup de desenvolvimento de Edison Cristovão: editor, extensões, fontes e configurações.",
      },
      projects: {
        title: "Experiência",
        description:
          "A experiência profissional de Edison Cristovão como um arquivo JSON: TED, Popstand, Supero, GETMORE e CIASC — React Native, React, TypeScript e Node.js.",
      },
    },
  },
  og: {
    alt: "EC.c — Edison Cristovão, desenvolvedor mobile e full stack",
    role: "Desenvolvedor mobile e full stack",
  },
  jsonld: {
    jobTitle: "Desenvolvedor mobile e full stack",
  },
} satisfies PagesDictionary;

export const pages = { en, pt } as const satisfies Record<
  Locale,
  PagesDictionary
>;
