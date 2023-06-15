import React from "react";
import Link from "./Link";

export default function Footer() {
  return (
    <nav className="flex items-center w-full bg-primary text-secondary-grey border-collapse border border-lines h-14">
      <Link href="" label="Find me in:"></Link>

      <Link href="" label="T"></Link>
      <Link href="" label="Int"></Link>
      <Link href="" label="F"></Link>
    </nav>
  );
}
