"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import { useCartStore } from "../../../store/useCartStore";
import { LuxuryButton } from "../../../components/ui/LuxuryButton";
import styles from "./page.module.css";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const product = products.find((p) => p.slug === unwrappedParams.slug);
  const addItem = useCartStore((state) => state.addItem);
  
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, "Custom");
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className={styles.pdpContainer}>
      <div className={styles.splitLayout}>
        {/* Left Column: Images Slider */}
        <div className={styles.imageColumn}>
          <div className={styles.sliderTrack} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                className={styles.mainImageWrapper}
              >
                <Image 
                  src={img} 
                  alt={`${product.name} detail ${idx + 1}`}
                  fill
                  className={styles.image}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          {product.images.length > 1 && (
            <div className={styles.sliderControls}>
              <div className={styles.sliderDots}>
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Details */}
        <div className={styles.detailsColumn}>
          <div className={styles.stickyDetails}>
            <div className={styles.breadcrumb}>
              <Link href="/store">Store</Link> &mdash; {product.category}
            </div>

            <div className={styles.header}>
              <h1 className={styles.title}>{product.name}</h1>
              <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            </div>

            <div className={styles.actions}>
              <LuxuryButton variant="primary" onClick={handleAddToCart} style={{ width: '100%', padding: '20px 0' }}>
                Add To Cart
              </LuxuryButton>
              <LuxuryButton variant="outline" style={{ width: '100%', padding: '20px 0' }}>
                Book Consultation
              </LuxuryButton>
            </div>

            <div className={styles.accordions}>
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion('description')}
                >
                  Description
                  <span>{openAccordion === 'description' ? '−' : '+'}</span>
                </button>
                <div className={`${styles.accordionContent} ${openAccordion === 'description' ? styles.open : ''}`}>
                  <p className={styles.accordionText}>{product.description}</p>
                </div>
              </div>

              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion('fabric')}
                >
                  Fabric & Care
                  <span>{openAccordion === 'fabric' ? '−' : '+'}</span>
                </button>
                <div className={`${styles.accordionContent} ${openAccordion === 'fabric' ? styles.open : ''}`}>
                  <p className={styles.accordionText}>{product.fabricDetails}</p>
                </div>
              </div>

              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion('embroidery')}
                >
                  Embroidery Details
                  <span>{openAccordion === 'embroidery' ? '−' : '+'}</span>
                </button>
                <div className={`${styles.accordionContent} ${openAccordion === 'embroidery' ? styles.open : ''}`}>
                  <p className={styles.accordionText}>{product.embroideryDetails}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
