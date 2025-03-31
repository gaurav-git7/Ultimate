import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  Send,
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Handle subscribe form submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  // Footer link data for mapping
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Contact Us", href: "/contact" },
        { name: "Blog", href: "/blog" }
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Waste Collection", href: "/services/collection" },
        { name: "Smart Bins", href: "/services/smart-bins" },
        { name: "Analytics", href: "/services/analytics" },
        { name: "Sustainability", href: "/services/sustainability" },
        { name: "Recycling Solutions", href: "/services/recycling" }
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/resources/docs" },
        { name: "API", href: "/resources/api" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "FAQs", href: "/resources/faqs" },
        { name: "Support", href: "/support" }
      ],
    }
  ];

  // Contact info
  const contactInfo = [
    { 
      icon: <MapPin size={18} />, 
      text: "123 Eco Street, Green City, 94123", 
      href: "https://maps.google.com" 
    },
    { 
      icon: <Phone size={18} />, 
      text: "+1 (555) 123-4567", 
      href: "tel:+15551234567" 
    },
    { 
      icon: <Mail size={18} />, 
      text: "contact@smartwaste.com", 
      href: "mailto:contact@smartwaste.com" 
    }
  ];

  // Social media icons
  const socialIcons = [
    { icon: <FacebookIcon className="w-5 h-5" />, alt: "Facebook", href: "#", bgColor: "bg-blue-600" },
    { icon: <InstagramIcon className="w-5 h-5" />, alt: "Instagram", href: "#", bgColor: "bg-pink-600" },
    { icon: <TwitterIcon className="w-5 h-5" />, alt: "X", href: "#", bgColor: "bg-black" },
    { icon: <LinkedinIcon className="w-5 h-5" />, alt: "LinkedIn", href: "#", bgColor: "bg-blue-700" }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#f8fff5] to-[#e8f9de] pt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#61e923]/10 rounded-full transform -translate-x-1/2 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#61e923]/5 rounded-full transform translate-x-1/3 translate-y-1/4 blur-2xl"></div>
      
      {/* Wave separator at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-10 -mt-10 transform rotate-180">
          <path fill="white" fillOpacity="1" d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,48C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Company info */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#61e923] blur-md opacity-50 rounded-full"></div>
                <img
                  className="w-10 h-10 object-cover relative z-10"
                  alt="Logo"
                  src="/images/image-5.png"
                  onError={(e) => { 
                    e.target.src = 'https://placehold.co/80x80/e8fbde/61e923?text=SW' 
                  }}
                />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">SmartWaste</h1>
                <p className="text-xs text-gray-500">Intelligent Management</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Transforming waste management with innovative smart solutions. 
              Our technology helps cities, businesses, and communities manage waste 
              efficiently and sustainably.
            </p>
            
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-600 hover:text-[#4db31e] transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center text-[#4db31e]">
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div>
            
            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={social.alt}
                  className={`w-8 h-8 ${social.bgColor} text-white rounded-full flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-md`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links sections */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-[#4db31e] transition-colors duration-300 text-sm flex items-center gap-1 group"
                        >
                          <span className="w-0 h-0.5 bg-[#61e923] group-hover:w-2 transition-all duration-300"></span>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter subscription */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Subscribe to our newsletter to get the latest news and updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="pr-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-[#61e923] rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-md"
                disabled={subscribed}
              >
                {subscribed ? '✓' : <Send size={16} />}
              </Button>
              
              {subscribed && (
                <p className="text-[#4db31e] text-xs mt-2 animate-fade-in">
                  Thank you for subscribing!
                </p>
              )}
            </form>
            
            <p className="text-gray-500 text-xs mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SmartWaste. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-500 hover:text-[#4db31e] text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-[#4db31e] text-sm transition-colors duration-300">Terms of Service</a>
            <a href="/cookies" className="text-gray-500 hover:text-[#4db31e] text-sm transition-colors duration-300">Cookie Policy</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};