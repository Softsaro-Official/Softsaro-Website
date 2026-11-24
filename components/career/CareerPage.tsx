import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Calendar, Check, Clock3, Code, Eye, FileText, Heart, Laptop, MapPin, Monitor, Palette, Phone, Quote, Rocket, Search, Send, Shield, Smartphone, Sparkles, Star, UserCheck, Users, Utensils } from "lucide-react";
import CareerForm from "@/components/CareerForm";
import { GENERAL, vacancies } from "@/lib/careers";

const gallery: string[] = ["/career/gallery-1.jpg", "/career/hero.png", "/career/gallery-2.jpg"];
const marquee = ["Web development", "Mobile apps", "UI/UX design", "SEO", "Digital marketing", "Hosting"];

const principles = [
  { i: Heart, t: "Customer first", d: "Every decision runs through a simple filter: is this genuinely good for the customer?" },
  { i: Shield, t: "Own it fully", d: "Autonomy and accountability go hand in hand. We trust you \u2014 and you own the outcome." },
  { i: Sparkles, t: "Never stop learning", d: "We hire learn-it-alls, not know-it-alls. Curiosity is a core competency here." },
  { i: Star, t: "Celebrate the effort", d: "Progress is worth recognising. We cheer small wins as loudly as the big ones." },
  { i: Eye, t: "Radical transparency", d: "Say what you mean. Surface problems early. Honest dialogue builds stronger teams." },
];
const perks = [
  { i: Laptop, t: "Flexible hybrid model", d: "Work from our office when collaboration calls for it, from home when deep focus does." },
  { i: Monitor, t: "Gear & setup support", d: "Monthly device allowance plus a straightforward process for any home-office essentials you need." },
  { i: Calendar, t: "Real weekends", d: "A five-day workweek, respected \u2014 because rest isn't a reward, it's part of doing your best work." },
  { i: Utensils, t: "Meals on us", d: "Fresh, healthy lunch and snacks served twice daily in-office \u2014 because good food fuels good thinking." },
];
const quotes = [
  { n: "Kritish Dhaubanjar", r: "Lead Engineer", s: "KD", q: "Joining Softsaro felt like stepping into a team that genuinely invests in you. From mentorship to meaningful projects, every day has taught me something I didn't know yesterday." },
  { n: "Aashu Shakya", r: "Senior Software Engineer", s: "AS", q: "What sets Softsaro apart is the culture \u2014 it's supportive without being soft, and ambitious without being toxic. I've grown more here in two years than anywhere before." },
  { n: "Siza Adhikari", r: "Software Engineer", s: "SA", q: "The ecosystem at Softsaro is unlike anything I expected. You're surrounded by people who challenge you, back you, and celebrate your progress \u2014 it genuinely feels like a second home." },
];
const steps = [
  { i: Send, t: "Submit your application", d: "Pick the role that sparks something. Fill in the form \u2014 it takes five minutes, and we promise a human reads it." },
  { i: FileText, t: "CV & profile review", d: "Our talent team looks at your resume, portfolio, and background to see how well they map to the role's needs." },
  { i: Phone, t: "Introductory call", d: "A relaxed 30-minute conversation \u2014 we'll share what we're building, hear about your journey, and figure out if there's a spark." },
  { i: Code, t: "Skills assessment", d: "A focused, real-world task tailored to the role. We keep it concise \u2014 enough to show how you think, not just what you know." },
  { i: Users, t: "In-depth interview", d: "Virtual or face-to-face with your potential team. We go deeper on your craft, your approach to problems, and how you collaborate." },
  { i: BadgeCheck, t: "Expectations alignment", d: "A candid discussion about what the role demands, what you're looking for, and where the two comfortably meet." },
  { i: UserCheck, t: "Reference check", d: "We speak with a couple of people who've worked alongside you. It helps us build a fuller, fairer picture." },
  { i: Calendar, t: "HR conversation", d: "We walk through compensation, benefits, growth pathways, and everything else that makes a role worth accepting." },
  { i: Check, t: "Offer", d: "If we're both excited, we'll send over a formal offer and talk through the details together \u2014 no pressure, no rushed decisions." },
  { i: Rocket, t: "Welcome to Softsaro", d: "Our onboarding team makes sure your first weeks are structured, supported, and genuinely enjoyable. You won't be dropped in the deep end." },
];

