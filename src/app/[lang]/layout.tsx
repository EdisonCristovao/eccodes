import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Fira_Code } from "next/font/google";
import { notFound } from "next/navigation";
import { HTML_LANG, LOCALES, hasLocale, type Locale } from "@/lib/i18n";
import { localeFromParams, siteMetadata } from "@/lib/site";
// import Footer from "@/components/Footer";
import { OpenFilesProvider } from "@/hooks/useOpenFiles";

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
          <div className="bg-primary min-h-screen flex flex-col">
            <Nav />

            <main className="md:grow flex ">{children}</main>

            {/* <Footer /> */}
          </div>
        </OpenFilesProvider>
      </body>
    </html>
  );
}
