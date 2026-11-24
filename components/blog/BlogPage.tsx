"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock3, Search, Sparkles, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { groups, posts, type Post } from "@/lib/blog-posts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tones = ["violet", "lime", "coral", "ink"];
const href = (post: Post) => `https://softsaro.com.np/blog/${post.slug}`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Cover({ post, index, featured = false }: { post: Post; index: number; featured?: boolean }) {
  if (post.image) {
    return <div className={`blog-art has-img${featured ? " is-featured" : ""}`} aria-hidden="true"><span className="blog-cover"><Image src={post.image} alt="" fill priority={featured} sizes={featured ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} /></span></div>;
  }
  return <div className={`blog-art blog-art-${tones[index % tones.length]}${featured ? " is-featured" : ""}`} aria-hidden="true"><i className="blog-art-orb" /><i className="blog-art-grid" /><span className="blog-art-window"><b /><b /><b /></span><span className="blog-art-line one" /><span className="blog-art-line two" /><span className="blog-art-line three" /><Sparkles className="blog-art-spark" /></div>;
}

function ArticleMeta({ post }: { post: Post }) {
  return <p className="blog-meta"><span>{post.date}</span><i /> <Clock3 size={14} /> {post.read}</p>;
}

export default function BlogPage() {
  const [group, setGroup] = useState<string>("All articles");
  const [query, setQuery] = useState("");
  const grid = useRef<HTMLDivElement>(null);
  const lead = posts[0];
  const rest = useMemo(() => posts.slice(1), []);
  const counts = useMemo(() => Object.fromEntries(groups.map((g) => [g, g === "All articles" ? rest.length : rest.filter((p) => p.group === g).length])), [rest]);
  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rest.filter((p) => (group === "All articles" || p.group === group) && (!needle || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(needle)));
  }, [rest, group, query]);
  const key = list.map((p) => p.slug).join("|");
  const prevKey = useRef(key);

  useGSAP(() => {
    if (prevKey.current === key) return;
    prevKey.current = key;
    const cards = gsap.utils.toArray<HTMLElement>(".blog-card", grid.current);
    cards.forEach((card) => { card.dataset.in = "1"; });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(cards, { y: 30, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: "expo.out", overwrite: "auto" });
    ScrollTrigger.refresh();
  }, { dependencies: [key], scope: grid });

  return <div className="blog-page" id="top">
    <section className="blog-hero" aria-labelledby="blog-title"><div className="wrap">
      <p className="lab"><i /><span className="gn">Softsaro journal /</span> Ideas for better digital work</p>
      <div className="blog-hero-row"><h1 id="blog-title"><span className="bl-mask"><span className="bl-in">Insights with</span></span> <em><span className="bl-mask"><span className="bl-in">momentum.</span></span></em></h1><p>Notes on design, technology and growth for teams building what&rsquo;s next.</p></div>
      <div className="blog-rule" />
      <div className="blog-topics" aria-label="Article categories">{groups.map((g) => <button className={g === group ? "active" : ""} aria-pressed={g === group} type="button" key={g} onClick={() => setGroup(g)}>{g}<span className="blog-count">{counts[g]}</span></button>)}</div>
    </div></section>
    <main className="blog-main wrap">
      <p className="blog-kicker">Latest perspective</p>
      <article className="blog-featured"><Cover post={lead} index={0} featured /><div className="blog-featured-copy"><p className="blog-category">{lead.category}</p><h2>{lead.title}</h2><p className="blog-excerpt">{lead.excerpt}</p><ArticleMeta post={lead} /><a href={href(lead)} className="blog-link" {...ext}>Read article <ArrowUpRight size={18} /></a></div></article>
      <div className="blog-list-head"><h2>More to explore</h2><div className="blog-search"><Search size={17} /><input aria-label="Search articles" placeholder="Search articles" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }} />{query && <button type="button" className="blog-search-clear" aria-label="Clear search" onClick={() => setQuery("")}><X size={14} /></button>}</div></div>
      <p className="sr-only" role="status">{list.length} articles shown</p>
      <div className="blog-grid" ref={grid}>
        {list.map((post, i) => <article className="blog-card" key={post.slug}><Cover post={post} index={i + 1} /><div className="blog-card-copy"><p className="blog-category">{post.category}</p><h3><a href={href(post)} {...ext}>{post.title}</a></h3><p className="blog-excerpt">{post.excerpt}</p><div className="blog-card-bottom"><ArticleMeta post={post} /><a href={href(post)} aria-hidden="true" tabIndex={-1} {...ext}><ArrowUpRight size={19} /></a></div></div></article>)}
        {list.length === 0 && <div className="blog-empty"><h3>No articles found</h3><p>Try another keyword or category.</p><button type="button" onClick={() => { setQuery(""); setGroup("All articles"); }}>Reset filters</button></div>}
      </div>
    </main>
    <section className="blog-newsletter"><div className="wrap blog-newsletter-in"><div><p className="lab w"><i /><span className="gn">Stay in the loop /</span> Monthly, not noisy</p><h2>Useful ideas, delivered with intent.</h2></div><form className="blog-signup"><label htmlFor="blog-email">Email address</label><div><input id="blog-email" type="email" placeholder="you@company.com" /><button type="submit">Subscribe <ArrowUpRight size={17} /></button></div></form></div></section>
  </div>;
}