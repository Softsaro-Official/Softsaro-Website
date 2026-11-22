import { AppWindow, ArrowUpRight, Database, Globe, LayoutTemplate, Plus, type LucideIcon } from "lucide-react";
import Photo from "./Photo";
import { Btn, Heading, Label, split } from "./wd-parts";
import { CodeCard, DashMock, ListMock, PhoneMock, SiteMock } from "./WdMockups";
import { audiences, builds, contactHref, email, expertise, faqs, phone, steps, tech, why } from "@/lib/wd-data";

const icons: Record<string, LucideIcon> = { Globe, LayoutTemplate, Database, AppWindow };

export function WdHero() {
  return (
    <section className="wd-hero" id="top" aria-labelledby="wd-title">
      <div className="wrap">
        <div className="wd-copy">
          <p className="eyebrow" data-in=""><i className="gdot"></i>Website Design &amp; Development / Softsaro Nepal</p>
          <h1 id="wd-title">{split(<>Websites built to turn visitors into <b>customers.</b></>)}</h1>
          <p className="sub" data-in="">
            Fast, secure, mobile-friendly websites from a team with 8+ years in IT. Design, development, SEO-ready structure, hosting and support under one roof.
          </p>
          <div className="cta-row" data-in="">
            <Btn href={contactHref}>Book a Free Consultation</Btn>
            <Btn href="#build" v="dark" arrow={false}>See what we build</Btn>
          </div>
          <div className="wd-facts" data-in="">
            <div><b>8+</b><small>Years in IT</small></div>
            <div><b>100+</b><small>Projects</small></div>
            <div><b>2</b><small>Offices: Nepal &amp; USA</small></div>
          </div>
        </div>
        <div className="wd-collage" aria-hidden="true">
          <i className="wd-blob" data-depth="30" />
          <div className="wd-l wd-main" data-depth="14" data-float="-10,0.8,6"><SiteMock /></div>
          <div className="wd-l wd-phone" data-depth="34" data-float="12,-1.5,5"><PhoneMock /></div>
          <div className="wd-l wd-code" data-depth="24" data-float="10,1.2,5.5"><CodeCard /></div>
          <div className="wd-l wd-chip wd-c1" data-depth="40" data-float="-8,2,4.4">Responsive</div>
          <div className="wd-l wd-chip wd-c2" data-depth="46" data-float="9,-2,4.8">SEO-ready</div>
        </div>
      </div>
    </section>
  );
}

