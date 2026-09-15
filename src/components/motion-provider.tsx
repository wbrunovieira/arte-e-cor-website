"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, autoRaf: true, anchors: { offset: -96 }, allowNestedScroll: true }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
