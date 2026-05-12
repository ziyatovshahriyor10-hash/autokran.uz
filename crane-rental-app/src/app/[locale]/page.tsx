"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Fleet } from "@/components/sections/Fleet";
import { Partners } from "@/components/sections/Partners";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("About");

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Fleet />
      <Partners />
      
      <Footer />
    </main>
  );
}

