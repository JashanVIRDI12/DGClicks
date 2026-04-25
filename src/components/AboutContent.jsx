"use client";

import { useRef, useEffect, useState } from "react";
import BlurText from "@/components/BlurText";
import styles from "./AboutContent.module.css";

/* ─── Data ─── */
const stats = [
  { value: "150+", num: 150, suffix: "+", label: "Global Clients" },
  { value: "$2M+", label: "Ad Spend Managed" },
  { value: "300%", num: 300, suffix: "%", label: "Avg. ROI" },
  { value: "1.2M", label: "Leads Generated" },
];

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: "Brand Strategy & Identity",
    desc: "We craft cohesive visual languages and compelling market positioning that make brands truly unforgettable.",
    accent: "#ff8a00",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Web Design",
    desc: "Conversion-first websites that look premium and perform harder than your sales team.",
    accent: "#a855f7",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Graphic Design",
    desc: "From bespoke illustrations to sharp editorial layouts, we design world-class creative assets.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Social Media Strategy",
    desc: "Building magnetic visual presences to engage followers and convert them into loyal clients.",
    accent: "#f43f5e",
  },
];

const howWeWork = [
  { num: "01", title: "Discovery", desc: "Deep dive into your market, competitors, and goals. No cookie‑cutter plans." },
  { num: "02", title: "Strategy", desc: "A bespoke roadmap with clear KPIs, timelines, and ownership at every step." },
  { num: "03", title: "Execution", desc: "We ship fast. Iterate weekly. You see results before the first invoice is overdue." },
  { num: "04", title: "Scale", desc: "Once the engine is running, we compound — more channels, more reach, more revenue." },
];

const testimonials = [
  {
    quote: "They thoroughly analyze our industry and target audience, allowing them to develop customized campaigns that effectively reach and engage our customers. Their creative ideas and cutting-edge techniques have helped us stay ahead of the competition.",
    name: "Michael Kaizer",
    role: "CEO — ActiveCoach.ca",
    initials: "MK",
    accent: "#ff8a00",
  },
  {
    quote: "Agentic rebuilt our entire web presence in weeks. We went from invisible to ranking #1 locally. The lead quality is night-and-day compared to before.",
    name: "Rajan Verma",
    role: "Founder — Phantom Logistics",
    initials: "RV",
    accent: "#a855f7",
  },
];

/* ─── Sub-components ─── */

