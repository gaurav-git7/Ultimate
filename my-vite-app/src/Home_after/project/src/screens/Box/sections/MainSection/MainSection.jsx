import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { useAuth } from "../../../../../../../firebase/AuthContext"; 
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "../../../../components/ui/navigation-menu";

export const MainSection = ({ onLogout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { currentUser, logout } = useAuth();
  
  // Navigation menu items data
  const navItems = [
    { label: "Home Page", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard" }
  ];

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      // Call the onLogout function from props to update app authentication state
    onLogout();
    navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom py-3 sm:py-4">
      <div className="flex justify-between items-center">
        {/* Left side navigation */}
        <div className="flex items-center">
            <div className="flex items-center" onClick={() => navigate('/')}>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary rounded-lg shadow-sm flex-center">
              <img
                    className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                alt="Logo"
                src="/images/image-5.png"
              />
                </div>
                <span className="font-bold text-lg sm:text-xl text-dark hidden md:block">Smart Waste</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden ml-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Desktop navigation */}
            <NavigationMenu className="ml-6 hidden md:block">
              <NavigationMenuList className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                      className="px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary-50 rounded-md transition-colors font-medium"
                    href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href);
                      }}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side profile section */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="relative group">
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-700 hidden md:block">
                  {currentUser?.displayName || currentUser?.email || 'Admin User'}
                </span>
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary-100">
                  <AvatarImage 
                    src={currentUser?.photoURL || "/images/image-2.png"} 
                    alt="Profile" 
                  />
                </Avatar>
              </div>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="py-2">
                  <a href="#" 
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                     onClick={(e) => {
                       e.preventDefault();
                       navigate('/profile');
                     }}
                  >
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">
                    Help & Support
                  </a>
                  <hr className="my-1 border-gray-200" />
          <button 
            onClick={handleLogout}
                    disabled={loggingOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
                    {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 border-t border-gray-200 mt-3">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary-50 rounded-md transition-colors font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-1 border-gray-200" />
              <button
                className="px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                onClick={() => {
                  handleLogout();
                }}
                disabled={loggingOut}
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

MainSection.propTypes = {
  onLogout: PropTypes.func
};