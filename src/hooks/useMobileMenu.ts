"use client";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type UseMobileMenuReturn = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Escape fecha o menu e devolve o foco ao botão
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Scroll lock no body enquanto aberto
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Fecha ao mudar de rota (links, back/forward). Ajuste de estado durante o
  // render (padrão "storing information from previous renders" do React) em vez
  // de setState dentro de useEffect, que o react-hooks v7 bloqueia.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setIsOpen(false);
  }

  // Fecha ao passar para desktop (>= 768px)
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [close]);

  return { isOpen, toggle, close, buttonRef };
}
