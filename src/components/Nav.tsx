"use client";

import React, { useState } from "react";
import Link from "./Link";
import Image from "next/image";
import { useNavBar } from "@/hooks/useNavBar";
import { Menu, X } from "lucide-react";
import NextLink from "next/link";

export default function Nav() {
  const { currentPage, setCurrentPage } = useNavBar();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex justify-between md:justify-start items-center w-full h-14 bg-primary text-secondary-grey border-collapse border border-lines">
      <div className="w-64 ml-6">
        <Image src={"/imgs/logo.svg"} alt="" width={80} height={800} />
        {/* <label>EC.codes</label> */}
      </div>

      <div className="md:flex h-full hidden">
        <Link
          label="_home"
          href={"/"}
          active={currentPage}
          setCurrentPage={setCurrentPage}
        ></Link>
        <Link
          label="_about-me"
          href={"/editor"}
          active={currentPage}
          setCurrentPage={setCurrentPage}
        ></Link>
        <Link
          label="_projects"
          href={"/projects"}
          active={currentPage}
          setCurrentPage={setCurrentPage}
        ></Link>
      </div>

      <div
        className="md:hidden mr-6"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X></X> : <Menu></Menu>}

        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-primary z-10 flex flex-col text-white text-2xl h-full">
            <div className="border-y py-2 border-lines">
              <NextLink
                href={"/"}
                className="px-6"
                onClick={() => setIsMenuOpen(false)}
              >
                _home
              </NextLink>
            </div>
            <div className="border-y py-2 border-lines">
              <NextLink
                href={"/editor"}
                className="px-6"
                onClick={() => setIsMenuOpen(false)}
              >
                _about-me
              </NextLink>
            </div>
            <div className="border-y py-2 border-lines">
              <NextLink
                href={"/projects"}
                className="px-6"
                onClick={() => setIsMenuOpen(false)}
              >
                _projects
              </NextLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
