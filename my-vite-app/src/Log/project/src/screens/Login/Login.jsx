import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            <span>←</span> Back to Home
          </button>
          
          <div className="flex items-center gap-2" onClick={() => navigate('/')}>
            <img 
              src="/images/image-5.png" 
              alt="Logo" 
              className="w-10 h-10"
            />
            <span className="font-bold text-xl">Smart Waste</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Login Form */}
          <div className="w-full md:w-1/2 bg-white p-8 shadow rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
            
            <p className="text-center text-gray-600 mb-8">
              Access your smart waste management dashboard to monitor bin status
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#61e923]"
              />
              
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#61e923]"
              />
              
              <button 
                onClick={() => navigate('/')}
                className="w-full p-3 bg-[#61e923] text-black font-semibold rounded hover:bg-[#50d012] transition-colors"
              >
                Log in
              </button>
              
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              
              <button className="w-full p-3 bg-gray-500 border border-gray-600 rounded flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors">
                <img src="/images/icon---google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-white">Log in with Google</span>
              </button>
              
              <button className="w-full p-3 bg-gray-500 border border-gray-600 rounded flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors">
                <img src="/images/icon---facebook.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-white">Log in with Facebook</span>
              </button>
              
              <button className="w-full p-3 bg-gray-500 border border-gray-600 rounded flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors">
                <img src="/images/icon---apple.svg" alt="Apple" className="w-5 h-5" />
                <span className="text-white">Log in with Apple</span>
              </button>
              
              <div className="text-center mt-6">
                <a href="#" className="text-[#61e923] hover:text-[#50d012] transition-colors">
                  Forgot your password?
                </a>
                
                <div className="mt-2">
                  <span className="text-gray-700">Don't have an account? </span>
                  <a href="#" className="text-[#61e923] hover:text-[#50d012] transition-colors">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Image and benefits */}
          <div className="hidden md:block w-1/2 bg-white p-8 shadow rounded-lg">
            <img
              src="/images/placeholder-image-2.png"
              alt="Smart waste management dashboard"
              className="w-full h-64 object-cover rounded mb-6"
            />
            
            <h3 className="text-xl font-bold mb-4">
              Smart Waste Management Benefits
            </h3>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Real-time monitoring of bin fill levels</li>
              <li>Automated alerts for collection optimization</li>
              <li>Data analytics for waste management improvement</li>
              <li>Reduced operational costs and environmental impact</li>
              <li>User-friendly dashboard with intuitive controls</li>
            </ul>
            
            <div className="flex items-center gap-3 mt-6">
              <img 
                src="/images/icon---relume.svg" 
                alt="Feature icon" 
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-700">Secure access to all smart waste features</span>
            </div>
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-12">
          © 2024 Smart Waste Management. All rights reserved.
        </footer>
      </div>
    </div>
  );
};