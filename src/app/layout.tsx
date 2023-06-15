import Nav from "@/components/Nav";
import "./globals.css";
import { Fira_Code } from "next/font/google";
import Footer from "@/components/Footer";

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
        <div className="bg-primary min-h-screen flex justify-between flex-col">
          <Nav />

          <main className="grow flex">{children}</main>

          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
