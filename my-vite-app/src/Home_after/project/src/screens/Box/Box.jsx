import React from "react";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MainSection } from "./sections/MainSection/MainSection";

export const Box = () => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <MainSection />
      <HeroSection />
    </main>
  );
};