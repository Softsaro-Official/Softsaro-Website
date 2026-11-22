"use client";
import { useState } from "react";

export default function DmdFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="dmd-faq">
      {items.map((f, i) => (
        <li key={f.q} className={`dmd-fqi${open === i ? " open" : ""}`}>
          <button type="button" id={`dmd-fq-${i}`} aria-expanded={open === i} aria-controls={`dmd-fa-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <i aria-hidden="true" />
          </button>
          <div id={`dmd-fa-${i}`} role="region" aria-labelledby={`dmd-fq-${i}`} className="dmd-fa">
            <div><p>{f.a}</p></div>
          </div>
        </li>
      ))}
    </ul>
  );
}