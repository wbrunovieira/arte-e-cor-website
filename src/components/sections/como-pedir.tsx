"use client";

import { ChatCircleTextIcon, ReceiptIcon, TruckIcon, type Icon } from "@phosphor-icons/react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";

const PASSOS: { icon: Icon; titulo: string; texto: string }[] = [
  {
    icon: ChatCircleTextIcon,
    titulo: "Mande sua lista",
    texto: "Escreva o que precisa ou envie a foto do produto, da lata ou da parede. Se tiver dúvida, a gente orienta.",
  },
  {
    icon: ReceiptIcon,
    titulo: "Receba o orçamento",
    texto: "A equipe confere o estoque e responde com o valor, com desconto para quantidade.",
  },
  {
    icon: TruckIcon,
    titulo: "Receba em casa",
    texto: "Entrega grátis em Petrópolis, direto na sua casa ou na obra.",
  },
];

function Passo({ icon: Icone, titulo, texto, ultimo }: (typeof PASSOS)[number] & { ultimo: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const ativo = useInView(ref, { margin: "-35% 0px -45% 0px" });

  return (
    <li ref={ref} className={`relative pl-20 md:pl-28 ${ultimo ? "" : "pb-24 md:pb-40"}`}>
      <span
        className={`absolute left-0 top-0 grid size-14 place-items-center rounded-full ring-1 transition-[background-color,color,box-shadow] duration-700 ease-premium md:size-16 ${
          ativo ? "bg-accent text-accent-ink shadow-[0_16px_40px_-12px_rgb(242_117_39/0.8)] ring-accent" : "bg-surface text-brand ring-ink/10"
        }`}
      >
        <Icone weight="light" className="size-7 md:size-8" aria-hidden />
      </span>
      <motion.div animate={{ opacity: ativo ? 1 : 0.35 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <h3 className="font-display text-4xl font-semibold tracking-[-0.035em] md:text-6xl">{titulo}</h3>
        <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-muted md:text-xl">{texto}</p>
      </motion.div>
    </li>
  );
}

export function ComoPedir() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <section id="como-pedir" className="relative border-t border-ink/[0.08] py-24 md:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <h2 className="font-display text-[clamp(3.75rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.035em]">
                Pediu,
                <br />
                chegou.
              </h2>
              <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-muted md:text-xl">
                Sem sair de casa: mande a lista pelo WhatsApp e a gente entrega de graça em Petrópolis.
              </p>
              <WhatsAppButton className="mt-10" message="Olá! Quero fazer um pedido com entrega." />
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7 lg:pt-6">
          <span aria-hidden className="absolute bottom-0 left-7 top-6 w-px bg-ink/10 md:left-8">
            <motion.span style={{ scaleY }} className="block h-full w-full origin-top bg-accent" />
          </span>
          {PASSOS.map((passo, i) => (
            <Passo key={passo.titulo} {...passo} ultimo={i === PASSOS.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
