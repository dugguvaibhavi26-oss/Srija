"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./Navigation.module.css";
import { useCartStore } from "../../store/useCartStore";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleTheme = (e: any) => setIsMobileMenuOpen(false); // Close menu on navigation
    // ... we don't have setNavTheme anymore but just keeping structure
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header 
        className={`${styles.header} ${isScrolled && !isTransparent ? styles.scrolled : ""} ${isTransparent ? styles.transparentWhite : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      >
        <nav className={styles.nav}>
          <div className={styles.left}>
            {/* Hamburger Button always visible now as requested on the left */}
            <button 
              className={styles.hamburgerBtn} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineTop : ''}`}></div>
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineMiddle : ''}`}></div>
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.lineBottom : ''}`}></div>
            </button>
            <Link href="/" className={styles.logo}>
              SRIJA
            </Link>
          </div>
          
          <div className={styles.center}>
            <Link href="/collections" className={`${styles.link} ${styles.desktopOnlyLink}`}>Collections</Link>
            <Link href="/wedding-journey" className={`${styles.link} ${styles.desktopOnlyLink}`}>Wedding Journey</Link>
            <Link href="/about" className={`${styles.link} ${styles.desktopOnlyLink}`}>House of Srija</Link>
          </div>

          <div className={styles.right}>
            <Link href="/store" className={styles.iconLink} aria-label="Store">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
              </svg>
            </Link>
            
            <button className={styles.iconButton} onClick={openCart} aria-label="Cart">
              <div className={styles.cartIconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartItems.length > 0 && (
                  <span className={styles.cartBadge}>{cartItems.length}</span>
                )}
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNavLinks}>
          <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          <Link href="/store" onClick={() => setIsMobileMenuOpen(false)}>Store</Link>
          <Link href="/wedding-journey" onClick={() => setIsMobileMenuOpen(false)}>Wedding Journey</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>House of Srija</Link>
        </nav>
      </div>
    </>
  );
}
