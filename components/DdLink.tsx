"use client";
import Link from "next/link";
import type { ReactNode } from "react";

/** Dropdown item using next/link. Closes the (CSS-hover) dropdown after selection, until the pointer leaves it. */
export default function DdLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      onClick={() => {
        const h = document.documentElement;
        h.classList.add("dd-lock");
        const off = (e: MouseEvent) => {
          if (!(e.target as Element | null)?.closest(".dd")) {
            h.classList.remove("dd-lock");
            document.removeEventListener("mouseover", off);
          }
        };
        document.addEventListener("mouseover", off);
      }}
    >
      {children}
    </Link>
  );
}
