import Section5_BrandValues from "../../components/sections/Section5_BrandValues";

export default function CollectionsPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-background)" }}>
      <div style={{ 
        position: "relative",
        padding: "160px var(--space-12) var(--space-24)", 
        textAlign: "center",
        background: "url('/images/haldi.png') center 40%/cover"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-6xl)", color: "var(--color-ivory)" }}>The SRIJA Standard</h1>
          <p style={{ color: "var(--color-champagne)", marginTop: "var(--space-4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Discover our pillars of couture</p>
        </div>
      </div>
      <Section5_BrandValues />
    </main>
  );
}
