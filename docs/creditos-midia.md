# Créditos e origem das mídias

Mídias de terceiros usadas no site. Todas as licenças abaixo permitem uso comercial sem pagamento.

## Vídeo do hero (`public/video/hero.mp4`)

Montagem de 12,6s (1280x720, sem áudio) feita com trechos de três vídeos do **Mixkit** (licença Mixkit Free, uso comercial permitido, sem atribuição obrigatória):

| Trecho | Vídeo | Link |
|---|---|---|
| Rolo na bandeja de tinta amarela | Covering a yellow paint roller (#39483) | https://mixkit.co/free-stock-video/covering-a-yellow-paint-roller-39483/ |
| Pincel amarelo sobre parede vermelha | Hand of a painter painting a wall with a brush (#36701) | https://mixkit.co/free-stock-video/hand-of-a-painter-painting-a-wall-with-a-brush-36701/ |
| Parede sendo pintada de verde | Woman painting the walls in a bright green (#46081) | https://mixkit.co/free-stock-video/woman-painting-the-walls-in-a-bright-green-46081/ |

Pôster: primeiro quadro da montagem (`public/video/hero-poster.jpg`).

## Casa do simulador de cores (`public/simulador/casa.webp`)

- Foto de **Julia Taubitz** no Unsplash (licença Unsplash: uso comercial permitido, atribuição opcional).
- Página: https://unsplash.com/photos/a-colorful-house-stands-on-a-city-street-2d7_Jgq6re4
- Perfil: https://unsplash.com/@justmejuliee
- A máscara das paredes (`casa-mask.png`) foi gerada a partir da foto.

## Imagens da própria loja

- Fotos de produtos: posts do Instagram @arteecortintas.petropolis (imagens de fornecedores, como Atlas).
- Fachada (`src/assets/img/fachada*.jpg`): capturas do Google Street View, só para a apresentação. **Substituir por fotos próprias antes de publicar.**
- Logo: vetorizado a partir de imagens do Instagram. **Pedir o arquivo original à cliente.**

## Imagem de compartilhamento (`src/app/opengraph-image.jpg`)

- Arte montada em HTML e renderizada no Chrome em 1200x630: logo, fontes do site (Bricolage Grotesque e Outfit, Google Fonts, licença OFL) e a foto `src/assets/img/tintas-latas.jpg` (imagem de fornecedor dos posts do Instagram da loja).
- Substituiu a captura da fachada do Street View.

## Cores do simulador

As cores são as do **leque Suvinil V5** (1.788 tons), a marca da máquina tintométrica da loja. Cada cor tem o nome e o código oficiais.

- Origem: API do catálogo da Suvinil (`catalog.suvinil.com.br/api/v1/colors`), usada pelo próprio site da marca.
- A cópia fica em `src/lib/cores-suvinil.json` para o simulador não depender de um serviço de terceiros no ar. Para atualizar: `node scripts/atualizar-cores-suvinil.mjs`.
- Ficam de fora metalizadas, Glasu! e cores prontas para outras superfícies.
- As famílias (brancos, cinzas, beges, amarelos, laranjas, vermelhos, rosas, roxos, azuis e verdes) são calculadas a partir do RGB de cada cor; a Suvinil não publica esse agrupamento.
- O valor em tela é referência: o tom final sai da máquina, conferido na cartela da loja.
