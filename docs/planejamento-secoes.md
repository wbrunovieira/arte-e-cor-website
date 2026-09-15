# Planejamento de seções: site Arte e Cor Tintas e Ferragens

Base: [estudo da empresa](empresa/README.md). Stack: Next.js 16 (App Router), Tailwind v4, Motion.

---

## 1. Leitura do projeto

**Tipo de site:** página única (landing) de uma loja de bairro em Petrópolis.

**Públicos:** moradores em reforma e pintores profissionais.

**Linguagem visual:** confiável e colorida, nascida do próprio logo, com Tailwind + Motion sob medida.

**Objetivo principal:** gerar pedidos e orçamentos pelo **WhatsApp**.

**Objetivos secundários:**
- levar a pessoa até a loja ("Como chegar");
- aparecer no Google para "loja de tintas em Petrópolis";
- dar ao perfil do Google Meu Negócio um site oficial.

**Configuração de design (skill design-taste-frontend):**

| Controle | Valor | Motivo |
|---|---|---|
| Ousadia do layout | 6 | Comércio local pede confiança e leitura fácil, mas a marca é vibrante; assimetria moderada |
| Intensidade de animação | 5 | Entradas suaves e respingos de tinta pontuais; nada que atrase quem só quer o WhatsApp |
| Densidade | 5 | Precisa mostrar muitas marcas e categorias sem virar catálogo apertado |

**Direção visual:**
- **Cores:**
  - base neutra clara (branco levemente frio, cinza-azulado);
  - azul-marinho do logo como cor de texto e de marca;
  - **uma única cor de destaque** para botões e realces: laranja do respingo (`~#F07818`, a validar no contraste);
  - o multicolorido do respingo aparece só no logo e em pequenos detalhes de tinta, nunca espalhado pela página;
  - sem roxo e sem gradientes genéricos de IA.
- **Tipografia:** sans geométrica, próxima da dos posts (candidatas: Outfit ou Plus Jakarta Sans), via `next/font`.
- **Formas:** um só sistema de cantos (sugestão: botões em pílula e blocos com raio de 16px).
- **Tema:** claro por padrão, com modo escuro respeitando a preferência do sistema.
- **Ícones:** Phosphor Icons.
- **Texto do site:** frases curtas, sem travessão, com a voz da loja ("fácil, ágil, entregamos rapidinho").

**Botões (um nome por intenção, igual em toda a página):**
- Pedido: **"Pedir pelo WhatsApp"**, que abre `wa.me/5524988651692` com mensagem pronta por contexto.
- Visita: **"Como chegar"**, que abre o Google Maps.

---

## 2. Mapa da página

| # | Seção | Formato de layout |
|---|---|---|
| 0 | Cabeçalho fixo | Barra fina |
| 1 | Hero | Dividido: texto à esquerda, foto real à direita |
| 2 | Diferenciais | Faixa horizontal com ícones |
| 3 | Marcas | Faixa de logos rolando (única da página) |
| 4 | Produtos | Grade bento com 6 blocos |
| 5 | Como pedir | Linha do tempo horizontal |
| 6 | Para profissionais | Bloco dividido com foto |
| 7 | Ofertas (opcional) | Destaque largo |
| 8 | Dicas | Carrossel com arraste |
| 9 | Avaliações | Nota grande + citações |
| 10 | Visite a loja | Mapa em largura total com cartão de informações |
| 11 | Chamada final | Faixa colorida da marca |
| 12 | Rodapé | Colunas |

São 13 blocos com pelo menos 9 formatos diferentes, e nenhuma sequência de 3 seções "foto + texto" lado a lado.
Com 12 seções, o limite é de 4 pequenos rótulos em caixa alta acima dos títulos.

---

## 3. Seções em detalhe

### 0. Cabeçalho fixo
- **Conteúdo:**
  - logo horizontal;
  - âncoras: Produtos, Marcas, Como pedir, Dicas, Loja;
  - botão "Pedir pelo WhatsApp".
- **Tamanho:** até 72px de altura, em uma linha só no desktop.
- **Celular:** logo, botão de WhatsApp compacto e menu.
- **Animação:** fundo ganha leve desfoque e borda ao rolar a página.

### 1. Hero
**Função:** em 3 segundos dizer o que é, onde fica e como pedir.

