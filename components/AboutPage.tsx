import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3, Cog, Compass, Headset, Layers3, Mail, MapPin, MessageCircle, Phone, Sparkles, Users } from "lucide-react";
import { D } from "@/lib/data";
import { aboutImg } from "@/lib/about-images";
import { clientsCopy, companyIntro, contactCards, leader, mission, vision, whoExtra, whyCards } from "@/lib/about-data";
import { FxCard } from "@/components/AboutFx";

const principles = [
  { icon: Compass, title: "Start with the real goal", copy: "We listen for the business outcome behind the brief, then make decisions that move it forward." },
  { icon: Layers3, title: "Make complexity useful", copy: "Strategy, design and technology work best when they feel clear to the people using them." },
  { icon: Sparkles, title: "Care about the finish", copy: "The details matter. We refine the work until it feels considered, capable and ready to grow." },
];
const whyIcons = { cog: Cog, users: Users, clock: Clock3, headset: Headset } as const;
const contactIcons = { pin: MapPin, phone: Phone, mail: Mail } as const;

/* every logo placed in public/images/partners is picked up automatically */
function partnerLogos(): string[] {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public", "images", "partners")).filter((f) => /\.(webp|png|jpe?g|svg|avif)$/i.test(f)).sort();
  } catch { return []; }
}

function Shot({ img, alt, sizes, pos, tag }: { img: { src: string; blur: string }; alt: string; sizes: string; pos?: string; tag?: string }) {
  return <div className="about-shot"><span className="about-shot-in"><Image src={img.src} alt={alt} fill sizes={sizes} placeholder="blur" blurDataURL={img.blur} style={{ objectPosition: pos }} /></span>{tag ? <span className="about-shot-tag"><i />{tag}</span> : null}</div>;
}

