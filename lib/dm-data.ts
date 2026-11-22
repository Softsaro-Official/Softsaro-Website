import { Share2, Megaphone, MousePointerClick, PenTool, Search, Mail, Compass, BarChart3 } from "lucide-react";

/** Local photos (Pexels, free licence) saved to /public/assets/dm by dm-visual.ps1. */
const P = (n: string, alt: string, w: number, h: number) => ({ src: `/assets/dm/${n}.jpg`, alt, w, h });
export const photos = {
  team: P("team", "Diverse team collaborating on digital marketing strategy at a desk with laptops and tablets", 900, 1100),
  huddle: P("huddle", "Marketing team discussing global campaign strategy with charts on a laptop", 600, 600),
  band: P("band", "Overhead view of a team discussing digital marketing strategy with laptops and charts", 1800, 1000),
  strategy: P("strategy", "Multicultural team discussing analytics and marketing strategy in a modern office", 900, 900),
  analytics: P("analytics", "Colleagues reviewing data trends and campaign results on a laptop", 900, 500),
  brainstorm: P("brainstorm", "Young professionals brainstorming marketing ideas together in an office", 900, 1000),
  devices: P("devices", "Team working with laptops, devices and charts in a modern office", 700, 560),
  review: P("review", "Team collaborating on business strategy around a laptop showing global analytics", 900, 1100),
  celebrate: P("celebrate", "Colleagues celebrating success in a digital marketing office", 700, 700),
};

export const topics = [
  { Icon: Share2, t: "Social Media Marketing", d: "Plan, post and grow your channels.", area: "soc", tone: "purple" },
  { Icon: Megaphone, t: "Facebook & Instagram Ads", d: "Build and manage Meta ad campaigns.", area: "ads", tone: "light" },
  { Icon: MousePointerClick, t: "Google Ads", d: "Search ads and keyword targeting.", area: "goo", tone: "ink" },
  { Icon: PenTool, t: "Content Marketing", d: "Create content people want to read.", area: "con", tone: "light" },
  { Icon: Search, t: "SEO Fundamentals", d: "How search works and how to show up.", area: "seo", tone: "light" },
  { Icon: Mail, t: "Email Marketing", d: "Campaigns, lists and follow-ups.", area: "mai", tone: "purple" },
  { Icon: Compass, t: "Digital Marketing Strategy", d: "Connect every channel to a clear goal.", area: "str", tone: "photo", photo: "strategy" },
  { Icon: BarChart3, t: "Analytics & Campaign Performance", d: "Read the data and improve.", area: "ana", tone: "photo", photo: "analytics" },
] as const;

export const practise = ["Social media content plan", "Ad campaign setup", "Email campaign draft", "Content calendar", "Campaign performance report", "Simple marketing strategy"];

export const tools = ["Meta Business Suite", "Meta Ads Manager", "Google Ads", "Google Analytics", "Google Search Console", "Canva", "Mailchimp", "Looker Studio", "Google Trends", "WordPress"];

export const why = [
  ["Real agency experience", "Softsaro runs digital marketing for real businesses."],
  ["Practical approach", "Campaigns and reports, not just theory."],
  ["Beginner friendly", "Start from the basics and build up."],
  ["Experienced guidance", "Learn from the team behind our marketing work."],
];

export const faqs = [
  ["Who is this training for?", "Students, job seekers, business owners and marketers who want to apply digital marketing."],
  ["Do I need prior experience?", "No. It starts with the fundamentals and builds up step by step."],
  ["Will there be practical sessions?", "Yes. You work on campaign planning, content, ads, email and reporting."],
  ["Can you guarantee results?", "No. No one honestly can. You learn proven methods and how to measure progress."],
  ["What about duration, fees and schedule?", "These are being confirmed. Contact the Softsaro team for the latest details."],
];