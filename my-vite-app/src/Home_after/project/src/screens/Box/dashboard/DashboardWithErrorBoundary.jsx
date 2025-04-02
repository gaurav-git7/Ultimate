import React from 'react';
import { Dashboard } from './Dashboard';
import ErrorBoundary from './ErrorBoundary';

// Simple wrapper component that adds the ErrorBoundary around the Dashboard
export const DashboardWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
};

export default DashboardWithErrorBoundary; 