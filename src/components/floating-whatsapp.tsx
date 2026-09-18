"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { CTA, whatsappLink } from "@/lib/site";

// Atalho no celular, visível depois que o hero sai da tela.
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [passouDoHero, setPassouDoHero] = useState(false);
  const [noRodape, setNoRodape] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 640;
    if (next !== passouDoHero) setPassouDoHero(next);
  });

  // No fim da página o botão sai: ali o rodapé já tem os contatos e ele tapava a última linha.
  useEffect(() => {
    const rodape = document.querySelector("footer");
    if (!rodape) return;
    const observer = new IntersectionObserver(([entry]) => setNoRodape(entry.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    observer.observe(rodape);
    return () => observer.disconnect();
  }, []);

  const visible = passouDoHero && !noRodape;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={CTA.whatsapp}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_16px_40px_-12px_rgb(242_117_39/0.9)] lg:hidden"
        >
          <WhatsappLogoIcon weight="bold" className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
