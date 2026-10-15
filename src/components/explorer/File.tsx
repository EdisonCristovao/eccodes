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
      aria-current={isCurrentActive ? "page" : undefined}
      className="flex text-sm items-center gap-2 py-1 px-4 hover:text-white focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-[active=true]:bg-accent data-[active=true]:text-foreground"
      {...props}
    />
  );
}
