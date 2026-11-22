// Editable content for /services/digital-marketing-dubai
export const CONTACT = {
  phone: "+977 9818439664",
  tel: "tel:+9779818439664",
  email: "info@softsaro.com",
  address: "Trade Tower, 5th Floor, Thapathali, Kathmandu",
};

/** Packages are consultation-based. Set price (e.g. "AED 1,000") and unit (e.g. "/month") only when approved. */
export const PACKAGES: { name: string; blurb: string; points: string[]; price: string | null; unit: string }[] = [
  {
    name: "Starter Marketing",
    blurb: "For businesses getting started with digital marketing.",
    points: ["Goal setting and channel recommendation", "Focus on one or two core channels", "Basic tracking and monthly reporting"],
    price: null,
    unit: "",
  },
  {
    name: "Growth Marketing",
    blurb: "For businesses ready to scale their results.",
    points: ["Multi-channel campaigns", "Paid advertising and content working together", "Ongoing optimization and reporting"],
    price: null,
    unit: "",
  },
  {
    name: "Complete Digital Marketing",
    blurb: "A full digital marketing partnership.",
    points: ["Strategy across every channel", "Social, paid, content and email", "Analytics, conversion optimization and regular reviews"],
    price: null,
    unit: "",
  },
];