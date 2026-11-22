"use client";
import { useState } from "react";
import { submitContact } from "@/lib/contact";

const TYPES = ["Startup or small business", "E-commerce business", "Real estate company", "Hospitality or tourism", "Healthcare or professional services", "Established company", "Other"];
const INTERESTS = ["Social Media Marketing", "Google Ads & PPC", "Facebook & Instagram Advertising", "Content Marketing", "Email Marketing", "Digital Marketing Strategy", "Lead Generation", "Performance Marketing & Analytics", "Not sure yet"];

export default function DmdForm({ email, phone, tel }: { email: string; phone: string; tel: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [mail, setMail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || "").trim();
    const message = [
      `Website: ${g("website") || "-"}`,
      `Business type: ${g("type") || "-"}`,
      `Service interest: ${g("interest") || "-"}`,
      `Goals: ${g("need") || "-"}`,
      "Source: Digital Marketing landing page (Dubai / UAE)",
    ].join("\n");
    setState("sending");
    try {
      const r = await submitContact({ name: g("name"), email: g("email"), phone: g("phone"), message });
      if (r.ok) { setState("sent"); return; }
    } catch {
      /* fall through to the email fallback */
    }
    setMail(`mailto:${email}?subject=${encodeURIComponent("Digital marketing consultation request")}&body=${encodeURIComponent(`Name: ${g("name")}\nEmail: ${g("email")}\nPhone: ${g("phone")}\n${message}`)}`);
    setState("fallback");
  }

  if (state === "sent")
    return (<div className="dmd-done" role="status"><b>Thank you.</b><p>We received your request and will get back to you.</p></div>);
  if (state === "fallback")
    return (
      <div className="dmd-done" role="status">
        <b>Almost there.</b>
        <p>Our online form is not connected yet, so please send your details by email or call us.</p>
        <div className="dmd-done-btns"><a className="dmd-btn p" href={mail}><span>Send by email</span></a><a className="dmd-btn o" href={tel}><span>Call {phone}</span></a></div>
      </div>
    );

  return (
    <form className="dmd-form" onSubmit={onSubmit}>
      <label className="dmd-f"><span>Name</span><input name="name" required autoComplete="name" /></label>
      <label className="dmd-f"><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label className="dmd-f"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="dmd-f"><span>Website (if any)</span><input name="website" inputMode="url" autoComplete="url" /></label>
      <label className="dmd-f"><span>Business type</span>
        <select name="type" defaultValue=""><option value="" disabled>Select one</option>{TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}</select>
      </label>
      <label className="dmd-f"><span>Service interest</span>
        <select name="interest" defaultValue=""><option value="" disabled>Select one</option>{INTERESTS.map((t) => (<option key={t} value={t}>{t}</option>))}</select>
      </label>
      <label className="dmd-f full"><span>Your marketing goals</span><textarea name="need" rows={4} /></label>
      <button className="dmd-btn p full" type="submit" disabled={state === "sending"}><span>{state === "sending" ? "Sending..." : "Book a free consultation"}</span></button>
    </form>
  );
}