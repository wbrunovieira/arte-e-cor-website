"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// As quatro cores do respingo do logo passam por trás da palavra, como demãos de rolo.
const FAIXAS = ["#e92222", "#f27527", "#fbc535", "#268dca"];

export function PaintedWord({ children, delay = 0.85 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative isolate inline-block">
      <span aria-hidden className="absolute inset-x-[-0.04em] bottom-[0.04em] -z-10 flex h-[0.28em] flex-col overflow-hidden rounded-[0.08em]">
        {FAIXAS.map((cor, i) => (
          <motion.span
            key={cor}
            className="block flex-1 origin-left"
            style={{ backgroundColor: cor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
      </span>
      {children}
    </span>
  );
}
