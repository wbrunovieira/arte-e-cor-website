import { FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { LogoMarca, LogoWordmark } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { NAV, SITE, whatsappLink } from "@/lib/site";

const social =
  "grid size-12 place-items-center rounded-full bg-ink/[0.04] text-ink ring-1 ring-ink/10 transition-[transform,color] duration-500 ease-premium hover:-translate-y-0.5 hover:text-brand";

export function SiteFooter() {
  const { address } = SITE;
  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.08] bg-surface">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 pb-16 pt-20 md:grid-cols-12 md:px-8 md:pt-28">
        <div className="md:col-span-5 lg:col-span-4">
          <LogoMarca className="w-20" />
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted">
            Tintas imobiliárias e automotivas, acessórios e ferragens em geral, com entrega grátis em Petrópolis.
          </p>
          <div className="mt-8 flex gap-2">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Arte e Cor" className={social}>
              <InstagramLogoIcon weight="light" className="size-5" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook da Arte e Cor" className={social}>
              <FacebookLogoIcon weight="light" className="size-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="text-sm font-medium text-muted">Contato</h2>
          <ul className="mt-5 space-y-3 leading-relaxed">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-block py-1 hover:text-brand">
                WhatsApp {SITE.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={SITE.phone.href} className="inline-block py-1 hover:text-brand">
                Telefone {SITE.phone.display}
              </a>
            </li>
            <li className="text-muted">
              {address.street}, {address.district}
              <br />
              {address.city}/{address.state}, CEP {address.postalCode}
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-sm font-medium text-muted">Horário</h2>
          <dl className="mt-5 space-y-2 leading-relaxed">
            <div>
              <dt className="text-muted">Segunda a sexta</dt>
              <dd>8h30 às 18h30</dd>
            </div>
            <div>
              <dt className="text-muted">Sábado</dt>
              <dd>8h30 às 15h30</dd>
            </div>
            <div>
              <dt className="text-muted">Domingo</dt>
              <dd>9h às 13h</dd>
            </div>
            <div>
              <dt className="text-muted">Feriados</dt>
              <dd>9h às 15h30</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-12 lg:col-span-3">
          <h2 className="text-sm font-medium text-muted">Navegue</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-block py-1 hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-[88rem] px-4 md:px-8">
        <Reveal y={90}>
          <LogoWordmark className="w-full text-brand" />
        </Reveal>
      </div>

      <div className="mt-10 border-t border-ink/[0.08]">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-4 py-7 text-sm text-muted md:flex-row md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}, <span className="whitespace-nowrap">CNPJ {SITE.cnpj}</span>
          </p>
          <p>Petrópolis, Rio de Janeiro</p>
        </div>
      </div>
    </footer>
  );
}
