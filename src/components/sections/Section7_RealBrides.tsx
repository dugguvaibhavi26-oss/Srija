import styles from "./Section7_RealBrides.module.css";
import { LuxuryButton } from "../ui/LuxuryButton";

const reviews = [
  { id: 1, name: "Kavitha Jagini", text: "Best place for Bridesmaid lehengas at reasonable prices.", image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b11?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Jatin Singh", text: "This store offers amazing choices with prices that are just right!", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Pinky Pirgal", text: "Wonderful experience, friendly and attentive service from the salesperson!", image: "https://images.unsplash.com/photo-1583391733959-b15124970220?q=80&w=400&auto=format&fit=crop" }
];

export default function Section7_RealBrides() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>Client Review</p>
          <h2 className={styles.title}>What They Say?</h2>
          <p className={styles.desc}>Stories from our beloved brides who chose SRIJA for their special day.</p>
        </div>

        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <div key={review.id} className={`${styles.reviewCard} ${index === 1 ? styles.highlightCard : ""}`}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar} style={{ backgroundImage: `url(${review.image})` }}></div>
                <div className={styles.stars}>★★★★★</div>
              </div>
              <h3 className={styles.clientName}>{review.name}</h3>
              <p className={styles.clientText}>"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <LuxuryButton variant="primary">Read More Stories</LuxuryButton>
        </div>
      </div>
    </section>
  );
}
