import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Fira_Code } from "next/font/google";
import {
  AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
// import Footer from "@/components/Footer";
import { OpenFilesProvider } from "@/hooks/useOpenFiles";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

// Ícones, OG image e manifest vêm das file conventions
// (icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | EC.c" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  keywords: [
    "Edison Cristovão",
    "full-stack developer",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  // Só o card: title/description o Next deriva do openGraph de cada rota.
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#011627",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.variable}>
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
