import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Leadership from "@/components/sections/Leadership";
import AboutVVM from "@/components/sections/AboutVVM";
import Academics from "@/components/sections/Academics";
import Facilities from "@/components/sections/Facilities";
import Gallery from "@/components/sections/Gallery";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Admissions from "@/components/sections/Admissions";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import DiagonalDivider from "@/components/ui/DiagonalDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Leadership />
        <AboutVVM />
        <DiagonalDivider fromColor="var(--brand-surface)" toColor="var(--brand-bg)" direction="right" />
        <Academics />
        <Facilities />
        <DiagonalDivider fromColor="var(--brand-surface)" toColor="var(--brand-bg)" direction="left" />
        <Gallery />
        <Stats />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
