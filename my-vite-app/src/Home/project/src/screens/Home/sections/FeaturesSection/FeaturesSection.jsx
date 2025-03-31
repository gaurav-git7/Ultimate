import { Menu, X, LogIn, Home as HomeIcon, Info, BarChart3, Mail, Bell, UserIcon, LogOut, UserPlus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../../../../components/ui/navigation-menu";
import { useAuth } from "../../../../../../../firebase/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../components/ui/avatar";

export const FeaturesSection = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); // Assume home is default active
  const [hasNotification, setHasNotification] = useState(true); // For notification indicator
  const [isSticky, setIsSticky] = useState(false);

  // Update active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Track scroll position for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Check if we should apply sticky effect
      if (window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // If not on homepage, navigate there first, then scroll
      if (location.pathname !== '/') {
        navigate('/');
        // Need to wait for navigation to complete before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        // Already on homepage, just scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Navigation menu items data with icons for better visual cues
  const navItems = [
    { 
      label: "Home", 
      hasDropdown: false, 
      href: "/",
      icon: <HomeIcon size={16} />,
      isScroll: false
    },
    { 
      label: "About Us", 
      hasDropdown: false, 
      href: "/about",
      icon: <Info size={16} />,
      isScroll: false
    },
    { 
      label: "Dashboard", 
      hasDropdown: false, 
      href: "/dashboard",
      icon: <BarChart3 size={16} />,
      isScroll: false
    },
    { 
      label: "Contact", 
      hasDropdown: false, 
      href: "#contact-section",
      icon: <Mail size={16} />,
      isScroll: true,
      sectionId: "contact-section"
    }
  ];

  // Handle navigation or scrolling
  const handleNavigation = (e, item) => {
    e.preventDefault();
    
    if (item.isScroll) {
      // For scroll items
      scrollToSection(item.sectionId);
      setActiveLink(item.href);
    } else {
      // For page navigation
      setActiveLink(item.href);
      navigate(item.href);
    }
    
    setMobileMenuOpen(false);
  };

  // Classes for the navbar based on scroll position
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled 
      ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
      : "bg-transparent py-4"
  } ${
    isSticky 
      ? "transform-none" 
      : mobileMenuOpen ? "transform-none" : "md:translate-y-0"
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced animation */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#61e923] blur-md opacity-50 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
              <img
                className="w-10 h-10 object-cover relative z-10 group-hover:rotate-[360deg] transition-transform duration-700"
                alt="Logo"
                src="/images/image-5.png"
                onError={(e) => { 
                  e.target.src = 'https://placehold.co/80x80/e8fbde/61e923?text=SW' 
                }}
              />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl text-gray-900 group-hover:text-[#4db31e] transition-colors duration-300">
                SmartWaste
              </h1>
              <p className="text-xs text-gray-500 transform group-hover:translate-x-1 transition-transform duration-300">
                Intelligent Management
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced version */}
          <div className="hidden md:block">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex items-center gap-1">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <div
                      className={`relative px-4 py-2 cursor-pointer rounded-lg group transition-all duration-300 
                        ${activeLink === item.href 
                          ? 'text-[#4db31e] bg-[#61e923]/10' 
                          : 'text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10'}`}
                      onClick={(e) => handleNavigation(e, item)}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                      <div className="relative z-10 flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      
                      {/* Animated underline indicator */}
                      <div 
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#61e923] rounded-full transition-all duration-300 
                        ${activeLink === item.href ? 'w-3/4' : 'w-0 group-hover:w-1/2'}`}
                      ></div>
                    </div>
                  </NavigationMenuItem>
                ))}
                
                {/* Notification bell with indicator */}
                <NavigationMenuItem>
                  <div className="relative ml-2 cursor-pointer p-2 rounded-full hover:bg-[#61e923]/10 transition-colors duration-300 group">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                    <Bell size={20} className="relative z-10 text-gray-600 hover:text-[#4db31e] transition-colors duration-300 group-hover:rotate-12 transform transition-transform" />
                    {hasNotification && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse z-20"></span>
                    )}
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions - Enhanced buttons with Avatar */}
          <div className="flex items-center gap-4">
            {/* User Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {!currentUser ? (
                <>
                  <Button 
                    className="relative overflow-hidden text-[#4db31e] hover:text-white bg-white hover:bg-[#61e923] border border-[#61e923]/40 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
                    onClick={() => navigate('/login')}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <LogIn size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Sign In</span>
                    </span>
                  </Button>
                  <Button 
                    className="relative overflow-hidden bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 px-5 py-2 group"
                    onClick={() => navigate('/signup')}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </>
              ) : (
                <Button 
                  className="relative overflow-hidden text-red-500 hover:text-white bg-white hover:bg-red-500 border border-red-300 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
                  onClick={() => {
                    logout && logout();
                    navigate('/login');
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <LogOut size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Sign Out</span>
                  </span>
                </Button>
              )}
            </div>

            {/* Account Avatar - Always visible on all screen sizes */}
            <Avatar className="h-12 w-12 cursor-pointer border-2 border-[#61e923]/30 hover:border-[#61e923] transition-all duration-300 shadow-lg hover:shadow-xl bg-white/90 relative">
              <div className="absolute inset-0 bg-[#61e923]/20 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              {currentUser?.photoURL ? (
                <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || "User"} className="relative z-10" />
              ) : (
                <AvatarImage src="/images/avatar.jpg" alt="User" className="relative z-10" />
              )}
              <AvatarFallback className="bg-[#61e923]/10 text-[#4db31e] relative z-10">
                {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <UserIcon size={22} />}
              </AvatarFallback>
            </Avatar>

            {/* Mobile Menu Button with enhanced animation */}
            <button 
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10 transition-colors duration-300 focus:outline-none relative overflow-hidden group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
              <div className="relative w-6 h-6 z-10">
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 top-3' : 'top-2'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  } top-3`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 top-3' : 'top-4'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu with glass morphism and animations */}
      <div 
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen 
            ? 'max-h-[500px] opacity-100 backdrop-blur-md bg-white/90' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 pb-6 pt-2">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  activeLink === item.href 
                    ? 'bg-[#61e923]/15 text-[#4db31e]' 
                    : 'text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]'
                }`}
                onClick={(e) => handleNavigation(e, item)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <span className={`absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 ${activeLink === item.href ? 'opacity-30' : 'group-hover:opacity-20'} transition-opacity duration-300 blur-md`}></span>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Animated indicator for active link */}
                  {activeLink === item.href && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4db31e]"></div>
                  )}
                </div>
              </a>
            ))}
            
            {/* Authentication links for mobile */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {!currentUser ? (
                <>
                  <a 
                    href="/login"
                    className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <LogIn size={18} />
                      </div>
                      <span className="font-medium">Sign In</span>
                    </div>
                  </a>
                  
                  <a 
                    href="/signup"
                    className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <UserPlus size={18} />
                      </div>
                      <span className="font-medium">Sign Up</span>
                    </div>
                  </a>
                </>
              ) : (
                <a 
                  href="/login"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    logout && logout();
                    navigate('/login');
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-100 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <LogOut size={18} className="text-red-500" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </div>
                </a>
              )}
              
              {currentUser && (
                <div className="flex items-center gap-3 px-4 py-4 opacity-70">
                  <span className="text-sm text-gray-500">Signed in as:</span>
                  <span className="text-sm font-medium truncate max-w-[180px]">
                    {currentUser.displayName || currentUser.email || "User"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};