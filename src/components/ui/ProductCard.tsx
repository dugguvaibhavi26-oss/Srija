"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "../../data/products";
import { useCartStore } from "../../store/useCartStore";
import styles from "./ProductCard.module.css";
import { LuxuryButton } from "./LuxuryButton";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem(product, "Custom"); // Default size for quick add
  };

  return (
    <motion.div
      className={styles.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/store/${product.slug}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <div className={styles.imageInner}>
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              className={styles.image}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <motion.div 
            className={styles.quickViewOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <LuxuryButton variant="secondary" onClick={handleQuickAdd}>
              Quick Add
            </LuxuryButton>
          </motion.div>
        </div>

        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </Link>
    </motion.div>
  );
}
