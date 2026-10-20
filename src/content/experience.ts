import type { Locale } from "@/lib/i18n";

/**
 * Experiência profissional (item 8), desenhada como `projects.json`. Fonte:
 * só o perfil do LinkedIn (nota eccodes-profile); nada além do que está lá.
 * Empresa e stack não se traduzem.
 */
type Localized = Record<Locale, string>;

export type ExperienceEntry = {
  id: string;
  company: string;
  /** Só quando o perfil cita o cliente (Supero → Engie). */
  client?: string;
  role: Localized;
  /** "AAAA-MM". */
  start: string;
  /** null = cargo atual. */
  end: string | null;
  location: Localized;
  highlights: Localized[];
  /** Vazio: a linha "stack" não aparece. */
  stack: string[];
};

const same = (text: string): Localized => ({ en: text, pt: text });

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "ted",
    company: "TED Conferences",
    role: same("Mobile Developer (React Native)"),
    start: "2024-02",
    end: null,
    location: { en: "Remote (New York, USA)", pt: "Remoto (Nova York, EUA)" },
    highlights: [
      {
        en: "React Native apps on a remote, international team",
        pt: "Apps mobile em React Native num time remoto e internacional",
      },
      {
        en: "Learning Hub: mobile media player built on Mux Video",
        pt: "Learning Hub: player de mídia mobile com Mux Video",
      },
    ],
    stack: ["React Native", "Mux Video"],
  },
  {
    id: "popstand",
    company: "Popstand",
    role: same("Full Stack Engineer"),
    start: "2021-08",
    end: "2025-03",
    location: { en: "Remote (California, USA)", pt: "Remoto (Califórnia, EUA)" },
    highlights: [
      {
        en: "Full-stack features for clients across several projects, including WAX and Flow blockchain work",
        pt: "Funcionalidades full stack para clientes em vários projetos, incluindo blockchain WAX e Flow",
      },
      {
        en: "Shipped branches to production on Heroku",
        pt: "Deploy de branches em produção no Heroku",
      },
      same("Code review"),
    ],
    stack: ["JavaScript", "Node.js", "React", "WAX", "Flow", "Heroku", "Git"],
  },
  {
    id: "supero",
    company: "Supero Tecnologia com Inteligência",
    client: "Engie",
    role: same("Full Stack Engineer"),
    start: "2020-01",
    end: "2021-08",
    location: { en: "Florianópolis, Brazil", pt: "Florianópolis, SC" },
    highlights: [
      {
        en: "One of the company's core teams",
        pt: "Uma das principais equipes da empresa",
      },
      {
        en: "From the problem domain to the solution, including estimates and deadlines",
        pt: "Do domínio do problema ao da solução, com estimativas e prazos",
      },
      { en: "Adapted Scrum", pt: "Scrum adaptado" },
    ],
    stack: ["React", "Node.js", "TypeScript", "JavaScript", "Oracle DB"],
  },
  {
    id: "getmore-lead",
    company: "GETMORE",
    role: same("Full Stack Developer Leader"),
    start: "2019-06",
    end: "2019-12",
    location: same("Florianópolis"),
    highlights: [
      {
        en: "Led a team of 5: planning and assigning tasks",
        pt: "Liderou uma equipe de 5 pessoas: gestão e distribuição de tarefas",
      },
      {
        en: "Ran Scrum and requirements analysis",
        pt: "Conduziu o Scrum e a análise de requisitos",
      },
    ],
    stack: [],
  },
  {
    id: "getmore-fe",
    company: "GETMORE",
    role: same("Front End Developer"),
    start: "2018-09",
    end: "2019-06",
    location: same("Florianópolis"),
    highlights: [
      {
        en: "Scrum team with fixed sprints",
        pt: "Time Scrum com sprints definidas",
      },
      {
        en: "Autonomy to pick tasks and open merge requests",
        pt: "Autonomia para escolher tarefas e abrir merge requests",
      },
    ],
    stack: ["React", "Node.js", "TypeScript", "JavaScript", "PostgreSQL"],
  },
  {
    id: "ciasc",
    company: "CIASC",
    role: { en: "Software Developer", pt: "Desenvolvedor de software" },
    start: "2017-12",
    end: "2018-09",
    location: same("Florianópolis"),
    highlights: [
      {
        en: "New SISP application for SSP, full stack",
        pt: "Nova aplicação SISP para a SSP, full stack",
      },
      {
        en: "Java back end, Angular 5 front end",
        pt: "Backend em Java e frontend em Angular 5",
      },
      { en: "Scrum with JIRA and GitLab", pt: "Scrum com JIRA e GitLab" },
    ],
    stack: ["Java", "Angular", "JIRA", "GitLab"],
  },
];

// Meses fixos (sem Intl): o resultado não varia com o ambiente do servidor.
const MONTHS: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
};

const PRESENT: Localized = { en: "present", pt: "atual" };

function formatMonth(date: string, lang: Locale): string {
  const [year, month] = date.split("-");
  return `${MONTHS[lang][Number(month) - 1]} ${year}`;
}

/** "Feb 2024 – present" · "fev 2024 – atual". */
export function formatPeriod(start: string, end: string | null, lang: Locale): string {
  const until = end ? formatMonth(end, lang) : PRESENT[lang];
  return `${formatMonth(start, lang)} – ${until}`;
}
