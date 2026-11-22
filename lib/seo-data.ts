import { BookOpen, Search, FileText, Wrench, Link as LinkIcon, MapPin, Pencil, Activity, Sparkles } from "lucide-react";

export const topics = [
  { Icon: BookOpen, t: "SEO Fundamentals" },
  { Icon: Search, t: "Keyword Research" },
  { Icon: FileText, t: "On-Page SEO" },
  { Icon: Wrench, t: "Technical SEO" },
  { Icon: LinkIcon, t: "Link Building" },
  { Icon: MapPin, t: "Local SEO" },
  { Icon: Pencil, t: "Content Optimization" },
  { Icon: Activity, t: "Analytics & Search Console" },
  { Icon: Sparkles, t: "AEO & GEO" },
];

export const steps = [
  ["Learn", "Clear concepts"],
  ["Practice", "Guided exercises"],
  ["Apply", "A real website"],
  ["Analyze", "Read the data"],
  ["Improve", "Refine and repeat"],
];

export const practise = ["Website SEO audits", "Keyword research", "Site optimization", "Content planning", "Search Console analysis", "Performance tracking"];

export const tools = ["Google Search Console", "Google Analytics", "Google Keyword Planner", "Google Trends", "Screaming Frog", "PageSpeed Insights", "Google Business Profile", "Looker Studio"];

export const why = [
  ["Real-world experience", "Softsaro delivers SEO for real businesses."],
  ["Practical approach", "Audits and reports, not just theory."],
  ["Current techniques", "Local SEO, AEO and GEO included."],
  ["Experienced guidance", "Learn from the team behind our SEO work."],
];

export const faqs = [
  ["Who is this training for?", "Students, job seekers, business owners, marketers and developers who want to apply SEO."],
  ["Do I need prior experience?", "No. It starts with the fundamentals and builds up step by step."],
  ["Will there be practical sessions?", "Yes. Audits, keyword research, optimization and Search Console analysis."],
  ["Can you guarantee rankings?", "No. No one honestly can. You learn proven methods and how to measure progress."],
  ["What about duration, fees and schedule?", "These are being confirmed. Contact the Softsaro team for the latest details."],
];

/** Local photos (Pexels, free licence) saved to /public/assets/seo by seo-visual.ps1. */
const P = (n: string, alt: string, w: number, h: number) => ({ src: `/assets/seo/${n}.jpg`, alt, w, h });
export const photos = {
  hero: P("hero", "Two professionals using a tablet and laptop to analyze market trends in a modern office", 900, 1100),
  round: P("round", "Person taking notes on a business chart with a laptop in the background", 600, 600),
  band: P("band", "Coworkers analyzing data charts on laptops during a team meeting", 1800, 1000),
  keyword: P("keyword", "Business professional analyzing data trends using a tablet and laptop", 900, 700),
  audit: P("audit", "Professionals collaborating in an office, focused on digital data analysis during a meeting", 900, 1000),
  why: P("why", "Team discussing strategies around a wooden table with laptops and tablets", 1800, 800),
  cta: P("cta", "Professional team discussing analytics and brainstorming ideas in a meeting room", 700, 700),
};
export const preview = [photos.hero, photos.keyword, photos.audit, photos.round, photos.why];