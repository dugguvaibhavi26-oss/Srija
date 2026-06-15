"use client";

import { useEffect, useRef } from "react";
import { playLoadingAnimation } from "../../animations/heroAnimations";
import { useAppStore } from "../../store/useAppStore";
import styles from "./LoadingSequence.module.css";

export default function LoadingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoadingComplete, setLoadingComplete } = useAppStore();

  useEffect(() => {
    if (!isLoadingComplete && containerRef.current) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
      
      const tl = playLoadingAnimation(() => {
        setLoadingComplete(true);
        // Enable scrolling
        document.body.style.overflow = "";
      });

      return () => {
        tl.kill();
        document.body.style.overflow = "";
      };
    }
  }, [isLoadingComplete, setLoadingComplete]);

  if (isLoadingComplete) return null;

  return (
    <div ref={containerRef} className={`${styles.container} loading-container`}>
      <div className={`${styles.particles} loading-particles`}></div>
      <div className={styles.content}>
        <h1 className={`${styles.logo} loading-logo`}>SRIJA</h1>
        <div className={styles.taglineWrapper}>
          <span className={`${styles.taglineText} loading-text`}>Where</span>
          <span className={`${styles.taglineText} loading-text`}>Tradition</span>
          <span className={`${styles.taglineText} loading-text`}>Meets</span>
          <span className={`${styles.taglineText} loading-text`}>Couture</span>
        </div>
      </div>
    </div>
  );
}
