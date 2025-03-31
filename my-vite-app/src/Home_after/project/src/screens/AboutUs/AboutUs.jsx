import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, Info, BarChart3, Mail, Menu, X } from 'lucide-react';
import { Button } from '../../../../../../../components/ui/button';
import { useAuth } from '../../../../../../../firebase/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../../components/ui/avatar';

const AboutUs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeLink, setActiveLink] = useState('/about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navigation or scrolling
  const handleNavigation = (e, item) => {
    e.preventDefault();
    
    if (item.isScroll) {
      // For scroll items, navigate to home page first if not already there
      if (location.pathname !== '/') {
        navigate('/', { 
          state: { scrollTo: item.sectionId },
          replace: true 
        });
      } else {
        // Already on home page, just scroll
        scrollToSection(item.sectionId);
      }
    } else {
      // For page navigation
      setActiveLink(item.href);
      navigate(item.href);
    }
    
    setMobileMenuOpen(false);
  };
  
  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Check for scroll state when component mounts
  useEffect(() => {
    const state = location.state;
    if (state?.scrollTo) {
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(state.scrollTo);
      }, 100);
      // Clear the state
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location.state, navigate]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-600">SmartWaste</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeLink === item.href
                        ? 'border-green-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    activeLink === item.href
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                </a>
              ))}
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                        <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{user.displayName}</div>
                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Sign In
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                    className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-[#4CD137] rounded-[2rem] shadow-lg p-20 flex items-center justify-center">
                  <h2 className="text-6xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600">
                  At SmartWaste, our mission is to revolutionize waste management through innovative technology and sustainable practices. We aim to create a cleaner, more efficient, and environmentally conscious future for our cities.
                </p>
                <p className="text-lg text-gray-600">
                  By implementing smart waste management solutions, we're helping cities reduce their environmental impact, optimize collection routes, and create a more sustainable living environment for all residents.
                </p>
              </div>
              <div className="relative">
                <img
                  src="../../../../../../../../public/images/smart-city.jpeg"
                  alt="Smart City Waste Management"
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 