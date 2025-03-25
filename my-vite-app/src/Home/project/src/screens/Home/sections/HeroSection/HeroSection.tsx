import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
  // Data for feature cards
  const features = [
    {
      icon: "/icon---relume.svg",
      title: "Live Data",
      description:
        "Animated progress bars and interactive charts visualize your waste management in real-time.",
    },
    {
      icon: "/icon---relume.svg",
      title: "Dynamic Updates",
      description:
        "Experience seamless data refreshes that keep you informed of bin status.",
    },
  ];

  return (
    <section className="bg-white py-28 px-16">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-6">
            <h2 className="font-heading-desktop-h3 text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-[number:var(--heading-desktop-h3-font-weight)] tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)] text-black">
              Real-Time Monitoring: Stay Updated with Live Waste Bin Data
            </h2>
            <p className="font-text-medium-normal text-[length:var(--text-medium-normal-font-size)] leading-[var(--text-medium-normal-line-height)] font-[number:var(--text-medium-normal-font-weight)] tracking-[var(--text-medium-normal-letter-spacing)] [font-style:var(--text-medium-normal-font-style)] text-black">
              Our dashboard provides real-time insights into bin fill levels and
              moisture content. Monitor your waste management system
              effortlessly with dynamic updates.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 py-2">
              {features.map((feature, index) => (
                <Card key={index} className="flex-1 border-none bg-transparent">
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <img
                      className="w-12 h-12"
                      alt="Icon relume"
                      src={feature.icon}
                    />
                    <h3 className="font-heading-desktop-h6 text-[length:var(--heading-desktop-h6-font-size)] leading-[var(--heading-desktop-h6-line-height)] font-[number:var(--heading-desktop-h6-font-weight)] tracking-[var(--heading-desktop-h6-letter-spacing)] [font-style:var(--heading-desktop-h6-font-style)] text-black">
                      {feature.title}
                    </h3>
                    <p className="font-text-regular-normal text-[length:var(--text-regular-normal-font-size)] leading-[var(--text-regular-normal-line-height)] font-[number:var(--text-regular-normal-font-weight)] tracking-[var(--text-regular-normal-letter-spacing)] [font-style:var(--text-regular-normal-font-style)] text-black">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <img
            className="h-[640px] w-full object-cover"
            alt="Placeholder image"
            src="/placeholder-image-1.png"
          />
        </div>
      </div>
    </section>
  );
};
