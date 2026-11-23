import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import AdsaroPage from "@/components/adsaro/AdsaroPage";

const title = "Adsaro Nepal High-Performance Ad Platform | Softsaro Portfolio";
const description = "Case study: Softsaro Nepal engineered Adsaro Nepal's ad agency platform with Next.js, a Node.js API layer, ClickHouse analytics and a hardened VPS.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio/adsaro-nepal" },
  openGraph: { type: "website", title, description, url: "/portfolio/adsaro-nepal", images: ["/images/adsaro/hero.webp"] },
};

export default function AdsaroRoute() {
  return <><Navbar b="/" /><AdsaroPage /><SiteFooter /></>;
}