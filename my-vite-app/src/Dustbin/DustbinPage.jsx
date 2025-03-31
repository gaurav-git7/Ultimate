import { ChevronDownIcon, PieChartIcon, BarChartIcon, MapPinIcon, RefreshCcwIcon, TrashIcon, AlertTriangleIcon, LogIn, Home as HomeIcon, Info, BarChart3, Mail, Bell, Menu, X, Zap } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu.jsx";

// Add CSS animations for the leaf elements
const leafAnimationStyles = `
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(10px, 15px) rotate(5deg); }
    50% { transform: translate(20px, 0) rotate(10deg); }
    75% { transform: translate(10px, -15px) rotate(5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  @keyframes floatReverse {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-10px, -15px) rotate(-5deg); }
    50% { transform: translate(-20px, 0) rotate(-10deg); }
    75% { transform: translate(-10px, 15px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  .leaf {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: rgba(97, 233, 35, 0.1);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    will-change: transform;
  }

  .leaf-1 {
    top: 10%;
    left: 10%;
    animation: float 15s ease-in-out infinite;
  }

  .leaf-2 {
    top: 20%;
    right: 10%;
    width: 60px;
    height: 60px;
    background-color: rgba(77, 179, 30, 0.1);
    animation: floatReverse 18s ease-in-out infinite;
    animation-delay: 1s;
  }

  .leaf-3 {
    bottom: 15%;
    left: 20%;
    width: 30px;
    height: 30px;
    background-color: rgba(97, 233, 35, 0.15);
    animation: float 12s ease-in-out infinite;
    animation-delay: 2s;
  }

  .leaf-4 {
    bottom: 25%;
    right: 20%;
    width: 50px;
    height: 50px;
    background-color: rgba(77, 179, 30, 0.15);
    animation: floatReverse 14s ease-in-out infinite;
    animation-delay: 3s;
  }
`;

