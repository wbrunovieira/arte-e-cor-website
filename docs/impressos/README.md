# Impressos

Peças para a loja imprimir e colar, com QR code do site.

| Arquivo | Tamanho | Para |
|---|---|---|
| `cartaz-a6.pdf` / `.png` | A6, 105x148 mm | balcão, vitrine, mural |
| `adesivo-10x10.pdf` / `.png` | 100x100 mm | adesivo para porta, vitrine ou sacola |

- Os PNG têm 300 dpi; os PDF já saem no tamanho final, é só mandar imprimir sem redimensionar.
- O QR aponta para `https://arteecortintas.com.br` e foi gerado com correção de erro alta (nível H), que é o que permite cobrir o centro com o logo sem quebrar a leitura.
- Testado com o `zbarimg` na arte final e no PDF, inclusive com a imagem reduzida a 25%, girada, desfocada, em preto e branco e com pouca luz.
- Cores da marca: fundo `#0d2548`, faixa `#f27527`, QR `#0f2344`.

## Refazer

Os arquivos `.html` são a fonte da arte. Para gerar de novo:

```bash
qrencode -o qr.svg -t SVG -l H -m 0 -s 12 "https://arteecortintas.com.br"   # QR base
# abrir o .html no navegador em 1240x1748 (A6) ou 1181x1181 (adesivo) e exportar PNG
magick cartaz.png -units PixelsPerInch -density 300 -quality 100 cartaz.pdf
```

Se o endereço do site mudar, refaça o QR: ele não é atualizável depois de impresso.
