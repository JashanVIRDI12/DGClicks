"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./cases.module.css";

/* ─── Data ──────────────────────────────────────────────────── */
const cases = [
  {
    id: "active-coach",
    slug: "active-coach",
    category: "Web Design",
    service: "Web Design",
    industry: "Coaching",
    title: "Active Coach",
    tagline: "Turning a stagnant website into a compounding lead machine",
    description:
      "Six months in, Active Coach now gets 2–3 qualified leads daily — from a cold start. Rebuilt site, restructured Ads, compounding SEO.",
    image: "/assets/acdashboard.png",
    url: "activecoach.in",
    accent: "#ff8a00",
    metrics: [
      { value: "2–3", label: "Leads / day" },
      { value: "340%", label: "Ad ROI" },
      { value: "4×", label: "Traffic in 6mo" },
    ],
    tags: ["Google Ads", "SEO", "Lead Gen"],
    year: "2024–2025",
    featured: true,
    badge: null,
  },
  {
    id: "phantom-logistics",
    slug: "phantom-logistics",
    category: "Web Design",
    service: "Web Design",
    industry: "Logistics",
    title: "Phantom Logistics",
    tagline: "New brand, enterprise credibility — built in weeks",
    description:
      "Phantom Logistics launched with zero digital presence. We delivered a premium brand identity, high-performance website, and early SEO wins in under 4 weeks.",
    image: "/assets/phdashboard.png",
    url: "phantomlogistics.in",
    accent: "#a855f7",
    metrics: [
      { value: "< 4wk", label: "From brief to live" },
      { value: "#1", label: "Early local rankings" },
      { value: "100%", label: "On-brand, on-brief" },
    ],
    tags: ["Brand", "Web Design", "SEO"],
    year: "2025",
    featured: false,
    badge: "New",
  },
];

const clientLogos = [
  "Active Coach", "Phantom Logistics", "Brand Co.", "Nexus Ltd.",
  "Apex Media", "Orbit Tech", "Crest Studio", "Vanta Corp",
];

const clientWins = [
  {
    label: "340% Ad ROI in 6 Months — From a Cold Start",
    badge: "6 months",
    description:
      "Active Coach had zero ad history and a site that converted no one. Six months of weekly optimisation cycles, pillar SEO content, and a conversion-first rebuild later — they now get 2–3 qualified leads every single day.",
    client: "Active Coach",
    image: "/assets/acdashboard.png",
    imageAlt: "Active Coach dashboard on laptop",
    metrics: [{ value: "340%", label: "Ad ROI" }, { value: "2–3", label: "Leads / day" }],
  },
  {
    label: "Full Brand + Website Live in Under 4 Weeks",
    badge: "New launch",
    description:
      "Phantom Logistics had nothing — no website, no brand, no digital presence. We delivered a complete, premium-grade digital identity and went live in under 4 weeks. They’re already picking up early local rankings and winning enterprise enquiries.",
    client: "Phantom Logistics",
    image: "/assets/phdashboard.png",
    imageAlt: "Phantom Logistics site on laptop",
    metrics: [{ value: "< 4wk", label: "Brief to live" }, { value: "#1", label: "Early rankings" }],
  },
];

const services = ["All Services", "Web Design", "SEO", "Google Ads", "Social Media"];
const industries = ["All Industries", "Coaching", "Logistics", "E-commerce", "Healthcare"];
const years = ["All Years", "2024", "2023"];

/* ─── Utility ────────────────────────────────────────────────── */
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

