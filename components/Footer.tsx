import { Pill } from "@/components/ui/pill";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Mushee (UK). Demo UI for AUDD settlement + rates.
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill>Heaven UI</Pill>
          <Pill>Gasless-style</Pill>
          <Pill>AUD-first</Pill>
        </div>
      </div>
    </footer>
  );
}
