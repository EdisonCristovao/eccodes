import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Fira_Code } from "next/font/google";
import { notFound } from "next/navigation";
import { HTML_LANG, LOCALES, hasLocale, type Locale } from "@/lib/i18n";
import { localeFromParams, siteMetadata } from "@/lib/site";
import TabBar from "@/components/editor/TabBar";
import StatusBar from "@/components/editor/StatusBar";
import Explorer from "@/components/explorer/Explorer";
import { OpenFilesProvider } from "@/hooks/useOpenFiles";
import { EditorStatusProvider } from "@/hooks/useEditorStatus";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

// Ícones e manifest vêm das file conventions da raiz; a OG image, de
// [lang]/opengraph-image.tsx. Title/description/OG/hreflang por idioma.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  return siteMetadata(await localeFromParams(params));
}

export const viewport: Viewport = {
  themeColor: "#011627",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Todas as rotas vivem em /en/* e /pt/*: prerender dos dois idiomas; qualquer
// outro segmento cai em notFound() abaixo. (dynamicParams=false aqui faria o
// Next responder com a 404 padrão, fora deste layout, para /en/qualquer-coisa —
// o 404 no idioma vem do [...rest]/page.tsx + not-found.tsx.) O proxy.ts
// redireciona pedidos sem prefixo.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Segmento inválido (ex.: /fr.x, que escapa do proxy por ter ponto): 404.
  if (!hasLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <html lang={HTML_LANG[locale]} className={firaCode.variable}>
      <body className="font-sans antialiased">
        <OpenFilesProvider>
          <EditorStatusProvider>
            {/* Shell de editor (item 20): chrome fixo, só o corpo do pane rola. */}
            <div className="flex h-dvh flex-col overflow-hidden bg-background">
              <Nav />
              <TabBar />
              <div className="flex min-h-0 flex-1">
                <Explorer className="hidden md:flex" />
                <main className="flex min-h-0 min-w-0 flex-1 flex-col">
                  {children}
                </main>
              </div>
              <StatusBar branch={process.env.VERCEL_GIT_COMMIT_REF ?? "main"} />
            </div>
          </EditorStatusProvider>
        </OpenFilesProvider>
      </body>
    </html>
  );
}
