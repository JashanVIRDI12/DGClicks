"use client";

import styles from "./AboutSection.module.css";
import { Users, BarChart3, Globe } from "lucide-react";
import SplitText from "./reactbits/SplitText/SplitText";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${styles.title} gradient-text`}>A new standard</h2>
        <p style={{fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", marginTop: "1rem"}}>
          We don't just design websites. We architect lead generation machines using cutting-edge tech and raw abstract aesthetics.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.cardLarge}`}>
          <div>
            <div className={styles.iconWrapper}>
              <Globe size={28} />
            </div>
            <h3 className={styles.largeTitle}>Built for the future.</h3>
            <p className={styles.cardText}>
              Our horizontal structure ensures collaboration and radical transparency. We blend premium UI/UX design with hard-hitting growth marketing tactics, scaling our clients past industry benchmarks.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.statNumber}>$2M+</div>
            <p className={styles.cardText}>Ad spend profitably managed in the last fiscal year.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.iconWrapper}>
              <Users size={28} />
            </div>
            <div className={styles.statNumber}>150+</div>
            <p className={styles.cardText}>Global clients successfully scaled.</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardLarge}`} style={{background: "var(--surface)"}}>
          <div>
            <div className={styles.iconWrapper}>
              <BarChart3 size={28} />
            </div>
            <h3 className={styles.largeTitle}>Data-driven abstract creativity.</h3>
            <p className={styles.cardText}>
              Design without strategy is just art. We marry abstract, premium visuals with robust A/B testing and precise performance metrics to ensure your interface converts perfectly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
