"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import SplitText from "@/components/reactbits/SplitText/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity/ScrollVelocity";
import styles from "./services.module.css";

/* ─── Motion variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUpSlow = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Data ──────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "Website Design\n& Development",
    tagline: "Your digital storefront, engineered to convert",
    desc: "Premium, conversion-first interfaces built to turn visitors into loyal clients. We go beyond templates into bespoke digital identities that perform as hard as they look.",
    deliverables: [
      "Custom UI/UX design tailored to your brand",
      "Conversion-optimised landing pages",
      "Mobile-first, blazing-fast builds",
      "Ongoing performance & maintenance",
    ],
    tags: ["UI/UX Design", "Web Dev", "CRO", "Mobile"],
    accent: "#ff8a00",
    accentRgb: "255,138,0",
    img: "/assets/hero.png",
  },
  {
    num: "02",
    title: "Brand Identity\n& Strategy",
    tagline: "Crafting unforgettable identities that resonate",
    desc: "We dive deep into your market to establish a cohesive visual language and strategic positioning that ensures you stand out.",
    deliverables: [
      "Logo & core visual identity",
      "Comprehensive brand guidelines",
      "Typography & color systems",
      "Brand voice & market positioning",
    ],
    tags: ["Branding", "Identity", "Strategy"],
    accent: "#a855f7",
    accentRgb: "168,85,247",
    img: "/assets/services.png",
  },
  {
    num: "03",
    title: "Social Media\nManagement",
    tagline: "Build a community that buys, advocates & returns",
    desc: "Building magnetic social presences through targeted content strategy, community growth, and viral creative execution that converts followers into revenue.",
    deliverables: [
      "Multi-platform content strategy",
      "Short-form video & creative production",
      "Community management & DM automation",
      "Paid social campaigns",
    ],
    tags: ["Content Creation", "Community", "Paid Social"],
    accent: "#2dd4bf",
    accentRgb: "45,212,191",
    img: "/assets/social.png",
  },
  {
    num: "04",
    title: "Graphic Design\n& Branding Solutions",
    tagline: "Bespoke creative assets that elevate your story",
    desc: "From striking editorial layouts to custom iconography, we deliver world-class graphic design solutions tailored specifically to communicate your unique value.",
    deliverables: [
      "Editorial & publication design",
      "Custom illustration & iconography",
      "Marketing collateral & pitch decks",
      "Motion graphics & digital assets",
    ],
    tags: ["Graphic Design", "Print", "Illustration"],
    accent: "#f43f5e",
    accentRgb: "244,63,94",
    img: "/assets/seo_dashboard_mobile.png",
  },
];

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Results-Guaranteed",
    desc: "Every engagement is tied to measurable outcomes. No vanity metrics — only real business impact.",
    accent: "#ff8a00",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Fast Turnaround",
    desc: "From kickoff to launch in days, not months. We move at the speed your business demands.",
    accent: "#a855f7",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    title: "24/7 Client Support",
    desc: "Dedicated account managers available around the clock across WhatsApp, email, and Slack.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Data-Driven Decisions",
    desc: "Every strategy is backed by deep analytics, A/B testing, and continuous optimisation loops.",
    accent: "#f43f5e",
  },
];

const stats = [
  { value: "150+", label: "Clients Served" },
  { value: "89%", label: "Avg. Traffic Increase" },
  { value: "+250%", label: "Average ROI" },
  { value: "4.9★", label: "Client Satisfaction" },
];

/* ─── Service Card ─────────────────────────────────── */
function ServiceCard({ svc, index }) {
  const isEven = index % 2 === 1;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <motion.article
      ref={ref}
      className={`${styles.svcRow} ${isEven ? styles.svcRowReverse : ""}`}
      style={{ "--svc-accent": svc.accent, "--svc-rgb": svc.accentRgb }}
      variants={fadeUpSlow}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* ── Media ── */}
      <div className={styles.svcMedia}>
        <motion.img
          src={svc.img}
          alt={svc.title}
          className={styles.svcImg}
          style={{ y: imgY }}
          loading="lazy"
        />
        <div className={styles.svcImgOverlay} />
        <div className={styles.svcBadge}>
          <span className={styles.svcBadgeDot} />
          {svc.tagline}
        </div>
        <div className={styles.svcNum}>{svc.num}</div>
      </div>

      {/* ── Content ── */}
      <div className={styles.svcContent}>
        <motion.p
          className={styles.svcLabel}
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {svc.tags[0]}
        </motion.p>

        <h2 className={styles.svcTitle}>
          {svc.title.split("\n").map((line, i) => (
            <span key={i} className={styles.svcTitleLine}>
              <SplitText
                text={line}
                className={styles.svcTitleText}
                delay={30}
                duration={0.55}
              />
              {i < svc.title.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h2>

        <motion.p
          className={styles.svcDesc}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {svc.desc}
        </motion.p>

        <motion.ul
          className={styles.svcList}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {svc.deliverables.map((item, i) => (
            <motion.li key={i} className={styles.svcListItem} variants={fadeUp}>
              <span className={styles.svcCheck} style={{ color: svc.accent }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className={styles.svcTags}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {svc.tags.map((tag) => (
            <motion.span key={tag} className={styles.svcTag} variants={scaleIn}>
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          href="/contact"
          className={styles.svcCta}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start this service
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9.5 4.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>
    </motion.article>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function ServicesPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <main className={styles.page}>
      <Navbar />

      {/* ════ 1. HERO ════════════════════════════════ */}
      <section className={styles.hero}>
        {/* Animated grid lines */}
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={styles.eyebrowDot} />
            <span>Our Services</span>
          </motion.div>

          {ready && (
            <BlurText
              text="What we build."
              delay={120}
              animateBy="words"
              direction="top"
              className={styles.heroHeading}
            />
          )}

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65 }}
          >
            Four core pillars architected to elevate your brand — from strategic 
            identity and website design through to engaging social content and 
            world-class graphic design solutions.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85 }}
          >
            <a href="/contact" className={styles.heroBtnPrimary}>
              Get started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9.5 4.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#services" className={styles.heroBtnGhost}>
              Explore services
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {stats.map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{s.value}</span>
                <span className={styles.heroStatLbl}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative orbs */}
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.orb3} aria-hidden="true" />
      </section>

      {/* ════ 2. VELOCITY MARQUEE ════════════════════ */}
      <div className={styles.velocityWrap}>
        <ScrollVelocity
          texts={["Website Design · Brand Identity · Social Media · Graphic Design ·", "Art Direction · Typography · Illustration · Strategy ·"]}
          velocity={60}
          className={styles.velocityText}
        />
      </div>

      {/* ════ 3. SERVICES ROWS ═══════════════════════ */}
      <section id="services" className={styles.servicesList}>
        <div className={styles.servicesHeader}>
          <motion.p
            className={styles.servicesEyebrow}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            What we do
          </motion.p>
          <h2 className={styles.servicesHeading}>
            <SplitText
              text="Four services."
              className={styles.servicesHeadingLine}
              delay={25}
              duration={0.5}
            />
            <br />
            <SplitText
              text="One obsession: your growth."
              className={`${styles.servicesHeadingLine} ${styles.servicesHeadingEm}`}
              delay={18}
              duration={0.5}
            />
          </h2>
        </div>

        <div className={styles.servicesRows}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>
      </section>

      {/* ════ 4. BENEFITS ════════════════════════════ */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsInner}>
          <motion.div
            className={styles.benefitsHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className={styles.benefitsEyebrow}>Why Agentic</p>
            <h2 className={styles.benefitsHeading}>
              <SplitText text="Benefits of our services" delay={22} duration={0.5} className={styles.benefitsHeadingText} />
            </h2>
            <p className={styles.benefitsSub}>
              We don't just deliver services — we build long-term partnerships anchored in
              transparency, speed, and measurable results.
            </p>
          </motion.div>

          <motion.div
            className={styles.benefitsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp}>
                <SpotlightCard
                  className={styles.benefitCard}
                  spotlightColor={`rgba(${["255,138,0","168,85,247","45,212,191","244,63,94"][i]},0.18)`}
                >
                  <div className={styles.benefitIconWrap} style={{ "--b-accent": b.accent, color: b.accent }}>
                    {b.icon}
                  </div>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                  <div className={styles.benefitAccentLine} style={{ background: b.accent }} />
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ 5. CTA ════════════════════════════════ */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <motion.span
            className={styles.ctaPill}
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Ready to grow?
          </motion.span>

          {ready && (
            <BlurText
              text="Let's build something remarkable together."
              delay={90}
              animateBy="words"
              direction="top"
              className={styles.ctaHeading}
            />
          )}

          <motion.p
            className={styles.ctaSub}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Tell us about your project — we'll respond within 24 hours.
          </motion.p>

          <motion.div
            className={styles.ctaBtns}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.a
              href="/contact"
              className={styles.ctaBtnPrimary}
              variants={fadeUp}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9.5 4.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="/cases"
              className={styles.ctaBtnGhost}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
            >
              View case studies →
            </motion.a>
          </motion.div>
        </div>
        <div className={styles.ctaOrb} aria-hidden="true" />
      </section>

      <Footer />
    </main>
  );
}
