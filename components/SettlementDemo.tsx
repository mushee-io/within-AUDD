"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Zap, ShieldCheck, Receipt, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill } from "@/components/ui/pill";

type Step = { title: string; detail: string; icon: React.ReactNode };

const stepsTemplate: Step[] = [
  { title: "Intent captured", detail: "Prompt → structured settlement intent.", icon: <Receipt className="h-4 w-4" /> },
  { title: "Policy checks", detail: "Limits, velocity, and risk rules pass.", icon: <ShieldCheck className="h-4 w-4" /> },
  { title: "Gasless routing", detail: "Sponsor/Paymaster sim: user pays 0 gas.", icon: <Zap className="h-4 w-4" /> },
  { title: "AUDD transfer", detail: "On-chain settlement in AUDD (AUD).", icon: <BadgeCheck className="h-4 w-4" /> },
  { title: "Receipt issued", detail: "Audit log + export-ready metadata.", icon: <CheckCircle2 className="h-4 w-4" /> }
];

function rndHash() {
  const chars = "abcdef0123456789";
  let s = "0x";
  for (let i=0;i<64;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return s;
}

export function SettlementDemo({ promptValue }: { promptValue: string }) {
  const [amount, setAmount] = React.useState("250");
  const [recipient, setRecipient] = React.useState("0xAUs...cE9");
  const [running, setRunning] = React.useState(false);
  const [idx, setIdx] = React.useState(-1);
  const [tx, setTx] = React.useState<string | null>(null);

  const start = async () => {
    setRunning(true);
    setTx(null);
    setIdx(-1);
    for (let i=0;i<stepsTemplate.length;i++) {
      await new Promise((r) => setTimeout(r, 650));
      setIdx(i);
    }
    setTx(rndHash());
    setRunning(false);
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10">
              <Zap className="h-5 w-5 text-white/80" />
            </div>
            <div>
              <h3 className="font-[var(--font-sora)] text-lg tracking-tight">AUD Settlement Demo</h3>
              <p className="text-sm text-white/60">Two-click “heavenly” settlement: intent → checks → gasless routing → AUDD.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Pill className="border-ember-600/25 bg-ember-600/10">Gasless-style</Pill>
          <Pill>UK company</Pill>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-4">
              <div>
                <Label>Prompt intent</Label>
                <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">
                  {promptValue?.trim().length ? promptValue : "Pay 3 verified reviewers for an AI batch, settle in AUD, export receipt."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Amount (AUD)</Label>
                  <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" />
                </div>
                <div>
                  <Label>Recipient</Label>
                  <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div>
                  <div className="text-xs text-white/60">Network fee</div>
                  <div className="mt-0.5 text-sm font-semibold">0.00 (sponsored)</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Settlement asset</div>
                  <div className="mt-0.5 text-sm font-semibold">AUDD (≈ AUD)</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Mode</div>
                  <div className="mt-0.5 text-sm font-semibold">Test elements</div>
                </div>
              </div>

              <Button onClick={start} disabled={running} className="w-full">
                {running ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {running ? "Routing…" : "Run settlement simulation"}
              </Button>

              {tx ? (
                <div className="rounded-2xl border border-ember-600/25 bg-ember-600/10 p-4">
                  <div className="text-xs text-white/70">Receipt</div>
                  <div className="mt-1 break-all text-sm font-semibold">{tx}</div>
                  <div className="mt-2 text-xs text-white/60">Export-ready: amount {amount} AUD • to {recipient} • gasless sponsored.</div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-white/60">Pipeline</div>
            <div className="mt-4 space-y-3">
              {stepsTemplate.map((s, i) => {
                const done = idx >= i && !running;
                const active = idx === i && running;
                const reached = idx >= i;

                return (
                  <motion.div
                    key={s.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                    animate={{ opacity: reached ? 1 : 0.45 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                      {done ? <CheckCircle2 className="h-5 w-5 text-ember-500" /> : active ? <Loader2 className="h-5 w-5 animate-spin text-white/70" /> : s.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="truncate font-medium">{s.title}</div>
                        {done ? <Pill className="py-0.5 text-[10px]">ok</Pill> : null}
                        {active ? <Pill className="py-0.5 text-[10px] border-ember-600/25 bg-ember-600/10">running</Pill> : null}
                      </div>
                      <div className="mt-1 text-sm text-white/60">{s.detail}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/60">
              <span className="text-white/80">Concept:</span> “Gasless” uses a sponsor (paymaster) so users never touch gas — they only see AUD pricing, and settlement happens in AUDD.
            </div>
          </div>
        </div>
      </CardContent>

      <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
    </Card>
  );
}
