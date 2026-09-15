"use client";

import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon, CheckIcon, InstagramLogoIcon, XIcon } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Bezel, SectionTitle } from "@/components/ui";
import { DICAS, type Dica } from "@/lib/dicas";
import { SITE } from "@/lib/site";

const EASE = [0.32, 0.72, 0, 1] as const;

function DicaModal({ dica, onClose }: { dica: Dica; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose, lenis]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#061122]/55 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dica-${dica.slug}`}
        data-lenis-prevent
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.97 }}
        transition={{ duration: 0.7, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-surface p-2 sm:rounded-[2rem]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar dica"
          className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-surface/90 text-ink ring-1 ring-ink/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
        >
          <XIcon weight="regular" className="size-5" />
        </button>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.6rem]">
          <Image src={dica.imagem} alt={dica.alt} fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
        </div>
        <div className="p-6 md:p-10">
          <h3 id={`dica-${dica.slug}`} className="font-display text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
            {dica.titulo}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dica.intro}</p>
          <ul className="mt-6 divide-y divide-ink/[0.08]">
            {dica.itens.map((item) => (
              <li key={item} className="flex items-start gap-4 py-3.5 leading-relaxed">
                <CheckIcon weight="bold" className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <WhatsAppButton className="mt-8" message={`Olá! Li a dica "${dica.titulo}" no site e quero ajuda.`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Dicas() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [aberta, setAberta] = useState<Dica | null>(null);

  const rolar = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.clientWidth + 12), behavior: "smooth" });
  };

  const arrow =
    "grid size-14 place-items-center rounded-full bg-surface text-ink ring-1 ring-ink/10 transition-transform duration-500 ease-premium hover:scale-105 active:scale-95";

  return (
    <section id="dicas" className="overflow-hidden border-t border-ink/[0.08] py-24 md:py-40">
      <div className="mx-auto grid max-w-[88rem] items-end gap-8 px-4 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <SectionTitle>Dicas para pintar melhor</SectionTitle>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
            O que a gente responde todo dia no balcão, reunido em guias rápidos.
          </p>
        </Reveal>
        <div className="hidden justify-end gap-2 md:flex lg:col-span-4">
          <button type="button" onClick={() => rolar(-1)} aria-label="Dicas anteriores" className={arrow}>
            <CaretLeftIcon weight="regular" className="size-5" />
          </button>
          <button type="button" onClick={() => rolar(1)} aria-label="Próximas dicas" className={arrow}>
            <CaretRightIcon weight="regular" className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        data-lenis-prevent-wheel
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 scroll-px-4 md:mt-20 md:px-8 md:scroll-px-8 2xl:px-[calc((100vw-88rem)/2+2rem)] 2xl:scroll-px-[calc((100vw-88rem)/2+2rem)]"
      >
        {DICAS.map((dica, i) => (
          <li key={dica.slug} className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
            <Reveal delay={i * 0.06} className="h-full">
              <button type="button" onClick={() => setAberta(dica)} className="group flex h-full w-full flex-col text-left focus-visible:outline-none">
                <Bezel className="w-full group-focus-visible:ring-4 group-focus-visible:ring-brand/40" core="aspect-[4/3] bg-surface-2">
                  <Image
                    src={dica.imagem}
                    alt={dica.alt}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 440px"
                    className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06]"
                  />
                </Bezel>
                <span className="mt-6 block px-1 font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{dica.titulo}</span>
                <span className="mt-2 block px-1 leading-relaxed text-muted">{dica.resumo}</span>
                <span className="mt-5 inline-flex items-center gap-3 px-1 font-semibold text-brand">
                  Ler dica
                  <span className="grid size-8 place-items-center rounded-full bg-brand/10 transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
        <li className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="group block">
            <Bezel core="aspect-[4/3] bg-band text-band-ink">
              <span className="flex h-full flex-col justify-between p-7 md:p-8">
                <span className="flex items-start justify-between">
                  <InstagramLogoIcon weight="light" className="size-14 text-accent" aria-hidden />
                  <span className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRightIcon weight="regular" className="size-5" aria-hidden />
                  </span>
                </span>
                <span>
                  <span className="block font-display text-3xl font-semibold tracking-[-0.03em]">Mais dicas no Instagram</span>
                  <span className="mt-1 block text-band-ink/70">@arteecortintas.petropolis</span>
                </span>
              </span>
            </Bezel>
          </a>
        </li>
      </ul>

      <AnimatePresence>{aberta && <DicaModal dica={aberta} onClose={() => setAberta(null)} />}</AnimatePresence>
    </section>
  );
}
