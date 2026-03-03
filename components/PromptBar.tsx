"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/components/lib/cn";

export function PromptBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Describe what you want to settle in AUD…",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="relative">
      <div className={cn(
        "absolute -inset-1 rounded-[28px] blur-xl transition",
        focused ? "bg-ember-600/20" : "bg-white/5"
      )}/>
      <motion.div
        className="relative flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-3 shadow-glow backdrop-blur"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ember-600/15 border border-ember-600/25">
          <Sparkles className="h-5 w-5 text-ember-500" />
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="h-10 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
        />

        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75">
            <ShieldCheck className="h-4 w-4 text-white/70" />
            Gasless-style routing
          </span>
        </div>

        <button
          onClick={onSubmit}
          className="group inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-ember-600 px-4 text-sm font-medium text-white shadow-ember transition hover:bg-ember-500 active:scale-[0.98]"
        >
          Run
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30 blur-sm animate-sheen" />
        </div>
      </motion.div>
    </div>
  );
}
