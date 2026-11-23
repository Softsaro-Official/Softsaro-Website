"use client";
import { useState } from "react";
import { Ic } from "./Icons";

export default function DmdFaq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="dmd-faq">
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div className={`dmd-q${on ? " open" : ""}`} key={q}>
            <button type="button" id={`dmd-q-${i}`} aria-expanded={on} aria-controls={`dmd-a-${i}`} onClick={() => setOpen(on ? null : i)}>
              <span>{q}</span><i><Ic n="plus" /></i>
            </button>
            <div className="dmd-a" id={`dmd-a-${i}`} role="region" aria-labelledby={`dmd-q-${i}`}><div><p>{a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}