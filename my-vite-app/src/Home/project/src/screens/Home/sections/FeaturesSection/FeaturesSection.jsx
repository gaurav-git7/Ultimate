import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";

export const FeaturesSection = () => {
  // Navigation menu items data
  const navItems = [
    { label: "Home Page", hasDropdown: false },
    { label: "About Us", hasDropdown: false },
    { label: "Services", hasDropdown: false },
    { label: "More Links", hasDropdown: true },
  ];

  return (
    <header className="w-full h-[116px] flex items-center justify-between px-16">
      <div className="flex items-center gap-6 bg-[#61e923] border border-solid border-black h-[50px] px-4">
        <img
          className="w-[41px] h-[41px] object-cover"
          alt="Logo"
          src="/image-5.png"
        />

        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger className="flex items-center gap-1 font-text-regular-normal text-black bg-transparent hover:bg-transparent hover:text-black focus:bg-transparent p-0 h-auto">
                      <span>{item.label}</span>
                      <ChevronDownIcon className="w-6 h-6" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* Dropdown content would go here */}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <span className="font-text-regular-normal text-black cursor-pointer">
                    {item.label}
                  </span>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#61e923] text-black border border-solid border-black rounded-none px-6 py-3 h-auto hover:bg-[#61e923] hover:text-black">
          Login
        </Button>
      </div>
    </header>
  );
};