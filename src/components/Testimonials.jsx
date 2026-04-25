"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Testimonials.module.css";
import BlurText from "./reactbits/BlurText/BlurText";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      q: "Agentic completely overhauled our digital presence. The abstract aesthetic they implemented increased our time-on-site by over 300%. Absolutely phenomenal work.",
      name: "Sarah Jenkins",
      role: "CMO, TechNova"
    },
    {
      q: "The lead generation funnel is an absolute machine. We've had to hire more sales reps just to handle the massive influx of qualified inbound traffic.",
      name: "David Chen",
      role: "Founder, GrowthX"
    },
    {
      q: "They don't just build websites; they engineer premium digital experiences. The React and GSAP integrations make our brand feel decades ahead of the competition.",
      name: "Marcus Wright",
      role: "VP Marketing, Elevate"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className={styles.section}>
      <BlurText text="Client Feedback" className={styles.title} delay={100} />
      
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className={styles.cardWrapper}
          >
            <div className={styles.card}>
              <div className={styles.quoteMark}>"</div>
              <p className={styles.quote}>{reviews[currentIndex].q}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{reviews[currentIndex].name[0]}</div>
                <div className={styles.authorDetails}>
                  <h4>{reviews[currentIndex].name}</h4>
                  <p>{reviews[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.controlBtn}>
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className={styles.controlBtn}>
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
