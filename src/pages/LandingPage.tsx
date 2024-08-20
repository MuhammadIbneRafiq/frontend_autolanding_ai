import { useNavigate } from "react-router-dom";
import Footer from "@/components/landing/Footer";
import { HeroHighlightDemo } from "@/components/landing/HeroHighlight";
import { LogoScroll } from "@/components/landing/LogoScroll";
import { ScreenScroll } from "@/components/landing/Screen";
import { TwitterCard } from "@/components/landing/TwitterCard";
import { LampDemo } from "@/components/ui/lamp";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "@/components/MagicButton";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chatHome");
  };

  return (
    <div className="pb-40 pt-40">
      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="gray"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Grid */}
      <div
        className="dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.03]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-40 item-center">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-md text-center text-black dark:text-blue-300 max-w-80 font-medium">
            Hire by chatting with our AI.
          </p>

          <TextGenerateEffect
            words="Auto Landing AI: Hire 3x faster and better."
            className="text-center text-[40px] md:text-6xl lg:text-7xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-black dark:text-white">
            Tired of fake reviews on fiverr? Hire verified Freelancer by simply
            chatting
          </p>

          <button onClick={handleButtonClick}>
            <MagicButton
              title="Try for free"
              icon={<FaLocationArrow />}
              position="right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <main className="relative -mt-28 bg-white dark:bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto">
        <Hero />
        <ScreenScroll />
        <LogoScroll />
        <HeroHighlightDemo />
        <LampDemo />
        <TwitterCard />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
