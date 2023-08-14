import React from "react";
import Link from "./Link";

export default function Nav() {
  return (
    <nav className="flex items-center w-full h-14 bg-primary text-secondary-grey border-collapse border border-lines">
      <div className="w-64 pl-6">
        <label>EC.codes</label>
      </div>

      <Link label="_home" href={"/"}></Link>
      <Link label="_about-me" href={"/editor"}></Link>
      <Link label="_projects" href={"projects"}></Link>
    </nav>
  );
}
