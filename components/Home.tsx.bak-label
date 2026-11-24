import { ArrowRight, ArrowLeft } from "lucide-react";
import { D } from "@/lib/data";
import Services from "@/components/Services";
import { SiteFooter } from "@/components/Site";
import Navbar from "@/components/Navbar";
import TechReveal from "@/components/TechReveal";
import { SiLaravel, SiPhp, SiMysql, SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiWordpress, SiShopify, SiFlutter, SiClickhouse } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { Cloud as TcCloud, GitBranch as TcBranch, Code as TcCode } from "lucide-react";
import { Search, Compass, PenTool, Code, Rocket, Lightbulb, Map as MapIcon, Palette, Layers, Zap } from "lucide-react";
import ProcReveal from "@/components/ProcReveal";
import WhyReveal from "@/components/WhyReveal";
import PvGuard from "@/components/PvGuard";
import CardsMotion from "@/components/CardsMotion";

const S = "https://softsaro.com.np";
const Roll = ({ t }: { t: string }) => (
  <span className="roll"><span>{t}</span><span aria-hidden="true">{t}</span></span>
);
const Up = () => (<svg className="ar" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg>);
const Spark = ({ c }: { c: string }) => (
  <i className={`spark ${c}`}>
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
    </svg>
  </i>
);
const Logo = ({ inv }: { inv?: boolean }) => (
  <a href="#top" className={inv ? "logo inv" : "logo"} aria-label="Softsaro">
    <svg viewBox="0 0 34 30">
      <path d="M0 9h15v21H0z" fill={inv ? "#8b88c8" : "#6a67ae"} />
      <path d="M11 0h23v15H19V9h-8z" fill={inv ? "#8b88c8" : "#6a67ae"} />
      <path d="M15 15h4v15h-4z" fill={inv ? "#6a67ae" : "#3f3d7a"} />
    </svg>SOFTSARO
  </a>
);
const WI = [
  <g key="w1"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></g>,
  <g key="w2"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></g>,
  <g key="w3"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></g>,
  <g key="w4"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></g>,
  <g key="w5"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></g>,
  <g key="w6"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g>,
];

const SI = [
  <path key="a" d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  <g key="b"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16 9.5" /></g>,
  <path key="c" d="M12 1.5l9 5-9 5-9-5 9-5zM3 11.5l9 5 9-5M3 16l9 5 9-5" />,
  <g key="d"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></g>,
];

