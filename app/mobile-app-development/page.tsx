import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import MobileAppMotion from "@/components/mobile-app/MobileAppMotion";
import { Phone, Shop, Food, Bank, Fit, Learn, Stats, Travel, Social, Custom, UiKit, Api, Tests, Release } from "@/components/mobile-app/MobileAppScreens";
import "./app.css";

export const metadata: Metadata = {
  title: "Mobile App Development in Nepal | Android, iOS & Cross-Platform - Softsaro",
  description: "Softsaro builds Android, iOS and cross-platform mobile apps in Kathmandu: planning, UI/UX design, development, testing and post-launch support from one team.",
  alternates: { canonical: "/mobile-app-development" },
  openGraph: { title: "Mobile App Development - Softsaro", description: "Android, iOS and cross-platform apps built around what your users need.", url: "/mobile-app-development", type: "website" },
};

const CONTACT = "https://softsaro.com.np/contact";
const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>;

/* Photo slots. Layer order = priority: a file dropped into /public/assets/app/ is painted on top; if it is missing the
   next layer (verified Pexels photo or an existing project photo) shows, and finally a purple gradient. */
const PX = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
const IMG = {
  developer: ["/assets/app/app-developer.jpg", PX(574071)],
  proto: ["/assets/app/app-prototyping.jpg", PX(160107)],
  workspace: ["/assets/app/coding-workspace.jpg", PX(360591)],
  show2: [PX(256502)],
  why: [PX(5474295)],
  ex1: ["/assets/dm/brainstorm.jpg"],
  ex2: ["/assets/dm/team.jpg"],
  ex3: [PX(574077)],
  ex4: ["/assets/dm/devices.jpg"],
  ex5: ["/assets/seo/audit.jpg"],
} as const;
type Slot = keyof typeof IMG;
const Photo = ({ slot, label, className, pos = "center" }: { slot: Slot; label: string; className: string; pos?: string }) => (
  <div role="img" aria-label={label} className={`ap-photo ${className}`}
    style={{ backgroundImage: [...IMG[slot].map((u) => `url(${u})`), "linear-gradient(135deg,#bcb9e0,#6a67ae)"].join(","), backgroundPosition: pos }} />
);
const Toast = ({ cls, icon, t, s }: { cls: string; icon: string; t: string; s: string }) => (
  <div className={`ap-toast ${cls}`} aria-hidden="true"><i>{icon}</i><span><b>{t}</b><small>{s}</small></span></div>
);

const builds = [
  ["iOS apps", "Native iOS apps in Swift, with the performance and platform features Apple's ecosystem expects.", ["Swift", "Native"], <Phone ios key="a"><Bank /></Phone>],
  ["Android apps", "Native Android apps in Kotlin, tuned for the wide range of devices and screen sizes in use.", ["Kotlin", "Native"], <Phone key="b"><Food /></Phone>],
  ["Cross-platform", "Flutter or React Native apps that run on Android and iOS from a largely shared codebase.", ["Flutter", "React Native"], <><Phone ios><Shop /></Phone><Phone><Learn /></Phone></>],
] as const;

const expertise = [
  ["Custom apps", "Built around your business problem, not a template.", ["Planning", "Features"], <Custom key="1" />, "ex1", "Team planning an app around a business problem"],
  ["UI/UX design", "Simple, clean screens that stay consistent across devices.", ["Usability", "Brand"], <UiKit key="2" />, "ex2", "Design workspace with laptops and layout sketches"],
  ["Backend & API integration", "The APIs and cloud infrastructure that power the app.", ["APIs", "Cloud"], <Api key="3" />, "ex3", "Code on a laptop screen"],
  ["Testing", "Real devices, screen sizes and OS versions, before your users find the bugs.", ["QA", "Real devices"], <Tests key="4" />, "ex4", "Team reviewing an interface on screen"],
  ["Maintenance", "Post-launch support and monitoring to keep the app healthy.", ["Support", "Monitoring"], <Release key="5" />, "ex5", "Laptop showing analytics and monitoring charts"],
] as const;

const steps = [
  ["Planning", "Goals, users and a clear roadmap."],
  ["Design", "A user-centred interface and prototype."],
  ["Development", "Native or cross-platform build."],
  ["Testing", "Real devices, screens and OS versions."],
  ["Launch", "Release to the app stores."],
  ["Support", "Monitoring, support and handover."],
] as const;

