import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-28 px-4 md:px-16 bg-white">
      <div className="flex flex-col items-center justify-center gap-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 max-w-[768px] w-full">
          <div className="flex flex-col items-center gap-6 w-full">
            <h1 className="font-heading-desktop-h1 font-[number:var(--heading-desktop-h1-font-weight)] text-black text-[length:var(--heading-desktop-h1-font-size)] text-center tracking-[var(--heading-desktop-h1-letter-spacing)] leading-[var(--heading-desktop-h1-line-height)] [font-style:var(--heading-desktop-h1-font-style)]">
              Transform Waste Management with Smart Solutions
            </h1>

            <p className="font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              Our innovative smart waste bin system offers real-time monitoring
              and analytics to streamline waste management. Experience
              efficiency and sustainability like never before.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-black text-white border border-solid rounded-none hover:bg-black/90"
            >
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Get Started
              </span>
            </Button>

            <Button
              variant="outline"
              className="px-6 py-3 bg-[#61e923] text-black border border-solid border-black rounded-none hover:bg-[#61e923]/90"
            >
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Learn More
              </span>
            </Button>
          </div>
        </div>

        <img
          className="w-full max-h-[738px] object-cover"
          alt="Waste management illustration showing workers collecting trash with a garbage truck"
          src="/images/placeholder-image.png"
        />
      </div>
    </section>
  );
};