const WCX = [100, 300, 500, 700, 900, 1100];
const WCY = [250, 380, 250, 380, 250, 380];
const Ic = ({ c: C, ...p }: any) => <C {...p} />;
const PI = [Search, Compass, PenTool, Code, Rocket];
const PB = [Lightbulb, MapIcon, Palette, Layers, Zap];
const TLOGO: Record<string, [any, string]> = {
  laravel: [SiLaravel, "#FF2D20"], php: [SiPhp, "#777BB4"], mysql: [SiMysql, "#4479A1"],
  react: [SiReact, "#2BB5D8"], nextjs: [SiNextdotjs, "#0a0b14"], nodejs: [SiNodedotjs, "#5FA04E"], tailwind: [SiTailwindcss, "#06B6D4"],
  wordpress: [SiWordpress, "#21759B"], shopify: [SiShopify, "#7AB55C"],
  flutter: [SiFlutter, "#02569B"], reactnative: [TbBrandReactNative, "#2BB5D8"],
  cloud: [TcCloud, "#6a67ae"], clickhouse: [SiClickhouse, "#F5B800"], cicd: [TcBranch, "#3f3d7a"],
};
const PARTNER_LOGOS: [string, string][] = [
  ["partner_B6pukqhO.webp", "BuyFresh"],
  ["partner_GJQrsCkU.webp", "De Glamora"],
  ["partner_GrRVDNvL.webp", "Indreni Mushroom Farm"],
  ["partner_HwY3gihV.webp", "RSTCA Investment Fund"],
  ["partner_Ja0YKFt3.webp", "Daley Bhai"],
  ["partner_N9jAKJxG.webp", "Global Ranking Hub"],
  ["partner_OaCNmXpf.webp", "Saurya Krishi Company"],
  ["partner_OqVUTbe2.webp", "Artha Kagaj"],
  ["partner_SM3ZVTCe.webp", "Hamro Jobs"],
  ["partner_TwgYlIJV.webp", "HFI"],
  ["partner_VXmoxl3q.webp", "Chandra Surya"],
  ["partner_WOBPFqJD.webp", "CSR Link"],
  ["partner_cmr12uMY.webp", "Sajha Marketplace"],
  ["partner_eSY6RfXF.webp", "Hope2Help"],
  ["partner_f24K9kAC.webp", "Karmi"],
  ["partner_ft4keRwm.webp", "Photo Studio Service"],
  ["partner_kzcthB6M.webp", "Jilo Mobile"],
  ["partner_nMpaICzs.webp", "Emperor Education Network"],
  ["partner_oFvc2SEm.webp", "Neerkart"],
  ["partner_oSubdZcj.webp", "Sayumi Global"],
  ["partner_qdwaO1QD.webp", "Leideu"],
  ["partner_uAa3vcMy.webp", "Adsaro"],
  ["partner_uDKXJyr5.webp", "Partner logo"],
];
export default function Home() {

  return (
    <>
      <PvGuard />
      <CardsMotion />
      <div className="cur" aria-hidden="true"><i></i><span></span></div>
      <div className="cur-dot" aria-hidden="true"></div>
      <div className="pv" aria-hidden="true"><div className="pv-in"><i></i><span>View</span></div></div>
      <div className="bgfx" aria-hidden="true">
        <i className="blob b1"></i><i className="blob b2"></i>
        <svg className="arc" viewBox="0 0 600 600"><circle cx="300" cy="300" r="298" fill="none" stroke="#0a0b14" strokeOpacity=".08" /></svg>
      </div>

      
      <Navbar />
      <main>
        <section className="hero">
          <div className="shp sb" data-speed=".45"><i data-m="50"></i></div>
          <div className="shp sc" data-speed=".15"><i data-m="-24"></i></div>
          <div className="sind" aria-hidden="true"><i></i>Scroll</div>
          <div className="wrap">
            <div className="hero-copy">
              <p className="eyebrow"><i className="gdot"></i>Digital partner / Kathmandu, Nepal</p>
              <h1>
                <span className="ln"><em>We build digital</em></span>
                <span className="ln"><em>things that move</em></span>
                <span className="ln"><em>business <b>forward.</b></em></span>
              </h1>
              <p className="sub" data-h>Strategy, design and technology for brands ready to grow.</p>
              <div className="cta-row" data-h>
                <a href="#work" className="btn blue"><Roll t="Explore our work" /><Up /></a>
                <a href="#services" className="tlink"><Roll t="What we do" /><svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6" /></svg></a>
              </div>
            </div>
            <div className="hero-vis" aria-hidden="true">
              <div className="layer" data-d="12"><div className="fl f1">
                <svg className="ribbon" viewBox="0 0 700 600">
                  <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#8b88c8" /><stop offset=".5" stopColor="#6a67ae" /><stop offset="1" stopColor="#3f3d7a" />
                    </linearGradient>
                    <filter id="sh" x="-20%" y="-20%" width="140%" height="150%">
                      <feDropShadow dx="0" dy="34" stdDeviation="26" floodColor="#6a67ae" floodOpacity=".35" />
                    </filter>
                  </defs>
                  <g filter="url(#sh)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M90 390C130 535 420 565 600 440" stroke="url(#rg)" strokeWidth="74" />
                    <path d="M360 70C540 20 660 170 610 300 560 430 360 470 240 400 130 335 150 140 360 70" stroke="url(#rg)" strokeWidth="86" />
                    <path d="M360 52C520 14 636 160 590 286" stroke="#aaa7d8" strokeWidth="9" opacity=".55" />
                    <path d="M110 372C150 500 400 535 580 425" stroke="#aaa7d8" strokeWidth="7" opacity=".4" />
                  </g>
                </svg></div></div>
              <div className="layer" data-d="26"><div className="fl f2"><div className="glass">
                <div className="gbar"><i></i><i></i><i></i></div>
                <div className="gbody">
                  <div className="gt"><h4>Innovative<br />Digital Solutions</h4><p>Build. Grow. Scale.</p><span className="gbtn">Get Started →</span></div>
                  <svg className="mtn" viewBox="0 0 200 180">
                    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ece9f7" /><stop offset="1" stopColor="#bcb9e0" /></linearGradient></defs>
                    <rect width="200" height="180" fill="url(#sk)" />
                    <path d="M0 180L60 70l25 30 40-70 75 150z" fill="#5b5a86" />
                    <path d="M125 30l-25 40 14-6 11 12 12-10 10 14z" fill="#fff" />
                    <path d="M60 70L44 100l14-6 12 14 15-8z" fill="#fff" />
                    <path d="M0 180l90-60 110 60z" fill="#efedf8" opacity=".8" />
                  </svg>
                </div></div></div></div>
              <div className="layer tile t-code" data-d="40"><div className="fl f3"><svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" /></svg></div></div>
              <div className="layer tile t-chart" data-d="34"><div className="fl f4"><svg viewBox="0 0 24 24"><path d="M3 20h18M6 16v-3M11 16V9M16 16v-5M4 11l5-4 4 3 7-6" /></svg></div></div>
              <div className="layer tile t-star" data-d="44"><div className="fl f5"><svg viewBox="0 0 24 24" className="fillsvg"><path d="M12 2c.8 5.5 4 8.7 10 10-6 1.3-9.2 4.5-10 10-.8-5.5-4-8.7-10-10 6-1.3 9.2-4.5 10-10z" /></svg></div></div>
              <svg className="spark s1" viewBox="0 0 24 24"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" /></svg>
              <ul className="pills"><li><i></i>Design</li><li><i className="g"></i>Development</li><li><i></i>Growth</li></ul>
            </div>
          </div>
          <div className="clients wrap">
            <p>Good work,<br />built to last</p>
            <div id="clients" className="mq"><div className="tk tk-logos">{PARTNER_LOGOS.concat(PARTNER_LOGOS).map(([f, n], i) => {
              const dup = i >= PARTNER_LOGOS.length;
              return (
                <div key={i} className="lg" aria-hidden={dup ? true : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={"/images/partners/" + f} alt={dup ? "" : n} width={168} height={96} loading={!dup && i < 6 ? "eager" : "lazy"} decoding="async" draggable={false} />
                </div>
              );
            })}</div></div>
          </div>
        </section>

        <Services />

        <section className="work" id="work">
          <div className="wrap">
            <p className="lab w"><i></i>Our work</p>
            <h2 className="wh" data-r>Products we’ve designed, built and shipped.</h2>
            <div className="work-showcase" id="pgrid">
              <div className="showcase-bar"><span><i></i><i></i><i></i></span><b>Softsaro / Selected projects</b><a href={`${S}/portfolio`}>View all work <Up /></a></div>
              <div className="project-deck">
              {D.pj.slice(0, 4).map((p: string[], i: number) => (
                <a key={p[4]} className={`pc deck-card card card-${i + 1}${i === 0 ? " is-featured" : ""}`} data-cur="view" href={`/portfolio/${p[4]}`}>
                  <div className="pimg" data-n={`0${i + 1}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p[3]} alt={p[0]} loading={i === 0 ? "eager" : "lazy"} />
                    <span className="go"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg></span>
                  </div>
                  <div className="pm"><h3>{p[0]}</h3><small>{i === 2 ? "Education · Web" : i === 3 ? "Advertising · Web" : p[1]}</small></div>
                  <p>{p[2]}</p>
                </a>
              ))}
                <a className="pc deck-card card deck-more" data-cur="open" data-label="View all" href={`${S}/portfolio`}>
                  <div className="pimg"><span>+</span><b>Explore<br />our work</b></div>
                  <div className="pm"><h3>All projects</h3><small>Portfolio</small></div>
                </a>
              </div>
            </div>
            <p className="pnote">Challenge and outcome notes are being confirmed with each client before publication.</p>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <p className="lab"><i></i><span className="gn">02 /</span> About Softsaro</p>
            <div className="two">
              <h2 data-r>Built for businesses that take digital seriously.</h2>
              <p className="big">Softsaro is a team of developers, designers and marketers working from Trade Tower, Thapathali in Kathmandu, with a branch in the USA serving international clients. Design, development, SEO, marketing and hosting, under one roof.</p>
            </div>
            <div className="stats" id="stats">
              {D.stats.map((s: any[], i: number) => (
                <div key={i}><span className="sico"><svg viewBox="0 0 24 24" aria-hidden="true">{SI[i]}</svg></span><b><span className="count" data-to={s[0]}>0</span><i>{s[1]}</i></b><small>{s[2]}</small></div>
              ))}
            </div>
          </div>
        </section>

        <section className="why wsec" id="why">
          <WhyReveal />
          <div className="wrap">
            <p className="lab w"><i></i><span className="gn">03 /</span> Why Softsaro</p>
            <h2 className="wp-h">Engineers who ask what the project has to change before <mark>they ask about colours.</mark></h2>
            <div className="wp-board" id="wboard">
              <svg className="wp-svg" viewBox="0 0 1200 560" aria-hidden="true">
                <defs><linearGradient id="wptg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#8b88c8" /><stop offset="1" stopColor="#6a67ae" /></linearGradient></defs>
                <path className="wp-track" pathLength={1} d="M0 315H20V250A80 80 0 0 1 180 250V315H220V380A80 80 0 0 0 380 380V315H420V250A80 80 0 0 1 580 250V315H620V380A80 80 0 0 0 780 380V315H820V250A80 80 0 0 1 980 250V315H1020V380A80 80 0 0 0 1180 380V315H1200" />
                {WCX.map((cx, i) => (
                  <g className="wp-ln" key={i} style={{ "--n": i } as any}>
                    <line x1={cx} y1={i % 2 === 0 ? 308 : 148} x2={cx} y2={i % 2 === 0 ? 428 : 322} />
                    <circle cx={cx} cy={i % 2 === 0 ? 428 : 148} r="4" />
                  </g>
                ))}
                {[200, 400, 600, 800, 1000].map((x, i) => (
                  <circle className="wp-join" key={x} style={{ "--n": i + 1 } as any} cx={x} cy="315" r="5" />
                ))}
              </svg>
              {D.why.slice(0, 6).map((w: string[], i: number) => (
                <article className="wp-it" key={i} style={{ "--n": i, "--cx": WCX[i], "--cy": WCY[i] } as any}>
                  <span className="wp-node"><svg viewBox="0 0 24 24" aria-hidden="true">{WI[i % 6]}</svg></span>
                  <div className={"wp-txt " + (i % 2 === 0 ? "down" : "up")}><h3>{w[0]}</h3><p>{w[1]}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proc psec" id="process">
          <ProcReveal />
          <div className="wrap">
            <p className="lab"><i></i><span className="gn">04 /</span> How we work</p>
            <h2 data-r>Five stages. You sign off on each one.</h2>
            <div className="ps-steps" id="psteps">
              <div className="ps-rail"><i></i></div>
              {D.st.map((s: any[], i: number) => (
                <div className="ps-st" key={i} style={{ "--i": i } as any}>
                  <span className="ps-n"><Ic c={PI[i % 5]} size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div className={"ps-cd pc" + ((i % 5) + 1)}>
                    <span className="ps-ico"><Ic c={PB[i % 5]} size={26} strokeWidth={1.6} aria-hidden="true" /></span>
                    <span className="ps-ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
                    <h3>{s[0]}</h3>
                    <p>{s[1]}</p>
                    <div className="ps-tags">{s[2].map((x: string) => <span key={x}>{x}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tech tcsec" id="tech">
          <TechReveal />
          <div className="wrap">
            <p className="lab"><i></i><span className="gn">05 /</span> Technology</p>
            <h2 data-r>Technology chosen for the problem, not for the trend.</h2>
            <div className="tc-cols" id="tccols">
              {D.tech.map((t: any[], i: number) => (
                <div className={"tc-col tc" + ((i % 5) + 1)} key={t[0]} style={{ "--i": i } as any}>
                  <h3>{t[0]}</h3>
                  {t[1].map((x: string, j: number) => {
                    const k = x.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const [Ico, col] = (TLOGO as any)[k] || [TcCode, "#3f3d7a"];
                    return (
                      <div className="tc-it" key={x} style={{ "--i": i, "--j": j } as any}>
                        <span className="tc-tile"><Ico size={30} color={col} aria-hidden="true" /></span>
                        <span>{x}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testi" id="clients-say">
          <div className="wrap">
            <div className="thead">
              <div>
                <p className="lab"><i></i><span className="gn">06 /</span> Client reviews</p>
                <h2 data-r>What clients say about partnering with Softsaro.</h2>
              </div>
              <div className="tnav">
                <button id="tp" aria-label="Previous"><ArrowLeft /></button>
                <button id="tn" aria-label="Next"><ArrowRight /></button>
              </div>
            </div>
            <div className="tr" id="tr" data-cur="drag" data-label="Drag">
              {D.tq.map((t: string[], i: number) => (
                <div className="tq" key={i}><p>{t[2]}</p><div className="tw"><i>{t[0][0]}</i><div><b>{t[0]}</b><small>{t[1]}</small></div></div></div>
              ))}
            </div>
            <div className="tprog"><i></i></div>
          </div>
        </section>

        <section className="final" id="contact"><Spark c="s3" /><Spark c="s4" />
          <div className="shp fa" data-speed=".2"><i className="rg" data-m="40"></i></div>
          <div className="shp fb" data-speed=".35"><i className="rg" data-m="-30"></i></div>
          <div className="wrap">
            <p className="lab w"><i></i>Get in touch</p>
            <h2 className="mega" data-r>Have an idea<br />worth <b>building?</b></h2>
            <p className="fsub">Tell us what you’re working on. We’ll help you turn it into a practical digital solution.</p>
            <div className="cta-row">
              <a className="btn white" href={`${S}/contact`}><Roll t="Talk to our team" /><Up /></a>
              <a className="btn ghostw" href="tel:9818439664"><Roll t="Call 9818439664" /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
