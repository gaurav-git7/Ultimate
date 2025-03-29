import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 max-w-full sm:max-w-[90%] md:max-w-[768px] w-full">
            <div className="flex flex-col items-center gap-4 sm:gap-6 w-full text-center">
              <h1 className="font-heading-desktop-h1 font-[number:var(--heading-desktop-h1-font-weight)] text-dark text-3xl sm:text-4xl md:text-[length:var(--heading-desktop-h1-font-size)] tracking-[var(--heading-desktop-h1-letter-spacing)] leading-[var(--heading-desktop-h1-line-height)] [font-style:var(--heading-desktop-h1-font-style)]">
                Transform Waste Management with Smart Solutions
              </h1>

              <p className="font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-gray-700 text-base sm:text-lg md:text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)] max-w-xl sm:max-w-2xl mx-auto">
                Our innovative smart waste bin system offers real-time monitoring
                and analytics to streamline waste management. Experience
                efficiency and sustainability like never before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-4 sm:mt-2">
              <Button 
                onClick={() => navigate('/login')}
                className="btn-primary w-full sm:w-auto"
              >
                <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                  Get Started
                </span>
              </Button>

              <Button
                variant="outline"
                className="btn-secondary w-full sm:w-auto"
              >
                <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-dark text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                  Learn More
                </span>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl mx-auto relative">
            <div className="absolute inset-0 -m-4 bg-primary rounded-3xl opacity-5 transform rotate-1"></div>
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl">
              <img
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] object-cover"
                alt="Smart waste management system dashboard"
                src="/images/placeholder-image.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};