import * as React from "react";
import { cn } from "@/components/lib/cn";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-xs text-white/70", className)} {...props} />;
}
