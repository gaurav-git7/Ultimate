import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { LogIn, Home as HomeIcon, Info, BarChart3, Mail, Bell, Menu, X, UserIcon, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../firebase/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";

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

export const AboutUs = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/about"); // Set to about initially
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
      href: "#about-section",
      icon: <Info size={16} />,
      isScroll: true,
      sectionId: "about-section"
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

  // Team members data
  const teamMembers = [
    {
      name: "Soham Kamathi",
      role: "Leader",
      bio: "The driving force behind our team, Soham ensures smooth collaboration and efficient execution of ideas. His leadership and problem-solving skills keep us on track toward our goals.",
      image: "/images/soham.jpg"
    },
    {
      name: "Gaurav Khutwal",
      role: "Hardware Lead",
      bio: "Gaurav specializes in hardware integration, ensuring that our system functions seamlessly with IoT devices. His expertise bridges the gap between physical components and digital solutions.",
      image: "/images/gaurav.jpg"
    },
    {
      name: "Sakshi Kukreja",
      role: "Design Lead",
      bio: "With a keen eye for aesthetics and user experience, Sakshi crafts visually appealing and intuitive interfaces. She ensures that our project is both functional and engaging.",
      image: "/images/sakshi.jpg"
    },
    {
      name: "Vanshika Somnani",
      role: "Software Lead",
      bio: "Vanshika leads the software development, turning ideas into reality through robust and efficient code. She ensures that our application is scalable, secure, and high-performing.",
      image: "/images/vanshika.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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

      {/* Main Content - Add padding to account for fixed navbar */}
      <main className="pt-28">
        {/* Hero Section */}
        <section id="about-section" className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-[#e8fbde] via-white to-[#dfffd6] overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#61e923] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#4db31e] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-[#dbffcc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="leaf leaf-1"></div>
            <div className="leaf leaf-2"></div>
            <div className="leaf leaf-3"></div>
            <div className="leaf leaf-4"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
              <div className="flex flex-col items-center gap-6 max-w-full sm:max-w-[90%] md:max-w-[768px] w-full">
                <div className="flex flex-col items-center gap-4 sm:gap-6 w-full text-center">
                  <h1 className="font-heading-desktop-h1 font-bold text-dark text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                    About Smart Waste Management
                  </h1>
                  <p className="font-text-medium-normal font-normal text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    Revolutionizing waste management through smart technology and sustainable solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section - Enhanced with modern design */}
        <section className="w-full py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#61e923]/20 rounded-full opacity-20"></div>
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
                    <img
                      src="/images/mission-image.jpg"
                      alt="Our Mission"
                      className="w-full h-auto"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400/61e923/ffffff?text=Our+Mission' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#225c0d]/50 to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-[#e8fbde] to-[#dfffd6] p-8 rounded-xl shadow-md border border-[#61e923]/20">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 relative">
                    <span className="inline-block relative">
                      Our Mission
                      <div className="absolute -bottom-2 left-0 h-1 w-3/4 bg-[#61e923] rounded-full"></div>
                    </span>
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    At Smart Waste Management, our mission is to revolutionize waste collection and disposal
                    through cutting-edge IoT technology, making the process more efficient and environmentally friendly.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    We aim to reduce operational costs for municipalities and waste management companies
                    while promoting sustainability and reducing the carbon footprint associated with waste collection.
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-[#4db31e]">60%</span>
                      <span className="text-gray-600 text-sm">Reduced Emissions</span>
                    </div>
                    <div className="w-px h-12 bg-gray-300"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-[#4db31e]">40%</span>
                      <span className="text-gray-600 text-sm">Cost Savings</span>
                    </div>
                    <div className="w-px h-12 bg-gray-300"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-[#4db31e]">24/7</span>
                      <span className="text-gray-600 text-sm">Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Enhanced with modern design */}
        <section className="w-full py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">The principles that guide our mission and vision for a cleaner, more sustainable future.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We continuously strive to develop and implement cutting-edge technologies to improve waste management processes.",
                  icon: "🔍",
                  color: "#61e923"
                },
                {
                  title: "Sustainability",
                  description: "We are committed to environmentally friendly practices that reduce carbon emissions and promote recycling and proper waste disposal.",
                  icon: "🌿",
                  color: "#61e923"
                },
                {
                  title: "Excellence",
                  description: "We maintain the highest standards in all aspects of our operations, from technology development to customer service.",
                  icon: "⭐",
                  color: "#61e923"
                }
              ].map((value, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-[#f0ffe7] to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 transform hover:-translate-y-1 border-[#61e923]/60"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 bg-[#61e923]/20">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Enhanced with modern design */}
        <section className="w-full py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">Meet the experts behind Smart Waste Management, dedicated to creating innovative solutions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-[#e8fbde] to-white transform transition-all duration-300 group-hover:-translate-y-2 border border-[#61e923]/20">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                      <div className="h-64 w-full bg-gray-100 flex items-center justify-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => { e.target.src = `https://placehold.co/300x300/61e923/ffffff?text=${member.name.split(' ')[0][0]}${member.name.split(' ')[1] ? member.name.split(' ')[1][0] : ''}` }}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-[#4db31e] font-medium mb-4">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                      <div className="flex mt-6 gap-3">
                        {['LinkedIn', 'Twitter', 'Email'].map((platform, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#61e923]/20 flex items-center justify-center cursor-pointer hover:bg-[#61e923]/30 transition-colors duration-300">
                            <span className="text-xs text-gray-700">{platform[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section - Enhanced with modern design */}
        <section className="w-full py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">How our smart waste management solutions are making a difference around the world.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "200+", label: "Cities Served", color: "#61e923" },
                { number: "500K+", label: "Smart Bins Deployed", color: "#61e923" },
                { number: "30%", label: "Average Waste Reduction", color: "#61e923" },
                { number: "1M+", label: "Tons of CO2 Saved", color: "#61e923" }
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-[#f0ffe7] to-white rounded-xl p-6 shadow-md text-center transform transition-all duration-300 hover:scale-105 border border-[#61e923]/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-[#61e923]/20">
                    <span className="text-2xl text-gray-700">
                      {index === 0 ? "🏙️" : index === 1 ? "🗑️" : index === 2 ? "📉" : "🌍"}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-[#4db31e]">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with modern design */}
        <section className="w-full py-16 px-4 md:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4db31e] to-[#225c0d] p-8 md:p-12 shadow-xl border border-[#61e923]/20">
              <div className="absolute -inset-[100px] bg-gradient-to-r from-white/20 via-[#61e923]/10 to-white/20 opacity-50 transition-opacity duration-700 blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Waste Management?</h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Join hundreds of cities and companies that have already upgraded to smart waste management. Start reducing costs and environmental impact today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="relative overflow-hidden bg-white hover:bg-gray-100 text-[#4db31e] font-medium rounded-xl px-6 py-6 h-auto transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 group"
                    onClick={() => navigate('/contact')}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10">Schedule a Demo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="relative overflow-hidden bg-transparent border-2 border-white/80 hover:border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group"
                    onClick={() => navigate('/signup')}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Matching Home page footer */}
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
                  {['Home', 'About Us', 'Dashboard', 'Contact Us', 'Blog', 'Careers'].map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-green-100/80 hover:text-white transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-6">Solutions</h3>
                <ul className="space-y-4">
                  {['Smart Bins', 'Route Optimization', 'Analytics Platform', 'Mobile App', 'API Integration', 'Custom Solutions'].map((link, i) => (
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
      </main>
    </div>
  );
}; 