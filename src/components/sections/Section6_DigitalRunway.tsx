"use client";

import { useRef, useEffect } from "react";
import styles from "./Section6_DigitalRunway.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";
import Link from "next/link";

const looks = [
  { id: 1, name: "Look 01", image: "/images/wedding.png" },
  { id: 2, name: "Look 02", image: "/images/reception.png" },
  { id: 3, name: "Look 03", image: "/images/sangeet.png" },
  { id: 4, name: "Look 04", image: "/images/mehendi.png" }
];

export default function Section6_DigitalRunway() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column: Title */}
        <div className={styles.leftColumn}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.largeText}>The<br/>Show</h3>
            <p className={styles.introDesc}>Scroll to experience the runway.</p>
            <div style={{ marginTop: '3rem' }}>
              <Link href="/store" passHref>
                <LuxuryButton variant="primary">Shop The Runway</LuxuryButton>
              </Link>
            </div>
            {/* Mobile hint */}
            <div className={styles.mobileSwipeHint}>
              Slide for more <span style={{ marginLeft: 8 }}>&rarr;</span>
            </div>
          </div>
        </div>

        {/* Right Column: Native Horizontal Scroll */}
        <div ref={trackRef} className={styles.rightColumn}>
          <div className={styles.cardsTrack}>
            {looks.map((look) => (
              <div key={look.id} className={styles.lookCard}>
                <div className={styles.imageWrapper}>
                  <div 
                    className={styles.imageInner} 
                    style={{ backgroundImage: `url(${look.image})` }}
                  ></div>
                </div>
                <div className={styles.lookInfo}>
                  <span className={styles.lookName}>{look.name}</span>
                  <Link href="/store" passHref>
                    <LuxuryButton variant="outline">View Details</LuxuryButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
