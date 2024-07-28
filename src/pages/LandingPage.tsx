// import { FeaturesSectionDemo } from "@/components/landing/Feature";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import { HeroHighlightDemo } from "@/components/landing/HeroHighlight";
import { LogoScroll } from "@/components/landing/LogoScroll";
import { ScreenScroll } from "@/components/landing/Screen";
import { TwitterCard } from "@/components/landing/TwitterCard";
// import { TextRevealDemo } from "@/components/landing/TextReveal";
import { LampDemo } from "@/components/ui/lamp";

const LandingPage = () => {
  return (
    <>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto ">
        <Hero />
        <ScreenScroll />
        <LogoScroll />
        <HeroHighlightDemo />
        {/* <TextRevealDemo /> */}
        {/* <FeaturesSectionDemo /> */}
        <LampDemo />
        <TwitterCard />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;