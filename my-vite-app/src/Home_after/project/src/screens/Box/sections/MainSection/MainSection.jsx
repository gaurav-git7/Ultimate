import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";

export const MainSection = () => {
  // Navigation menu items data
  const navItems = [
    { label: "Home Page", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
  ];

  return (
    <header className="w-full py-4 px-0">
      <div className="flex justify-between items-center">
        {/* Left side navigation */}
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6 bg-[#61e923] border border-solid border-black p-3">
              <img
                className="w-[41px] h-[41px] object-cover"
                alt="Logo"
                src="/image-5.png"
              />

              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    className="font-['Roboto',Helvetica] font-normal text-black text-base leading-4"
                    href={item.href}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-['Roboto',Helvetica] font-normal text-black text-base leading-4 flex items-center gap-1 bg-transparent">
                  More Links
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink href="#">Link 1</NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">Link 2</NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">Link 3</NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side profile section */}
        <div className="flex items-center gap-4">
          <span className="font-['Roboto',Helvetica] font-normal text-black text-2xl leading-9">
            Your Profile
          </span>
          <Avatar className="w-[58px] h-12">
            <AvatarImage src="/image-2.png" alt="Profile" />
          </Avatar>
          <img
            className="h-[107px] w-[88px] object-cover"
            alt="Profile banner"
            src="/image.png"
          />
        </div>
      </div>
    </header>
  );
};