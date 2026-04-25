"use client";

import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import BlurText from "@/components/BlurText";
import styles from "./Footer.module.css";

export default function Footer() {
  const root = useRef(null);
  useScrollReveal(root);

  return (
    <footer ref={root} className={styles.footer}>
      <div className={styles.inner}>

        {/* ── CTA Banner ── */}
        <div className={styles.ctaBanner}>
          {/* Left: text */}
          <div className={styles.ctaLeft}>
            <span className={styles.ctaPill}>Ready to grow?</span>
            <BlurText
              text="Let's build something remarkable together."
              delay={90}
              animateBy="words"
              direction="top"
              className={`heading-1 ${styles.ctaHeading}`}
            />
            <p className={`body-lg ${styles.ctaSub}`}>
              Tell us about your project — we'll get back to you within 24 hours.
            </p>
          </div>

          {/* Right: action card */}
          <div className={`js-reveal ${styles.ctaCard}`}>
            <div className={styles.ctaCardInner}>
              <p className={styles.ctaCardLabel}>Start the conversation</p>
              <a href="/contact" className={styles.ctaMainBtn}>
                Get in touch <ArrowUpRight size={18} />
              </a>
              <div className={styles.ctaMeta}>
                <span><Mail size={12} /> hello@agentic.com</span>
                <span><MapPin size={12} /> Available worldwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`divider js-reveal`} />

        {/* ── Grid row ── */}
        <div className={styles.gridRow}>
          <div className={`js-reveal ${styles.colLogo}`}>
            <div className={styles.logoMark} />
            <span className={styles.logoText}>agentic</span>
          </div>

          <div className={`js-reveal ${styles.col}`}>
            <p className={`label ${styles.colLabel}`}>Hello</p>
            <div className={`body-base ${styles.colLinks}`}>
              <span>hello@agentic.com</span>
              <span>New York, USA</span>
              <span>10:00 AM</span>
            </div>
          </div>

          <div className={`js-reveal ${styles.col}`}>
            <p className={`label ${styles.colLabel}`}>Sections</p>
            <div className={`body-base ${styles.colLinks}`}>
              <a href="/about">About us</a>
              <a href="/cases">Case studies</a>
              <a href="/contact">Contact us</a>
              <a href="/services">Services</a>
            </div>
          </div>

          <div className={`js-reveal ${styles.col}`}>
            <p className={`label ${styles.colLabel}`}>Brochure</p>
            <div className={`body-base ${styles.colLinks}`}>
              <a href="#" className={styles.accentLink}>Take a look at our<br />presentation &rarr;</a>
            </div>
          </div>
        </div>

        <div className={`divider js-reveal`} />

        {/* ── Bottom row ── */}
        <div className={`js-reveal ${styles.bottomRow}`}>
          <p className={`label`}>© 2024 Agentic. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#" className={`label`}>in</a>
            <a href="#" className={`label`}>tw</a>
            <a href="#" className={`label`}>ig</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
