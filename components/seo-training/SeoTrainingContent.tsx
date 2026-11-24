import { Check, Search } from "lucide-react";
import { S, Roll, Up } from "@/components/Site";
import { topics, steps, practise, tools, why, faqs, photos, preview } from "@/lib/seo-data";

type Ph = { src: string; alt: string; w: number; h: number };

const Lab = ({ n, children, w }: { n?: string; children: React.ReactNode; w?: boolean }) => (
  <p className={w ? "lab w" : "lab"}><i></i>{n ? <span className="gn">{n} /</span> : null} {children}</p>
);

/** Photo with parallax wrapper (.ss-px). The motion hook drops the <img> if it fails to load. */
function Photo({ p, eager, cls = "" }: { p: Ph; eager?: boolean; cls?: string }) {
  return (
    <div className={`ss-px ${cls}`}>
      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function SerpCard() {
  return (
    <div className="ss-serp" role="img" aria-label="Illustration of search engine results for an SEO query">
      <div className="ss-serp-q"><Search size={14} strokeWidth={2.2} /><span>seo training</span><small>Illustrative</small></div>
      {[78, 92, 60].map((w, i) => (
        <div className="ss-serp-r" key={i}><i></i><b style={{ width: `${w}%` }}></b><em></em></div>
      ))}
    </div>
  );
}

function KeywordVisual() {
  const rows: [string, string, number][] = [
    ["seo training", "Learning", 82], ["local seo", "Local", 64],
    ["keyword research", "Informational", 74], ["technical seo audit", "Commercial", 48],
  ];
  return (
    <div className="kv" role="img" aria-label="Illustration of a keyword research table grouped by search intent">
      <div className="kv-head"><span>Keyword research</span><small>Illustrative</small></div>
      {rows.map(([k, tag, w]) => (
        <div className="kv-row" key={k}><b>{k}</b><em>{tag}</em><span><i style={{ width: `${w}%` }}></i></span></div>
      ))}
    </div>
  );
}

function AuditVisual() {
  const rows: [string, string, string][] = [
    ["Title tags", "ok", "Good"], ["Page speed", "warn", "Review"], ["Mobile layout", "ok", "Good"],
    ["Indexing", "bad", "Fix"], ["Internal links", "ok", "Good"],
  ];
  return (
    <div className="av" role="img" aria-label="Illustration of a website SEO audit checklist">
      <div className="av-head"><span>Website audit</span><small>Illustrative</small></div>
      {rows.map(([n, s, l]) => (
        <div className="av-row" key={n}><b>{n}</b><em className={"av-" + s}>{l}</em></div>
      ))}
    </div>
  );
}

export default function SeoTrainingContent() {
  return (
    <>
      <section className="ss-hero" id="top" aria-labelledby="seo-title">
        <i className="ss-dots" aria-hidden="true"></i>
        <div className="wrap ss-hero-grid">
          <div>
            <p className="lab" data-in=""><i></i><span className="gn">SEO Training /</span> Softsaro Nepal</p>
            <h1 id="seo-title">Master SEO Skills with Practical Training</h1>
            <p className="sub" data-in="">Learn SEO from the fundamentals to advanced techniques, with hands-on practice.</p>
            <div className="ss-search" data-in="" aria-hidden="true">
              <Search size={18} strokeWidth={2.2} /><span data-type="seo training in nepal">seo training in nepal</span><i></i>
            </div>
            <div className="cta-row" data-in="">
              <a className="btn dark" href="#contact"><Roll t="Enroll Now" /><Up /></a>
              <a className="btn seo-outline" href={`${S}/contact`}><Roll t="Contact Us" /></a>
            </div>
          </div>
          <div className="ss-collage">
            <i className="ss-blob" data-depth="-16"></i>
            <div className="ss-main ss-l" data-depth="8"><Photo p={photos.hero} eager /></div>
            <div className="ss-round ss-l" data-depth="22"><Photo p={photos.round} eager /></div>
            <div className="ss-l ss-pos-serp" data-depth="34"><div data-float="-12,1,5.5"><SerpCard /></div></div>
            <div className="ss-l ss-pos-chip" data-depth="26"><div className="ss-chip" data-float="10,-2,4.6"><Check size={14} strokeWidth={3} /> Site audit</div></div>
            <div className="ss-l ss-pos-chip2" data-depth="18"><div className="ss-chip ss-chip-l" data-float="-8,2,5"><span>keywords</span><span>intent</span><span>local</span></div></div>
          </div>
        </div>
      </section>

      <section className="ss-band" aria-labelledby="ss-band-title">
        <div className="ss-band-box" data-band="">
          <Photo p={photos.band} />
          <i className="ss-band-shade" aria-hidden="true"></i>
          <div className="wrap ss-band-in">
            <Lab n="01" w>How search works</Lab>
            <h2 id="ss-band-title" data-split>Learn SEO the way it is used in real projects.</h2>
            <p className="ss-band-p">Practical lessons that show how search works and how to improve a website.</p>
            <ul className="ss-band-tags" data-stagger="">
              <li>Crawl</li><li>Index</li><li>Rank</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ss-learn" id="learn" aria-labelledby="learn-title">
        <div className="wrap ss-learn-grid">
          <div className="ss-learn-l">
            <Lab n="02">What you will learn</Lab>
            <h2 className="seo-h" id="learn-title" data-split>From keywords to AI search.</h2>
            <div className="ss-learn-ph" data-reveal="">
              <Photo p={photos.keyword} />
            </div>
            <div className="ss-learn-ov"><KeywordVisual /></div>
          </div>
          <ol className="ss-topics" data-stagger="">
            {topics.map(({ Icon, t }, i) => (
              <li key={t}><b>0{i + 1}</b><Icon size={20} strokeWidth={1.8} aria-hidden="true" /><span>{t}</span><Up /></li>
            ))}
          </ol>
        </div>
        <div className="ss-pv" aria-hidden="true">
          {preview.map((p) => (<img key={p.src} src={p.src} alt="" width={360} height={440} loading="lazy" decoding="async" />))}
        </div>
      </section>

      <section className="seo-method ss-method" aria-labelledby="method-title">
        <div className="wrap">
          <Lab n="03">Training process</Lab>
          <h2 className="seo-h" id="method-title" data-split>Learn by doing.</h2>
          <div className="seo-steps">
            <div className="seo-line" aria-hidden="true"><i></i></div>
            {steps.map(([t, d], i) => (
              <div className="seo-step on" key={t}><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
          <div className="ss-prac">
            <div className="ss-prac-ph">
              <div className="ss-prac-img" data-reveal=""><Photo p={photos.audit} /></div>
              <div className="ss-prac-ov"><div data-float="-10,1,5"><AuditVisual /></div></div>
            </div>
            <div>
              <p className="seo-mini">You will practise</p>
              <div className="seo-chips" data-stagger="">
                {practise.map((p) => (<span key={p}>{p}</span>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ss-tools" aria-labelledby="tools-title">
        <div className="wrap">
          <Lab n="04">Tools</Lab>
          <h2 className="seo-h" id="tools-title" data-split>Tools you will use.</h2>
          <ul className="ss-tgrid" data-stagger="">
            {tools.map((n) => (<li key={n}><b>{n[0]}</b><span>{n}</span></li>))}
          </ul>
        </div>
      </section>

      <section className="ss-why" aria-labelledby="why-seo">
        <div className="wrap">
          <Lab n="05" w>Why Softsaro</Lab>
          <h2 className="seo-h ss-white" id="why-seo" data-split>Why learn SEO at Softsaro?</h2>
          <div className="ss-why-ph" data-reveal=""><Photo p={photos.why} /></div>
          <div className="ss-why-grid" data-stagger="">
            {why.map(([t, d], i) => (<div key={t}><small>0{i + 1}</small><h3>{t}</h3><p>{d}</p></div>))}
          </div>
        </div>
      </section>

      <section className="seo-faq" aria-labelledby="faq-title">
        <div className="wrap seo-two">
          <div>
            <Lab n="06">FAQ</Lab>
            <h2 className="seo-h" id="faq-title" data-split>Questions.</h2>
          </div>
          <div className="seo-faq-list" data-stagger="">
            {faqs.map(([q, a]) => (
              <details key={q} name="seo-faq">
                <summary><span>{q}</span><i aria-hidden="true"></i></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final ss-final" id="contact" aria-labelledby="seo-cta-title">
        <div className="wrap ss-cta-grid">
          <div>
            <p className="lab w"><i></i>Enquiry</p>
            <h2 className="mega" id="seo-cta-title" data-split>Interested in<br />learning <b>SEO?</b></h2>
            <p className="fsub">Contact Softsaro to learn more.</p>
            <div className="cta-row">
              <a className="btn white" href={`${S}/contact`}><Roll t="Enquire Now" /><Up /></a>
              <a className="btn ghostw" href="tel:9818439664"><Roll t="Call 9818439664" /></a>
            </div>
          </div>
          <div className="ss-cta-ph" data-reveal="arch"><Photo p={photos.cta} /></div>
        </div>
      </section>
    </>
  );
}