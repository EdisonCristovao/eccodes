import Nav from "@/components/Nav";
import "./globals.css";
import { Fira_Code } from "next/font/google";

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
      <body className={firaCode.className + " min-h-full bg-primary "}>
        <Nav></Nav>

        {children}
      </body>
    </html>
  );
}
