import { ArrowUpRightIcon, CodeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Crédito da WB Digital Solutions no rodapé. Herda a cor do contexto por
 * `currentColor`, então serve em fundo claro e escuro sem variante.
 */
export function WBSignature({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 ${className}`}>
      <span className="flex items-center gap-2 opacity-70">
        Desenvolvido com
        <HeartIcon weight="fill" aria-label="amor" className="size-3.5 animate-pulse text-accent motion-reduce:animate-none" />
        por
      </span>

      <a
        href="https://www.wbdigitalsolutions.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group/wb inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium ring-1 ring-current/15 transition-colors duration-300 hover:text-ink hover:ring-current/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
      >
        <CodeIcon weight="regular" aria-hidden className="size-4 transition-transform duration-300 group-hover/wb:rotate-12" />
        WB Digital Solutions
        <ArrowUpRightIcon
          weight="bold"
          aria-hidden
          className="size-3 opacity-60 transition-transform duration-300 group-hover/wb:-translate-y-0.5 group-hover/wb:translate-x-0.5"
        />
      </a>
    </div>
  );
}
