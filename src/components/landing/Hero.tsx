import { useNavigate } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';
// import MagicButton from "@/components/MagicButton";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
// import ChatInterface from '../ChatInterface';

const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/chat1');
  };

  return (
    <div className="pb-10 pt-36 bg-transparent">
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-900 max-w-80">
            AI-Powered Solutions for Your Business
          </p>

          <TextGenerateEffect
            words="Empowering Businesses with Intelligent AI Freelance Services"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-blue-900">
            Connect with top AI freelancers and agencies to transform your ideas into reality.
          </p>

          <button onClick={handleButtonClick} className="text-black bg-white px-12 py-4 rounded-full transition duration-300 ease-in-out transform hover:bg-gray-200 active:bg-gray-300 shadow-lg">
            Try for free
          </button>
        </div>
      </div>
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>
    </div>
  );
};

export default Hero;