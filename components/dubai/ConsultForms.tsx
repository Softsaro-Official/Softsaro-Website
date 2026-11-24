"use client";
import { useState } from "react";
import { submitContact } from "@/lib/contact";

const CONTACT = { email: "info@softsaro.com", phone: "+977 9818439664", tel: "tel:+9779818439664" };
const SERVICES = ["Search (SEO)", "Google Ads", "Social media", "Meta Ads (Facebook & Instagram)", "Content", "Email", "Analytics and reporting", "Not sure yet"];
const TYPES = ["Startup or small business", "E-commerce business", "Real estate company", "Hospitality or tourism", "Healthcare or clinic", "Professional services", "Established company", "Other"];

type S = "idle" | "sending" | "sent" | "fallback";

function useSubmit(source: string) {
  const [state, setState] = useState<S>("idle");
  const [mail, setMail] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || "").trim();
    const name = g("name") || g("email").split("@")[0] || "Website visitor";
    const message = [
      `Website: ${g("website") || "-"}`,
      `Service: ${g("service") || "-"}`,
      `Business type: ${g("type") || "-"}`,
      `Location: ${g("location") || "-"}`,
      `Goals: ${g("goals") || "-"}`,
      `Source: ${source}`,
    ].join("\n");
    setState("sending");
    try {
      const r = await submitContact({ name, email: g("email"), phone: g("phone"), message });
      if (r.ok) { setState("sent"); return; }
    } catch {
      /* fall through to email fallback */
    }
    setMail(`mailto:${CONTACT.email}?subject=${encodeURIComponent("Digital marketing consultation request")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${g("email")}\nPhone: ${g("phone")}\n${message}`)}`);
    setState("fallback");
  }
  return { state, mail, submit };
}

function Done({ state, mail }: { state: S; mail: string }) {
  if (state === "sent") return (<div className="dmp-done" role="status"><b>Thank you.</b><p>We received your request and will get back to you.</p></div>);
  return (
    <div className="dmp-done" role="status">
      <b>Almost there.</b>
      <p>Our online form is not connected yet, so please send your details by email or call us.</p>
      <div className="dmp-done-btns"><a className="dmp-btn p" href={mail}><span>Send by email</span></a><a className="dmp-btn o" href={CONTACT.tel}><span>Call {CONTACT.phone}</span></a></div>
    </div>
  );
}

export function ConsultForm() {
  const { state, mail, submit } = useSubmit("Digital Marketing Dubai page, hero form");
  if (state === "sent" || state === "fallback") return <Done state={state} mail={mail} />;
  return (
    <form className="dmp-form" onSubmit={submit}>
      <input name="website" aria-label="Website URL" placeholder="Website URL (https://...)" inputMode="url" autoComplete="url" />
      <input name="email" type="email" required aria-label="Email address" placeholder="Email address" autoComplete="email" />
      <select name="service" aria-label="What do you need?" defaultValue="">
        <option value="" disabled>What do you need?</option>
        {SERVICES.map((s) => (<option key={s} value={s}>{s}</option>))}
      </select>
      <textarea name="goals" rows={3} aria-label="Your goals" placeholder="Your goals, budget range or questions" />
      <button className="dmp-btn p full" type="submit" disabled={state === "sending"}><span>{state === "sending" ? "Sending..." : "Book my free consultation"}</span></button>
      <p className="dmp-form-note">Free consultation &middot; Honest advice &middot; Dubai-friendly call times</p>
    </form>
  );
}

export function ContactForm() {
  const { state, mail, submit } = useSubmit("Digital Marketing Dubai page, contact form");
  if (state === "sent" || state === "fallback") return <Done state={state} mail={mail} />;
  return (
    <form className="dmp-cform" onSubmit={submit}>
      <input name="name" required aria-label="Your name" placeholder="Your name" autoComplete="name" />
      <input name="phone" type="tel" aria-label="Phone number" placeholder="Phone number" autoComplete="tel" />
      <input name="email" type="email" required aria-label="Email address" placeholder="Email address" autoComplete="email" />
      <select name="service" aria-label="Service" defaultValue="">
        <option value="" disabled>What do you need?</option>
        {SERVICES.map((s) => (<option key={s} value={s}>{s}</option>))}
      </select>
      <select name="type" aria-label="Business type" defaultValue="">
        <option value="" disabled>Business type</option>
        {TYPES.map((s) => (<option key={s} value={s}>{s}</option>))}
      </select>
      <input name="location" aria-label="Location" placeholder="Location (Dubai, Abu Dhabi...)" />
      <input className="full" name="website" aria-label="Website" placeholder="Website (if any)" inputMode="url" autoComplete="url" />
      <textarea className="full" name="goals" rows={3} aria-label="Goals" placeholder="Your goals or industry" />
      <button className="dmp-btn p full" type="submit" disabled={state === "sending"}><span>{state === "sending" ? "Sending..." : "Request a call back"}</span></button>
    </form>
  );
}