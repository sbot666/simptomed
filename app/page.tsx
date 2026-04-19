import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ForWhom from "@/components/ForWhom";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <ForWhom />
      <FAQ />
      <FinalCTA />
    </>
  );
}
