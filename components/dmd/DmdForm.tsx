"use client";
import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/contact";

const TYPES = ["Startup or small business", "E-commerce", "Real estate", "Hospitality and tourism", "Healthcare or professional services", "Established company", "Other"];

export default function DmdForm({ email, phone, tel }: { email: string; phone: string; tel: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [mail, setMail] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const message = ["Digital marketing enquiry (Dubai)", `Business type: ${g("type") || "-"}`, `Website: ${g("website") || "-"}`, `What they need: ${g("need") || "-"}`].join("\n");
    setState("sending");
    let ok = false;
    try { ok = (await submitContact({ name: g("name"), email: g("email"), phone: g("phone") || undefined, message })).ok; } catch { ok = false; }
    if (ok) { form.reset(); setState("sent"); return; }
    const body = `Name: ${g("name")}\nEmail: ${g("email")}\nPhone: ${g("phone") || "-"}\n\n${message}`;
    setMail(`mailto:${email}?subject=${encodeURIComponent("Digital marketing enquiry (Dubai)")}&body=${encodeURIComponent(body)}`);
    setState("fallback");
  }

  return (
    <form className="dmd-form" onSubmit={onSubmit} id="dmd-form">
      <label><span>Name</span><input name="name" required autoComplete="name" /></label>
      <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label><span>Website (if any)</span><input name="website" inputMode="url" autoComplete="url" /></label>
      <label className="full"><span>Business type</span>
        <select name="type" defaultValue=""><option value="" disabled>Select one</option>{TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select>
      </label>
      <label className="full"><span>What would you like to achieve?</span><textarea name="need" rows={4} placeholder="Goals, channels you are considering, or questions" /></label>
      <button className="dmd-btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Book a consultation"}</button>
      <div className="dmd-status" aria-live="polite">
        {state === "sent" && <p>Thank you. We have received your enquiry and will get back to you shortly.</p>}
        {state === "fallback" && <p>We could not send this online right now. <a href={mail}>Email your enquiry</a> or call <a href={`tel:${tel}`}>{phone}</a>.</p>}
      </div>
    </form>
  );
}