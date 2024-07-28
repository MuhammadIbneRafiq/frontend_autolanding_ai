import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../MagicButton";
import footergrid from "@/assets/footer-grid.svg";

const socialMedia = [
  {
    id: 1,
    img: "/insta.svg",
    link: "https://instagram.com/skillonation_kids?igshid=ZDdkNTZiNTM=",
  },
  {
    id: 2,
    img: "/youtube.svg",
    link: "https://www.skillonationkids.com/",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/company/skillonationedtech/",
  },
  {
    id: 4,
    img: "/facebook.svg",
    link: "https://www.facebook.com/Skillonation/",
  },
];

const Footer = () => {
  return (
    <footer className="w-full pl-20 pr-20 pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src={footergrid}
          alt="grid"
          className="w-fit h-full opacity-50 "
          height={100}
          width={100}
        />
      </div>

      <div className="flex flex-col items-center">
        {/* <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p> */}
        <a href="/">
          <MagicButton
            title="Hire the Best"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Autolanding AI
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info: any) => (
            <a key={info.id} href={info.link}>
              <div
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <img src={info.img} alt="icons" width={20} height={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;