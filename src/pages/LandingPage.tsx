import Hero from "@/components/landing/Hero";
import { LogoScroll } from "@/components/landing/LogoScroll";
import { ScreenScroll } from "@/components/landing/Screen";
import { TextRevealDemo } from "@/components/landing/TextReveal";
// import { FeaturesSectionDemo } from "@/components/landing/Feature"
import { LampDemo } from "@/components/ui/lamp";

const LandingPage = () => {
  return (
    <div className="relative text-blue-900 flex justify-center items-center flex-col overflow-hidden mx-auto">
      <Hero />
      <ScreenScroll />
      <LogoScroll />
      <TextRevealDemo />
      {/* <FeaturesSectionDemo /> */}
      <LampDemo />
    </div>
  );
};

export default LandingPage;
