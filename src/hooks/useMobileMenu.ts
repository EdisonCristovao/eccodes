"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

/**
 * Estado aberto/fechado do menu mobile. Escape, scroll lock, focus trap,
 * retorno de foco ao trigger e aria-* são do Radix Dialog (ui/sheet).
 */
export function useMobileMenuOpen(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha ao mudar de rota (links, back/forward). Ajuste de estado durante o
  // render (padrão "storing information from previous renders" do React) em vez
  // de setState dentro de useEffect, que o react-hooks v7 bloqueia.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // Fecha ao passar para desktop (>= 768px)
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return [open, setOpen];
}
