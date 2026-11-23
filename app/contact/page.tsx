import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/Site";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = { title: "Contact | Softsaro" };

export default function Page() {
  return (
    <>
      <Navbar b="/" />
      <ContactPage />
      <SiteFooter />
    </>
  );
}