"use client";

import React from "react";
import Link from "./Link";
import Image from "next/image";
import { useNavBar } from "@/hooks/useNavBar";

export default function Nav() {
  const { currentPage, setCurrentPage } = useNavBar();

  return (
    <nav className="flex items-center w-full h-14 bg-primary text-secondary-grey border-collapse border border-lines">
      <div className="w-64 pl-6">
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
    </nav>
  );
}
