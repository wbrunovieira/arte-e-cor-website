import { SITE } from "@/lib/site";

// Resumo em texto para assistentes de IA (formato llms.txt). Sai dos mesmos dados do
// site, para nunca divergir do que está na página.
export const dynamic = "force-static";

const { address: e, hours: h, rating } = SITE;

/** 08:30 -> 8h30, 09:00 -> 9h, do mesmo jeito que a página escreve. */
const hora = (hhmm: string) => {
  const [h1, m] = hhmm.split(":");
  return m === "00" ? `${Number(h1)}h` : `${Number(h1)}h${m}`;
};

const conteudo = `# ${SITE.name}

> Loja de tintas, acessórios de pintura e ferragens em Petrópolis, no Rio de Janeiro. Pedidos pelo WhatsApp, com entrega grátis na cidade.

## A loja

- Endereço: ${e.street}, ${e.district}, ${e.city}/${e.state}, CEP ${e.postalCode}
- WhatsApp (pedidos e orçamentos): ${SITE.whatsapp.display}
- Telefone: ${SITE.phone.display}
- Horário: segunda a sexta das ${hora(h.weekdays.open)} às ${hora(h.weekdays.close)}; sábado das ${hora(h.saturday.open)} às ${hora(h.saturday.close)}; domingo das ${hora(h.sunday.open)} às ${hora(h.sunday.close)}; feriados das ${hora(h.holidays.open)} às ${hora(h.holidays.close)}
- Avaliação no Google: ${rating.value.toString().replace(".", ",")} de 5, com ${rating.count} avaliações
- Razão social: ${SITE.legalName}

## O que vende

- Tintas imobiliárias: interior, exterior, esmalte, piso e massas
- Tintas automotivas
- Acessórios de pintura: rolos, trinchas, espátulas e bandejas
- Impermeabilizantes e argamassas, indicados para o clima úmido da serra
- Ferragens e utilidades para casa e banheiro
- Marcas: Sherwin-Williams, Suvinil, Coral, Eucatex, Quartzolit, Atlas, Hydronorth e Resicril

## Diferenciais

- Entrega grátis em Petrópolis
- Desconto para compras em quantidade
- Tinta feita na hora na máquina Suvinil da loja, com as 1.788 cores do leque
- Simulador no site: escolha uma cor Suvinil e veja na foto da sua parede, sem enviar a foto para a internet

## Links

- Site: ${SITE.url}
- Simulador de cores: ${SITE.url}/#cores
- Como chegar: ${SITE.directionsUrl}
- Instagram: ${SITE.instagram}
- Facebook: ${SITE.facebook}
`;

export function GET() {
  return new Response(conteudo, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=14400, must-revalidate",
    },
  });
}
