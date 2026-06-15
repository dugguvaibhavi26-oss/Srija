"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { collections } from "../../data/collections";
import styles from "./Section5_CollectionWorlds.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";
import Link from "next/link";

export default function Section5_CollectionWorlds() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollContainerRef.current?.scrollWidth || 3000}`,
        pin: true,
        scrub: 1,
      }
    });

    tl.to(scrollContainerRef.current, {
      x: () => -(scrollContainerRef.current?.scrollWidth || 0) + window.innerWidth,
      ease: "none"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Collection Worlds</h2>
        <p className={styles.subtitle}>Enter a distinct universe of couture</p>
      </div>

      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        {collections.map((collection, idx) => {
          // Fallback editorial imagery
          const bgImages = [
            "https://images.unsplash.com/photo-1596455607563-ad6193f76b11?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583391733959-b15124970220?q=80&w=2000&auto=format&fit=crop"
          ];
          const bgImg = bgImages[idx % bgImages.length];

          return (
            <div key={collection.id} className={styles.worldPanel}>
              <div className={styles.visual}>
                <div className={styles.placeholderImage} style={{ background: `url('${bgImg}') center/cover` }}></div>
                <div className={styles.overlay}></div>
              </div>
              
              <div className={styles.content}>
                <span className={styles.worldNumber}>0{idx + 1}</span>
                <h3 className={styles.worldName}>{collection.name}</h3>
                <p className={styles.worldDesc}>{collection.description}</p>
                <Link href="/store" passHref>
                  <LuxuryButton variant="primary">Explore World</LuxuryButton>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
