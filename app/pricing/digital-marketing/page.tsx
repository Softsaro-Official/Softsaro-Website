import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PricingPage from "@/components/pricing/PricingPage";
import PricingDmExtras from "@/components/pricing/PricingDmExtras";

export const metadata: Metadata = { title: "Digital Marketing Pricing | Softsaro", description: "Monthly digital marketing plans from Softsaro." };
export default function Page() { return <><Navbar b="/" /><main><PricingPage service="digital-marketing" /><PricingDmExtras /></main><SiteFooter /></>; }
