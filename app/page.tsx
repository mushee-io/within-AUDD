"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Layers, Globe2 } from "lucide-react";
import { HeavenBackground } from "@/components/HeavenBackground";
import { PromptBar } from "@/components/PromptBar";
import { SettlementDemo } from "@/components/SettlementDemo";
import { RatesPanel } from "@/components/RatesPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Footer } from "@/components/Footer";

const TAGLINE = "AUD settlement, reimagined.";

export default function Page() {
  const [prompt, setPrompt] = React.useState("");

  return (
    <main className="relative min-h-screen">
      <HeavenBackground />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-ember-600/15 border border-ember-600/25 shadow-ember flex items-center justify-center">
              <span className="font-[var(--font-sora)] text-lg">M</span>
            </div>
            <div>
              <div className="font-[var(--font-sora)] text-lg leading-none">Mushee</div>
              <div className="text-xs text-white/55">{TAGLINE}</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Pill className="border-white/10">UK-based</Pill>
            <Pill className="border-ember-600/25 bg-ember-600/10">Heaven UI</Pill>
            <Button variant="ghost" size="sm" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
              Open demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section className="mt-12">
          <motion.h1
            className="max-w-3xl font-[var(--font-sora)] text-4xl tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Heaven-grade settlement for{" "}
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              AUD-native products
            </span>
            .
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-base text-white/65 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Mushee is building a sophisticated UX for on-chain AUD settlement using AUDD — with gasless-style routing,
            beautiful receipts, and real-time cross-asset context.
          </motion.p>

          <div className="mt-7">
            <PromptBar
              value={prompt}
              onChange={setPrompt}
              onSubmit={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Pill className="border-ember-600/25 bg-ember-600/10"><Sparkles className="mr-1 h-3.5 w-3.5" /> Heavenly prompt bar</Pill>
            <Pill><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Policy-aware</Pill>
            <Pill><Layers className="mr-1 h-3.5 w-3.5" /> Two-layer demo</Pill>
            <Pill><Globe2 className="mr-1 h-3.5 w-3.5" /> Multi-asset rates</Pill>
          </div>
        </section>

        <section id="demo" className="mt-12 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs text-white/60">Demo layer 1</div>
              <h2 className="mt-1 font-[var(--font-sora)] text-2xl tracking-tight md:text-3xl">AUD settlement + test elements</h2>
              <p className="mt-2 text-sm text-white/60">Simulate a “gasless” flow where users see AUD pricing and receive a receipt.</p>
            </div>
          </div>
          <SettlementDemo promptValue={prompt} />

          <div className="pt-4">
            <div className="text-xs text-white/60">Demo layer 2</div>
            <h2 className="mt-1 font-[var(--font-sora)] text-2xl tracking-tight md:text-3xl">AUDD vs other currencies</h2>
            <p className="mt-2 text-sm text-white/60">
              A clean trading-style panel (AUDD ⇄ USD/GBP + crypto context). Live rates where available.
            </p>
          </div>
          <RatesPanel />
        </section>

        <section className="mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-xs text-white/60">Concept</div>
                <div className="mt-2 font-[var(--font-sora)] text-lg">Gasless base layer</div>
                <p className="mt-2 text-sm text-white/60">
                  Sponsor transactions so users never manage gas. They see a single truth: AUD amounts, settled as AUDD.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-xs text-white/60">Design</div>
                <div className="mt-2 font-[var(--font-sora)] text-lg">Red × dark blue</div>
                <p className="mt-2 text-sm text-white/60">
                  “Heaven UI” — radiant highlights, soft depth, and calm structure. Built for YC-grade demos.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-xs text-white/60">Product</div>
                <div className="mt-2 font-[var(--font-sora)] text-lg">Receipts you can trust</div>
                <p className="mt-2 text-sm text-white/60">
                  Every settlement generates an export-ready receipt: intent, policy checks, routing metadata, and hash.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to prompt <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setPrompt("Pay 12 contributors for an AI batch review. Settle in AUD with 0 gas and issue an audit receipt.")}>
              Load a “heavenly” example
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
