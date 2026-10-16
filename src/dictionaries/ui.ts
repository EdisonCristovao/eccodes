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
  explorer: {
    contact: "Contact",
    more: "More",
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
  notFound: {
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
  explorer: {
    contact: "Contato",
    more: "Mais",
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
  notFound: {
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
