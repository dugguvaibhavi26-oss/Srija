"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./Section3_Craftsmanship.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";

const categories = [
  { name: "Bridal Lehengas", image: "/images/wedding.png", desc: "For your most special day", slug: "Bridal Lehengas" },
  { name: "Gowns", image: "/images/reception.png", desc: "Contemporary elegance", slug: "Gowns" },
  { name: "Anarkalis", image: "/images/haldi.png", desc: "Timeless heritage silhouettes", slug: "Anarkalis" },
  { name: "Festive Wear", image: "/images/sangeet.png", desc: "Celebrate in vibrant colors", slug: "Festive Wear" },
  { name: "Pre-Draped Sarees", image: "/images/mehendi.png", desc: "Modern ease and tradition", slug: "Pre-Draped Sarees" }
];

export default function Section3_Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startScroll = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        interval = setInterval(() => {
          if (cardsRef.current) {
            const container = cardsRef.current;
            const cards = container.querySelectorAll('a');
            if (cards.length === 0) return;
            
            let currentIndex = 0;
            let minDiff = Infinity;
            
            cards.forEach((card, index) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const containerCenter = container.scrollLeft + container.offsetWidth / 2;
              const diff = Math.abs(cardCenter - containerCenter);
              
              if (diff < minDiff) {
                minDiff = diff;
                currentIndex = index;
              }
            });
            
            const nextIndex = currentIndex + 1;
            
            if (nextIndex >= cards.length) {
              container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              const nextCard = cards[nextIndex] as HTMLElement;
              const scrollTarget = nextCard.offsetLeft - (container.clientWidth / 2) + (nextCard.clientWidth / 2);
              container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
            }
          }
        }, 1300);
      }
    };

    startScroll();
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Discover</p>
        <h2 ref={titleRef} className={styles.title}>Shop By Category</h2>
      </div>

      <div ref={cardsRef} className={styles.showcase}>
        {categories.map((category, idx) => (
          <Link key={category.name} href={`/store?category=${encodeURIComponent(category.slug)}`} passHref className={styles.cardLink}>
            <motion.div 
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div className={styles.imageContainer}>
                <div className={styles.lens}></div>
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className={styles.placeholderImage} 
                />
              </div>
              <div className={styles.info}>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
      <div className={styles.footer}>
        <Link href="/store" passHref>
          <LuxuryButton variant="outline">View All Collections</LuxuryButton>
        </Link>
      </div>
    </section>
  );
}
