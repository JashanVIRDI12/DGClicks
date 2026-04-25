export async function generateMetadata({ params }) {
  const titles = {
    "active-coach": "Active Coach Case Study | Agentic",
    "phantom-logistics": "Phantom Logistics Case Study | Agentic",
  };
  const descs = {
    "active-coach": "How we turned a stagnant website into a lead-generation machine for a coaching business.",
    "phantom-logistics": "Building enterprise authority for a logistics brand in a competitive freight market.",
  };
  return {
    title: titles[params.slug] ?? "Case Study | Agentic",
    description: descs[params.slug] ?? "Agentic case study.",
  };
}

export default function CaseSlugLayout({ children }) {
  return <>{children}</>;
}
