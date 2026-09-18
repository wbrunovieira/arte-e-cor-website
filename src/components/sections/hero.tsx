"use client";

import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DirectionsButton, WhatsAppButton } from "@/components/cta";
import { HeroBadge } from "@/components/open-status";
import { PaintedWord } from "@/components/painted-word";
import { SITE } from "@/lib/site";

const EASE = [0.32, 0.72, 0, 1] as const;

function Linha({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
      <motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.15, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

function Surge({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useInView(sectionRef, { amount: 0.05 });
  const [tocando, setTocando] = useState(false);

  // Um rolo na cor de destaque "pinta" o vídeo na tela ao carregar.
  const progress = useMotionValue(reduce ? 1 : 0);
  const clipPath = useTransform(progress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const rollerX = useTransform(progress, (v) => `${v * 100}%`);
  const rollerOpacity = useTransform(progress, [0, 0.03, 0.94, 1], [0, 1, 1, 0]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration: 1.7, delay: 0.2, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [progress, reduce]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Com economia de dados ligada, fica só a foto: o vídeo tem mais de 1 MB.
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!visible || reduce || economia) {
      video.pause();
      return;
    }
    // O vídeo só começa a baixar depois do load, para não disputar banda com a foto e as fontes.
    // A fonte é escolhida aqui (e não no JSX) para o navegador baixar um arquivo só:
    // no celular, a versão de 720px tem 330 KB no lugar de 1,17 MB.
    const tocar = () => {
      const grande = window.matchMedia("(min-width: 1024px)").matches;
      const fonte = grande ? "/video/hero.mp4" : "/video/hero-mobile.mp4";
      if (!video.src.endsWith(fonte)) video.src = fonte;
      video.play().catch(() => {});
    };
    if (document.readyState === "complete") {
      tocar();
      return;
    }
    window.addEventListener("load", tocar, { once: true });
    return () => window.removeEventListener("load", tocar);
  }, [visible, reduce]);

  return (
    <section ref={sectionRef} id="topo" className="relative px-2 pt-2 md:px-3 md:pt-3">
      <div className="relative isolate flex min-h-[calc(100svh-0.5rem)] flex-col overflow-hidden rounded-[1.75rem] bg-band text-[#f3f5f9] md:min-h-[calc(100svh-0.75rem)] md:rounded-[2.5rem]">
        {/* A foto em cinza aparece no primeiro paint (é o LCP) e o rolo pinta a cor por cima dela. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src="/video/hero-poster.jpg" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover brightness-75 grayscale" />
        </div>

        <motion.div aria-hidden style={{ clipPath }} className="absolute inset-0 -z-10">
          <motion.div style={{ scale: videoScale }} className="absolute inset-0">
            <Image src="/video/hero-poster.jpg" alt="" fill sizes="100vw" loading="eager" className="object-cover" />
            <video
              ref={videoRef}
              onPlaying={() => setTocando(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${tocando ? "opacity-100" : "opacity-0"}`}
              muted
              loop
              playsInline
              preload="none"
            />
          </motion.div>
        </motion.div>

        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-t from-[#061122] via-[#061122]/55 to-[#061122]/15" />
          <div className="absolute inset-0 bg-linear-to-r from-[#061122]/75 via-[#061122]/15 to-transparent" />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div style={{ x: rollerX, opacity: rollerOpacity }} className="absolute inset-y-0 left-0 w-full">
            <span className="absolute inset-y-0 left-0 w-4 -translate-x-1/2 bg-accent shadow-[0_0_60px_16px_rgb(242_117_39/0.45)]" />
          </motion.div>
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-end px-5 pb-7 pt-32 md:px-10 md:pb-12 lg:px-14 lg:pb-14"
        >
          <Surge delay={0.3}>
            <HeroBadge tone="onDark" />
          </Surge>

          <h1 className="mt-6 max-w-6xl font-display text-[clamp(3.2rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
            <Linha delay={0.35}>Tudo para sua</Linha>
            <Linha delay={0.48}>
              <PaintedWord delay={1.1}>pintura</PaintedWord>.
            </Linha>
          </h1>

          <Surge delay={0.7} className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:mt-14 lg:grid-cols-12 lg:items-center">
            <p className="max-w-[40ch] text-lg leading-relaxed text-white/80 md:text-xl lg:col-span-5">
              Tintas das melhores marcas, acessórios e ferragens. Peça pelo WhatsApp e receba com entrega grátis em Petrópolis.
            </p>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-6">
              <WhatsAppButton />
              <DirectionsButton tone="onDark" />
            </div>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-end gap-4 text-white/75 transition-colors hover:text-white lg:col-span-3 lg:flex"
            >
              <span className="font-display text-5xl font-semibold tracking-[-0.03em] text-white">
                {SITE.rating.value.toString().replace(".", ",")}
              </span>
              <span className="text-sm leading-snug">
                <span className="flex gap-0.5 text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} weight="fill" className="size-4" />
                  ))}
                </span>
                {SITE.rating.count} avaliações no Google
              </span>
            </a>
          </Surge>
        </motion.div>
      </div>
    </section>
  );
}
