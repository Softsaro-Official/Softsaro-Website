import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PricingPage from "@/components/pricing/PricingPage";

export const metadata: Metadata = { title: "Website Development Pricing | Softsaro", description: "Website development plans from Softsaro." };
export default function Page() { return <><Navbar b="/" /><main><PricingPage service="web-development" /></main><SiteFooter /></>; }
