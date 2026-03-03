import * as React from "react";
import { cn } from "@/components/lib/cn";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-ember-600/60 focus:ring-2 focus:ring-ember-600/25",
        className
      )}
      {...props}
    />
  );
}
