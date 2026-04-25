"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Case study", href: "/cases" },
  { text: "Services", href: "/services" },
  { text: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <a href="/" className={styles.logo}>
          <div className={styles.logoMark} />
          <span className={styles.logoText}>agentic</span>
        </a>

        <nav className={styles.navLinks} aria-label="Primary navigation" onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {navItems.map((item, index) => (
              <a
                key={item.text}
                href={item.href}
                className={`label ${styles.link}`}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {hoveredIndex === index && (
                  <motion.div
                    className={styles.linkBackground}
                    layoutId="navbar-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                  />
                )}
                <span className={styles.linkText}>{item.text}</span>
              </a>
            ))}
          </AnimatePresence>
        </nav>

        <div className={styles.navRight}>
          <a href="/contact" className={`outline-pill ${styles.contactBtn}`}>
            Contact us <ArrowUpRight size={14} />
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.22 } }}
          >
            <nav className={styles.mobileNav}>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                >
                  {item.text}
                </motion.a>
              ))}
            </nav>
            <a
              href="/contact"
              className={`outline-pill ${styles.mobileCta}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact us <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
