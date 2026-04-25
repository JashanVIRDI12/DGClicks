import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MarqueeSection from "@/components/MarqueeSection";
import DeviceShowcase from "@/components/DeviceShowcase";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <MarqueeSection />
      <DeviceShowcase />
      <ResultsSection />
      <Footer />
    </main>
  );
}
