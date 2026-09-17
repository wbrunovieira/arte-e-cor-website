import Image from "next/image";
import { ClockIcon, CreditCardIcon, MapPinIcon, PhoneIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { DirectionsButton, WhatsAppButton } from "@/components/cta";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { Bezel, Eyebrow, SectionTitle } from "@/components/ui";
import { SITE, whatsappLink } from "@/lib/site";
import fachadaRua from "@/assets/img/fachada-rua.jpg";

function Linha({ icon, titulo, children }: { icon: ReactNode; titulo: string; children: ReactNode }) {
  return (
    // Só dt e dd dentro do div, como o <dl> exige; o ícone fica dentro do dt.
    <div className="relative py-4 pl-10">
      <dt className="text-sm text-muted">
        <span aria-hidden className="absolute left-0 top-[1.125rem] text-brand">
          {icon}
        </span>
        {titulo}
      </dt>
      <dd className="mt-0.5 leading-relaxed">{children}</dd>
    </div>
  );
}

export function Loja() {
  const { address, rating } = SITE;
  return (
    <section id="loja" className="relative isolate overflow-hidden border-t border-ink/[0.08] py-24 md:py-40">
      <div aria-hidden className="tile-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] opacity-[0.08]" />

      <div className="mx-auto max-w-[88rem] px-4 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Visite a loja</Eyebrow>
            <SectionTitle className="mt-6">O sobrado de azulejos da Coronel Veiga.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-3">
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted md:text-xl">
              Pertinho do Centro de Petrópolis, com as portas abertas para a calçada e a prateleira cheia.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-12">
          <Reveal className="h-[26rem] lg:col-span-7 lg:h-auto lg:min-h-[42rem]">
            <Bezel className="h-full" core="bg-surface-2">
              <iframe
                src={SITE.mapEmbedUrl}
                title="Mapa com a localização da Arte e Cor Tintas e Ferragens"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 dark:[filter:invert(0.92)_hue-rotate(180deg)_saturate(0.8)]"
              />
            </Bezel>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Bezel className="h-full" core="bg-surface">
              <div className="flex h-full flex-col p-5 md:p-8">
                <div className="relative aspect-[1110/518] overflow-hidden rounded-[1.25rem]">
                  <Image src={fachadaRua} alt="Fachada da loja vista da rua, com letreiro e portas abertas" fill placeholder="blur" sizes="(max-width: 1024px) 90vw, 480px" className="object-cover" />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">Arte e Cor</h3>
                  <OpenStatus />
                </div>

                <dl className="mt-2 divide-y divide-ink/[0.08]">
                  <Linha icon={<MapPinIcon weight="light" className="size-6" />} titulo="Endereço">
                    {address.street}, {address.district}
                    <br />
                    {address.city}/{address.state}, CEP {address.postalCode}
                  </Linha>
                  <Linha icon={<ClockIcon weight="light" className="size-6" />} titulo="Horário">
                    Segunda a sexta, das 8h30 às 18h30
                    <br />
                    <span className="text-muted">Sábados e feriados: consulte pelo WhatsApp</span>
                  </Linha>
                  <Linha icon={<PhoneIcon weight="light" className="size-6" />} titulo="Contato">
                    <a href={SITE.phone.href} className="font-medium hover:text-brand">
                      {SITE.phone.display}
                    </a>
                    <span className="text-muted"> ou WhatsApp </span>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-medium hover:text-brand">
                      {SITE.whatsapp.display}
                    </a>
                  </Linha>
                  <Linha icon={<CreditCardIcon weight="light" className="size-6" />} titulo="Pagamento">
                    Aceitamos todos os cartões de crédito
                  </Linha>
                  <Linha icon={<StarIcon weight="light" className="size-6" />} titulo="Avaliação no Google">
                    <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand">
                      {rating.value.toString().replace(".", ",")} de 5, com {rating.count} avaliações
                    </a>
                  </Linha>
                </dl>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <DirectionsButton />
                  <WhatsAppButton message="Olá! Quero tirar uma dúvida antes de ir até a loja." />
                </div>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
