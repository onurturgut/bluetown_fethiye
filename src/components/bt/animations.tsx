"use client";

import { useRef, type ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, motion, prefersReduced } from "@/lib/motion";

type ImageSource = string | StaticImageData;
const assetSrc = (source: ImageSource) =>
  typeof source === "string" ? source : source.src;

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "h2" | "p" | "span" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    gsap.from(ref.current, {
      y: 40, opacity: 0, duration: motion.duration.slow, ease: motion.easing.reveal, delay,
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  }, { scope: ref });
  const T = Tag as "div";
  return <T ref={ref as React.RefObject<HTMLDivElement>} className={className}>{children}</T>;
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced() || !ref.current) return;
    gsap.from(ref.current.children, {
      y: 30, opacity: 0, duration: motion.duration.normal, ease: motion.easing.reveal, stagger: motion.stagger.cards,
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}

export function RevealImage({ src, alt, className, imgClassName }: { src: ImageSource; alt: string; className?: string; imgClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
    tl.fromTo(ref.current, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: motion.duration.slow, ease: motion.easing.cinematic })
      .from(ref.current!.querySelector("img"), { scale: 1.25, duration: motion.duration.cinematic, ease: motion.easing.reveal }, 0);
  }, { scope: ref });
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <img src={assetSrc(src)} alt={alt} loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${imgClassName ?? ""}`} />
    </div>
  );
}

export function Parallax({ src, alt, className, amount = 12 }: { src: ImageSource; alt: string; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    gsap.fromTo(ref.current!.querySelector("img"), { yPercent: -amount }, {
      yPercent: amount, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: ref });
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <img src={assetSrc(src)} alt={alt} loading="lazy" className="h-[130%] -mt-[15%] w-full object-cover" />
    </div>
  );
}
