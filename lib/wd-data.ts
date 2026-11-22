const S = "https://softsaro.com.np";
export const contactHref = `${S}/contact`;
export const phone = "9818439664";
export const email = "info@softsaro.com";

export const builds = [
  ["Globe", "WordPress Website", "Responsive, SEO-friendly and secure, with content you can update yourself, no developer needed.", ["CMS", "SEO-ready"]],
  ["LayoutTemplate", "Static Business Website", "Fast, professional and clear. Built for businesses that do not need frequent changes.", ["Fast", "Clear messaging"]],
  ["Database", "Dynamic Website with Admin Panel", "Manage pages, listings and media from your own admin panel.", ["Admin panel", "Listings"]],
  ["AppWindow", "Full-Stack Custom Web App", "Dashboards, booking systems, portals and user management, with API and payment integrations.", ["Dashboards", "Integrations"]],
] as const;

export const audiences = [
  "E-commerce", "News & content", "Tours & travel", "Education & LMS",
  "Finance & cooperatives", "Manufacturing & trading", "Job portals", "SMEs & small business",
];

export const expertise = [
  ["UI/UX Design", "Clear layouts and navigation built around how visitors really use the site."],
  ["Responsive Development", "Sharp, usable pages on phones, tablets and desktops."],
  ["Frontend", "Clean, accessible HTML, CSS and JavaScript with React and Next.js."],
  ["Backend", "Secure PHP, Laravel and Node.js back ends, APIs and databases."],
  ["CMS", "WordPress and custom admin panels your team can run."],
  ["Performance Optimisation", "Fast loading, optimised images and an SEO-ready structure."],
] as const;

export const steps = [
  ["Discover", "We learn your goals, audience and requirements."],
  ["Design", "User-centred layouts and prototypes you approve before we build."],
  ["Develop", "Clean, SEO-ready code with modern technologies."],
  ["Test", "Browser, device and speed checks before anything goes live."],
  ["Launch", "Go-live, then support, monitoring and handover."],
] as const;

export const why = [
  ["One team, start to finish", "Design, development, SEO and hosting under one roof."],
  ["Modern, maintainable code", "Built so your site is easy to update and extend."],
  ["SEO-ready by default", "Clean structure, speed and mobile-friendly pages from day one."],
  ["Support after launch", "You keep working with the team that built your site."],
] as const;

export const tech = ["React", "Next.js", "Laravel", "PHP", "WordPress", "Node.js", "JavaScript", "HTML5", "CSS3"];

export const faqs = [
  ["How much does a website cost?", "It depends on the pages, features and integrations you need. Tell us about your project and we will give you a clear quote."],
  ["How long does it take?", "Timing depends on scope. A simple business site and a custom web app are very different projects, so we agree a timeline with you once the requirements are clear."],
  ["Can you build on WordPress?", "Yes. We build WordPress sites you can update yourself, and custom builds when a project needs more than a CMS."],
  ["Will my website be SEO-friendly?", "Yes. We build with clean structure, fast loading and mobile-friendly layouts. Rankings depend on many factors, so we do not promise positions."],
  ["Can you redesign my existing website?", "Yes. We can refresh the design, improve speed and structure, and keep what already works."],
  ["Where are you located?", "Trade Tower, 5th Floor, Thapathali, Kathmandu. We also have a USA office and work with clients online."],
] as const;