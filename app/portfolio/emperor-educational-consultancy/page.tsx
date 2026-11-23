import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import EmperorPage from "@/components/emperor/EmperorPage";

const title = "Emperor Educational Consultancy Website & Mobile App | Softsaro Portfolio";
const description = "Case study: Softsaro Nepal designed and built Emperor Educational Consultancy's website and React Native mobile app for study abroad, test preparation and visa guidance.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio/emperor-educational-consultancy" },
  openGraph: { type: "website", title, description, url: "/portfolio/emperor-educational-consultancy", images: ["/images/emperor/hero.webp"] },
};

export default function EmperorRoute() {
  return <><Navbar b="/" /><EmperorPage /><SiteFooter /></>;
}