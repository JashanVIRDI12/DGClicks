"use client";

import ScrollVelocity from "./reactbits/ScrollVelocity/ScrollVelocity";
import styles from "./MarqueeSection.module.css";

export default function MarqueeSection() {
  return (
    <div className={styles.section}>
      <ScrollVelocity 
        texts={["Elevating Brands • Stunning Typography • Editorial Design • Crafted Identities • "]} 
        velocity={40} 
        className={styles.marqueeText} 
        parallaxClassName={styles.parallax}
        scrollerClassName={styles.scroller}
      />
    </div>
  );
}
