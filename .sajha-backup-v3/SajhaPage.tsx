import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, CalendarCheck, Headset, MonitorSmartphone, Search } from "lucide-react";
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
  "Parcel tracking with live status updates",
  "Online booking and pickup request forms",
  "Service zone and branch location pages",
  "Shipping rate information and calculator",
  "Business account and bulk shipping enquiries",
  "Fully responsive across desktop and mobile",
];
const stack = [
  { Icon: SiLaravel, t: "Laravel" }, { Icon: SiPhp, t: "PHP" }, { Icon: SiMysql, t: "MySQL" }, { Icon: SiHtml5, t: "HTML / CSS" },
  { Icon: SiJavascript, t: "JavaScript" }, { Icon: MonitorSmartphone, t: "Responsive UI" }, { Icon: SiReact, t: "React Native" },
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
const related = [
  { slug: "sajha-courier", name: "Sajha Courier", tag: "Logistics \u00b7 Web + App", d: "Parcel tracking, booking and courier management \u2014 website and React Native app." },
  { slug: "emperor-educational-consultancy", name: "Emperor Educational Consultancy", tag: "Education \u00b7 Web + React Native", d: "Study abroad platform with counsellor portal and student mobile app." },
  { slug: "adsaro-nepal", name: "Adsaro Nepal", tag: "Ad Agency \u00b7 Next.js + ClickHouse", d: "High-performance ad agency platform with real-time analytics infrastructure." },
];
const pj: string[][] = D.pj;

export default function SajhaPage() {
  return (
    <SajhaMotion>
      <SajhaNav />
      <main className={s.page}>
        {/* 2. HERO */}
        <section className={s.hero} aria-labelledby="sj-title">
          <i className={s.blob} data-drift="-35" /><i className={`${s.blob} ${s.blob2}`} data-drift="30" />
          <div className={s.wrap}>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/#work">Selected work</Link><span aria-hidden="true">/</span><span>Sajha Courier</span></nav>
            <div className={s.heroGrid}>
              <div>
                <Rise><span className={s.pill}><i />Case study &mdash; Logistics &amp; Courier</span></Rise>
                <Words as="h1" id="sj-title" className={s.h1} text={"Fast, trackable, and trusted \u2014 logistics made simple"} inView={false} delay={0.2} />
                <Rise delay={0.5}><p className={s.lead}>Softsaro Nepal designed and built the Sajha Courier website &mdash; giving customers, senders and business clients a single platform to book shipments, track parcels and manage courier requests with confidence.</p></Rise>
                <Rise delay={0.65}><a href="#overview" className={s.read} data-mag>Read the case study</a></Rise>
              </div>
              <Rise delay={0.4}>
                <dl className={s.meta}>
                  <div><dt>Client</dt><dd>Sajha Courier Pvt. Ltd.</dd></div>
                  <div><dt>Industry</dt><dd>Logistics &amp; Courier</dd></div>
                  <div><dt>Service area</dt><dd>Nepal-wide</dd></div>
                  <div><dt>Project type</dt><dd>Courier &amp; parcel management platform</dd></div>
                </dl>
              </Rise>
            </div>
            <ClipImage img={sajha.hero} className={s.heroFig} priority sizes="(min-width:1200px) 1100px, 100vw" alt="Sajha Courier website: homepage, parcel tracking, services and contact pages"
              caption={<><span>Fig. 01</span><i /><span>Homepage &amp; parcel tracking</span></>} />
          </div>
        </section>

        <div className={s.marquee} aria-hidden="true"><div className={s.mqTrack}>{[0, 1, 2, 3].map((r) => marquee.map((w) => <span key={`${r}-${w}`}>{w}<i /></span>))}</div></div>

        {/* 3. PROJECT INTRODUCTION */}
        <section className={`${s.sec} ${s.white}`} id="project">
          <div className={s.wrap}>
            <p className={s.eyebrow}>The project</p>
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

        {/* 4. OVERVIEW */}
        <section className={`${s.sec} ${s.white} ${s.tight}`} id="overview">
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage img={sajha.overview} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier website on a laptop" caption="Exhibit A &mdash; Overview" />
            <div>
              <Words className={s.h2} text="Project Overview" />
              <Rise delay={0.1}><p className={s.p}><Link href="/" className={s.hl}>Softsaro Nepal</Link> Sajha Courier required a professional online presence that reflected the speed and reliability of their service. Softsaro Nepal delivered a clean, functional platform covering booking flows, parcel tracking, branch locations and business account enquiries.</p></Rise>
            </div>
          </div>
        </section>

        {/* 5. CHALLENGE */}
        <section className={`${s.sec} ${s.beige}`} id="challenge">
          <div className={`${s.wrap} ${s.split} ${s.splitRev}`}>
            <div>
              <Words className={s.h2} text="Client Challenge" />
              <Rise delay={0.1}><p className={s.p}>Courier customers expect instant answers &mdash; where is my parcel, how do I book a pickup, what are the rates? The challenge was delivering those answers in a minimal number of clicks without sacrificing completeness of information.</p></Rise>
            </div>
            <ClipImage img={sajha.challenge} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier contact page on a laptop" caption="Exhibit B &mdash; Challenge" />
          </div>
        </section>

        {/* 6. SOLUTION */}
        <section className={`${s.sec} ${s.white}`} id="solution">
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage img={sajha.solution} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier mobile website on a phone" caption="Exhibit C &mdash; Solution" />
            <div>
              <Words className={s.h2} text="Our Solution" />
              <Rise delay={0.1}>
                <p className={s.p}>Softsaro Nepal delivered end-to-end <Link href="/web-development" className={s.hl}>Web Development Services</Link>, We built a structured, mobile-first website with an integrated tracking interface, clear service zone maps, rate calculators, and a streamlined booking enquiry path &mdash; all designed around how courier customers actually think and search.</p>
                <p className={s.p}>We also support logistics businesses with <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.hl}>SEO Services</a> to grow their online reach.</p>
              </Rise>
            </div>
          </div>
        </section>

        {/* 7. FEATURES */}
        <section className={`${s.sec} ${s.beige}`} id="features">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Specification</p>
            <Words className={s.h2} text="Key Features" />
            <StaggerUl className={s.feats} delay={0.15}>
              {features.map((f) => <StaggerLi key={f} className={s.feat}><i className={s.diamond} /><span>{f}</span></StaggerLi>)}
            </StaggerUl>
          </div>
        </section>

        {/* 8. TECH STACK */}
        <section className={`${s.sec} ${s.white}`} id="tech">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Built with</p>
            <Words className={s.h2} text="Technology Stack" />
            <StaggerUl className={s.techRow} delay={0.15}>
              {stack.map(({ Icon, t }) => <StaggerLi key={t} className={s.techItem}><span className={s.techIcon}><Icon size={22} /></span><b>{t}</b></StaggerLi>)}
            </StaggerUl>
          </div>
        </section>

        {/* 9. MOBILE APP */}
        <section className={`${s.sec} ${s.beige} ${s.mobile}`} id="mobile">
          <i className={s.blob3} data-drift="-40" />
          <div className={`${s.wrap} ${s.mobileGrid}`}>
            <div>
              <p className={s.eyebrow}>Mobile</p>
              <Words className={s.h2} text="Mobile Application" />
              <Rise delay={0.1}><p className={s.p}>Alongside the website, Softsaro Nepal built a React Native mobile app for Sajha Courier &mdash; giving senders and recipients instant parcel visibility, booking capability and direct communication with courier staff, on both iOS and Android.</p></Rise>
              <Stagger className={s.mCards} delay={0.1}>
                {appCards.map(({ Icon, t, d }) => (
                  <StaggerItem key={t}><div className={s.mCard} data-tilt><span className={s.mIcon}><Icon size={18} /></span><h3>{t}</h3><p>{d}</p></div></StaggerItem>
                ))}
              </Stagger>
              <Rise delay={0.2}><div className={s.badges}><span className={s.badge}><FaApple size={16} />Available on iOS</span><span className={s.badge}><FaAndroid size={16} />Available on Android</span></div></Rise>
            </div>
            <ClipImage img={sajha.g1} className={s.phoneFig} sizes="(min-width:900px) 38vw, 100vw" alt="Sajha Courier mobile app on two phones" />
          </div>
        </section>

        {/* 10. DEVELOPMENT PROCESS */}
        <section className={`${s.sec} ${s.sand}`} id="process">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Sequence</p>
            <Words className={s.h2} text="Development Process" />
            <div className={s.steps} data-steps>
              <span className={s.track} aria-hidden="true" /><span className={s.line} data-line aria-hidden="true" />
              <StaggerUl className={s.stepList} delay={0.1} gap={0.12}>
                {process.map((t, i) => <StaggerLi key={t} node className={s.node}><span className={s.num}>{String(i + 1).padStart(2, "0")}</span><span className={s.nlabel}>{t}</span></StaggerLi>)}
              </StaggerUl>
            </div>
          </div>
        </section>

        {/* 11. GALLERY */}
        <section className={`${s.sec} ${s.white}`} id="gallery">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Plate</p>
            <Words className={s.h2} text="Project Screenshots" />
            <div className={s.galleryWrap}><SajhaGallery items={shots} /></div>
          </div>
        </section>

        {/* 12. RESULTS */}
        <section className={`${s.sec} ${s.beige}`} id="results">
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage img={sajha.results} sizes="(min-width:900px) 45vw, 100vw" alt="Sajha Courier homepage on a laptop beside earbuds" caption="Exhibit D &mdash; Results" />
            <div>
              <Words className={s.h2} text="Results & Outcomes" />
              <Rise delay={0.1}><p className={s.p}>Sajha Courier now has a digital platform that handles customer enquiries efficiently, reduces inbound support calls, and presents the brand as a credible, modern logistics provider across Nepal.</p></Rise>
            </div>
          </div>
        </section>

        {/* 13. RELATED SERVICES */}
        <section className={`${s.sec} ${s.white} ${s.tight}`} id="services">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Next steps</p>
            <Words className={s.h2} text="Related Services" />
            <Stagger className={s.svcRow} delay={0.1}>
              <StaggerItem><Link href="/web-development" className={s.svc} data-mag>Web Development Services <ArrowRight size={18} /></Link></StaggerItem>
              <StaggerItem><a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.svc} data-mag>SEO Services <ArrowRight size={18} /></a></StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* 14. RELATED PROJECTS */}
        <section className={`${s.sec} ${s.beige}`} id="related">
          <div className={s.wrap}>
            <div className={s.relHead}>
              <Words className={s.h2} text="Related Projects" />
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

        {/* 15. PROJECT CTA */}
        <section className={`${s.sec} ${s.white}`}>
          <div className={s.wrap}>
            <Rise>
              <div className={s.cta}>
                <i className={s.ctaGlow} data-drift="-30" />
                <p className={s.ctaEye}>Start your project</p>
                <Words className={s.ctaH} text="Need a logistics or courier platform?" />
                <p className={s.ctaP}>Talk to Softsaro Nepal about a website, tracking system or custom logistics platform for your courier business.</p>
                <Link href="/#contact" className={s.ctaBtn} data-mag>Start your project <ArrowRight size={18} /></Link>
              </div>
            </Rise>
          </div>
        </section>
      </main>
    </SajhaMotion>
  );
}