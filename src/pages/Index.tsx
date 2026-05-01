import { useEffect } from "react";
import { Navbar } from "@/components/northvave/Navbar";
import { Hero } from "@/components/northvave/Hero";
import { Portfolio } from "@/components/northvave/Portfolio";
import { Services } from "@/components/northvave/Services";
import { Stats } from "@/components/northvave/Stats";
import { Process } from "@/components/northvave/Process";
import { Contact } from "@/components/northvave/Contact";
import { Footer } from "@/components/northvave/Footer";
import { CursorGlow } from "@/components/northvave/CursorGlow";
import { ScrollProgress } from "@/components/northvave/ScrollProgress";

const Index = () => {
  useEffect(() => {
    document.title = "NorthVave — We Build Digital That Performs";
    const meta = document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute("content", "NorthVave is a custom software, web design and automation agency building premium websites, CRMs and AI-powered platforms.");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <Stats />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
