import { XIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainContentSection = (): JSX.Element => {
  return (
    <Card className="relative w-full max-w-[658px] h-64 mx-auto bg-neutral-100 rounded-[60px] overflow-hidden">
      <CardContent className="p-0 h-full flex">
        {/* Left section with checkmark and first part of message */}
        <div className="relative flex-1 p-12">
          <img
            className="w-[66px] h-[70px] object-cover"
            alt="Checkmark"
            src="/image-1.png"
          />

          <div className="mt-[35px]">
            <h2 className="font-semibold text-[32px] text-black">Message S</h2>
            <p className="text-[32px] text-black mt-[70px]">Notification</p>
          </div>
        </div>

        {/* Right section with green background */}
        <div className="relative flex-1 bg-[#62ea23]">
          {/* Close button */}
          <div className="absolute right-[15px] top-[15px]">
            <div className="relative w-[39px] h-11 bg-[#62ea23] rounded-[19.5px/22px] border border-solid border-black flex items-center justify-center">
              <XIcon className="w-6 h-6 text-black" />
            </div>
          </div>

          <div className="mt-[47px] ml-[22px]">
            <h2 className="font-semibold text-[32px] text-white">ent</h2>
            <p className="text-[32px] text-white mt-[70px]">Sent to Replacer</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
