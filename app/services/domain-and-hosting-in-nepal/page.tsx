import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import DomainHostingPage from "@/components/domain-hosting/DomainHostingPage";

export const metadata: Metadata = {
  title: "Domain and Hosting in Nepal | Softsaro",
  description:
    "Softsaro registers your domain, hosts your website and keeps it running smoothly: domain registration, VPS and cloud hosting, WordPress and ecommerce hosting, business email, SSL, migration, backups and support.",
};

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <DomainHostingPage />
      <SiteFooter />
    </>
  );
}