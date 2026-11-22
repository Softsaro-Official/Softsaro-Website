import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import AboutMotion from "@/components/AboutMotion";
import PageReveal from "@/components/PageReveal";
import { SiteFooter } from "@/components/Site";

const description = "Meet Softsaro, a digital team helping ambitious businesses build clearer brands, websites and digital experiences.";
export const metadata: Metadata = { title: "About Us | Softsaro", description, alternates: { canonical: "/about-us" }, openGraph: { type: "website", title: "About Softsaro", description } };
export default function AboutRoute() { return <><Navbar b="/" /><PageReveal><AboutMotion><AboutPage /></AboutMotion></PageReveal><SiteFooter /></>; }