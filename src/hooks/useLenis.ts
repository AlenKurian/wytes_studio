"use client";

import { useContext } from "react";
import { LenisContext } from "@/lib/lenis-context";

export function useLenis() {
  return useContext(LenisContext);
}
