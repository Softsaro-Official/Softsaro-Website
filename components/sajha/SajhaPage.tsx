import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bell, Building2, Calculator, CalendarCheck, Headset, MapPin, MonitorSmartphone, Search, Truck } from "lucide-react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { SiHtml5, SiJavascript, SiLaravel, SiMysql, SiPhp, SiReact } from "react-icons/si";
import { D } from "@/lib/data";
import { sajha } from "@/lib/sajha-data";
import { ClipImage, Rise, Stagger, StaggerItem, StaggerLi, StaggerUl, Words } from "./Fx";
import SajhaGallery from "./SajhaGallery";
import SajhaMotion from "./SajhaMotion";
import SajhaNav from "./SajhaNav";
import s from "./sajha.module.css";

const features = [
  { Icon: Search, t: "Parcel tracking with live status updates" },
  { Icon: CalendarCheck, t: "Online booking and pickup request forms" },
  { Icon: MapPin, t: "Service zone and branch location pages" },
  { Icon: Calculator, t: "Shipping rate information and calculator" },
  { Icon: Building2, t: "Business account and bulk shipping enquiries" },
  { Icon: MonitorSmartphone, t: "Fully responsive across desktop and mobile" },
];
const stack = [
  { Icon: SiLaravel, t: "Laravel", d: "Backend framework" }, { Icon: SiPhp, t: "PHP", d: "Server language" },
  { Icon: SiMysql, t: "MySQL", d: "Database" }, { Icon: SiHtml5, t: "HTML / CSS", d: "Markup & styling" },
  { Icon: SiJavascript, t: "JavaScript", d: "Interactivity" }, { Icon: MonitorSmartphone, t: "Responsive UI", d: "Every screen size" },
  { Icon: SiReact, t: "React Native", d: "Mobile app" },
];
const appCards = [
  { Icon: Search, t: "Live Parcel Tracking", d: "Real-time status updates from pickup through delivery \u2014 no calls needed." },
  { Icon: Bell, t: "Delivery Alerts", d: "Push notifications at every stage: dispatched, in transit, out for delivery, delivered." },
  { Icon: CalendarCheck, t: "Book a Pickup", d: "Schedule a courier collection in seconds \u2014 address, parcel size, preferred time." },
  { Icon: Headset, t: "Support & Contact", d: "Raise a query or report an issue directly from the app without switching channels." },
];
const process = ["Discovery", "Planning", "UI/UX Design", "Development", "Testing", "Launch"];
const shots = [
  { img: sajha.g1, caption: "App \u2014 home screens" }, { img: sajha.g2, caption: "App \u2014 in context" },
  { img: sajha.g3, caption: "Website \u2014 homepage" }, { img: sajha.g4, caption: "Website \u2014 tracking" },
  { img: sajha.g5, caption: "Website \u2014 services" }, { img: sajha.g6, caption: "Website \u2014 contact" },
  { img: sajha.g7, caption: "App \u2014 in use" }, { img: sajha.g8, caption: "App \u2014 detail" },
];
const marquee = ["Logistics", "Parcel tracking", "Online booking", "Delivery management", "Web + app"];
const wins = ["Customer enquiries handled efficiently", "Fewer inbound support calls", "A credible, modern logistics brand across Nepal"];
const related = [
  { slug: "sajha-courier", name: "Sajha Courier", tag: "Logistics \u00b7 Web + App", d: "Parcel tracking, booking and courier management \u2014 website and React Native app." },
  { slug: "emperor-educational-consultancy", name: "Emperor Educational Consultancy", tag: "Education \u00b7 Web + React Native", d: "Study abroad platform with counsellor portal and student mobile app." },
  { slug: "adsaro-nepal", name: "Adsaro Nepal", tag: "Ad Agency \u00b7 Next.js + ClickHouse", d: "High-performance ad agency platform with real-time analytics infrastructure." },
];
const pj: string[][] = D.pj;

function Lab({ n, t, light }: { n: string; t: string; light?: boolean }) {
  return <p className={`${s.lab2}${light ? ` ${s.light}` : ""}`}><i /><em>{n} /</em><span>{t}</span></p>;
}

