"use client";

import styles from "./ProcessSection.module.css";
import BlurText from "./reactbits/BlurText/BlurText";

export default function ProcessSection() {
  const steps = [
    { num: "01", title: "Discovery", desc: "We abstract your core value proposition and analyze market positioning to find untapped algorithmic potential." },
    { num: "02", title: "Strategy", desc: "Architecting the blueprint. Funnel logistics, aesthetic moodboards, and precise SEO mapping to dominate your niche." },
    { num: "03", title: "Execution", desc: "Building the engine. Abstract web development paired with high-converting copy, built natively for velocity." },
    { num: "04", title: "Growth", desc: "Launch and scale. Optimizing ad spend and organic reach continuously based on live telemetry and heatmaps." }
  ];

  return (
    <section className={styles.section}>
      <BlurText text="The Engine" className={styles.title} delay={100} />
      
      <div className={styles.timeline}>
        {steps.map((step, i) => (
          <div key={i} className={styles.stepRow}>
            <div className={styles.centerDot} />
            <div className={styles.stepNumCol}>
              <div className={styles.stepNum}>{step.num}</div>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
