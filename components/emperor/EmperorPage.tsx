import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bell, GraduationCap, ListChecks, MapPin, MessagesSquare, MonitorSmartphone, Plug, Smartphone } from "lucide-react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { SiHtml5, SiJavascript, SiLaravel, SiMysql, SiPhp, SiReact } from "react-icons/si";
import { emperor } from "@/lib/emperor-data";
import { ClipImage, Progress, Rise, Stagger, StaggerItem, Words } from "@/components/daley/DaleyFx";
import DaleyGallery from "@/components/daley/DaleyGallery";
import DaleyMotion from "@/components/daley/DaleyMotion";
import s from "@/components/daley/daley.module.css";

const features = [
  "Study destination and university listing pages",
  "IELTS, TOEFL and test preparation sections",
  "Visa and documentation guidance pages",
  "Student enquiry and counselling booking forms",
  "React Native mobile app for iOS and Android",
  "Push notifications and application status updates",
  "Document checklist and counsellor messaging in-app",
  "Fully responsive web across all devices",
];
const stack = [
  { Icon: SiLaravel, t: "Laravel" }, { Icon: SiPhp, t: "PHP" }, { Icon: SiReact, t: "React Native" }, { Icon: SiMysql, t: "MySQL" },
  { Icon: Plug, t: "REST API" }, { Icon: SiHtml5, t: "HTML / CSS" }, { Icon: SiJavascript, t: "JavaScript" }, { Icon: MonitorSmartphone, t: "Responsive UI" },
];
const appCards = [
  { Icon: Bell, t: "Push Notifications", d: "Real-time alerts on application status, deadlines and counsellor messages." },
  { Icon: ListChecks, t: "Document Checklist", d: "Step-by-step document tracker so students never miss a required file." },
  { Icon: MessagesSquare, t: "Counsellor Chat", d: "Direct in-app messaging with assigned counsellors \u2014 no emails needed." },
  { Icon: GraduationCap, t: "University Explorer", d: "Browse partner universities, entry requirements and scholarship options." },
];
const process = ["Discovery", "Planning", "UI/UX Design", "Web Development", "App Development", "Testing", "Launch"];
const shots = [
  { img: emperor.g1, caption: "Homepage" }, { img: emperor.g2, caption: "Destinations overview" }, { img: emperor.g3, caption: "University listings" },
  { img: emperor.g4, caption: "Test preparation page" }, { img: emperor.g5, caption: "Results dashboard" }, { img: emperor.g6, caption: "Documentation guide" },
  { img: emperor.g7, caption: "Course detail view" }, { img: emperor.g8, caption: "Online counselling booking" },
];
const related = [
  { slug: "daley-bhai-real-estate", img: emperor.rel1, name: "Daley Bhai Real Estate", tag: "Real Estate \u00b7 Web Platform", d: "A structured property listing platform for the Kathmandu Valley." },
  { slug: "sajha-courier", img: emperor.rel2, name: "Sajha Courier", tag: "Logistics \u00b7 Web + App", d: "Parcel tracking, booking and courier management \u2014 website and React Native app." },
  { slug: "adsaro-nepal", img: emperor.rel3, name: "Adsaro Nepal", tag: "Ad Agency \u00b7 Next.js + ClickHouse", d: "High-performance ad agency platform with real-time analytics infrastructure." },
];

function Lab({ n, t, light }: { n: string; t: string; light?: boolean }) {
  return <p data-lab className={`${s.lab}${light ? ` ${s.labLight}` : ""}`}><i /><em>{n} /</em><span>{t}</span></p>;
}

