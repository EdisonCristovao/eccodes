import React from "react";
import Link from "./Link";

export default function Nav() {
  return (
    <header className="h-14">
      <nav className="w-full bg-primary text-secondary-grey flex border-collapse border border-lines">
        <div className="p-4 w-64">
          <label>Edison Cristovao</label>
        </div>

        <Link label="_home"></Link>
        <Link label="_about-me"></Link>
        <Link label="_projects"></Link>
      </nav>
    </header>
  );
}
