"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import type { StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowDown, ArrowLeft, ArrowRight, Menu, X, Plus, Phone, MapPin, Maximize2 } from "lucide-react";
import { gsap, ScrollTrigger, motion, prefersReduced } from "@/lib/motion";
import { Reveal, RevealImage, Parallax, Stagger } from "./animations";
import { amenities, discover, faq, gallery, images, nav, property, rooms } from "@/data/property";

const assetSrc = (source: string | StaticImageData) =>
  typeof source === "string" ? source : source.src;

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (a && a.hash.length > 1) { e.preventDefault(); lenis.scrollTo(a.hash, { offset: 0 }); }
    };
    document.addEventListener("click", onClick);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, []);

  return null;
}

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useGSAP(() => {
    if (sessionStorage.getItem("bt-intro") || prefersReduced()) { setDone(true); return; }
    sessionStorage.setItem("bt-intro", "1");
    gsap.timeline({ onComplete: () => setDone(true) })
      .from(".i-word", { yPercent: 110, duration: 0.7, ease: motion.easing.reveal })
      .from(".i-line", { scaleX: 0, duration: 0.5, ease: motion.easing.smooth }, "-=0.2")
      .from(".i-sub", { opacity: 0, letterSpacing: "0.1em", duration: 0.4 }, "-=0.2")
      .to(ref.current, { yPercent: -100, duration: 0.8, ease: motion.easing.cinematic }, "+=0.15");
  }, { scope: ref });
  if (done) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy text-ivory" aria-hidden>
      <div className="overflow-hidden"><div className="i-word font-heading text-6xl md:text-8xl">BlueTown</div></div>
      <div className="i-line mt-5 h-px w-40 origin-left bg-sand" />
      <div className="i-sub eyebrow mt-5">Fethiye</div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled && !open ? "bg-navy/90 py-4 backdrop-blur" : "py-6"} text-ivory`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
          <a href="#top" className="font-heading text-2xl tracking-tight">BlueTown<span className="eyebrow ml-3 align-middle text-[0.6rem] text-sand">Fethiye</span></a>
          <div className="flex items-center gap-6">
            <a href={property.bookingHref} target="_blank" rel="noopener" className="eyebrow hidden md:inline hover:text-sand transition-colors">Book your stay</a>
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="flex h-12 w-12 items-center justify-center">
              {open ? <X strokeWidth={1.2} /> : <Menu strokeWidth={1.2} />}
            </button>
          </div>
        </div>
      </header>
      <nav aria-label="Main" className={`fixed inset-0 z-40 bg-navy text-ivory transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}>
        <div className="mx-auto grid h-full max-w-[1440px] items-center px-6 pt-24 md:grid-cols-[2fr_1fr] md:px-12">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <a href={n.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}
                  className={`group flex items-baseline gap-6 font-heading text-5xl transition-all duration-700 hover:text-sand md:text-7xl ${open ? "translate-y-0" : "translate-y-full"}`}
                  style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}>
                  <span className="eyebrow text-sand">0{i + 1}</span>{n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden space-y-6 text-sm text-ivory/70 md:block">
            <p>{property.address}</p>
            <a href={property.phoneHref} className="block hover:text-sand" tabIndex={open ? 0 : -1}>{property.phone}</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const delay = sessionStorage.getItem("bt-intro-played") ? 0.2 : 2;
    sessionStorage.setItem("bt-intro-played", "1");
    gsap.fromTo(".h-img", { scale: 1.18 }, { scale: 1, duration: 3.2, ease: "power2.out", delay: delay - 0.6 });
    gsap.from(".h-word", { yPercent: 110, duration: motion.duration.slow, ease: motion.easing.reveal, stagger: motion.stagger.text, delay });
    gsap.from(".h-fade", { opacity: 0, y: 20, duration: motion.duration.slow, stagger: 0.15, delay: delay + 0.5 });
    gsap.to(".h-wrap", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
  }, { scope: ref });
  const words = ["Where the sea", "becomes home."];
  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-ivory">
      <div className="h-wrap absolute inset-0">
        <img src={assetSrc(images.seaView)} alt="Fethiye bay seen from BlueTown" fetchPriority="high" className="h-img h-full w-full object-cover" />
      </div>
      <div className="bg-hero-shade absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 md:px-12 md:pb-24">
        <p className="h-fade eyebrow mb-6 text-sand">Fethiye · Muğla · Türkiye</p>
        <h1 className="display max-w-5xl">
          {words.map((w) => (
            <span key={w} className="block overflow-hidden pb-2"><span className="h-word block">{w}</span></span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="h-fade max-w-sm text-lg text-ivory/85">A coastal escape in the heart of Fethiye.</p>
          <div className="h-fade flex flex-wrap gap-3">
            <a href="#residence" className="btn-line">Explore the Residence</a>
            <a href={property.bookingHref} target="_blank" rel="noopener" className="btn-solid">Book Your Stay</a>
          </div>
        </div>
      </div>
      <a href="#intro" aria-label="Scroll down" className="h-fade absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-ivory/70"><ArrowDown strokeWidth={1} /></a>
    </section>
  );
}

const Section = ({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) => (
  <section id={id} className={`py-[clamp(96px,12vw,200px)] ${className}`}>
    <div className="mx-auto max-w-[1440px] px-6 md:px-12">{children}</div>
  </section>
);

export function Introduction() {
  return (
    <Section id="intro">
      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal as="p" className="eyebrow mb-8 text-turquoise">The BlueTown Experience</Reveal>
          <Reveal as="h2" className="title text-navy">A quieter way to stay in Fethiye.</Reveal>
          <Reveal delay={0.15} className="mt-10 max-w-md space-y-5 leading-relaxed text-muted-foreground">
            <p>A sea-view holiday home above the marina, a few steps from Paspatur Bazaar. Two bedrooms, a turquoise living room and a balcony that opens straight onto the bay.</p>
            <p>Unhurried mornings, boats drifting past, and the whole of central Fethiye within walking distance.</p>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <RevealImage src={images.windowView} alt="The bay framed by BlueTown's window" className="aspect-[4/5]" />
          <p className="eyebrow mt-4 text-muted-foreground">From the living room window</p>
        </div>
      </div>
    </Section>
  );
}

export function Residence() {
  const shapes: Record<string, string> = {
    tall: "aspect-[3/4]", wide: "aspect-[4/3]", square: "aspect-square",
  };
  const pos = ["md:col-span-5", "md:col-span-6 md:col-start-7 md:mt-40", "md:col-span-5 md:col-start-2", "md:col-span-4 md:col-start-8 md:-mt-24"];
  return (
    <Section id="residence" className="bg-card">
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Reveal as="p" className="eyebrow mb-6 text-turquoise">02 — The Residence</Reveal>
          <Reveal as="h2" className="title text-navy">Lived-in, light-filled.</Reveal>
        </div>
        <Reveal className="max-w-sm text-muted-foreground">Two bedrooms, one living room, one bathroom and a fully equipped kitchen — for up to a small family or friends.</Reveal>
      </div>
      <div className="grid gap-12 md:grid-cols-12">
        {rooms.map((r, i) => (
          <figure key={r.title} className={`group ${pos[i]}`}>
            <RevealImage src={r.img} alt={r.title} className={shapes[r.shape]!} imgClassName="group-hover:scale-105" />
            <figcaption className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-heading text-3xl text-navy">{r.title}</span>
              <span className="text-sm text-muted-foreground">{r.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function TheView() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "+=120%", scrub: true, pin: true } })
        .fromTo(".v-frame", { clipPath: "inset(18% 22% 18% 22%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" })
        .fromTo(".v-img", { scale: 1.3 }, { scale: 1, ease: "none" }, 0)
        .from(".v-title", { opacity: 0, y: 60, ease: "none" }, 0.4);
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(".v-img", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ref.current, scrub: true } });
    });
  }, { scope: ref });
  return (
    <section id="view" ref={ref} className="relative h-[100svh] overflow-hidden bg-ink text-ivory">
      <div className="v-frame absolute inset-0 overflow-hidden">
        <img src={assetSrc(images.balconyMarina)} alt="Marina view from BlueTown's balcony" loading="lazy" className="v-img h-full w-full object-cover" />
        <div className="bg-shade absolute inset-0" />
      </div>
      <div className="v-title relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 md:px-12">
        <p className="eyebrow mb-6 text-sand">03 — The View</p>
        <h2 className="display max-w-4xl">Wake up to the blue.</h2>
      </div>
    </section>
  );
}

