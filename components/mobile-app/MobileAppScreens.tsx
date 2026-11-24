import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDownLeft, ArrowUpRight, Bell, Bike, Calculator, CalendarDays, Camera, ChartColumn, ChevronDown, Clock, Code, Coffee, Flame, Footprints,
  Glasses, Headphones, Heart, House, Languages, Layers, MapPin, MessageCircle, Palette, Pizza, Play, Plane, Plus, Rocket, Salad, ScanLine,
  Search, Send, Share2, ShoppingBag, Soup, Star, Timer, TrendingUp, User, Wallet, Watch,
} from "lucide-react";

const PX = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700`;

export function Phone({ children, className = "", ios = false }: { children: ReactNode; className?: string; ios?: boolean }) {
  return (
    <div className={`ap-ph${ios ? " ios" : ""} ${className}`.trim()} aria-hidden="true">
      <div className="ap-pf"><div className="ap-pscr">{children}</div><i className="ap-cam" /></div>
    </div>
  );
}

const SB = () => (
  <div className="aps-sb"><b>9:41</b><span><i className="apx-sg"><u /><u /><u /><u /></i><i className="apx-bt" /></span></div>
);
const Tab = ({ icons, on = 0 }: { icons: ReactNode[]; on?: number }) => (
  <div className="aps-tb">{icons.map((ic, k) => <span key={k} className={k === on ? "on" : ""}>{ic}</span>)}</div>
);
const Av = ({ t, g }: { t: string; g?: string }) => <i className="aps-av" style={g ? ({ background: g } as CSSProperties) : undefined}>{t}</i>;
const g = (a: string, b: string) => `linear-gradient(135deg,${a},${b})`;

/* ---------- E-commerce ---------- */
const shopItems: [ReactNode, string, string, string, string][] = [
  [<Headphones key="h" />, "Aero Buds", "$89", "4.8", g("#7e7bbd", "#3f3d7a")],
  [<Watch key="w" />, "Pulse Watch", "$129", "4.9", g("#ff9a62", "#e0457b")],
  [<Glasses key="g" />, "Sun Frame", "$64", "4.7", g("#3fe33f", "#12906b")],
  [<Camera key="c" />, "Snap Cam", "$219", "4.8", g("#4cc9f0", "#4361ee")],
];
export const Shop = () => (
  <div className="aps aps-shop">
    <SB />
    <div className="aps-hd"><div><small>Good morning</small><strong>Hi, Anisha</strong></div><Av t="AR" /></div>
    <div className="aps-search"><Search /><span>Search products</span></div>
    <div className="aps-chips"><b className="on">All</b><b>Audio</b><b>Watches</b><b>Camera</b></div>
    <div className="aps-promo"><div><small>SUMMER SALE</small><strong>Up to 40% off</strong><u>Shop now</u></div><Headphones /></div>
    <div className="aps-pg">
      {shopItems.map(([ic, n, p, r, bg]) => (
        <div className="aps-p" key={n}><span className="aps-pi" style={{ background: bg }}>{ic}<em className="apx-hr"><Heart /></em></span><b>{n}</b><small>{p}<em><Star /> {r}</em></small></div>
      ))}
    </div>
    <Tab icons={[<House key="1" />, <Search key="2" />, <ShoppingBag key="3" />, <User key="4" />]} />
  </div>
);

/* ---------- Food delivery ---------- */
export const Food = () => (
  <div className="aps aps-food">
    <SB />
    <div className="aps-hd"><div><small>Deliver to</small><strong className="apx-ln"><MapPin /> Thamel <ChevronDown /></strong></div><span className="aps-bell"><Bell /></span></div>
    <div className="aps-search"><Search /><span>Search dishes or places</span></div>
    <div className="aps-cats">
      {[[<Pizza key="a" />, "Pizza", "#ff9a62"], [<Salad key="b" />, "Salad", "#3fc27a"], [<Soup key="c" />, "Noodles", "#f5b942"], [<Coffee key="d" />, "Coffee", "#a8754f"]].map(([ic, n, c]) => (
        <span key={n as string}><i style={{ background: c as string }}>{ic}</i><small>{n}</small></span>
      ))}
    </div>
    <div className="aps-promo food"><div><small>FIRST ORDER</small><strong>Free delivery</strong><u>Order now</u></div><Pizza /></div>
    <div className="aps-rest">
      {[["Green Bowl", "Healthy - Bowls", "4.8", "25 min", g("#3fc27a", "#12906b"), <Salad key="s" />], ["Slice House", "Pizza - Italian", "4.7", "30 min", g("#ff9a62", "#e0457b"), <Pizza key="p" />], ["Momo Corner", "Dumplings - Nepali", "4.9", "20 min", g("#f5b942", "#e0742d"), <Soup key="m" />]].map(([n, t, r, m, bg, ic]) => (
        <div className="aps-r" key={n as string}><span style={{ background: bg as string }}>{ic as ReactNode}</span><div><b>{n as string}</b><small>{t as string}</small><em><Star /> {r as string} <Clock /> {m as string}</em></div></div>
      ))}
    </div>
    <div className="aps-cart"><span>View cart - 2 items</span><b>$18.40</b></div>
  </div>
);

/* ---------- Banking / fintech ---------- */
export const Bank = () => (
  <div className="aps aps-bank">
    <SB />
    <div className="aps-hd"><div><small>Good evening</small><strong>Rohan K.</strong></div><span className="aps-bell"><Bell /></span></div>
    <div className="aps-card">
      <small>Total balance</small><strong>$12,480.50</strong>
      <div className="apx-row"><span>&bull;&bull;&bull;&bull; 4821</span><i><u /><u /></i></div>
    </div>
    <div className="aps-acts">
      {[[<Send key="a" />, "Send"], [<ArrowDownLeft key="b" />, "Request"], [<Plus key="c" />, "Top up"], [<ScanLine key="d" />, "Scan"]].map(([ic, n]) => (
        <span key={n as string}><i>{ic as ReactNode}</i><small>{n as string}</small></span>
      ))}
    </div>
    <div className="aps-sec"><b>Spending</b><small>This week</small></div>
    <svg className="aps-line" viewBox="0 0 200 60" preserveAspectRatio="none"><defs><linearGradient id="bkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a67ae" stopOpacity=".35" /><stop offset="1" stopColor="#6a67ae" stopOpacity="0" /></linearGradient></defs><path d="M0 44C20 40 30 20 55 26S90 48 115 30 160 10 200 16V60H0Z" fill="url(#bkg)" /><path d="M0 44C20 40 30 20 55 26S90 48 115 30 160 10 200 16" fill="none" stroke="#6a67ae" strokeWidth="2.4" strokeLinecap="round" /></svg>
    <div className="aps-tx">
      {[["Grocery Mart", "Today", "-$54.20", "#ff9a62"], ["Salary", "Yesterday", "+$3,200.00", "#3fc27a"], ["Coffee House", "Mon", "-$4.50", "#a8754f"]].map(([n, d, a, c]) => (
        <div key={n}><i style={{ background: c }}>{n[0]}</i><span><b>{n}</b><small>{d}</small></span><em className={a.startsWith("+") ? "apx-up" : ""}>{a}</em></div>
      ))}
    </div>
    <Tab icons={[<House key="1" />, <Wallet key="2" />, <ChartColumn key="3" />, <User key="4" />]} />
  </div>
);

/* ---------- Fitness (dark) ---------- */
export const Fit = () => (
  <div className="aps aps-fit">
    <SB />
    <div className="aps-hd"><div><small>Thu, 19 Nov</small><strong>Today</strong></div><Av t="SK" g={g("#3fe33f", "#12906b")} /></div>
    <div className="aps-rings">
      <svg viewBox="0 0 120 120">
        {[[52, "#3fe33f", 0.82], [40, "#8b88c8", 0.64], [28, "#ff9a62", 0.46]].map(([r, c, p]) => (
          <g key={r as number}><circle cx="60" cy="60" r={r as number} fill="none" stroke="#ffffff14" strokeWidth="9" /><circle cx="60" cy="60" r={r as number} fill="none" stroke={c as string} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * (r as number) * (p as number)} 999`} transform="rotate(-90 60 60)" /></g>
        ))}
      </svg>
      <div><strong>8,432</strong><small>steps</small></div>
    </div>
    <div className="aps-stat3">
      {[[<Heart key="a" />, "72", "bpm", "#ff6b81"], [<Flame key="b" />, "540", "kcal", "#ff9a62"], [<Timer key="c" />, "46", "min", "#3fe33f"]].map(([ic, v, u, c]) => (
        <span key={u as string}><i style={{ color: c as string }}>{ic as ReactNode}</i><b>{v as string}</b><small>{u as string}</small></span>
      ))}
    </div>
    <div className="aps-run"><div><small>Morning run</small><strong>5.2 km</strong></div><div className="apx-bars">{[40, 62, 50, 78, 66, 90, 72].map((h, k) => <i key={k} style={{ height: h + "%" }} />)}</div></div>
    <Tab icons={[<House key="1" />, <Footprints key="2" />, <Heart key="3" />, <User key="4" />]} />
  </div>
);

