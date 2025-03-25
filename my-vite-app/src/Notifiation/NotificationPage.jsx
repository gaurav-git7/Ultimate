import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { XIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";

export const NotificationPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dustbinInfo = location.state?.dustbinInfo || { id: 1, location: "Unknown Location" };
  
  // Auto-navigate back to dustbin page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dustbin");
    }, 5000);
    
    return () => clearTimeout(timer); // Clean up timer when component unmounts
  }, [navigate]);

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative p-4">
        {/* Header with profile */}
        <div className="flex justify-between items-center px-16 py-4 border-b border-gray-200 mb-10">
          <div className="flex items-center gap-6">
            <img
              className="w-[41px] h-[41px] object-cover"
              alt="Logo"
              src="/images/image-5.png"
            />
            <span className="font-bold text-xl">EcoBin Notification Center</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </Button>
            <span className="font-['Roboto',Helvetica] font-normal text-black text-xl">
              Your Profile
            </span>
            <Avatar className="w-[64px] h-[64px] border-2 border-[#61e923]">
              <AvatarImage src="/images/image.png" alt="Profile" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Notification Card */}
        <Card className="relative w-full max-w-[800px] mx-auto my-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <CardContent className="p-0 flex flex-col">
            {/* Header */}
            <div className="bg-[#62ea23] py-4 px-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Notification Alert</h2>
              <Button 
                onClick={() => navigate("/dustbin")}
                className="w-10 h-10 rounded-full bg-white p-0 flex items-center justify-center hover:bg-gray-100"
              >
                <XIcon className="w-5 h-5 text-black" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="bg-red-100 text-red-600 p-5 rounded-full">
                  <AlertIcon size={40} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Bin Overflow Alert</h3>
                  <p className="text-gray-700 mb-4">
                    A notification has been sent to the waste collection team regarding an overflow situation at dustbin #{dustbinInfo.id}.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <h4 className="font-medium mb-2">Dustbin Details:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li><span className="font-medium">ID:</span> #{dustbinInfo.id}</li>
                      <li><span className="font-medium">Location:</span> {dustbinInfo.location}</li>
                      <li><span className="font-medium">Status:</span> <span className="text-red-600 font-medium">Overflow</span></li>
                      <li><span className="font-medium">Alert Time:</span> {new Date().toLocaleTimeString()}</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircleIcon size={20} />
                    <span>Notification successfully sent to replacer team</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-gray-50 py-4 px-8 flex justify-between border-t border-gray-200">
              <div className="text-gray-500">
                You will be redirected back to the dashboard in a few seconds...
              </div>
              <Button 
                onClick={() => navigate("/dustbin")}
                className="bg-[#62ea23] hover:bg-[#52d913] text-black border border-black"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="max-w-[800px] mx-auto mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-[#62ea23] text-black w-6 h-6 flex items-center justify-center rounded-full mt-0.5">1</div>
              <div>
                <span className="font-medium">Collection Team Notification</span>
                <p className="text-gray-600">The waste collection team receives an immediate alert about the overflow situation</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-[#62ea23] text-black w-6 h-6 flex items-center justify-center rounded-full mt-0.5">2</div>
              <div>
                <span className="font-medium">Priority Assignment</span>
                <p className="text-gray-600">The bin is added to the priority collection route</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-[#62ea23] text-black w-6 h-6 flex items-center justify-center rounded-full mt-0.5">3</div>
              <div>
                <span className="font-medium">Collection Confirmation</span>
                <p className="text-gray-600">You'll receive a confirmation once the bin has been emptied</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Icon components
const AlertIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V14M12 21.41H5.94C2.47 21.41 1.02 18.93 2.7 15.9L5.82 10.28L8.76 5.00003C10.54 1.79003 13.46 1.79003 15.24 5.00003L18.18 10.29L21.3 15.91C22.98 18.94 21.52 21.42 18.06 21.42H12V21.41Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.995 17H12.005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); 