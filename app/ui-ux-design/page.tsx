import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import UiUxDesignMotion from "@/components/ui-ux-design/UiUxDesignMotion";
import UiUxDesignPage from "@/components/ui-ux-design/UiUxDesignPage";

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
        <UiUxDesignMotion><UiUxDesignPage /></UiUxDesignMotion>
      </main>
      <SiteFooter />
    </>
  );
}