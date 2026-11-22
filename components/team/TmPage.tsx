import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { management, team, slug, initials } from "./team-data";
import TmPic, { type TmPerson } from "./TmPic";
import TmPeople from "./TmPeople";
import TmMotion from "./TmMotion";
import "./tm.css";

const EXT = ["jpg", "jpeg", "png", "webp"];
function photoFor(s: string) {
  for (const e of EXT) {
    if (fs.existsSync(path.join(process.cwd(), "public", "assets", "team", `${s}.${e}`))) return `/assets/team/${s}.${e}`;
  }
  return null;
}
const prep = (list: { name: string; role: string; tone: TmPerson["tone"] }[]): TmPerson[] =>
  list.map((p) => ({ ...p, slug: slug(p.name), ini: initials(p.name), photo: photoFor(slug(p.name)) }));

export default function TmPage() {
  const leaders = prep(management);
  const members = prep(team);
  const all = [...leaders, ...members];
  const seen = new Set<string>();
  const heroSet = [...all.filter((p) => p.photo), ...leaders, ...members].filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true))).slice(0, 5);
  const names = all.map((p) => p.name);

  return (
    <main className="tm-page">
      <section className="tm-hero" id="tm-top">
        <span className="tm-ghost" aria-hidden="true">TEAM</span>
        <i className="tm-glow a" aria-hidden="true" /><i className="tm-glow b" aria-hidden="true" />
        <div className="tm-in tm-hero-g">
          <div className="tm-hero-c">
            <span className="tm-eyebrow" data-h>The people behind the work</span>
            <h1 className="tm-h1" aria-label="Built by people who care about the details.">
              <span className="tm-ln" aria-hidden="true"><span data-tm="ln">Built by</span></span>
              <span className="tm-ln" aria-hidden="true"><span data-tm="ln">people who</span></span>
              <span className="tm-ln" aria-hidden="true"><span data-tm="ln">care about</span></span>
              <span className="tm-ln" aria-hidden="true"><span data-tm="ln">the <em className="tm-em">details.</em></span></span>
            </h1>
            <p className="tm-hp" data-h>Softsaro brings together strategists, designers, engineers and growth specialists who turn ambitious ideas into meaningful digital experiences.</p>
            <div className="tm-hb" data-h>
              <a className="tm-btn p" href="#leadership">Meet the leadership</a>
              <a className="tm-btn o" href="#team">See the whole team</a>
            </div>
          </div>
          <div className="tm-col" aria-hidden="true">
            {heroSet.map((p, i) => (
              <div className={`tm-tile s${i}`} key={p.slug}>
                <div className={`tm-fl d${i}`}><TmPic p={p} sizes="(max-width: 900px) 40vw, 22vw" priority={i < 2} /></div>
              </div>
            ))}
            <div className="tm-badge"><b>{all.length}</b><small>people</small></div>
          </div>
        </div>
      </section>

      <div className="tm-marq">
        <div className="tm-marq-t">
          {[0, 1].map((n) => (
            <div className="tm-marq-g" key={n} aria-hidden={n === 1 ? "true" : undefined}>
              {names.map((nm) => (<span key={nm + n}>{nm}<i /></span>))}
            </div>
          ))}
        </div>
      </div>

      <TmPeople leaders={leaders} members={members} />

      <section className="tm-stats">
        <div className="tm-in">
          <ul className="tm-sg">
            <li data-rv><b data-count={all.length}>{all.length}</b><span>people at Softsaro</span></li>
            <li data-rv><b data-count={leaders.length}>{leaders.length}</b><span>in leadership</span></li>
            <li data-rv><b data-count={members.length}>{members.length}</b><span>in the wider team</span></li>
            <li data-rv><b data-count="2">2</b><span>offices, Nepal and USA</span></li>
          </ul>
        </div>
      </section>

      <section className="tm-cta">
        <i className="tm-g1" aria-hidden="true" /><i className="tm-g2" aria-hidden="true" />
        <div className="tm-in tm-cta-in">
          <div>
            <span className="tm-eyebrow lt" data-rv>Work with us</span>
            <h2 className="tm-cta-h" data-rv>Have a project <em>worth caring</em> about?</h2>
          </div>
          <Link className="tm-cta-b" href="/#contact" data-rv>
            <span>Let&rsquo;s talk</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </Link>
        </div>
        <div className="tm-cta-ghost" aria-hidden="true">Worth caring about &bull; Worth caring about &bull; Worth caring about</div>
      </section>
      <TmMotion />
    </main>
  );
}