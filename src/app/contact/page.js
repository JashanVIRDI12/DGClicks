import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact | Agentic",
  description: "Let's build something together. Get in touch with the Agentic team."
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}
