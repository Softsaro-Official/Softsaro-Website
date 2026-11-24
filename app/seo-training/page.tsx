import type { Metadata } from "next";
import { SiteFooter } from "@/components/Site";
import Navbar from "@/components/Navbar";
import SeoTrainingMotion from "@/components/seo-training/SeoTrainingMotion";
import SeoTrainingContent from "@/components/seo-training/SeoTrainingContent";

const description =
  "Practical SEO training from Softsaro Nepal: keyword research, on-page and technical SEO, link building, local SEO, analytics, AEO and GEO fundamentals.";

export const metadata: Metadata = {
  title: "SEO Training in Nepal - Practical SEO Course | Softsaro",
  description,
  openGraph: { type: "website", title: "SEO Training - Master SEO Skills with Practical Training | Softsaro", description },
};

export default function SeoTrainingPage() {
  return (
    <>
      <Navbar b="/" />
      <main>
        <SeoTrainingMotion>
          <SeoTrainingContent />
        </SeoTrainingMotion>
      </main>
      <SiteFooter />
    </>
  );
}