import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../../../firebase/AuthContext";
import { Button } from "../../../../../../components/ui/button.jsx";
import { Input } from "../../../../../../components/ui/input.jsx";
import { MainSection } from "../sections/MainSection/MainSection";
import api from "../../../../../../lib/api";

export const Profile = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  
  const [binId, setBinId] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load saved bin ID and location from local storage
  useEffect(() => {
    if (userId) {
      const savedBinId = localStorage.getItem(`smartbin_${userId}_binId`);
      const savedLocation = localStorage.getItem(`smartbin_${userId}_location`);
      
      if (savedBinId) {
        setBinId(savedBinId);
        setLocation(savedLocation || "");
      }
    }
  }, [userId]);

  const handleSave = () => {
    if (userId) {
      localStorage.setItem(`smartbin_${userId}_binId`, binId);
      localStorage.setItem(`smartbin_${userId}_location`, location || "");
      setIsEditing(false);
      setSaved(true);
      
      // Hide success message after a delay
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainSection onLogout={() => {}} />
      
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Your Profile
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* User information section */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Account Information
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                  {currentUser?.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {currentUser?.displayName || "Smart Bin User"}
                  </h3>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            
            {/* Smart Bin Configuration */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Default Smart Bin
                </h2>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="text-primary hover:bg-primary-50"
                  >
                    Edit
                  </Button>
                )}
              </div>
              
              {saved && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                  Default bin information saved successfully!
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bin ID
                  </label>
                  {isEditing ? (
                    <Input
                      placeholder="Enter bin ID (e.g. 1328)"
                      value={binId}
                      onChange={(e) => setBinId(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="py-2 px-3 border border-gray-200 rounded-md bg-gray-50">
                      {binId || "No default bin set"}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      placeholder="Enter bin location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="py-2 px-3 border border-gray-200 rounded-md bg-gray-50">
                      {location || "No location set"}
                    </p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex justify-end gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="border-gray-300 text-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="bg-primary text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 