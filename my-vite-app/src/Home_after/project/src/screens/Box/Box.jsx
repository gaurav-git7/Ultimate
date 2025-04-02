import React from "react";
import PropTypes from 'prop-types';
import DashboardWithErrorBoundary from "./dashboard/DashboardWithErrorBoundary";

export const Box = ({ onLogout }) => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <DashboardWithErrorBoundary />
    </main>
  );
};

Box.propTypes = {
  onLogout: PropTypes.func.isRequired
};