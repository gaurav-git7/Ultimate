import React from "react";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactSection } from "./sections/ContactSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      <FeaturesSection />
      <HeaderSection />
      <HeroSection />
      <MainContentSection />
      <AnalyticsSection />
      <CallToActionSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};
