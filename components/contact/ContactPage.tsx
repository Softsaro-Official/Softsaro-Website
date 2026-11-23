'use client';
import { useRef } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { InfoCard } from './ContactUI';
import ContactForm from './ContactForm';
import ContactMotion from './ContactMotion';
import s from './contact.module.css';

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Trade+Tower+Thapathali+Kathmandu';
const EMBED = 'https://www.google.com/maps?q=Trade+Tower+Thapathali+Kathmandu&output=embed';

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  return (
    <main ref={ref} className={s.page}>
      <ContactMotion scope={ref} />
      <div className={s.bg} aria-hidden="true">
        <div className={s.orb + ' ' + s.o1} data-orb />
        <div className={s.orb + ' ' + s.o2} data-orb />
        <div className={s.orb + ' ' + s.o3} data-orb />
        <div className={s.grid} />
        <div className={s.ring} />
        <div className={s.sq} />
        <div className={s.dotf} />
      </div>

      <div className={s.wrap} data-wrap>
        <section className={s.hero}>
          <div>
            <span className={s.eyebrow} data-rise data-eyebrow><i className={s.pulse} /><span data-split="chars" data-delay="0.05">Contact us</span></span>
            <h1 className={s.title} data-split="heading" data-delay="0.1" data-accent-from="6">Tell us what you want to build next.</h1>
            <p className={s.lead} data-split="lines" data-delay="0.45">Share your idea, project scope, or support request. Our team will review it and get back with the next best step.</p>
            <div className={s.cards}>
              <InfoCard index={0} icon={<MapPin size={22} />} label="Visit Us" value="Trade Tower, 5th Floor, Thapathali" href={MAPS} external />
              <InfoCard index={1} icon={<Phone size={22} />} label="Call Us" value="9818439664" href="tel:9818439664" />
              <InfoCard index={2} icon={<Mail size={22} />} label="Email Us" value="info@softsaro.com" href="mailto:info@softsaro.com" />
            </div>
          </div>
          <div className={s.panel} data-rise data-panel>
            <ContactForm />
          </div>
        </section>
      </div>

      <section className={s.mapSec} data-mapsec>
        <div className={s.mapHead} data-rise data-maphead>
          <div>
            <span className={s.eyebrow}><span data-split="chars" data-st="scroll">Find us</span></span>
            <h2 className={s.h2} data-split="heading" data-st="scroll">Visit our office in Thapathali</h2>
          </div>
          <a className={s.dir} href={MAPS} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} /></a>
        </div>
        <div className={s.mapBox} data-map>
          <iframe data-mapin title="Softsaro Nepal office location" src={EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className={s.mapCard} data-rise data-mapcard>
            <strong data-split="lines" data-st="scroll">Softsaro Nepal Private Limited</strong>
            <span data-split="lines" data-st="scroll">Trade Tower, 5th Floor, Thapathali, Kathmandu</span>
          </div>
        </div>
      </section>
    </main>
  );
}