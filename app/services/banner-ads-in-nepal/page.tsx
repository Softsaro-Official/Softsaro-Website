import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import BnMotion from "@/components/bn/BnMotion";
import BnPage from "@/components/bn/BnPage";

export const metadata: Metadata = {
  title: "Banner Advertising in Nepal | Softsaro",
  description: "Eye-catching banner ads that put your brand in front of the right audience and turn views into customers. Softsaro Nepal, Kathmandu.",
  alternates: { canonical: "/services/banner-ads-in-nepal" },
  openGraph: { title: "Banner Advertising in Nepal | Softsaro", description: "Eye-catching banner ads that turn views into customers.", type: "website" },
};

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <main id="main">
        <BnMotion><BnPage /></BnMotion>
      </main>
      <SiteFooter />
    </>
  );
}