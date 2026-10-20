"use client";

import { useCallback, useSyncExternalStore } from "react";

export const EXPLORER_SECTIONS_STORAGE_KEY = "ec.explorer.sections";

export type ExplorerSection = "contact" | "files";
export type ExplorerSections = Record<ExplorerSection, boolean>;

/** Padrão do desktop: as duas seções abertas (a gaveta mobile tem o próprio padrão). */
const DEFAULTS: ExplorerSections = { contact: true, files: true };

/*
 * Store externo (módulo) lido com useSyncExternalStore, como o useOpenFiles:
 * SSR e hidratação usam DEFAULTS (sem hydration mismatch); depois de montar,
 * o cliente lê o sessionStorage (uma vez) e cada mudança é persistida.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let state: ExplorerSections | null = null;

function readStored(): ExplorerSections {
  try {
    const raw = sessionStorage.getItem(EXPLORER_SECTIONS_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      const { contact, files } = parsed as Partial<ExplorerSections>;
      return {
        contact: typeof contact === "boolean" ? contact : DEFAULTS.contact,
        files: typeof files === "boolean" ? files : DEFAULTS.files,
      };
    }
  } catch {
    // sessionStorage indisponível ou valor inválido: padrão.
  }
  return DEFAULTS;
}

function persist(next: ExplorerSections) {
  try {
    sessionStorage.setItem(EXPLORER_SECTIONS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage indisponível (modo privado, cota): segue só em memória.
  }
}

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Referência estável entre leituras (exigência do useSyncExternalStore).
const getSnapshot = (): ExplorerSections => (state ??= readStored());
const getServerSnapshot = (): ExplorerSections => DEFAULTS;

function setSection(section: ExplorerSection, open: boolean) {
  const current = getSnapshot();
  if (current[section] === open) return;
  state = { ...current, [section]: open };
  persist(state);
  listeners.forEach((listener) => listener());
}

/**
 * Seções abertas/fechadas do explorer no desktop, lembradas na sessão
 * (como as abas). A gaveta mobile não usa: sempre abre com Contact fechado.
 */
export function useExplorerSections() {
  const sections = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setOpen = useCallback(
    (section: ExplorerSection) => (open: boolean) => setSection(section, open),
    [],
  );
  return { sections, setOpen };
}
