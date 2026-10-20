import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * Os utilitários de tamanho do globals.css (`text-editor`, `text-pane`,
 * `text-file-title`) precisam estar no grupo `font-size`: sem isso o
 * tailwind-merge os trata como cor e descarta um deles ao lado de um
 * `text-muted-foreground`/`text-syntax-*`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["editor", "pane", "file-title"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