export function Amenities() {
  return (
    <Section id="amenities">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal as="p" className="eyebrow mb-6 text-turquoise">04 — Amenities</Reveal>
          <Reveal as="h2" className="title text-navy">Everything you need.</Reveal>
          <Reveal className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
            <div><p className="eyebrow text-muted-foreground">Check-in</p><p className="mt-2 font-heading text-3xl text-navy">{property.checkIn}</p></div>
            <div><p className="eyebrow text-muted-foreground">Check-out</p><p className="mt-2 font-heading text-3xl text-navy">{property.checkOut}</p></div>
          </Reveal>
        </div>
        <Stagger className="md:col-span-7 md:col-start-6">
          {amenities.map((a, i) => (
            <div key={a.title} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-border py-7 md:grid-cols-[4rem_1fr_1fr]">
              <span className="eyebrow text-sand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-heading text-3xl text-navy transition-colors group-hover:text-turquoise md:text-4xl">{a.title}</h3>
              <p className="col-start-2 text-muted-foreground md:col-start-3">{a.note}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export function Discover() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReduced()) return;
    gsap.fromTo(".d-img", { clipPath: "inset(0 0 0 100%)", scale: 1.1 }, { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.1, ease: motion.easing.cinematic });
    gsap.fromTo(".d-text > *", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: motion.easing.reveal });
  }, { scope: ref, dependencies: [i] });
  const d = discover[i]!;
  return (
    <section id="discover" className="bg-navy py-[clamp(96px,12vw,200px)] text-ivory">
      <div ref={ref} className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal as="p" className="eyebrow mb-6 text-sand">05 — Discover Fethiye</Reveal>
        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3" role="tablist">
          {discover.map((x, k) => (
            <button key={x.key} role="tab" aria-selected={k === i} onClick={() => setI(k)}
              className={`border-b pb-2 font-heading text-2xl transition-colors md:text-3xl ${k === i ? "border-sand text-ivory" : "border-transparent text-ivory/45 hover:text-ivory/80"}`}>
              {x.key}
            </button>
          ))}
        </div>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink md:col-span-8">
            <img key={d.key} src={assetSrc(d.img)} alt={d.title} loading="lazy" className="d-img h-full w-full object-cover" />
          </div>
          <div key={d.key + "t"} className="d-text md:col-span-4" role="tabpanel">
            <p className="eyebrow text-sand">0{i + 1} / 0{discover.length}</p>
            <h3 className="mt-4 text-5xl">{d.title}</h3>
            <p className="mt-6 leading-relaxed text-ivory/75">{d.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const touch = useRef(0);
  const n = gallery.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const el = document.getElementById("gallery")!.getBoundingClientRect();
      if (!full && (el.bottom < 0 || el.top > window.innerHeight)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setFull(false);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [full, go]);
  useGSAP(() => { if (!prefersReduced()) gsap.fromTo(imgRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8, ease: motion.easing.reveal }); }, { dependencies: [i, full] });
  const g = gallery[i]!;
  const Controls = (
    <div className="flex items-center gap-6">
      <button onClick={() => go(-1)} aria-label="Previous photo" className="flex h-12 w-12 items-center justify-center border border-current/30 hover:bg-ivory hover:text-ink transition-colors"><ArrowLeft strokeWidth={1.2} /></button>
      <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")} / {n}</span>
      <button onClick={() => go(1)} aria-label="Next photo" className="flex h-12 w-12 items-center justify-center border border-current/30 hover:bg-ivory hover:text-ink transition-colors"><ArrowRight strokeWidth={1.2} /></button>
    </div>
  );
  const swipe = {
    onTouchStart: (e: TouchEvent) => (touch.current = e.touches[0]!.clientX),
    onTouchEnd: (e: TouchEvent) => { const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); },
  };
  return (
    <section id="gallery" className="bg-ink py-[clamp(96px,12vw,200px)] text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><Reveal as="p" className="eyebrow mb-6 text-sand">06 — Gallery</Reveal><Reveal as="h2" className="title">Moments at BlueTown.</Reveal></div>
          {Controls}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9]" {...swipe}>
          <img ref={imgRef} src={assetSrc(g.src)} alt={g.alt} className="h-full w-full object-cover" />
          <button onClick={() => setFull(true)} aria-label="Open fullscreen" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center bg-ink/50 backdrop-blur"><Maximize2 strokeWidth={1.2} size={18} /></button>
          <p className="absolute bottom-4 left-4 text-sm text-ivory/85">{g.alt}</p>
        </div>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {gallery.map((x, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show ${x.alt}`} className={`h-16 w-24 shrink-0 overflow-hidden transition-opacity ${k === i ? "opacity-100 ring-1 ring-sand" : "opacity-40 hover:opacity-80"}`}>
              <img src={assetSrc(x.src)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      {full && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[90] flex flex-col bg-ink text-ivory" {...swipe}>
          <div className="flex items-center justify-between p-4 md:p-6">{Controls}<button onClick={() => setFull(false)} aria-label="Close" className="flex h-12 w-12 items-center justify-center"><X strokeWidth={1.2} /></button></div>
          <div className="flex flex-1 items-center justify-center p-4"><img ref={imgRef} src={assetSrc(g.src)} alt={g.alt} className="max-h-full max-w-full object-contain" /></div>
        </div>
      )}
    </section>
  );
}

export function Location() {
  return (
    <Section id="location">
      <div className="grid items-center gap-16 md:grid-cols-12">
        <Parallax src={images.exterior} alt="BlueTown building on its street in Fethiye" className="aspect-[4/5] md:col-span-6" />
        <div className="md:col-span-5 md:col-start-8">
          <Reveal as="p" className="eyebrow mb-6 text-turquoise">07 — Location</Reveal>
          <Reveal as="h2" className="title text-navy">In the heart of town.</Reveal>
          <Reveal className="mt-10 space-y-6 text-muted-foreground">
            <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-sand" size={18} strokeWidth={1.4} />{property.address}</p>
            <p>Steps from Paspatur Bazaar and Fethiye Marina — restaurants, boat tours and the old town all on foot.</p>
            <a href={property.mapsHref} target="_blank" rel="noopener" className="btn-solid">Open in Google Maps</a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function FAQ() {
  return (
    <Section id="faq" className="bg-card">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal as="p" className="eyebrow mb-6 text-turquoise">08 — FAQ</Reveal>
          <Reveal as="h2" className="title text-navy">Good to know.</Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {faq.map((f) => (
            <details key={f.q} className="group border-t border-border py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-2xl text-navy md:text-3xl [&::-webkit-details-marker]:hidden">
                {f.q}<Plus className="shrink-0 transition-transform duration-500 group-open:rotate-45" strokeWidth={1.2} />
              </summary>
              <p className="mt-4 max-w-xl text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function BookingCTA() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-ivory">
      <Parallax src={images.marinaAerial} alt="Fethiye marina from above" className="absolute inset-0" amount={10} />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 text-center md:px-12">
        <Reveal as="p" className="eyebrow mb-8 text-sand">Reservations</Reveal>
        <Reveal as="h2" className="display mx-auto max-w-5xl">Your Fethiye story starts here.</Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={property.bookingHref} target="_blank" rel="noopener" className="btn-solid">Check Availability</a>
          <a href={property.phoneHref} className="btn-line"><Phone size={14} strokeWidth={1.4} />Call Us</a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy pt-24 pb-10 text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-10 text-sm text-ivory/70 md:grid-cols-3">
          <ul className="space-y-2">{nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-sand">{n.label}</a></li>)}</ul>
          <div className="space-y-2"><p className="eyebrow text-sand">Contact</p><a href={property.phoneHref} className="block hover:text-sand">{property.phone}</a><a href={property.whatsappHref} target="_blank" rel="noopener" className="block hover:text-sand">WhatsApp</a></div>
          <div className="space-y-2"><p className="eyebrow text-sand">Address</p><p>{property.address}</p></div>
        </div>
        <p className="mt-20 font-heading text-[clamp(4rem,19vw,17rem)] leading-[0.8] tracking-[-0.045em]">BLUETOWN</p>
        <div className="mt-6 flex justify-between eyebrow text-ivory/50"><span>Fethiye</span><span>© {new Date().getFullYear()}</span></div>
      </div>
    </footer>
  );
}
