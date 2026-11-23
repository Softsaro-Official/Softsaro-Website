import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import DmdPage from "@/components/dmd/DmdPage";
import "./dmd.css";

const title = "Digital Marketing in Dubai | Digital Marketing Agency & Services | Softsaro";
const description =
  "Softsaro is a digital marketing company serving Dubai and the UAE: social media, Google Ads, Facebook and Instagram advertising, content and email marketing, lead generation and clear analytics reporting.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Digital Marketing in Dubai", "Digital Marketing Agency in Dubai", "Digital Marketing Services in Dubai", "Online Marketing in Dubai", "Digital Marketing Company in Dubai"],
  alternates: { canonical: "/services/digital-marketing-dubai" },
  openGraph: { title, description, url: "/services/digital-marketing-dubai", type: "website", siteName: "Softsaro" },
};

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <DmdPage />
      <SiteFooter />
    </>
  );
}