import NextLink from "next/link";
import { lang as rootLang } from "next/root-params";
import EditorNotice from "@/components/EditorNotice";
import RequestedPath from "@/components/RequestedPath";
import { ui } from "@/dictionaries/ui";
import { DEFAULT_LOCALE, hasLocale, localizedPath } from "@/lib/i18n";

/**
 * 404 no estilo do editor, no idioma da rota. Boundary do segmento [lang]:
 * envolve o catch-all [...rest]/page.tsx (que lança notFound()) e renderiza
 * dentro do layout. Server component: lê o idioma de next/root-params; o
 * caminho pedido vem de um client component (usePathname), sem headers().
 */
export default async function NotFound() {
  const segment = await rootLang();
  const lang = hasLocale(segment) ? segment : DEFAULT_LOCALE;
  const dict = ui[lang].notFound;

  return (
    <div className="flex min-w-0 grow flex-col text-muted-foreground">
      <EditorNotice lines={[dict.lines[0]]}>
        <span className="text-muted-foreground">
          <RequestedPath template={dict.lines[1]} />
        </span>
        <NextLink
          href={localizedPath(lang, "/")}
          className="text-accent-nude underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          {dict.back}
        </NextLink>
      </EditorNotice>
    </div>
  );
}
