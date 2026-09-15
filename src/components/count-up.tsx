"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

function format(value: number, decimals: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => (el.textContent = format(v, decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(to, decimals)}
    </span>
  );
}
