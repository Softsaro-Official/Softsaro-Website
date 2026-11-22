import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import PricingPage from "@/components/pricing/PricingPage";

export const metadata: Metadata = { title: "UI/UX Design Pricing | Softsaro", description: "UI and UX design plans from Softsaro." };
export default function Page() { return <><Navbar b="/" /><main><PricingPage service="ui-ux-design" /></main><SiteFooter /></>; }
