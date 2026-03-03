import { NextResponse } from "next/server";

type RatesResponse = {
  timestamp: string;
  aud: {
    usd: number;
    gbp: number;
  };
  crypto: {
    ethAud: number;
    btcAud: number;
  };
  note: string;
};

function fallback(): RatesResponse {
  return {
    timestamp: new Date().toISOString(),
    aud: { usd: 0.66, gbp: 0.52 },
    crypto: { ethAud: 5200, btcAud: 98000 },
    note: "Fallback sample rates (live endpoints unavailable).",
  };
}

export async function GET() {
  try {
    // Forex: Frankfurter (ECB rates). Base AUD isn't available directly, so we query USD and GBP then invert using USD/AUD from an additional call.
    // We'll use exchangerate-api style? To avoid keys, use open.er-api.com for AUD base.
    const forexRes = await fetch("https://open.er-api.com/v6/latest/AUD", { next: { revalidate: 60 }});
    const forexJson = await forexRes.json();

    const usd = Number(forexJson?.rates?.USD);
    const gbp = Number(forexJson?.rates?.GBP);

    // Crypto: CoinGecko simple price in AUD
    const cryptoRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=aud",
      { next: { revalidate: 60 } }
    );
    const cryptoJson = await cryptoRes.json();

    const ethAud = Number(cryptoJson?.ethereum?.aud);
    const btcAud = Number(cryptoJson?.bitcoin?.aud);

    if (!Number.isFinite(usd) || !Number.isFinite(gbp) || !Number.isFinite(ethAud) || !Number.isFinite(btcAud)) {
      return NextResponse.json(fallback(), { status: 200 });
    }

    const out: RatesResponse = {
      timestamp: new Date().toISOString(),
      aud: { usd, gbp },
      crypto: { ethAud, btcAud },
      note: "Live rates from public endpoints. AUDD is treated as ~1.00 AUD for demo UI.",
    };

    return NextResponse.json(out, { status: 200 });
  } catch {
    return NextResponse.json(fallback(), { status: 200 });
  }
}
