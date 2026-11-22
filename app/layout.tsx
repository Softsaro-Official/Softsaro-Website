import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GsapCursor from "@/components/GsapCursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const INTRO_JS = `try{var d=document.documentElement;if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-pending");setTimeout(function(){d.classList.remove("intro-pending")},4500)}}catch(e){}`;

export const metadata: Metadata = {
  title: "Softsaro — We build digital things that move business forward",
  description: "Softsaro is a Kathmandu-based digital partner: web, mobile, UI/UX, SEO and hosting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_JS }} />
      </head>
      <body className={inter.variable}>
        {children}
        <GsapCursor />
      </body>
    </html>
  );
}