export default function AboutPage() {
  const logos = partnerLogos();
  return <main className="about-page" id="top">
    <section className="about-hero"><div className="wrap" data-reveal>
      <p className="lab"><i /><span className="gn">About Softsaro /</span> Digital partners since day one</p>
      <div className="about-hero-grid"><div><h1>Good work begins with <em>real partnership.</em></h1><p>Softsaro is a digital team for ambitious businesses that want to build with more clarity, care and momentum.</p></div><div className="about-orbit" aria-hidden="true"><i className="about-orbit-ring" /><i className="about-orbit-dot one" /><i className="about-orbit-dot two" /><b>SS</b></div></div>
      <div className="about-scroll"><span>Scroll to discover</span><i /></div>
    </div></section>

    <section className="about-co"><div className="wrap about-co-grid">
      <h2>{companyIntro.titleA} <em>{companyIntro.titleB}</em></h2>
      <div className="about-co-side">
        <p>{companyIntro.text}</p>
        <div className="about-happy"><span className="about-happy-av" aria-hidden="true">{logos.slice(0, 3).map((f) => <span key={f} style={{ backgroundImage: `url(/images/partners/${f})` }} />)}</span><b>{companyIntro.happy}</b></div>
      </div>
    </div></section>

    <section className="about-intro"><div className="wrap about-intro-grid" data-reveal><p className="blog-category">Who we are</p><div><h2>A close-knit team for the work that matters next.</h2><p className="about-large">We bring strategy, design and engineering together to create useful digital experiences. The kind that make a business clearer, easier to choose and ready to grow.</p>
      <div className="about-who-extra"><h3>{whoExtra.title}</h3><p>{whoExtra.text}</p><span className="about-trusted"><i />{whoExtra.tag}</span></div>
      <Link href="/#contact" className="about-text-link">Start a conversation <ArrowUpRight size={18} /></Link></div></div></section>

    <section className="about-collage-sec"><div className="wrap about-collage">
      <figure className="c1"><Shot img={aboutImg.teamNine} alt="The Softsaro team working together around a long table in the office" sizes="(min-width:1100px) 1400px, 100vw" pos="center 62%" tag="Life at Softsaro" /></figure>
      <figure className="c2"><Shot img={aboutImg.teamFour} alt="A Softsaro developer working at his desk" sizes="(min-width:1100px) 800px, 100vw" /></figure>
      <figure className="c3"><Shot img={aboutImg.teamSeven} alt="Softsaro team members working on their laptops" sizes="(min-width:1100px) 560px, 100vw" pos="center 25%" /></figure>
    </div></section>

    <section className="about-stats"><div className="wrap"><div className="about-stat-grid" data-reveal>{D.stats.map((stat: [number, string, string]) => <div key={stat[2]}><strong>{stat[0]}<em>{stat[1]}</em></strong><span>{stat[2]}</span></div>)}</div></div></section>

    <section className="about-mv-sec"><div className="wrap about-mv">
      <FxCard className="about-mv-card is-light"><small>Our Mission</small><p>{mission}</p></FxCard>
      <FxCard className="about-mv-card is-dark" delay={0.12}><small>Our Vision</small><p>{vision}</p></FxCard>
    </div></section>

    <section className="about-why"><div className="wrap">
      <p className="lab"><i /><span className="gn">Why choose us /</span> Why Softsaro</p>
      <h2>Why Softsaro</h2>
      <div className="about-why-grid">{whyCards.map((c, i) => { const Icon = whyIcons[c.icon as keyof typeof whyIcons]; return <FxCard key={c.title} className={`about-why-card w${i + 1}`} delay={(i % 2) * 0.1}><span className="about-why-ic"><Icon size={26} /></span><h3>{c.title}</h3><p>{c.text}</p></FxCard>; })}</div>
    </div></section>

    <section className="about-approach"><div className="wrap" data-reveal><p className="lab"><i /><span className="gn">How we work /</span> Built around people</p><div className="about-approach-heading"><h2>Expertise with a human point of view.</h2><p>We believe better outcomes come from curious questions, honest collaboration and people who care about the craft.</p></div><div className="about-principles">{principles.map(({ icon: Icon, title, copy }, index) => <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="about-lead"><div className="wrap about-lead-grid">
      <div className="about-portrait"><span className="about-portrait-in"><Image src={aboutImg.founder.src} alt={`${leader.name}, ${leader.chipRole} of Softsaro Nepal`} fill sizes="(min-width:1100px) 520px, 90vw" placeholder="blur" blurDataURL={aboutImg.founder.blur} /></span><span className="about-portrait-chip name"><i />{leader.name}</span><span className="about-portrait-chip role">{leader.chipRole}</span></div>
      <div className="about-lead-copy">
        <p className="blog-category">{leader.tag}</p>
        <h2>{leader.titleA} <em>{leader.titleB}</em></h2>
        <div className="about-quote"><blockquote>{leader.quote}</blockquote>
          <div className="about-quote-foot"><div><b>{leader.name} <BadgeCheck size={16} aria-hidden="true" /></b><small>{leader.role}</small></div><a className="about-wa" href={leader.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} />WhatsApp Us <ArrowUpRight size={16} /></a></div></div>
      </div>
    </div></section>

    <section className="about-clients"><div className="wrap">
      <div className="about-clients-head"><div><p className="blog-category">{clientsCopy.eyebrow}</p><h2>{clientsCopy.title}</h2><p className="about-clients-text">{clientsCopy.text}</p></div><div className="about-count"><strong><span data-about-count={clientsCopy.retention}>{clientsCopy.retention}</span>+</strong><small>Client retention</small></div></div>
    </div>
      {logos.length > 0 && <div className="about-mq" aria-label="Logos of our clients"><div className="about-mq-track">{[0, 1].flatMap((r) => logos.map((f) => <span className="about-logo" key={`${r}-${f}`} aria-hidden={r === 1}><Image src={`/images/partners/${f}`} alt={r === 0 ? "Softsaro client logo" : ""} fill sizes="200px" /></span>))}</div></div>}
    </section>

    <section className="about-contact"><div className="wrap">
      <p className="lab"><i /><span className="gn">Contact us /</span> Start a conversation with our team</p>
      <div className="about-contact-grid">{contactCards.map((c, i) => { const Icon = contactIcons[c.icon as keyof typeof contactIcons]; return <FxCard key={c.label} href={c.href || undefined} className="about-contact-card" delay={i * 0.1}><span><Icon size={20} /></span><div><small>{c.label}</small><b>{c.value}</b></div></FxCard>; })}</div>
    </div></section>

    <section className="about-closing"><div className="wrap" data-reveal><div><p className="blog-category">Our promise</p><h2>We make digital feel less distant.</h2><p>Whether it is a new brand, a faster website or a more useful product, we work alongside your team to make the next move count.</p></div><Link href="/#contact">Let&rsquo;s work together <ArrowUpRight size={20} /></Link></div></section>
  </main>;
}