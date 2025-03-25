import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";

export const NavigationBarSection = () => {
  // Navigation menu items data
  const menuItems = [
    { label: "Home Page", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
  ];

  return (
    <header className="w-full flex justify-center bg-white py-[26px]">
      <div className="w-full max-w-[1440px] flex justify-center bg-white">
        <nav className="h-[72px] w-full flex items-center justify-around px-16 py-0">
          <div className="flex h-12 items-center gap-6 bg-[#61e923] border border-solid border-black">
            <img
              className="w-[41px] h-[41px] object-cover"
              alt="Image"
              src="/image-5.png"
            />

            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-8">
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={item.href}
                      className="font-text-regular-normal text-base leading-4 text-black"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-text-regular-normal text-base leading-4 text-black flex items-center gap-1 bg-transparent hover:bg-transparent focus:bg-transparent">
                    More Links
                    <ChevronDownIcon className="w-6 h-6" />
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

            <div className="w-[103px] h-[46px]" />
          </div>
        </nav>
      </div>
    </header>
  );
};