export default function EmperorPage() {
  return (
    <DaleyMotion>
      <style>{"@media(min-width:761px){[data-steps]{grid-template-columns:repeat(7,minmax(0,1fr))!important}[data-steps] .step,[data-steps] li{overflow-wrap:anywhere}}"}</style>
      <Progress />
      <main className={s.page}>
        {/* 1. HERO */}
        <section className={`${s.sec} ${s.hero}`} aria-labelledby="em-title">
          <i className={s.blob} data-drift="-40" /><i className={`${s.blob} ${s.blob2}`} data-drift="30" />
          <div className={s.wrap}>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/#work">Selected work</Link><span aria-hidden="true">/</span><span>Emperor Educational Consultancy</span></nav>
            <Rise delay={0.1}><span className={s.pill}><i />Case study &mdash; Education &amp; study abroad</span></Rise>
            <h1 id="em-title" className={s.h1} aria-label="Guiding students from Nepal to universities around the world">
              <Words className={s.hBlock} text="Guiding students from Nepal to universities" inView={false} delay={0.2} />
              <Words className={`${s.hBlock} ${s.hi}`} text="around the world" inView={false} delay={0.8} />
            </h1>
            <div className={s.heroTop}>
              <Rise delay={0.5}>
                <p className={s.lead}>Softsaro Nepal designed and built Emperor Educational Consultancy&rsquo;s digital presence &mdash; a full website covering study destinations, test preparation and visa guidance, paired with a React Native mobile app for on-the-go student support.</p>
                <div className={s.ctas}>
                  <a href="#overview" className={s.btnP} data-mag>Read the case study <ArrowUpRight size={18} /></a>
                </div>
              </Rise>
              <Rise delay={0.6}>
                <dl className={s.meta}>
                  <div><dt>Client</dt><dd>Emperor Educational Consultancy</dd></div>
                  <div><dt>Industry</dt><dd>Education &amp; Study Abroad</dd></div>
                  <div><dt>Service area</dt><dd>Nepal &mdash; Global</dd></div>
                  <div><dt>Project type</dt><dd>Website &amp; React Native mobile app</dd></div>
                </dl>
              </Rise>
            </div>
            <div className={s.stage}>
              <ClipImage img={emperor.hero} className={s.heroFig} priority sizes="(min-width:1280px) 1136px, 100vw" alt="Emperor Educational Consultancy: website and mobile app overview"
                caption={<><span>Fig. 01</span><i /><span>Website &amp; mobile app overview</span></>} />
              <div data-depth="22" className={`${s.chip} ${s.c1}`}><span className={s.chipIc}><GraduationCap size={18} /></span><span>Study abroad<small>Destinations &amp; universities</small></span></div>
              <div data-depth="-28" className={`${s.chip} ${s.c2}`}><span className={s.chipIc}><Smartphone size={18} /></span><span>Mobile app<small>iOS and Android</small></span></div>
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className={`${s.sec} ${s.white}`} id="overview">
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage from="left" img={emperor.overview} alt="Emperor Educational Consultancy project overview" caption={<><span>Exhibit A</span><i /><span>Overview</span></>} />
            <div>
              <Lab n="01" t="Overview" />
              <h2 className={s.h2} aria-label="Project Overview"><Words text="Project Overview" /></h2>
              <Rise delay={0.1}><p className={s.body}>Emperor needed a platform that could serve two audiences simultaneously: prospective students exploring study options, and current clients tracking their applications. <b className={s.accent}>Softsaro Nepal</b> built a unified web and mobile experience that handles both.</p></Rise>
            </div>
          </div>
        </section>

        {/* 3. CHALLENGE */}
        <section className={`${s.sec} ${s.cream}`}>
          <div className={`${s.wrap} ${s.split} ${s.rev}`}>
            <div>
              <Lab n="02" t="Challenge" />
              <h2 className={s.h2} aria-label="Client Challenge"><Words text="Client Challenge" /></h2>
              <Rise delay={0.1}><p className={s.body}>Education consultancies handle complex, multi-step journeys &mdash; from initial enquiry through test prep, university selection, document submission and visa processing. Presenting this clearly without overwhelming first-time visitors was the core challenge.</p></Rise>
            </div>
            <ClipImage from="right" img={emperor.challenge} alt="Emperor Educational Consultancy client challenge" caption={<><span>Exhibit B</span><i /><span>Challenge</span></>} />
          </div>
        </section>

        {/* 4. SOLUTION */}
        <section className={`${s.sec} ${s.white}`}>
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage from="bottom" img={emperor.solution} alt="Emperor Educational Consultancy solution" caption={<><span>Exhibit C</span><i /><span>Solution</span></>} />
            <div>
              <Lab n="03" t="Solution" />
              <h2 className={s.h2} aria-label="Our Solution"><Words text="Our Solution" /></h2>
              <Rise delay={0.1}>
                <p className={s.body}>Softsaro Nepal delivered end-to-end <Link href="/web-development" className={s.accent}>Web Development Services</Link> and a React Native mobile application &mdash; We delivered a structured Laravel website with destination and university pages, service breakdowns, enquiry forms and a blog &mdash; alongside a React Native mobile app giving students push notifications, document checklists and direct communication with their assigned counsellor.</p>
                <p className={s.body}>We also help education consultancies grow student enquiries through <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.accent}>SEO Services</a>.</p>
              </Rise>
            </div>
          </div>
        </section>

        {/* 5. MOBILE APP */}
        <section className={`${s.sec} ${s.white}`} id="mobile">
          <div className={s.wrap}>
            <Lab n="04" t="Mobile" />
            <h2 className={s.h2} aria-label="React Native Mobile App"><Words text="React Native Mobile App" /></h2>
            <Stagger className={s.appGrid}>
              {appCards.map(({ Icon, t, d }) => (
                <StaggerItem key={t} className={s.appCard} tilt><i className={s.spl} /><span className={s.appIc} data-pop><Icon size={22} /></span><h3>{t}</h3><p>{d}</p></StaggerItem>
              ))}
            </Stagger>
            <Rise delay={0.1}>
              <div className={s.badges}>
                <span className={s.badge}><FaApple size={18} />Available on iOS</span>
                <span className={s.badge}><FaAndroid size={18} />Available on Android</span>
              </div>
            </Rise>
          </div>
        </section>

        {/* 6. FEATURES */}
        <section className={`${s.sec} ${s.navy}`}>
          <div className={s.wrap}>
            <Lab n="05" t="Specification" light />
            <h2 className={s.h2} aria-label="Key Features"><Words text="Key Features" /></h2>
            <Stagger className={s.feats}>
              {features.map((f, i) => (
                <StaggerItem key={f} className={s.feat} tilt><i className={s.spl} /><span className={s.featN}>0{i + 1}</span><p>{f}</p></StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 7. STACK */}
        <section className={`${s.sec} ${s.cream}`}>
          <div className={s.wrap}>
            <Lab n="06" t="Built with" />
            <h2 className={s.h2} aria-label="Technology Stack"><Words text="Technology Stack" /></h2>
            <Stagger className={s.stack}>
              {stack.map(({ Icon, t }) => (<StaggerItem key={t} className={s.tech}><span className={s.techIc} data-pop><Icon size={22} /></span><b>{t}</b></StaggerItem>))}
            </Stagger>
          </div>
        </section>

        {/* 8. PROCESS */}
        <section className={`${s.sec} ${s.navy}`}>
          <div className={s.wrap}>
            <Lab n="07" t="Sequence" light />
            <h2 className={s.h2} aria-label="Development Process"><Words text="Development Process" /></h2>
            <ol className={s.steps} data-steps>
              <i className={s.line} data-line aria-hidden="true" />
              {process.map((p, i) => (
                <li key={p} className={s.step} data-node data-on="false"><b>0{i + 1}</b><span>{p}</span></li>
              ))}
            </ol>
          </div>
        </section>

        {/* 9. SCREENSHOTS */}
        <section className={`${s.sec} ${s.cream}`} id="gallery">
          <div className={s.wrap}>
            <Lab n="08" t="Plate" />
            <h2 className={s.h2} aria-label="Project Screenshots"><Words text="Project Screenshots" /></h2>
            <DaleyGallery items={shots} />
          </div>
        </section>

        {/* 10. RESULTS */}
        <section className={`${s.sec} ${s.white}`}>
          <div className={`${s.wrap} ${s.split}`}>
            <ClipImage from="left" img={emperor.results} alt="Emperor Educational Consultancy results and outcomes" caption={<><span>Exhibit D</span><i /><span>Results</span></>} />
            <div>
              <Lab n="09" t="Results" />
              <h2 className={s.h2} aria-label="Results & Outcomes"><Words text="Results & Outcomes" /></h2>
              <Rise delay={0.1}><p className={s.body}>Emperor Educational Consultancy now has a professional, conversion-focused online presence and a mobile app that keeps students engaged throughout their journey &mdash; reducing drop-off and improving counsellor efficiency.</p></Rise>
            </div>
          </div>
        </section>

        {/* 11. RELATED */}
        <section className={`${s.sec} ${s.cream}`}>
          <div className={s.wrap}>
            <Lab n="10" t="Next steps" />
            <h2 className={s.h2} aria-label="Related Services"><Words text="Related Services" /></h2>
            <Rise delay={0.1}>
              <div className={s.rel}>
                <Link href="/web-development" data-mag>Web Development Services <ArrowRight size={18} /></Link>
                <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" data-mag>SEO Services <ArrowRight size={18} /></a>
              </div>
            </Rise>
            <div className={s.relHead}>
              <h2 className={s.h2} aria-label="Related Projects"><Words text="Related Projects" /></h2>
              <Link href="/#work" className={s.all}>View all projects <ArrowRight size={16} /></Link>
            </div>
            <Stagger className={s.projects}>
              {related.map((r) => (
                <StaggerItem key={r.slug} className={s.projWrap} tilt>
                  <Link href={`/portfolio/${r.slug}`} className={s.proj} data-cur="view" data-label="View">
                    <i className={s.spl} />
                    <span className={s.projImg} data-wipe><Image src={r.img.src} alt={r.name} fill sizes="(min-width:1024px) 380px, 100vw" placeholder="blur" blurDataURL={r.img.blur} className={s.img} /></span>
                    <span className={s.projBody}><h3>{r.name}</h3><small>{r.tag}</small><p>{r.d}</p><em>View Case Study <ArrowRight size={14} /></em></span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 12. CTA */}
        <section className={`${s.sec} ${s.navy} ${s.cta}`}>
          <i className={s.blob} data-drift="-30" />
          <div className={s.wrap}>
            <Lab n="11" t="Start your project" light />
            <h2 className={`${s.h2} ${s.ctaH}`} aria-label="Building a platform for education or student services?"><Words text="Building a platform for education or student services?" /></h2>
            <Rise delay={0.1}><p className={`${s.body} ${s.narrow}`}>Talk to Softsaro Nepal about a website, student portal or mobile app for your consultancy or institution.</p></Rise>
            <Rise delay={0.2}><Link href="/#contact" className={s.btnP} data-mag>Start your project <ArrowRight size={18} /></Link></Rise>
          </div>
        </section>
      </main>
    </DaleyMotion>
  );
}