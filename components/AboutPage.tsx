import Link from "next/link";
import { ArrowUpRight, Check, Compass, Layers3, Sparkles } from "lucide-react";
import { D } from "@/lib/data";

const principles = [
  { icon: Compass, title: "Start with the real goal", copy: "We listen for the business outcome behind the brief, then make decisions that move it forward." },
  { icon: Layers3, title: "Make complexity useful", copy: "Strategy, design and technology work best when they feel clear to the people using them." },
  { icon: Sparkles, title: "Care about the finish", copy: "The details matter. We refine the work until it feels considered, capable and ready to grow." },
];

export default function AboutPage() {
  return <main className="about-page" id="top">
    <section className="about-hero"><div className="wrap" data-reveal>
      <p className="lab"><i /><span className="gn">About Softsaro /</span> Digital partners since day one</p>
      <div className="about-hero-grid"><div><h1>Good work begins with <em>real partnership.</em></h1><p>Softsaro is a digital team for ambitious businesses that want to build with more clarity, care and momentum.</p></div><div className="about-orbit" aria-hidden="true"><i className="about-orbit-ring" /><i className="about-orbit-dot one" /><i className="about-orbit-dot two" /><b>SS</b></div></div>
      <div className="about-scroll"><span>Scroll to discover</span><i /></div>
    </div></section>

    <section className="about-intro"><div className="wrap about-intro-grid" data-reveal><p className="blog-category">Who we are</p><div><h2>A close-knit team for the work that matters next.</h2><p className="about-large">We bring strategy, design and engineering together to create useful digital experiences. The kind that make a business clearer, easier to choose and ready to grow.</p><Link href="/#contact" className="about-text-link">Start a conversation <ArrowUpRight size={18} /></Link></div></div></section>

    <section className="about-stats"><div className="wrap"><div className="about-stat-grid" data-reveal>{D.stats.map((stat: [number, string, string]) => <div key={stat[2]}><strong>{stat[0]}<em>{stat[1]}</em></strong><span>{stat[2]}</span></div>)}</div></div></section>

    <section className="about-approach"><div className="wrap" data-reveal><p className="lab"><i /><span className="gn">How we work /</span> Built around people</p><div className="about-approach-heading"><h2>Expertise with a human point of view.</h2><p>We believe better outcomes come from curious questions, honest collaboration and people who care about the craft.</p></div><div className="about-principles">{principles.map(({ icon: Icon, title, copy }, index) => <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="about-closing"><div className="wrap" data-reveal><div><p className="blog-category">Our promise</p><h2>We make digital feel less distant.</h2><p>Whether it is a new brand, a faster website or a more useful product, we work alongside your team to make the next move count.</p></div><Link href="/#contact">Let&rsquo;s work together <ArrowUpRight size={20} /></Link></div></section>
  </main>;
}
