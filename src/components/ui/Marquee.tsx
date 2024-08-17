export const Marquee: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <div className="overflow-hidden sm:mt-24 z-10 mb-52">
        <div className="relative flex max-w-[2500px] overflow-hidden py-5">
          <div className="flex animate-marquee [--duration:40s]">
            {children}
            {children}
          </div>
        </div>
      </div>
    );
  };