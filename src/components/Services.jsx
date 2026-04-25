"use client";

import { useRef, useState } from "react";
import { ChevronDown, MonitorSmartphone, TrendingUp, Share2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import BlurText from "@/components/BlurText";
import styles from "./Services.module.css";

const services = [
  {
    title: "Website Design",
    desc: "We create, design, and develop tailor-made end-to-end digital solutions — from strategy through to a conversion-optimised final product.",
    tags: ["UI/UX Design", "Web Development", "Conversion Optimisation", "Mobile & Desktop"],
    Icon: MonitorSmartphone,
  },
  {
    title: "Brand Strategy & Identity",
    desc: "We dive deep into your market to establish a cohesive visual language and strategic positioning that ensures you stand out.",
    tags: ["Logo Design", "Visual Language", "Typography", "Guidelines"],
    Icon: TrendingUp,
  },
  {
    title: "Social Media Management",
    desc: "Building magnetic social presences through targeted content strategy, community growth, and viral creative execution.",
    tags: ["Content Creation", "Community Management", "Paid Social"],
    Icon: Share2,
  },
  {
    title: "Graphic Design Solutions",
    desc: "From striking editorial layouts to custom iconography, we deliver world-class creative assets tailored to communicate your unique value.",
    tags: ["Editorial", "Illustration", "Digital Assets", "Motion"],
    Icon: Layers,
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const root = useRef(null);
  useScrollReveal(root);

  return (
    <section id="services" ref={root} className={styles.section}>
      <div className={styles.inner}>

        {/* ── Left sticky column ── */}
        <div className={styles.leftCol}>
          <p className={`label js-reveal ${styles.overline}`}>What we do</p>
          <BlurText
            text="Agentic services"
            delay={140}
            animateBy="words"
            direction="top"
            className={`heading-1 ${styles.heading}`}
          />
          <p className={`body-base js-reveal ${styles.desc}`}>
            At Agentic we build a horizontal organisation where collaboration,
            camaraderie, and honesty are the basis of our culture.
          </p>
        </div>

        {/* ── Right accordion column ── */}
        <div className={styles.accordionList} data-stagger>
          {services.map((svc, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.accItem} js-reveal`}
                data-active={isOpen}
              >
                <button
                  className={styles.accHeader}
                  onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.accLeft}>
                    <svc.Icon size={20} className={styles.accIcon} />
                    <span className={`heading-3 ${styles.accTitle}`}>{svc.title}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.chevron}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.accBody}
                  style={{ overflow: "hidden" }}
                >
                  <p className={`body-base ${styles.accDesc}`}>{svc.desc}</p>
                  <div className={styles.tags}>
                    {svc.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
