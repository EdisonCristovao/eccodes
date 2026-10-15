import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Fira_Code } from "next/font/google";
// import Footer from "@/components/Footer";
import { OpenFilesProvider } from "@/hooks/useOpenFiles";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata = {
  title: "ec.codes",
  description: "Just ec.codes portifolio",
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
