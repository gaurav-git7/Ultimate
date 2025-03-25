import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { MainContentSection } from "./sections/MainContentSection";
import { MessageCardSection } from "./sections/MessageCardSection/MessageCardSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const FrameScreen = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative">
        {/* Navigation Bar Section */}
        <NavigationBarSection />

        {/* Main Content Section */}
        <MainContentSection />

        {/* Message Card Section */}
        <MessageCardSection />

        {/* Profile Section */}
        <div className="flex items-center gap-4 absolute top-2.5 right-4">
          <div className="font-['Roboto',Helvetica] font-normal text-black text-2xl leading-9">
            Your Profile
          </div>
          <Avatar className="w-[113px] h-[104px]">
            <AvatarImage
              src="/image.png"
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>

        {/* Additional Image */}
        <img
          className="absolute w-[65px] h-[53px] top-9 left-[1077px] object-cover"
          alt="Image"
          src="/image-3.png"
        />
      </div>
    </div>
  );
};