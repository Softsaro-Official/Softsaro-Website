import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogArticle from "@/components/blog/BlogArticle";
import PageReveal from "@/components/PageReveal";
import { SiteFooter } from "@/components/Site";

const title = "The practical guide to a website that earns its keep | Softsaro";
const description = "A practical guide to creating a business website that drives clarity, confidence and action.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/blog/a-website-that-earns-its-keep" }, openGraph: { type: "article", title, description } };
export default function ArticleRoute() { return <><Navbar b="/" /><PageReveal><BlogArticle /></PageReveal><SiteFooter /></>; }
