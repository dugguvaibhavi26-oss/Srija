"use client";

import { motion } from "framer-motion";
import styles from "./LuxuryButton.module.css";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
};

export const LuxuryButton = React.forwardRef<HTMLButtonElement, Props>(({ variant = "primary", children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`${styles.button} ${styles[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
      {...props as any}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles.glow}></div>
    </motion.button>
  );
});

LuxuryButton.displayName = "LuxuryButton";
