import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageReveal from "@/components/PageReveal";
import { SiteFooter } from "@/components/Site";
import TeamSection from "@/components/TeamSection";

const description = "Meet the Softsaro team: strategists, designers, developers and growth specialists building useful digital work.";
export const metadata: Metadata = { title: "Our Team | Softsaro", description, alternates: { canonical: "/our-team" }, openGraph: { type: "website", title: "Our Team | Softsaro", description } };
export default function OurTeamRoute() {
  return (
    <>
      <Navbar b="/" />
      <PageReveal>
        <TeamSection />
      </PageReveal>
      <SiteFooter />
    </>
  );
}