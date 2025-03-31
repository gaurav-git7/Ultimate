import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = () => {
  // Data for feature cards
  const features = [
    {
      icon: "/images/icon---relume.svg",
      iconFallback: "📊",
      title: "Live Data",
      description:
        "Animated progress bars and interactive charts visualize your waste management in real-time.",
    },
    {
      icon: "/images/icon---relume.svg",
      iconFallback: "🔄",
      title: "Dynamic Updates",
      description:
        "Experience seamless data refreshes that keep you informed of bin status.",
    },
    {
      icon: "/images/icon---relume.svg",
      iconFallback: "📱",
      title: "Mobile Alerts",
      description:
        "Receive instant notifications when bins need attention, wherever you are.",
    },
    {
      icon: "/images/icon---relume.svg",
      iconFallback: "📈",
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights into waste patterns to optimize collection routes.",
    },
  ];

  return (
    <section className="section py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
      <div className="container-custom max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {/* Section heading with animated underline */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
              Real-Time Monitoring Dashboard
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#61e923] rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Stay updated with live waste bin data through our intuitive dashboard. Monitor your waste management system effortlessly with dynamic updates and powerful analytics.
            </p>
          </div>

          {/* Main content with animated perspective on scroll */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Interactive dashboard mockup */}
            <div className="relative perspective-component group">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#61e923]/10 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-[#61e923]/20 animate-float" style={{animationDelay: '2s'}}></div>
              
              {/* Main image with interactive elements */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform perspective-tilt group-hover:perspective-flat transition-all duration-700">
                <img
                  className="w-full h-auto object-cover"
                  alt="Smart bin monitoring dashboard"
                  src="/images/placeholder-image-1.png"
                  onError={(e) => { e.target.src = 'https://placehold.co/800x600/e8fbde/61e923?text=Dashboard+Preview' }}
                />
                
                {/* Interactive overlay elements */}
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  {/* Animated data point 1 */}
                  <div className="absolute top-[25%] left-[30%] w-4 h-4 bg-[#61e923] rounded-full animate-ping-slow"></div>
                  <div className="absolute top-[25%] left-[30%] w-20 h-24 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg scale-0 group-hover:scale-100 transition-all duration-300 text-xs transform -translate-x-1/2 -translate-y-[120%]">
                    <div className="font-medium text-[#61e923]">Bin #124</div>
                    <div className="mt-1">Fill level: 78%</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-[#61e923] rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  
                  {/* Animated data point 2 */}
                  <div className="absolute top-[45%] right-[25%] w-4 h-4 bg-[#ffaa00] rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-[45%] right-[25%] w-20 h-24 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg scale-0 group-hover:scale-100 transition-all duration-300 text-xs transform translate-x-1/2 -translate-y-[120%]">
                    <div className="font-medium text-[#ffaa00]">Bin #087</div>
                    <div className="mt-1">Fill level: 92%</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-[#ffaa00] rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 -right-8 bg-white rounded-lg shadow-xl p-4 z-20 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#61e923]"></div>
                    <span className="text-sm font-medium">24 bins optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ffaa00]"></div>
                    <span className="text-sm font-medium">3 bins need attention</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Routes optimized by 37%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Feature cards */}
            <div className="flex flex-col gap-8">
              {/* Feature intro */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Intelligent Waste Management
                </h3>
                <p className="text-gray-600 mb-6">
                  Our dashboard provides comprehensive tools to optimize your waste management operations through intelligent data analysis and visualization.
                </p>
              </div>
              
              {/* Feature cards with hover effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-100 hover:border-[#61e923]/30 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <CardContent className="flex flex-col h-full p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#61e923]/10 group-hover:bg-[#61e923]/20 flex items-center justify-center transition-colors duration-300">
                          <img
                            className="w-6 h-6"
                            alt={`${feature.title} icon`}
                            src={feature.icon}
                            onError={(e) => { 
                              e.target.outerHTML = `<div class="text-2xl">${feature.iconFallback}</div>`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#61e923] transition-colors duration-300">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#61e923] rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* CTA button */}
              <div className="mt-6">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="font-medium">Explore Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};