import type { Metadata } from "next";
import "./globals.css";
import "../styles/design-system.css";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import LoadingSequence from "../components/layout/LoadingSequence";
import SideDrawer from "../components/ui/SideDrawer";
import { SmoothScrollProvider } from "../components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "SRIJA | Digital Couture House",
  description: "Where Tradition Meets Couture. Experience luxury digital storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <LoadingSequence />
          <Navigation />
          <SideDrawer />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
