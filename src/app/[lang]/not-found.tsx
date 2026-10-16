import NextLink from "next/link";
import { lang as rootLang } from "next/root-params";
import EditorNotice from "@/components/EditorNotice";
import EditorPane from "@/components/editor/EditorPane";
import RequestedPath from "@/components/RequestedPath";
import { ui } from "@/dictionaries/ui";
import { DEFAULT_LOCALE, hasLocale, localizedPath } from "@/lib/i18n";

/**
 * 404 no estilo do editor ("404.md"), no idioma da rota. Boundary do segmento
 * [lang]: envolve o catch-all [...rest]/page.tsx (que lança notFound()) e
 * renderiza dentro do layout. Server component: lê o idioma de
 * next/root-params; o caminho pedido vem de um client component (usePathname).
 */
export default async function NotFound() {
  const segment = await rootLang();
  const lang = hasLocale(segment) ? segment : DEFAULT_LOCALE;
  const dict = ui[lang].notFound;

  return (
    <EditorPane file={{ name: dict.file }}>
      <EditorNotice lines={[dict.lines[0]]}>
        <span className="text-syntax-comment">
          <RequestedPath template={dict.lines[1]} />
        </span>
      </EditorNotice>
      <EditorNotice lines={[]}>
        <NextLink
          href={localizedPath(lang, "/")}
          className="text-syntax-string underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          {dict.back}
        </NextLink>
      </EditorNotice>
    </EditorPane>
  );
}