export const DustbinPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dustbinNumber, setDustbinNumber] = useState("");
  const [dustbinLocation, setDustbinLocation] = useState("");
  const [tracked, setTracked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/dustbin"); // Set to dustbin initially
  const [hasNotification, setHasNotification] = useState(true);
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

  // Dustbin data
  const dustbins = [
    { 
      id: 1, 
      status: "Overflow", 
      location: "Main Street & 5th Avenue",
      fillPercentage: 95,
      lastUpdated: "10 mins ago",
      type: "General Waste"
    },
    { 
      id: 2, 
      status: "Clear", 
      location: "Central Park East",
      fillPercentage: 30,
      lastUpdated: "5 mins ago",
      type: "Recycling"
    },
    { 
      id: 3, 
      status: "Overflow", 
      location: "Downtown Plaza",
      fillPercentage: 90,
      lastUpdated: "15 mins ago",
      type: "General Waste"
    },
  ];

  // Footer links data
  const quickLinks = [
    "About Us",
    "Contact Us",
    "Support Center",
    "Blog Posts",
    "FAQs",
  ];
  const resources = [
    "Case Studies",
    "White Papers",
    "Webinars",
    "User Guides",
    "Community Forum",
  ];
  const stayConnected = [
    "Social Media",
    "Newsletter",
    "Feedback",
    "Careers",
    "Events",
  ];
  
  const handleTrack = () => {
    if (dustbinNumber.trim() || dustbinLocation.trim()) {
      setTracked(true);
    }
  };
  
  const handleSendAlert = (dustbin) => {
    // Navigate to notification page with dustbin info
    navigate('/notification', { 
      state: { 
        dustbinInfo: {
          id: dustbin.id,
          location: dustbin.location,
          status: dustbin.status,
          fillPercentage: dustbin.fillPercentage
        } 
      }
    });
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative">
        {/* Add style tag for leaf animations */}
        <style dangerouslySetInnerHTML={{ __html: leafAnimationStyles }}></style>
        
        {/* Enhanced Navigation Header */}
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

              {/* Right Side Actions - Enhanced buttons */}
              <div className="flex items-center gap-4">
                {/* User Actions */}
                <div className="hidden sm:flex items-center gap-3">
                  <Button 
                    variant="ghost"
                    className="relative overflow-hidden text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10 border-none flex items-center gap-2 px-4 py-2 rounded-lg group transition-all duration-300"
                    onClick={() => navigate('/login')}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
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
                </div>

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
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Overview */}
        <div className="mt-40 bg-gradient-to-br from-[#f0ffe8] to-white px-16 py-8 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-gray-900 text-3xl">
              Waste Management Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Button className="relative overflow-hidden flex items-center gap-2 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 group">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <RefreshCcwIcon size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10">Refresh Data</span>
              </Button>
              <span className="text-gray-500">Last updated: Just now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#e8fbde]">Total Dustbins</h3>
                <div className="w-10 h-10 rounded-full bg-[#61e923]/20 flex items-center justify-center">
                  <TrashIcon className="text-[#61e923]" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2 text-white">24</p>
              <p className="text-sm text-[#e8fbde]/70 mt-2">Across 5 districts</p>
            </div>
            
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#e8fbde]">Require Attention</h3>
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangleIcon className="text-red-500" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2 text-red-500">7</p>
              <p className="text-sm text-[#e8fbde]/70 mt-2">29% of total bins</p>
            </div>
            
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#e8fbde]">Average Fill Level</h3>
                <div className="w-10 h-10 rounded-full bg-[#61e923]/20 flex items-center justify-center">
                  <BarChartIcon className="text-[#61e923]" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2 text-white">67%</p>
              <p className="text-sm text-[#e8fbde]/70 mt-2">↑ 12% from yesterday</p>
            </div>
            
            <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#e8fbde]">Collection Efficiency</h3>
                <div className="w-10 h-10 rounded-full bg-[#61e923]/20 flex items-center justify-center">
                  <PieChartIcon className="text-[#61e923]" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2 text-white">85%</p>
              <p className="text-sm text-[#e8fbde]/70 mt-2">↑ 5% from last week</p>
            </div>
          </div>
        </div>

        {/* Track Dustbin Section */}
        <div className="py-12 px-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                Track Your Dustbin
                <div className="absolute -bottom-2 left-0 h-1 w-full bg-[#61e923] rounded-full"></div>
              </h2>
              <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-xl shadow-lg border border-[#61e923]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#61e923]/10 rounded-full transform translate-x-16 -translate-y-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#61e923]/10 rounded-full transform -translate-x-16 translate-y-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                
                <form className="space-y-6 relative z-10">
                  <div>
                    <label className="block text-[#e8fbde] mb-2">Dustbin ID Number</label>
                    <Input 
                      type="text" 
                      placeholder="Enter dustbin ID" 
                      value={dustbinNumber}
                      onChange={e => setDustbinNumber(e.target.value)}
                      className="w-full border border-[#61e923]/30 bg-gray-900 text-white rounded-lg focus:border-[#61e923] focus:ring-[#61e923]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e8fbde] mb-2">Location</label>
                    <Input 
                      type="text" 
                      placeholder="Enter location" 
                      value={dustbinLocation}
                      onChange={e => setDustbinLocation(e.target.value)}
                      className="w-full border border-[#61e923]/30 bg-gray-900 text-white rounded-lg focus:border-[#61e923] focus:ring-[#61e923]/20 transition-all duration-300"
                    />
                  </div>
                  <Button 
                    onClick={handleTrack}
                    className="relative overflow-hidden w-full py-3 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <MapPinIcon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      Track Now
                    </span>
                  </Button>
                </form>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                Dustbin Status
                <div className="absolute -bottom-2 left-0 h-1 w-full bg-[#61e923] rounded-full"></div>
              </h2>
              
              {tracked ? (
                <div className="space-y-4 mt-2">
                  <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#61e923]/10 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#61e923]/10 rounded-full transform -translate-x-12 translate-y-12 opacity-50"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">Dustbin #{dustbinNumber || "Unknown"}</h3>
                          <p className="text-[#e8fbde]/70">{dustbinLocation || "Location not specified"}</p>
                        </div>
                        <Badge variant="outline" className={`px-3 py-1 text-white border border-[#61e923]/30 ${
                          Math.random() > 0.5 ? "bg-red-500/20" : "bg-[#61e923]/20"
                        }`}>
                          {Math.random() > 0.5 ? "Overflow" : "Normal"}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[#e8fbde]/80 text-sm">Fill Level</span>
                            <span className="text-[#e8fbde] font-bold">
                              {Math.floor(Math.random() * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-[#61e923] h-full rounded-full"
                              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="bg-black/30 p-3 rounded-lg">
                            <div className="text-sm text-[#e8fbde]/70">Last Updated</div>
                            <div className="font-medium">10 mins ago</div>
                          </div>
                          <div className="bg-black/30 p-3 rounded-lg">
                            <div className="text-sm text-[#e8fbde]/70">Collection Due</div>
                            <div className="font-medium">In 6 hours</div>
                          </div>
                        </div>
                        
                        <Button 
                          className="relative overflow-hidden bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 mt-4 group"
                          onClick={() => handleSendAlert({
                            id: dustbinNumber,
                            location: dustbinLocation,
                            status: "Overflow",
                            fillPercentage: 85
                          })}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                          <span className="relative z-10 flex items-center gap-2">
                            <AlertTriangleIcon size={16} />
                            Send Alert
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-xl shadow-lg border border-[#61e923]/20 h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="leaf leaf-1"></div>
                    <div className="leaf leaf-2"></div>
                    <div className="leaf leaf-3"></div>
                  </div>
                  <div className="text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#61e923]/20 mx-auto flex items-center justify-center mb-4">
                      <MapPinIcon className="text-[#61e923]" size={24} />
                    </div>
                    <h3 className="text-[#e8fbde] text-xl font-medium mb-2">No Dustbin Tracked</h3>
                    <p className="text-[#e8fbde]/70 max-w-xs">
                      Enter a dustbin ID or location to view its current status and data.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dustbins List */}
        <div className="py-12 px-16 bg-gradient-to-br from-[#f0ffe8] to-white">
          <div>
            <h2 className="text-2xl font-bold mb-8 relative inline-block">
              Nearby Dustbins
              <div className="absolute -bottom-2 left-0 h-1 w-3/4 bg-[#61e923] rounded-full"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dustbins.map((dustbin) => (
                <div key={dustbin.id} className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl shadow-lg border border-[#61e923]/20 text-white relative overflow-hidden group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#61e923]/10 rounded-full transform translate-x-16 -translate-y-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            dustbin.status === "Overflow" 
                              ? "bg-red-500/20 border-red-500/30 text-white" 
                              : "bg-[#61e923]/20 border-[#61e923]/30 text-white"
                          } mb-2 px-2.5 py-0.5`}
                        >
                          {dustbin.status}
                        </Badge>
                        <h3 className="text-lg font-bold">Dustbin #{dustbin.id}</h3>
                        <p className="text-[#e8fbde]/70 text-sm">{dustbin.type}</p>
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <TrashIcon className="text-[#61e923]" size={20} />
                        </div>
                        {dustbin.status === "Overflow" && (
                          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#e8fbde]/80 text-sm">Fill Level</span>
                        <span className="text-white font-bold">{dustbin.fillPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`${
                            dustbin.fillPercentage > 80 
                              ? "bg-red-500" 
                              : dustbin.fillPercentage > 60 
                                ? "bg-yellow-500" 
                                : "bg-[#61e923]"
                          } h-full rounded-full`}
                          style={{ width: `${dustbin.fillPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 text-sm text-[#e8fbde]/80">
                      <div className="flex items-center">
                        <MapPinIcon size={16} className="mr-1 text-[#61e923]" />
                        {dustbin.location}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        {dustbin.lastUpdated}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        className="relative overflow-hidden w-full bg-[#61e923] hover:bg-[#4db31e] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 py-2 text-sm group"
                        onClick={() => handleSendAlert(dustbin)}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                        <span className="relative z-10 flex items-center gap-1 justify-center">
                          <AlertTriangleIcon size={14} />
                          Report Issue
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#225c0d] text-white py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#61e923] blur-md opacity-50 rounded-full"></div>
                    <img
                      className="w-10 h-10 object-cover relative z-10"
                      alt="Logo"
                      src="/images/image-5.png"
                      onError={(e) => { e.target.src = 'https://placehold.co/80x80/e8fbde/61e923?text=SW' }}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-white">SmartWaste</h1>
                    <p className="text-xs text-green-100/80">Intelligent Management</p>
                  </div>
                </div>
                <p className="text-green-100/80 mb-6">
                  Transforming waste management with IoT technology and data-driven solutions.
                </p>
                <div className="flex gap-4">
                  {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((platform, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#2d7b0f] flex items-center justify-center hover:bg-[#61e923] transition-colors duration-300">
                      <span className="text-xs">{platform[0]}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-green-100/80 hover:text-white transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-6">Resources</h3>
                <ul className="space-y-4">
                  {resources.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-green-100/80 hover:text-white transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-6">Contact Us</h3>
                <ul className="space-y-4 text-green-100/80">
                  <li className="flex gap-3 items-start">
                    <span>📍</span>
                    <span>1234 Innovation Drive, Tech City, TC 98765</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span>📱</span>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span>✉️</span>
                    <span>info@smartwaste.example.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[#2d7b0f] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-green-100/60">© 2023 Smart Waste Management. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-green-100/60 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-green-100/60 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-green-100/60 hover:text-white transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}; 