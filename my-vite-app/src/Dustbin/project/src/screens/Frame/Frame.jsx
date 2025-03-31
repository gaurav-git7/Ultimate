import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";

export const Frame = () => {
  const navigate = useNavigate();

  // Navigation menu items
  const navItems = [
    { label: "Home Page", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard" }
  ];

  // Dustbin data
  const dustbins = [
    { id: 1, status: "Overflow" },
    { id: 2, status: "Clear" },
    { id: 3, status: "Overflow" },
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

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative">
        {/* Header/Navigation */}
        <header className="w-full py-4">
          <div className="flex items-center justify-between px-16">
            <NavigationMenu>
              <NavigationMenuList className="flex w-[554px] h-12 items-center gap-6 bg-[#61e923] border border-solid border-black p-2">
                <img
                  className="w-[41px] h-[41px] object-cover"
                  alt="Logo"
                  src="/image-5.png"
                />
                <div className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink 
                        className="font-text-regular-normal text-black text-base"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.href && item.href !== "#") {
                            navigate(item.href);
                          }
                        }}
                      >
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
              <img
                className="w-[65px] h-[53px] object-cover"
                alt="Icon"
                src="/image-2.png"
              />
              <span className="font-['Roboto',Helvetica] font-normal text-black text-2xl">
                Your Profile
              </span>
              <Avatar className="w-[104px] h-[104px]">
                <AvatarImage src="/image.png" alt="Profile" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content - Dustbin Form */}
        <main className="flex flex-col items-center mt-16">
          <section className="w-full max-w-[714px] mb-16">
            <h1 className="font-['Inter',Helvetica] font-normal text-black text-5xl mb-12">
              Enter Your Dustbin Details
            </h1>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block font-['Inter',Helvetica] font-normal text-black text-[32px]">
                  Enter Dustbin Number
                </label>
                <Input className="w-[562px] p-3 border border-solid border-black" />
              </div>

              <div className="space-y-4">
                <label className="block font-['Inter',Helvetica] font-normal text-black text-[32px]">
                  Enter Dustbin Location
                </label>
                <Input className="w-[562px] p-3 border border-solid border-black" />
              </div>

              <div className="flex justify-center mt-8">
                <Button className="w-[162px] h-[55px] bg-[#62ea23] border-2 border-solid border-black font-['Inter',Helvetica] font-normal text-black text-[32px]">
                  Track
                </Button>
              </div>
            </div>
          </section>

          {/* Dustbin Details Section */}
          <section className="w-full max-w-[1200px] mt-16">
            <h2 className="font-['Inter',Helvetica] font-normal text-black text-5xl mb-8">
              Your Dustbin Details
            </h2>

            <div className="mt-8 space-y-8">
              {dustbins.map((dustbin) => (
                <div
                  key={dustbin.id}
                  className="flex items-center justify-between"
                >
                  <div className="font-['Inter',Helvetica] font-normal text-black text-[32px]">
                    Dustbin {dustbin.id}
                  </div>

                  <div className="flex items-center gap-8">
                    <Badge
                      className={`w-[164px] h-[52px] rounded-[20px] border-2 border-solid border-black flex items-center justify-center
                        ${dustbin.status === "Overflow" ? "bg-[#ff0000] text-white" : "bg-[#62ea23] text-black"}`}
                    >
                      <span className="font-['Inter',Helvetica] font-bold text-2xl">
                        {dustbin.status}
                      </span>
                    </Badge>

                    <Button className="w-[472px] h-[61px] bg-black rounded-[10px] text-white font-medium text-2xl">
                      Send Notification To Bin replacer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <span className="font-['Roboto',Helvetica] font-normal text-black text-2xl">
                View More..
              </span>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 border border-solid border-black p-12">
          <div className="grid grid-cols-4 gap-8">
            {/* Quick Links Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-text-regular-semi-bold text-black">
                Quick Links
              </h3>
              <div className="flex flex-col">
                {quickLinks.map((link, index) => (
                  <div key={index} className="py-2">
                    <span className="font-text-small-normal text-black">
                      {link}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-text-regular-semi-bold text-black">
                Resources
              </h3>
              <div className="flex flex-col">
                {resources.map((resource, index) => (
                  <div key={index} className="py-2">
                    <span className="font-text-small-normal text-black">
                      {resource}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Connected Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-text-regular-semi-bold text-black">
                Stay Connected
              </h3>
              <div className="flex flex-col">
                {stayConnected.map((item, index) => (
                  <div key={index} className="py-2">
                    <span className="font-text-small-normal text-black">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe Column */}
            <div className="flex flex-col gap-6 w-[400px]">
              <div className="flex flex-col gap-4">
                <h3 className="font-text-regular-semi-bold text-black">
                  Subscribe
                </h3>
                <p className="font-text-regular-normal text-black">
                  Join our newsletter to stay updated on features and releases.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <Input
                    className="flex-1 p-3 border border-solid border-black"
                    placeholder="Your Email"
                  />
                  <Button className="px-6 py-3 bg-[#61e923] border border-solid border-black font-text-regular-normal text-black">
                    Subscribe
                  </Button>
                </div>
                <p className="font-text-tiny-normal text-black">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};