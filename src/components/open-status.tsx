"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type Status = { aberto: boolean; texto: string } | null;

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Só calcula de segunda a sexta: o horário de fim de semana ainda não foi confirmado.
function calcular(now = new Date()): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dia = get("weekday");
  if (!["Mon", "Tue", "Wed", "Thu", "Fri"].includes(dia)) return null;

  const agora = Number(get("hour")) * 60 + Number(get("minute"));
  const abre = toMinutes(SITE.hours.weekdays.open);
  const fecha = toMinutes(SITE.hours.weekdays.close);

  if (agora >= abre && agora < fecha) return { aberto: true, texto: "Aberto agora" };
  if (agora < abre) return { aberto: false, texto: "Abre hoje às 8h30" };
  if (dia !== "Fri") return { aberto: false, texto: "Abre amanhã às 8h30" };
  return null;
}

function useOpenStatus() {
  const [status, setStatus] = useState<Status>(null);
  useEffect(() => {
    const update = () => setStatus(calcular());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

function Pulse() {
  return (
    <span aria-hidden className="relative flex size-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
      <span className="relative size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

export function OpenStatus() {
  const status = useOpenStatus();
  if (!status) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        status.aberto ? "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300" : "bg-ink/[0.04] text-muted ring-ink/10"
      }`}
    >
      {status.aberto && <Pulse />}
      {status.texto}
    </span>
  );
}

export function HeroBadge({ tone = "default" }: { tone?: "default" | "onDark" }) {
  const status = useOpenStatus();
  const dark = tone === "onDark";
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ring-1 ${
        dark ? "bg-white/10 text-white/80 ring-white/15 backdrop-blur-md" : "bg-surface text-muted ring-ink/10"
      }`}
    >
      {status?.aberto && (
        <>
          <Pulse />
          <span className={dark ? "text-emerald-300" : "text-emerald-700 dark:text-emerald-300"}>Aberto agora</span>
          <span aria-hidden className={`hidden h-3 w-px sm:block ${dark ? "bg-white/20" : "bg-ink/15"}`} />
        </>
      )}
      <span className={status?.aberto ? "hidden sm:inline" : undefined}>Tintas e ferragens em Petrópolis</span>
    </span>
  );
}
