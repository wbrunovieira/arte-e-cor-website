"use client";

import {
  ArrowCounterClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  EraserIcon,
  HandTapIcon,
  HouseLineIcon,
  ImageSquareIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react";
import { WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Bezel, Eyebrow, SectionTitle } from "@/components/ui";
import { floodSelect, loadMask, loadPixels, mergeRegion, parseHex, recolor, toHex } from "@/lib/recolor";

type Cor = { nome: string; hex: string };
type Ponto = { x: number; y: number };

// Cores do catálogo Suvinil, a marca da máquina tintométrica da loja.
// Os valores são a referência em tela de cada cor; o tom final sai da máquina.
const SUGESTOES: Cor[] = [
  { nome: "Algodão Egípcio", hex: "#EAE3D5" },
  { nome: "Rosa-queimado", hex: "#D0A993" },
  { nome: "Tijolo", hex: "#C16C45" },
  { nome: "Amarelo Real", hex: "#F9D428" },
  { nome: "Verde-catamarã", hex: "#B2CFC5" },
  { nome: "Azul-polar", hex: "#C6D7E5" },
  { nome: "Azul-petróleo", hex: "#0A747C" },
];

const EXEMPLO = { foto: "/simulador/casa.webp", mascara: "/simulador/casa-mask.png" };
const EASE = [0.32, 0.72, 0, 1] as const;

function nomeDaCor(hex: string) {
  return SUGESTOES.find((c) => c.hex === hex)?.nome ?? "Cor personalizada";
}

function Leque({ cor, onChange }: { cor: Cor; onChange: (c: Cor) => void }) {
  const meio = (SUGESTOES.length - 1) / 2;
  return (
    <>
      <div role="radiogroup" aria-label="Cores Suvinil sugeridas" className="relative mx-auto hidden h-[21rem] w-full max-w-2xl md:block">
        {SUGESTOES.map((c, i) => {
          const ativo = c.hex === cor.hex;
          return (
            <motion.button
              key={c.hex}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => onChange(c)}
              style={{ zIndex: ativo ? 40 : 10 + i, transformOrigin: "50% 165%" }}
              animate={{ rotate: (i - meio) * 13, y: ativo ? -8 : 0 }}
              whileHover={{ y: ativo ? -8 : -10 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className={`absolute bottom-6 left-1/2 -ml-[3.5rem] flex h-60 w-[7rem] flex-col rounded-2xl bg-white p-1.5 text-left shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent ${ativo ? "ring-[3px] ring-accent" : "ring-1 ring-black/5"}`}
            >
              {/* No leque só o topo de cada cartela aparece: o nome vai em cima. */}
              <span className="block max-w-[4.75rem] px-1.5 pb-2 pt-1 text-[10px] font-semibold leading-[1.15] text-[#0f2344]">{c.nome}</span>
              <span className="block flex-1 rounded-[0.8rem]" style={{ backgroundColor: c.hex }} />
            </motion.button>
          );
        })}
      </div>

      <div role="radiogroup" aria-label="Cores Suvinil sugeridas" className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 pt-4 md:hidden">
        {SUGESTOES.map((c) => {
          const ativo = c.hex === cor.hex;
          return (
            <button
              key={c.hex}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => onChange(c)}
              className={`flex h-36 w-24 shrink-0 snap-start flex-col rounded-2xl bg-white p-1.5 text-left transition-transform duration-500 ease-premium ${ativo ? "-translate-y-2 ring-4 ring-accent" : "ring-1 ring-black/5"}`}
            >
              <span className="block flex-1 rounded-[0.8rem]" style={{ backgroundColor: c.hex }} />
              <span className="block px-1 pb-0.5 pt-1.5 text-[11px] font-semibold leading-tight text-[#0f2344]">{c.nome}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function Simulador() {
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const antesRef = useRef<HTMLCanvasElement>(null);
  const depoisRef = useRef<HTMLCanvasElement>(null);
  const arrastando = useRef(false);
  const inView = useInView(areaRef, { once: true, amount: 0.4 });
  // A casa de exemplo só é baixada quando o simulador chega perto da tela.
  const perto = useInView(areaRef, { once: true, margin: "800px 0px" });

  const [fonte, setFonte] = useState<"exemplo" | "foto">("exemplo");
  const [pixels, setPixels] = useState<ImageData | null>(null);
  const [base, setBase] = useState<Float32Array | null>(null);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [precisao, setPrecisao] = useState(22);
  const [cor, setCor] = useState<Cor>(SUGESTOES[0]);
  const [hexDigitado, setHexDigitado] = useState(SUGESTOES[0].hex);
  const [pos, setPos] = useState(50);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Casa de exemplo: foto + máscara das paredes preparadas.
  useEffect(() => {
    if (fonte !== "exemplo" || !perto) return;
    let ativo = true;
    (async () => {
      const px = await loadPixels(EXEMPLO.foto, 1400);
      const mask = await loadMask(EXEMPLO.mascara, px.width, px.height);
      if (!ativo) return;
      setPixels(px);
      setBase(mask);
      setPontos([]);
      setCarregando(false);
    })().catch(() => ativo && setErro("Não foi possível carregar a casa de exemplo."));
    return () => {
      ativo = false;
    };
  }, [fonte, perto]);

  const mascara = useMemo(() => {
    if (!pixels) return null;
    let m = base ? new Float32Array(base) : new Float32Array(pixels.width * pixels.height);
    for (const p of pontos) m = mergeRegion(m, floodSelect(pixels, p.x, p.y, precisao), pixels.width, pixels.height);
    return m;
  }, [pixels, base, pontos, precisao]);

  useEffect(() => {
    const canvas = antesRef.current;
    if (!pixels || !canvas) return;
    canvas.width = pixels.width;
    canvas.height = pixels.height;
    canvas.getContext("2d")!.putImageData(pixels, 0, 0);
  }, [pixels]);

  useEffect(() => {
    const canvas = depoisRef.current;
    const rgb = parseHex(cor.hex);
    if (!pixels || !mascara || !canvas || !rgb) return;
    canvas.width = pixels.width;
    canvas.height = pixels.height;
    const ctx = canvas.getContext("2d")!;
    const out = ctx.createImageData(pixels.width, pixels.height);
    recolor(pixels, mascara, rgb, out);
    ctx.putImageData(out, 0, 0);
  }, [pixels, mascara, cor]);

  // Um vai e vem discreto na primeira vez que aparece, para mostrar que a barra é arrastável.
  useEffect(() => {
    if (!inView || reduce || carregando) return;
    const controls = animate(50, [50, 76, 50], { duration: 2.2, delay: 0.3, ease: EASE, onUpdate: setPos });
    return () => controls.stop();
  }, [inView, reduce, carregando]);

  const escolher = (c: Cor) => {
    setCor(c);
    setHexDigitado(c.hex);
  };

  const digitarHex = (valor: string) => {
    setHexDigitado(valor);
    const rgb = parseHex(valor);
    if (rgb) {
      const hex = toHex(rgb);
      setCor({ nome: nomeDaCor(hex), hex });
    }
  };

  const enviarFoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    e.target.value = "";
    if (!arquivo) return;
    setErro(null);
    setCarregando(true);
    try {
      const px = await loadPixels(arquivo, 1400);
      setFonte("foto");
      setPixels(px);
      setBase(null);
      setPontos([]);
      setPos(100);
    } catch {
      setErro("Não conseguimos abrir essa imagem. Tente uma foto em JPG ou PNG.");
    } finally {
      setCarregando(false);
    }
  };

  const tocar = (e: MouseEvent<HTMLDivElement>) => {
    if (!pixels || (e.target as HTMLElement).closest("[data-handle]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * pixels.width;
    const y = ((e.clientY - rect.top) / rect.height) * pixels.height;
    setPontos((p) => [...p, { x, y }]);
    if (pos > 90) setPos(0);
  };

  const moverBarra = (clientX: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (rect) setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const teclaBarra = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  const temSelecao = !!base || pontos.length > 0;
  const daSuvinil = SUGESTOES.some((c) => c.hex === cor.hex);
  const aspect = pixels ? `${pixels.width} / ${pixels.height}` : "3 / 2";
  const segment = (ativo: boolean) =>
    `inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:flex-none ${ativo ? "bg-white text-[#0f2344]" : "text-band-ink/75 hover:text-band-ink"}`;
  const ferramenta =
    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-band-ink ring-1 ring-white/15 transition-colors hover:bg-white/15 disabled:opacity-40";

  return (
    <section id="cores" className="relative isolate overflow-hidden bg-band py-24 text-band-ink md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] -z-10 size-[70rem] -translate-x-1/2 -translate-y-1/2 opacity-30 transition-colors duration-1000 ease-premium"
        style={{ backgroundColor: cor.hex, maskImage: "radial-gradient(closest-side, #000, transparent)", WebkitMaskImage: "radial-gradient(closest-side, #000, transparent)" }}
      />

      <div className="mx-auto max-w-[88rem] px-4 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="onDark">Simulador de cores Suvinil</Eyebrow>
            <SectionTitle className="mt-6">Veja a cor na parede antes de comprar.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-3">
            <p className="max-w-[44ch] text-lg leading-relaxed text-band-ink/75 md:text-xl">
              Cores do catálogo Suvinil, a marca da nossa máquina de tintas. Experimente na casa de exemplo ou envie a foto da sua parede e toque onde quer pintar.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-6xl md:mt-20">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex rounded-full bg-white/[0.08] p-1 ring-1 ring-white/15 sm:inline-flex">
              <button
                type="button"
                onClick={() => {
                  setErro(null);
                  setPos(50);
                  if (fonte !== "exemplo") {
                    setCarregando(true);
                    setFonte("exemplo");
                  }
                }}
                className={segment(fonte === "exemplo")}
              >
                <HouseLineIcon weight="regular" className="size-4" aria-hidden />
                Casa de exemplo
              </button>
              <label className={`${segment(fonte === "foto")} cursor-pointer focus-within:ring-2 focus-within:ring-accent`}>
                <ImageSquareIcon weight="regular" className="size-4" aria-hidden />
                Enviar minha foto
                <input type="file" accept="image/*" className="sr-only" onChange={enviarFoto} />
              </label>
            </div>

            <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
              <label className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white/[0.08] px-4 py-2 text-sm text-band-ink/80 ring-1 ring-white/15">
                Precisão
                <input
                  type="range"
                  min={6}
                  max={45}
                  value={precisao}
                  onChange={(e) => setPrecisao(Number(e.target.value))}
                  className="w-24 accent-[#f27527]"
                  aria-label="Precisão da seleção da parede"
                />
              </label>
              <button type="button" className={ferramenta} disabled={pontos.length === 0} onClick={() => setPontos((p) => p.slice(0, -1))}>
                <ArrowCounterClockwiseIcon weight="regular" className="size-4" aria-hidden />
                Desfazer
              </button>
              <button type="button" className={ferramenta} disabled={!temSelecao} onClick={() => { setBase(null); setPontos([]); }}>
                <EraserIcon weight="regular" className="size-4" aria-hidden />
                Limpar
              </button>
            </div>
          </div>

          <Bezel tone="onDark" className="md:rounded-[2.25rem] md:p-2.5" core="md:rounded-[1.625rem] bg-black/20">
            <div
              ref={areaRef}
              onClick={tocar}
              className="relative w-full cursor-crosshair select-none"
              style={{ aspectRatio: aspect }}
              aria-label="Foto para simular a cor. Toque em uma parede para pintá-la."
            >
              <canvas ref={antesRef} className="absolute inset-0 h-full w-full" aria-hidden />
              <canvas ref={depoisRef} className="absolute inset-0 h-full w-full" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden />

              {carregando && <div className="absolute inset-0 animate-pulse bg-white/5" />}

              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#061122]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">Antes</span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#061122]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">Depois</span>

              <AnimatePresence>
                {fonte === "foto" && !temSelecao && !carregando && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="pointer-events-none absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-[#061122]/75 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md"
                  >
                    <HandTapIcon weight="regular" className="size-5 text-accent" aria-hidden />
                    Toque nas paredes que quer pintar
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0" style={{ transform: `translateX(${pos}%)` }}>
                <span className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_24px_rgb(0_0_0/0.35)]" />
                <button
                  type="button"
                  data-handle
                  role="slider"
                  aria-label="Comparar antes e depois"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(pos)}
                  onKeyDown={teclaBarra}
                  onPointerDown={(e) => {
                    arrastando.current = true;
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => arrastando.current && moverBarra(e.clientX)}
                  onPointerUp={() => (arrastando.current = false)}
                  onPointerCancel={() => (arrastando.current = false)}
                  className="pointer-events-auto absolute left-0 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-full bg-white text-[#0f2344] shadow-[0_16px_40px_-12px_rgb(0_0_0/0.5)] ring-4 ring-white/30 focus-visible:outline-none focus-visible:ring-accent"
                >
                  <span className="flex">
                    <CaretLeftIcon weight="bold" className="size-4" />
                    <CaretRightIcon weight="bold" className="size-4" />
                  </span>
                </button>
              </div>
            </div>
          </Bezel>

          <p className="mt-4 flex items-center gap-2 text-sm text-band-ink/60">
            <LockSimpleIcon weight="regular" className="size-4 shrink-0" aria-hidden />
            {erro ?? "Sua foto é processada só neste aparelho. Nada é enviado para a internet."}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-6xl items-end gap-10 md:mt-8 lg:grid-cols-12">
          <Reveal className="order-2 min-w-0 lg:order-1 lg:col-span-5 lg:pb-10">
            <p className="text-sm font-medium text-band-ink/60">Cor escolhida</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="size-12 shrink-0 rounded-full ring-4 ring-white/10 transition-colors duration-700 ease-premium" style={{ backgroundColor: cor.hex }} />
              <span className="relative block h-12 flex-1 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={cor.nome + cor.hex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0 flex items-center font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
                  >
                    {cor.nome}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-full bg-white/[0.08] p-1.5 pl-5 ring-1 ring-white/15 focus-within:ring-accent">
              <label htmlFor="hex-cor" className="shrink-0 text-sm text-band-ink/70">
                Código HEX
              </label>
              <input
                id="hex-cor"
                value={hexDigitado}
                onChange={(e) => digitarHex(e.target.value)}
                maxLength={7}
                spellCheck={false}
                autoComplete="off"
                placeholder="#4F7552"
                className="min-w-0 flex-1 bg-transparent px-2 font-mono text-base uppercase text-band-ink outline-none placeholder:text-band-ink/40"
              />
              <label className="relative grid size-10 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full ring-2 ring-white/20" style={{ backgroundColor: cor.hex }}>
                <span className="sr-only">Escolher cor no seletor</span>
                <input type="color" value={cor.hex.toLowerCase()} onChange={(e) => digitarHex(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
              </label>
            </div>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-band-ink/55">
              Fazemos a cor na hora na máquina Suvinil da loja. Viu um tom em outro lugar? Digite o HEX aqui para simular. Na tela a cor muda com o monitor, então a gente confirma o tom na loja, na cartela.
            </p>

            <WhatsAppButton
              className="mt-8"
              message={
                daSuvinil
                  ? `Olá! Simulei a cor ${cor.nome} da Suvinil (${cor.hex}) no site. Quero um orçamento dessa tinta.`
                  : `Olá! Simulei a cor ${cor.hex} no site. Quero um orçamento dessa tinta.`
              }
            />
          </Reveal>

          <Reveal delay={0.15} className="order-1 min-w-0 lg:order-2 lg:col-span-7">
            <Leque cor={cor} onChange={escolher} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
