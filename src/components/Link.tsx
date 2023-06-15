import React from "react";
import NextLink from "next/link";

type LinkProps = {
  label: string;
  href: string;
};

export default function Link({ label, href }: LinkProps) {
  return (
    <div className="flex items-center px-6 h-full border-x border-lines">
      <NextLink href={href}>
        <label className="hover:text-white hover:cursor-pointer">{label}</label>
      </NextLink>
    </div>
  );
}
