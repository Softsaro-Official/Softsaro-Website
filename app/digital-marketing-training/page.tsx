import type { Metadata } from "next";
import { SiteFooter } from "@/components/Site";
import Navbar from "@/components/Navbar";
import DigitalMarketingTrainingMotion from "@/components/digital-marketing-training/DigitalMarketingTrainingMotion";
import DigitalMarketingTrainingContent from "@/components/digital-marketing-training/DigitalMarketingTrainingContent";

const description =
  "Practical digital marketing training from Softsaro Nepal: social media, Facebook & Instagram ads, Google Ads, content, SEO fundamentals, email marketing, strategy and analytics.";

export const metadata: Metadata = {
  title: "Digital Marketing Training in Nepal - Practical Course | Softsaro",
  description,
  alternates: { canonical: "/digital-marketing-training" },
  openGraph: { type: "website", title: "Digital Marketing Training - Learn by Doing | Softsaro", description },
};

export default function DigitalMarketingTrainingPage() {
  return (
    <>
      <Navbar b="/" />
      <main>
        <DigitalMarketingTrainingMotion>
          <DigitalMarketingTrainingContent />
        </DigitalMarketingTrainingMotion>
      </main>
      <SiteFooter />
    </>
  );
}