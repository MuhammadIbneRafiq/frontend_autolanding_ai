import { ContainerScroll } from "../ui/container-scroll-animation";
// import screen from "@/assets/screen.png";
import demo from "@/assets/demo.gif"

export function ScreenScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-background"> {/* Ensuring the parent div has a transparent background */}
      <ContainerScroll>
        <img
          src={demo}
          alt="hero"
          height={720}
          width={1670}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          style={{ backgroundColor: 'transparent' }} 
        />
      </ContainerScroll>
    </div>
  );
}
