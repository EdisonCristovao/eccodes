"use client";

import { Fragment, Suspense } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { ui } from "@/dictionaries/ui";
import {
  HREFLANG,
  LOCALES,
  rememberLocale,
  swapLocale,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  lang: Locale;
  className?: string;
};

const SHORT: Record<Locale, string> = { en: "EN", pt: "PT" };

type LinksProps = { lang: Locale; query: string };

function Links({ lang, query }: LinksProps) {
  const pathname = usePathname();
  const dict = ui[lang].lang;

  return (
    <ul className="flex items-center gap-1 text-xs uppercase tracking-wider">
      {LOCALES.map((to, index) => {
        const current = to === lang;
        return (
          <Fragment key={to}>
            {index > 0 && (
              <li aria-hidden="true" className="text-muted-foreground">
                ·
              </li>
            )}
            <li className="flex">
              <NextLink
                href={`${swapLocale(pathname, to)}${query ? `?${query}` : ""}`}
                hrefLang={HREFLANG[to]}
                lang={HREFLANG[to]}
                title={dict[to]}
                aria-current={current ? "true" : undefined}
                onClick={() => rememberLocale(to)}
                className={cn(
                  "inline-flex min-h-6 items-center justify-center px-1 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
                  current
                    ? "border-b border-b-ring text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span aria-hidden="true">{SHORT[to]}</span>
                <span className="sr-only">
                  {current ? dict.current[to] : dict.switchTo[to]}
                </span>
              </NextLink>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

// useSearchParams exige um Suspense acima em páginas estáticas; o fallback é
// o mesmo seletor sem a query.
function LinksWithQuery(props: Omit<LinksProps, "query">) {
  const query = useSearchParams().toString();
  return <Links {...props} query={query} />;
}

/**
 * Seletor de idioma da status bar (item 20, D7): dois links `EN · PT` com
 * hreflang/lang/aria-current, que preservam a rota (e a query) e gravam o
 * cookie `lang` no clique. Funciona sem JS (só não persiste a escolha).
 */
export default function LanguageSwitcher({
  lang,
  className,
}: LanguageSwitcherProps) {
  const dict = ui[lang].lang;

  return (
    <nav
      aria-label={dict.label}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <Languages size={14} aria-hidden="true" />
      <Suspense fallback={<Links lang={lang} query="" />}>
        <LinksWithQuery lang={lang} />
      </Suspense>
    </nav>
  );
}
