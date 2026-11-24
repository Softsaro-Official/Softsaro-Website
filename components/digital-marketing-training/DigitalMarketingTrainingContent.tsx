import { Heart, MessageCircle, Send, TrendingUp } from "lucide-react";
import { S, Roll, Up } from "@/components/Site";
import { photos, topics, practise, tools, why, faqs } from "@/lib/dm-data";

type Ph = { src: string; alt: string; w: number; h: number };

const Lab = ({ n, children, w }: { n?: string; children: React.ReactNode; w?: boolean }) => (
  <p className={w ? "lab w" : "lab"}><i></i>{n ? <span className="gn">{n} /</span> : null} {children}</p>
);

/** Photo with parallax wrapper (.dm-px). The motion hook drops the <img> if it fails to load. */
function Photo({ p, eager, cls = "" }: { p: Ph; eager?: boolean; cls?: string }) {
  return (
    <div className={`dm-px ${cls}`}>
      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function PostCard() {
  return (
    <div className="dm-card dm-post" role="img" aria-label="Illustration of a social media post with likes and comments">
      <div className="dm-post-top"><i></i><b></b><em>Social post / Illustrative</em></div>
      <div className="dm-post-img"><span></span><span></span><span></span></div>
      <div className="dm-post-bar"><Heart size={15} /><MessageCircle size={15} /><Send size={15} /></div>
    </div>
  );
}

function AdCard() {
  return (
    <div className="dm-card dm-ad" role="img" aria-label="Illustration of a sponsored ad with a call to action button">
      <small>Sponsored / Illustrative</small>
      <div className="dm-ad-img"></div>
      <b></b><b></b>
      <span>Learn more</span>
    </div>
  );
}

function FunnelCard() {
  return (
    <div className="dm-card dm-fun" role="img" aria-label="Illustration of a marketing funnel from awareness to action">
      <div className="dm-mail-h"><span>Strategy funnel</span><small>Illustrative</small></div>
      {[["Awareness", 100], ["Interest", 74], ["Action", 48]].map(([l, w]) => (
        <div key={l as string} className="dm-fun-r"><i style={{ width: `${w}%` }}></i><span>{l}</span></div>
      ))}
    </div>
  );
}

const words = ["Social Media", "Ads", "Content", "SEO", "Email", "Strategy", "Analytics"];
const Spark = () => (
  <svg className="dm-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" /></svg>
);

function Hero() {
  return (
    <section className="dm-hero" id="top" aria-labelledby="dm-title">
      <i className="dm-dots" aria-hidden="true"></i>
      <div className="wrap dm-hero-grid">
        <div>
          <p className="lab" data-in=""><i></i><span className="gn">Digital Marketing Training /</span> Softsaro Nepal</p>
          <h1 id="dm-title">Learn Digital Marketing by Doing</h1>
          <p className="sub" data-in="">Social, ads, content, email and analytics, taught through hands-on practice.</p>
          <div className="cta-row" data-in="">
            <a className="btn dark" href="#contact"><Roll t="Enroll Now" /><Up /></a>
            <a className="btn seo-outline" href={`${S}/contact`}><Roll t="Contact Us" /></a>
          </div>
        </div>
        <div className="dm-collage">
          <i className="dm-blob" data-depth="-16"></i>
          <div className="dm-arch dm-l" data-depth="8"><Photo p={photos.team} eager /></div>
          <div className="dm-round dm-l" data-depth="24"><Photo p={photos.huddle} eager /></div>
          <div className="dm-l dm-pos-post" data-depth="30"><div data-float="-12,1,5.5"><PostCard /></div></div>
          <div className="dm-l dm-pos-ad" data-depth="40"><div data-float="12,-1.5,4.8"><AdCard /></div></div>
          <div className="dm-l dm-pos-chip" data-depth="22"><div className="dm-chip" data-float="8,-2,4.6"><TrendingUp size={15} strokeWidth={2.4} /> Campaign report</div></div>
          <div className="dm-l dm-pos-spark" data-depth="-20"><Spark /></div>
        </div>
      </div>
      <div className="dm-words" aria-hidden="true">
        <div className="dm-mq" data-mq="1">
          {[0, 1].map((k) => (<p key={k}>{words.map((w) => (<span key={w}>{w}<i>✦</i></span>))}</p>))}
        </div>
      </div>
    </section>
  );
}

export default function DigitalMarketingTrainingContent() {
  const half = Math.ceil(tools.length / 2);
  const rows = [tools.slice(0, half), tools.slice(half)];
  return (
    <>
      <Hero />

      <section className="dm-band" aria-labelledby="dm-intro-title">
        <div className="dm-band-box" data-band="">
          <Photo p={photos.band} />
          <i className="dm-band-shade" aria-hidden="true"></i>
          <div className="wrap dm-band-in">
            <Lab n="01" w>About the training</Lab>
            <h2 id="dm-intro-title" data-split>Marketing skills you can use on a real business from day one.</h2>
            <ul className="dm-band-tags" data-stagger="">
              <li>Plan</li><li>Run</li><li>Measure</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dm-learn" id="learn" aria-labelledby="dm-learn-title">
        <div className="wrap">
          <Lab n="02">What you will learn</Lab>
          <h2 className="seo-h" id="dm-learn-title" data-split>Eight skills. One complete toolkit.</h2>
          <div className="dm-bento" data-stagger="">
            {topics.map((tp, i) => {
              const { Icon, t, d, area, tone } = tp;
              const ph = "photo" in tp ? photos[tp.photo] : null;
              return (
                <article className={`dm-t dm-t-${tone} a-${area}`} key={t}>
                  {ph ? <><Photo p={ph} cls="dm-t-ph" /><i className="dm-t-shade" aria-hidden="true"></i></> : null}
                  <span className="dm-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <small>0{i + 1}</small>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dm-prac" aria-labelledby="dm-prac-title">
        <div className="wrap dm-prac-grid">
          <div className="dm-comp">
            <div className="dm-c1" data-reveal=""><Photo p={photos.brainstorm} /></div>
            <div className="dm-c2" data-reveal=""><Photo p={photos.devices} /></div>
            <div className="dm-c3" data-depth="0"><div data-float="-10,1,5"><FunnelCard /></div></div>
            <div className="dm-c4"><div data-float="10,-1.5,4.6"><PostCard /></div></div>
          </div>
          <div>
            <Lab n="03" w>Practical learning</Lab>
            <h2 className="seo-h dm-white" id="dm-prac-title" data-split>Build real campaigns, not just notes.</h2>
            <p className="dm-lead-w">Every topic comes with hands-on work you can show afterwards.</p>
            <ol className="dm-list" data-stagger="">
              {practise.map((p, i) => (<li key={p}><b>0{i + 1}</b><span>{p}</span><Up /></li>))}
            </ol>
          </div>
        </div>
      </section>

      <section className="dm-tools" aria-labelledby="dm-tools-title">
        <div className="wrap">
          <Lab n="04">Tools &amp; platforms</Lab>
          <h2 className="seo-h" id="dm-tools-title" data-split>Platforms you will work with.</h2>
        </div>
        <div className="dm-marq" role="list" aria-label="Tools and platforms">
          {rows.map((r, ri) => (
            <div className="dm-mq" data-mq={ri ? "-1" : "1"} key={ri}>
              {[0, 1].map((k) => (
                <ul key={k} aria-hidden={k === 1 ? "true" : undefined}>
                  {r.map((n) => (<li key={n} role={k ? undefined : "listitem"}><b>{n[0]}</b>{n}</li>))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="dm-why" aria-labelledby="dm-why-title">
        <div className="wrap dm-why-grid">
          <div className="dm-why-img" data-reveal=""><Photo p={photos.review} /></div>
          <div>
            <Lab n="05" w>Why Softsaro</Lab>
            <h2 className="seo-h dm-white" id="dm-why-title" data-split>Why learn digital marketing at Softsaro?</h2>
            <div className="dm-why-list" data-stagger="">
              {why.map(([t, d], i) => (<div key={t}><b>0{i + 1}</b><div><h3>{t}</h3><p>{d}</p></div></div>))}
            </div>
          </div>
        </div>
      </section>

      <section className="seo-faq" aria-labelledby="dm-faq-title">
        <div className="wrap seo-two">
          <div>
            <Lab n="06">FAQ</Lab>
            <h2 className="seo-h" id="dm-faq-title" data-split>Questions.</h2>
          </div>
          <div className="seo-faq-list" data-stagger="">
            {faqs.map(([q, a]) => (
              <details key={q} name="dm-faq">
                <summary><span>{q}</span><i aria-hidden="true"></i></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final dm-final" id="contact" aria-labelledby="dm-cta-title">
        <div className="wrap dm-cta-grid">
          <div>
            <p className="lab w"><i></i>Enquiry</p>
            <h2 className="mega" id="dm-cta-title" data-split>Ready to learn<br />digital <b>marketing?</b></h2>
            <p className="fsub">Contact Softsaro to learn more.</p>
            <div className="cta-row">
              <a className="btn white" href={`${S}/contact`}><Roll t="Enquire Now" /><Up /></a>
              <a className="btn ghostw" href="tel:9818439664"><Roll t="Call 9818439664" /></a>
            </div>
          </div>
          <div className="dm-cta-ph" data-reveal="circle"><Photo p={photos.celebrate} /></div>
        </div>
      </section>
    </>
  );
}