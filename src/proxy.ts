import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LANG_COOKIE, pickLocale } from "@/lib/i18n";

/**
 * Redireciona pedidos SEM prefixo de idioma ("/", "/editor/bio") para
 * "/<lang>/..." (307), escolhendo pelo cookie `lang` ou pelo Accept-Language.
 * Rotas já prefixadas, assets e metadata routes da raiz nem passam por aqui
 * (ver `matcher`).
 */
// Primeiro segmento com cara de idioma não suportado ("/fr", "/es-ES"): em vez
// de redirecionar para "/en/fr", reescreve (URL fica "/fr") para o catch-all
// do idioma padrão responder 404 com a página not-found dentro do layout.
const LANGUAGE_LIKE_SEGMENT = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (LANGUAGE_LIKE_SEGMENT.test(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(url);
  }
  const lang = pickLocale(
    request.headers.get("accept-language"),
    request.cookies.get(LANG_COOKIE)?.value,
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Só rotas sem prefixo de idioma e que não são assets/metadata:
  // /en, /en/*, /pt, /pt/*, _next, api, ícones, manifest, robots, sitemap,
  // /imgs e qualquer caminho com extensão nunca passam pelo proxy.
  matcher: [
    "/((?!en/|en$|pt/|pt$|_next|api|icon|apple-icon|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|imgs|.*\\..*).*)",
  ],
};
