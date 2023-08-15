import React from "react";
import Link from "./Link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center w-full h-14 bg-primary text-secondary-grey border-collapse border border-lines">
      <div className="w-64 pl-6">
        <Image src={"/imgs/logo.svg"} alt="" width={80} height={800} />
        {/* <label>EC.codes</label> */}
      </div>

      <Link label="_home" href={"/"}></Link>
      <Link label="_about-me" href={"/editor"}></Link>
      <Link label="_projects" href={"projects"}></Link>
    </nav>
  );
}
