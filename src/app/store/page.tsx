"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";
import { ProductCard } from "../../components/ui/ProductCard";
import styles from "./page.module.css";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Bridal Lehengas", "Gowns", "Anarkalis", "Festive Wear", "Pre-Draped Sarees"];

export default function StorePage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, sortOption]);

  return (
    <main className={styles.storePage}>
      <div className={styles.hero} style={{ background: "url('/images/sangeet.png') center 30%/cover", position: "relative", marginBottom: "var(--space-16)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }}></div>
        <div style={{ position: "relative", zIndex: 1, padding: "var(--space-24) var(--space-6)" }}>
          <motion.h1 
            className={styles.title}
            style={{ color: "var(--color-ivory)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            The Boutique
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            style={{ color: "var(--color-champagne)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Our Complete Collection
          </motion.p>
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.filterBar}>
          <div className={styles.categories}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`${styles.categoryPill} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sortWrapper}>
          <div className={styles.sortContainer}>
            <span className={styles.sortLabel}>Sort By:</span>
            <select 
              className={styles.sortSelect} 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.emptyState}>
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
