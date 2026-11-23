import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, ShieldCheck, SlidersHorizontal, TrendingUp, Zap } from "lucide-react";
import { SiClickhouse, SiJavascript, SiLinux, SiNextdotjs, SiNginx, SiNodedotjs, SiPostgresql, SiRedis } from "react-icons/si";
import { adsaro, type AdsaroImg } from "@/lib/adsaro-data";
import { Btn, Fade, Progress, Tilt, Words } from "./AdsaroUI";
import AdsaroMotion from "./AdsaroMotion";
import s from "./adsaro.module.css";

const strip = [
  { Icon: SiNextdotjs, t: "Next.js", d: "SSR & static rendering for SEO + performance" },
  { Icon: SiNodedotjs, t: "Node.js", d: "High-throughput API layer with async processing" },
  { Icon: SiClickhouse, t: "ClickHouse", d: "Columnar analytics \u2014 billions of rows, sub-second queries" },
  { Icon: SiLinux, t: "VPS / Linux", d: "Hardened server, Nginx proxy, zero-downtime deploys" },
];
const flow = [
  { Icon: SiNextdotjs, t: "Next.js", k: "Frontend" },
  { Icon: SiNodedotjs, t: "Node.js", k: "API layer" },
  { Icon: SiClickhouse, t: "ClickHouse", k: "Analytics" },
  { Icon: SiLinux, t: "VPS / Linux", k: "Infrastructure" },
];
const why = [
  { Icon: Zap, t: "Sub-second analytics", d: "ClickHouse\u2019s columnar format delivers analytical query results in milliseconds \u2014 critical for live campaign dashboards with high row counts." },
  { Icon: TrendingUp, t: "Cost-efficient at scale", d: "VPS infrastructure keeps costs predictable as data volume grows, unlike per-query managed cloud services that penalise heavy analytical workloads." },
  { Icon: SlidersHorizontal, t: "Full stack control", d: "Owning the server means custom Nginx configuration, fine-tuned caching, and zero-downtime blue-green deployments without third-party constraints." },
  { Icon: Globe, t: "SSR with Next.js", d: "Server-side rendering gives Adsaro\u2019s public pages excellent Core Web Vitals scores and full SEO indexability \u2014 without sacrificing React\u2019s dynamic client features." },
  { Icon: Cpu, t: "Async Node.js API", d: "The Node.js middleware handles concurrent requests efficiently, acting as a clean boundary between frontend, analytics DB and any third-party integrations." },
  { Icon: ShieldCheck, t: "Automated backups", d: "Scheduled snapshots and offsite database dumps ensure data integrity and recovery capability without manual intervention." },
];
const features = [
  "Server-side rendered Next.js frontend",
  "Node.js REST API layer with JWT authentication",
  "ClickHouse columnar analytics database",
  "Real-time campaign performance dashboards",
  "Client portal with campaign reporting",
  "Automated VPS deployment & zero-downtime releases",
  "Nginx reverse proxy with SSL termination",
  "SEO-optimised service and case study pages",
];
const stack = [
  { Icon: SiNextdotjs, t: "Next.js" }, { Icon: SiNodedotjs, t: "Node.js" }, { Icon: SiClickhouse, t: "ClickHouse" }, { Icon: SiJavascript, t: "JavaScript" },
  { Icon: SiPostgresql, t: "PostgreSQL" }, { Icon: SiRedis, t: "Redis" }, { Icon: SiNginx, t: "Nginx" }, { Icon: SiLinux, t: "VPS / Linux" },
];
const process = ["Architecture Design", "API Planning", "UI/UX", "Frontend Dev", "Backend Dev", "ClickHouse Setup", "VPS Deploy", "Launch"];
const dirs = ["l", "b", "r", "t", "l", "r"];
const shots: { img: AdsaroImg; cap: string }[] = [
  { img: adsaro.g1, cap: "Homepage" }, { img: adsaro.g2, cap: "Property overview" }, { img: adsaro.g3, cap: "Client challenge view" },
  { img: adsaro.g4, cap: "Solution page" }, { img: adsaro.g5, cap: "Results dashboard" }, { img: adsaro.g6, cap: "Listing page" },
];
const related = [
  { slug: "sajha-courier", img: adsaro.rel1, name: "Sajha Courier", tag: "Logistics \u00b7 Web + App", d: "Parcel tracking, booking and courier management \u2014 website and React Native app." },
  { slug: "emperor-educational-consultancy", img: adsaro.rel2, name: "Emperor Educational Consultancy", tag: "Education \u00b7 Web + React Native", d: "Study abroad platform with counsellor portal and student mobile app." },
  { slug: "adsaro-nepal", img: adsaro.rel3, name: "Adsaro Nepal", tag: "Ad Agency \u00b7 Next.js + ClickHouse", d: "High-performance ad agency platform with real-time analytics infrastructure." },
];

