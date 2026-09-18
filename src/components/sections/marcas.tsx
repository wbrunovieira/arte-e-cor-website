import { LogoPincel } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/ui";

const MARCAS = [
  "Sherwin-Williams",
  "Suvinil",
  "Coral",
  "Eucatex",
  "Quartzolit",
  "Atlas",
  "Hydronorth",
  "Resicril",
];

function Faixa({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {MARCAS.map((marca, i) => (
        <div key={marca} className="flex items-center">
          <span
            className={`whitespace-nowrap px-7 font-display text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.03em] md:px-12 ${
              i % 2 === 0 ? "text-ink" : "text-outline"
            }`}
          >
            {marca}
          </span>
          <LogoPincel className="w-12 text-accent md:w-20" />
        </div>
      ))}
    </div>
  );
}

export function Marcas() {
  return (
    <section id="marcas" className="overflow-hidden py-24 md:py-40">
      <div className="mx-auto grid max-w-[88rem] items-end gap-6 px-4 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <SectionTitle>As melhores marcas em um único lugar</SectionTitle>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:pb-3">
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted md:text-xl">
            Das tintas às ferramentas, as marcas que o pintor profissional já conhece e confia.
          </p>
        </Reveal>
      </div>

      <ul className="sr-only">
        {MARCAS.map((marca) => (
          <li key={marca}>{marca}</li>
        ))}
      </ul>

      <div
        className="marquee mt-16 border-y border-ink/[0.08] py-10 md:mt-24 md:py-14"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div aria-hidden className="marquee-track flex w-max">
          <Faixa />
          <Faixa hidden />
        </div>
      </div>
    </section>
  );
}
