import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

const NUMEROS: { valor: ReactNode; legenda: string }[] = [
  { valor: "R$ 0", legenda: "de entrega em Petrópolis" },
  {
    valor: (
      <>
        <CountUp to={SITE.rating.value} decimals={1} />
        <StarIcon weight="fill" aria-hidden className="ml-1.5 inline size-[0.42em] -translate-y-[0.45em] text-accent" />
      </>
    ),
    legenda: `no Google, com ${SITE.rating.count} avaliações`,
  },
  { valor: <CountUp to={11} />, legenda: "marcas líderes na prateleira" },
  { valor: "8h30", legenda: "abrimos de segunda a sexta" },
];

export function Numeros() {
  return (
    <section aria-label="A loja em números" className="py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-4 md:px-8">
        <Reveal>
          <p className="max-w-5xl font-display text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em]">
            Uma loja de bairro com prateleira de loja grande.
            <span className="mt-2 block text-muted/70 md:mt-3">Entrega na porta, desconto na quantidade e atendimento de quem entende de tinta.</span>
          </p>
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-8 md:mt-28 lg:grid-cols-4">
          {NUMEROS.map((n, i) => (
            <Reveal key={n.legenda} delay={i * 0.08} className="flex flex-col-reverse border-t border-ink/10 pt-7">
              <dt className="mt-3 text-base text-muted md:text-lg">{n.legenda}</dt>
              <dd className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.035em]">{n.valor}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
