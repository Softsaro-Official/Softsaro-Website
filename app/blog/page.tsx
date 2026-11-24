import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogPage from "@/components/blog/BlogPage";
import BlogMotion from "@/components/blog/BlogMotion";
import { SiteFooter } from "@/components/Site";

const description = "Ideas on web development, UI/UX design, SEO and digital growth from the Softsaro team.";
export const metadata: Metadata = { title: "Insights & Blog | Softsaro", description, alternates: { canonical: "/blog" }, openGraph: { type: "website", title: "Insights & Blog | Softsaro", description, url: "/blog" } };
export default function BlogRoute() { return <><Navbar b="/" /><BlogMotion><BlogPage /></BlogMotion><SiteFooter /></>; }
