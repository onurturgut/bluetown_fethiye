import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const motion = {
  duration: { fast: 0.3, normal: 0.7, slow: 1.2, cinematic: 1.8 },
  easing: { reveal: "power3.out", smooth: "power2.inOut", cinematic: "expo.inOut" },
  stagger: { text: 0.08, cards: 0.15 },
};

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