export function WdBuild() {
  return (
    <section className="wd-build" id="build" aria-labelledby="build-title">
      <div className="wrap">
        <Label num="01">What we build</Label>
        <Heading id="build-title">Four ways we build for the <b>web.</b></Heading>
        <div className="wd-cards" data-stagger="">
          {builds.map(([icon, title, text, tags], i) => {
            const Icon = icons[icon];
            return (
              <article className="wd-card" key={title}>
                <div className="wd-card-top">
                  <span className="wd-ico"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /></span>
                  <small>0{i + 1}</small>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="wd-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            );
          })}
        </div>
        <p className="wd-forlab">Built for</p>
        <ul className="wd-for" data-stagger="">{audiences.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </section>
  );
}

export function WdExpertise() {
  return (
    <section className="wd-dark" id="expertise" aria-labelledby="exp-title">
      <div className="wrap wd-split">
        <div className="wd-sticky">
          <Label num="02" light>Our expertise</Label>
          <Heading id="exp-title">Everything a great website <b>needs.</b></Heading>
          <div className="wd-arch wd-px" data-reveal="arch">
            <Photo name="coding" fallback="/assets/seo/audit.jpg" alt="Developer writing website code on a laptop" />
          </div>
        </div>
        <ol className="wd-xrows" data-stagger="">
          {expertise.map(([t, d], i) => (
            <li key={t}>
              <small>0{i + 1}</small>
              <div><h3>{t}</h3><p>{d}</p></div>
              <ArrowUpRight size={26} strokeWidth={1.6} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WdShowcase() {
  return (
    <section className="wd-show" id="showcase" aria-labelledby="show-title">
      <div className="wrap">
        <Label num="03">Featured showcase</Label>
        <Heading id="show-title">Built to look sharp on <b>every screen.</b></Heading>
        <div className="wd-stage" aria-hidden="true">
          <div className="wd-s wd-s1" data-rot="-4" data-speed="0.06"><ListMock /></div>
          <div className="wd-s wd-s2" data-speed="0.12"><SiteMock photo="devices" fb="/assets/dm/devices.jpg" alt="Responsive website on laptop, tablet and phone" /></div>
          <div className="wd-s wd-s3" data-rot="4" data-speed="0.04"><DashMock /></div>
          <div className="wd-s wd-s4" data-speed="0.16"><PhoneMock /></div>
        </div>
        <ul className="wd-caps" data-stagger="">
          <li><b>Business websites</b><span>Clear, fast and ready to convert.</span></li>
          <li><b>Web applications</b><span>Dashboards, portals and booking systems.</span></li>
          <li><b>Platforms &amp; listings</b><span>Search, filters and admin panels.</span></li>
        </ul>
      </div>
      <div className="wd-band wd-px" data-band="">
        <Photo name="team" fallback="/assets/dm/team.jpg" alt="Softsaro team designing and building a website together" />
        <p>{split("Design and development, one team.")}</p>
      </div>
    </section>
  );
}

export function WdProcess() {
  return (
    <section className="wd-proc" id="process" aria-labelledby="proc-title">
      <div className="wrap">
        <Label num="04">Our process</Label>
        <Heading id="proc-title">From first call to <b>launch.</b></Heading>
        <div className="wd-steps">
          <div className="wd-line" aria-hidden="true"><i></i></div>
          {steps.map(([t, d], i) => (
            <div className="wd-step on" key={t}>
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WdWhy() {
  return (
    <section className="wd-why" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <Label num="05" light>Why Softsaro</Label>
        <Heading id="why-title">A web partner you can <b>rely on.</b></Heading>
        <div className="wd-why-grid" data-stagger="">
          <div className="wd-big"><b>8+</b><p>years of IT experience, serving clients in Nepal and abroad through our Kathmandu and USA offices.</p></div>
          {why.map(([t, d], i) => (<div className="wd-wc" key={t}><small>0{i + 1}</small><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </div>
    </section>
  );
}

export function WdTech() {
  return (
    <section className="wd-tech" id="technologies" aria-labelledby="tech-title">
      <div className="wrap">
        <Label num="06">Technologies</Label>
        <Heading id="tech-title">The right stack for each <b>project.</b></Heading>
        <ul className="wd-pills" data-stagger="">{tech.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="wd-note">A booking system, a content-heavy site and a simple landing page each need a different approach. We choose what fits.</p>
      </div>
    </section>
  );
}

export function WdFaq() {
  return (
    <section className="wd-faq" aria-labelledby="faq-title">
      <div className="wrap wd-split">
        <div>
          <Label num="07">FAQ</Label>
          <Heading id="faq-title">Questions we <b>hear often.</b></Heading>
        </div>
        <div className="wd-faqs" data-stagger="">
          {faqs.map(([q, a]) => (
            <details key={q} name="wd-faq">
              <summary><span>{q}</span><Plus size={22} strokeWidth={1.8} aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WdCta() {
  return (
    <section className="wd-cta" id="contact" aria-labelledby="cta-title">
      <div className="wrap wd-ctagrid">
        <div>
          <Label light>Start your website project</Label>
          <Heading id="cta-title" className="mega">Have a project in <b>mind?</b></Heading>
          <p className="wd-ctap">Let&rsquo;s talk about what it actually needs, not what&rsquo;s easiest for us to sell.</p>
          <div className="cta-row">
            <Btn href={contactHref} v="white">Start a project</Btn>
            <Btn href={`tel:${phone}`} v="ghostw" arrow={false}>{`Call ${phone}`}</Btn>
          </div>
          <p className="wd-meta"><a href={`mailto:${email}`}>{email}</a> &middot; Trade Tower, 5th Floor, Thapathali, Kathmandu</p>
        </div>
        <div className="wd-ctaph wd-px"><Photo name="design" fallback="/assets/dm/brainstorm.jpg" alt="Designer planning a website layout" /></div>
      </div>
    </section>
  );
}