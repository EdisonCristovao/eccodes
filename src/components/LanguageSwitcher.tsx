"use client";

import { Fragment, Suspense } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { ui } from "@/dictionaries/ui";
import {
  HREFLANG,
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  LOCALES,
  swapLocale,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Variant = "nav" | "sheet" | "statusbar";

type LanguageSwitcherProps = {
  lang: Locale;
  /** nav: ponta direita do header (≥768px) · sheet: última linha do menu mobile · statusbar: item 20. */
  variant: Variant;
  className?: string;
};

const SHORT: Record<Locale, string> = { en: "EN", pt: "PT" };

function rememberLocale(to: Locale) {
  document.cookie = `${LANG_COOKIE}=${to}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

type LinksProps = { lang: Locale; variant: Variant; query: string };

function Links({ lang, variant, query }: LinksProps) {
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
                  "inline-flex items-center justify-center px-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
                  variant === "sheet" ? "min-h-11" : "min-h-6",
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
 * Seletor de idioma: dois links `EN · PT` com hreflang/lang/aria-current,
 * que preservam a rota (e a query) e gravam o cookie `lang` no clique.
 * Funciona sem JS (só não persiste a escolha).
 */
export default function LanguageSwitcher({
  lang,
  variant,
  className,
}: LanguageSwitcherProps) {
  const dict = ui[lang].lang;
  const variantClass: Record<Variant, string> = {
    nav: "ml-auto hidden h-full items-center gap-2 border-l border-border px-6 md:flex",
    sheet: "flex min-h-14 items-center justify-between border-t border-border px-6",
    statusbar: "flex items-center gap-2",
  };

  return (
    <nav aria-label={dict.label} className={cn(variantClass[variant], className)}>
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        <Languages size={14} aria-hidden="true" />
        {variant === "sheet" && <span className="text-sm">{dict.label}</span>}
      </span>
      <Suspense fallback={<Links lang={lang} variant={variant} query="" />}>
        <LinksWithQuery lang={lang} variant={variant} />
      </Suspense>
    </nav>
  );
}
