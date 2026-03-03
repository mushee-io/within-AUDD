import { cn } from "@/components/lib/cn";

export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/80",
      className
    )}>
      {children}
    </span>
  );
}
