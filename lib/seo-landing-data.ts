// Editable content for the SEO landing page (/services/seo-expert-dubai).
export const CONTACT = {
  phone: "+977 9818439664",
  tel: "tel:+9779818439664",
  email: "info@softsaro.com",
  address: "Trade Tower, 5th Floor, Thapathali, Kathmandu",
};

/**
 * REAL RESULTS: fill these in with approved Search Console numbers to replace the illustrative placeholders.
 * value: null  -> the dashboard shows an "Illustrative" placeholder (nothing is presented as a real result).
 * series: number[] (e.g. weekly clicks) -> draws your real curve instead of the sample curve.
 */
export const RESULTS: {
  source: string;
  period: string;
  metrics: { label: string; value: number | null; suffix?: string }[];
  series: number[] | null;
} = {
  source: "",
  period: "",
  metrics: [
    { label: "Organic clicks", value: null },
    { label: "Impressions", value: null },
    { label: "Average CTR", value: null, suffix: "%" },
    { label: "Average position", value: null },
  ],
  series: null,
};

/** PRICING: price: null shows "Custom quote". Set price (e.g. "AED 500") and unit (e.g. "/mo") only when approved. */
export const PRICING: { name: string; blurb: string; points: string[]; price: string | null; unit: string }[] = [
  {
    name: "SEO audit & roadmap",
    blurb: "A technical and content review of your site, with a prioritized plan.",
    points: ["Technical and on-page review", "Keyword and content opportunities", "Clear next steps"],
    price: null,
    unit: "",
  },
  {
    name: "Ongoing SEO",
    blurb: "Monthly optimization and reporting to keep improving your visibility.",
    points: ["Technical and on-page work", "Content and local SEO", "Reporting from Search Console and Analytics"],
    price: null,
    unit: "",
  },
  {
    name: "SEO + AI search",
    blurb: "Adds AEO and GEO work so AI tools can understand and cite your business.",
    points: ["Everything in ongoing SEO", "FAQ and structured content for AEO", "Entity and topical signals for GEO"],
    price: null,
    unit: "",
  },
];