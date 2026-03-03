"use client";

import { motion } from "framer-motion";

export function HeavenBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-heaven-radial" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "var(--tw-gradient-stops)" }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:42px_42px] opacity-[0.10]" />
      <motion.div
        className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-ember-600/10 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
