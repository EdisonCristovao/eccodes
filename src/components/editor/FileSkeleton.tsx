import CodeLine from "@/components/editor/CodeLine";
import { cn } from "@/lib/utils";

// 10 linhas "de código" (guia §5.6): larguras 40/70/55/80/30/65/50/75/45/60%.
const LINES: { width: string; indent: 0 | 1 | 2 }[] = [
  { width: "w-[40%]", indent: 0 },
  { width: "w-[70%]", indent: 1 },
  { width: "w-[55%]", indent: 1 },
  { width: "w-[80%]", indent: 2 },
  { width: "w-[30%]", indent: 2 },
  { width: "w-[65%]", indent: 1 },
  { width: "w-[50%]", indent: 0 },
  { width: "w-[75%]", indent: 0 },
  { width: "w-[45%]", indent: 1 },
  { width: "w-[60%]", indent: 0 },
];

type FileSkeletonProps = {
  /** Texto sr-only ("Opening file…"). */
  label: string;
};

/** Skeleton de arquivo dentro do EditorPane: gutter real (1–10) + barras. */
export default function FileSkeleton({ label }: FileSkeletonProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        {LINES.map(({ width, indent }, index) => (
          <CodeLine key={index} indent={indent} className="items-center">
            <span className={cn("block h-3 rounded-sm bg-card", width)} />
          </CodeLine>
        ))}
      </div>
    </div>
  );
}
