import React from "react";
import { AnalyticsSection } from "./sections/AnalyticsSection/AnalyticsSection";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";

export const Home = () => {
  return (
    <div className="bg-white w-full">
      {/* Navigation */}
      <FeaturesSection />
      
      {/* Main content with padding-top to account for fixed navbar */}
      <div className="pt-16">
        <HeaderSection />
        <HeroSection />
        <MainContentSection />
        <AnalyticsSection />
        <CallToActionSection />
        <ContactSection />
      </div>

      <FooterSection />
    </div>
  );
};