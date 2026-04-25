"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "@/components/reactbits/SplitText/SplitText";
import styles from "./ContactContent.module.css";

gsap.registerPlugin(useGSAP);

export default function ContactContent() {
  const container = useRef();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", company: "", brief: "" });

  useGSAP(() => {
    // Elegant, slow, architectural fade up
    gsap.fromTo(
      ".gsap-reveal",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: container });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <section className={styles.contactSection} ref={container}>
      <div className={styles.contactInner}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={`gsap-reveal ${styles.eyebrow}`}>
            <span className={styles.eyebrowLine} />
            Let's Collaborate
          </div>
          
          <h1 className={styles.heading}>
            <SplitText text="Design your" delay={30} className={styles.splitText} />
            <br />
            <SplitText text="brand's future." delay={30} className={styles.splitText} />
          </h1>
          
          <p className={`gsap-reveal ${styles.subText}`}>
            We partner with visionary brands to create bold, unforgettable identities and seamless digital experiences. Tell us about your vision.
          </p>
          
          <div className={`gsap-reveal ${styles.infoGrid}`}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Inquiries</span>
              <a href="mailto:studio@agentic.com.ar" className={styles.infoValue}>studio@agentic.com.ar</a>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Studio</span>
              <span className={styles.infoValue}>New York City, NY</span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Social</span>
              <a href="#" className={styles.infoValue}>Instagram / Twitter / Behance</a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className={`gsap-reveal ${styles.rightColumn}`}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            </div>
            
            <div className={styles.formGroup}>
              <input type="text" name="company" placeholder="Company / Brand Name" onChange={handleChange} />
            </div>
            
            <div className={styles.formGroup}>
              <textarea name="brief" rows={1} placeholder="Tell us about your next project..." onChange={handleChange} required />
            </div>
            
            <button type="submit" className={styles.submitBtnWrap}>
              <span className={styles.submitBtn}>
                Submit Inquiry
              </span>
              <div className={styles.arrowIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </form>
        </div>
        
      </div>
    </section>
  );
}
