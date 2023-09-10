import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Fira_Code } from "next/font/google";
// import Footer from "@/components/Footer";
import { OpenFilesProvider } from "@/hooks/useOpenFiles";
import { NavBarProvider } from "@/hooks/useNavBar";

const firaCode = Fira_Code({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={firaCode.className}>
        <OpenFilesProvider>
          <NavBarProvider>
            <div className="bg-primary min-h-screen flex flex-col">
              <Nav />

              <main className="md:grow flex ">{children}</main>

              {/* <Footer /> */}
            </div>
          </NavBarProvider>
        </OpenFilesProvider>
      </body>
    </html>
  );
}
