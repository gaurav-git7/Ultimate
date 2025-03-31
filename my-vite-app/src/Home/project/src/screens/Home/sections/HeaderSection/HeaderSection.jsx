import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section id="about-section" className="relative w-full py-20 sm:py-24 md:py-28 lg:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-[#e8fbde] via-white to-[#dfffd6] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#61e923] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#4db31e] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-[#dbffcc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
        <div className="leaf leaf-4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-6 max-w-full md:max-w-[50%] w-full text-left">
            <div className="inline-block px-4 py-1 bg-[#61e923]/20 rounded-full mb-2">
              <span className="text-[#2d7b0f] font-medium text-sm">About SmartWaste</span>
            </div>
            
            <h1 className="font-heading-desktop-h1 font-bold text-dark text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] animate-fade-in">
              Transform <span className="text-[#61e923]">Waste Management</span> with Smart Solutions
            </h1>

            <p className="font-text-medium-normal font-normal text-gray-700 text-lg sm:text-xl leading-relaxed max-w-xl animate-fade-in-delay">
              Founded in 2020, SmartWaste is a pioneer in intelligent waste management solutions. 
              Our mission is to revolutionize how cities and businesses handle waste through 
              cutting-edge technology and sustainable practices.
            </p>
            
            <p className="font-text-medium-normal font-normal text-gray-700 text-base leading-relaxed max-w-xl animate-fade-in-delay-2 mt-2">
              With a team of experts in IoT technology and environmental science, we've developed 
              a comprehensive system that reduces collection costs, minimizes environmental impact, 
              and provides valuable analytics for better decision making.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center mt-4 animate-fade-in-delay-2">
              <Button 
                onClick={() => navigate('/login')}
                className="relative overflow-hidden bg-[#61e923] hover:bg-[#4db31e] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 font-medium flex items-center gap-2">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </Button>

              <Button
                variant="outline"
                className="relative overflow-hidden border-2 border-[#61e923]/60 hover:border-[#61e923] text-[#2d7b0f] bg-transparent hover:bg-[#61e923]/10 px-8 py-3 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group"
                onClick={() => scrollToSection('main-section')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 font-medium">
                  Learn More
                </span>
              </Button>
              
              <div className="hidden md:flex items-center mt-2 ml-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <img src={`/images/avatar-${i}.png`} alt="User" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/image-5.png' }} />
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Join 2,000+ users</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="text-[#61e923]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#61e923]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Eco-friendly solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#61e923]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Cost-effective</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[45%] relative group">
            <div className="absolute inset-0 -m-4 bg-[#61e923] rounded-3xl opacity-5 transform rotate-1 group-hover:rotate-2 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-[#61e923]/10 blur-xl rounded-3xl opacity-70 -z-10 transform scale-95 group-hover:scale-100 transition-all duration-500"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl group-hover:shadow-[0_25px_50px_-12px_rgba(97,233,35,0.25)] transition-all duration-500">
              <img
                className="w-full h-auto max-h-[600px] object-cover transform group-hover:scale-105 transition-all duration-700"
                alt="Smart waste management system dashboard"
                src="/images/placeholder-image.png"
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/e8fbde/61e923?text=Smart+Waste+Management' }}
              />
              
              {/* Overlaid UI elements for visual appeal */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center animate-bounce-subtle">
                <div className="w-3 h-3 rounded-full bg-[#61e923] mr-2"></div>
                <span className="text-sm font-medium text-gray-800">Live Data</span>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center animate-bounce-subtle" style={{animationDelay: '1s'}}>
                <div className="w-3 h-3 rounded-full bg-[#61e923] mr-2"></div>
                <span className="text-sm font-medium text-gray-800">Bin Status: Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add a subtle wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="white" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};