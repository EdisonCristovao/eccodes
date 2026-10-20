"use client";

import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Search } from "lucide-react";
import { ui } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// cmdk + Dialog + lista ficam num chunk à parte, baixado só no 1º uso
// (ou pré-carregado no hover/foco do gatilho). `lazy` em vez de
// `next/dynamic`: a palette só monta no cliente, depois de um pedido, então
// não precisa do wrapper de SSR (que somava ~1 KB à 1ª carga).
const loadPalette = () => import("@/components/command/CommandPalette");
const CommandPalette = lazy(loadPalette);

type NavigatorWithUAData = Navigator & {
  userAgentData?: { platform?: string };
};

const noopSubscribe = () => () => {};
function platformShortcut(): string {
  const nav = navigator as NavigatorWithUAData;
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  return /mac|iphone|ipad|ipod/i.test(platform) ? "⌘K" : "Ctrl K";
}

/** Campo onde `/` é texto, não atalho. */
function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.closest("input, textarea, select, [contenteditable]") !== null
  );
}

/** Sheet do menu ou do explorer aberto: o atalho não abre por cima. */
const otherDialogOpen = () =>
  document.querySelector('[role="dialog"][data-state="open"]') !== null;

type CommandPaletteTriggerProps = { lang: Locale };

/**
 * Gatilho da palette na ponta direita da TabBar + atalhos globais: ⌘K/Ctrl+K
 * abre e fecha, `/` abre fora de campos editáveis. ⌘P (imprimir) e ⌘⇧P
 * (janela privada no Firefox) ficam com o navegador.
 */
export default function CommandPaletteTrigger({
  lang,
}: CommandPaletteTriggerProps) {
  const dict = ui[lang].palette;
  // null no servidor e na hidratação: o <kbd> só aparece depois de montar.
  const shortcut = useSyncExternalStore(
    noopSubscribe,
    platformShortcut,
    () => null,
  );

  const [open, setOpen] = useState(false);
  // Monta a palette (e baixa o chunk) só depois do 1º pedido de abertura.
  const [requested, setRequested] = useState(false);
  const openRef = useRef(open);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const show = () => {
      const active = document.activeElement;
      returnFocusTo.current =
        active instanceof HTMLElement && active !== document.body
          ? active
          : triggerRef.current;
      setRequested(true);
      setOpen(true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat || event.defaultPrevented) return;
      const mod = event.metaKey || event.ctrlKey;

      if (mod && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "k") {
        if (openRef.current) {
          event.preventDefault();
          setOpen(false);
        } else if (!otherDialogOpen()) {
          event.preventDefault();
          show();
        }
        return;
      }

      if (
        event.key === "/" &&
        !mod &&
        !event.altKey &&
        !openRef.current &&
        !isEditable(event.target) &&
        !otherDialogOpen()
      ) {
        event.preventDefault();
        show();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const preload = () => {
    void loadPalette();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        // Sem aria-label: o nome vem do conteúdo (texto visível + kbd + sr-only),
        // então sempre contém o que se vê (WCAG 2.5.3). Os atalhos vão no
        // aria-keyshortcuts, estático e igual em qualquer plataforma.
        aria-keyshortcuts="Meta+K Control+K /"
        aria-haspopup="dialog"
        onPointerEnter={preload}
        onFocus={preload}
        onClick={() => {
          returnFocusTo.current = triggerRef.current;
          setRequested(true);
          setOpen(true);
        }}
        // < 768: só o ícone. Encosta na borda direita e a <ul> cobre a esquerda,
        // então os 44px de largura são do próprio botão; o pseudo-elemento só
        // completa a altura (TabBar de 36px → 48px de toque).
        className="relative flex h-full w-11 shrink-0 items-center justify-center gap-2 border-l border-border text-editor text-muted-foreground transition-colors duration-150 before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[''] hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none md:w-auto md:px-3 md:before:hidden"
      >
        <Search className="size-4" aria-hidden="true" />
        {/* Abaixo de 1024 o texto some só da tela: continua no nome acessível. */}
        <span className="sr-only whitespace-nowrap text-editor lg:not-sr-only">{dict.trigger}</span>
        {shortcut && (
          <kbd className="hidden rounded-sm border border-border px-1 font-mono text-xs md:inline">
            {shortcut}
          </kbd>
        )}
        <span className="sr-only">{dict.triggerAria}</span>
      </button>

      {requested && (
        <Suspense fallback={null}>
          <CommandPalette
            lang={lang}
            open={open}
            onOpenChange={setOpen}
            returnFocus={() => returnFocusTo.current?.focus()}
          />
        </Suspense>
      )}
    </>
  );
}
