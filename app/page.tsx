import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MoreThanBeauty } from "@/components/MoreThanBeauty";
import { Services } from "@/components/Services";
import { Academy } from "@/components/Academy";
import { EditorialSection } from "@/components/EditorialSection";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <MoreThanBeauty />
        <Services />
        <Academy />
        <EditorialSection />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
