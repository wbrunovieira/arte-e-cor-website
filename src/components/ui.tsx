import type { ReactNode } from "react";

type Tone = "default" | "onDark";

// Moldura dupla: uma bandeja externa com contorno fino e o conteúdo encaixado dentro, com raio concêntrico.
export function Bezel({
  children,
  className = "",
  core = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  core?: string;
  tone?: Tone;
}) {
  const shell = tone === "onDark" ? "bg-white/[0.06] ring-white/10" : "bg-ink/[0.035] ring-ink/[0.07]";
  return (
    <div className={`rounded-[2rem] p-1.5 ring-1 ${shell} ${className}`}>
      <div className={`relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgb(255_255_255/0.18)] ${core}`}>
        {children}
      </div>
    </div>
  );
}

export function Eyebrow({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  const styles = tone === "onDark" ? "bg-white/[0.06] text-band-ink/80 ring-white/15" : "bg-surface text-muted ring-ink/10";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ring-1 ${styles}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] ${className}`}>
      {children}
    </h2>
  );
}
