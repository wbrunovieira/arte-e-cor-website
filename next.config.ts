import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite compilar numa pasta separada (NEXT_DIST_DIR=.next-audit npx next build) sem
  // derrubar o `next dev` que está usando o .next.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    qualities: [75, 90],
    // AVIF primeiro: costuma render 20-30% menos que o WebP nas fotos de produto.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // O CSS do Tailwind tem 13 KB e bloqueia a primeira pintura. Como quase todo
    // visitante chega pela primeira vez (busca ou WhatsApp), embutir compensa o
    // fato de ele não ficar em cache separado.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          // Só restringe quem pode embutir o site; scripts e estilos seguem livres (o mapa e o beacon da Cloudflare dependem disso).
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      {
        // Endereços como arte-e-cor-website.vercel.app não devem concorrer com o domínio no Google.
        source: "/:path*",
        missing: [{ type: "host", value: "arteecortintas\\.com\\.br" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
