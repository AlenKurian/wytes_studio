"use client";

import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapContext(
  setup: () => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    let extraCleanup: void | (() => void);
    const ctx = gsap.context(() => {
      extraCleanup = setup();
    }, scope.current);
    return () => {
      if (typeof extraCleanup === "function") extraCleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
