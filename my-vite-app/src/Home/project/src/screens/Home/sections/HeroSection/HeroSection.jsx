import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = () => {
  // Data for feature cards
  const features = [
    {
      icon: "/images/icon---relume.svg",
      title: "Live Data",
      description:
        "Animated progress bars and interactive charts visualize your waste management in real-time.",
    },
    {
      icon: "/images/icon---relume.svg",
      title: "Dynamic Updates",
      description:
        "Experience seamless data refreshes that keep you informed of bin status.",
    },
  ];

  return (
    <section className="section bg-light py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 sm:gap-10 w-full md:w-1/2">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-heading-desktop-h2 text-2xl sm:text-3xl md:text-[length:var(--heading-desktop-h2-font-size)] leading-tight md:leading-[var(--heading-desktop-h2-line-height)] font-[number:var(--heading-desktop-h2-font-weight)] tracking-[var(--heading-desktop-h2-letter-spacing)] [font-style:var(--heading-desktop-h2-font-style)] text-dark">
                Real-Time Monitoring: Stay Updated with Live Waste Bin Data
              </h2>
              <p className="font-text-medium-normal text-base sm:text-lg md:text-[length:var(--text-medium-normal-font-size)] leading-relaxed md:leading-[var(--text-medium-normal-line-height)] font-[number:var(--text-medium-normal-font-weight)] tracking-[var(--text-medium-normal-letter-spacing)] [font-style:var(--text-medium-normal-font-style)] text-gray-700">
                Our dashboard provides real-time insights into bin fill levels and
                moisture content. Monitor your waste management system
                effortlessly with dynamic updates.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="card h-full">
                    <CardContent className="flex flex-col items-start gap-4 p-5 sm:p-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-100 flex-center">
                        <img
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          alt={`${feature.title} icon`}
                          src={feature.icon}
                        />
                      </div>
                      <h3 className="font-heading-desktop-h6 text-lg sm:text-[length:var(--heading-desktop-h6-font-size)] leading-tight sm:leading-[var(--heading-desktop-h6-line-height)] font-[number:var(--heading-desktop-h6-font-weight)] tracking-[var(--heading-desktop-h6-letter-spacing)] [font-style:var(--heading-desktop-h6-font-style)] text-dark">
                        {feature.title}
                      </h3>
                      <p className="font-text-regular-normal text-sm sm:text-[length:var(--text-regular-normal-font-size)] leading-relaxed sm:leading-[var(--text-regular-normal-line-height)] font-[number:var(--text-regular-normal-font-weight)] tracking-[var(--text-regular-normal-letter-spacing)] [font-style:var(--text-regular-normal-font-style)] text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
            <div className="absolute inset-0 -m-4 bg-primary rounded-3xl opacity-5 transform -rotate-1"></div>
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400">
              <img
                className="h-auto w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover"
                alt="Smart bin monitoring dashboard"
                src="/images/placeholder-image-1.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};