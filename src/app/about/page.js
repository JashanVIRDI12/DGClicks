import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About | Agentic",
  description: "We are a results-driven digital agency focused on SEO, web design, and paid ads that compound over time.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  );
}
