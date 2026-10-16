import type { Locale } from "@/lib/i18n";

/**
 * Textos das páginas, SEO, OG e JSON-LD (só servidor — não importar em
 * client components). `en` é a fonte de verdade; `pt` é checado com
 * `satisfies`. Nomes de arquivo (Bio, Terminal, dev.setup), identificadores e
 * código não se traduzem. Interpolação com `fill()` ({name}).
 */
const en = {
  home: {
    greeting: "Hi all, I am",
    name: "Edison Cristovão",
    role: "> Full-stack developer",
    githubComment: "// you can also see it on my Github",
    githubVar: "githubLink",
  },
  about: {
    title: "Explore My Profile!",
    paragraphs: [
      "I am thrilled to invite you to explore my profile and discover the world of my personal configurations. 🚀✨",
      "On my website, you will have the opportunity to delve into the essence of who I am and the unique settings I have crafted.",
      "Feel free to navigate through the pages, explore the content, and experience the essence of my personal configurations.",
      "Your feedback and thoughts are always appreciated and welcomed.",
      "Thank you for joining me on this exciting journey! 🌟",
    ],
    signoff: "Warm regards,",
    signature: "Edison Cristovão",
  },
  projects: {
    title: "Projects",
    open: "Go to {name}",
    stack: "stack",
    items: {
      ongaia: {
        description: "Duis aute irure dolor in velit esse cillum dolore.",
      },
      goodies: {
        description: "Duis aute irure dolor in velit esse cillum dolore.",
      },
    },
  },
  seo: {
    defaultTitle: "EC.c — Edison Cristovão, Full-stack developer",
    description:
      "Portfolio of Edison Cristovão, full-stack developer. A personal site built to look and feel like a code editor: projects, bio, terminal and dev setup.",
    pages: {
      editor: {
        title: "About me",
        description:
          "Who Edison Cristovão is: a full-stack developer sharing his profile, bio, terminal and dev setup in a code-editor-like site.",
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
        title: "Projects",
        description:
          "Projects by Edison Cristovão, full-stack developer — built with React, Next.js and TypeScript.",
      },
    },
  },
  og: {
    alt: "EC.c — Edison Cristovão, Full-stack developer",
    role: "Full-stack developer",
  },
  jsonld: {
    jobTitle: "Full-stack developer",
  },
};

export type PagesDictionary = typeof en;

const pt = {
  home: {
    greeting: "Olá, eu sou",
    name: "Edison Cristovão",
    role: "> Desenvolvedor full-stack",
    githubComment: "// você também pode me encontrar no GitHub",
    githubVar: "githubLink",
  },
  about: {
    title: "Explore meu perfil!",
    paragraphs: [
      "Que bom ter você por aqui. Este site é um convite para conhecer meu trabalho e as configurações que uso no dia a dia.",
      "Nas páginas ao lado você encontra um pouco de quem eu sou e o ambiente que montei para programar: terminal, editor e ferramentas.",
      "Navegue à vontade, abra os arquivos e veja como as coisas funcionam por aqui.",
      "Feedback e ideias são sempre bem-vindos.",
      "Obrigado pela visita!",
    ],
    signoff: "Um abraço,",
    signature: "Edison Cristovão",
  },
  projects: {
    title: "Projetos",
    open: "Abrir {name}",
    stack: "stack",
    items: {
      ongaia: {
        description: "Descrição em breve.",
      },
      goodies: {
        description: "Descrição em breve.",
      },
    },
  },
  seo: {
    defaultTitle: "EC.c — Edison Cristovão, desenvolvedor full-stack",
    description:
      "Portfólio de Edison Cristovão, desenvolvedor full-stack. Um site pessoal com cara de editor de código: projetos, bio, terminal e setup de desenvolvimento.",
    pages: {
      editor: {
        title: "Sobre mim",
        description:
          "Quem é Edison Cristovão: um desenvolvedor full-stack mostrando perfil, bio, terminal e setup num site com cara de editor de código.",
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
        title: "Projetos",
        description:
          "Projetos de Edison Cristovão, desenvolvedor full-stack, feitos com React, Next.js e TypeScript.",
      },
    },
  },
  og: {
    alt: "EC.c — Edison Cristovão, desenvolvedor full-stack",
    role: "Desenvolvedor full-stack",
  },
  jsonld: {
    jobTitle: "Desenvolvedor full-stack",
  },
} satisfies PagesDictionary;

export const pages = { en, pt } as const satisfies Record<
  Locale,
  PagesDictionary
>;