/* ---------- Education ---------- */
export const Learn = () => (
  <div className="aps aps-learn">
    <SB />
    <div className="aps-hd"><div><small>Welcome back</small><strong>Keep learning</strong></div><span className="aps-streak"><Flame /> 7</span></div>
    <div className="aps-cont">
      <div><small>Mobile UI Design</small><strong>Lesson 8 of 12</strong><span className="apx-bar"><i style={{ width: "68%" }} /></span><small>68% complete</small></div>
      <i className="apx-play"><Play /></i>
    </div>
    <div className="aps-sec"><b>Your courses</b><small>See all</small></div>
    <div className="aps-courses">
      {[[<Code key="a" />, "Flutter Basics", g("#4cc9f0", "#4361ee")], [<Palette key="b" />, "UX Research", g("#e0457b", "#ff9a62")], [<Languages key="c" />, "English B2", g("#3fc27a", "#12906b")], [<Calculator key="d" />, "Data Maths", g("#8b88c8", "#3f3d7a")]].map(([ic, n, bg]) => (
        <div key={n as string}><span style={{ background: bg as string }}>{ic as ReactNode}</span><b>{n as string}</b><small>12 lessons</small></div>
      ))}
    </div>
    <Tab icons={[<House key="1" />, <Search key="2" />, <Play key="3" />, <User key="4" />]} />
  </div>
);

