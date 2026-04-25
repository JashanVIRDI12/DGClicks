"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import BlurText from "@/components/BlurText";
import ShapeGrid from "@/components/reactbits/ShapeGrid/ShapeGrid";
import styles from "./ResultsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    client: "Active Coach",
    metric: "2.0",
    metricSuffix: "",
    label: "Brand overhaul",
    sublabel: "Version 2.0 release",
    service: "Brand Identity & Strategy",
    desc: "A complete visual identity overhaul with aggressive, high-contrast aesthetics that redefined their market.",
    accent: "#ff8a00",
    accentBg: "rgba(255,138,0,0.06)",
    badge: "Lead velocity multiplied",
    badgeColor: "#16a34a",
    gridDirection: "diagonal",
    gridColor: "rgba(255,138,0,0.18)",
    gridHover: "rgba(255,138,0,0.1)",
    span2: true,
  },
  {
    client: "Phantom Logistics",
    metric: "2×",
    metricSuffix: "",
    label: "Visual impact",
    sublabel: "In 6 months",
    service: "Website Design & Identity",
    desc: "High-end corporate presence with robust typographic systems to capture enterprise logistics leads.",
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.06)",
    gridDirection: "right",
    gridColor: "rgba(168,85,247,0.18)",
    gridHover: "rgba(168,85,247,0.1)",
  },
  {
    client: "DeeGeeGraphics",
    metric: "UI/UX",
    metricSuffix: "",
    label: "Brand overhaul",
    sublabel: "Conversion-focused",
    service: "Website Design",
    desc: "A conversion-optimized canvas that put their creative portfolio front and centre.",
    accent: "#2dd4bf",
    accentBg: "rgba(45,212,191,0.06)",
    gridDirection: "up",
    gridColor: "rgba(45,212,191,0.18)",
    gridHover: "rgba(45,212,191,0.1)",
  },
  {
    client: "Indian Bistro Barrie",
    metric: "99%",
    metricSuffix: "",
    label: "Brand Rollout",
    sublabel: "Peak ordering hours",
    service: "Packaging & Print",
    desc: "Complete restaurant rebranding, from custom menus to vibrant exterior signage.",
    accent: "#f43f5e",
    accentBg: "rgba(244,63,94,0.06)",
    gridDirection: "down",
    gridColor: "rgba(244,63,94,0.18)",
    gridHover: "rgba(244,63,94,0.1)",
  },
  {
    client: "Amritsari Kulcha Hut",
    metric: "#1",
    metricSuffix: "",
    label: "Local Icon",
    sublabel: "In Barrie, Ontario",
    service: "Visual Identity",
    desc: "Transformed a local eatery into a globally recognized aesthetic flagship.",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.06)",
    gridDirection: "left",
    gridColor: "rgba(59,130,246,0.18)",
    gridHover: "rgba(59,130,246,0.1)",
  },
];

export default function ResultsSection() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Header stagger
      gsap.from(`.${styles.pill}`, {
        opacity: 0, y: -16, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.header}`, start: "top 85%", once: true }
      });
      gsap.from(`.${styles.subheading}`, {
        opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.header}`, start: "top 85%", once: true }
      });

      // Featured card
      gsap.from(`.${styles.featured}`, {
        opacity: 0, x: -50, scale: 0.96, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 78%", once: true }
      });

      // Side cards stagger
      const cards = gsap.utils.toArray(`.${styles.card}`);
      gsap.from(cards, {
        opacity: 0, y: 40, duration: 0.75, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 75%", once: true }
      });

      // CTA
      gsap.from(`.${styles.ctaRow}`, {
        opacity: 0, y: 24, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.ctaRow}`, start: "top 90%", once: true }
      });

      // Counters
      gsap.utils.toArray(`.${styles.counter}`).forEach((el) => {
        const end = el.getAttribute("data-val");
        if (/^\d+$/.test(end)) {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: parseInt(end), duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => { el.textContent = Math.round(obj.v); }
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = results;

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.pill}>
            <TrendingUp size={11} /> Proven Aesthetics
          </span>
          <BlurText
            text="Real clients. Timeless brands."
            delay={140}
            animateBy="words"
            direction="top"
            className={`heading-1 ${styles.heading}`}
          />
          <p className={`body-lg ${styles.subheading}`}>
            We don&apos;t just deliver simple mockups — we craft striking visual 
            languages that define market leaders.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className={styles.grid}>

          {/* FEATURED */}
          <div className={styles.featured}>
            {/* Live ShapeGrid background */}
            <div className={styles.canvasWrap}>
              <ShapeGrid
                speed={0.4}
                squareSize={28}
                direction={featured.gridDirection}
                borderColor={featured.gridColor}
                hoverFillColor={featured.gridHover}
                shape="square"
                hoverTrailAmount={6}
                fadeToDark={false}
              />
            </div>
            {/* Content */}
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.clientChip}>{featured.client}</span>
                <span className={styles.serviceChip}
                  style={{ color: featured.accent, borderColor: `${featured.accent}33`, background: featured.accentBg }}>
                  {featured.service}
                </span>
              </div>
              <div className={styles.metricBlock}>
                <span className={styles.metricBig} style={{ color: featured.accent }}>
                  {featured.metric}
                  <span className={styles.metricSuffix}>{featured.metricSuffix}</span>
                </span>
                <div>
                  <p className={styles.metricLabel}>{featured.label}</p>
                  <p className={styles.metricSublabel}>{featured.sublabel}</p>
                </div>
              </div>
              <p className={styles.cardDesc}>{featured.desc}</p>
            </div>
          </div>

          {/* SIDE CARDS */}
          {rest.map((r, i) => (
            <div key={i} className={styles.card}>
              {/* Live ShapeGrid background */}
              <div className={styles.canvasWrap}>
                <ShapeGrid
                  speed={0.3}
                  squareSize={24}
                  direction={r.gridDirection}
                  borderColor={r.gridColor}
                  hoverFillColor={r.gridHover}
                  shape="square"
                  hoverTrailAmount={4}
                  fadeToDark={false}
                />
              </div>
              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.clientChip}>{r.client}</span>
                  <span className={styles.serviceChip}
                    style={{ color: r.accent, borderColor: `${r.accent}33`, background: r.accentBg }}>
                    {r.service}
                  </span>
                </div>
                <div className={styles.metricBlock}>
                  <span className={styles.metricMid} style={{ color: r.accent }}>
                    {r.metric}
                    {r.metricSuffix && <span className={styles.metricSuffix}>{r.metricSuffix}</span>}
                  </span>
                  <div>
                    <p className={styles.metricLabel}>{r.label}</p>
                    <p className={styles.metricSublabel}>{r.sublabel}</p>
                  </div>
                </div>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
            </div>
          ))}

        </div>

        {/* ── CTA Row ── */}
        <div className={styles.ctaRow}>
          <div className={styles.statsRow}>
            {[["50+", "50", "Projects"], ["100", "100", "% Retention"], ["300", "300", "% Avg. Growth"]].map(([display, val, lbl]) => (
              <div key={lbl} className={styles.stat}>
                <span className={styles.statNum}>
                  <span className={styles.counter} data-val={val}>{display.replace(/\D/g, '') || display}</span>
                  {display.replace(/\d/g, '')}
                </span>
                <span className={styles.statLbl}>{lbl}</span>
              </div>
            ))}
          </div>
          <a href="/cases" className={styles.ctaBtn}>
            All case studies <ArrowUpRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
