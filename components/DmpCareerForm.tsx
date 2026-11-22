"use client";
import { useState } from "react";

const WA = "";
const SERVICES = [
  "SEO", "Digital Marketing", "Social Media Marketing", "Google Ads", "Website Development", "Other",
];

export default function DmpCareerForm() {
  const [sent, setSent] = useState(false);
  const [link, setLink] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) || "").trim();
    if (g("company")) return; // honeypot
    const lines = [
      "Hello Softsaro, I would like a free consultation.",
      "",
      `Name: ${g("name")}`,
      `Phone: ${g("phone")}`,
      `Email: ${g("email")}`,
      `Service: ${g("service")}`,
      `LinkedIn: ${g("linkedin") || "-"}`,
      `Website: ${g("portfolio") || "-"}`,
      "",
      "About my business:",
      g("intro"),
    ];
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    setLink(url);
    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (sent) return (
    <div className="dmp-done" role="status">
      <b>Opening WhatsApp...</b>
      <p>Press send in WhatsApp to deliver your inquiry. If it did not open, use the button below.</p>
      <div className="dmp-done-btns">
        <a className="dmp-btn p" href={link} target="_blank" rel="noopener noreferrer"><span>Open WhatsApp</span></a>
        <button type="button" className="dmp-btn o" onClick={() => setSent(false)}><span>Back to form</span></button>
      </div>
    </div>
  );

  return (
    <form className="dmp-form dmp-ap" onSubmit={submit}>
      <div className="dmp-ap-two">
        <input name="name" required minLength={2} maxLength={100} aria-label="Full name" placeholder="Full name" autoComplete="name" />
        <input name="phone" type="tel" required maxLength={30} aria-label="Phone number" placeholder="Phone number" autoComplete="tel" />
      </div>
      <input name="email" type="email" required maxLength={120} aria-label="Email address" placeholder="Email address" autoComplete="email" />
      <select name="service" required aria-label="Service" defaultValue="">
        <option value="" disabled>Service</option>
        {SERVICES.map((s) => (<option key={s} value={s}>{s}</option>))}
      </select>
      <div className="dmp-ap-two">
        <input name="linkedin" type="url" maxLength={200} aria-label="LinkedIn profile (optional)" placeholder="LinkedIn (optional)" inputMode="url" />
        <input name="portfolio" type="url" maxLength={200} aria-label="Website (optional)" placeholder="Portfolio / website (optional)" inputMode="url" />
      </div>
      <textarea name="intro" required minLength={20} maxLength={1500} rows={3} aria-label="Tell us about your business" placeholder="Tell us about your business" />
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="dmp-sr" />
      <button className="dmp-btn p full" type="submit"><span>Send Inquiry</span></button>
      <p className="dmp-form-note">Free consultation &middot; We reply on WhatsApp</p>
    </form>
  );
}