/* ---------- Business analytics ---------- */
export const Stats = () => (
  <div className="aps aps-stats">
    <SB />
    <div className="aps-hd"><div><small>Overview</small><strong>Dashboard</strong></div><span className="aps-pill">This week <ChevronDown /></span></div>
    <div className="aps-kpis">
      {[["Revenue", "$24.8k", "+12.4%"], ["Orders", "1,284", "+8.1%"]].map(([n, v, d]) => (
        <div key={n}><small>{n}</small><strong>{v}</strong><em><TrendingUp /> {d}</em></div>
      ))}
    </div>
    <div className="aps-bars">{[46, 62, 50, 84, 66, 92, 74].map((h, k) => <i key={k} className={k === 5 ? "apx-hi" : ""} style={{ height: h + "%" }}><u /></i>)}</div>
    <div className="aps-days">{["M", "T", "W", "T", "F", "S", "S"].map((d, k) => <span key={k}>{d}</span>)}</div>
    <div className="aps-sec"><b>Sales by region</b></div>
    <div className="aps-reg">
      <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="#ebeaf6" strokeWidth="7" /><circle cx="20" cy="20" r="14" fill="none" stroke="#6a67ae" strokeWidth="7" strokeDasharray="42 88" transform="rotate(-90 20 20)" /><circle cx="20" cy="20" r="14" fill="none" stroke="#3fe33f" strokeWidth="7" strokeDasharray="26 88" strokeDashoffset="-42" transform="rotate(-90 20 20)" /></svg>
      <div>{[["Kathmandu", "48%", "#6a67ae"], ["Pokhara", "30%", "#3fe33f"], ["Other", "22%", "#ebeaf6"]].map(([n, p, c]) => <span key={n}><i style={{ background: c }} />{n}<b>{p}</b></span>)}</div>
    </div>
    <Tab icons={[<House key="1" />, <ChartColumn key="2" />, <Bell key="3" />, <User key="4" />]} on={1} />
  </div>
);

