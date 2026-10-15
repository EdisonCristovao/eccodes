import NextLink from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

export default function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <NextLink
      href={href}
      data-active={active}
      aria-current={active ? "page" : undefined}
      className="flex h-full items-center border-x border-b-2 border-border border-b-transparent px-6 hover:border-b-ring hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[active=true]:border-b-ring data-[active=true]:text-foreground"
    >
      {label}
    </NextLink>
  );
}