**Texto (rascunho):**
- Título: **"Tudo para sua pintura, com entrega grátis em Petrópolis"**
- Subtítulo: "Tintas das melhores marcas, acessórios e ferragens. Mande sua lista pelo WhatsApp e receba rapidinho."
- Botões: "Pedir pelo WhatsApp" (principal) e "Como chegar" (secundário).

**Visual:** foto real da loja, com respingo de tinta nas cores do logo entrando por trás da imagem. Duas opções:
- a fachada (sobrado ocre com azulejos azul e branco e o letreiro da marca, que o público de Petrópolis reconhece);
- as prateleiras (latas Sherwin-Williams e Suvinil, rolos Atlas).

O padrão dos azulejos da fachada pode virar um detalhe gráfico discreto no site.

**Regras:**
- título em no máximo 2 linhas e botões visíveis sem rolar;
- nada de selo, lista de benefícios ou avaliações dentro do hero; isso vai para as seções seguintes.

**Celular:** texto em cima, foto embaixo.

**Animação:** título e botões entram em sequência; o respingo "pinta" a entrada da foto uma única vez. Sem animação para quem pediu movimento reduzido.

### 2. Diferenciais
**Função:** os 4 pilares da loja, logo abaixo do hero.

**Itens:**
- Entrega grátis em Petrópolis
- Descontos para quantidade
- As melhores marcas
- Nota 4,7 no Google (22 avaliações)

**Layout:** faixa em linha única com ícone + frase curta. Não são cartões.

**Celular:** grade 2x2.

### 3. Marcas
**Função:** credibilidade imediata.

**Logos:** Sherwin-Williams, Suvinil, Coral, Eucatex, Lukscolor, Quartzolit, Atlas, Hydronorth, Resicril, Monarca, Anjo.

**Layout:**
- faixa rolando lentamente, com pausa ao passar o mouse;
- só logos, sem legenda embaixo;
- título simples, algo como "As melhores marcas em um único lugar" (frase da própria loja).

**Cuidado:** usar logos oficiais em SVG, com cor única para funcionar no tema claro e no escuro.

### 4. Produtos (categorias)
**Função:** mostrar a amplitude da loja sem virar catálogo com preço.

**Layout:** bento com exatamente 6 blocos, de tamanhos variados:
1. **Tintas** (bloco grande): imobiliária, esmalte, piso, massa.
2. **Acessórios de pintura:** rolos, trinchas, espátulas, bandejas.
3. **Impermeabilização e argamassas:** Quartzolit, Hydronorth, Resicril. Gancho local: "feito para o clima da serra".
4. **Ferramentas:** lixadeiras Atlas Powertech.
5. **Casa e banheiro:** organizadores, veda-portas, números residenciais, barras de apoio.
6. **Tintas automotivas:** citadas no letreiro da fachada.

**Comportamento:**
- cada bloco tem foto real ou de produto e abre o WhatsApp com mensagem pronta ("Olá! Quero um orçamento de tintas.");
- ao passar o mouse, a foto dá um leve zoom e aparece a indicação de clique.

**Celular:** uma coluna, com o bloco de Tintas em destaque no topo.

### 5. Como pedir
**Função:** tirar o medo de comprar à distância.

**Passos (verbos, sem "Passo 1"):**
- **Mande sua lista** pelo WhatsApp, com foto do produto ou da parede se quiser.
- **Receba o orçamento** com desconto para quantidade.
- **Receba em casa** com entrega grátis em Petrópolis.

**Layout:** linha do tempo horizontal ligada por um traço de pincel que se desenha ao entrar na tela.

**Pendente:** área de entrega, pedido mínimo, prazo médio e formas de pagamento. **(confirmar)**

### 6. Para profissionais
**Função:** falar com pintores e obras, que compram em volume.

**Texto:** "Pintor, empreiteiro ou obra grande? Condição especial para quantidade e as linhas profissionais Atlas e Powertech."

**Layout:** foto de pintor com rolo e extensor à esquerda, texto e botão "Pedir pelo WhatsApp" (mensagem "Sou profissional") à direita.

### 7. Ofertas (opcional)
**Função:** aproveitar as promoções que a loja já faz no Instagram (ex.: Peg&Pinte R$ 199, Paleta da Sorte).

**Layout:** um destaque largo com a oferta do momento e prazo.

**Decisão necessária:** quem atualiza e com que frequência. Se não houver rotina, a seção fica **desligada** para não mostrar oferta vencida. Alternativas: arquivo simples de conteúdo no projeto, ou um CMS leve no futuro.

### 8. Dicas
**Função:** conteúdo útil, que também gera busca no Google.

