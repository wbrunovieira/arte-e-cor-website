"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { LogoMarca, LogoWordmark } from "@/components/brand";
import { WhatsAppButton } from "@/components/cta";
import { NAV, SITE } from "@/lib/site";

const EASE = [0.32, 0.72, 0, 1] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);

  // Enquanto o cabeçalho está sobre o vídeo do hero, a ilha fica escura e o texto claro.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y < window.innerHeight - 110;
    if (next !== overHero) setOverHero(next);
  });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const irPara = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(href, { offset: -96 });
      else document.querySelector(href)?.scrollIntoView();
    });
  };

  const dark = overHero && !open;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6 md:pt-6">
        <div
          className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-1.5 pl-2 pr-1.5 ring-1 backdrop-blur-xl transition-[background-color,box-shadow,color] duration-700 ease-premium ${
            dark
              ? "bg-[#061122]/30 text-white ring-white/15"
              : "bg-surface/80 text-ink shadow-[0_24px_60px_-28px_rgb(15_35_68/0.35)] ring-ink/10"
          }`}
        >
          <a href="#topo" onClick={(e) => irPara(e, "#topo")} className="flex items-center gap-2 rounded-full py-1 pl-1.5 pr-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30">
            <LogoMarca className="w-10" preload />
            <LogoWordmark className={`w-[6.5rem] transition-colors duration-700 ${dark ? "text-white" : "text-brand"}`} />
          </a>

          <nav aria-label="Principal" className="hidden items-center lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => irPara(e, item.href)}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                  dark ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-ink/[0.05] hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <span className="hidden sm:block">
              <WhatsAppButton size="sm" />
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={`relative grid size-11 place-items-center rounded-full lg:hidden ${dark ? "bg-white/10" : "bg-ink/[0.05]"}`}
            >
              <span className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-premium ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-premium ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-30 flex flex-col bg-bg/85 px-6 pb-10 pt-28 backdrop-blur-3xl lg:hidden"
          >
            <nav aria-label="Menu">
              <ul>
                {NAV.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-ink/[0.08]">
                    <motion.a
                      href={item.href}
                      onClick={(e) => irPara(e, item.href)}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.35, ease: EASE } }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: EASE }}
                      className="block py-4 font-display text-[2.75rem] font-semibold leading-none tracking-[-0.03em]"
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-auto space-y-5"
            >
              <WhatsAppButton className="w-full" />
              <p className="leading-relaxed text-muted">
                {SITE.address.street}, {SITE.address.city}
                <br />
                {SITE.phone.display}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
