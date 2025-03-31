import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

// Analytics feature data for mapping
const analyticsFeatures = [
  {
    image: "/images/placeholder-image-3.png",
    imageFallback: "https://placehold.co/800x400/e8fbde/61e923?text=Waste+Analytics",
    title:
      "Track your waste generation patterns and enhance operational efficiency.",
    description:
      "Our advanced analytics provide actionable insights into waste management.",
    action: "Explore",
    stats: [
      { value: "47%", label: "Efficiency Increase" },
      { value: "36h", label: "Time Saved Weekly" }
    ]
  },
  {
    image: "/images/placeholder-image-4.png",
    imageFallback: "https://placehold.co/800x400/deffff/61e923?text=Data+Visualization",
    title:
      "Gain insights with line charts and heatmaps for better decision-making.",
    description:
      "Visualize data trends to optimize waste collection and reduce costs.",
    action: "Analyze",
    stats: [
      { value: "23%", label: "Cost Reduction" },
      { value: "18%", label: "Carbon Footprint" }
    ]
  },
  {
    image: "/images/placeholder-image-5.png",
    imageFallback: "https://placehold.co/800x400/f0ffe8/61e923?text=Trend+Forecasting",
    title:
      "Predict future waste trends with our intelligent forecasting tools.",
    description:
      "Stay ahead of waste management challenges with predictive analytics.",
    action: "Forecast",
    stats: [
      { value: "89%", label: "Prediction Accuracy" },
      { value: "3-6mo", label: "Future Planning" }
    ]
  },
];

export const AnalyticsSection = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-[#f8fff5] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#61e923]/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#61e923]/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        {/* Section header with highlight */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-2 bg-[#61e923]/10 rounded-full text-[#4db31e] font-medium text-sm mb-6">
            DATA-DRIVEN INSIGHTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 relative">
            <span className="relative">
              Visualize waste trends
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3C33.5 3 33.5 3 64 3C94.5 3 94.5 3 125 3C155.5 3 155.5 3 186 3C216.5 3 216.5 3 247 3C277.5 3 277.5 3 297 3" stroke="#61e923" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span> with our comprehensive analytics tools
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Transform raw data into actionable insights with powerful visualization tools designed specifically for waste management professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {analyticsFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  className="h-60 w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  alt="Analytics visualization"
                  src={feature.image}
                  onError={(e) => { e.target.src = feature.imageFallback }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-white font-bold text-2xl">{stat.value}</div>
                      <div className="text-white/80 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#4db31e] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {feature.description}
                </p>

                <button className="flex items-center gap-2 text-[#4db31e] font-medium group/button hover:gap-3 transition-all duration-300">
                  <span>{feature.action}</span>
                  <ChevronRightIcon className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <button className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 font-medium group">
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            <span className="relative z-10 flex items-center gap-3">
              Explore All Analytics Features
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};