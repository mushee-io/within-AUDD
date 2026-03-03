"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, RefreshCcw, Coins } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";

type Rates = {
  timestamp: string;
  aud: { usd: number; gbp: number };
  crypto: { ethAud: number; btcAud: number };
  note: string;
};

function fmt(n: number, digits=2) {
  return n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function RatesPanel() {
  const [rates, setRates] = React.useState<Rates | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rates", { cache: "no-store" });
      const json = (await res.json()) as Rates;
      setRates(json);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10">
              <Coins className="h-5 w-5 text-white/80" />
            </div>
            <div>
              <h3 className="font-[var(--font-sora)] text-lg tracking-tight">AUDD Cross-Rates</h3>
              <p className="text-sm text-white/60">AUDD ≈ 1.00 AUD for demo. Compare against fiat + crypto.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Fiat</div>
                <div className="mt-1 font-[var(--font-sora)] text-xl">1 AUDD</div>
              </div>
              <Pill className="border-ember-600/25 bg-ember-600/10 text-white">
                Settlement ready <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Pill>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-white/60">USD</div>
                <div className="mt-1 text-lg font-semibold">{rates ? fmt(rates.aud.usd, 4) : "—"}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-white/60">GBP</div>
                <div className="mt-1 text-lg font-semibold">{rates ? fmt(rates.aud.gbp, 4) : "—"}</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/45">
              {rates ? `Updated ${new Date(rates.timestamp).toLocaleString()}. ${rates.note}` : "Loading…"}
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Crypto (priced in AUD)</div>
                <div className="mt-1 font-[var(--font-sora)] text-xl">On-chain context</div>
              </div>
              <Pill>Multi-asset view</Pill>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-white/60">ETH / AUD</div>
                <div className="mt-1 text-lg font-semibold">{rates ? fmt(rates.crypto.ethAud, 0) : "—"}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-white/60">BTC / AUD</div>
                <div className="mt-1 text-lg font-semibold">{rates ? fmt(rates.crypto.btcAud, 0) : "—"}</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/50">
              Tip: In production you’d route swaps via compliant venues + on-chain liquidity, and keep AUDD as the settlement unit.
            </div>
          </motion.div>
        </div>
      </CardContent>

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ember-600/10 blur-3xl" />
    </Card>
  );
}
