import { Braces, FileCode, FileText } from "lucide-react";
import type { FileExt } from "@/lib/editor-files";

const ICON: Record<FileExt, typeof FileCode> = {
  tsx: FileCode,
  js: FileCode,
  md: FileText,
  json: Braces,
};

/** Ícone por extensão (guia §5.3): 16px, decorativo. */
export default function FileIcon({
  ext,
  className,
}: {
  ext: FileExt;
  className?: string;
}) {
  const Icon = ICON[ext];
  return <Icon size={16} className={className} aria-hidden="true" />;
}
