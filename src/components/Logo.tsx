import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

// Aceita as props do link (onClick, ref…) para funcionar como filho de
// `SheetClose asChild` no menu mobile.
type LogoProps = Omit<ComponentProps<typeof NextLink>, "href" | "children">;

/**
 * Wordmark "EC.c" — o nome do site como um arquivo C aberto no editor.
 * HTML real com a Fira Code do next/font (sem imagem, sem CLS).
 */
export default function Logo({ className, ...props }: LogoProps) {
  return (
    <NextLink
      {...props}
      href="/"
      aria-label="EC.c — home"
      className={cn(
        "group flex h-full items-center border-r border-border px-6 text-base font-bold tracking-tight text-foreground",
        "hover:bg-card active:bg-primary-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      <span aria-hidden="true">
        <span className="text-white">EC</span>
        <span className="text-accent-green">.c</span>
        <span className="logo-cursor ml-[0.12em] inline-block h-[1.1em] w-[2px] bg-ring align-[-0.15em] animate-cursor-blink motion-reduce:animate-none" />
      </span>
    </NextLink>
  );
}
