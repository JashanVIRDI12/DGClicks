"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import styles from "./Hero.module.css";

// Framer variants — reliable on SSR/hydration
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 120]);
  const yCard = useTransform(scrollY, [0, 1000], [0, -60]);

  return (
    <section className={styles.heroSection}>

      {/* ── Label ── */}
      <motion.p
        className={`label ${styles.label}`}
        {...fade(0.05)}
      >
        Brand Identity & Graphic Design Studio
      </motion.p>

      {/* ── Title ── */}
      <div className={styles.heroTitle}>
        <BlurText
          text="We empower our clients' vision"
          delay={120}
          animateBy="words"
          direction="top"
          className={`display-1 ${styles.titleLine}`}
        />
      </div>

      {/* ── Subtitle ── */}
      <motion.p className={`body-lg ${styles.subtitle}`} {...fade(0.46)}>
        With disruptive innovation and cutting&#8209;edge products, we build
        digital experiences that drive exponential growth.
      </motion.p>

      {/* ── CTA row ── */}
      <motion.div className={styles.ctaRow} {...fade(0.58)}>
        <a href="/contact" className="outline-pill">
          Know more <ArrowUpRight size={15} />
        </a>
        <a href="#services" className={styles.ghostLink}>
          Explore services
        </a>
      </motion.div>

      {/* ── Rotating badge ── */}
      <motion.div
        className={styles.badgeWrapper}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 100 100" className={styles.rotatingText}>
          <path
            id="circlePath"
            fill="none"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
          <text fill="rgba(255,255,255,0.65)" fontSize="10.5" letterSpacing="2.5">
            <textPath href="#circlePath" startOffset="0%">
              Explore More • Scroll Down •
            </textPath>
          </text>
        </svg>
        <div className={styles.badgeIcon}>
          <ArrowDown size={20} />
        </div>
      </motion.div>

      {/* ── Hero image + float card ── */}
      <motion.div
        className={styles.imageRegion}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image clipped independently */}
        <div className={styles.imageWrapper}>
          <motion.img
            src="/assets/hero.png"
            alt="Agentic workspace"
            className={styles.mainImage}
            style={{ y: yImage, scale: 1.15 }}
          />
        </div>

        <motion.div className={styles.floatCard} style={{ y: yCard }}>
          <span className={`label ${styles.floatLabel}`}>Our Mission</span>
          <p className={styles.floatText}>
            We help companies take a bold step into the future.
          </p>
        </motion.div>
      </motion.div>

    </section>
  );
}
