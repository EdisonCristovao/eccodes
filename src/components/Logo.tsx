import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { localizedPath, type Locale } from "@/lib/i18n";
import { ui } from "@/dictionaries/ui";

// Aceita as props do link (onClick, ref…) para funcionar como filho de
// `SheetClose asChild` no menu mobile.
type LogoProps = Omit<ComponentProps<typeof NextLink>, "href" | "children"> & {
  lang: Locale;
};

/**
 * Wordmark "EC.c" — o nome do site como um arquivo C aberto no editor.
 * HTML real com a Fira Code do next/font (sem imagem, sem CLS).
 */
export default function Logo({ className, lang, ...props }: LogoProps) {
  return (
    <NextLink
      {...props}
      href={localizedPath(lang, "/")}
      aria-label={ui[lang].nav.logo}
      className={cn(
        "group flex h-full items-center border-r border-border px-6 text-base font-bold tracking-tight text-foreground",
        "hover:bg-card active:bg-pressed focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      {/* 18/27: o tamanho que o wordmark sempre teve (vinha do span 18px do @layer base). */}
      <span aria-hidden="true" className="text-lg leading-normal">
        <span className="text-foreground">EC</span>
        <span className="text-syntax-name">.c</span>
        <span className="logo-cursor ml-[0.12em] inline-block h-[1.1em] w-[2px] bg-ring align-[-0.15em] animate-cursor-blink motion-reduce:animate-none" />
      </span>
    </NextLink>
  );
}