/* ---------- Travel ---------- */
export const Travel = () => (
  <div className="aps aps-travel">
    <div className="aps-scene">
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="tvs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb88c" /><stop offset=".55" stopColor="#bcb9e0" /><stop offset="1" stopColor="#6a67ae" /></linearGradient></defs><rect width="200" height="130" fill="url(#tvs)" /><circle cx="150" cy="38" r="15" fill="#fff6e6" opacity=".9" /><path d="M0 100L40 58l22 26 30-48 38 62 26-30 44 46v16H0z" fill="#4a4890" /><path d="M0 112l50-26 36 18 40-24 74 34v16H0z" fill="#3f3d7a" /><path d="M0 124c40-8 80 4 120-2s60-4 80 2v6H0z" fill="#2a2866" /></svg>
      <div className="apx-top"><SB /></div>
      <div className="apx-cap"><small><MapPin /> Nepal</small><strong>Pokhara</strong></div>
    </div>
    <div className="aps-book">
      <div><CalendarDays /><span><small>Dates</small><b>12 - 16 Dec</b></span></div>
      <div><User /><span><small>Guests</small><b>2 adults</b></span></div>
    </div>
    <div className="aps-sec"><b>Popular stays</b><small>See all</small></div>
    <div className="aps-stays">
      {[["Lakeside Retreat", "$120", "4.9", g("#bcb9e0", "#6a67ae")], ["Valley View", "$95", "4.8", g("#ffb88c", "#e0457b")]].map(([n, p, r, bg]) => (
        <div key={n}><span style={{ background: bg }}><Plane /></span><div><b>{n}</b><small><Star /> {r}</small></div><em>{p}<small>/night</small></em></div>
      ))}
    </div>
    <div className="aps-btn">Book now</div>
  </div>
);

/* ---------- Social ---------- */
export const Social = () => (
  <div className="aps aps-social">
    <SB />
    <div className="aps-hd"><strong>Circle</strong><span className="aps-bell"><Send /></span></div>
    <div className="aps-stories">
      {[["You", "#d6d4ee"], ["Sita", "#ff9a62"], ["Dev", "#6a67ae"], ["Maya", "#3fc27a"], ["Raj", "#e0457b"]].map(([n, c], k) => (
        <span key={n}><i style={{ background: k === 0 ? "#f3f1fa" : `linear-gradient(135deg,${c},#ffffff00)`, boxShadow: `inset 0 0 0 .7cqw ${c}` }}>{k === 0 ? <Plus /> : n[0]}</i><small>{n}</small></span>
      ))}
    </div>
    <div className="aps-post">
      <div className="apx-who"><Av t="SR" g={g("#ff9a62", "#e0457b")} /><span><b>Sita Rai</b><small>2h - Kathmandu</small></span></div>
      <div className="apx-img" style={{ backgroundImage: `url(${PX(574071)}), ${g("#bcb9e0", "#6a67ae")}` }} />
      <p>Shipping our new release today.</p>
      <div className="apx-acts"><span><Heart /> 128</span><span><MessageCircle /> 24</span><Share2 /></div>
    </div>
    <Tab icons={[<House key="1" />, <Search key="2" />, <Plus key="3" />, <User key="4" />]} />
  </div>
);

