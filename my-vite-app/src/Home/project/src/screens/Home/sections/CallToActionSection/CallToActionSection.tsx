import React from "react";
import { Button } from "../../../../components/ui/button";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="w-full py-28 px-16 bg-white">
      <div className="flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <h2 className="text-[48px] font-bold leading-[120%] font-heading-desktop-h2 tracking-[0px]">
            Join the Smart Waste Revolution
          </h2>
        </div>

        <div className="flex-1 flex flex-col gap-8">
          <p className="text-[18px] leading-[150%] font-text-medium-normal font-normal tracking-[0px] text-black">
            Transform your waste management practices by integrating our smart
            monitoring system. Experience efficiency and sustainability like
            never before.
          </p>

          <div className="flex gap-4">
            <Button
              variant="default"
              className="bg-black text-white border border-solid border-black rounded-none px-6 py-3 h-auto font-text-regular-normal text-[16px] leading-[150%] font-normal"
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              className="bg-transparent text-black border border-solid border-black rounded-none px-6 py-3 h-auto font-text-regular-normal text-[16px] leading-[150%] font-normal"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
