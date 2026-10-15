"use client";

import React, { useEffect, useRef } from "react";
import Link from "./Link";
import MobileMenuLink from "./MobileMenuLink";
import Image from "next/image";
import { useNavBar } from "@/hooks/useNavBar";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { Menu, X } from "lucide-react";

const links = [
  { label: "_home", href: "/" },
  { label: "_about-me", href: "/editor" },
  { label: "_projects", href: "/projects" },
];

export default function Nav() {
  const { currentPage, setCurrentPage } = useNavBar();
  const { isOpen, toggle, close, buttonRef } = useMobileMenu();
  const mobileNavRef = useRef<HTMLElement>(null);
  const state = isOpen ? "open" : "closed";

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector("a")?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <nav className="flex justify-between md:justify-start items-center w-full h-14 bg-primary text-secondary-grey border-collapse border border-lines">
      <div className="w-56 ml-6">
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

      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={toggle}
        className="md:hidden mr-6 w-11 h-11 flex items-center justify-center rounded-sm text-secondary-grey hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-light focus-visible:outline-offset-2"
      >
        <span
          data-state={state}
          className="mobile-menu-icon group relative block w-6 h-6"
        >
          <Menu
            size={24}
            aria-hidden="true"
            className="absolute inset-0 transition-[transform,opacity] duration-200 ease-out-expo group-data-[state=closed]:rotate-0 group-data-[state=closed]:scale-100 group-data-[state=closed]:opacity-100 group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0"
          />
          <X
            size={24}
            aria-hidden="true"
            className="absolute inset-0 transition-[transform,opacity] duration-200 ease-out-expo group-data-[state=closed]:-rotate-90 group-data-[state=closed]:scale-75 group-data-[state=closed]:opacity-0 group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100"
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navegação"
        data-state={state}
        className="mobile-menu md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] supports-[height:100dvh]:h-[calc(100dvh-3.5rem)] bg-primary border-t border-lines z-40 flex flex-col overflow-y-auto transition-[transform,opacity] data-[state=closed]:transition-[transform,opacity,visibility] duration-200 ease-out-expo data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=open]:visible data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0 data-[state=closed]:invisible data-[state=closed]:pointer-events-none data-[state=closed]:duration-150 data-[state=closed]:ease-in"
      >
        <nav ref={mobileNavRef} className="flex flex-col">
          {links.map(({ label, href }, index) => (
            <MobileMenuLink
              key={href}
              href={href}
              label={label}
              index={index}
              state={state}
              active={currentPage === href}
              onNavigate={() => {
                setCurrentPage(href);
                close();
              }}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
