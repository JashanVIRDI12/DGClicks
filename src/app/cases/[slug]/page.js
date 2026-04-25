"use client";

import { use, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./case-detail.module.css";

/* ── Case study data ──────────────────────────────────────────── */
const caseData = {
  "active-coach": {
    title: "Active Coach",
    website: "https://activecoach.in",
    heroImage: "/assets/acdashboard.png",
    heroAccent: "#ff8a00",
    client: "Active Coach Ltd.",
    year: "2024–2025",
    collaborators: ["Agentic Studio", "SEO Team"],
    tools: ["Next.js", "Google Ads", "Ahrefs"],
    role: "Full-Stack Digital",
    brief:
      "Six months ago, Active Coach came to us with a website that wasn't producing a single lead. No SEO foundation, a cold Google Ads account, and a coaching niche that's notoriously hard to break into. We took on the full digital stack — a ground-up website rebuild, a restructured Ads account, and a long-term SEO strategy built to compound. Six months later, that compounding is exactly what's happening.",
    briefImage: "/assets/ac1.png",
    challenge:
      "The biggest challenge wasn't just generating leads — it was doing so from a standing start. No ad history meant no quality score, no ranking authority meant no organic traffic, and a niche audience meant we couldn't afford broad targeting. Every rupee had to work harder than usual while we built the foundation underneath.",
    challengeImage: "/assets/ac2.png",
    solution:
      "We rebuilt the site with conversion in mind from page one — clear CTAs, social proof, and pages built around the exact searches Active Coach's ideal client makes. On Ads, we started tight: narrow match types, a ruthless negative keyword list, and weekly optimisation cycles. SEO was structured around pillar content and local intent. Six months of compounding later, the results speak for themselves.",
    solutionImage: "/assets/ac4.png",
    metrics: [
      { value: "2–3", label: "Leads per day" },
      { value: "340%", label: "Ad ROI" },
      { value: "4×", label: "Traffic growth in 6mo" },
    ],
    tags: ["Website Redesign", "Google Ads", "SEO", "Lead Gen"],
  },

  "phantom-logistics": {
    title: "Phantom Logistics",
    website: "https://phantomlogistics.in",
    heroImage: "/assets/phdashboard.png",
    heroAccent: "#a855f7",
    client: "Phantom Logistics Pvt. Ltd.",
    year: "2025",
    collaborators: ["Agentic Studio", "Content Team"],
    tools: ["Next.js", "Figma", "Semrush"],
    role: "Brand + Web + SEO",
    brief:
      "Phantom Logistics is a brand new freight company entering one of India's most competitive markets. They had no website, no digital presence, and no SEO footprint — just a strong team and a clear ambition to be taken seriously as an enterprise logistics provider. We built everything from scratch: brand identity, website, and an SEO strategy designed to establish authority fast.",
    briefImage: "/assets/ph.png",
    challenge:
      "Launching into a saturated logistics market as a completely new name is brutally difficult. Established competitors have years of domain authority and thousands of backlinks. Our challenge was to design and build a brand presence credible enough to win enterprise clients on first impression — and lay an SEO foundation that would start showing traction within weeks of going live.",
    challengeImage: "/assets/ph2.png",
    solution:
      "We led with a premium dark-mode brand identity that immediately set Phantom apart from the generic blue-and-white aesthetic that dominates logistics. The website was built performance-first on Next.js — sub-second loads, structured data, and semantic HTML baked in from day one. SEO was structured around freight corridor keywords and local intent signals, giving them a fast on-ramp to organic visibility in their core markets.",
    solutionImage: "/assets/ph3.png",
    metrics: [
      { value: "< 4wk", label: "From brief to live" },
      { value: "#1", label: "Early local rankings" },
      { value: "100%", label: "On-brand, on-brief" },
    ],
    tags: ["Brand Identity", "Web Design", "SEO", "Content"],
  },
};

/* ── Scroll-reveal hook (consistent with rest of site) ────────── */
function useReveal(delay = 0, threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return [ref, visible];
}

/* ── Section component ───────────────────────────────────────── */
function CaseSection({ label, text, image, imageLeft = false, index = 0 }) {
  const [ref, visible] = useReveal(0);
  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.sectionVisible : ""} ${
        imageLeft ? styles.sectionReverse : ""
      }`}
    >
      <div className={styles.sectionText}>
        <span className={styles.sectionLabel}>{label}</span>
        <p className={styles.sectionBody}>{text}</p>
      </div>
      <div className={styles.sectionMedia}>
        <img src={image} alt={label} className={styles.sectionImg} loading="lazy" />
        <div className={styles.sectionImgOverlay} />
      </div>
    </section>
  );
}

/* ── Metric pill ─────────────────────────────────────────────── */
function MetricPill({ value, label, delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`${styles.metricPill} ${visible ? styles.metricPillVisible : ""}`}
    >
      <span className={styles.metricVal}>{value}</span>
      <span className={styles.metricLbl}>{label}</span>
    </div>
  );
}

/* ── Next case teaser ─────────────────────────────────────────── */
function NextCase({ current }) {
  const slugs = Object.keys(caseData);
  const currentIndex = slugs.indexOf(current);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const next = caseData[nextSlug];
  const [ref, visible] = useReveal(0);

  return (
    <a
      href={`/cases/${nextSlug}`}
      ref={ref}
      className={`${styles.nextCase} ${visible ? styles.nextCaseVisible : ""}`}
      aria-label={`Next case study: ${next.title}`}
    >
      <div className={styles.nextCaseBg}>
        <img src={next.heroImage} alt={next.title} className={styles.nextCaseBgImg} />
        <div className={styles.nextCaseBgOverlay} />
      </div>
      <div className={styles.nextCaseContent}>
        <span className={styles.nextCaseEyebrow}>Next project</span>
        <h2 className={styles.nextCaseTitle}>{next.title}</h2>
        <div className={styles.nextCaseArrow}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function CaseDetailPage({ params }) {
  // Next.js 15/16: params is a Promise in client components — unwrap with React.use()
  const { slug } = use(params);
  const c = caseData[slug];

  const [heroVisible, setHeroVisible] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const metaRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = metaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMetaVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: c?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!c) return notFound();

  return (
    <main className={styles.page}>
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <img
            src={c.heroImage}
            alt={c.title}
            className={`${styles.heroImage} ${heroVisible ? styles.heroImageVisible : ""}`}
          />
          <div className={styles.heroGradient} />
          <div className={styles.heroGradientAccent} style={{ "--accent": c.heroAccent }} />
        </div>

        <div className={`${styles.heroContent} ${heroVisible ? styles.heroContentVisible : ""}`}>
          <a href="/cases" className={styles.crumbLink}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Case Studies
          </a>

          <h1 className={styles.heroTitle}>{c.title}</h1>

          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            Visit website
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── Metadata Row ────────────────────────────── */}
      <div
        ref={metaRef}
        className={`${styles.metaRow} ${metaVisible ? styles.metaRowVisible : ""}`}
      >
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Client Name</span>
          <span className={styles.metaValue}>{c.client}</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Project Year</span>
          <span className={styles.metaValue}>{c.year}</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Collaborators</span>
          <div className={styles.metaList}>
            {c.collaborators.map((col) => (
              <span key={col} className={styles.metaValue}>{col}</span>
            ))}
          </div>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Tools Used</span>
          <div className={styles.metaList}>
            {c.tools.map((tool) => (
              <span key={tool} className={styles.metaValue}>{tool}</span>
            ))}
          </div>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>{c.role}</span>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className={styles.content}>

        {/* Project Brief */}
        <CaseSection label="Project brief" text={c.brief} image={c.briefImage} imageLeft={false} />

        <div className={styles.shareRow}>
          <button className={styles.shareBtn} onClick={handleShare} aria-label="Share this project">
            Share project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="3.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="10.5" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 6.2l4-2.4M5 7.8l4 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.ruleDivider} />

        {/* Main Challenge */}
        <CaseSection label="Main challenge" text={c.challenge} image={c.challengeImage} imageLeft={true} />

        <div className={styles.ruleDivider} />

        {/* Solution */}
        <CaseSection label="Our solution" text={c.solution} image={c.solutionImage} imageLeft={false} />

        {/* Results */}
        <div className={styles.resultsStrip}>
          <span className={styles.resultsLabel}>Results</span>
          <div className={styles.metricsRow}>
            {c.metrics.map((m, i) => (
              <MetricPill key={m.label} value={m.value} label={m.label} delay={i * 100} />
            ))}
          </div>
        </div>

      </div>

      {/* ── Next case ────────────────────────────────── */}
      <NextCase current={slug} />

      <Footer />
    </main>
  );
}
