import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../../../../../firebase/AuthContext";

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithFacebook, resetPassword, error, setError } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      // Call the onLogin function from props to update app authentication state
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setFormErrors({ auth: "Invalid email or password" });
      } else {
        setFormErrors({ auth: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      console.error("Google login error:", err.message);
      setFormErrors({ auth: "Google login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithFacebook();
    onLogin();
    navigate('/dashboard');
    } catch (err) {
      console.error("Facebook login error:", err.message);
      setFormErrors({ auth: "Facebook login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = () => {
    // Apple login is not implemented in this basic example
    setFormErrors({ auth: "Apple login is not implemented yet." });
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setFormErrors({ email: "Please enter your email to reset password" });
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setResetEmailSent(true);
      setFormErrors({});
    } catch (err) {
      console.error("Password reset error:", err.message);
      setFormErrors({ auth: "Failed to send password reset email. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-white text-dark rounded-lg shadow-button border border-gray-200 hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            <span>←</span> Back to Home
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer self-center sm:self-auto" onClick={() => navigate('/')}>
            <img 
              src="/images/image-5.png" 
              alt="Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="font-bold text-lg sm:text-xl text-dark">Smart Waste</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Login Form */}
          <div className="w-full md:w-1/2 bg-white p-5 sm:p-8 md:p-10 shadow-card rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-dark">Log In</h2>
            
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Access your smart waste management dashboard to monitor bin status
            </p>
            
            {formErrors.auth && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                {formErrors.auth}
              </div>
            )}
            
            {resetEmailSent && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
                Password reset email sent! Check your inbox.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 max-w-md mx-auto">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                  id="email"
                type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`form-input ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                  disabled={loading}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <button 
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-xs sm:text-sm text-primary hover:text-primary-600 transition-colors"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              <input
                  id="password"
                type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`form-input ${formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                  disabled={loading}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <button 
                type="submit"
                className="btn-primary w-full mt-4 sm:mt-6 py-2.5 sm:py-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
              
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="mx-3 sm:mx-4 text-gray-500 text-xs sm:text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              
              <div className="space-y-3">
              <button 
                type="button"
                  className="w-full p-2.5 sm:p-3 bg-white border border-gray-300 rounded-lg shadow-button flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm sm:text-base"
                  onClick={handleGoogleLogin}
                  disabled={loading}
              >
                  <img src="/images/icon---google.svg" alt="Google" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-dark">Continue with Google</span>
              </button>
              
              <button 
                type="button"
                  className="w-full p-2.5 sm:p-3 bg-[#1877F2] text-white rounded-lg shadow-button flex items-center justify-center gap-2 hover:bg-[#1666d8] transition-all text-sm sm:text-base"
                  onClick={handleFacebookLogin}
                  disabled={loading}
              >
                  <img src="/images/icon---facebook.svg" alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Continue with Facebook</span>
              </button>
              
              <button 
                type="button"
                  className="w-full p-2.5 sm:p-3 bg-black text-white rounded-lg shadow-button flex items-center justify-center gap-2 hover:bg-gray-800 transition-all text-sm sm:text-base"
                  onClick={handleAppleLogin}
                  disabled={loading}
              >
                  <img src="/images/icon---apple.svg" alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Continue with Apple</span>
              </button>
              </div>
              
              <div className="text-center mt-6">
                <span className="text-gray-700 text-sm sm:text-base">Don't have an account? </span>
                <button 
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:text-primary-600 font-medium transition-colors text-sm sm:text-base"
                >
                    Sign Up
                </button>
              </div>
            </form>
          </div>
          
          {/* Right side - Image and benefits */}
          <div className="hidden md:block w-1/2 bg-white p-8 shadow-card rounded-xl">
            <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img
              src="/images/placeholder-image-2.png"
              alt="Smart waste management dashboard"
                className="w-full h-64 object-cover"
            />
            </div>
            
            <h3 className="text-xl font-bold mb-6 text-dark">
              Smart Waste Management Benefits
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Real-time monitoring of bin fill levels</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Automated alerts for collection optimization</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Data analytics for waste management improvement</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Reduced operational costs and environmental impact</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              <span className="text-sm text-gray-700">Secure access to all smart waste features</span>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-12">
          © 2024 Smart Waste Management. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};