"use client";

import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { occasions } from "../../data/occasions";
import styles from "./Section4_WeddingJourney.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";
import Link from "next/link";

function CarouselItem({ occasion, index, totalItems, radius }: { occasion: any, index: number, totalItems: number, radius: number }) {
  const angle = (index / totalItems) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={[x, 0, z]} rotation={[0, angle, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 1.0, 3.5, 64, 64, true]} />
          <MeshDistortMaterial 
            color={occasion.atmosphere.colorPalette[0]} 
            envMapIntensity={2.5} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            distort={0.4} 
            speed={1.5} 
            roughness={0.1}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CarouselScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.2; // Tightly packed to remove empty space between models
  const totalItems = occasions.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate backwards so that positive index items come to the front
      const targetRotation = -(scrollProgress * 4) * ((Math.PI * 2) / totalItems);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
      
      // Center and scale down on mobile to fit the card below without overlapping
      const baseY = isMobile ? 0.5 : -0.5;
      groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.scale.setScalar(isMobile ? 0.65 : 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {occasions.map((occasion, index) => (
        <CarouselItem 
          key={occasion.id} 
          occasion={occasion} 
          index={index} 
          totalItems={totalItems} 
          radius={radius} 
        />
      ))}
      <mesh position={[0, -1.75, 0]}>
        <cylinderGeometry args={[6.5, 6.5, 0.05, 64]} />
        <meshStandardMaterial color="#FAF9F6" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Section4_WeddingJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const cardVisibleRef = useRef(true);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state
    gsap.set(cardRef.current, { opacity: 1, y: 0, x: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=400%", // Longer scroll for graceful pacing
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
        
        // Exact index position (0 to 4)
        const exactIndex = self.progress * 4;
        const closestIndex = Math.max(0, Math.min(Math.round(exactIndex), occasions.length - 1));
        const distanceToCenter = Math.abs(exactIndex - closestIndex);
        
        // Only show card if the model is perfectly centered (distance < 0.2)
        if (distanceToCenter < 0.2) {
          if (!cardVisibleRef.current || closestIndex !== activeIndexRef.current) {
            activeIndexRef.current = closestIndex;
            setActiveIndex(closestIndex); // React re-render for colors
            gsap.to(cardRef.current, { opacity: 1, y: 0, x: 0, duration: 0.3, ease: "power2.out" });
            cardVisibleRef.current = true;
          }
        } else {
          if (cardVisibleRef.current) {
            gsap.to(cardRef.current, { opacity: 0, y: 50, x: 0, duration: 0.3, ease: "power2.in" });
            cardVisibleRef.current = false;
          }
        }
      }
    });

      // Dispatch event to make navigation transparent/white
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Match exactly the pin duration so it doesn't un-transparent midway!
        onEnter: () => window.dispatchEvent(new CustomEvent("setNavTheme", { detail: true })),
        onLeave: () => window.dispatchEvent(new CustomEvent("setNavTheme", { detail: false })),
        onEnterBack: () => window.dispatchEvent(new CustomEvent("setNavTheme", { detail: true })),
        onLeaveBack: () => window.dispatchEvent(new CustomEvent("setNavTheme", { detail: false }))
      });
    }, { scope: containerRef });

  const activeOccasion = occasions[activeIndex];

  return (
    <section ref={containerRef} className={styles.section} style={{ backgroundColor: "var(--color-ivory-dark)" }}>
      
      {/* 3D Canvas Layer */}
      <div className={styles.canvasContainer}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={25} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
          <spotLight position={[-10, 10, 10]} intensity={1.5} color={activeOccasion?.atmosphere?.colorPalette[1]} />
          
          <Suspense fallback={null}>
            <CarouselScene scrollProgress={progress} />
          </Suspense>
          
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* HTML Overlay Layer */}
      <div className={styles.htmlOverlay}>
        <div ref={cardRef} className={styles.activeCard}>
          <span className={styles.chapterNumber}>CHAPTER 0{activeIndex + 1}</span>
          <h3 className={styles.occasionName}>{activeOccasion?.name}</h3>
          <p className={styles.occasionDesc}>{activeOccasion?.description}</p>
          <Link href="/store" className={styles.ctaButton}>Explore Collection</Link>
          
          <div className={styles.progressContainer}>
            {occasions.map((_, idx) => (
              <div 
                key={idx} 
                className={`${styles.progressDot} ${idx === activeIndex ? styles.progressDotActive : ''}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
