import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import DmpPage from "@/components/DmpPage";

const PATH = "/services/digital-marketing-dubai";
const TITLE = "Digital Marketing in Dubai | Digital Marketing Agency | Softsaro";
const DESC =
  "Softsaro is a digital marketing agency serving businesses in Dubai and the UAE: search, Google Ads, social media, Meta ads, content, email and analytics, with a free consultation before you commit.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://softsaro.com.np"),
  title: TITLE,
  description: DESC,
  keywords: ["digital marketing in Dubai", "digital marketing agency in Dubai", "digital marketing services in Dubai", "online marketing in Dubai", "digital marketing company in Dubai"],
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESC, url: PATH, siteName: "Softsaro", type: "website", locale: "en_AE" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <DmpPage />
      <SiteFooter />
    </>
  );
}