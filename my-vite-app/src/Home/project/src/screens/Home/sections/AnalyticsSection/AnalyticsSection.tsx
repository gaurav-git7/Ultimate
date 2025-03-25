import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

// Analytics feature data for mapping
const analyticsFeatures = [
  {
    image: "/placeholder-image-3.png",
    title:
      "Track your waste generation patterns and enhance operational efficiency.",
    description:
      "Our advanced analytics provide actionable insights into waste management.",
    action: "Explore",
  },
  {
    image: "/placeholder-image-4.png",
    title:
      "Gain insights with line charts and heatmaps for better decision-making.",
    description:
      "Visualize data trends to optimize waste collection and reduce costs.",
    action: "Analyze",
  },
  {
    image: "/placeholder-image-5.png",
    title:
      "Predict future waste trends with our intelligent forecasting tools.",
    description:
      "Stay ahead of waste management challenges with predictive analytics.",
    action: "Forecast",
  },
];

export const AnalyticsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start gap-20 px-16 py-28 bg-white w-full">
      <h2 className="text-[40px] leading-[120%] font-bold font-heading-desktop-h3 text-black tracking-[0px] max-w-[768px]">
        Visualize waste trends with our comprehensive analytics tools and
        insights.
      </h2>

      <div className="flex flex-col items-start gap-16 w-full">
        <div className="flex justify-center gap-12 items-start w-full">
          {analyticsFeatures.map((feature, index) => (
            <Card key={index} className="flex-1 border-none shadow-none">
              <CardContent className="flex flex-col items-start gap-8 p-0">
                <img
                  className="h-60 w-full object-cover"
                  alt="Analytics visualization"
                  src={feature.image}
                />

                <div className="flex flex-col items-start gap-8 w-full">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="text-[24px] leading-[140%] font-bold font-heading-desktop-h5 text-black tracking-[0px]">
                      {feature.title}
                    </h3>

                    <p className="font-text-regular-normal font-normal text-black text-[16px] tracking-[0px] leading-[150%]">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-2 w-full">
                    <button className="inline-flex items-center gap-2 text-black hover:underline">
                      <span className="font-text-regular-normal font-normal text-[16px] tracking-[0px] leading-[150%] whitespace-nowrap">
                        {feature.action}
                      </span>
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
