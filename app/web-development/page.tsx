import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import WxMotion from "@/components/wx/WxMotion";
import WxPage from "@/components/wx/WxPage";

const description =
  "Website design and development in Nepal by Softsaro: WordPress, business websites, dynamic sites with admin panels and custom web apps. Fast, secure, mobile-friendly and SEO-ready.";

export const metadata: Metadata = {
  title: "Website Design & Development in Nepal | Softsaro",
  description,
  alternates: { canonical: "/web-development" },
  openGraph: { type: "website", title: "Website Design & Development | Softsaro Nepal", description, url: "/web-development" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Design and Development",
  provider: { "@type": "Organization", name: "Softsaro", url: "https://softsaro.com.np" },
  areaServed: "Nepal",
  description,
};

export default function WebDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar b="/" />
      <main id="main">
        <WxMotion>
          <WxPage />
        </WxMotion>
      </main>
      <SiteFooter />
    </>
  );
}