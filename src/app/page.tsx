import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ComoPedir } from "@/components/sections/como-pedir";
import { CtaFinal } from "@/components/sections/cta-final";
import { Dicas } from "@/components/sections/dicas";
import { Hero } from "@/components/sections/hero";
import { Loja } from "@/components/sections/loja";
import { Marcas } from "@/components/sections/marcas";
import { Numeros } from "@/components/sections/numeros";
import { Produtos } from "@/components/sections/produtos";
import { Profissionais } from "@/components/sections/profissionais";
import { Simulador } from "@/components/sections/simulador";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "@id": `${SITE.url}/#loja`,
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo-icone.png`,
  image: [`${SITE.url}/opengraph-image.jpg`, `${SITE.url}/brand/logo-icone.png`],
  telephone: "+55 24 2242-7228",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${SITE.whatsapp.number}`,
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  hasMap: SITE.mapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.postalCode,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: SITE.hours.weekdays.open,
      closes: SITE.hours.weekdays.close,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: SITE.hours.saturday.open,
      closes: SITE.hours.saturday.close,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: SITE.hours.sunday.open,
      closes: SITE.hours.sunday.close,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "PublicHolidays",
      opens: SITE.hours.holidays.open,
      closes: SITE.hours.holidays.close,
    },
  ],
  areaServed: { "@type": "City", name: "Petrópolis" },
  paymentAccepted: "Cartão de crédito",
  currenciesAccepted: "BRL",
  sameAs: [SITE.instagram, SITE.facebook],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main>
        <Hero />
        <Numeros />
        <Produtos />
        <Simulador />
        <Marcas />
        <ComoPedir />
        <Profissionais />
        <Dicas />
        <Loja />
        <CtaFinal />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
