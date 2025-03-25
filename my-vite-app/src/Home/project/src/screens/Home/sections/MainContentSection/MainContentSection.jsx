import React from "react";

export const MainContentSection = () => {
  return (
    <section className="flex flex-col items-start gap-20 px-16 py-28 bg-white">
      <div className="flex items-center gap-20 w-full">
        <div className="flex flex-col items-start gap-6 flex-1">
          <h2 className="text-[40px] leading-[120%] font-bold font-heading-desktop-h3 text-black tracking-[0px]">
            Stay informed with real-time alerts for optimal waste management.
          </h2>

          <p className="font-text-medium-normal font-normal text-[18px] tracking-[0px] leading-[150%] text-black">
            Our Smart Notifications Panel keeps you updated on bin status with
            color-coded alerts. Receive timely notifications for overfilling,
            moisture issues, and maintenance needs to ensure efficient waste
            management.
          </p>
        </div>

        <img
          className="flex-1 h-[640px] object-cover"
          alt="Person using waste management app on smartphone"
          src="/images/placeholder-image-2.png"
        />
      </div>
    </section>
  );
};