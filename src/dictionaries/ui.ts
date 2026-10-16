import type { Locale } from "@/lib/i18n";

/**
 * Strings de UI, a11y e notices (client-safe). `en` é a fonte de verdade;
 * `pt` é checado com `satisfies`: chave faltando ou sobrando quebra o `tsc`.
 * Identificadores (labels do Nav, nomes de arquivo, e-mail) não se traduzem.
 * Interpolação com `fill()` de `@/lib/i18n` ({digest}, {title}, {path}).
 */
const en = {
  nav: {
    main: "Main",
    mobile: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigation menu",
    menuDescription: "Site sections",
    logo: "EC.c — home",
    links: {
      home: "_home",
      aboutMe: "_about-me",
      projects: "_projects",
    },
  },
  lang: {
    label: "Language",
    en: "English",
    pt: "Português (Brasil)",
    current: {
      en: "English (current)",
      pt: "Português (current)",
    },
    switchTo: {
      en: "Switch to English",
      pt: "Switch to Portuguese",
    },
  },
  tabs: {
    label: "Open files",
    close: "Close {name}",
    opening: "Opening {name}…",
    unsaved: "{name} — opening",
  },
  explorer: {
    label: "Explorer",
    open: "Open explorer",
    close: "Close explorer",
    contact: "Contact",
    files: "Files",
    email: "edison@cristovao.codes",
    whatsapp: "WhatsApp",
    whatsappAria: "Message Edison on WhatsApp (opens in a new tab)",
    whatsappText:
      "Hi Edison! I found you through your website (edison.cristovao.codes) and I'd like to talk.",
    opensNewTab: "opens in a new tab",
  },
  file: {
    opening: "Opening file…",
    couldNotOpen: "// could not open file",
    couldNotLoad: "// the content could not be loaded",
    ref: "// ref: {digest}",
    noContent: "// {title}: no content available",
    englishOnly: "// this file is only available in English",
    tryAgain: "Try again",
  },
  status: {
    label: "Status bar",
    branch: "Branch {name}",
    language: "Language mode: {name}",
    position: "Ln {line}, Col {col}",
    opening: "opening {name}…",
    github: "GitHub profile (opens in a new tab)",
    email: "Send an e-mail",
  },
  pane: {
    breadcrumbRoot: "src",
  },
  notFound: {
    file: "404.md",
    lines: ["// 404: file not found", "// the path {path} does not exist"],
    back: "Back to home",
  },
};

export type UiDictionary = typeof en;

const pt = {
  nav: {
    main: "Principal",
    mobile: "Menu",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    menuTitle: "Menu de navegação",
    menuDescription: "Seções do site",
    logo: "EC.c — início",
    links: {
      home: "_home",
      aboutMe: "_about-me",
      projects: "_projects",
    },
  },
  lang: {
    label: "Idioma",
    en: "English",
    pt: "Português (Brasil)",
    current: {
      en: "English (atual)",
      pt: "Português (atual)",
    },
    switchTo: {
      en: "Mudar para inglês",
      pt: "Mudar para português",
    },
  },
  tabs: {
    label: "Arquivos abertos",
    close: "Fechar {name}",
    opening: "Abrindo {name}…",
    unsaved: "{name} — abrindo",
  },
  explorer: {
    label: "Explorador",
    open: "Abrir explorador",
    close: "Fechar explorador",
    contact: "Contato",
    files: "Arquivos",
    email: "edison@cristovao.codes",
    whatsapp: "WhatsApp",
    whatsappAria: "Falar com o Edison no WhatsApp (abre em nova aba)",
    whatsappText:
      "Olá, Edison! Encontrei você pelo seu site (edison.cristovao.codes) e gostaria de conversar.",
    opensNewTab: "abre em nova aba",
  },
  file: {
    opening: "Abrindo arquivo…",
    couldNotOpen: "// não foi possível abrir o arquivo",
    couldNotLoad: "// o conteúdo não pôde ser carregado",
    ref: "// ref: {digest}",
    noContent: "// {title}: sem conteúdo disponível",
    englishOnly: "// este arquivo só existe em inglês",
    tryAgain: "Tentar de novo",
  },
  status: {
    label: "Barra de status",
    branch: "Branch {name}",
    language: "Modo de linguagem: {name}",
    position: "Ln {line}, Col {col}",
    opening: "abrindo {name}…",
    github: "Perfil no GitHub (abre em nova aba)",
    email: "Enviar um e-mail",
  },
  pane: {
    breadcrumbRoot: "src",
  },
  notFound: {
    file: "404.md",
    lines: [
      "// 404: arquivo não encontrado",
      "// o caminho {path} não existe",
    ],
    back: "Voltar ao início",
  },
} satisfies UiDictionary;

export const ui = { en, pt } as const satisfies Record<Locale, UiDictionary>;

/** Mensagem do WhatsApp já codificada para o `?text=` do wa.me. */
export const whatsappUrl = (lang: Locale): string =>
  `https://wa.me/351924738990?text=${encodeURIComponent(ui[lang].explorer.whatsappText)}`;
