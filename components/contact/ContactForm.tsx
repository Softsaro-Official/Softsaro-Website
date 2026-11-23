'use client';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Magnetic } from './ContactUI';
import s from './contact.module.css';

type V = { name: string; email: string; phone: string; subject: string; message: string };
type Status = 'idle' | 'sending' | 'success' | 'error';
const EMPTY: V = { name: '', email: '', phone: '', subject: '', message: '' };

function validate(v: V) {
  const e: Partial<V> = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.';
  if (v.phone && !/^[0-9+()\-\s]{7,18}$/.test(v.phone)) e.phone = 'Enter a valid phone number.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).';
  return e;
}

const TOP: { k: keyof V; l: string; p: string; t: string; ac: string }[] = [
  { k: 'name', l: 'Name', p: 'Your name', t: 'text', ac: 'name' },
  { k: 'email', l: 'Email', p: 'you@example.com', t: 'email', ac: 'email' },
  { k: 'phone', l: 'Phone', p: 'Contact number', t: 'tel', ac: 'tel' },
  { k: 'subject', l: 'Subject', p: 'Project inquiry', t: 'text', ac: 'off' },
];

const DOTS = Array.from({ length: 12 }, (_, i) => i);

export default function ContactForm() {
  const [v, setV] = useState<V>(EMPTY);
  const [errors, setErrors] = useState<Partial<V>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [fail, setFail] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const set = (k: keyof V, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const er = validate(v);
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    timer.current = setTimeout(() => setStatus(fail ? 'error' : 'success'), 1500);
  };

  const reset = () => { setV(EMPTY); setErrors({}); setStatus('idle'); };

  const field = (f: (typeof TOP)[number]) => (
    <div key={f.k} data-field data-rise className={s.field + (errors[f.k] ? ' ' + s.err : '')}>
      <label htmlFor={'c-' + f.k}>{f.l}</label>
      <input
        id={'c-' + f.k}
        className={s.input}
        type={f.t}
        value={v[f.k]}
        placeholder={f.p}
        autoComplete={f.ac}
        aria-invalid={!!errors[f.k]}
        aria-describedby={errors[f.k] ? 'e-' + f.k : undefined}
        onChange={(ev) => set(f.k, ev.target.value)}
      />
      <AnimatePresence>
        {errors[f.k] && (
          <motion.div id={'e-' + f.k} className={s.emsg} initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {errors[f.k]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.div key="ok" className={s.success} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <div className={s.burst} aria-hidden="true">
            {DOTS.map((i) => (
              <motion.span
                key={i}
                className={s.bd}
                style={{ background: i % 2 ? '#6a67ae' : '#8fa4e6' }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: Math.cos((i * 30 * Math.PI) / 180) * 90, y: Math.sin((i * 30 * Math.PI) / 180) * 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              />
            ))}
          </div>
          <motion.span className={s.tick} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
            <CheckCircle2 size={64} strokeWidth={1.6} />
          </motion.span>
          <div className={s.sh}>Message sent</div>
          <p className={s.sp}>Thanks, {v.name.trim().split(' ')[0]}. This is a demo, so nothing was actually delivered. A real submission would reach our team within one business day.</p>
          <Magnetic><button type="button" className={s.btn} onClick={reset}>Send another message</button></Magnetic>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <div className={s.ptag}>Get in touch</div>
          <h2 className={s.ptitle}>Send a Message</h2>
          <div className={s.row}>{field(TOP[0])}{field(TOP[1])}</div>
          <div className={s.row}>{field(TOP[2])}{field(TOP[3])}</div>
          <div data-field data-rise className={s.field + (errors.message ? ' ' + s.err : '')}>
            <label htmlFor="c-message">Message</label>
            <textarea id="c-message" className={s.input} value={v.message} placeholder="Tell us about your requirements" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-message' : undefined} onChange={(ev) => set('message', ev.target.value)} />
            <AnimatePresence>
              {errors.message && (
                <motion.div id="e-message" className={s.emsg} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  {errors.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {status === 'error' && (
              <motion.div role="alert" className={s.bannerErr} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AlertCircle size={18} style={{ flex: 'none', marginTop: 2 }} />
                <span>Something went wrong (demo error). Please try again, or call us on 9818439664.</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div data-field data-rise className={s.foot}>
            <span className={s.note}>We usually respond within one business day.</span>
            <Magnetic>
              <button type="submit" className={s.btn} disabled={status === 'sending'}>
                {status === 'sending' ? (<><Loader2 size={18} className={s.spin} /> Sending...</>) : (<>{status === 'error' ? 'Try again' : 'Send Message'} <ArrowRight size={18} className={s.arrow} /></>)}
              </button>
            </Magnetic>
          </div>
          <button type="button" className={s.demo} onClick={() => setFail((f) => !f)}>
            Demo: next submit will {fail ? 'fail' : 'succeed'} (click to switch)
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}