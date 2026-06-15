import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>SRIJA</h2>
          <p className={styles.tagline}>Where Tradition Meets Couture</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Explore</h4>
            <Link href="/collections" className={styles.link}>Collections</Link>
            <Link href="/store" className={styles.link}>Store</Link>
            <Link href="/wedding-journey" className={styles.link}>Wedding Journey</Link>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>House</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/real-brides" className={styles.link}>Real Brides</Link>
            <Link href="/consultation" className={styles.link}>Consultation</Link>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Connect</h4>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <a href="#" className={styles.link}>Instagram</a>
            <a href="#" className={styles.link}>WhatsApp</a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p className={styles.copyright}>© {new Date().getFullYear()} SRIJA Couture. All rights reserved.</p>
      </div>
    </footer>
  );
}
