"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Web Development", title: "Websites built to move your business forward.", description: "Fast, considered websites and digital products shaped around the people who use them and the goals your business needs to reach.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85", alt: "Developer working at a desk", tags: ["Websites", "Web apps", "E-commerce", "Next.js", "CMS"] },
  { name: "Branding & UI/UX", title: "A clear identity, made for real people.", description: "We bring strategy and visual craft together to create distinctive brands and intuitive digital experiences.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=85", alt: "Colorful visual identity and design materials", tags: ["Brand strategy", "Visual identity", "Product design", "Prototyping", "Design systems"] },
  { name: "Mobile App Development", title: "Useful mobile experiences, from first tap.", description: "Thoughtful iOS and Android apps that make complex tasks feel simple and help your customers stay connected.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?auto=format&fit=crop&w=1600&q=85", alt: "Mobile phone showing an app", tags: ["iOS", "Android", "Cross-platform", "UX research", "App support"] },
  { name: "Digital Marketing", title: "Reach the right people and keep growing.", description: "Practical campaigns built around your audience, measured against meaningful outcomes, and improved over time.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85", alt: "Digital marketing analytics on a laptop", tags: ["Campaigns", "Social media", "Paid media", "Content", "Analytics"] },
  { name: "SEO", title: "Be found by the people looking for you.", description: "Technical, on-page and content improvements that build lasting visibility and bring qualified visitors to your site.", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=85", alt: "Search performance charts on a screen", tags: ["Technical SEO", "Content strategy", "Local SEO", "Audits", "Reporting"] },
  { name: "Domain & Hosting", title: "A reliable home for everything you build.", description: "Secure domains, managed hosting and responsive support to keep your website online, protected and performing.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85", alt: "Server infrastructure with purple lighting", tags: ["Domain names", "Cloud hosting", "SSL security", "Backups", "Support"] },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach((card, index) => {
      const image = card.querySelector<HTMLImageElement>(".service-card-image");
      const copy = card.querySelectorAll<HTMLElement>(".service-copy h2, .service-copy h3, .service-copy p, .service-includes h4, .service-tags span");

      if (!reducedMotion) {
        gsap.fromTo(image, { clipPath: "inset(0 0 100% 0 round 12px)", scale: 1.08 }, {
          clipPath: "inset(0 0 0% 0 round 12px)", scale: 1, duration: .9, ease: "power3.inOut",
          scrollTrigger: { trigger: card, start: "top 78%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(copy, { y: 20, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .55, stagger: .055, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 72%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(image, { yPercent: 2 }, {
          yPercent: -2, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .7 },
        });
      }

      ScrollTrigger.create({
        trigger: card,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
        onLeaveBack: () => setActive(Math.max(0, index - 1)),
      });
    });

    ScrollTrigger.refresh();
  }, { scope: root });

  const goToService = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const parallax = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const image = event.currentTarget.querySelector<HTMLImageElement>(".service-card-image");
    if (!image) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    gsap.to(image, { x: ((event.clientX - bounds.left) / bounds.width - .5) * -10, y: ((event.clientY - bounds.top) / bounds.height - .5) * -8, duration: .55, ease: "power2.out", overwrite: true });
  };

  const resetParallax = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = event.currentTarget.querySelector<HTMLImageElement>(".service-card-image");
    if (image) gsap.to(image, { x: 0, y: 0, duration: .65, ease: "power3.out" });
  };

  return (
    <section className="service-showcase" id="services" ref={root}>
      <span className="service-ambience" aria-hidden="true" />
      <div className="service-bottom-frame" aria-hidden="true"><i /><i /></div>
      <div className="wrap">
        <p className="lab"><i></i><span className="gn">01 /</span> Our services</p>
        <div className="service-layout">
          <nav className="service-list-wrap" aria-label="Our services">
            <ol className="service-list">
              {services.map((service, index) => <li key={service.name}>
                <button type="button" className={`service-choice${active === index ? " is-active" : ""}`} aria-current={active === index ? "location" : undefined} onClick={() => goToService(index)}>
                  <span className="service-index">0{index + 1}</span><span>{service.name}</span><span className="service-nav-arrow" aria-hidden="true"><ArrowUpRight /></span>
                </button>
              </li>)}
            </ol>
          </nav>
          <div className="service-feed">
            {services.map((service, index) => <article className="service-card" key={service.name} ref={(node) => { cardRefs.current[index] = node; }} aria-labelledby={`service-title-${index}`}>
              <div className="service-card-visual" onMouseMove={parallax} onMouseLeave={resetParallax}>
                {/* eslint-disable-next-line @next/next/no-img-element */}<img className="service-card-image" src={service.image} alt={service.alt} loading={index === 0 ? "eager" : "lazy"} />
                <span className="service-image-caption">Softsaro / {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="service-details">
                <div className="service-copy"><h2>{service.name}</h2><h3 id={`service-title-${index}`}>{service.title}</h3><p>{service.description}</p></div>
                <div className="service-includes"><h4>What&apos;s included</h4><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              </div>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
