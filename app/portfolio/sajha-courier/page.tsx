import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import SajhaPage from "@/components/sajha/SajhaPage";

const title = "Sajha Courier Website | Softsaro Portfolio";
const description = "Case study: Softsaro Nepal built the Sajha Courier platform \u2014 a fast, reliable parcel tracking and logistics management website.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio/sajha-courier" },
  openGraph: { type: "website", title, description, url: "/portfolio/sajha-courier", images: ["/images/sajha-courier/hero.webp"] },
};

export default function SajhaCourierRoute() {
  return <><Navbar b="/" /><SajhaPage /><SiteFooter /></>;
}