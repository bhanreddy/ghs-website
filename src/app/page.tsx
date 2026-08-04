import SiteRuntime from "@/components/site/SiteRuntime";
import { getWebsiteGallery } from "@/lib/websiteGallery";
import {
  Nav,
  Hero,
  Marquee,
  VVM,
  About,
  Leadership,
  Facilities,
  Gallery,
  Results,
  Contact,
  Footer,
} from "@/components/site/Sections";

export default async function Home() {
  const gallery = await getWebsiteGallery();

  return (
    <>
      <SiteRuntime />
      <Nav />
      <Hero />
      <Marquee />
      <VVM />
      <About />
      <div className="ribbon"></div>
      <Leadership />
      <div className="ribbon"></div>
      <Facilities />
      <div className="ribbon"></div>
      <Gallery images={gallery} />
      <div className="ribbon"></div>
      <Results />
      <div className="ribbon"></div>
      <Contact />
      <Footer />
    </>
  );
}