export default function CareerPage() {
  const roles = [...vacancies.map((v) => v.title), GENERAL];
  return <div className="cr-page" id="top">
    <div className="cr-progressbar" aria-hidden="true"><i /></div>

    <section className="cr-hero" aria-labelledby="career-title">
      <i className="cr-orb a" data-depth="30" /><i className="cr-orb b" data-depth="-24" /><i className="cr-dots" /><i className="cr-orbit" aria-hidden="true" />
      <div className="wrap cr-w cr-hero-in">
        <div className="cr-hero-copy">
          <p className="cr-eye"><i />Careers</p>
          <h1 id="career-title"><span className="cr-mask"><span className="cr-in" data-split>Build your career</span></span><span className="cr-mask"><span className="cr-in"><span data-split>with</span> <em>Softsaro.</em></span></span></h1>
          <p className="cr-lead">At Softsaro, we don't just fill roles we build careers. If you're someone who thrives on real challenges, loves learning out loud, and wants to shape products used by thousands, you'll fit right in.</p>
          <div className="cr-hero-btns"><a href="#open-roles" className="cr-btn p">See open roles <ArrowRight size={17} /></a><a href="#apply" className="cr-btn g">Apply now</a></div>
        </div>
        <div className="cr-hero-art">
          <i className="cr-halo" />
          <span className="cr-plate" data-depth="-14" />
          <div className="cr-photo" data-depth="10"><span className="cr-photo-in"><Image src="/career/hero.png" alt="Softsaro team collaborating in the office" fill priority sizes="(min-width:1024px) 44vw, 100vw" /></span><span className="cr-tag"><i />Life at Softsaro</span></div>
          <span className="cr-chip c1" data-depth="22"><b><span data-count="8">8</span>+</b> years of experience</span>
          <span className="cr-chip c2" data-depth="-20">Offices in Nepal &amp; USA</span>
          <span className="cr-badge b1" data-depth="34" aria-hidden="true"><Code size={20} /></span>
          <span className="cr-badge b2" data-depth="-28" aria-hidden="true"><Palette size={20} /></span>
          <span className="cr-badge b3" data-depth="40" aria-hidden="true"><Search size={20} /></span>
          <span className="cr-badge b4" data-depth="-36" aria-hidden="true"><Smartphone size={20} /></span>
        </div>
      </div>
    </section>

    <section className="cr-marquee" aria-hidden="true">
      {[0, 1].map((row) => <div className={`cr-mq r${row + 1}`} key={row}><div className="cr-mq-track">{[0, 1, 2, 3].map((rep) => marquee.map((w) => <span key={`${rep}-${w}`}>{w}<i /></span>))}</div></div>)}
    </section>

    <section className="cr-sec"><div className="wrap cr-w cr-split">
      <h2 className="cr-h cr-rv">Your next chapter starts here.</h2>
      <p className="cr-lead cr-scrub">We look for people who are ambitious without being arrogant, collaborative without losing their edge, and curious enough to never stop asking why. If that sounds like you, we want to talk.</p>
    </div></section>

    <section className="cr-sec lav"><i className="cr-blob" /><div className="wrap cr-w">
      <p className="cr-eye sl cr-rv">/ what we stand for</p>
      <h2 className="cr-h cr-rv">The principles we live by</h2>
      <p className="cr-lead cr-narrow-p cr-rv">These aren't slogans on a wall. They're the shared agreements that shape how we work, how we treat each other, and what we build.</p>
      <div className="cr-prs">{principles.map(({ i: Icon, t, d }, n) => <div className="cr-pr cr-spot" key={t}><span className="cr-pr-n">{String(n + 1).padStart(2, "0")}</span><Icon size={22} /><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>

    <section className="cr-sec"><div className="wrap cr-w cr-perks">
      <div><p className="cr-eye sl or cr-rv">/ perks &amp; benefits</p><h2 className="cr-h cr-rv">We take care of the people who take care of us</h2><p className="cr-lead cr-rv">Great work deserves great conditions. Here's a snapshot of what you can expect from day one.</p></div>
      <div className="cr-perk-grid">{perks.map(({ i: Icon, t, d }) => <div className="cr-perk cr-tilt cr-rv" key={t}><span className="cr-ic"><Icon size={19} /></span><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>

    <section className="cr-sec soft" id="open-roles"><i className="cr-blob l" /><div className="wrap cr-w">
      <div className="cr-split cr-head">
        <div><p className="cr-eye sl cr-rv">/ open positions</p><h2 className="cr-h cr-rv">Find your next role</h2></div>
        <p className="cr-lead cr-rv">Don't see an exact match? Apply anyway &mdash; we value potential and perspective just as much as a perfect job title fit.</p>
      </div>
      {vacancies.length > 0 ? <div className="cr-jobs">{vacancies.map((v) => <article className="cr-job cr-tilt cr-rv" key={v.id}>
        <div className="cr-job-top"><span className="cr-pill">{v.department}</span><span className="cr-pill alt">{v.type}</span></div>
        <h3>{v.title}</h3>
        <p className="cr-job-desc">{v.description}</p>
        <ul className="cr-job-meta"><li><MapPin size={15} />{v.location}</li><li><Briefcase size={15} />{v.experience}</li><li><Clock3 size={15} />{v.type}</li></ul>
        {v.requirements && v.requirements.length > 0 && <ul className="cr-job-req">{v.requirements.map((r) => <li key={r}><Check size={14} />{r}</li>)}</ul>}
        <a href="#apply" data-apply-role={v.title} className="cr-btn p cr-job-apply">Apply now <ArrowRight size={17} /></a>
      </article>)}</div> : <div className="cr-empty cr-rv">
        <span className="cr-empty-ic"><i className="rg" /><i className="rg r2" /><Check size={22} /></span>
        <h3>Nothing open at the moment</h3>
        <p>We're always on the lookout for exceptional engineers, designers, strategists, and operators. Send us your profile and we'll be in touch.</p>
        <a href="#apply" data-apply-role={GENERAL} className="cr-btn p">Introduce yourself <ArrowRight size={17} /></a>
      </div>}
    </div></section>

    <section className="cr-sec" id="apply"><div className="wrap cr-w cr-apply">
      <div className="cr-apply-copy">
        <p className="cr-eye sl cr-rv">/ apply</p>
        <h2 className="cr-h cr-rv">Start your application</h2>
        <p className="cr-lead cr-rv">Pick the role that sparks something. Fill in the form &mdash; it takes five minutes, and we promise a human reads it.</p>
        <ul className="cr-notes cr-rv"><li><Check size={16} />CV is required (PDF, DOC or DOCX, up to 5 MB)</li><li><Check size={16} />No matching role? Choose &ldquo;General application&rdquo;</li><li><Check size={16} />Portfolio or LinkedIn link is optional</li></ul>
      </div>
      <CareerForm roles={roles} />
    </div></section>

    <section className="cr-sec soft"><div className="wrap cr-w">
      <p className="cr-eye sl or cr-rv">/ softsarons speak</p>
      <h2 className="cr-h cr-rv cr-narrow-p">Straight from the people who live it</h2>
      <div className="cr-quotes">{quotes.map((q) => <figure className="cr-quote cr-tilt cr-rv" key={q.n}><Quote size={22} /><blockquote>{q.q}</blockquote><figcaption><span className="cr-av">{q.s}</span><span><b>{q.n}</b><small>{q.r}</small></span></figcaption></figure>)}</div>
    </div></section>

    <section className="cr-sec lav cr-process"><i className="cr-blob" /><div className="wrap cr-narrow">
      <p className="cr-eye sl cr-rv">/ the process</p>
      <h2 className="cr-h cr-rv">How we hire</h2>
      <p className="cr-lead cr-narrow-p cr-rv">We've designed our process to be respectful of your time and genuinely two-way. Every step is a chance for us to learn about each other &mdash; not just a gate to pass through.</p>
      <div className="cr-progress" aria-hidden="true"><span className="cr-pg-l">Step 1</span><i><b /></i><span>Step 10</span></div>
      <ol className="cr-steps"><span className="cr-rail" aria-hidden="true"><i /><b className="cr-dot" /></span>
        {steps.map(({ i: Icon, t, d }, n) => <li className="cr-step" key={t}><span className="cr-num">{String(n + 1).padStart(2, "0")}</span><div className="cr-step-card cr-spot"><div><h3>{t}</h3><p>{d}</p></div><Icon size={18} /></div></li>)}
      </ol>
    </div></section>

    <section className="cr-culture"><i className="cr-culture-orb" /><div className="wrap cr-w cr-culture-in">
      <div><p className="cr-eye sl w cr-rv">/ #lifeatsoftsaro</p><h2 className="cr-h cr-rv">See what it actually looks like inside</h2><p className="cr-rv">Beyond the work, there's a culture worth showing up for &mdash; stories, moments, and people that make the day-to-day worth it.</p></div>
      <Link href="/our-team" className="cr-btn w cr-rv">Explore our culture <ArrowRight size={17} /></Link>
    </div>
    <div className="cr-gallery"><div className="cr-gal-track">{gallery.map((src, i) => <figure className="cr-gal" key={`${src}-${i}`}><span className="cr-gal-in"><Image src={src} alt="Life at Softsaro" fill sizes="(min-width:1024px) 30vw, 70vw" /></span></figure>)}</div></div>
    </section>

    <section className="cr-sec"><div className="wrap cr-w">
      <h2 className="cr-h cr-rv">Ready to make your move?</h2>
      <div className="cr-ctas">
        <div className="cr-cta dark cr-spot cr-rv"><h3>Build with us</h3><p><b>You</b> need to ship faster. <b>You</b> have a vision that deserves more than a slide deck. You need a team that can turn ideas into things people actually use.</p><small>We bring the speed of a startup with the discipline of an enterprise.</small><a className="cr-link" href="https://softsaro.com.np/contact">Start a project <ArrowRight size={16} /></a></div>
        <div className="cr-cta light cr-spot cr-rv"><h3>Join us</h3><p><b>You</b> want work that stretches you. <b>You</b> want peers who push you forward, not past you. You want to build things that matter, with people who care.</p><small>We offer the environment &mdash; you bring the ambition.</small><a className="cr-link" href="#open-roles">See open roles <ArrowRight size={16} /></a></div>
      </div>
    </div></section>
  </div>;
}