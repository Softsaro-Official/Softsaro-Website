'use client';
import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import s from './contact.module.css';

const GAP = 32;

function calibrate(root: HTMLElement): void {
  const wrap = root.querySelector<HTMLElement>('[data-wrap]');
  if (!wrap) return;
  wrap.style.setProperty('--shift', '0px');
  let navBottom = 0;
  document.querySelectorAll<HTMLElement>('header, nav').forEach((el) => {
    if (el.closest('footer') || root.contains(el)) return;
    const cs = getComputedStyle(el);
    const h = el.offsetHeight;
    if (h < 40 || h > 160) return;
    if (cs.position === 'fixed' || cs.position === 'sticky') {
      const top = parseFloat(cs.top) || 0;
      if (top > 40) return;
      navBottom = Math.max(navBottom, top + h);
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top > 40) return;
      navBottom = Math.max(navBottom, top + h);
    }
  });
  if (!navBottom) return;
  const padTop = parseFloat(getComputedStyle(wrap).paddingTop) || 0;
  const eyebrowTop = wrap.getBoundingClientRect().top + window.scrollY + padTop;
  const shift = Math.max(-400, Math.min(200, navBottom + GAP - eyebrowTop));
  wrap.style.setProperty('--shift', shift + 'px');
}

export default function ContactMotion({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    calibrate(root);
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { calibrate(root); ScrollTrigger.refresh(); });
    };
    window.addEventListener('resize', onResize);
    const late = window.setTimeout(onResize, 500);
    const cleanup = () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(late);
      cancelAnimationFrame(raf);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(root.querySelectorAll('[data-rise]'), { opacity: 1 });
      gsap.set(root.querySelectorAll('[data-split]'), { visibility: 'visible' });
      return cleanup;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        const mode = el.dataset.split || 'lines';
        const delay = parseFloat(el.dataset.delay || '0');
        const onScroll = el.dataset.st === 'scroll';
        const accent = el.dataset.accentFrom ? parseInt(el.dataset.accentFrom, 10) : -1;
        SplitText.create(el, {
          type: mode === 'chars' ? 'chars' : mode === 'lines' ? 'lines' : 'lines,words',
          mask: mode === 'chars' ? 'chars' : 'lines',
          linesClass: 'cx-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            if (accent >= 0) {
              self.words.forEach((w, i) => { if (i >= accent) w.classList.add(s.acc); });
            }
            const common: gsap.TweenVars = onScroll
              ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
              : { delay };
            if (mode === 'chars') {
              return gsap.from(self.chars, { yPercent: 115, duration: 0.8, ease: 'expo.out', stagger: 0.025, ...common });
            }
            if (mode === 'heading') {
              return gsap.from(self.words, { yPercent: 118, rotate: 6, transformOrigin: '0% 100%', duration: 1.1, ease: 'expo.out', stagger: 0.07, ...common });
            }
            return gsap.from(self.lines, { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.09, ...common });
          },
        });
      });

      const tl = gsap.timeline({ delay: 0.05, defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-eyebrow]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('[data-card]', { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, clearProps: 'transform' }, '-=0.1')
        .fromTo('[data-panel]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, clearProps: 'transform' }, '-=0.9')
        .fromTo('[data-field]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, clearProps: 'transform' }, '-=0.6');

      gsap.utils.toArray<HTMLElement>('[data-orb]').forEach((el, i) => {
        gsap.to(el, { yPercent: i % 2 ? -25 : 25, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true } });
      });

      gsap.fromTo('[data-maphead]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '[data-mapsec]', start: 'top 82%' } });
      gsap.fromTo('[data-map]', { clipPath: 'inset(14% 10% 14% 10% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: '[data-map]', start: 'top 95%', end: 'top 35%', scrub: 0.6 } });
      gsap.fromTo('[data-mapin]', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-map]', start: 'top 95%', end: 'top 35%', scrub: 0.6 } });
      gsap.fromTo('[data-mapcard]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-map]', start: 'top 55%' } });
    }, root);

    return () => { cleanup(); ctx.revert(); };
  }, [scope]);
  return null;
}