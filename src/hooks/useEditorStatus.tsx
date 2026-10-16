"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type { FileSlug } from "@/lib/editor-files";

export type EditorCursor = { line: number; col: number };

/**
 * Estado transitório do editor: qual arquivo está "abrindo" (● na aba e
 * "opening …" na status bar) e a posição do cursor (Ln/Col, por hover no
 * gutter). Desacoplado do router: funciona com rotas estáticas e throttling.
 */
export type EditorStatusContextValue = {
  opening: FileSlug | null;
  setOpening: (slug: FileSlug | null) => void;
  cursor: EditorCursor;
  setCursor: (cursor: EditorCursor) => void;
};

const EditorStatusContext = createContext<EditorStatusContextValue | null>(null);

const INITIAL_CURSOR: EditorCursor = { line: 1, col: 1 };

export function EditorStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opening, setOpening] = useState<FileSlug | null>(null);
  const [cursor, setCursorState] = useState<EditorCursor>(INITIAL_CURSOR);

  // Cursor volta a Ln 1, Col 1 ao abrir outro arquivo (ajuste durante o
  // render, padrão "estado derivado do render anterior").
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setCursorState(INITIAL_CURSOR);
  }

  // Hover no gutter dispara muitas vezes na mesma linha: só re-renderiza se mudou.
  const setCursor = useCallback((next: EditorCursor) => {
    setCursorState((current) =>
      current.line === next.line && current.col === next.col ? current : next,
    );
  }, []);

  const value = useMemo(
    () => ({ opening, setOpening, cursor, setCursor }),
    [opening, cursor, setCursor],
  );

  return (
    <EditorStatusContext.Provider value={value}>
      {children}
    </EditorStatusContext.Provider>
  );
}

export function useEditorStatus(): EditorStatusContextValue {
  const value = useContext(EditorStatusContext);
  if (!value) {
    throw new Error(
      "useEditorStatus must be used inside <EditorStatusProvider>",
    );
  }
  return value;
}

/**
 * Renderizado pelo `loading.tsx`: marca `slug` como "abrindo" enquanto o
 * skeleton estiver montado e limpa ao desmontar.
 */
export function OpeningSignal({ slug }: { slug: FileSlug }) {
  const { setOpening } = useEditorStatus();

  useEffect(() => {
    setOpening(slug);
    return () => setOpening(null);
  }, [slug, setOpening]);

  return null;
}
