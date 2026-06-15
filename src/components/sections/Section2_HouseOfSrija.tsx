"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./Section2_HouseOfSrija.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Section2_HouseOfSrija() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(imageRef1.current,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=1"
    )
    .fromTo(imageRef2.current,
      { y: 150, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=1.2"
    );

    // Parallax effect on scroll
    gsap.to(imageRef1.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(imageRef2.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.rightContent}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.textBlock}>
            <h2 className={styles.title}>The House<br/>of SRIJA</h2>
            <p className={styles.paragraph}>
              Founded on the principles of immaculate tailoring and visionary design, SRIJA redefines modern bridal wear. Every piece is an architectural marvel, constructed not just to be worn, but to be experienced.
            </p>
            <p className={styles.paragraph}>
              We source the rarest silks, employ master artisans who have preserved generational techniques, and spend hundreds of hours ensuring that every drape falls with poetic precision.
            </p>
          </div>
          
          <Link href="/store" passHref>
            <LuxuryButton variant="secondary">Discover Our Heritage</LuxuryButton>
          </Link>
        </motion.div>

        <div className={styles.visuals}>
          <div ref={imageRef1} className={`${styles.imageWrapper} ${styles.image1}`}>
            <Image 
              src="/images/wedding.png" 
              alt="House of Srija Craftsmanship" 
              fill 
              className={styles.placeholderImage} 
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div ref={imageRef2} className={`${styles.imageWrapper} ${styles.image2}`}>
            <Image 
              src="/images/journey-2.jpg" 
              alt="House of Srija Details" 
              fill 
              className={styles.placeholderImage} 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
