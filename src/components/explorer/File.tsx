"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Props do NextLink + atributos de <a> (target, rel, aria-label…) para links externos.
type FileProps = ComponentProps<typeof Link> & {
  /** Ícone à esquerda (FileIcon ou lucide 16px). */
  icon?: ReactNode;
  /** Dentro da gaveta mobile: alvo de 44px. */
  inDrawer?: boolean;
};

/**
 * Item do explorer (guia §5.3): hover bg-card, ativo bg-accent + borda
 * laranja à esquerda + aria-current (compara o pathname com o href).
 */
export function File({ icon, inDrawer, className, children, ...props }: FileProps) {
  const pathname = usePathname();
  const isCurrentActive = pathname === props.href;

  return (
    <li>
      <Link
        data-active={isCurrentActive}
        aria-current={isCurrentActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 border-l-2 border-l-transparent pr-4 pl-6 text-editor text-muted-foreground hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[active=true]:border-l-ring data-[active=true]:bg-accent data-[active=true]:text-foreground",
          inDrawer ? "min-h-11" : "h-7",
          className,
        )}
        {...props}
      >
        {icon}
        <span className="min-w-0 flex-1 truncate">{children}</span>
      </Link>
    </li>
  );
}
