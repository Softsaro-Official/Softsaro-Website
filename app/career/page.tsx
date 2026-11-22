import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CareerPage from "@/components/CareerPage";
import CareerMotion from "@/components/CareerMotion";
import { SiteFooter } from "@/components/Site";

const description = "Build your career with Softsaro. Explore open roles, our hiring process and the culture behind our web, app, design and SEO work.";
export const metadata: Metadata = { title: "Careers | Softsaro", description, alternates: { canonical: "/career" }, openGraph: { type: "website", title: "Careers | Softsaro", description, url: "/career" } };
export default function CareerRoute() { return <><Navbar b="/" /><CareerMotion><CareerPage /></CareerMotion><SiteFooter /></>; }