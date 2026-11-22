import Link from "next/link";
import { ArrowUpRight, Clock3, Search, Sparkles } from "lucide-react";

type Article = { category: string; title: string; excerpt: string; date: string; read: string; tone: string; featured?: boolean };

const articles: Article[] = [
  { category: "Growth strategy", title: "The practical guide to a website that earns its keep", excerpt: "A clear framework for turning a beautiful website into a useful business tool — from first impression to final conversion.", date: "May 16, 2026", read: "7 min read", tone: "violet", featured: true },
  { category: "SEO", title: "How to build an SEO plan people can actually follow", excerpt: "Start with the questions your customers ask, then make every page earn its place.", date: "May 08, 2026", read: "5 min read", tone: "lime" },
  { category: "Design", title: "Small UX decisions that make a big difference", excerpt: "The details that make a digital product feel obvious, useful and easy to return to.", date: "April 29, 2026", read: "6 min read", tone: "coral" },
  { category: "Development", title: "What makes a modern business website fast?", excerpt: "A plain-language look at performance, accessibility and the technical choices behind a stronger web presence.", date: "April 17, 2026", read: "8 min read", tone: "ink" },
];

const categories = ["All articles", "Growth strategy", "Design", "Development", "SEO"];

function ArticleArt({ tone, featured = false }: { tone: string; featured?: boolean }) {
  return <div className={`blog-art blog-art-${tone}${featured ? " is-featured" : ""}`} aria-hidden="true"><i className="blog-art-orb" /><i className="blog-art-grid" /><span className="blog-art-window"><b /><b /><b /></span><span className="blog-art-line one" /><span className="blog-art-line two" /><span className="blog-art-line three" /><Sparkles className="blog-art-spark" /></div>;
}

function ArticleMeta({ article }: { article: Article }) {
  return <p className="blog-meta"><span>{article.date}</span><i /> <Clock3 size={14} /> {article.read}</p>;
}

export default function BlogPage() {
  const lead = articles[0];
  return <div className="blog-page" id="top">
    <section className="blog-hero" aria-labelledby="blog-title"><div className="wrap">
      <p className="lab"><i /><span className="gn">Softsaro journal /</span> Ideas for better digital work</p>
      <div className="blog-hero-row"><h1 id="blog-title">Insights with <em>momentum.</em></h1><p>Notes on design, technology and growth for teams building what&rsquo;s next.</p></div>
      <div className="blog-rule" />
      <div className="blog-topics" aria-label="Article categories">{categories.map((category, index) => <button className={index === 0 ? "active" : ""} type="button" key={category}>{category}</button>)}</div>
    </div></section>
    <main className="blog-main wrap">
      <p className="blog-kicker">Latest perspective</p>
      <article className="blog-featured"><ArticleArt tone={lead.tone} featured /><div className="blog-featured-copy"><p className="blog-category">{lead.category}</p><h2>{lead.title}</h2><p className="blog-excerpt">{lead.excerpt}</p><ArticleMeta article={lead} /><Link href="/blog/a-website-that-earns-its-keep" className="blog-link">Read article <ArrowUpRight size={18} /></Link></div></article>
      <div className="blog-list-head"><h2>More to explore</h2><div className="blog-search"><Search size={17} /><input aria-label="Search articles" placeholder="Search articles" /></div></div>
      <div className="blog-grid">{articles.slice(1).map((article) => <article className="blog-card" key={article.title}><ArticleArt tone={article.tone} /><div className="blog-card-copy"><p className="blog-category">{article.category}</p><h3>{article.title}</h3><p className="blog-excerpt">{article.excerpt}</p><div className="blog-card-bottom"><ArticleMeta article={article} /><Link href="#" aria-label={`Read ${article.title}`}><ArrowUpRight size={19} /></Link></div></div></article>)}</div>
    </main>
    <section className="blog-newsletter"><div className="wrap blog-newsletter-in"><div><p className="lab w"><i /><span className="gn">Stay in the loop /</span> Monthly, not noisy</p><h2>Useful ideas, delivered with intent.</h2></div><form className="blog-signup"><label htmlFor="blog-email">Email address</label><div><input id="blog-email" type="email" placeholder="you@company.com" /><button type="submit">Subscribe <ArrowUpRight size={17} /></button></div></form></div></section>
  </div>;
}
