import { Ref } from "react";
import NextLink from "next/link";

type MobileMenuLinkProps = {
  href: string;
  label: string;
  index: number;
  active: boolean;
  onNavigate: () => void;
  ref?: Ref<HTMLAnchorElement>;
};

export default function MobileMenuLink({
  href,
  label,
  index,
  active,
  onNavigate,
  ref,
}: MobileMenuLinkProps) {
  return (
    <NextLink
      ref={ref}
      href={href}
      data-active={active}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      style={{ animationDelay: `${60 + index * 40}ms` }}
      className="block min-h-14 border-b border-l-2 border-border border-l-transparent px-6 py-4 text-2xl text-muted-foreground hover:bg-card hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring active:bg-pressed data-[active=true]:border-l-ring data-[active=true]:text-foreground animate-in fade-in-0 slide-in-from-left-3 fill-mode-both duration-200 ease-out-expo motion-reduce:animate-none"
    >
      {label}
    </NextLink>
  );
}
