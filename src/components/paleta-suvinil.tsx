"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

export type CorSuvinil = { nome: string; codigo: string; hex: string; familia: string };

type Catalogo = { atualizadoEm: string; total: number; familias: Record<string, [string, string, string][]> };

const ROTULOS: Record<string, string> = {
  brancos: "Brancos",
  cinzas: "Cinzas",
  beges: "Beges",
  amarelos: "Amarelos",
  laranjas: "Laranjas",
  vermelhos: "Vermelhos",
  rosas: "Rosas",
  roxos: "Roxos",
  azuis: "Azuis",
  verdes: "Verdes",
};

// Uma cor de cada família para a bolinha do botão, escolhida entre as do próprio catálogo.
const AMOSTRAS: Record<string, string> = {
  brancos: "#F2EFE6",
  cinzas: "#A9ACAB",
  beges: "#DEC9A9",
  amarelos: "#F9D428",
  laranjas: "#E07A3C",
  vermelhos: "#B33A34",
  rosas: "#D98BA6",
  roxos: "#7A5C9E",
  azuis: "#2E6EA6",
  verdes: "#5E8C61",
};

/** Carrega o catálogo (61 KB) só quando o simulador está perto da tela. */
export function useCatalogoSuvinil(ativo: boolean) {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null);

  useEffect(() => {
    if (!ativo || catalogo) return;
    let vivo = true;
    import("@/lib/cores-suvinil.json").then((m) => vivo && setCatalogo(m.default as unknown as Catalogo));
    return () => {
      vivo = false;
    };
  }, [ativo, catalogo]);

  const porHex = useMemo(() => {
    const mapa = new Map<string, CorSuvinil>();
    if (!catalogo) return mapa;
    for (const [familia, cores] of Object.entries(catalogo.familias)) {
      for (const [nome, codigo, hex] of cores) mapa.set(hex.toUpperCase(), { nome, codigo, hex, familia });
    }
    return mapa;
  }, [catalogo]);

  return { catalogo, porHex };
}

export function PaletaSuvinil({
  catalogo,
  selecionada,
  onEscolher,
}: {
  catalogo: Catalogo | null;
  selecionada: string;
  onEscolher: (cor: CorSuvinil) => void;
}) {
  const [familia, setFamilia] = useState("azuis");
  const [busca, setBusca] = useState("");

  const familias = catalogo ? Object.keys(catalogo.familias) : Object.keys(ROTULOS);

  const cores = useMemo<CorSuvinil[]>(() => {
    if (!catalogo) return [];
    const termo = busca.trim().toLowerCase();
    const de = (f: string) => catalogo.familias[f].map(([nome, codigo, hex]) => ({ nome, codigo, hex, familia: f }));
    if (!termo) return de(familia);
    // Busca vale para o catálogo inteiro: quem sabe o nome ou o código não precisa achar a família.
    return familias
      .flatMap(de)
      .filter((c) => c.nome.toLowerCase().includes(termo) || c.codigo.toLowerCase().includes(termo))
      .slice(0, 120);
  }, [catalogo, familia, busca, familias]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-band-ink/60">
          {catalogo ? `${catalogo.total} cores do leque Suvinil` : "Carregando as cores da Suvinil…"}
        </p>
        <label className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 ring-1 ring-white/15 focus-within:ring-accent sm:w-64">
          <MagnifyingGlassIcon weight="regular" className="size-4 shrink-0 text-band-ink/60" aria-hidden />
          <span className="sr-only">Buscar cor por nome ou código</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou código"
            className="min-w-0 flex-1 bg-transparent text-sm text-band-ink outline-none placeholder:text-band-ink/45"
          />
          {busca && (
            <button type="button" onClick={() => setBusca("")} aria-label="Limpar busca" className="shrink-0 text-band-ink/60 hover:text-band-ink">
              <XIcon weight="bold" className="size-4" />
            </button>
          )}
        </label>
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {familias.map((f) => {
          const ativo = f === familia && !busca;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={ativo}
              onClick={() => {
                setBusca("");
                setFamilia(f);
              }}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full py-2 pl-2 pr-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent ${
                ativo ? "bg-white text-[#0f2344]" : "bg-white/[0.08] text-band-ink/80 ring-1 ring-white/15 hover:bg-white/15"
              }`}
            >
              <span aria-hidden className="size-5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: AMOSTRAS[f] }} />
              {ROTULOS[f] ?? f}
              {catalogo && <span className={ativo ? "text-[#0f2344]/50" : "text-band-ink/45"}>{catalogo.familias[f].length}</span>}
            </button>
          );
        })}
      </div>

      <div
        role="radiogroup"
        aria-label="Cores Suvinil"
        data-lenis-prevent
        className="no-scrollbar mt-4 grid max-h-[22rem] grid-cols-3 gap-2 overflow-y-auto rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 sm:grid-cols-4 lg:max-h-[26rem] lg:grid-cols-5"
      >
        {!catalogo &&
          Array.from({ length: 15 }).map((_, i) => <span key={i} className="h-[5.5rem] animate-pulse rounded-xl bg-white/[0.06]" />)}

        {catalogo && cores.length === 0 && (
          <p className="col-span-full px-1 py-6 text-sm text-band-ink/70">
            Nenhuma cor com “{busca}”. Tente outro nome ou o código da cartela, como B522.
          </p>
        )}

        {cores.map((c) => {
          const ativo = c.hex.toUpperCase() === selecionada.toUpperCase();
          return (
            <button
              key={c.codigo + c.hex}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => onEscolher(c)}
              title={`${c.nome} · ${c.codigo}`}
              className={`group rounded-xl bg-white/[0.06] p-1.5 text-left transition-colors duration-300 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent ${
                ativo ? "ring-2 ring-accent" : ""
              }`}
            >
              <span className="block h-12 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
              <span className="mt-1.5 block truncate px-0.5 text-[11px] font-semibold leading-tight text-band-ink">{c.nome}</span>
              <span className="block px-0.5 text-[11px] leading-tight text-band-ink/50">{c.codigo}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