const tech = [
  ["Flutter", "Cross-platform", 6, 20, "Fl", "#27b5f0"], ["React Native", "Cross-platform", 30, 8, "Rn", "#61dafb"], ["Swift", "Native iOS", 56, 22, "Sw", "#ff6b3d"], ["Kotlin", "Native Android", 80, 10, "Kt", "#a97bff"],
  ["Node.js", "Backend APIs", 12, 58, "No", "#6cc24a"], ["Firebase", "Real-time data", 36, 70, "Fb", "#ffb300"], ["AWS", "Cloud infrastructure", 62, 62, "Aw", "#ff9900"], ["PostgreSQL", "Structured data", 84, 52, "Pg", "#4f8bd6"],
  ["Laravel / PHP", "Backend & API", 22, 40, "La", "#ff4d3d"], ["MySQL", "Database", 70, 38, "My", "#2f9fd0"],
] as const;

const why = [
  ["8+ years of IT experience", "Serving clients across Nepal and internationally through our USA office."],
  ["One team, start to finish", "Planning, design, development, testing and support managed by one team."],
  ["Native and cross-platform expertise", "We recommend Android, native iOS or cross-platform based on your app's goals."],
  ["Built to be found", "Apps built with discoverability in mind, including app store optimisation."],
] as const;

const faqs = [
  ["What's included when I hire Softsaro for app development?", "Planning, UI/UX design, development, testing and post-launch support, handled by one team."],
  ["Should I build a native or cross-platform app?", "It depends on your goals. Native (Swift for iOS, Kotlin for Android) suits platform-specific features and performance. Flutter or React Native runs on both platforms from a largely shared codebase. We'll recommend what fits your project."],
  ["Do you build for both iOS and Android?", "Yes. We build native iOS and Android apps, and cross-platform apps that run on both."],
  ["Can you build a completely custom app?", "Yes. Every app is planned around your business problem and your users' needs."],
  ["Can you turn my website into an app?", "Share your website and what you want the app to do. We'll advise what makes sense for your goals."],
  ["Where is Softsaro located?", "Trade Tower, 5th Floor, Thapathali, Kathmandu, with a second branch in the USA."],
] as const;

