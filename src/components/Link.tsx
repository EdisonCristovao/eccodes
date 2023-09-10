import React, { Dispatch, SetStateAction } from "react";
import NextLink from "next/link";

type LinkProps = {
  label: string;
  href: string;
  active: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

export default function Link({
  label,
  href,
  active,
  setCurrentPage,
}: LinkProps) {
  return (
    <div
      data-active={active === href}
      className="flex items-center px-6 h-full border-x border-lines border-b-[2px] data-[active=true]:border-b-orange-light hover:border-b-orange-light"
    >
      <NextLink href={href} onClick={() => setCurrentPage(href)}>
        <label className="hover:text-white hover:cursor-pointer">{label}</label>
      </NextLink>
    </div>
  );
}
