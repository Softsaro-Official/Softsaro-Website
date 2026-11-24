"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { ArrowRight, Check, FileText, RotateCcw, UploadCloud, X } from "lucide-react";
import { GENERAL } from "@/lib/careers";
import { submitApplication } from "@/lib/career";

const MAX_MB = 5;
const OK_EXT = ["pdf", "doc", "docx"];
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const EXPERIENCE = ["Fresher / student", "Less than 1 year", "1 to 2 years", "3 to 5 years", "5+ years"];
const EMAIL = "info@softsaro.com";

type Field = "name" | "email" | "phone" | "position" | "portfolio" | "cv";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "fallback";

const sizeOf = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const normUrl = (v: string) => (/^https?:\/\//i.test(v) ? v : `https://${v}`);
const validUrl = (v: string) => { try { return new URL(normUrl(v)).hostname.includes("."); } catch { return false; } };

function checkCv(file: File | null): string {
  if (!file) return "Please attach your CV. It is required to apply.";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!OK_EXT.includes(ext)) return "Unsupported file type. Please upload a PDF, DOC or DOCX file.";
  if (file.size === 0) return "This file looks empty. Please choose another one.";
  if (file.size > MAX_MB * 1048576) return `This file is too large (${sizeOf(file.size)}). The maximum size is ${MAX_MB} MB.`;
  return "";
}

