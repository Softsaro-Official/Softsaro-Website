import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import UxMotion from "@/components/ux/UxMotion";
import UxPage from "@/components/ux/UxPage";

export const metadata: Metadata = {
  title: "UI/UX Design in Nepal | Softsaro",
  description: "Research-led UI/UX design for websites, mobile apps and dashboards. Softsaro designs interfaces people love to use.",
  alternates: { canonical: "/ui-ux-design" },
  openGraph: { title: "UI/UX Design in Nepal | Softsaro", description: "Research-led UI/UX design for websites, mobile apps and dashboards.", type: "website" },
};

const ld = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UI/UX Design",
  provider: { "@type": "Organization", name: "Softsaro", url: "https://softsaro.com.np" },
  areaServed: "Nepal",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Navbar b="/" />
      <main id="main">
        <UxMotion><UxPage /></UxMotion>
      </main>
      <SiteFooter />
    </>
  );
}