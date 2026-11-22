import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PricingPage from "@/components/pricing/PricingPage";
import PricingSeoExtras from "@/components/pricing/PricingSeoExtras";

export const metadata: Metadata = { title: "Advanced SEO Pricing | Softsaro", description: "Advanced SEO plans from Softsaro." };
export default function Page() { return <><Navbar b="/" /><main><PricingPage service="advanced-seo" /><PricingSeoExtras /></main><SiteFooter /></>; }
