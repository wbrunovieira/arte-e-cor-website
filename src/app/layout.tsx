import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Só o eixo de peso: com opsz e wdth a fonte tem 131 KB, contra 41 KB assim, e ela
// entra no caminho do primeiro paint no celular.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Arte e Cor Tintas e Ferragens | Loja de tintas em Petrópolis",
    template: "%s | Arte e Cor Tintas e Ferragens",
  },
  description: SITE.description,
  keywords: [
    "loja de tintas Petrópolis",
    "tintas Petrópolis",
    "ferragens Petrópolis",
    "tinta automotiva Petrópolis",
    "Sherwin-Williams Petrópolis",
    "Suvinil Petrópolis",
    "entrega grátis tintas Petrópolis",
  ],
  alternates: { canonical: "/" },
  // Verificação do Bing Webmaster (a do DNS já vale; esta é a segunda prova).
  verification: { other: { "msvalidate.01": "348801350CDB2449AE813136F83FB038" } },
  openGraph: {
    type: "website",
    url: "/",
    locale: "pt_BR",
    siteName: SITE.name,
    title: "Arte e Cor Tintas e Ferragens | Petrópolis",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a101c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`sem-js ${outfit.variable} ${bricolage.variable} antialiased`}>
      <head>
        {/* Marca que o JavaScript rodou; sem isso o CSS mostra o conteúdo animado já visível. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.remove("sem-js")` }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
