import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import DaleyPage from "@/components/daley/DaleyPage";

const title = "Daley Bhai Real Estate Website | Softsaro Portfolio";
const description = "Case study: Softsaro Nepal designed and built the Daley Bhai Real Estate website, a structured property listing platform for the Kathmandu Valley.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio/daley-bhai-real-estate" },
  openGraph: { type: "website", title, description, url: "/portfolio/daley-bhai-real-estate", images: ["/images/daley-bhai/hero.webp"] },
};

export default function DaleyBhaiRoute() {
  return <><Navbar b="/" /><DaleyPage /><SiteFooter /></>;
}