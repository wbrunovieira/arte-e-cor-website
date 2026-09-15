"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LogoPincel } from "@/components/brand";
import { WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export function CtaFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-28, 12]);
  const x = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section className="px-3 pb-24 md:px-8 md:pb-32">
      <Reveal>
        <div ref={ref} className="mx-auto max-w-[88rem] rounded-[2.75rem] bg-ink/[0.035] p-2 ring-1 ring-ink/[0.07]">
          <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-band px-6 py-20 text-band-ink shadow-[inset_0_1px_1px_rgb(255_255_255/0.12)] md:px-16 md:py-32">
            <div aria-hidden className="pointer-events-none absolute -right-48 bottom-[-4rem] -z-10 w-[34rem] opacity-25 md:-right-28 md:bottom-auto md:top-1/2 md:w-[60rem] md:-translate-y-1/2 md:opacity-100">
              <motion.div style={{ rotate, x }}>
                <LogoPincel className="w-full text-accent" />
              </motion.div>
            </div>

            <div className="relative max-w-3xl">
              <h2 className="font-display text-[clamp(2.9rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
                Sua próxima pintura começa com uma mensagem.
              </h2>
              <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-band-ink/75 md:text-xl">
                Mande sua lista agora e receba com entrega grátis em Petrópolis.
              </p>
              <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <WhatsAppButton message="Olá! Quero fazer um pedido." />
                <a href={SITE.phone.href} className="font-medium text-band-ink/80 underline-offset-4 transition-colors hover:text-band-ink hover:underline">
                  ou ligue {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
