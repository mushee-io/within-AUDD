import * as React from "react";
import { cn } from "@/components/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant="primary", size="md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-ember-600 hover:bg-ember-500 shadow-ember text-white",
    ghost:
      "bg-white/0 hover:bg-white/8 text-white/90 hover:text-white",
    outline:
      "border border-white/12 bg-white/0 hover:bg-white/6 text-white"
  } as const;
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base"
  } as const;

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