export default function SajhaPage() {
  return (
    <SajhaMotion>
      <SajhaNav />
      <main className={s.page}>
        {/* HERO */}
        <section className={s.hero} aria-labelledby="sj-title">
          <i className={s.blob} data-drift="-35" /><i className={`${s.blob} ${s.blob2}`} data-drift="30" />
          <div className={s.wrap}>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/#work">Selected work</Link><span aria-hidden="true">/</span><span>Sajha Courier</span></nav>
            <Rise delay={0.1}><span className={s.pill}><i />Case study &mdash; Logistics &amp; Courier</span></Rise>
            <h1 id="sj-title" className={s.h1} aria-label={"Fast, trackable, and trusted \u2014 logistics made simple."}>
              <Words as="span" className={s.hBlock} text={"Fast, trackable, and trusted \u2014 logistics made"} inView={false} delay={0.2} />
              <Words as="span" className={`${s.hBlock} ${s.hi}`} text="simple." inView={false} delay={0.8} />
            </h1>
            <div className={s.heroTop}>
              <Rise delay={0.5}>
                <p className={s.lead}>Softsaro Nepal designed and built the Sajha Courier website &mdash; giving customers, senders and business clients a single platform to book shipments, track parcels and manage courier requests with confidence.</p>
                <div className={s.ctas}>
                  <a href="#overview" className={s.btnP} data-mag>Read the case study <ArrowRight size={18} /></a>
                  <a href="#mobile" className={s.btnG} data-mag>See the mobile app</a>
                </div>
              </Rise>
              <Rise delay={0.6}>
                <dl className={s.meta}>
                  <div><dt>Client</dt><dd>Sajha Courier Pvt. Ltd.</dd></div>
                  <div><dt>Industry</dt><dd>Logistics &amp; Courier</dd></div>
                  <div><dt>Service area</dt><dd>Nepal-wide</dd></div>
                  <div><dt>Project type</dt><dd>Courier &amp; parcel management platform</dd></div>
                </dl>
              </Rise>
            </div>
            <div className={s.stage}>
              <ClipImage img={sajha.hero} className={`${s.heroFig} ${s.r2}`} priority sizes="(min-width:1280px) 1136px, 100vw" alt="Sajha Courier website: homepage, parcel tracking, services and contact pages"
                caption={<><span>Fig. 01</span><i /><span>Homepage &amp; parcel tracking</span></>} />
              <div className={`${s.chip} ${s.c1}`}><span className={s.chipIc}><Truck size={18} /></span><span>Live parcel tracking<small>Status at every stage</small></span></div>
              <div className={`${s.chip} ${s.c2}`}><span className={s.chipIc}><Bell size={18} /></span><span>Delivery alerts<small>Dispatched to delivered</small></span></div>
              <div className={`${s.chip} ${s.c3}`}><span className={s.chipIc}><CalendarCheck size={18} /></span><span>Book a pickup<small>Address, size, time</small></span></div>
              <ClipImage img={sajha.g2} ratio="4 / 5" className={`${s.phoneCard} ${s.r2}`} sizes="300px" alt="Sajha Courier app on a phone" />
            </div>
          </div>
        </section>

        <div className={s.marquee} aria-hidden="true"><div className={s.mqTrack}>{[0, 1, 2, 3].map((r) => marquee.map((w) => <span key={`${r}-${w}`}>{w}<i /></span>))}</div></div>

        {/* 01 THE PROJECT */}
        <section className={`${s.sec} ${s.white}`} id="project">
          <div className={s.wrap}>
            <Lab n="01" t="The project" />
            <div className={s.introGrid}>
              <Words className={s.h2Big} text="Built around the way the work gets done." />
              <Rise delay={0.15}>
                <p className={s.p} style={{ marginTop: 0 }}>Online booking, parcel tracking and delivery management across web and mobile.</p>
                <dl className={s.facts}>
                  <div><dt>Industry</dt><dd>Logistics</dd></div>
                  <div><dt>Scope</dt><dd>Web + app</dd></div>
                  <div><dt>Project</dt><dd>Sajha Courier</dd></div>
                </dl>
              </Rise>
            </div>
          </div>
        </section>

        {/* 02 OVERVIEW */}
        <section className={`${s.sec} ${s.beige}`} id="overview">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.ov} data-k="A"><ClipImage img={sajha.overview} ratio="3 / 2" className={s.r2} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier website on a laptop" caption="Exhibit A &mdash; Overview" /></div>
            <div>
              <Lab n="02" t="Overview" />
              <Words className={s.h2} text="Project Overview" />
              <Rise delay={0.1}><p className={s.p}><Link href="/" className={s.hl}>Softsaro Nepal</Link> Sajha Courier required a professional online presence that reflected the speed and reliability of their service. Softsaro Nepal delivered a clean, functional platform covering booking flows, parcel tracking, branch locations and business account enquiries.</p></Rise>
            </div>
          </div>
        </section>

        {/* 03 CHALLENGE */}
        <section className={`${s.sec} ${s.lav}`} id="challenge">
          <div className={`${s.wrap} ${s.split} ${s.splitRev}`}>
            <div>
              <Lab n="03" t="The challenge" />
              <Words className={s.h2} text="Client Challenge" />
              <Rise delay={0.1}><p className={s.p}>Courier customers expect instant answers &mdash; where is my parcel, how do I book a pickup, what are the rates? The challenge was delivering those answers in a minimal number of clicks without sacrificing completeness of information.</p></Rise>
            </div>
            <div className={s.ov} data-k="B"><ClipImage img={sajha.challenge} ratio="3 / 2" className={s.r2} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier contact page on a laptop" caption="Exhibit B &mdash; Challenge" /></div>
          </div>
        </section>

        {/* 04 SOLUTION */}
        <section className={`${s.sec} ${s.white}`} id="solution">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.ov} data-k="C"><ClipImage img={sajha.solution} ratio="3 / 2" className={s.r2} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier mobile website on a phone" caption="Exhibit C &mdash; Solution" /></div>
            <div>
              <Lab n="04" t="Our solution" />
              <Words className={s.h2} text="Our Solution" />
              <Rise delay={0.1}>
                <p className={s.p}>Softsaro Nepal delivered end-to-end <Link href="/web-development" className={s.hl}>Web Development Services</Link>, We built a structured, mobile-first website with an integrated tracking interface, clear service zone maps, rate calculators, and a streamlined booking enquiry path &mdash; all designed around how courier customers actually think and search.</p>
                <p className={s.p}>We also support logistics businesses with <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.hl}>SEO Services</a> to grow their online reach.</p>
              </Rise>
            </div>
          </div>
        </section>

        {/* 05 FEATURES */}
        <section className={`${s.sec} ${s.beige}`} id="features">
          <div className={s.wrap}>
            <Lab n="05" t="Specification" />
            <Words className={s.h2} text="Key Features" />
            <StaggerUl className={s.fgrid} delay={0.15} gap={0.08}>
              {features.map(({ Icon, t }, i) => (
                <StaggerLi key={t} className={s.fcard}>
                  <div className={s.fin}><span className={s.fnum}>{String(i + 1).padStart(2, "0")}</span><span className={s.fic}><Icon size={20} /></span><p>{t}</p></div>
                </StaggerLi>
              ))}
            </StaggerUl>
          </div>
        </section>

        {/* 06 TECH */}
        <section className={`${s.sec} ${s.techDark}`} id="tech">
          <div className={s.wrap}>
            <Lab n="06" t="Built with" light />
            <Words className={s.h2} text="Technology Stack" />
            <StaggerUl className={s.tcloud} delay={0.15}>
              {stack.map(({ Icon, t, d }) => (
                <StaggerLi key={t} className={s.tchip}>
                  <div className={s.tin}><span className={s.tic}><Icon size={22} /></span><span className={s.ttx}><b>{t}</b><small>{d}</small></span></div>
                </StaggerLi>
              ))}
            </StaggerUl>
          </div>
        </section>

        {/* 07 MOBILE */}
        <section className={`${s.sec} ${s.lav} ${s.mobile}`} id="mobile">
          <i className={s.blob3} data-drift="-40" />
          <div className={`${s.wrap} ${s.mobileGrid}`}>
            <div>
              <Lab n="07" t="Mobile" />
              <Words className={s.h2} text="Mobile Application" />
              <Rise delay={0.1}><p className={s.p}>Alongside the website, Softsaro Nepal built a React Native mobile app for Sajha Courier &mdash; giving senders and recipients instant parcel visibility, booking capability and direct communication with courier staff, on both iOS and Android.</p></Rise>
              <Stagger className={s.mCards} delay={0.1}>
                {appCards.map(({ Icon, t, d }) => (
                  <StaggerItem key={t}><div className={s.mCard} data-tilt><span className={s.mIcon}><Icon size={18} /></span><h3>{t}</h3><p>{d}</p></div></StaggerItem>
                ))}
              </Stagger>
              <Rise delay={0.2}><div className={s.badges}><span className={s.badge}><FaApple size={16} />Available on iOS</span><span className={s.badge}><FaAndroid size={16} />Available on Android</span></div></Rise>
            </div>
            <ClipImage img={sajha.g1} className={`${s.phoneFig} ${s.r2}`} sizes="(min-width:900px) 38vw, 100vw" alt="Sajha Courier mobile app on two phones" />
          </div>
        </section>

        {/* 08 PROCESS */}
        <section className={`${s.sec} ${s.beige}`} id="process">
          <div className={s.wrap}>
            <Lab n="08" t="Sequence" />
            <Words className={s.h2} text="Development Process" />
            <div className={s.steps} data-steps>
              <span className={s.track} aria-hidden="true" /><span className={s.line} data-line aria-hidden="true" />
              <StaggerUl className={s.stepList} delay={0.1} gap={0.12}>
                {process.map((t, i) => <StaggerLi key={t} node className={s.node}><span className={s.num}>{String(i + 1).padStart(2, "0")}</span><span className={s.nlabel}>{t}</span></StaggerLi>)}
              </StaggerUl>
            </div>
          </div>
        </section>

        {/* 09 GALLERY */}
        <section className={`${s.sec} ${s.white}`} id="gallery">
          <div className={s.wrap}>
            <Lab n="09" t="Plate" />
            <Words className={s.h2} text="Project Screenshots" />
            <div className={s.galleryWrap}><SajhaGallery items={shots} /></div>
          </div>
        </section>

        {/* 10 RESULTS */}
        <section className={`${s.sec} ${s.lav}`} id="results">
          <div className={`${s.wrap} ${s.split}`}>
            <div className={s.ov} data-k="D"><ClipImage img={sajha.results} ratio="3 / 2" className={s.r2} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier homepage on a laptop beside earbuds" caption="Exhibit D &mdash; Results" /></div>
            <div>
              <Lab n="10" t="Outcomes" />
              <Words className={s.h2} text="Results & Outcomes" />
              <Rise delay={0.1}><p className={s.p}>Sajha Courier now has a digital platform that handles customer enquiries efficiently, reduces inbound support calls, and presents the brand as a credible, modern logistics provider across Nepal.</p></Rise>
              <StaggerUl className={s.rrows} delay={0.15}>
                {wins.map((w, i) => <StaggerLi key={w} className={s.rrow}><span>{String(i + 1).padStart(2, "0")}</span><b>{w}</b></StaggerLi>)}
              </StaggerUl>
            </div>
          </div>
        </section>

        {/* 11 RELATED SERVICES */}
        <section className={`${s.sec} ${s.white} ${s.tight}`} id="services">
          <div className={s.wrap}>
            <Lab n="11" t="Next steps" />
            <Words className={s.h2} text="Related Services" />
            <Stagger className={s.srows} delay={0.1}>
              <StaggerItem><Link href="/web-development" className={s.srow}><span>Web Development Services</span><i><ArrowUpRight size={22} /></i></Link></StaggerItem>
              <StaggerItem><a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.srow}><span>SEO Services</span><i><ArrowUpRight size={22} /></i></a></StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* 12 RELATED PROJECTS */}
        <section className={`${s.sec} ${s.beige}`} id="related">
          <div className={s.wrap}>
            <div className={s.relHead}>
              <div><Lab n="12" t="More work" /><Words className={s.h2} text="Related Projects" /></div>
              <Link href="/#work" className={s.read} data-mag>View all projects &rarr;</Link>
            </div>
            <Stagger className={s.relGrid} delay={0.1} gap={0.12}>
              {related.map((r) => {
                const hit = pj.find((p) => p[4] === r.slug);
                const src = hit?.[3] ?? (r.slug === "sajha-courier" ? sajha.g1.src : null);
                const href = hit ? `/portfolio/${r.slug}` : `https://softsaro.com.np/portfolio/${r.slug}`;
                return (
                  <StaggerItem key={r.slug}>
                    <Link href={href} className={s.relCard} data-tilt data-cur="open" data-label="Open">
                      <span className={s.relMedia}>{src ? <Image src={src} alt={`${r.name} project`} fill sizes="(min-width:900px) 30vw, 100vw" className={s.img} /> : <span className={s.noimg}>{r.name}</span>}</span>
                      <span className={s.relBody}><b>{r.name}</b><small>{r.tag}</small><span>{r.d}</span><em>View Case Study &rarr;</em></span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* CTA */}
        <section className={`${s.sec} ${s.white}`}>
          <div className={s.wrap}>
            <Rise>
              <div className={s.cta}>
                <i className={s.ctaGlow} data-drift="-30" /><i className={`${s.ctaGlow} ${s.ctaGlow2}`} />
                <p className={s.ctaEye}>Start your project</p>
                <Words className={s.ctaH} text="Need a logistics or courier platform?" />
                <p className={s.ctaP}>Talk to Softsaro Nepal about a website, tracking system or custom logistics platform for your courier business.</p>
                <div className={s.ctas}>
                  <Link href="/#contact" className={s.ctaBtn} data-mag>Start your project <ArrowRight size={18} /></Link>
                  <a href="tel:9818439664" className={s.ctaGhost} data-mag>Call 9818439664</a>
                </div>
              </div>
            </Rise>
          </div>
        </section>
      </main>
    </SajhaMotion>
  );
}