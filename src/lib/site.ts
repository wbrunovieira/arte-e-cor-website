export const SITE = {
  name: "Arte e Cor Tintas e Ferragens",
  shortName: "Arte e Cor",
  legalName: "Arte e Cor Tintas LTDA",
  cnpj: "49.699.801/0001-86",
  // Domínio ainda não definido; ajuste NEXT_PUBLIC_SITE_URL no deploy.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arteecorpetropolis.com.br",
  description:
    "Tintas imobiliárias e automotivas, acessórios de pintura e ferragens em Petrópolis/RJ. Peça pelo WhatsApp com entrega grátis.",
  whatsapp: { display: "(24) 98865-1692", number: "5524988651692" },
  phone: { display: "(24) 2242-7228", href: "tel:+552422427228" },
  address: {
    street: "Rua Coronel Veiga, 183",
    district: "Coronel Veiga",
    city: "Petrópolis",
    state: "RJ",
    postalCode: "25655-151",
  },
  // Horário confirmado de segunda a sexta; sábado e domingo ainda a confirmar com a loja.
  hours: { weekdays: { open: "08:30", close: "18:30" } },
  rating: { value: 4.7, count: 22 },
  instagram: "https://www.instagram.com/arteecortintas.petropolis/",
  facebook: "https://www.facebook.com/arteecortintas.petropolis/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Arte+e+Cor+Tintas+e+Ferragens+Rua+Coronel+Veiga+183+Petr%C3%B3polis",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Arte+e+Cor+Tintas+e+Ferragens,+Rua+Coronel+Veiga,+183,+Petr%C3%B3polis+-+RJ",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rua+Coronel+Veiga,+183,+Petr%C3%B3polis+-+RJ,+25655-151&z=17&output=embed",
} as const;

export const CTA = {
  whatsapp: "Pedir pelo WhatsApp",
  directions: "Como chegar",
} as const;

export function whatsappLink(message = "Olá! Vim pelo site e quero fazer um pedido.") {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "#produtos", label: "Produtos" },
  { href: "#cores", label: "Cores" },
  { href: "#como-pedir", label: "Como pedir" },
  { href: "#dicas", label: "Dicas" },
  { href: "#loja", label: "A loja" },
] as const;