function CountingNumber({ value, num, suffix }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    if (!num) { setDisplay(value); return; }
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const duration = 2000;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(ease * num) + (suffix || ""));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [num, suffix, value]);

  return <span ref={ref}>{display}</span>;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`${styles.fadeIn} ${visible ? styles.fadeInVisible : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function AboutContent() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setHeroVisible(true);
    }, { threshold: 0.05 });
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const t = testimonials[activeTestimonial];

  return (
    <>
      {/* ════════════════════════════════
          § 1 — HERO
      ════════════════════════════════ */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroInner}>

          {/* Left — editorial headline */}
          <div className={styles.heroLeft}>
            <div className={`${styles.eyebrow} ${heroVisible ? styles.eyebrowVisible : ""}`}>
              <span className={styles.eyebrowDot} />
              About Agentic
            </div>

            <h1 className={`${styles.heroHeading} ${heroVisible ? styles.heroHeadingVisible : ""}`}>
              Future‑proof<br />
              your growth with<br />
              <em className={styles.heroEm}>strategic digital.</em>
            </h1>

            <p className={`${styles.heroSub} ${heroVisible ? styles.heroSubVisible : ""}`}>
              An award‑winning digital agency blending marketing, web design,
              and performance data — all focused on you.
            </p>

            <div className={`${styles.heroCtas} ${heroVisible ? styles.heroCtasVisible : ""}`}>
              <a href="/contact" className={styles.ctaPrimary}>
                Get a free strategy call
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/cases" className={styles.ctaSecondary}>
                See how we grow traffic
              </a>
            </div>
          </div>

          {/* Right — image + metric card grid */}
          <div className={`${styles.heroRight} ${heroVisible ? styles.heroRightVisible : ""}`}>
            {/* Top image block */}
            <div className={styles.heroImgCard}>
              <img src="/assets/agency_website_desktop.png" alt="Agentic team at work" className={styles.heroImg} />
              <div className={styles.heroImgBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
                <span>+340% ROI</span>
              </div>
            </div>

            {/* Stat card */}
            <div className={styles.heroStatCard}>
              <span className={styles.heroStatNum}>230<span className={styles.heroStatPlus}>+</span></span>
              <span className={styles.heroStatLabel}>Businesses that work<br />with us and trust us<br />for many years.</span>
            </div>

            {/* Drive more traffic mini-card */}
            <div className={styles.heroDriveCard}>
              <div className={styles.heroDriveBar}>
                {[35, 55, 42, 70, 60, 88, 75].map((h, i) => (
                  <span key={i} className={styles.heroDriveBarItem} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className={styles.heroDriveText}>Drive more traffic<br />and product sales</span>
            </div>
          </div>
        </div>

        {/* Decorative orb */}
        <div className={styles.heroOrb} aria-hidden="true" />
      </section>

      {/* ════════════════════════════════
          § 2 — STATS BAR
      ════════════════════════════════ */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 80} className={styles.statItem}>
              <div className={styles.statNum}>
                {s.num
                  ? <CountingNumber value={s.value} num={s.num} suffix={s.suffix} />
                  : s.value}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          § 3 — MISSION / PHILOSOPHY
      ════════════════════════════════ */}
      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <FadeIn className={styles.missionLeft}>
            <span className={styles.sectionTag}>Our philosophy</span>
            <BlurText
              text="Creative strategies that actually move the needle."
              delay={80}
              animateBy="words"
              direction="top"
              className={`${styles.missionHeading}`}
            />
          </FadeIn>
          <FadeIn delay={150} className={styles.missionRight}>
            <p className={styles.missionPara}>
              We help businesses grow through bold graphic design, strategic
              brand identity, and thoughtful visual storytelling. Our team combines
              creativity with aesthetic precision to turn ideas into timeless brands.
            </p>
            <p className={styles.missionPara}>
              Everything we do is focused on long‑term growth — because
              compounding results beat short‑term spikes every single time.
            </p>
            <div className={styles.missionTags}>
              {["Data‑driven", "Long‑term focus", "Full transparency", "No retainer lock‑in"].map(t => (
                <span key={t} className={styles.missionTag}>{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          § 4 — SERVICES GRID
      ════════════════════════════════ */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesInner}>
          <FadeIn className={styles.servicesHeader}>
            <span className={styles.sectionTag}>What we do</span>
            <h2 className={styles.servicesHeading}>Four services.<br />One obsession: your growth.</h2>
          </FadeIn>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 90} className={styles.serviceCardWrap}>
                <div className={styles.serviceCard} style={{ "--svc-accent": s.accent }}>
                  <div className={styles.serviceIcon} style={{ color: s.accent, borderColor: `${s.accent}30`, background: `${s.accent}0f` }}>
                    {s.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <div className={styles.serviceArrow} style={{ color: s.accent }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M3.5 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          § 5 — HOW WE WORK
      ════════════════════════════════ */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          {/* Left — steps */}
          <div className={styles.howLeft}>
            <FadeIn>
              <span className={styles.sectionTag}>Our process</span>
              <h2 className={styles.howHeading}>How we work</h2>
            </FadeIn>
            <div className={styles.howSteps}>
              {howWeWork.map((step, i) => (
                <FadeIn key={step.num} delay={i * 100} className={styles.howStepWrap}>
                  <div className={styles.howStep}>
                    <span className={styles.howStepNum}>{step.num}</span>
                    <div>
                      <h3 className={styles.howStepTitle}>{step.title}</h3>
                      <p className={styles.howStepDesc}>{step.desc}</p>
                    </div>
                  </div>
                  {i < howWeWork.length - 1 && <div className={styles.howStepLine} />}
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <FadeIn delay={200} className={styles.howRight}>
            <div className={styles.howVisual}>
              <img src="/assets/ph.png" alt="How we work visual" className={styles.howImg} />
              <div className={styles.howOverlay}>
                <span className={styles.howOverlayLabel}>HOW WE WORK</span>
                <div className={styles.howPlayBtn} aria-label="Play video">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
              </div>
              {/* Floating stat */}
              <div className={styles.howStatBubble}>
                <span className={styles.howStatNum}>920<span className={styles.howStatPlus}>+</span></span>
                <span className={styles.howStatText}>Carefully crafted projects<br />with a focus on quality</span>
                <div className={styles.howAvatars}>
                  {["MK", "SK", "JL", "AP"].map((a, i) => (
                    <span key={i} className={styles.howAvatar} style={{ background: ["#ff8a00", "#a855f7", "#2dd4bf", "#f43f5e"][i] }}>{a}</span>
                  ))}
                  <span className={styles.howAvatarMore}>+</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          § 6 — WORK SHOWCASE (dark)
      ════════════════════════════════ */}
      <section className={styles.showcaseSection}>
        <div className={styles.showcaseInner}>
          <FadeIn className={styles.showcaseHeader}>
            <h2 className={styles.showcaseHeading}>Work that drives real growth</h2>
            <p className={styles.showcaseSub}>
              A few examples of how elegant graphic design, brand strategy, and typography come together to define industries.
            </p>
            {/* Filter pills */}
            <div className={styles.showcaseFilters}>
              {["All Work", "UI/UX Design", "Digital Marketing", "Branding"].map((f, i) => (
                <button key={f} className={`${styles.filterPill} ${i === 0 ? styles.filterPillActive : ""}`}>
                  {f} <span className={styles.filterCount}>{[20, 10, 10, 5][i]}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Case preview cards */}
          <div className={styles.showcaseCards}>
            <FadeIn delay={0} className={styles.showcaseCardWrap}>
              <a href="/cases/active-coach" className={styles.showcaseCard}>
                <div className={styles.showcaseCardMedia}>
                  <img src="/assets/ac1.png" alt="Active Coach case study" className={styles.showcaseCardImg} />
                </div>
                <div className={styles.showcaseCardInfo}>
                  <span className={styles.showcaseCardTag}>Brand Identity</span>
                  <h3 className={styles.showcaseCardTitle}>Active Coach</h3>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={120} className={styles.showcaseCardWrap}>
              <a href="/cases/phantom-logistics" className={styles.showcaseCard}>
                <div className={styles.showcaseCardMedia}>
                  <img src="/assets/ph.png" alt="Phantom Logistics case study" className={styles.showcaseCardImg} />
                </div>
                <div className={styles.showcaseCardInfo}>
                  <span className={styles.showcaseCardTag}>Graphic Design</span>
                  <h3 className={styles.showcaseCardTitle}>Phantom Logistics</h3>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={240} className={styles.showcaseCardWrap}>
              <a href="/cases" className={styles.showcaseCard}>
                <div className={styles.showcaseCardMedia} style={{ background: "linear-gradient(135deg, rgba(255,138,0,0.12), rgba(168,85,247,0.12))" }}>
                  <div className={styles.showcaseCardPlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <span>View all work</span>
                  </div>
                </div>
                <div className={styles.showcaseCardInfo}>
                  <span className={styles.showcaseCardTag}>All projects</span>
                  <h3 className={styles.showcaseCardTitle}>See full portfolio</h3>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          § 7 — TESTIMONIAL
      ════════════════════════════════ */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialInner}>
          <div className={styles.testimonialQuote}>
            <svg className={styles.quoteIcon} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M8 28c0-8 4-14 12-16l2 3c-4 1.5-6 4-6 7h6v6H8v-6zm18 0c0-8 4-14 12-16l2 3c-4 1.5-6 4-6 7h6v6H26v-6z" fill="rgba(255,255,255,0.08)"/>
            </svg>
            <blockquote className={styles.quoteText}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </div>

          <div className={styles.testimonialFooter}>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar} style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)` }}>
                {t.initials}
              </div>
              <div>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorRole}>{t.role}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.testimonialNav}>
              <button
                className={styles.navBtn}
                onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className={styles.navPagination}>
                {String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                className={styles.navBtn}
                onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          § 8 — BOTTOM CTA
      ════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <FadeIn className={styles.ctaInner}>
          <span className={styles.sectionTag}>Ready to grow?</span>
          <h2 className={styles.ctaHeading}>Let&apos;s build something<br /><em className={styles.ctaEm}>remarkable together.</em></h2>
          <div className={styles.ctaBtns}>
            <a href="/contact" className={styles.ctaPrimaryLg}>
              Start a project
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3.5 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/cases" className={styles.ctaSecondaryLg}>
              View our work
            </a>
          </div>
        </FadeIn>
        <div className={styles.ctaOrb} aria-hidden="true" />
      </section>
    </>
  );
}
