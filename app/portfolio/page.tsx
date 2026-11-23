import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import "./portfolio.css";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", variable: "--pf-serif" });

export const metadata: Metadata = {
  title: "Portfolio | Web, App, Graphics, SEO & Digital Marketing Projects | Softsaro",
  description: "Explore recent Softsaro projects across website development, mobile apps, graphics design, SEO and digital marketing for businesses in Nepal and beyond.",
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Softsaro Portfolio", description: "Recent web, app, design and marketing projects by Softsaro.", url: "/portfolio", type: "website" },
};

/* project screenshots you add to public/images/portfolio/<slug>.(jpg|png|webp) are picked up automatically */
function localImages(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    fs.readdirSync(path.join(process.cwd(), "public", "images", "portfolio")).forEach((f) => {
      const m = f.match(/^(.+)\.(jpe?g|png|webp|avif)$/i);
      if (m) out[m[1].toLowerCase()] = `/images/portfolio/${f}`;
    });
  } catch { /* folder not created yet */ }
  return out;
}

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <div className={serif.variable}><PortfolioClient images={localImages()} /></div>
      <SiteFooter />
    </>
  );
}