export default function CareerForm({ roles }: { roles: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState(roles.length === 1 ? roles[0] : "");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [drag, setDrag] = useState(false);
  const [who, setWho] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLElement>("[data-apply-role]");
      if (!link) return;
      const role = link.dataset.applyRole ?? "";
      if (roles.includes(role)) { setPosition(role); setErrors((prev) => ({ ...prev, position: undefined })); }
      setStatus((s) => (s === "sent" || s === "fallback" ? "idle" : s));
      const card = cardRef.current;
      if (card) { card.classList.remove("pulse"); void card.offsetWidth; card.classList.add("pulse"); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [roles]);

  const clear = (key: Field) => setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  function pick(f: File | undefined) {
    if (!f) return;
    const err = checkCv(f);
    if (err) {
      setErrors((prev) => ({ ...prev, cv: err }));
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setErrors((prev) => ({ ...prev, cv: undefined }));
    setFile(f);
  }
  const onFile = (e: ChangeEvent<HTMLInputElement>) => pick(e.target.files?.[0]);
  const onDrop = (e: DragEvent<HTMLLabelElement>) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); };
  const removeFile = () => { setFile(null); if (fileRef.current) fileRef.current.value = ""; };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Errors = {};
    const phone = g("phone");
    const digits = phone.replace(/\D/g, "");
    if (g("name").length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g("email"))) next.email = "Please enter a valid email address.";
    if (!/^[+\d][\d\s\-()]*$/.test(phone) || digits.length < 7 || digits.length > 15) next.phone = "Please enter a valid phone number.";
    if (!position) next.position = "Please select the position you are applying for.";
    if (g("portfolio") && !validUrl(g("portfolio"))) next.portfolio = "Please enter a valid link, for example linkedin.com/in/yourname.";
    const cv = checkCv(file);
    if (cv) next.cv = cv;
    setErrors(next);
    const first = (["name", "email", "phone", "position", "portfolio", "cv"] as Field[]).find((k) => next[k]);
    if (first) { document.getElementById(`cr-${first}`)?.focus(); return; }

    const body = new FormData();
    body.set("name", g("name"));
    body.set("email", g("email"));
    body.set("phone", phone);
    body.set("position", position);
    body.set("experience", g("experience"));
    body.set("portfolio", g("portfolio") ? normUrl(g("portfolio")) : "");
    body.set("message", g("message"));
    body.set("cv", file as File, (file as File).name);
    setStatus("sending");
    setServerMsg("");
    try {
      const r = await submitApplication(body);
      if (r.ok) { setWho(g("name").split(" ")[0]); setStatus("sent"); formRef.current?.reset(); setFile(null); setPosition(roles.length === 1 ? roles[0] : ""); return; }
      if (r.status === 422 && r.message) { setServerMsg(r.message); setStatus("idle"); return; }
    } catch { /* fall through to the email fallback */ }
    const text = [`Name: ${g("name")}`, `Email: ${g("email")}`, `Phone: ${phone}`, `Position: ${position}`, `Experience: ${g("experience") || "-"}`, `Link: ${g("portfolio") || "-"}`, "", g("message"), "", "(Please attach your CV to this email.)"].join("\n");
    setMail(`mailto:${EMAIL}?subject=${encodeURIComponent(`Application: ${position}`)}&body=${encodeURIComponent(text)}`);
    setStatus("fallback");
  }

  const err = (k: Field) => errors[k] && <small className="cr-err" id={`cr-${k}-e`} role="alert">{errors[k]}</small>;
  const inv = (k: Field) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `cr-${k}-e` : undefined }) as const;
  const done = status === "sent" || status === "fallback";

  return <div className="cr-form-card cr-rv" ref={cardRef} onAnimationEnd={(e) => e.currentTarget.classList.remove("pulse")}>
    {status === "sent" && <div className="cr-done" role="status"><span className="cr-done-ic"><Check size={30} /></span><h3>Application received{who ? `, ${who}` : ""}.</h3><p>Thank you for applying to Softsaro. A human will read your application and be in touch.</p><button type="button" className="cr-btn g" onClick={() => setStatus("idle")}><RotateCcw size={16} />Submit another application</button></div>}
    {status === "fallback" && <div className="cr-done" role="status"><span className="cr-done-ic warn"><FileText size={28} /></span><h3>We couldn&rsquo;t send it online</h3><p>Our online application isn&rsquo;t connected right now. Your details are saved in this form &mdash; send them by email and attach your CV.</p><div className="cr-done-btns"><a className="cr-btn p" href={mail}>Send by email <ArrowRight size={16} /></a><button type="button" className="cr-btn g" onClick={() => setStatus("idle")}>Back to the form</button></div></div>}
    <form className="cr-form" ref={formRef} onSubmit={onSubmit} noValidate hidden={done}>
      <label className="cr-f"><span>Full name <em>*</em></span><input id="cr-name" name="name" autoComplete="name" placeholder="Your full name" onChange={() => clear("name")} {...inv("name")} />{err("name")}</label>
      <label className="cr-f"><span>Email <em>*</em></span><input id="cr-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" onChange={() => clear("email")} {...inv("email")} />{err("email")}</label>
      <label className="cr-f"><span>Phone number <em>*</em></span><input id="cr-phone" name="phone" type="tel" autoComplete="tel" placeholder="Contact number" onChange={() => clear("phone")} {...inv("phone")} />{err("phone")}</label>
      <label className="cr-f"><span>Position applying for <em>*</em></span><select id="cr-position" name="position" value={position} onChange={(e) => { setPosition(e.target.value); clear("position"); }} {...inv("position")}><option value="" disabled>Select a position</option>{roles.map((r) => <option key={r} value={r}>{r}</option>)}</select>{err("position")}</label>
      <label className="cr-f"><span>Experience</span><select name="experience" defaultValue=""><option value="">Select experience</option>{EXPERIENCE.map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
      <label className="cr-f"><span>Portfolio / LinkedIn URL</span><input id="cr-portfolio" name="portfolio" inputMode="url" autoComplete="url" placeholder="linkedin.com/in/yourname" onChange={() => clear("portfolio")} {...inv("portfolio")} />{err("portfolio")}</label>
      <label className="cr-f full"><span>Short introduction</span><textarea name="message" rows={4} placeholder="Tell us a little about yourself and what you want to work on" /></label>
      <div className="cr-f full">
        <span>CV / Resume <em>*</em></span>
        {file ? <div className="cr-file-chip"><FileText size={20} /><span className="cr-file-name"><b>{file.name}</b><small>{sizeOf(file.size)}</small></span><label className="cr-chip-btn" htmlFor="cr-cv">Change</label><button type="button" className="cr-chip-x" onClick={removeFile} aria-label="Remove file"><X size={16} /></button></div>
          : <label className={`cr-drop${drag ? " drag" : ""}${errors.cv ? " bad" : ""}`} htmlFor="cr-cv" onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop}><UploadCloud size={26} />{drag ? <b>Release to upload your CV</b> : <b>Drop your CV here or <u>browse</u></b>}<small>PDF, DOC or DOCX &middot; up to {MAX_MB} MB</small></label>}
        <input id="cr-cv" ref={fileRef} className="cr-file" type="file" accept={ACCEPT} onChange={onFile} {...inv("cv")} />
        {err("cv")}
      </div>
      {serverMsg && <p className="cr-err full" role="alert">{serverMsg}</p>}
      <button className="cr-btn p cr-submit full" type="submit" disabled={status === "sending"}>{status === "sending" ? <><i className="cr-spin" />Sending...</> : <>Submit application <ArrowRight size={17} /></>}</button>
    </form>
  </div>;
}