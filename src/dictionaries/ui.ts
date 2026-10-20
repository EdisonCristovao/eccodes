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
  },
  explorer: {
    label: "Explorer",
    open: "Open explorer",
    close: "Close explorer",
    contact: "Contact",
    files: "Files",
    email: "edison@cristovao.codes",
    linkedin: "LinkedIn",
    linkedinAria: "LinkedIn profile (opens in a new tab)",
    whatsapp: "WhatsApp",
    whatsappAria: "Message Edison on WhatsApp (opens in a new tab)",
    whatsappText:
      "Hi Edison! I found you through your website (edison.cristovao.codes) and I'd like to talk.",
  },
  file: {
    opening: "Opening file…",
    couldNotOpen: "// could not open file",
    couldNotLoad: "// the content could not be loaded",
    ref: "// ref: {digest}",
    noContent: "// {title}: no content available",
    englishOnly: "// this file is only available in English",
    tryAgain: "Try again",
    newTab: " (opens in a new tab)",
  },
  status: {
    label: "Status bar",
    branch: "Branch {name}",
    language: "Language mode: {name}",
    position: "Ln {line}, Col {col}",
    opening: "opening {name}…",
    github: "GitHub profile (opens in a new tab)",
    linkedin: "LinkedIn profile (opens in a new tab)",
    email: "Send an e-mail",
  },
  pane: {
    breadcrumbRoot: "src",
  },
  palette: {
    title: "Command palette",
    description: "Search files, commands and links",
    placeholder: "Search files by name (type > for commands)",
    trigger: "Go to file…",
    // O texto visível ("Go to file… ⌘K") precisa estar contido no nome (WCAG 2.5.3).
    triggerAria: " — command palette",
    groups: {
      files: "Files",
      commands: "Commands",
      links: "Links",
    },
    empty: '// no results for "{query}"',
    current: "current",
    open: "open",
    hints: "↑↓ to navigate · ↵ to open · esc to close",
    cancel: "Cancel",
    commands: {
      language: "Language:",
      switchTo: "Switch to {name}",
      tabs: "Tabs:",
      closeOthers: "Close other tabs",
      closeAll: "Close all tabs",
    },
    links: {
      github: "Open GitHub profile",
      linkedin: "Open LinkedIn profile",
      email: "Send an e-mail",
      whatsapp: "Message on WhatsApp",
    },
    /** Termos extras de busca por arquivo (os dois idiomas entram na busca). */
    keywords: {
      home: ["Home"],
      about: ["About me"],
      bio: ["Bio"],
      terminal: ["Terminal"],
      others: ["Dev setup"],
      projects: ["Experience"],
    },
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
  },
  explorer: {
    label: "Explorador",
    open: "Abrir explorador",
    close: "Fechar explorador",
    contact: "Contato",
    files: "Arquivos",
    email: "edison@cristovao.codes",
    linkedin: "LinkedIn",
    linkedinAria: "Perfil no LinkedIn (abre em nova aba)",
    whatsapp: "WhatsApp",
    whatsappAria: "Falar com o Edison no WhatsApp (abre em nova aba)",
    whatsappText:
      "Olá, Edison! Encontrei você pelo seu site (edison.cristovao.codes) e gostaria de conversar.",
  },
  file: {
    opening: "Abrindo arquivo…",
    couldNotOpen: "// não foi possível abrir o arquivo",
    couldNotLoad: "// o conteúdo não pôde ser carregado",
    ref: "// ref: {digest}",
    noContent: "// {title}: sem conteúdo disponível",
    englishOnly: "// este arquivo só existe em inglês",
    tryAgain: "Tentar de novo",
    newTab: " (abre em nova aba)",
  },
  status: {
    label: "Barra de status",
    branch: "Branch {name}",
    language: "Modo de linguagem: {name}",
    position: "Ln {line}, Col {col}",
    opening: "abrindo {name}…",
    github: "Perfil no GitHub (abre em nova aba)",
    linkedin: "Perfil no LinkedIn (abre em nova aba)",
    email: "Enviar um e-mail",
  },
  pane: {
    breadcrumbRoot: "src",
  },
  palette: {
    title: "Paleta de comandos",
    description: "Busque arquivos, comandos e links",
    placeholder: "Buscar arquivos pelo nome (digite > para comandos)",
    trigger: "Ir para arquivo…",
    triggerAria: " — paleta de comandos",
    groups: {
      files: "Arquivos",
      commands: "Comandos",
      links: "Links",
    },
    empty: '// nenhum resultado para "{query}"',
    current: "atual",
    open: "aberto",
    hints: "↑↓ para navegar · ↵ para abrir · esc para fechar",
    cancel: "Cancelar",
    commands: {
      language: "Idioma:",
      switchTo: "mudar para {name}",
      tabs: "Abas:",
      closeOthers: "fechar as outras abas",
      closeAll: "fechar todas as abas",
    },
    links: {
      github: "Abrir perfil no GitHub",
      linkedin: "Abrir perfil no LinkedIn",
      email: "Enviar um e-mail",
      whatsapp: "Conversar no WhatsApp",
    },
    keywords: {
      home: ["Início"],
      about: ["Sobre mim"],
      bio: ["Bio"],
      terminal: ["Terminal"],
      others: ["Setup"],
      projects: ["Experiência"],
    },
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