/* ---------- Expertise screens ---------- */
export const Custom = () => (
  <div className="aps aps-custom">
    <SB />
    <div className="apx-hero"><i><Layers /></i><u className="apx-o1" /><u className="apx-o2" /></div>
    <div className="apx-txt"><strong>Built around you</strong><p>Custom features, flows and integrations designed for your business.</p></div>
    <div className="apx-dots"><i className="on" /><i /><i /></div>
    <div className="aps-btn">Get started</div>
    <small className="apx-sk">Skip for now</small>
  </div>
);
export const UiKit = () => (
  <div className="aps aps-kit">
    <SB />
    <div className="aps-sec"><b>Design system</b><small>v2.0</small></div>
    <div className="apx-sw">{["#6a67ae", "#3f3d7a", "#bcb9e0", "#3fe33f", "#0a0b14"].map((c) => <i key={c} style={{ background: c }} />)}</div>
    <div className="apx-ty"><strong>Aa</strong><span><b>Inter Tight</b><small>Headings - 800</small><small>Inter - Body 400</small></span></div>
    <div className="apx-btns"><b>Primary</b><em>Secondary</em></div>
    <div className="apx-fld"><small>Email</small><span>name@company.com</span></div>
    <div className="apx-ctl"><u><i /></u><u className="apx-o"><i /></u><span className="apx-rng"><i /></span></div>
    <div className="aps-chips"><b className="on">Chip</b><b>Chip</b><b>Chip</b></div>
    <div className="apx-alrt"><i>&#10003;</i><span><b>Changes saved</b><small>Synced to the cloud</small></span></div>
    <div className="apx-lst"><Av t="AR" /><span><b>Anisha R.</b><small>Product owner</small></span><em>View</em></div>
    <Tab icons={[<House key="1" />, <Layers key="2" />, <Palette key="3" />, <User key="4" />]} on={1} />
  </div>
);
export const Api = () => (
  <div className="aps aps-api">
    <SB />
    <div className="apx-hd"><b>API console</b><span>Live</span></div>
    {[["GET", "/v1/orders", "200"], ["POST", "/v1/payments", "201"], ["GET", "/v1/users/42", "200"], ["PUT", "/v1/profile", "200"]].map(([m, p, s]) => (
      <div className="apx-ep" key={p}><em className={`apx-${m}`}>{m}</em><span>{p}</span><b>{s}</b></div>
    ))}
    <pre>{`{
  "id": "ORD-1042",
  "status": "paid",
  "total": 89.00
}`}</pre>
    <div className="apx-cloud"><span>Cloud</span><span>Auth</span><span>Push</span></div>
  </div>
);
export const Tests = () => (
  <div className="aps aps-tests">
    <SB />
    <div className="aps-sec"><b>Device lab</b><small>All passing</small></div>
    {[["Pixel 8", "Android 14"], ["Galaxy S23", "Android 14"], ["iPhone 15", "iOS 17"], ["iPad Air", "iPadOS 17"], ["Redmi Note", "Android 13"]].map(([n, o]) => (
      <div className="apx-dv" key={n}><i><Layers /></i><span><b>{n}</b><small>{o}</small></span><u>&#10003;</u></div>
    ))}
    <div className="apx-prog"><span>Regression suite</span><i><u style={{ width: "100%" }} /></i></div>
  </div>
);
export const Release = () => (
  <div className="aps aps-rel">
    <SB />
    <div className="apx-hd"><i><Rocket /></i><span><b>What&rsquo;s new</b><small>Version 2.4</small></span></div>
    {[["Faster startup", "Launches quicker on older devices."], ["Dark mode", "Easier on the eyes at night."], ["Bug fixes", "Smoother checkout and sign-in."]].map(([t, d]) => (
      <div className="apx-ch" key={t}><i /><span><b>{t}</b><small>{d}</small></span></div>
    ))}
    <div className="aps-btn">Update</div>
  </div>
);