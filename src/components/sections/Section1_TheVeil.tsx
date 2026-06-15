"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Section1_TheVeil.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Section1_TheVeil() {
  const containerRef = useRef<HTMLElement>(null);
  const leftVeilRef = useRef<HTMLDivElement>(null);
  const rightVeilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Scroll distance for the animation
        scrub: 1, // Smooth scrubbing
        pin: true,
      }
    });

    tl.to(leftVeilRef.current, { xPercent: -100, ease: "power1.inOut" }, 0)
      .to(rightVeilRef.current, { xPercent: 100, ease: "power1.inOut" }, 0)
      .fromTo(contentRef.current, 
        { scale: 0.8, opacity: 0, y: 100 }, 
        { scale: 1, opacity: 1, y: 0, ease: "power2.out" }, 
      0.2);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.section}>
      <div ref={leftVeilRef} className={`${styles.veil} ${styles.veilLeft}`}>
        <div className={styles.silkTexture}></div>
      </div>
      <div ref={rightVeilRef} className={`${styles.veil} ${styles.veilRight}`}>
        <div className={styles.silkTexture}></div>
      </div>

      <div className={styles.heroBackground}>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImage} style={{ background: "url('/images/wedding.png') center 20%/cover" }}></div>
          <div className={styles.heroOverlay}></div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        Scroll to discover
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
