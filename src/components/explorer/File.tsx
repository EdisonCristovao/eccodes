"use client";

import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface FileProps extends LinkProps {
  children: ReactNode[];
}

export function File(props: FileProps) {
  const pathName = usePathname();

  const isCurrentActive = pathName === props.href;

  return (
    <Link
      data-active={isCurrentActive}
      className="flex text-sm items-center gap-2 py-1 px-4  hover:text-white data-[active=true]:text-white"
      {...props}
    />
  );
}
