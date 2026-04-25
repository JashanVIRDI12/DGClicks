"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Zap, Search, BarChart2, Layout } from "lucide-react";
import BlurText from "@/components/BlurText";
import AnimatedList from "@/components/reactbits/AnimatedList/AnimatedList";
import styles from "./DeviceShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    Icon: Zap,
    title: "Lightning Performance",
    desc: "Sub-second load times. 99+ Google PageSpeed scores across every device.",
  },
  {
    Icon: Search,
    title: "Discovery & Strategy",
    desc: "Deep visual research and strategic positioning baked into every brand project.",
  },
  {
    Icon: Layout,
    title: "Pixel-Perfect on Any Screen",
    desc: "Fully responsive, tested across all modern browsers and device sizes.",
  },
  {
    Icon: BarChart2,
    title: "Brand-Centric Design",
    desc: "Every layout decision is driven by purpose to elevate your overarching visual identity.",
  },
];

export default function DeviceShowcase() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Left column stagger
      gsap.from(`.${styles.leftPill}`, {
        opacity: 0, y: -12, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: `.${styles.leftCol}`, start: "top 85%", once: true }
      });
      gsap.from(`.${styles.leftHeading}`, {
        opacity: 0, y: 30, duration: 0.9, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.leftCol}`, start: "top 85%", once: true }
      });
      gsap.from(`.${styles.ctaGroup}`, {
        opacity: 0, y: 16, duration: 0.6, delay: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: `.${styles.leftCol}`, start: "top 82%", once: true }
      });

      // Macbook entrance only
      const mbk = `.${styles.macbook}`;
      gsap.from(mbk, {
        opacity: 0, y: 60, scale: 0.94, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.devicesContainer}`, start: "top 80%", once: true }
      });

      // iPhone entrance only
      const iph = `.${styles.iphone}`;
      gsap.from(iph, {
        opacity: 0, y: 40, x: 30, duration: 0.9, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.devicesContainer}`, start: "top 80%", once: true }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section}>
      <div className={styles.inner}>

        {/* ─── Left: copy + features ─── */}
        <div className={styles.leftCol}>
          <span className={styles.leftPill}>Our Craft</span>

          <BlurText
            text="Websites that work as hard as you do"
            delay={120}
            animateBy="words"
            direction="top"
            className={`heading-1 ${styles.leftHeading}`}
          />

          <AnimatedList
            items={features.map(({ Icon, title, desc }) => (
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}><Icon size={16} /></span>
                <div>
                  <p className={styles.featureTitle}>{title}</p>
                  <p className={styles.featureDesc}>{desc}</p>
                </div>
              </div>
            ))}
            showGradients={false}
            enableArrowNavigation={false}
            displayScrollbar={false}
            initialSelectedIndex={0}
          />

          <div className={styles.ctaGroup}>
            <a href="/services" className="outline-pill">
              Our services <ArrowUpRight size={14} />
            </a>
            <a href="/cases" className={styles.ghostLink}>
              View case studies →
            </a>
          </div>
        </div>

        {/* ─── Right: device mockups ─── */}
        <div className={styles.devicesContainer}>

          {/* Macbook */}
          <div className={styles.macbook}>
            <div className={styles.macbookFrame}>
              <div className={styles.browserChrome}>
                <div className={styles.trafficLights}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <div className={styles.addressBar}>yourclient.com</div>
              </div>
              <div className={styles.macbookScreen}>
                <div className={styles.desktopUI}>
                  <div className={styles.dNav}>
                    <div className={styles.dLogo}><div className={styles.dLogoMark} /><span>brand</span></div>
                    <div className={styles.dNavLinks}>
                      <span>Home</span><span>Services</span><span>About</span><span>Contact</span>
                    </div>
                    <span className={styles.dNavCta}>Get Started</span>
                  </div>
                  <div className={styles.dHero}>
                    <p className={styles.dTag}>Trusted by 50+ businesses</p>
                    <h3 className={styles.dTitle}>Grow Your Business<br />With a Website That Converts</h3>
                    <p className={styles.dSub}>Strategic • Bold • Unforgettable</p>
                    <div className={styles.dBtnRow}>
                      <span className={styles.dBtn}>Book a Free Call</span>
                      <span className={styles.dBtnGhost}>See Our Work →</span>
                    </div>
                  </div>
                  <div className={styles.dStats}>
                    <div className={styles.dStat}><span className={styles.dStatNum}>99+</span><span className={styles.dStatLbl}>Speed Score</span></div>
                    <div className={styles.dStatDiv} />
                    <div className={styles.dStat}><span className={styles.dStatNum}>3×</span><span className={styles.dStatLbl}>More Engagement</span></div>
                    <div className={styles.dStatDiv} />
                    <div className={styles.dStat}><span className={styles.dStatNum}>50+</span><span className={styles.dStatLbl}>Happy Clients</span></div>
                    <div className={styles.dStatDiv} />
                    <div className={styles.dStat}><span className={styles.dStatNum}>24/7</span><span className={styles.dStatLbl}>Support</span></div>
                  </div>
                </div>
              </div>
              <div className={styles.macbookBase} />
            </div>
          </div>

          {/* iPhone */}
          <div className={styles.iphone}>
            <div className={styles.iphoneFrame}>
              <div className={styles.iphoneNotch} />
              <div className={styles.iphoneScreen}>
                <div className={styles.mobileUI}>
                  <div className={styles.mStatusBar}>
                    <span>9:41</span>
                    <div className={styles.mStatusIcons}>
                      <div className={styles.mSignal} />
                      <div className={styles.mWifi} />
                      <div className={styles.mBattery} />
                    </div>
                  </div>
                  <div className={styles.mNav}>
                    <div className={styles.mLogo}><div className={styles.mLogoMark} /><span>brand</span></div>
                    <div className={styles.mMenuIcon}><span /><span /><span /></div>
                  </div>
                  <div className={styles.mContent}>
                    <p className={styles.mTag}>Mobile Ready</p>
                    <h3 className={styles.mTitle}>Fast &amp; Beautiful<br />On Every Device</h3>
                    <span className={styles.mBtn}>Contact Us</span>
                  </div>
                  <div className={styles.mMetrics}>
                    <div className={styles.mMetric}>
                      <span className={styles.mMetricNum}>0.8s</span>
                      <span className={styles.mMetricLbl}>Load Time</span>
                    </div>
                    <div className={styles.mMetricDivider} />
                    <div className={styles.mMetric}>
                      <span className={styles.mMetricNum}>100</span>
                      <span className={styles.mMetricLbl}>Awards</span>
                    </div>
                    <div className={styles.mMetricDivider} />
                    <div className={styles.mMetric}>
                      <span className={styles.mMetricNum}>A+</span>
                      <span className={styles.mMetricLbl}>Brand</span>
                    </div>
                  </div>
                  <div className={styles.mSpeedSection}>
                    <p className={styles.mSpeedLabel}>Visual Impact Score</p>
                    <div className={styles.mSpeedBarBg}>
                      <div className={styles.mSpeedBar} />
                    </div>
                    <p className={styles.mSpeedValue}>99 / 100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.glowOrb} />
        </div>

      </div>
    </section>
  );
}