**Primeiros temas** (vindos dos posts):
- Como proteger o ambiente antes de pintar
- Rolo certo para parede texturizada ou grafiato
- Qual lixadeira usar em cada situação
- Segurança em casa para idosos
- Tinta e impermeabilização para o clima úmido da serra

**Layout:** carrossel com arraste (cartões com imagem + título) e link para o Instagram.

**Futuro:** cada dica pode virar uma página própria (blog) para SEO.

### 9. Avaliações
**Função:** prova social real.

**Layout:**
- nota **4,7** grande, com estrelas e "22 avaliações no Google" e link para o perfil;
- ao lado, 2 ou 3 trechos de avaliações reais (até 3 linhas cada, com o nome como aparece no Google).

**Pendente:** textos das avaliações. **(pedir prints)** Sem textos reais, a seção mostra só a nota e o link.

### 10. Visite a loja
**Função:** converter quem prefere ir pessoalmente.

**Layout:** mapa em largura total, carregado só quando chega na tela, com cartão sobreposto contendo:
- endereço: Rua Coronel Veiga, 183 (confirmado pela placa na fachada);
- horário da semana (**sábado e domingo a confirmar**) e indicação "Aberto agora" calculada pelo horário;
- telefone fixo (24) 2242-7228 e WhatsApp;
- botão "Como chegar";
- foto da fachada.

**Celular:** cartão acima do mapa.

### 11. Chamada final
**Layout:** faixa larga no azul-marinho da marca, com respingo de tinta.

**Texto:** "Sua próxima pintura começa com uma mensagem." + botão "Pedir pelo WhatsApp".

### 12. Rodapé
**Conteúdo:**
- logo;
- contatos, endereço e horário;
- Instagram e Facebook;
- links das seções;
- razão social e CNPJ (Arte e Cor Tintas LTDA, 49.699.801/0001-86);
- ano.

---

## 4. Elementos globais

- **Botão flutuante de WhatsApp no celular:** mesmo nome e mesma intenção do principal. Aparece depois que o hero sai da tela.
- **SEO local:**
  - título "Arte e Cor Tintas e Ferragens | Loja de tintas em Petrópolis/RJ";
  - dados estruturados `HardwareStore` (endereço, horário, telefone, nota, geo);
  - `sitemap.xml` e `robots.txt`;
  - imagem de compartilhamento (OG) com o logo e a fachada;
  - cadastrar a URL do site no Google Meu Negócio.
- **Palavras-chave iniciais:**
  - loja de tintas Petrópolis
  - tintas Sherwin-Williams Petrópolis
  - ferragens Petrópolis
  - tinta com entrega grátis Petrópolis
  - impermeabilizante Petrópolis
- **Medição:** eventos de clique em "Pedir pelo WhatsApp" (separados por seção), em "Como chegar" e no telefone.
- **Desempenho:** foto do hero priorizada, demais imagens com carregamento tardio, mapa só ao entrar na tela.
- **Acessibilidade:**
  - contraste AA em todos os botões (validar o laranja com texto);
  - foco visível no teclado;
  - textos alternativos nas imagens;
  - animações desligadas para quem prefere movimento reduzido.
- **Domínio:** evitar confusão com `arteecortintas.com.br` (outra empresa). Sugestões: `arteecorpetropolis.com.br` ou `arteecortintaspetropolis.com.br`.

---

## 5. O que precisamos da loja antes de construir

| Prioridade | Item |
|---|---|
| Alta | Logo em vetor (SVG, AI ou PDF) nas versões horizontal e vertical |
| Alta | Horário completo (seg a sex, sábado, domingo, feriados) |
| Alta | Regras da entrega grátis: bairros ou raio, pedido mínimo, prazo |
| Alta | Fotos reais: fachada, interior, prateleiras, balcão, equipe, entrega. Hoje quase tudo é imagem de fornecedor |
| Média | Formas de pagamento além de cartão de crédito (o letreiro diz "aceitamos todos os cartões"): Pix, débito, parcelamento |
| Média | Faz tinta na cor (máquina tintométrica)? Se sim, vira destaque próprio |
| Média | Prints das melhores avaliações do Google |
| Média | Tintas automotivas: marcas e se fazem a cor na hora |
| Média | História da loja (desde quando está no ponto; relação com o Atelier da Cor) |
| Baixa | E-mail de contato |
| Baixa | Quem vai manter a seção de Ofertas atualizada |
| Baixa | Domínio desejado |
