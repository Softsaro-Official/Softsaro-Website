  "use client";

  import { useEffect, useRef, useState } from "react";
  import { useGSAP } from "@gsap/react";
  import { gsap } from "gsap";
  import Link from "next/link";
  import { usePathname } from "next/navigation";

  const S = "https://softsaro.com.np";

  const SERVICES = [
    { href: "/seo-training", label: "Advanced SEO", icon: "seo" },
    { href: "/services/digital-marketing-dubai", label: "Digital Marketing in Dubai", icon: "megaphone" },
  { href: "/digital-marketing-training", label: "Digital Marketing Training", icon: "training" },
    { href: "/web-development", label: "Web Development", icon: "code" },
    { href: "/services/banner-ads-in-nepal", label: "Banner Advertising", icon: "banner" },
    { href: "/services/domain-and-hosting-in-nepal", label: "Domain & Hosting in Nepal", icon: "server" },
    { href: "/mobile-app-development", label: "Mobile App Development", icon: "phone" },
    { href: "/ui-ux-design", label: "UI/UX Design", icon: "design" },
  ];

  const ICONS: Record<string, string> = {
  about: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-7 8-7s8 3 8 7", team: "M16 11a4 4 0 100-8 4 4 0 000 8zM3 21c0-4 3-7 7-7s7 3 7 7M17 14c3 0 5 2 5 6", price: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
  seo: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  training: "M3 9l9-5 9 5-9 5zM7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  banner: "M3 6h18v12H3zM3 10h18M7 14h5",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  phone: "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  design: "M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16zM14 6l3 3",
  megaphone: "M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6.5a8 8 0 010 11",
};
const ABOUT_LINKS = [
  { href: "/about-us", label: "Introduction", icon: "about" },
  { href: "/our-team", label: "Our Team", icon: "team" },
];
const PRICING_LINKS = [
  { href: "/pricing/digital-marketing", label: "Digital Marketing", icon: "megaphone" },
  { href: "/pricing/domain-hosting", label: "Domain & Hosting", icon: "server" },
  { href: "/pricing/advanced-seo", label: "Advanced SEO", icon: "seo" },
];
export default function Navbar({ b = "" }: { b?: string }) {
    const root = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [sub, setSub] = useState(false);
    const [aboutSub, setAboutSub] = useState(false);
    const [pricingSub, setPricingSub] = useState(false);
  const [paneKey, setPaneKey] = useState<string | null>(null);
  const pane = paneKey !== null;
  const setPane = (v: boolean) => setPaneKey(v ? "services" : null);
  const paneOpenRef = useRef(false);
  paneOpenRef.current = pane;
    const subRef = useRef<HTMLDivElement>(null);
    const chevRef = useRef<SVGSVGElement>(null);
    const aboutSubRef = useRef<HTMLDivElement>(null);
    const aboutChevRef = useRef<SVGSVGElement>(null);
    const pathname = usePathname();
    const subOpenRef = useRef(false);
    subOpenRef.current = sub;
    const pricingSubRef = useRef<HTMLDivElement>(null);
    const pricingChevRef = useRef<SVGSVGElement>(null);

    useEffect(() => { if (!open) { setSub(false); setAboutSub(false); setPricingSub(false); setPane(false); } }, [open]);

    // Services submenu: smooth height + chevron rotation
    useEffect(() => {
      const el = subRef.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const links = el.querySelectorAll("a");
      gsap.killTweensOf([el, chevRef.current, ...links]);
      gsap.to(el, { height: sub ? "auto" : 0, duration: reduce ? 0 : 0.6, ease: "expo.out" });
      gsap.to(chevRef.current, { rotation: sub ? 180 : 0, duration: reduce ? 0 : 0.5, ease: "expo.out" });
      if (sub && !reduce) gsap.fromTo(links, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.08, delay: 0.08, ease: "expo.out" });
      else gsap.set(links, { autoAlpha: 1, x: 0 });
    }, [sub]);

    useEffect(() => {
      const el = aboutSubRef.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const links = el.querySelectorAll("a");
      gsap.killTweensOf([el, aboutChevRef.current, ...links]);
      gsap.to(el, { height: aboutSub ? "auto" : 0, duration: reduce ? 0 : 0.6, ease: "expo.out" });
      gsap.to(aboutChevRef.current, { rotation: aboutSub ? 180 : 0, duration: reduce ? 0 : 0.5, ease: "expo.out" });
      if (aboutSub && !reduce) gsap.fromTo(links, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.08, delay: 0.08, ease: "expo.out" });
      else gsap.set(links, { autoAlpha: 1, x: 0 });
    }, [aboutSub]);

    useEffect(() => {
      const el = pricingSubRef.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const links = el.querySelectorAll("a");
      gsap.killTweensOf([el, pricingChevRef.current, ...links]);
      gsap.to(el, { height: pricingSub ? "auto" : 0, duration: reduce ? 0 : 0.6, ease: "expo.out" });
      gsap.to(pricingChevRef.current, { rotation: pricingSub ? 180 : 0, duration: reduce ? 0 : 0.5, ease: "expo.out" });
      if (pricingSub && !reduce) gsap.fromTo(links, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.08, delay: 0.08, ease: "expo.out" });
      else gsap.set(links, { autoAlpha: 1, x: 0 });
    }, [pricingSub]);

    useGSAP(() => {
      const nav = root.current;
      if (!nav) return;
      const items = nav.querySelectorAll(".menu-panel [data-menu-item]");
      const meta = nav.querySelectorAll(".menu-meta > *");
      gsap.set([...items, ...meta], { autoAlpha: 0, y: 28 });
    }, { scope: root });

    useEffect(() => {
      const nav = root.current;
      if (!nav) return;
      const items = nav.querySelectorAll(".menu-panel [data-menu-item]");
      const meta = nav.querySelectorAll(".menu-meta > *");
      const targets = [...items, ...meta];
      const panel = nav.querySelector(".menu-panel");
      gsap.killTweensOf([panel, ...targets]);
      document.body.classList.toggle("menu-is-open", open);

      if (open) {
        gsap.set(targets, { autoAlpha: 0, y: 28 });
        gsap.timeline()
          .to(panel, { clipPath: "inset(0 0 0% 0 round 0px)", duration: .72, ease: "expo.inOut" })
          .to(targets, { autoAlpha: 1, y: 0, duration: .7, stagger: .055, ease: "expo.out" }, "-=.28");
      } else {
        gsap.timeline()
          .to(targets, { autoAlpha: 0, y: -16, duration: .22, stagger: .015, ease: "power2.in" })
          .to(panel, { clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)", duration: .58, ease: "expo.inOut" }, "-=.06");
      }
      return () => document.body.classList.remove("menu-is-open");
    }, [open]);

    useEffect(() => {
      const onKey = (event: KeyboardEvent) => event.key === "Escape" && (subOpenRef.current ? setSub(false) : paneOpenRef.current ? setPane(false) : setOpen(false));
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Menu panes (services / about / pricing): swap main links for the card
  useEffect(() => {
    const nav = root.current;
    if (!nav) return;
    const lk = nav.querySelector<HTMLElement>(".menu-links");
    const all = Array.from(nav.querySelectorAll<HTMLElement>(".svc-pane"));
    if (!lk || !all.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduce ? 0 : 1;
    const act = all.find((p) => p.dataset.pane === paneKey) || null;
    const parts = act ? Array.from(act.querySelectorAll<HTMLElement>(".svc-side > *, .svc-item")) : [];
    gsap.killTweensOf([lk, ...all, ...parts]);
    all.forEach((p) => { if (p !== act) gsap.set(p, { autoAlpha: 0 }); });
    if (act) {
      gsap.timeline()
        .to(lk, { autoAlpha: 0, y: -14, duration: 0.3 * d, ease: "power2.in" })
        .fromTo(act, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55 * d, ease: "expo.out" }, ">-0.05")
        .fromTo(parts, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 * d, stagger: 0.05 * d, ease: "expo.out" }, "-=0.35");
    } else {
      gsap.timeline()
        .to(lk, { autoAlpha: 1, y: 0, duration: 0.5 * d, ease: "expo.out" });
    }
  }, [paneKey]);

  // NAV_FAILSAFE: never leave the navbar stuck above the viewport
    useEffect(() => {
      const t = window.setTimeout(() => {
        const el = root.current?.querySelector<HTMLElement>(".nav");
        if (el && !el.classList.contains("hide") && el.getBoundingClientRect().top < -1) {
          gsap.to(el, { yPercent: 0, y: 0, duration: 0.6, ease: "expo.out" });
        }
      }, 5500);
      return () => window.clearTimeout(t);
    }, []);
    const hover = (e: React.MouseEvent<HTMLButtonElement>, on: boolean) => {
      const t = e.currentTarget;
      gsap.to(t.querySelector("i"), { scale: on ? 1.12 : 1, duration: 0.55, ease: "expo.out", overwrite: "auto" });
      gsap.to(t.querySelector("span"), { x: on ? -5 : 0, duration: 0.45, ease: "expo.out", overwrite: "auto" });
    };
    const hoverSub = (target: "about" | "services" | "pricing", show: boolean) => {
      if (!window.matchMedia("(min-width: 701px) and (hover: hover)").matches) return;
      if (show) {
        setAboutSub(false);
        setSub(false);
        setPricingSub(false);
        return;
      }
      if (target === "about") setAboutSub(false);
      if (target === "services") setSub(false);
      if (target === "pricing") setPricingSub(false);
    };
    const openPane = (k: "about" | "pricing") => {
      if (window.matchMedia("(min-width: 701px)").matches) { setSub(false); setAboutSub(false); setPricingSub(false); setPaneKey(k); }
      else if (k === "about") setAboutSub(!aboutSub);
      else setPricingSub(!pricingSub);
    };
    const renderPane = (key: string, eyebrow: string, title: string, note: string, items: { href: string; label: string; icon: string }[]) => (
      <div className="svc-pane" data-pane={key} aria-hidden={paneKey !== key} inert={paneKey !== key}>
        <div className="svc-card">
          <div className="svc-side">
            <button type="button" className="svc-back" onClick={() => setPane(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Back</button>
            <p className="svc-eyebrow">{eyebrow}</p>
            <h2 className="svc-title">{title}</h2>
            <p className="svc-note">{note}</p>
            <a className="svc-cta" href={`${S}/contact`} onClick={close}>Start a project <b aria-hidden="true">&#8599;</b></a>
          </div>
          <div className="svc-grid" onPointerMove={spot}>
            {items.map((s, i) => (
              <div className="svc-item" key={s.href}>
                <Link className="svc-link" href={s.href} onClick={close} aria-current={pathname === s.href ? "page" : undefined}>
                  <span className="svc-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[s.icon]} /></svg></span>
                  <span className="svc-tx"><span className="svc-n">{String(i + 1).padStart(2, "0")}</span><span className="svc-t">{s.label}</span></span>
                  <span className="svc-ar" aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    const toggleServices = () => {
      if (window.matchMedia("(min-width: 701px)").matches) { setAboutSub(false); setPricingSub(false); setPane(true); }
      else setSub(!sub);
    };
    const spot = (e: React.PointerEvent<HTMLElement>) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>(".svc-link");
      if (!a) return;
      const r = a.getBoundingClientRect();
      a.style.setProperty("--mx", `${e.clientX - r.left}px`);
      a.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const close = () => { setOpen(false); setSub(false); setAboutSub(false); setPricingSub(false); setPane(false); };
    return (
      <div className={`menu-shell${open ? " is-open" : ""}`} ref={root}>
        <header className="nav menu-nav" id="nav">
          <a href={`${b}#top`} className="menu-brand" aria-label="Softsaro home" onClick={close}><img className="menu-logo" src="/softsaro-logo.png" width={1024} height={285} alt="Softsaro" /></a>
          <button className="menu-trigger" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
            <span>{open ? "Close" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
          </button>
        </header>
        <div className="menu-panel" id="site-menu" aria-hidden={!open} inert={!open}>
          <div className="menu-content">
            <nav className="menu-links" aria-label="Primary navigation" inert={pane}>
              <a data-menu-item data-cur="open" data-label="Open" className="menu-home" href={`${b}#top`} onClick={close}><span>01</span>Home <em>↗</em></a>
              <div data-menu-item className="menu-about menu-sw" onMouseEnter={() => hoverSub("about", true)} onMouseLeave={() => hoverSub("about", false)}>
                <button type="button" data-cur="open" data-label="Open" className="services-toggle" aria-expanded={aboutSub || paneKey === "about"} aria-controls="menu-about-sub" onClick={() => openPane("about")}><span>02</span>About <svg ref={aboutChevRef} className="msub-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></button>
                <div className="msub" id="menu-about-sub" ref={aboutSubRef} aria-hidden={!aboutSub} inert={!aboutSub}>
                  <div className="msub-in">
                    <Link data-cur="open" data-label="Open" href="/about-us" onClick={close}>Introduction <b aria-hidden="true">&#8599;</b></Link>
                    <Link data-cur="open" data-label="Open" href="/our-team" onClick={close}>Our Team <b aria-hidden="true">&#8599;</b></Link>
                  </div>
                </div>
              </div>
              <div data-menu-item className="menu-services-link menu-sw" onMouseEnter={() => hoverSub("services", true)} onMouseLeave={() => hoverSub("services", false)}>
                <button type="button" data-cur="open" data-label="Open" className="services-toggle" aria-expanded={sub || pane} aria-controls="menu-sub" onClick={toggleServices}><span>03</span>Services <svg ref={chevRef} className="msub-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></button>
                <div className="msub msub-svc" id="menu-sub" ref={subRef} aria-hidden={!sub} inert={!sub}>
                  <div className="msub-in">
                    {SERVICES.map((s) => (
                      <Link key={s.href} data-cur="open" data-label="Open" href={s.href} onClick={close} aria-current={pathname === s.href ? "page" : undefined}>{s.label} <b aria-hidden="true">&#8599;</b></Link>
                    ))}
                  </div>
                </div>
              </div>
              <div data-menu-item className="menu-pricing menu-sw" onMouseEnter={() => hoverSub("pricing", true)} onMouseLeave={() => hoverSub("pricing", false)}>
                <button type="button" data-cur="open" data-label="Open" className="services-toggle" aria-expanded={pricingSub || paneKey === "pricing"} aria-controls="menu-pricing-sub" onClick={() => openPane("pricing")}><span>04</span>Pricing <svg ref={pricingChevRef} className="msub-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></button>
                <div className="msub" id="menu-pricing-sub" ref={pricingSubRef} aria-hidden={!pricingSub} inert={!pricingSub}>
                  <div className="msub-in">
                    <Link data-cur="open" data-label="Open" href="/pricing/digital-marketing" onClick={close}>Digital Marketing <b aria-hidden="true">&#8599;</b></Link>
                    <Link data-cur="open" data-label="Open" href="/pricing/domain-hosting" onClick={close}>Domain &amp; Hosting <b aria-hidden="true">&#8599;</b></Link>
                    <Link data-cur="open" data-label="Open" href="/pricing/advanced-seo" onClick={close}>Advanced SEO <b aria-hidden="true">&#8599;</b></Link>
                  </div>
                </div>
              </div>
              <a data-menu-item data-cur="open" data-label="Open" className="menu-portfolio" href={`${S}/portfolio`} onClick={close}><span>05</span>Portfolio <em>↗</em></a>
              <Link data-menu-item data-cur="open" data-label="Open" className="menu-blogs" href="/blog" onClick={close}><span>06</span>Blogs <em>↗</em></Link>
              <a data-menu-item data-cur="open" data-label="Open" className="menu-contact" href={`${b}#contact`} onClick={close}><span>07</span>Contact <em>↗</em></a>
            </nav>
          </div>
          {renderPane("about", "About Softsaro", "Who we are", "Meet the team behind the work.", ABOUT_LINKS)}
          {renderPane("pricing", "Pricing", "Clear, custom pricing", "Pick a service to see how pricing works.", PRICING_LINKS)}
          <div className="svc-pane" data-pane="services" aria-hidden={paneKey !== "services"} inert={paneKey !== "services"}>
            <div className="svc-card">
              <div className="svc-side">
                <button type="button" className="svc-back" onClick={() => setPane(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Back</button>
                <p className="svc-eyebrow">Our services</p>
                <h2 className="svc-title">What we can do for you</h2>
                <p className="svc-note">Web, apps, design and digital marketing from one team.</p>
                <a className="svc-cta" href={`${S}/contact`} onClick={close}>Start a project <b aria-hidden="true">&#8599;</b></a>
              </div>
              <div className="svc-grid" onPointerMove={spot}>
                {SERVICES.map((s, i) => (
                  <div className="svc-item" key={s.href}>
                    <Link className="svc-link" href={s.href} onClick={close} aria-current={pathname === s.href ? "page" : undefined}>
                      <span className="svc-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[s.icon]} /></svg></span>
                      <span className="svc-tx"><span className="svc-n">{String(i + 1).padStart(2, "0")}</span><span className="svc-t">{s.label}</span></span>
                      <span className="svc-ar" aria-hidden="true">&#8599;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
