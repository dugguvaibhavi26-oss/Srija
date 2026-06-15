"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Section5_BrandValues.module.css";
import Image from "next/image";

const brandValues = [
  { id: 1, title: "Exceptional Craftsmanship", desc: "Hand-finished detailing and couture-level artistry in every piece.", image: "/images/wedding.png" },
  { id: 2, title: "Premium Fabrics", desc: "Carefully selected fabrics designed for elegance, comfort, and durability.", image: "/images/reception.png" },
  { id: 3, title: "For Every Celebration", desc: "From Haldi to Reception, curated looks for every wedding chapter.", image: "/images/haldi.png" },
  { id: 4, title: "Customer Satisfaction", desc: "Hundreds of happy customers and memorable wedding moments.", image: "/images/sangeet.png" },
  { id: 5, title: "Attention To Detail", desc: "Every embroidery pattern, finish, and silhouette is thoughtfully crafted.", image: "/images/mehendi.png" },
  { id: 6, title: "Personal Styling", desc: "Helping brides and guests discover the perfect look.", image: "/images/wedding.png" },
  { id: 7, title: "Fast Delivery", desc: "Timely delivery without compromising craftsmanship.", image: "/images/reception.png" },
  { id: 8, title: "Luxury With Tradition", desc: "Combining heritage craftsmanship with modern couture.", image: "/images/haldi.png" },
];

export default function Section5_BrandValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(`.${styles.editorialCard}`);
    
    cards.forEach((card: any, i) => {
      const image = card.querySelector(`.${styles.imageWrapper}`);
      const text = card.querySelector(`.${styles.textContent}`);
      
      const isEven = i % 2 === 0;

      gsap.fromTo(image, 
        { scale: 0.8, opacity: 0, rotation: isEven ? -2 : 2 },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(text,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.subtitle}>The SRIJA Standard</p>
        <h2 className={styles.title}>Pillars of Couture</h2>
      </div>

      <div className={styles.editorialGrid}>
        {brandValues.map((value, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={value.id} className={`${styles.editorialCard} ${isEven ? styles.alignLeft : styles.alignRight}`}>
              <div className={styles.imageWrapper}>
                <div className={styles.imageInner} style={{ backgroundImage: `url(${value.image})` }}></div>
              </div>
              <div className={styles.textContent}>
                <span className={styles.index}>0{index + 1}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
