import React from "react";
import PropTypes from 'prop-types';
import { MainSection } from "./sections/MainSection/MainSection";
import { Dashboard } from "./dashboard/Dashboard";

export const Box = ({ onLogout }) => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <MainSection onLogout={onLogout} />
      <Dashboard />
    </main>
  );
};

Box.propTypes = {
  onLogout: PropTypes.func.isRequired
};