export default function MobileAppPage() {
  return (
    <>
      <Navbar b="/" />
      <main className="ap">
        <div className="ap-load" aria-hidden="true"><div><div className="ap-ld-ph"><i /></div><b>softsaro</b></div></div>
        {/* 1. HERO */}
        <header className="ap-hero" data-os="android">
          <div className="ap-hero-bg" aria-hidden="true" /><i className="ap-blob a" aria-hidden="true" /><i className="ap-blob b" aria-hidden="true" />
          <div className="ap-wrap ap-hero-in">
            <div className="ap-hero-copy">
              <p className="ap-eyebrow"><i />Mobile app development &middot; Kathmandu, Nepal</p>
              <h1 className="ap-h1" aria-label="Apps worth a place on the home screen.">
                <span className="ap-ln"><span className="ap-lt">Apps worth a</span></span>
                <span className="ap-ln"><span className="ap-lt">place on the</span></span>
                <span className="ap-ln"><span className="ap-lt"><em>home screen.</em></span></span>
              </h1>
              <p className="ap-lead">Android, iOS and cross-platform apps that are fast, simple and built around what your users actually need, from planning to post-launch support.</p>
              <div className="ap-os" role="group" aria-label="Preview platform"><span>Preview</span><button type="button" data-os="android" className="on">Android</button><button type="button" data-os="ios">iOS</button></div>
              <div className="ap-cta">
                <a className="ap-btn" href={CONTACT}>Discuss your app idea <Arrow /></a>
                <a className="ap-btn g" href="#ap-process">How we build</a>
              </div>
            </div>
            <div className="ap-stage">
              <div className="ap-layer" data-d="6"><div className="ap-p fl"><Phone><Stats /></Phone></div><div className="ap-p fr"><Phone><Learn /></Phone></div></div>
              <div className="ap-layer" data-d="10"><div className="ap-p l"><Phone><Food /></Phone></div></div>
              <div className="ap-layer" data-d="12"><div className="ap-p r"><Phone><Travel /></Phone></div></div>
              <div className="ap-layer" data-d="22"><div className="ap-p main"><Phone><div className="ap-slides"><Shop /><Bank /><Fit /></div></Phone><div className="ap-dots"><i /><i /><i /></div></div></div>
              <div className="ap-layer" data-d="40">
                <Toast cls="t1" icon="&#10003;" t="Order confirmed" s="Thanks for shopping" /><Toast cls="t2" icon="&#9679;" t="Delivery nearby" s="Arriving soon" /><Toast cls="t3" icon="&#9733;" t="New lesson" s="Continue learning" />
                <div className="ap-mini chart" aria-hidden="true"><small>Revenue</small><b>+24%</b><svg viewBox="0 0 80 28"><path d="M0 22L14 16L26 19L40 9L54 13L80 3" fill="none" stroke="#6a67ae" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div className="ap-mini heart" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.3-9A5.5 5.5 0 0112 6.5 5.5 5.5 0 0121.3 12C19 16.4 12 21 12 21z" /></svg><b>128</b></div>
              </div>
              <span className="ap-tag">Illustrative concept screens</span>
            </div>
          </div>
        </header>

        {/* 2. WHAT WE BUILD */}
        <div role="region" className="ap-sec ap-build" aria-labelledby="ap-t1">
          <div className="ap-wrap">
            <p className="ap-lab"><i /><b>01 /</b> What we build</p>
            <h2 className="ap-h2" id="ap-t1">Three ways onto the home screen.</h2>
            <div className="ap-acc">
              {builds.map(([t, d, tags, screen], i) => (
                <article className={`ap-ac${i === 0 ? " on" : ""} a${i}`} key={t} tabIndex={0} data-cursor="link">
                  <div className="ap-ac-h"><span>0{i + 1}</span><h3>{t}</h3></div>
                  <div className="ap-ac-x"><p>{d}</p><ul>{tags.map((g) => <li key={g}>{g}</li>)}</ul></div>
                  <div className={`ap-ac-ph${i === 2 ? " duo" : ""}`}>{screen}</div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 3. EXPERTISE - pinned phone */}
        <div role="region" className="ap-sec ap-ex" aria-labelledby="ap-t2">
          <div className="ap-wrap ap-ex-in">
            <div className="ap-ex-l">
              <div className="ap-ex-phone"><Phone><div className="ap-ex-screens">{expertise.map(([, , , s]) => s)}</div></Phone></div>
              <Photo slot="developer" label="A mobile app developer at work" className="ap-ex-photo" />
              <div className="ap-ex-prog" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </div>
            <div className="ap-ex-r">
              <p className="ap-lab"><i /><b>02 /</b> App development expertise</p>
              <h2 className="ap-h2" id="ap-t2">Everything an app needs, in one team.</h2>
              {expertise.map(([t, d, tags, , slot, alt], i) => (
                <div className="ap-eb" key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p><ul>{tags.map((g) => <li key={g}>{g}</li>)}</ul><Photo slot={slot} label={alt} className="ap-eb-img" /></div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. SHOWCASE - 3D ring */}
        <div role="region" className="ap-show" aria-labelledby="ap-t3">
          <div className="ap-show-pin">
            <div className="ap-show-head ap-wrap">
              <p className="ap-lab w"><i /><b>03 /</b> Visual showcase</p>
              <h2 className="ap-h2 s" id="ap-t3">Interfaces designed for the thumb.</h2>
              <p className="ap-note">Illustrative concept screens, not client work.</p>
            </div>
            <div className="ap-ringw">
              <div className="ap-ring">
                {([[<Shop key="1" />, "E-commerce"], [<Food key="2" />, "Food delivery"], [<Bank key="3" />, "Fintech"], [<Fit key="4" />, "Fitness"], [<Travel key="5" />, "Travel"], [<Social key="6" />, "Social"]] as [React.ReactNode, string][]).map(([sc, lb], i) => (
                  <div className="ap-rp" key={i} data-l={lb} style={{ "--i": i } as CSSProperties}><Phone ios={i % 2 === 0}>{sc}</Phone></div>
                ))}
              </div>
            </div>
            <Photo slot="proto" label="Laptop showing app code beside a phone" className="ap-show-photo a" />
            <Photo slot="show2" label="Close-up of colourful interface code" className="ap-show-photo b" />
          </div>
        </div>

        {/* 5. PROCESS - path timeline */}
        <div role="region" className="ap-sec ap-proc" id="ap-process" aria-labelledby="ap-t4">
          <div className="ap-wrap">
            <p className="ap-lab"><i /><b>04 /</b> Development process</p>
            <h2 className="ap-h2" id="ap-t4">Six stages. No surprises.</h2>
            <div className="ap-pbox">
              <svg className="ap-pv" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
                <path className="bg" d="M30 430 C 190 430, 230 110, 410 110 S 600 450, 780 300 S 1010 70, 1170 110" vectorEffect="non-scaling-stroke" />
                <path d="M30 430 C 190 430, 230 110, 410 110 S 600 450, 780 300 S 1010 70, 1170 110" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="ap-trav" aria-hidden="true"><i /></div>
              {steps.map(([t, d], i) => (
                <div className={`ap-pstep ${i % 2 ? "down" : "up"}`} key={t}><b>{i + 1}</b><div className="c"><h3>{t}</h3><p>{d}</p></div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. TECH */}
        <div role="region" className="ap-sec ap-tech" aria-labelledby="ap-t5">
          <Photo slot="workspace" label="A developer's coding workspace" className="ap-tech-bg" />
          <div className="ap-wrap">
            <p className="ap-lab w"><i /><b>05 /</b> Technology stack</p>
            <h2 className="ap-h2 s" id="ap-t5">The right tools for each app.</h2>
            <div className="ap-field">
              {tech.map(([n, s, x, y, m, c]) => (
                <div className="ap-chip" key={n} style={{ "--x": x + "%", "--y": y + "%", "--c": c } as CSSProperties}><div className="ap-ci"><i>{m}</i><span><b>{n}</b><small>{s}</small></span></div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. WHY */}
        <div role="region" className="ap-sec ap-why" aria-labelledby="ap-t6">
          <div className="ap-wrap ap-why-in">
            <div className="ap-why-l">
              <p className="ap-lab"><i /><b>06 /</b> <span id="ap-t6">Why Softsaro</span></p>
              <div className="ap-big"><span className="ap-count" data-to="8">8</span>+</div>
              <p className="ap-bigs">Years as an IT company in Nepal</p>
              <Photo slot="why" label="Hands typing code on a laptop" className="ap-why-img" />
            </div>
            <div className="ap-why-r">
              {why.slice(1).map(([t, d], i) => (
                <div className="ap-wy" key={t}><i className="ap-wl" /><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
              ))}
              <p className="ap-why-n">{why[0][1]}</p>
            </div>
          </div>
        </div>

        {/* 8. FAQ */}
        <div role="region" className="ap-sec ap-faq" aria-labelledby="ap-t7">
          <div className="ap-wrap ap-faq-in">
            <div className="ap-faq-h"><p className="ap-lab"><i /><b>07 /</b> FAQ</p><h2 className="ap-h2" id="ap-t7">Good questions, straight answers.</h2></div>
            <div className="ap-faq-l">
              {faqs.map(([q, a]) => (
                <div className="ap-q" key={q}><button type="button" aria-expanded="false"><span>{q}</span><i /></button><div className="ap-a"><p>{a}</p></div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 9. CTA */}
        <div role="region" className="ap-cta-sec" aria-labelledby="ap-t8">
          <div className="ap-cta-ph" aria-hidden="true"><Phone ios><Fit /></Phone><Phone><Shop /></Phone></div>
          <Toast cls="ct1" icon="&#10003;" t="Order confirmed" s="Thanks for shopping" /><Toast cls="ct2" icon="&#9733;" t="New lesson" s="Continue learning" />
          <div className="ap-wrap ap-cta-in">
            <p className="ap-lab w"><i />Get in touch</p>
            <h2 className="ap-h2 ap-mega" id="ap-t8">Have an app idea worth building?</h2>
            <p className="ap-sub">Tell us what your users need and talk directly with the team that will build it.</p>
            <div className="ap-cta2">
              <a className="ap-btn w" href={CONTACT}>Discuss your app idea <Arrow /></a>
              <a className="ap-btn gw" href="tel:9818439664">Call 9818439664</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileAppMotion />
    </>
  );
}