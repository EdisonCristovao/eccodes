import React from "react";
import NextLink from "next/link";

type Props = {
  href: string;
  label: string;
  index: number;
  active: boolean;
  state: "open" | "closed";
  onNavigate: () => void;
};

export default function MobileMenuLink({
  href,
  label,
  index,
  active,
  state,
  onNavigate,
}: Props) {
  return (
    <NextLink
      href={href}
      data-state={state}
      data-active={active}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      style={{ "--i": index } as React.CSSProperties}
      className="mobile-menu-item block w-full min-h-[56px] px-6 py-4 text-2xl border-b border-lines border-l-2 border-l-transparent text-secondary-grey data-[active=true]:text-white data-[active=true]:border-l-orange-light hover:text-white hover:bg-primary-light-dark active:bg-primary-dark focus-visible:outline-2 focus-visible:outline-orange-light focus-visible:-outline-offset-2 focus-visible:text-white transition-[translate,opacity] duration-200 ease-out-expo data-[state=open]:translate-x-0 data-[state=open]:opacity-100 data-[state=closed]:-translate-x-3 data-[state=closed]:opacity-0 data-[state=closed]:duration-[120ms] data-[state=closed]:ease-in"
    >
      {label}
    </NextLink>
  );
}
