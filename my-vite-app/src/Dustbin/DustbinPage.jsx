import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DustbinPage = () => {
  const navigate = useNavigate();
  
  // Redirect to Dashboard on mount
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  
  // Return empty div (user will be redirected before this renders)
  return <div></div>;
}; 