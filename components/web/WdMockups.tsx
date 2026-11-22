import Photo from "./Photo";

/** Coded website mockups (decorative). Photos sit inside the screens so photography and UI mix. */
const Bar = ({ url = "yourbrand.com" }: { url?: string }) => (
  <div className="wd-bar"><i /><i /><i /><span>{url}</span></div>
);
const Ph = ({ name, fb, alt }: { name: string; fb: string; alt: string }) => (
  <span className="wd-ph"><Photo name={name} fallback={fb} alt={alt} /></span>
);

export function SiteMock({ photo = "hero", fb = "/assets/dm/devices.jpg", alt = "Website homepage shown on a laptop screen" }: { photo?: string; fb?: string; alt?: string }) {
  return (
    <div className="wd-win">
      <Bar />
      <div className="wd-site">
        <div className="wd-nav"><b /><span /><span /><span /><em /></div>
        <div className="wd-herom">
          <div><i className="wd-sk k1" /><i className="wd-sk k2" /><i className="wd-sk k3" /><i className="wd-sk k4" /></div>
          <Ph name={photo} fb={fb} alt={alt} />
        </div>
        <div className="wd-3"><i /><i /><i /></div>
      </div>
    </div>
  );
}

export function DashMock() {
  return (
    <div className="wd-win">
      <Bar url="app.yourbrand.com" />
      <div className="wd-dash">
        <aside><b /><i /><i /><i /><i /></aside>
        <div>
          <div className="wd-kpi"><i /><i /><i /></div>
          <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="wd-chart">
            <defs><linearGradient id="wdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a67ae" stopOpacity=".35" /><stop offset="1" stopColor="#6a67ae" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 88C30 80 55 86 85 66S140 70 170 46 230 48 255 26 285 18 300 10V110H0Z" fill="url(#wdg)" />
            <path d="M0 88C30 80 55 86 85 66S140 70 170 46 230 48 255 26 285 18 300 10" fill="none" stroke="#6a67ae" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="wd-rows"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

export function ListMock() {
  return (
    <div className="wd-win">
      <Bar url="listings.yourbrand.com" />
      <div className="wd-list">
        <div className="wd-search"><i /><b /></div>
        <div className="wd-grid">
          {[0, 1, 2, 3].map((n) => (<div key={n}><span className={`wd-t wd-t${n}`} /><i /><i className="s" /></div>))}
        </div>
      </div>
    </div>
  );
}

export function PhoneMock() {
  return (
    <div className="wd-phonebody">
      <span className="wd-notch" />
      <div className="wd-pscreen">
        <div className="wd-nav"><b /><em /></div>
        <Ph name="hero" fb="/assets/dm/devices.jpg" alt="Mobile version of a website" />
        <i className="wd-sk k1" /><i className="wd-sk k2" /><i className="wd-sk k4" />
        <div className="wd-3"><i /><i /></div>
      </div>
    </div>
  );
}

export function CodeCard() {
  return (
    <div className="wd-codecard">
      <div className="wd-bar"><i /><i /><i /><span>page.tsx</span></div>
      <pre><code>{`<Header />
<Hero cta="Get started" />
<Services id="services" />
<Contact />`}</code></pre>
    </div>
  );
}