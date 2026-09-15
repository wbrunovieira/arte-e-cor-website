import Image from "next/image";
import type { CSSProperties } from "react";
import logoMarca from "../../public/brand/logo-marca.png";

// Os SVGs monocromáticos são aplicados como máscara: a cor vem de `currentColor`,
// então o logo acompanha o tema claro/escuro sem arquivos extras.
function maskStyle(src: string): CSSProperties {
  return {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Arte e Cor Tintas e Ferragens"
      className={`block aspect-[2520/700] bg-current ${className}`}
      style={maskStyle("/brand/logo-wordmark-mono.svg")}
    />
  );
}

export function LogoPincel({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block aspect-[2020/920] bg-current ${className}`}
      style={maskStyle("/brand/logo-pincel-mono.svg")}
    />
  );
}

export function LogoMarca({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src={logoMarca}
      alt=""
      aria-hidden
      preload={preload}
      className={`h-auto ${className}`}
      sizes="(max-width: 768px) 120px, 240px"
    />
  );
}
