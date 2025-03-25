import React from "react";
import PropTypes from 'prop-types';
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MainSection } from "./sections/MainSection/MainSection";

export const Box = ({ onLogout }) => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <MainSection onLogout={onLogout} />
      <HeroSection />
    </main>
  );
};

Box.propTypes = {
  onLogout: PropTypes.func.isRequired
};