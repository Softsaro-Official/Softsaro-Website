import DdLink from "@/components/DdLink";
import Footer from "@/components/Footer";
const S = "https://softsaro.com.np";
const Roll = ({ t }: { t: string }) => (
  <span className="roll"><span>{t}</span><span aria-hidden="true">{t}</span></span>
);
const Up = () => (<svg className="ar" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9" /></svg>);
const Chev = () => (<svg viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" /></svg>);
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
const svcLinks: [string, string][] = [
  ["Web Development", "web-development-in-nepal"],
  ["App Development", "app-development-company-in-nepal"],
  ["UI/UX Design", "ui-ux-design-in-nepal"],
  ["Advanced SEO", "best-seo-agency-in-nepal"],
  ["Digital Marketing", "digital-marketing-in-nepal"],
  ["Domain & Hosting", "domain-and-hosting-in-nepal"],
];
const localPages: Record<string, string> = {
  "best-seo-agency-in-nepal": "/seo-training",
  "digital-marketing-in-nepal": "/digital-marketing-training",
  "domain-and-hosting-in-nepal": "/services/domain-and-hosting-in-nepal",
  "app-development-company-in-nepal": "/mobile-app-development",
};
export { S, Roll, Up };

export function SiteNav({ b = "" }: { b?: string }) {
  return (
      <header className="nav" id="nav">
        <Logo />
        <nav className="menu">
          <div className="dd">
            <a href={`${b}#services`}><Roll t="Services" /><Chev /></a>
            <div className="ddm">{svcLinks.map(([n, s]) => localPages[s] ? <DdLink key={s} href={localPages[s]}>{n}</DdLink> : <a key={s} href={`${S}/services/${s}`}>{n}</a>)}</div>
          </div>
          <a href={`${b}#work`}><Roll t="Work" /></a>
          <a href={`${b}#about`}><Roll t="About" /></a>
          <div className="dd">
            <a href={`${S}/blog`}><Roll t="Insights" /><Chev /></a>
            <div className="ddm"><a href={`${S}/blog`}>Blog</a><a href={`${S}/teams/it-experts-in-nepal`}>Our Team</a></div>
          </div>
        </nav>
        <a href="#contact" className="btn dark sm"><Roll t="Start a project" /><Up /></a>
        <button className="burger" aria-label="Menu"><b></b><b></b></button>
      </header>
  );
}

export function SiteFooter() {
  return <Footer />;
}
