"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { EDITOR_FILES, fileForPath, type FileSlug } from "@/lib/editor-files";
import { stripLocale } from "@/lib/i18n";

export const OPEN_FILES_STORAGE_KEY = "ec.openFiles";

export type OpenFilesContextValue = {
  openFiles: FileSlug[];
  /** Acrescenta a aba se ainda não estiver aberta. */
  open: (slug: FileSlug) => void;
  /** Remove a aba (quem navega para a vizinha é a TabBar). */
  close: (slug: FileSlug) => void;
  /** Fecha todas as abas menos `keep`. */
  closeOthers: (keep: FileSlug) => void;
  /** Fecha todas (quem reabre/navega para a home é quem chama). */
  closeAll: () => void;
};

/*
 * Store externo (módulo) lido com useSyncExternalStore:
 * - SSR e 1º render do cliente usam o snapshot "só o arquivo da rota"
 *   (sem hydration mismatch);
 * - depois de montar, `hydrate()` restaura a lista do sessionStorage e
 *   garante o arquivo da rota; cada mudança é persistida.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let hydrated = false;
let state: FileSlug[] = [];

const isFileSlug = (value: unknown): value is FileSlug =>
  typeof value === "string" && value in EDITOR_FILES;

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(files: FileSlug[]) {
  try {
    sessionStorage.setItem(OPEN_FILES_STORAGE_KEY, JSON.stringify(files));
  } catch {
    // sessionStorage indisponível (modo privado, cota): segue só em memória.
  }
}

function readStored(): FileSlug[] {
  try {
    const raw = sessionStorage.getItem(OPEN_FILES_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isFileSlug) : [];
  } catch {
    return [];
  }
}

function setState(next: FileSlug[]) {
  state = next;
  persist(next);
  emit();
}

const store = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => state,
  isHydrated: () => hydrated,
  /** Restaura o sessionStorage (uma vez) e garante o arquivo da rota. */
  hydrate(routeSlug: FileSlug | null) {
    if (hydrated) return;
    hydrated = true;
    const stored = readStored();
    const next =
      routeSlug && !stored.includes(routeSlug) ? [...stored, routeSlug] : stored;
    setState(next);
  },
  open(slug: FileSlug) {
    if (state.includes(slug)) return;
    setState([...state, slug]);
  },
  close(slug: FileSlug) {
    if (!state.includes(slug)) return;
    setState(state.filter((open) => open !== slug));
  },
  closeOthers(keep: FileSlug) {
    setState([keep]);
  },
  closeAll() {
    setState([]);
  },
};

// Snapshot "só a rota", com referência estável por slug (exigência do
// useSyncExternalStore: mesmo valor → mesma referência).
const routeOnlySnapshots = new Map<FileSlug | null, FileSlug[]>();
function routeOnly(routeSlug: FileSlug | null): FileSlug[] {
  let snapshot = routeOnlySnapshots.get(routeSlug);
  if (!snapshot) {
    snapshot = routeSlug ? [routeSlug] : [];
    routeOnlySnapshots.set(routeSlug, snapshot);
  }
  return snapshot;
}

const OpenFilesContext = createContext<OpenFilesContextValue | null>(null);

export function OpenFilesProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeSlug = fileForPath(stripLocale(pathname))?.slug ?? null;

  const getSnapshot = useCallback(
    () => (store.isHydrated() ? store.getSnapshot() : routeOnly(routeSlug)),
    [routeSlug],
  );
  const getServerSnapshot = useCallback(() => routeOnly(routeSlug), [routeSlug]);

  const openFiles = useSyncExternalStore(
    store.subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // 1ª montagem: restaura do sessionStorage; cada rota nova vira uma aba.
  useEffect(() => {
    store.hydrate(routeSlug);
    if (routeSlug) store.open(routeSlug);
  }, [routeSlug]);

  const value = useMemo<OpenFilesContextValue>(
    () => ({
      openFiles,
      open: store.open,
      close: store.close,
      closeOthers: store.closeOthers,
      closeAll: store.closeAll,
    }),
    [openFiles],
  );

  return (
    <OpenFilesContext.Provider value={value}>
      {children}
    </OpenFilesContext.Provider>
  );
}

export function useOpenFiles(): OpenFilesContextValue {
  const value = useContext(OpenFilesContext);
  if (!value) {
    throw new Error("useOpenFiles must be used inside <OpenFilesProvider>");
  }
  return value;
}
