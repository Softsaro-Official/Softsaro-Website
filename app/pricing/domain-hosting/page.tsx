import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PricingPage from "@/components/pricing/PricingPage";
import PricingExtras from "@/components/pricing/PricingExtras";

export const metadata: Metadata = { title: "Domain & Hosting Pricing | Softsaro", description: "Domain and hosting plans from Softsaro." };
export default function Page() { return <><Navbar b="/" /><main><PricingPage service="domain-hosting" /><PricingExtras /></main><SiteFooter /></>; }