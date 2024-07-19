import { FeaturesSectionDemo } from "@/components/landing/Feature";
import Hero from "@/components/landing/Hero";
import { LogoScroll } from "@/components/landing/LogoScroll";
import { ScreenScroll } from "@/components/landing/Screen";
import { TwitterCard } from "@/components/landing/TwitterCard";
// import { TextRevealDemo } from "@/components/landing/TextReveal";
import Navbar from "@/components/Navbar";
import { LampDemo } from "@/components/ui/lamp";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto ">
        <Hero />
        <ScreenScroll />
        <LogoScroll />
        {/* <TextRevealDemo /> */}
        <FeaturesSectionDemo />
        <LampDemo />
        <TwitterCard />
      </main>
    </>
  );
};

export default LandingPage;
