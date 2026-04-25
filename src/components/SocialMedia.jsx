"use client";

import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  const root = useRef(null);
  useScrollReveal(root);

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>

        {/* Section header row */}
        <div className={styles.headerRow}>
          <p className={`label js-reveal ${styles.overline}`}>Online presence</p>
          <h2 className={`heading-1 js-reveal ${styles.heading}`}>
            Social media <ArrowDownRight size={36} className={styles.headArrow} />
          </h2>
        </div>

        {/* 3-card grid */}
        <div className={styles.grid} data-stagger>
          <motion.div
            className={`${styles.card} ${styles.cardGradient} js-reveal`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.iconMark} />
            <p className={`heading-2 ${styles.cardText}`}>
              Once an agent,<br />always an agent!
            </p>
          </motion.div>

          <motion.div
            className={`${styles.card} ${styles.cardCenter} js-reveal`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }} className={styles.iconMark} />
            <div className={styles.circularPattern} />
            <div style={{ textAlign: "center" }}>
              <p className={`heading-3 ${styles.cardTitle}`}>Meet Agents</p>
              <p className={`label ${styles.cardSubTitle}`}>Follow our journey</p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} ${styles.cardImage} js-reveal`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }} className={styles.iconMark} />
          </motion.div>
        </div>

        {/* CTA */}
        <div className={`js-reveal ${styles.ctaRow}`}>
          <button className="outline-pill">
            View more <ArrowUpRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
