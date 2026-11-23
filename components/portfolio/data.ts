export type Cat = "web" | "app" | "graphics" | "seo" | "dm";
export type Project = { name: string; cat: Cat; slug: string; desc: string };
export type Featured = { name: string; slug: string; tag: string; sector: string; desc: string; img: string; href: string };

export const CATS: { key: "all" | Cat; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Website Development" },
  { key: "app", label: "App Development" },
  { key: "graphics", label: "Graphics Design" },
  { key: "seo", label: "SEO" },
  { key: "dm", label: "Digital Marketing" },
];
export const CAT_LABEL: Record<Cat, string> = { web: "Website Development", app: "App Development", graphics: "Graphics Design", seo: "SEO", dm: "Digital Marketing" };
const DESC: Record<Cat, string> = {
  web: "A website designed and developed by Softsaro.",
  app: "A mobile app designed and built by Softsaro.",
  graphics: "Graphic design and marketing creatives by Softsaro.",
  seo: "Search engine optimisation work by Softsaro.",
  dm: "Digital marketing work by Softsaro.",
};
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const raw: [string, Cat][] = [
  ["Sajha Courier App", "app"], ["Softsaro Graphic Designs", "graphics"], ["Adsaro Nepal", "seo"], ["Sayumi Global", "dm"], ["Adsaro Nepal Graphics", "graphics"], ["Daley Bhai", "web"],
  ["Adsaro", "web"], ["Softsaro Designs", "graphics"], ["Sayumi Travels", "seo"], ["Brochure", "graphics"], ["Artha Kagaj", "web"], ["Softsaro Graphics", "graphics"],
  ["Adsaro UK Graphics", "dm"], ["Emperor Graphics", "graphics"], ["Buy Fresh", "web"], ["Angel Health Care", "seo"], ["Chandra Surya Sports", "web"], ["Suvlav Application", "app"],
  ["Converttree", "seo"], ["Elaichi Graphics", "graphics"], ["CSR Link", "web"], ["Sajha Market Place", "app"], ["Adsaro", "seo"], ["Guru Purnima Graphics", "graphics"],
  ["Dakarmi", "web"], ["Darchula Hydropower", "web"], ["De Glamora", "web"], ["Emperor", "seo"], ["Emperor", "web"], ["Leideu", "web"],
  ["Global Ranking Hub", "web"], ["Hamro Jobs", "web"], ["Rstca", "web"], ["Himalayan Fabs", "web"], ["Hope 2 Help", "web"], ["Indreni Mushroom Farm", "web"],
  ["Kosish", "web"], ["Softsaro", "seo"], ["Market Lab", "web"], ["Mero Gantabya", "web"], ["Neerkart", "web"], ["Photo Studio", "web"],
  ["Plant Variety", "web"], ["Sajha Courier", "web"], ["Sajha Marketplace", "web"], ["Sajilo Mobile", "web"], ["Saurya Krishi", "web"], ["Sayumi Global", "web"],
  ["Simrik Cooperation", "web"], ["Suvlav", "web"], ["Swissa Trek", "web"], ["Tcorp", "web"], ["Travel Bee", "web"], ["Zogad", "web"],
];
export const PROJECTS: Project[] = raw.map(([name, cat]) => ({ name, cat, slug: `${slugify(name)}-${cat}`, desc: DESC[cat] }));

const S = "https://softsaro.com.np";
export const FEATURED: Featured[] = [
  { name: "Daley Bhai Real Estate", slug: "daley-bhai-real-estate", tag: "Real estate", sector: "Website Development", desc: "A structured property listing platform for the Kathmandu Valley.", img: `${S}/uploads/portfolio_mY6fNptC.jpg`, href: "/portfolio/daley-bhai-real-estate" },
  { name: "Sajha Courier", slug: "sajha-courier", tag: "Logistics", sector: "Web + Mobile App", desc: "Parcel tracking, online booking and logistics management for web and app.", img: `${S}/img/portfolio/sajha%20courier.jpg`, href: "/portfolio/sajha-courier" },
  { name: "Emperor Educational Consultancy", slug: "emperor-educational-consultancy", tag: "Education", sector: "Web + React Native", desc: "A study abroad guidance platform with a full-featured mobile app.", img: `${S}/img/portfolio/emperor.jpeg`, href: "/portfolio/emperor-educational-consultancy" },
  { name: "Adsaro Nepal", slug: "adsaro-nepal", tag: "Ad agency", sector: "Next.js, Node.js, ClickHouse", desc: "A high-performance ad agency platform with real-time analytics at scale.", img: `${S}/img/portfolio/adsaro.jpg`, href: "/portfolio/adsaro-nepal" },
];