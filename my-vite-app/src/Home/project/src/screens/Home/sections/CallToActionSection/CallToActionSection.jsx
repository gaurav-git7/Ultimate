import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Calendar, ShieldCheck, Users, BarChart2, Zap } from "lucide-react";

export const CallToActionSection = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Featured companies using the system
  const companies = ["City of Green Valley", "MetroWaste Inc.", "EcoSmart Solutions", "Urban Clean Tech"];
  
  // Core features with icons
  const features = [
    { 
      icon: <ShieldCheck className="w-6 h-6 text-[#61e923] group-hover:text-white transition-colors duration-300" />, 
      title: "Smart & Secure", 
      description: "End-to-end encryption and secure access controls"
    },
    { 
      icon: <Users className="w-6 h-6 text-[#61e923] group-hover:text-white transition-colors duration-300" />, 
      title: "Team Collaboration", 
      description: "Multi-user access with customized permissions" 
    },
    { 
      icon: <BarChart2 className="w-6 h-6 text-[#61e923] group-hover:text-white transition-colors duration-300" />, 
      title: "Advanced Analytics", 
      description: "Actionable insights with predictive capabilities" 
    },
    { 
      icon: <Zap className="w-6 h-6 text-[#61e923] group-hover:text-white transition-colors duration-300" />, 
      title: "Real-time Monitoring", 
      description: "Live updates and instant notifications" 
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Background Image with Modern 3D Feel */}
      <div className="absolute inset-0 z-0 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#1e5413]/80 to-[#61e923]/60 mix-blend-multiply"></div>
        <img 
          src="/images/smart-city-aerial.jpg"
          alt="Smart city with waste management integration"
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80'
          }}
        />
      </div>
      
      {/* Geometric decorative elements */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-[#61e923]/20 to-[#dbffcc]/10 blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-[#61e923]/20 to-[#4db31e]/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating 3D elements */}
      <div className="absolute top-20 left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rotate-12 animate-float"></div>
      <div className="absolute bottom-20 right-[10%] w-20 h-20 md:w-28 md:h-28 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/3 right-[20%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#61e923]/20 backdrop-blur-lg border border-white/10 shadow-xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column with expanded content - 7 columns wide */}
          <div className="lg:col-span-7 text-white">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium text-sm mb-8 w-max animate-fade-in border border-white/20">
              <span className="w-2 h-2 bg-[#61e923] rounded-full animate-pulse"></span>
              <span className="text-[#dbffcc]">REVOLUTIONIZE YOUR WASTE MANAGEMENT</span>
        </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-delay">
              <span className="relative inline-block text-[#e8fbde]">
                Smart
                <div className="absolute -bottom-2 left-0 h-1 w-full bg-[#61e923] rounded-full"></div>
              </span>
              {" "}<span className="text-white">Solutions for a</span>{" "}
              <span className="text-[#61e923]">Cleaner</span>{" "}
              <span className="text-white">Tomorrow</span>
            </h2>
            
            <p className="text-lg md:text-xl text-[#e8fbde]/90 leading-relaxed mb-10 max-w-xl animate-fade-in-delay-2">
              Join the network of forward-thinking organizations that are transforming waste management with IoT-powered solutions. Cut costs, reduce environmental impact, and make data-driven decisions.
            </p>
            
            {/* Testimonial element */}
            <div className="mb-8 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 max-w-lg shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4db31e] flex items-center justify-center font-bold text-white text-lg">
                  GV
                </div>
                <div>
                  <p className="italic text-[#dbffcc] mb-2">
                    "Since implementing SmartWaste technology, we've reduced collection costs by 42% and significantly improved our sustainability metrics."
                  </p>
                  <p className="text-sm text-[#dbffcc]/70">
                    — Sarah Johnson, Environmental Director, Green Valley City
                  </p>
                </div>
              </div>
            </div>
            
            {/* Trusted by section */}
            <div className="mb-10">
              <p className="text-[#dbffcc]/80 text-sm mb-3 font-medium">TRUSTED BY LEADING ORGANIZATIONS</p>
              <div className="flex flex-wrap gap-4 items-center">
                {companies.map((company, index) => (
                  <div 
                    key={index} 
                    className="text-white text-sm px-4 py-2 rounded-full bg-white/5 border border-[#61e923]/30 hover:border-[#61e923]/60 transition-colors duration-300"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Primary CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
                className="relative overflow-hidden bg-[#61e923] hover:bg-[#4db31e] text-gray-900 font-semibold rounded-xl px-8 py-6 h-auto transition-all duration-300 shadow-lg hover:shadow-2xl text-base flex items-center gap-3 group hover:-translate-y-1 active:translate-y-0"
                onClick={() => navigate('/signup')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Get Started Free
                  <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/40">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </span>
            </Button>

            <Button
              variant="outline"
                className="relative overflow-hidden border-2 border-[#61e923]/60 hover:border-[#61e923] bg-white/5 backdrop-blur-md text-white hover:bg-white/10 rounded-xl px-8 py-6 h-auto transition-all duration-300 shadow-md hover:shadow-xl text-base flex items-center gap-3 group hover:-translate-y-1 active:translate-y-0"
                onClick={() => navigate('/contact')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#61e923]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#61e923]/30">
                    <Calendar className="w-4 h-4" />
                  </div>
                  Schedule Demo
                </span>
              </Button>
            </div>
          </div>
          
          {/* Right column with modern 3D card - 5 columns wide */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-20 transform perspective-1000 rotate-x-2 rotate-y-2 hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-700">
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 sm:p-10 border border-[#61e923]/20 shadow-2xl overflow-hidden group">
                {/* Card glass morphism effect */}
                <div className="absolute -inset-[100px] bg-gradient-to-r from-[#61e923]/20 via-white/10 to-[#61e923]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#61e923] to-[#4db31e] flex items-center justify-center mb-6 shadow-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="white" 
                      className="w-10 h-10"
                    >
                      <path d="M3.75 5.25h16.5a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75h-16.5a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Zm3.75 3-1.5 6h2.25l.5-2h2.5l.5 2h2.25l-1.5-6h-5Zm2.5 2.5 .5-2 .5 2h-1Z" />
                      <path d="M3 3.75A.75.75 0 0 1 3.75 3h16.5a.75.75 0 0 1 0 1.5h-16.5A.75.75 0 0 1 3 3.75ZM3.75 21a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-16.5Z" />
                    </svg>
                  </div>
                
                  <h3 className="text-3xl font-bold text-white mb-2">Ready to Transform?</h3>
                  <p className="text-[#dbffcc]/80 text-lg mb-8">
                    Get started with SmartWaste today and experience the future of waste management.
                  </p>
                  
                  {/* Feature Highlights */}
                  <div className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-[#61e923]/20 group cursor-pointer ${hoveredFeature === index ? 'border-[#61e923]/50 bg-[#61e923]/10' : ''}`}
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${hoveredFeature === index ? 'bg-[#61e923]/30' : 'bg-white/10'} group-hover:bg-[#61e923]/30`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-[#dbffcc] font-medium text-lg">{feature.title}</h4>
                          <p className="text-[#e8fbde]/70 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      className="relative overflow-hidden w-full bg-gradient-to-r from-[#61e923] to-[#4db31e] hover:from-[#4db31e] hover:to-[#225c0d] text-gray-900 font-semibold rounded-xl px-6 py-6 h-auto transition-all duration-500 shadow-lg hover:shadow-2xl text-base hover:-translate-y-1 active:translate-y-0"
                      onClick={() => navigate('/signup')}
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#61e923]/0 via-white/20 to-[#61e923]/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl animate-shine"></span>
                      <span className="relative z-10">Start Your Free Trial</span>
            </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-[#dbffcc]/70 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#61e923]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#61e923]" />
                      </div>
                      No credit card required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating achievement badges */}
            {/* Remove this badge as requested */}
            
            <div className="absolute -bottom-4 -right-4 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-[#61e923]/30 shadow-lg flex items-center gap-2">
                <span className="text-[#dbffcc] text-xs font-medium">500K+ Active Bins</span>
                <div className="w-8 h-8 rounded-full bg-[#61e923]/20 flex items-center justify-center">
                  <img 
                    src="/images/bin-icon.png" 
                    alt="Bins" 
                    className="w-5 h-5"
                    onError={(e) => { e.target.src = 'https://placehold.co/40x40/61e923/ffffff?text=🗑️' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-20 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.83,101.8,114.69,97.35,171.07,87.26Z" className="fill-current"></path>
        </svg>
      </div>
    </section>
  );
};