/* ─── Laptop mockup card ─────────────────────────────────────── */
function LaptopCard({ c, index }) {
  const [ref, visible] = useReveal(index * 120);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`${styles.laptopCard} ${visible ? styles.laptopCardVisible : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Laptop frame */}
      <div className={styles.laptopFrame}>
        {/* Browser chrome */}
        <div className={styles.browserChrome}>
          <div className={styles.trafficLights}>
            <span className={styles.dotR} />
            <span className={styles.dotY} />
            <span className={styles.dotG} />
          </div>
          <div className={styles.addressBar}>{c.url}</div>
        </div>
        {/* Screen */}
        <div className={styles.laptopScreen}>
          <img
            src={c.image}
            alt={c.title}
            className={`${styles.laptopScreenImg} ${hovered ? styles.laptopScreenImgHover : ""}`}
            loading="lazy"
          />
          {c.badge && <span className={styles.screenbadge}>{c.badge}</span>}
        </div>
        <div className={styles.laptopBase} />
        <div className={styles.laptopFoot} />
      </div>

      {/* Card info */}
      <div className={styles.laptopInfo}>
        <div className={styles.laptopMeta}>
          <span className={styles.laptopCategory}>{c.category}</span>
          <div className={styles.laptopTags}>
            {c.tags.map((t) => (
              <span key={t} className={styles.laptopTag}>{t}</span>
            ))}
          </div>
        </div>
        <h3 className={styles.laptopTitle}>{c.title}</h3>
        <p className={styles.laptopDesc}>{c.description}</p>
        <a
          href={`/cases/${c.slug}`}
          className={styles.laptopCta}
          style={{ "--acc": c.accent }}
        >
          View Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7H11.5M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─── Client Win row ─────────────────────────────────────────── */
function WinRow({ win, index }) {
  const [ref, visible] = useReveal(0);
  const isEven = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`${styles.winRow} ${visible ? styles.winRowVisible : ""} ${isEven ? styles.winRowReverse : ""}`}
    >
      <div className={styles.winText}>
        {win.badge && <span className={styles.winBadge}>{win.badge}</span>}
        <h3 className={styles.winLabel}>{win.label}</h3>
        <p className={styles.winDesc}>{win.description}</p>
        <div className={styles.winMetrics}>
          {win.metrics.map((m) => (
            <div key={m.label} className={styles.winMetric}>
              <span className={styles.winMetricVal}>{m.value}</span>
              <span className={styles.winMetricLbl}>{m.label}</span>
            </div>
          ))}
        </div>
        <span className={styles.winClient}>{win.client}</span>
      </div>

      <div className={styles.winMedia}>
        {/* Inline laptop mockup */}
        <div className={styles.winLaptop}>
          <div className={styles.winLaptopScreen}>
            <div className={styles.winBrowserBar}>
              <span className={styles.winDot} /><span className={styles.winDot} /><span className={styles.winDot} />
            </div>
            <img src={win.image} alt={win.imageAlt} className={styles.winLaptopImg} loading="lazy" />
          </div>
          <div className={styles.winLaptopBase} />
        </div>
        <div className={styles.winMediaGlow} />
      </div>
    </article>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CasesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [service, setService] = useState("All Services");
  const [industry, setIndustry] = useState("All Industries");
  const [year, setYear] = useState("All Years");
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered = cases.filter((c) => {
    const matchService = service === "All Services" || c.service === service || c.tags.includes(service);
    const matchIndustry = industry === "All Industries" || c.industry === industry;
    const matchYear = year === "All Years" || c.year === year;
    return matchService && matchIndustry && matchYear;
  });

  return (
    <main className={styles.page}>
      <Navbar />

      {/* ── Hero ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={`${styles.heroSub} ${heroVisible ? styles.heroSubVisible : ""}`}>
            Real brands helped achieve real results through smart strategy, design &amp; ads that work.
          </p>
          <h1 className={styles.heroHeading}>
            <span className={`${styles.heroLine1} ${heroVisible ? styles.heroLine1Visible : ""}`}>
              Real Brands.
            </span>
            <br />
            <em className={`${styles.heroEm} ${styles.heroLine2} ${heroVisible ? styles.heroLine2Visible : ""}`}>
              Real Results.
            </em>
          </h1>
        </div>
      </section>

      {/* ── Logo strip ─────────────────────────── */}
      <div className={styles.logoStrip}>
        <div className={styles.logoTrack}>
          {[...clientLogos, ...clientLogos].map((name, i) => (
            <span key={`${name}-${i}`} className={styles.logoItem}>{name}</span>
          ))}
        </div>
      </div>

      {/* ── Browse by ──────────────────────────── */}
      <section className={styles.browse}>
        <div className={styles.browseInner}>
          <div className={styles.browseHeader}>
            <h2 className={styles.browseHeading}>Browse by:</h2>
            <div className={styles.filters}>
              <div className={styles.filterгруппа}>
                <label className={styles.filterLabel} htmlFor="filter-service">Service</label>
                <select
                  id="filter-service"
                  className={styles.filterSelect}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="filter-industry">Industry</label>
                <select
                  id="filter-industry"
                  className={styles.filterSelect}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  {industries.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="filter-year">Year</label>
                <select
                  id="filter-year"
                  className={styles.filterSelect}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Laptop cards grid */}
          <div className={styles.laptopGrid}>
            {filtered.length > 0
              ? filtered.map((c, i) => <LaptopCard key={c.id} c={c} index={i} />)
              : (
                <p className={styles.emptyState}>No case studies match your filters.</p>
              )}
          </div>
        </div>
      </section>

      {/* ── Client Wins ────────────────────────── */}
      <section className={styles.wins}>
        <div className={styles.winsInner}>
          <div className={styles.winsHeader}>
            <h2 className={styles.winsHeading}>
              Client Wins<br />
              <em className={styles.winsEm}>we're proud of</em>
            </h2>
          </div>
          <div className={styles.winsList}>
            {clientWins.map((win, i) => (
              <WinRow key={win.label} win={win} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