function Lab({ n, t, light }: { n: string; t: string; light?: boolean }) {
  return <p className={`${s.lab}${light ? ` ${s.labL}` : ""}`}><i data-sep /><em>{n} /</em><span>{t}</span></p>;
}

function Fig({ img, alt, clip, mode, cap, sizes, layer }: { img: AdsaroImg; alt: string; clip: string; mode: "in" | "par"; cap: [string, string]; sizes?: string; layer?: boolean }) {
  return (
    <figure className={`${s.fig} ${s.figPad}`}>
      {layer ? <i className={s.layer} data-layer data-fx aria-hidden="true" /> : null}
      <span className={s.frame} data-fx data-clip={clip} style={{ aspectRatio: `${img.w} / ${img.h}` }}>
        <span className={s.in} {...(mode === "in" ? { "data-in": "" } : { "data-par": "" })}>
          <Image src={img.src} alt={alt} fill sizes={sizes || "(min-width:1024px) 560px, 100vw"} placeholder="blur" blurDataURL={img.blur} className={s.img} />
        </span>
      </span>
      <figcaption className={s.cap}><span>{cap[0]}</span><span>{cap[1]}</span></figcaption>
    </figure>
  );
}

export default function AdsaroPage() {
  return (
    <AdsaroMotion>
      <Progress />
      <main className={s.page}>
        {/* 1. HERO */}
        <section className={`${s.sec} ${s.hero}`} aria-labelledby="ad-title">
          <span className={s.ghost} data-drift="-70" aria-hidden="true">ADSARO</span>
          <div className={s.wrap}>
            <nav className={s.crumb} aria-label="Breadcrumb"><Link href="/#work">Selected work</Link><span aria-hidden="true">/</span><span>Adsaro Nepal</span></nav>
            <div className={s.heroGrid}>
              <div className={s.heroTxt}>
                <Fade><span className={s.pill}><i />Case study &mdash; Advertising &amp; digital media</span></Fade>
                <h1 id="ad-title" className={s.h1} aria-label={"A performance-first platform built for Nepal\u2019s fastest-growing ad agency"}>
                  <Words now delay={0.15} text="A" />
                  <Words now delay={0.25} className={s.hl} text="performance-first" />
                  <Words now delay={0.4} text={"platform built for Nepal\u2019s fastest-growing ad agency"} />
                </h1>
                <Fade delay={0.5}>
                  <p className={s.lead}>Softsaro Nepal engineered Adsaro Nepal&rsquo;s digital platform end-to-end &mdash; a Next.js frontend backed by a Node.js API layer, ClickHouse for analytics at scale, and a hardened VPS infrastructure &mdash; purpose-built for speed, data volume and 24/7 uptime.</p>
                  <div className={s.ctas}><Btn href="#overview" variant="p">Read the case study</Btn></div>
                </Fade>
              </div>
              <div className={`${s.heroVis} ${s.fig}`}>
                <i className={s.heroBg} aria-hidden="true" />
                <div data-fx data-hero className={s.heroTilt}>
                  <span className={s.frame} style={{ aspectRatio: `${adsaro.hero.w} / ${adsaro.hero.h}` }}>
                    <span className={s.in} data-par>
                      <Image src={adsaro.hero.src} alt="Adsaro Nepal platform overview and dashboard" fill priority sizes="(min-width:1024px) 640px, 100vw" placeholder="blur" blurDataURL={adsaro.hero.blur} className={s.img} />
                    </span>
                  </span>
                </div>
                <div data-fx data-chip data-float className={`${s.chip} ${s.c1}`}><SiNextdotjs size={18} /><span>Next.js<small>SSR frontend</small></span></div>
                <div data-fx data-chip data-float className={`${s.chip} ${s.c2}`}><SiClickhouse size={18} /><span>ClickHouse<small>Columnar analytics</small></span></div>
                <p className={s.cap}><span>Fig. 01</span><span>Platform overview &amp; dashboard</span></p>
              </div>
            </div>
            <dl className={s.meta}>
              <div><dt>Client</dt><dd>Adsaro Nepal</dd></div>
              <div><dt>Industry</dt><dd>Advertising &amp; Digital Media</dd></div>
              <div><dt>Service area</dt><dd>Nepal &amp; Regional</dd></div>
              <div><dt>Project type</dt><dd>High-performance ad agency platform</dd></div>
            </dl>
          </div>
        </section>

        {/* 2. STACK STRIP */}
        <section className={s.strip} aria-label="Core stack">
          <div className={`${s.wrap} ${s.stripGrid}`}>
            {strip.map(({ Icon, t, d }, i) => (
              <Fade key={t} delay={i * 0.08} className={s.sTile}><Icon size={26} /><h3>{t}</h3><p>{d}</p></Fade>
            ))}
          </div>
        </section>

        {/* 3. OVERVIEW */}
        <section className={`${s.sec} ${s.white}`} id="overview">
          <span className={s.num} data-drift="-50" aria-hidden="true">01</span>
          <div className={`${s.wrap} ${s.split}`}>
            <Fig clip="expand" mode="in" img={adsaro.overview} alt="Adsaro Nepal project overview" cap={["Exhibit A", "Overview"]} />
            <div>
              <Lab n="01" t="Overview" />
              <h2 className={s.h2} aria-label="Project Overview"><Words text="Project Overview" /></h2>
              <Fade delay={0.1}><p className={s.body}>Adsaro Nepal needed more than a website &mdash; they needed a platform capable of handling real-time campaign data, high-throughput analytics queries and a polished client-facing interface that could scale with their business. <b className={s.acc}>Softsaro Nepal</b> designed and built every layer of the stack.</p></Fade>
            </div>
          </div>
        </section>

        {/* 4. CHALLENGE */}
        <section className={`${s.sec} ${s.tint}`}>
          <span className={s.num} data-drift="-50" aria-hidden="true">02</span>
          <div className={`${s.wrap} ${s.split}`}>
            <div>
              <Lab n="02" t="Challenge" />
              <h2 className={s.h2} aria-label="Client Challenge"><Words text="Client Challenge" /></h2>
              <Fade delay={0.1}><p className={s.body}>Ad agencies live and die by data speed. The challenge was building a system that could ingest and query millions of ad event rows in real time, surface insights to clients without latency, and do so inside a maintainable, cost-efficient VPS architecture rather than expensive managed cloud.</p></Fade>
            </div>
            <Fig clip="vert" mode="par" img={adsaro.challenge} alt="Adsaro Nepal client challenge" cap={["Exhibit B", "Challenge"]} />
          </div>
        </section>

        {/* 5. SOLUTION */}
        <section className={`${s.sec} ${s.solution}`}>
          <div className={`${s.wrap} ${s.split}`}>
            <Fig clip="diag" mode="in" layer img={adsaro.solution} alt="Adsaro Nepal solution" cap={["Exhibit C", "Solution"]} />
            <div>
              <Lab n="03" t="Solution" />
              <h2 className={s.h2} aria-label="Our Solution"><Words text="Our Solution" /></h2>
              <Fade delay={0.1}>
                <p className={s.body}>Softsaro Nepal delivered end-to-end <Link href="/web-development" className={s.acc}>Web Development Services</Link> &mdash; We chose Next.js for its server-side rendering performance and SEO control, Node.js for the API middleware, and ClickHouse as the analytics database &mdash; its columnar storage delivers sub-second queries on hundreds of millions of rows. The entire stack is deployed on a hardened VPS with Nginx, automated backups and zero-downtime deployment pipelines.</p>
                <p className={s.body}>We also help performance-focused businesses grow organic traffic with <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal" className={s.acc}>SEO Services</a>.</p>
              </Fade>
            </div>
          </div>
        </section>

        {/* 6. WHY CLICKHOUSE & VPS */}
        <section className={`${s.sec} ${s.navy}`}>
          <div className={s.wrap}>
            <Lab n="04" t="Infrastructure" light />
            <h2 className={s.h2} aria-label="Why ClickHouse & VPS?"><Words text="Why ClickHouse & VPS?" /></h2>
            <div className={s.flow} data-flow>
              {flow.map(({ Icon, t, k }) => (
                <div key={t} className={s.fnode} data-fx data-fnode><span className={s.fic} data-float><Icon size={28} /></span><b>{t}</b><small>{k}</small></div>
              ))}
            </div>
            <div className={s.whyGrid}>
              {why.map(({ Icon, t, d }, i) => (
                <Fade key={t} delay={(i % 3) * 0.08} className={s.whyCell}><Icon size={22} /><h3>{t}</h3><p>{d}</p></Fade>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FEATURES */}
        <section className={s.sec}>
          <div className={s.wrap}>
            <Lab n="05" t="Specification" />
            <h2 className={s.h2} aria-label="Key Features"><Words text="Key Features" /></h2>
            <ul className={s.feat}>
              {features.map((f, i) => (<li key={f}><Fade delay={(i % 2) * 0.08} className={s.featRow}><em>0{i + 1}</em><span>{f}</span></Fade></li>))}
            </ul>
          </div>
        </section>

        {/* 8. TECH STACK */}
        <section className={`${s.sec} ${s.tint}`}>
          <div className={s.wrap}>
            <Lab n="06" t="Built with" />
            <h2 className={s.h2} aria-label="Technology Stack"><Words text="Technology Stack" /></h2>
            <div className={s.techGrid}>
              {stack.map(({ Icon, t }, i) => (
                <Fade key={t} delay={(i % 4) * 0.07} className={s.techCell}><Icon size={34} /><b>{t}</b></Fade>
              ))}
            </div>
          </div>
        </section>

        {/* 9. PROCESS */}
        <section className={`${s.sec} ${s.white}`}>
          <div className={s.wrap}>
            <Lab n="07" t="Sequence" />
            <h2 className={s.h2} aria-label="Development Process"><Words text="Development Process" /></h2>
            <div className={s.stepsWrap} data-steps>
              <i className={s.line} data-line aria-hidden="true" />
              <ol className={s.steps}>
                {process.map((p, i) => (<li key={p} className={s.step} data-node data-on="false"><b>0{i + 1}</b><span>{p}</span></li>))}
              </ol>
            </div>
          </div>
        </section>

        {/* 10. GALLERY */}
        <section className={`${s.sec} ${s.navy}`} id="gallery">
          <div className={s.wrap}>
            <Lab n="08" t="Plate" light />
            <h2 className={s.h2} aria-label="Project Screenshots"><Words text="Project Screenshots" /></h2>
            <div className={s.mosaic}>
              {shots.map((it, i) => (
                <figure key={it.cap} className={`${s.shot} ${s["s" + (i + 1)]}`}>
                  <span className={`${s.frame} ${s.shotFrame} ${i % 3 === 1 ? s.a2 : s.a1}`} data-fx data-clip={dirs[i]}>
                    <span className={s.in} data-in>
                      <Image src={it.img.src} alt={it.cap} fill sizes="(min-width:1024px) 640px, (min-width:701px) 50vw, 100vw" placeholder="blur" blurDataURL={it.img.blur} className={s.img} />
                    </span>
                  </span>
                  <figcaption className={s.shotMeta}><em>0{i + 1}</em><b>{it.cap}</b></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 11. RESULTS */}
        <section className={`${s.sec} ${s.white}`}>
          <span className={s.num} data-drift="-50" aria-hidden="true">09</span>
          <div className={`${s.wrap} ${s.split} ${s.resSplit}`}>
            <div className={s.persp} data-fx data-persp>
              <figure className={`${s.fig} ${s.figPad}`}>
                <span className={s.frame} data-zoom style={{ aspectRatio: `${adsaro.results.w} / ${adsaro.results.h}` }}>
                  <span className={s.in} data-par>
                    <Image src={adsaro.results.src} alt="Adsaro Nepal results and outcomes" fill sizes="(min-width:1024px) 640px, 100vw" placeholder="blur" blurDataURL={adsaro.results.blur} className={s.img} />
                  </span>
                </span>
                <figcaption className={s.cap}><span>Exhibit D</span><span>Results</span></figcaption>
              </figure>
            </div>
            <div>
              <Lab n="09" t="Results" />
              <h2 className={s.h2} aria-label="Results & Outcomes"><Words text="Results & Outcomes" /></h2>
              <Fade delay={0.1}><p className={s.resTxt}>Adsaro Nepal now runs a platform that handles real-time campaign analytics, client dashboards and public-facing content from a single, cohesive codebase &mdash; with query response times measured in <span className={s.hl}>milliseconds, not seconds</span>, even under load.</p></Fade>
            </div>
          </div>
        </section>

        {/* 12. RELATED SERVICES */}
        <section className={s.sec}>
          <div className={s.wrap}>
            <Lab n="10" t="Next steps" />
            <h2 className={s.h2} aria-label="Related Services"><Words text="Related Services" /></h2>
            <Fade delay={0.1} className={s.svcRow}>
              <Link href="/web-development">Web Development Services <ArrowRight size={28} /></Link>
              <a href="https://softsaro.com.np/services/best-seo-agency-in-nepal">SEO Services <ArrowRight size={28} /></a>
            </Fade>
          </div>
        </section>

        {/* 13. RELATED PROJECTS */}
        <section className={`${s.sec} ${s.tint}`}>
          <div className={s.wrap}>
            <div className={s.relHead}>
              <h2 className={s.h2} aria-label="Related Projects"><Words text="Related Projects" /></h2>
              <Link href="/#work" className={s.all}>View all projects <ArrowRight size={16} /></Link>
            </div>
            <div className={s.projGrid}>
              {related.map((r) => (
                <div key={r.slug} className={s.projWrap} data-fx data-rel>
                  <Tilt className={s.tiltFill}>
                    <Link href={`/portfolio/${r.slug}`} className={s.proj} data-cur="view" data-label="View">
                      <span className={s.pFrame} data-relimg>
                        <span className={s.in} data-in><Image src={r.img.src} alt={r.name} fill sizes="(min-width:1024px) 380px, 100vw" placeholder="blur" blurDataURL={r.img.blur} className={s.img} /></span>
                        <span className={s.pOver}>View case study <ArrowRight size={16} /></span>
                      </span>
                      <span className={s.pBody}><h3>{r.name}</h3><small>{r.tag}</small><p>{r.d}</p></span>
                    </Link>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. CTA */}
        <section className={`${s.sec} ${s.cta}`}>
          <div className={s.wrap}>
            <Lab n="11" t="Start your project" light />
            <h2 className={`${s.h2} ${s.ctaH}`} aria-label="Need a high-performance digital platform?"><Words text="Need a high-performance digital platform?" /></h2>
            <Fade delay={0.1}><p className={`${s.body} ${s.ctaP}`}>Talk to Softsaro Nepal about a Next.js application, analytics infrastructure, or custom full-stack platform for your business.</p></Fade>
            <Fade delay={0.2}><Btn href="/#contact" variant="w">Start your project</Btn></Fade>
          </div>
        </section>
      </main>
    </AdsaroMotion>
  );
}