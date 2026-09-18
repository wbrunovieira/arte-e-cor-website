"use client";

import Image from "next/image";
import { PaintBucketIcon, PaintRollerIcon, PercentIcon } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Bezel, Eyebrow, SectionTitle } from "@/components/ui";
import prateleiraLatas from "@/assets/img/prateleira-latas.jpg";
import pintorRolo from "@/assets/img/pintor-rolo.jpg";
import trinchas from "@/assets/img/trinchas.jpg";

const VANTAGENS = [
  { icon: PercentIcon, texto: "Desconto para compras em quantidade" },
  { icon: PaintRollerIcon, texto: "Rolos, trinchas e espátulas da linha profissional Atlas" },
  { icon: PaintBucketIcon, texto: "Prateleira cheia: tinta, massa e impermeabilizante para a obra" },
];

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export function Profissionais() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yB = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yC = useTransform(scrollYProgress, [0, 1], [30, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-40">
      <div className="mx-auto grid max-w-[88rem] items-center gap-16 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="grid grid-cols-2 gap-3 md:relative md:block md:h-[46rem] lg:col-span-6">
          <motion.div style={desktop ? { y: yA } : undefined} className="col-span-2 md:absolute md:left-0 md:top-0 md:w-[58%]">
            <div className="md:-rotate-3">
              <Bezel core="aspect-[4/5]">
                <Image src={pintorRolo} alt="Pintor usando rolo com extensor da linha Duplo Profissional Atlas" fill placeholder="blur" sizes="(max-width: 768px) 92vw, 420px" className="object-cover" />
              </Bezel>
            </div>
          </motion.div>
          <motion.div style={desktop ? { y: yB } : undefined} className="md:absolute md:right-0 md:top-[26%] md:w-[52%]">
            <div className="md:rotate-[4deg]">
              <Bezel core="aspect-square md:aspect-[1080/630]">
                <Image src={prateleiraLatas} alt="Prateleira da loja cheia de latas de tinta Sherwin-Williams e Suvinil" fill placeholder="blur" sizes="(max-width: 768px) 46vw, 380px" className="object-cover" />
              </Bezel>
            </div>
          </motion.div>
          <motion.div style={desktop ? { y: yC } : undefined} className="md:absolute md:bottom-0 md:left-[20%] md:w-[34%]">
            <div className="md:-rotate-6">
              <Bezel core="aspect-square md:aspect-[4/5]">
                <Image src={trinchas} alt="Trinchas Atlas de cabos coloridos" fill placeholder="blur" sizes="(max-width: 768px) 46vw, 260px" className="object-cover object-top" />
              </Bezel>
            </div>
          </motion.div>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Eyebrow>Para profissionais</Eyebrow>
          <SectionTitle className="mt-6">Pintor, empreiteiro ou obra grande?</SectionTitle>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted md:text-xl">
            Monte o pedido da obra com quem entende do assunto e receba tudo no endereço do serviço.
          </p>
          <ul className="mt-10 divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
            {VANTAGENS.map(({ icon: Icone, texto }) => (
              <li key={texto} className="flex items-center justify-between gap-6 py-5 text-lg md:text-xl">
                {texto}
                <Icone weight="light" className="size-7 shrink-0 text-brand" aria-hidden />
              </li>
            ))}
          </ul>
          <WhatsAppButton className="mt-10" message="Olá! Sou profissional e quero um orçamento para obra." />
        </Reveal>
      </div>
    </section>
  );
}
