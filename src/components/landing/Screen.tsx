import { ContainerScroll } from "../ui/container-scroll-animation";
import screen from "@/assets/screen.png";

export function ScreenScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-transparent"> {/* Ensuring the parent div has a transparent background */}
      <ContainerScroll>
        <img
          src={screen}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          style={{ backgroundColor: 'transparent' }} 
        />
      </ContainerScroll>
    </div>
  );
}
