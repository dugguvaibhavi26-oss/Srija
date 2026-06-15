"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";
import styles from "./SideDrawer.module.css";
import Image from "next/image";
import { LuxuryButton } from "./LuxuryButton";

export default function SideDrawer() {
  const { isCartOpen, closeCart, items, removeItem, getCartTotal } = useCartStore();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Your Couture</h2>
              <button onClick={closeCart} className={styles.closeBtn}>Close</button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Your journey is currently empty.</p>
                  <LuxuryButton variant="outline" onClick={closeCart}>Explore Collections</LuxuryButton>
                </div>
              ) : (
                <div className={styles.itemList}>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className={styles.cartItem}>
                      <div className={styles.itemImageContainer}>
                        {/* Placeholder image representation until real images are added */}
                        <div className={styles.imagePlaceholder} />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemName}>{item.product.name}</h4>
                        <p className={styles.itemMeta}>Size: {item.size} | Qty: {item.quantity}</p>
                        <p className={styles.itemPrice}>₹{item.product.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id, item.size)}
                        className={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Total Investment</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <LuxuryButton variant="primary" style={{ width: '100%' }}>
                  Proceed to Checkout
                </LuxuryButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
