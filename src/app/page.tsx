import Section1_TheVeil from "@/components/sections/Section1_TheVeil";
import Section2_HouseOfSrija from "@/components/sections/Section2_HouseOfSrija";
import Section3_Craftsmanship from "@/components/sections/Section3_Craftsmanship";
import Section4_WeddingJourney from "@/components/sections/Section4_WeddingJourney";
import Section5_BrandValues from "@/components/sections/Section5_BrandValues";
import Section6_DigitalRunway from "@/components/sections/Section6_DigitalRunway";
import Section7_RealBrides from "@/components/sections/Section7_RealBrides";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Section1_TheVeil />
      <Section2_HouseOfSrija />
      <Section3_Craftsmanship />
      <Section4_WeddingJourney />
      <Section5_BrandValues />
      <Section6_DigitalRunway />
      <Section7_RealBrides />
    </main>
  );
}
