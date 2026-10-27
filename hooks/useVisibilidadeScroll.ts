"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Monitora quando um elemento entra na área visível da tela (scroll)
 * para acionar animações de entrada com IntersectionObserver.
 */
export function useVisibilidadeScroll<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
  rootMargin = "0px 0px -30px 0px"
) {
  const ref = useRef<T | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.unobserve(elemento);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elemento);

    return () => {
      observer.unobserve(elemento);
    };
  }, [threshold, rootMargin]);

  return { ref, visivel };
}
