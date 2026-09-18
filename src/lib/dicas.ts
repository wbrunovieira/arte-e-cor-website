import type { StaticImageData } from "next/image";
import idosos from "@/assets/img/idosos.jpg";
import roloTextura from "@/assets/img/rolo-textura.jpg";
import tintaLata from "@/assets/img/tinta-lata.jpg";
import tintasLatas from "@/assets/img/tintas-latas.jpg";

export type Dica = {
  slug: string;
  titulo: string;
  resumo: string;
  imagem: StaticImageData;
  alt: string;
  intro: string;
  itens: string[];
};

// Conteúdo adaptado dos posts do Instagram da loja.
export const DICAS: Dica[] = [
  {
    slug: "proteger-ambiente",
    titulo: "Como proteger o ambiente antes de pintar",
    resumo: "Seis cuidados simples que evitam respingos, poeira e correria no meio do serviço.",
    imagem: tintaLata,
    alt: "Lata de tinta com escorridos vermelhos e azuis",
    intro: "Uma boa pintura começa antes da primeira demão. Antes de abrir a lata:",
    itens: [
      "Retire quadros, espelhos e enfeites e guarde em lugar seguro.",
      "Tire os móveis do cômodo. Se não der, junte tudo no centro e cubra com plástico ou lençol.",
      "Remova cortinas e persianas. É uma boa hora para lavar.",
      "Se você mesmo vai preparar as paredes, termine no dia anterior para o pintor começar cedo.",
      "Aspire o chão e os rodapés para a poeira não grudar na tinta fresca.",
      "Confira se a tinta é suficiente. Nada pior que parar o serviço no meio.",
    ],
  },
  {
    slug: "rolo-textura",
    titulo: "O rolo certo para parede texturizada",
    resumo: "Parede rugosa ou com grafiato pede rolo próprio. Veja o que muda no resultado.",
    imagem: roloTextura,
    alt: "Rolo aplicando tinta azul em parede com textura",
    intro: "Paredes rugosas, texturizadas ou com grafiato são um desafio para rolos comuns. Os rolos Monarca são feitos para esse tipo de superfície.",
    itens: [
      "Escolha um rolo de pelo alto, que alcança os relevos da textura.",
      "Carregue o rolo sem encharcar para não escorrer.",
      "Passe em movimentos cruzados para cobrir todos os lados do relevo.",
      "Na dúvida, mande uma foto da parede no WhatsApp e indicamos o rolo ideal.",
    ],
  },
  {
    slug: "seguranca-idosos",
    titulo: "Segurança em casa para idosos",
    resumo: "Três ajustes simples que reduzem o risco de quedas no dia a dia.",
    imagem: idosos,
    alt: "Casal de idosos abraçados sorrindo",
    intro: "Amor em cada detalhe. Pequenas mudanças deixam a casa mais segura para quem você ama:",
    itens: [
      "Invista em boa iluminação, principalmente em corredores e escadas.",
      "Evite ceras que deixam o piso escorregadio.",
      "Instale barras de apoio fortes em escadas, banheiros e rampas. Temos as barras Atlas.",
    ],
  },
  {
    slug: "clima-da-serra",
    titulo: "Pintura que aguenta o clima da serra",
    resumo: "Umidade e chuva pedem cuidado extra. Veja como proteger paredes e muros.",
    imagem: tintasLatas,
    alt: "Latas de massa, tinta e resina impermeabilizante",
    intro: "Em Petrópolis, umidade e chuva castigam a pintura. Alguns cuidados fazem ela durar muito mais:",
    itens: [
      "Resolva infiltrações antes de pintar: tinta nova não esconde parede molhada.",
      "Use impermeabilizante em muros, lajes e paredes externas.",
      "Em banheiros, cozinhas e áreas internas úmidas, prefira tintas com proteção antimofo.",
      "Para fachadas, escolha tinta acrílica própria para exterior.",
    ],
  },
];
