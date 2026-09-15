import Image, { type StaticImageData } from "next/image";
import { ArrowUpRightIcon, CarProfileIcon, DropIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { Bezel, SectionTitle } from "@/components/ui";
import { whatsappLink } from "@/lib/site";
import grelha from "@/assets/img/grelha.jpg";
import lixadeira from "@/assets/img/lixadeira.jpg";
import roloTextura from "@/assets/img/rolo-textura.jpg";
import tintasLatas from "@/assets/img/tintas-latas.jpg";

type IslandTone = "image" | "light" | "band" | "accent";

const islandTones: Record<IslandTone, string> = {
  image: "bg-white/20 text-white ring-white/25 group-hover:bg-accent group-hover:text-accent-ink group-hover:ring-accent",
  light: "bg-[#0f2344]/[0.06] text-[#0f2344] ring-[#0f2344]/10 group-hover:bg-accent group-hover:ring-accent",
  band: "bg-white/10 text-band-ink ring-white/15 group-hover:bg-accent group-hover:text-accent-ink group-hover:ring-accent",
  accent: "bg-accent-ink/10 text-accent-ink ring-accent-ink/15 group-hover:bg-accent-ink group-hover:text-accent",
};

function Island({ tone }: { tone: IslandTone }) {
  return (
    <span
      aria-hidden
      className={`grid size-12 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color,color] duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-105 ${islandTones[tone]}`}
    >
      <ArrowUpRightIcon weight="regular" className="size-5" />
    </span>
  );
}

function FotoCard({ titulo, texto, imagem, alt, mensagem, posicao = "center" }: { titulo: string; texto: string; imagem: StaticImageData; alt: string; mensagem: string; posicao?: string }) {
  return (
    <a href={whatsappLink(mensagem)} target="_blank" rel="noopener noreferrer" className="group block h-full focus-visible:outline-none">
      <Bezel className="h-full transition-shadow duration-700 ease-premium group-focus-visible:ring-4 group-focus-visible:ring-brand/40" core="bg-surface-2">
        <Image
          src={imagem}
          alt={alt}
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          style={{ objectPosition: posicao }}
          className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06]"
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-[#061122]/90 via-[#061122]/25 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
          <span>
            <span className="block font-display text-3xl font-semibold tracking-[-0.03em] text-white">{titulo}</span>
            <span className="mt-1.5 block max-w-[30ch] text-[15px] leading-relaxed text-white/75">{texto}</span>
          </span>
          <Island tone="image" />
        </span>
      </Bezel>
    </a>
  );
}

export function Produtos() {
  return (
    <section id="produtos" className="pb-24 md:pb-40">
      <div className="mx-auto max-w-[88rem] px-4 md:px-8">
        <Reveal>
          <SectionTitle className="max-w-4xl">O que você encontra na Arte e Cor</SectionTitle>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl">
            Toque em uma categoria e peça seu orçamento direto no WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-2 lg:auto-rows-[17.5rem] lg:grid-cols-12">
          <Reveal className="h-[30rem] md:col-span-2 lg:col-span-7 lg:row-span-2 lg:h-auto">
            <a href={whatsappLink("Olá! Quero um orçamento de tintas imobiliárias.")} target="_blank" rel="noopener noreferrer" className="group block h-full focus-visible:outline-none">
              <Bezel className="h-full" core="bg-white">
                <span className="relative z-10 flex items-start justify-between gap-6 p-7 md:p-10">
                  <span>
                    <span className="block font-display text-4xl font-semibold tracking-[-0.035em] text-[#0f2344] md:text-6xl">Tintas imobiliárias</span>
                    <span className="mt-4 block max-w-[40ch] text-base leading-relaxed text-[#4a5a73] md:text-lg">
                      Interior, exterior, esmalte, piso e massas de Suvinil, Coral, Eucatex, Lukscolor e Sherwin-Williams.
                    </span>
                  </span>
                  <Island tone="light" />
                </span>
                <span className="absolute inset-x-4 bottom-2 top-[44%] md:inset-x-10">
                  <Image
                    src={tintasLatas}
                    alt="Latas de tinta Suvinil, Eucatex, Coral, Lukscolor e resina Resicril"
                    fill
                    sizes="(max-width: 1024px) 90vw, 760px"
                    className="origin-bottom object-contain object-bottom transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
                  />
                </span>
              </Bezel>
            </a>
          </Reveal>

          <Reveal delay={0.08} className="h-[22rem] lg:col-span-5 lg:h-auto">
            <FotoCard
              titulo="Acessórios de pintura"
              texto="Rolos, trinchas, espátulas e bandejas."
              imagem={roloTextura}
              alt="Rolo de pintura aplicando tinta azul em parede texturizada"
              mensagem="Olá! Quero um orçamento de acessórios de pintura."
              posicao="50% 30%"
            />
          </Reveal>

          <Reveal delay={0.14} className="h-[22rem] lg:col-span-5 lg:h-auto">
            <FotoCard
              titulo="Ferramentas"
              texto="Lixadeiras Atlas Powertech para acabamento."
              imagem={lixadeira}
              alt="Lixadeira orbital Atlas Powertech vermelha"
              mensagem="Olá! Quero um orçamento de ferramentas."
            />
          </Reveal>

          <Reveal delay={0.08} className="h-[22rem] lg:col-span-4 lg:h-auto">
            <a href={whatsappLink("Olá! Quero um orçamento de impermeabilizantes e argamassas.")} target="_blank" rel="noopener noreferrer" className="group block h-full focus-visible:outline-none">
              <Bezel className="h-full" core="bg-band text-band-ink">
                <span className="flex h-full flex-col justify-between p-6 md:p-7">
                  <span className="flex items-start justify-between">
                    <DropIcon weight="light" aria-hidden className="size-16 text-brand-soft" />
                    <Island tone="band" />
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-semibold tracking-[-0.03em]">Impermeabilização</span>
                    <span className="mt-1.5 block max-w-[30ch] text-[15px] leading-relaxed text-band-ink/70">
                      Resicril, Hydronorth e Quartzolit para muros, lajes e áreas úmidas.
                    </span>
                  </span>
                </span>
              </Bezel>
            </a>
          </Reveal>

          <Reveal delay={0.14} className="h-[22rem] lg:col-span-4 lg:h-auto">
            <FotoCard
              titulo="Casa e banheiro"
              texto="Ferragens e utilidades para o dia a dia."
              imagem={grelha}
              alt="Grelha de inox Atlas para tanque na embalagem"
              mensagem="Olá! Quero um orçamento de ferragens e utilidades para casa."
            />
          </Reveal>

          <Reveal delay={0.2} className="h-[22rem] md:col-span-2 lg:col-span-4 lg:h-auto">
            <a href={whatsappLink("Olá! Quero saber sobre tintas automotivas.")} target="_blank" rel="noopener noreferrer" className="group block h-full focus-visible:outline-none">
              <Bezel className="h-full" core="bg-accent text-accent-ink">
                <span className="flex h-full flex-col justify-between p-6 md:p-7">
                  <span className="flex items-start justify-between">
                    <CarProfileIcon weight="light" aria-hidden className="size-20 transition-transform duration-700 ease-premium group-hover:translate-x-2" />
                    <Island tone="accent" />
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-semibold tracking-[-0.03em]">Tintas automotivas</span>
                    <span className="mt-1.5 block max-w-[30ch] text-[15px] leading-relaxed text-accent-ink/75">
                      Consulte marcas e cores disponíveis para o seu carro.
                    </span>
                  </span>
                </span>
              </Bezel>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
