import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react";

const points = [
  ["Start with one job", "A website cannot be everything to everyone. Decide the action that matters most: start a project, book a call, request a quote or buy."],
  ["Make the next step obvious", "Every page should give people a confident next move. Use clear language, one primary action and enough context to reduce hesitation."],
  ["Earn attention before asking", "Lead with the problem you solve and the proof that you can solve it. Services, examples, process and testimonials should work together."],
  ["Keep it fast and easy", "A slow or confusing page quietly spends your marketing budget. Performance, mobile usability and readable content are conversion work."],
];

export default function BlogArticle() {
  return <main className="article-page">
    <section className="article-hero"><div className="wrap" data-reveal>
      <Link className="article-back" href="/blog"><ArrowLeft size={17} /> Back to insights</Link>
      <p className="blog-category">Growth strategy</p>
      <h1>The practical guide to a website that earns its keep</h1>
      <p className="article-dek">A business website should do more than look polished. It should make the right next step feel simple for the people you want to work with.</p>
      <div className="article-meta"><span>By Softsaro team</span><i /><span>May 16, 2026</span><i /><Clock3 size={15} /><span>7 min read</span></div>
    </div></section>

    <section className="article-body wrap" data-reveal>
      <aside className="article-aside"><span>In this article</span><a href="#job">One clear job</a><a href="#path">A clear path</a><a href="#proof">Proof over promises</a></aside>
      <article>
        <p className="article-lead">Most websites are treated as a finishing touch. In practice, they are often the first useful conversation a prospective customer has with your business.</p>
        <p>That makes the goal less mysterious than it sounds: help the right people understand what you do, why it matters to them, and what they should do next. The strongest websites do this with focus rather than more pages, more effects or more claims.</p>
        <div className="article-callout"><span>01</span><p>A useful website creates clarity before it asks for commitment.</p></div>
        <h2 id="job">Give every page one clear job</h2>
        <p>Before you write a headline or choose a layout, define the outcome. A services page may be there to start qualified conversations. A portfolio page may need to build confidence. A pricing page may need to help someone decide whether to get in touch.</p>
        <p>When a page tries to make every case at once, readers have to do the sorting. When its job is clear, the message, proof and call to action become much easier to shape.</p>
        <h2 id="path">Build a path, not a brochure</h2>
        <p>People do not experience your website in the order it was designed. They arrive with a question, scan for a useful answer, and look for signals that they can trust you. Design the page around that path.</p>
        <ul className="article-checks">{points.map(([title, text]) => <li key={title}><Check size={18} /><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul>
        <h2 id="proof">Replace promises with proof</h2>
        <p>“We are the best” is not a reason to believe you. Specific outcomes, thoughtful process, real work and clear expertise are. Bring those elements close to the moment when someone is deciding whether to take the next step.</p>
        <p>A website that earns its keep is never finished once. Watch where people hesitate, listen to the questions sales receives, and improve the pages that carry the most responsibility.</p>
        <div className="article-next"><div><p className="blog-category">Need a website that works harder?</p><h2>Let&rsquo;s make the next step clear.</h2></div><a href="/#contact">Start a project <ArrowUpRight size={18} /></a></div>
      </article>
    </section>
  </main>;
}
