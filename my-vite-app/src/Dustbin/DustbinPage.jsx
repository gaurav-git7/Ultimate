import { ChevronDownIcon, PieChartIcon, BarChartIcon, MapPinIcon, RefreshCcwIcon, TrashIcon, AlertTriangleIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const DustbinPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [dustbinNumber, setDustbinNumber] = useState("");
  const [dustbinLocation, setDustbinLocation] = useState("");
  const [tracked, setTracked] = useState(false);
  
  // Navigation menu items
  const navItems = [
    { label: "Home Page", href: "/" },
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "More Links", href: "#", hasDropdown: true },
  ];

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
        {/* Header/Navigation */}
        <header className="w-full py-4 border-b border-gray-200">
          <div className="flex items-center justify-between px-16">
            <NavigationMenu>
              <NavigationMenuList className="flex w-[554px] h-12 items-center gap-6 bg-[#61e923] border border-solid border-black p-2">
                <img
                  className="w-[41px] h-[41px] object-cover"
                  alt="Logo"
                  src="/images/image-5.png"
                />
                <div className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink className="font-text-regular-normal text-black text-base hover:text-gray-700 transition-colors">
                        {item.label}
                        {item.hasDropdown && (
                          <ChevronDownIcon className="ml-1 h-5 w-5 inline" />
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </div>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Button 
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </Button>
              <span className="font-['Roboto',Helvetica] font-normal text-black text-2xl">
                Your Profile
              </span>
              <Avatar className="w-[64px] h-[64px] border-2 border-[#61e923]">
                <AvatarImage src="/images/image.png" alt="Profile" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Overview */}
        <div className="bg-gray-50 px-16 py-8">
          <div className="flex justify-between items-center">
            <h1 className="font-['Inter',Helvetica] font-bold text-black text-3xl">
              Waste Management Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Button className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100">
                <RefreshCcwIcon size={16} />
                <span>Refresh Data</span>
              </Button>
              <span className="text-gray-500">Last updated: Just now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500">Total Dustbins</h3>
                <TrashIcon className="text-[#61e923]" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">24</p>
              <p className="text-sm text-gray-500 mt-2">Across 5 districts</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500">Require Attention</h3>
                <AlertTriangleIcon className="text-red-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2 text-red-500">7</p>
              <p className="text-sm text-gray-500 mt-2">29% of total bins</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500">Average Fill Level</h3>
                <BarChartIcon className="text-blue-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">67%</p>
              <p className="text-sm text-gray-500 mt-2">↑ 12% from yesterday</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500">Collection Efficiency</h3>
                <PieChartIcon className="text-purple-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">85%</p>
              <p className="text-sm text-gray-500 mt-2">↑ 5% from last week</p>
            </div>
          </div>
        </div>

        {/* Main Content - Dustbin Form */}
        <main className="flex flex-col items-center mt-16 px-16">
          <section className="w-full max-w-[1000px] mb-16 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-['Inter',Helvetica] font-bold text-black text-2xl mb-6 pb-4 border-b border-gray-200">
              Track Specific Dustbin
            </h2>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block font-['Inter',Helvetica] font-medium text-gray-700 text-lg">
                  Dustbin Number
                </label>
                <Input 
                  className="w-full p-3 border border-solid border-gray-300 rounded-md focus:border-[#61e923] focus:ring-1 focus:ring-[#61e923]" 
                  placeholder="Enter dustbin ID or number"
                  value={dustbinNumber}
                  onChange={(e) => setDustbinNumber(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <label className="block font-['Inter',Helvetica] font-medium text-gray-700 text-lg">
                  Dustbin Location
                </label>
                <Input 
                  className="w-full p-3 border border-solid border-gray-300 rounded-md focus:border-[#61e923] focus:ring-1 focus:ring-[#61e923]" 
                  placeholder="Enter street address or area"
                  value={dustbinLocation}
                  onChange={(e) => setDustbinLocation(e.target.value)}
                />
              </div>

              <div className="col-span-2 flex justify-center mt-8">
                <Button 
                  onClick={handleTrack}
                  className="px-8 py-4 bg-[#62ea23] hover:bg-[#52d913] border border-solid border-black font-['Inter',Helvetica] font-medium text-black text-xl rounded-md transition-colors"
                >
                  <MapPinIcon className="mr-2" size={20} />
                  Track Now
                </Button>
              </div>
            </div>
          </section>

          {/* Dustbin Details Section */}
          <section className="w-full max-w-[1000px] mt-8 mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-['Inter',Helvetica] font-bold text-black text-2xl">
                {tracked ? "Search Results" : "Recently Tracked Dustbins"}
              </h2>
              <Button variant="outline" className="text-[#61e923] border-[#61e923] hover:bg-[#f0fce8]">
                View All Dustbins
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200 font-medium text-gray-700">
                <div className="col-span-1">ID</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Fill Level</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Action</div>
              </div>
              
              {/* Table rows */}
              {dustbins.map((dustbin) => (
                <div
                  key={dustbin.id}
                  className="grid grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1 font-medium">#{dustbin.id}</div>
                  <div className="col-span-3 flex items-center">
                    <MapPinIcon size={16} className="text-gray-400 mr-2" />
                    {dustbin.location}
                  </div>
                  <div className="col-span-2">
                    <Badge
                      className={`px-3 py-1 rounded-full font-medium text-sm
                        ${dustbin.status === "Overflow" ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200"}`}
                    >
                      {dustbin.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${dustbin.fillPercentage > 80 ? 'bg-red-600' : dustbin.fillPercentage > 50 ? 'bg-yellow-400' : 'bg-green-500'}`} 
                          style={{ width: `${dustbin.fillPercentage}%` }}
                        ></div>
                      </div>
                      <span>{dustbin.fillPercentage}%</span>
                    </div>
                  </div>
                  <div className="col-span-2">{dustbin.type}</div>
                  <div className="col-span-2">
                    <Button 
                      onClick={() => dustbin.status === "Overflow" ? handleSendAlert(dustbin) : null}
                      className={`${dustbin.status === "Overflow" ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"} text-white text-sm py-1 px-2`}
                    >
                      {dustbin.status === "Overflow" ? "Send Alert" : "View Details"}
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="p-4 text-right text-sm text-gray-500 bg-gray-50">
                Showing 3 of 24 dustbins
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-solid border-gray-200 bg-gray-50 p-12">
          <div className="grid grid-cols-4 gap-8 max-w-[1000px] mx-auto">
            {/* Quick Links Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-black text-xl mb-2">
                Quick Links
              </h3>
              <div className="flex flex-col">
                {quickLinks.map((link, index) => (
                  <div key={index} className="py-2">
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-black text-xl mb-2">
                Resources
              </h3>
              <div className="flex flex-col">
                {resources.map((resource, index) => (
                  <div key={index} className="py-2">
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {resource}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Connected Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-black text-xl mb-2">
                Stay Connected
              </h3>
              <div className="flex flex-col">
                {stayConnected.map((connect, index) => (
                  <div key={index} className="py-2">
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {connect}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* About Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-black text-xl mb-2">
                About
              </h3>
              <p className="text-gray-600">
                Our smart waste management system uses IoT sensors to monitor bin levels and optimize collection routes. Join us in creating cleaner, more sustainable cities.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    className="w-6 h-6"
                    alt="Facebook"
                    src="/images/icon---instagram.svg"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    className="w-6 h-6"
                    alt="Instagram"
                    src="/images/icon---x.svg"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    className="w-6 h-6"
                    alt="Twitter"
                    src="/images/icon---linkedin.svg"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    className="w-6 h-6"
                    alt="Youtube"
                    src="/images/icon---youtube.svg"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-[1000px] mx-auto mt-8 pt-8 border-t border-solid border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">© 2025 Smart Waste Management. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Cookies Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}; 