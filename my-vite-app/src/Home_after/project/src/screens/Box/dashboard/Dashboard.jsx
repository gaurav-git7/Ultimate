import React, { useState, useEffect } from "react";
import { 
  ChevronDownIcon, 
  PieChartIcon, 
  BarChartIcon, 
  MapPinIcon, 
  RefreshCcwIcon, 
  TrashIcon, 
  AlertTriangleIcon,
  Trash2Icon,
  SettingsIcon,
  ClipboardIcon,
  CheckCircleIcon,
  CalendarIcon,
  BellIcon,
  RefreshCw,
  MailIcon,
  LogIn, 
  Home as HomeIcon, 
  Info, 
  BarChart3, 
  Mail, 
  Bell,
  Menu,
  X
} from "lucide-react";
import { Button } from "../../../../../../components/ui/button.jsx";
import { Input } from "../../../../../../components/ui/input.jsx";
import { useAuth } from "../../../../../../firebase/AuthContext";
import api from "../../../../../../lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card.jsx";
import { Label } from "../../../../../../components/ui/label";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../../../components/ui/navigation-menu.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  initializeMessaging, 
  requestNotificationPermission, 
  saveFcmToken, 
  setupMessageListener,
  sendTestNotification
} from "../../../../../../firebase/firebaseMessaging";
import { 
  sendBinOverflowEmail, 
  sendBinStatusEmail,
  sendCollectionScheduledEmail
} from "../../../../../../lib/emailNotifications";

// Add CSS animations for the leaf elements
const leafAnimationStyles = `
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(10px, 15px) rotate(5deg); }
    50% { transform: translate(20px, 0) rotate(10deg); }
    75% { transform: translate(10px, -15px) rotate(5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  @keyframes floatReverse {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-10px, -15px) rotate(-5deg); }
    50% { transform: translate(-20px, 0) rotate(-10deg); }
    75% { transform: translate(-10px, 15px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  .leaf {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: rgba(97, 233, 35, 0.1);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    will-change: transform;
  }

  .leaf-1 {
    top: 10%;
    left: 10%;
    animation: float 15s ease-in-out infinite;
  }

  .leaf-2 {
    top: 20%;
    right: 10%;
    width: 60px;
    height: 60px;
    background-color: rgba(77, 179, 30, 0.1);
    animation: floatReverse 18s ease-in-out infinite;
    animation-delay: 1s;
  }

  .leaf-3 {
    bottom: 15%;
    left: 20%;
    width: 30px;
    height: 30px;
    background-color: rgba(97, 233, 35, 0.15);
    animation: float 12s ease-in-out infinite;
    animation-delay: 2s;
  }

  .leaf-4 {
    bottom: 25%;
    right: 20%;
    width: 50px;
    height: 50px;
    background-color: rgba(77, 179, 30, 0.15);
    animation: floatReverse 14s ease-in-out infinite;
    animation-delay: 3s;
  }
`;

// Mock Toast implementation until we create the proper component
const useToast = () => {
  return {
    toast: (message) => {
      console.log("Toast:", message);
      alert(message);
    }
  };
};

// Stub for the notification functions used in the Dashboard
const getNotificationSettings = () => {
  return {
    enabled: false,
    threshold: 80
  };
};

const saveNotificationSettings = (settings) => {
  console.log("Saving notification settings:", settings);
};

const sendBinOverflowNotification = (binId, binLocationText) => {
  console.log(`Bin ${binId} at ${binLocationText || 'unknown location'} is overflowing!`);
  alert(`Bin ${binId} at ${binLocationText || 'unknown location'} is overflowing!`);
};

// Mock Tabs components until we create the proper components
const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex gap-2">{children}</div>;
const TabsTrigger = ({ children, value }) => <button className="px-4 py-2 rounded hover:bg-gray-100">{children}</button>;

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const navigate = useNavigate();
  const location = useLocation();
  const [binId, setBinId] = useState("");
  const [binLocation, setBinLocation] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [binData, setBinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [binHistory, setBinHistory] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [emptyingBin, setEmptyingBin] = useState(false);
  const [schedulingCollection, setSchedulingCollection] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [previousFillLevel, setPreviousFillLevel] = useState(0);
  
  // Navigation state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard"); // Set to dashboard initially
  const [hasNotification, setHasNotification] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  
  // Update active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Track scroll position for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Check if we should apply sticky effect
      if (window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Request notification permissions when component mounts
  useEffect(() => {
    const requestPermissions = async () => {
      const settings = getNotificationSettings();
      
      if (settings.enabled) {
        const permissionGranted = await requestNotificationPermission();
        setNotificationsEnabled(permissionGranted);
      }
    };
    
    requestPermissions();
  }, []);

  // Load the saved bin ID from local storage when component mounts
  useEffect(() => {
    if (userId) {
      const savedBinId = localStorage.getItem(`smartbin_${userId}_binId`);
      const savedLocation = localStorage.getItem(`smartbin_${userId}_location`);
      
      if (savedBinId) {
        setBinId(savedBinId);
        setBinLocation(savedLocation || "");
        
        // Auto-connect if we have a saved bin ID
        if (savedBinId) {
          handleConnect(savedBinId, savedLocation || "");
        }
      }
    }
  }, [userId]);

  // Monitor bin fill level for overflow notifications
  useEffect(() => {
    if (binData && notificationsEnabled) {
      const settings = getNotificationSettings();
      const threshold = settings.threshold || 80;
      
      // Check if bin is full and hasn't been notified yet
      if (binData.fillPercentage >= threshold && previousFillLevel < threshold) {
        sendBinOverflowNotification(binData.binId, binData.location);
      }
      
      // Update previous fill level
      setPreviousFillLevel(binData.fillPercentage);
    }
  }, [binData, notificationsEnabled, previousFillLevel]);

  // Use our API service to fetch real bin data
  const fetchBinData = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use our real API service
      const data = await api.binData.getBinData(id);
      
      // Update state with real data
      setBinData(data);
      
      // Get history data as well
      try {
        const history = await api.binData.getBinHistory(id, 10);
        console.log("Fetched history data:", history); // Debugging line
        setBinHistory(history || []);
      } catch (historyErr) {
        console.error("Error fetching bin history:", historyErr);
      }
      
      return data;
    } catch (err) {
      console.error("Error fetching bin data:", err);
      setError("Failed to fetch bin data. Please try again.");
      
      // Fallback to mock data for development/testing
      if (import.meta.env.DEV) {
        console.log("Using fallback mock data for development");
        const mockData = generateMockData(id);
        setBinData(mockData);
        setBinHistory(prev => {
          const newHistory = [mockData, ...prev];
          return newHistory.slice(0, 10);
        });
        return mockData;
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to generate mock data for development
  const generateMockData = (id) => {
    const fillPercentage = Math.floor(Math.random() * 100);
    const status = fillPercentage >= 80 ? "critical" : 
                  fillPercentage >= 50 ? "warning" : "normal";
                  
    return {
      binId: id,
      location: binLocation || "Default Location",
      distance: Math.floor(Math.random() * 40) + 5, // 5 to 45cm
      fillPercentage,
      batteryLevel: Math.floor(Math.random() * 30) + 70, // 70 to 100%
      timestamp: new Date().toISOString(),
      status
    };
  };

  // Handle toggling notifications
  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      // Disable notifications
      const settings = getNotificationSettings();
      settings.enabled = false;
      saveNotificationSettings(settings);
      setNotificationsEnabled(false);
    } else {
      // Enable notifications
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        const settings = getNotificationSettings();
        settings.enabled = true;
        saveNotificationSettings(settings);
        setNotificationsEnabled(true);
      }
    }
  };

  // Function to connect to the bin
  const handleConnect = async (binIdToConnect = binId, locationToConnect = binLocation) => {
    if (!binIdToConnect) {
      setError("Please enter a bin ID");
      return;
    }
    
    setIsConnecting(true);
    try {
      // First check if the bin exists by getting its data
      const data = await api.binData.getBinData(binIdToConnect);
      
      // If we made it here, we have a successful connection
      if (data) {
        setConnected(true);
        
        // If no location was provided, use the one from the bin data
        if (!locationToConnect && data.location) {
          setBinLocation(data.location);
          locationToConnect = data.location;
        }
        
        // Update location in bin if provided
        if (locationToConnect && locationToConnect !== data.location) {
          try {
            // Try to update the bin location
            await api.bins.updateBin(binIdToConnect, { location: locationToConnect });
          } catch (updateErr) {
            console.error("Error updating bin location:", updateErr);
            // Non-critical error, don't show to user
          }
        }
        
        // Save the bin ID and location to local storage for this user
        if (userId) {
          try {
          localStorage.setItem(`smartbin_${userId}_binId`, binIdToConnect);
          localStorage.setItem(`smartbin_${userId}_location`, locationToConnect || "");
          } catch (err) {
            console.error("Error saving to localStorage:", err);
          }
        }
        
        // Set previous fill level for overflow detection
        setPreviousFillLevel(data.fillPercentage || 0);
      }
    } catch (err) {
      console.error("Error connecting to bin:", err);
      setError(`Failed to connect to bin ${binIdToConnect}. Please check ID and try again.`);
      
      if (import.meta.env.DEV) {
        // In development, allow connection with mock data
        console.log("Using mock data for development");
        const mockData = generateMockData(binIdToConnect);
        setBinData(mockData);
        setBinHistory([mockData]);
        setConnected(true);
        
        // Save the bin ID to local storage for this user even in dev mode
        if (userId) {
          try {
          localStorage.setItem(`smartbin_${userId}_binId`, binIdToConnect);
          localStorage.setItem(`smartbin_${userId}_location`, locationToConnect || "");
          } catch (err) {
            console.error("Error saving to localStorage:", err);
          }
        }
        
        // Set previous fill level for overflow detection
        setPreviousFillLevel(mockData.fillPercentage || 0);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Function to disconnect from the bin
  const handleDisconnect = () => {
    setConnected(false);
    setBinData(null);
    setBinHistory([]);
    
    // Remove saved bin ID from local storage
    if (userId) {
      try {
      localStorage.removeItem(`smartbin_${userId}_binId`);
      localStorage.removeItem(`smartbin_${userId}_location`);
      } catch (err) {
        console.error("Error removing from localStorage:", err);
      }
    }
  };

  // Function to handle refresh
  const handleRefresh = () => {
    if (connected && binId) {
      fetchBinData(binId);
    }
  };

  // Set up interval for automatic data refresh when connected
  useEffect(() => {
    let intervalId;
    
    if (connected && binId) {
      intervalId = setInterval(() => {
        fetchBinData(binId);
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [connected, binId, refreshInterval]);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "critical": return "text-red-500";
      case "warning": return "text-amber-500";
      case "normal": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  // Function to get background color for progress bar
  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
        let date;

        // Log timestamp for debugging
        console.log("Raw timestamp:", timestamp);

        // Firestore timestamp object
        if (timestamp && typeof timestamp.toDate === "function") {
            date = timestamp.toDate();
        }
        // String timestamp (ISO format)
        else if (typeof timestamp === "string") {
            if (timestamp === "Invalid timestamp") {
                return "N/A";
            }
            date = new Date(timestamp);
        }
        // Numeric timestamp (milliseconds or seconds)
        else if (typeof timestamp === "number") {
            date = timestamp > 10000000000 ? new Date(timestamp) : new Date(timestamp * 1000);
        }
        // Native JavaScript Date object
        else if (timestamp instanceof Date) {
            date = timestamp;
        } 
        else {
            return "N/A";
        }

        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.error("Invalid date detected:", timestamp);
            return "N/A";
        }

        // Format the date
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(date);
    } catch (error) {
        console.error("Error formatting timestamp:", error, "Input:", timestamp);
        return "N/A";
    }
};

  // Function to empty a bin
  const handleEmptyBin = async () => {
    if (!connected || !binId) return;
    
    setEmptyingBin(true);
    setActionSuccess(null);
    setActionError(null);
    
    try {
      // Call API to mark bin as emptied
      const response = await api.bins.emptyBin(binId, "Manually emptied via dashboard");
      
      // Show success message
      setActionSuccess("Bin successfully marked as emptied!");
      
      // Refresh bin data
      await fetchBinData(binId);
      
      // Hide success message after a delay
      setTimeout(() => {
        setActionSuccess(null);
      }, 5000);
    } catch (err) {
      console.error("Error emptying bin:", err);
      setActionError("Failed to empty bin. Please try again.");
      
      // Hide error message after a delay
      setTimeout(() => {
        setActionError(null);
      }, 5000);
    } finally {
      setEmptyingBin(false);
    }
  };

  // Function to send bin status email
  const handleSendStatusEmail = async () => {
    if (!connected || !binData || !userId) return;
    
    setActionSuccess(null);
    setActionError(null);
    
    try {
      const success = await sendBinStatusEmail(userId, binData);
      
      if (success) {
        setActionSuccess("Bin status email notification sent successfully!");
      } else {
        setActionError("Failed to send email notification. Please try again.");
      }
      
      // Hide message after a delay
      setTimeout(() => {
        setActionSuccess(null);
        setActionError(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending status email:", error);
      setActionError("Error sending email notification: " + error.message);
      
      // Hide error message after a delay
      setTimeout(() => {
        setActionError(null);
      }, 5000);
    }
  };

  // Function to schedule collection
  const handleScheduleCollection = async () => {
    if (!connected || !binId) return;
    
    setSchedulingCollection(true);
    setActionSuccess(null);
    setActionError(null);
    
    try {
      // In a real application, you might integrate with a scheduling service
      // For now, we'll just add a notification
      await api.notifications.createNotification({
        title: `Collection scheduled for Bin #${binId}`,
        message: `A collection has been scheduled for the bin at ${binData.location || 'Unknown location'}`,
        type: 'info'
      });
      
      // Also send email notification if user is logged in
      if (userId) {
        // Use tomorrow as the scheduled date for testing
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + 1);
        
        await sendCollectionScheduledEmail(
          userId,
          binId,
          binData.location || "Unknown location",
          scheduledDate
        );
      }
      
      setActionSuccess("Collection successfully scheduled!");
      
      // Hide success message after a delay
      setTimeout(() => {
        setActionSuccess(null);
      }, 5000);
    } catch (err) {
      console.error("Error scheduling collection:", err);
      setActionError("Failed to schedule collection. Please try again.");
      
      // Hide error message after a delay
      setTimeout(() => {
        setActionError(null);
      }, 5000);
      
      // For development, show success anyway
      if (import.meta.env.DEV) {
        setActionSuccess("Collection successfully scheduled! (Development mode)");
        setTimeout(() => {
          setActionSuccess(null);
        }, 5000);
      }
    } finally {
      setSchedulingCollection(false);
    }
  };

  // Function to test notifications
  const handleTestNotification = async () => {
    if (connected && binId) {
      // Test push notification if enabled
      if (notificationsEnabled) {
        sendBinOverflowNotification(binId, binLocation);
      }
      
      // Always test email notification
      if (userId) {
        try {
          await sendBinOverflowEmail(userId, {
            binId,
            location: binLocation || "Test Location",
            fillPercentage: 85,
            status: "critical"
          });
        } catch (error) {
          console.error("Error sending test email:", error);
        }
      }
      
      setActionSuccess("Test notifications sent!");
      
      // Hide success message after a delay
      setTimeout(() => {
        setActionSuccess(null);
      }, 5000);
    } else if (!notificationsEnabled) {
      setActionError("Notifications are disabled. Enable them from the dashboard header.");
      
      // Hide error message after a delay
      setTimeout(() => {
        setActionError(null);
      }, 5000);
    }
  };

  // Existing bin data for testing
  useEffect(() => {
    if (userId) {
      // Initialize Firebase messaging and request permission
    const initNotifications = async () => {
      try {
          // Initialize Firebase messaging
          const messaging = await initializeMessaging();
        if (messaging) {
            // Set up message listener
            setupMessageListener((payload) => {
              console.log("Received message:", payload);
              // Refresh data when a notification is received
              fetchBinData(binId);
            });
            
            // Request permission
            const permissionGranted = await requestNotificationPermission();
            setNotificationsEnabled(permissionGranted);
            
            if (permissionGranted) {
              // Get FCM token and save it
              const fcmToken = await messaging.getToken();
          if (fcmToken) {
                // Save to our backend
                const tokenSaved = await saveFcmToken(userId, fcmToken);
                console.log("FCM token saved:", tokenSaved);
                
                // Test push notification if enabled
                if (notificationsEnabled) {
                  sendBinOverflowNotification(binId, binLocation);
                }
                
                // Also test email notification for development
                if (import.meta.env.DEV && notificationsEnabled) {
                  try {
                    await sendBinOverflowEmail(userId, {
                      binId,
                      location: binLocation || "Test Location",
                      fillPercentage: 85,
                      status: "critical"
                    });
                    console.log("Test email notification sent successfully");
                  } catch (emailErr) {
                    console.error("Error sending test email notification:", emailErr);
                  }
                }
              }
          }
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };
    
    // Initialize notifications after auth
    if (currentUser) {
      initNotifications();
    }
    
    // Existing code for fetching data
    fetchBinData();
    }
  }, [currentUser]);

  // Navigation menu items data with icons for better visual cues
  const navItems = [
    { 
      label: "Home", 
      hasDropdown: false, 
      href: "/",
      icon: <HomeIcon size={16} />,
      isScroll: false
    },
    { 
      label: "About Us", 
      hasDropdown: false, 
      href: "/about",
      icon: <Info size={16} />,
      isScroll: false
    },
    { 
      label: "Dashboard", 
      hasDropdown: false, 
      href: "/dashboard",
      icon: <BarChart3 size={16} />,
      isScroll: false
    },
    { 
      label: "Contact", 
      hasDropdown: false, 
      href: "#contact-section",
      icon: <Mail size={16} />,
      isScroll: true,
      sectionId: "contact-section"
    }
  ];

  // Handle navigation or scrolling
  const handleNavigation = (e, item) => {
    e.preventDefault();
    
    if (item.isScroll) {
      // For scroll items
      scrollToSection(item.sectionId);
      setActiveLink(item.href);
    } else {
      // For page navigation
      setActiveLink(item.href);
      navigate(item.href);
    }
    
    setMobileMenuOpen(false);
  };
  
  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // If not on homepage, navigate there first, then scroll
      const currentPathname = location.pathname;
      if (currentPathname !== '/') {
        navigate('/');
        // Need to wait for navigation to complete before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        // Already on homepage, just scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Classes for the navbar based on scroll position
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled 
      ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
      : "bg-transparent py-4"
  } ${
    isSticky 
      ? "transform-none" 
      : mobileMenuOpen ? "transform-none" : "md:translate-y-0"
  }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0ffe8] to-white">
      {/* Add style tag for leaf animations */}
      <style dangerouslySetInnerHTML={{ __html: leafAnimationStyles }}></style>
      
      {/* Enhanced Navigation Header */}
      <header className={navbarClasses}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with enhanced animation */}
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#61e923] blur-md opacity-50 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <img
                  className="w-10 h-10 object-cover relative z-10 group-hover:rotate-[360deg] transition-transform duration-700"
                  alt="Logo"
                  src="/images/image-5.png"
                  onError={(e) => { 
                    e.target.src = 'https://placehold.co/80x80/e8fbde/61e923?text=SW' 
                  }}
                />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-xl text-gray-900 group-hover:text-[#4db31e] transition-colors duration-300">
                  SmartWaste
                </h1>
                <p className="text-xs text-gray-500 transform group-hover:translate-x-1 transition-transform duration-300">
                  Intelligent Management
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation - Enhanced version */}
            <div className="hidden md:block">
              <NavigationMenu className="max-w-none">
                <NavigationMenuList className="flex items-center gap-1">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <div
                        className={`relative px-4 py-2 cursor-pointer rounded-lg group transition-all duration-300 
                          ${activeLink === item.href 
                            ? 'text-[#4db31e] bg-[#61e923]/10' 
                            : 'text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10'}`}
                        onClick={(e) => handleNavigation(e, item)}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                        <div className="relative z-10 flex items-center gap-2">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        
                        {/* Animated underline indicator */}
                        <div 
                          className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#61e923] rounded-full transition-all duration-300 
                          ${activeLink === item.href ? 'w-3/4' : 'w-0 group-hover:w-1/2'}`}
                        ></div>
                      </div>
                    </NavigationMenuItem>
                  ))}
                  
                  {/* Notification bell with indicator */}
                  <NavigationMenuItem>
                    <div className="relative ml-2 cursor-pointer p-2 rounded-full hover:bg-[#61e923]/10 transition-colors duration-300 group">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                      <Bell size={20} className="relative z-10 text-gray-600 hover:text-[#4db31e] transition-colors duration-300 group-hover:rotate-12 transform transition-transform" />
                      {hasNotification && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse z-20"></span>
                      )}
                    </div>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Side Actions - Enhanced buttons */}
            <div className="flex items-center gap-4">
              {/* User Actions */}
              <div className="hidden sm:flex items-center gap-3">
                <Button 
                  variant="ghost"
                  className="relative overflow-hidden text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10 border-none flex items-center gap-2 px-4 py-2 rounded-lg group transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <LogIn size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Sign In</span>
                  </span>
                </Button>
                <Button 
                  className="relative overflow-hidden bg-[#61e923] hover:bg-[#4db31e] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-none transform hover:-translate-y-1 active:translate-y-0 px-5 py-2 group"
                  onClick={() => navigate('/signup')}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  <span className="relative z-10">Get Started</span>
                </Button>
              </div>

              {/* Mobile Menu Button with enhanced animation */}
              <button 
                className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4db31e] hover:bg-[#61e923]/10 transition-colors duration-300 focus:outline-none relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                <div className="relative w-6 h-6 z-10">
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45 top-3' : 'top-2'
                    }`}
                  ></span>
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    } top-3`}
                  ></span>
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? '-rotate-45 top-3' : 'top-4'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu with glass morphism and animations */}
        <div 
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen 
              ? 'max-h-[500px] opacity-100 backdrop-blur-md bg-white/90' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 pb-6 pt-2">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                    activeLink === item.href 
                      ? 'bg-[#61e923]/15 text-[#4db31e]' 
                      : 'text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]'
                  }`}
                  onClick={(e) => handleNavigation(e, item)}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <span className={`absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 ${activeLink === item.href ? 'opacity-30' : 'group-hover:opacity-20'} transition-opacity duration-300 blur-md`}></span>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Animated indicator for active link */}
                    {activeLink === item.href && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4db31e]"></div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard Content - with spacing to account for fixed header */}
      <main className="pt-40 pb-12 px-4 md:px-8 lg:px-16 container mx-auto bg-gradient-to-br from-[#f0ffe8]/50 to-white rounded-t-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
          Smart Bin Dashboard
        </h1>
          <div className="flex items-center gap-2 flex-wrap justify-end">
          <Button 
            onClick={handleToggleNotifications}
            className={`flex items-center gap-2 ${notificationsEnabled ? 'bg-green-50 hover:bg-green-100 text-green-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            title={notificationsEnabled ? "Notifications enabled" : "Notifications disabled"}
          >
            <BellIcon size={16} />
            <span className="hidden sm:inline">{notificationsEnabled ? "Notifications On" : "Notifications Off"}</span>
          </Button>
          
          <Button 
            onClick={handleRefresh} 
            disabled={loading || !connected}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            <RefreshCcwIcon size={16} />
            <span>Refresh</span>
          </Button>
          {connected && (
            <Button 
              onClick={handleDisconnect}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700"
            >
              <Trash2Icon size={16} />
              <span>Disconnect</span>
            </Button>
          )}
        </div>
      </div>

      {/* Connection form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Connect to Smart Bin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bin ID
            </label>
            <Input
              placeholder="Enter bin ID (e.g. 1328)"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              disabled={connected}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (optional)
            </label>
            <Input
              placeholder="Enter bin location"
                value={binLocation}
                onChange={(e) => setBinLocation(e.target.value)}
              disabled={connected}
              className="w-full"
            />
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        <div className="mt-4 flex justify-center">
          {!connected ? (
            <Button
                onClick={() => handleConnect(binId, binLocation)}
              disabled={isConnecting || !binId}
              className="px-6 py-2 bg-primary text-white font-medium flex items-center gap-2"
            >
              {isConnecting ? "Connecting..." : "Connect to Bin"}
              {!isConnecting && <MapPinIcon size={18} />}
            </Button>
          ) : (
            <p className="text-green-600 font-medium flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
              Connected to Bin {binId}
            </p>
          )}
        </div>
      </div>

      {/* Dashboard content - only show when connected */}
      {connected && binData && (
        <>
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Fill Level</h3>
                <BarChartIcon className={getStatusColor(binData.status)} size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData.fillPercentage}%</p>
              <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressBarColor(binData.fillPercentage)}`}
                  style={{ width: `${binData.fillPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className={getStatusColor(binData.status)}>
                  {binData.status.charAt(0).toUpperCase() + binData.status.slice(1)}
                </span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Distance</h3>
                <MapPinIcon className="text-blue-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData.distance} cm</p>
              <p className="text-sm text-gray-500 mt-2">From sensor to waste</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Battery Level</h3>
                <SettingsIcon className="text-purple-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData.batteryLevel}%</p>
              <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${binData.batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${binData.batteryLevel}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {binData.batteryLevel > 20 ? 'Good' : 'Low battery'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Last Updated</h3>
                <RefreshCcwIcon className="text-teal-500" size={20} />
              </div>
              <p className="text-xl font-bold mt-2">{formatTimestamp(binData.timestamp)}</p>
              <p className="text-sm text-gray-500 mt-2">Auto-refresh: {refreshInterval}s</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <RefreshCcwIcon size={14} />
                Refresh Now
              </button>
            </div>
          </div>
          
          {/* Smart bin visualization */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Bin Visualization</h3>
              <div className="flex justify-center">
                <div className="relative h-80 w-40 border-2 border-gray-400 rounded-md overflow-hidden">
                  <div 
                    className={`absolute bottom-0 left-0 w-full ${getProgressBarColor(binData.fillPercentage)} transition-all duration-1000 ease-in-out`} 
                    style={{ height: `${binData.fillPercentage}%` }}
                  ></div>
                  
                  {/* Sensor at the top */}
                  <div className="absolute top-0 left-0 w-full flex justify-center">
                    <div className="w-10 h-4 bg-gray-600 rounded-b-lg"></div>
                  </div>
                  
                  {/* Fill level markers */}
                  <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between pointer-events-none">
                    <div className="h-0 relative">
                      <span className="absolute -left-7 text-xs text-gray-600">0%</span>
                    </div>
                    <div className="h-0 relative">
                      <span className="absolute -left-7 text-xs text-gray-600">25%</span>
                      <div className="absolute left-0 w-2 h-0.5 bg-gray-400"></div>
                    </div>
                    <div className="h-0 relative">
                      <span className="absolute -left-7 text-xs text-gray-600">50%</span>
                      <div className="absolute left-0 w-2 h-0.5 bg-gray-400"></div>
                    </div>
                    <div className="h-0 relative">
                      <span className="absolute -left-7 text-xs text-gray-600">75%</span>
                      <div className="absolute left-0 w-2 h-0.5 bg-gray-400"></div>
                    </div>
                    <div className="h-0 relative">
                      <span className="absolute -left-7 text-xs text-gray-600">100%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Bin ID: <span className="font-medium">{binData.binId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Location: <span className="font-medium">{binData.location}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {binData.status === "critical" && (
                    <span className="text-red-600 font-medium">Requires immediate attention!</span>
                  )}
                  {binData.status === "warning" && (
                    <span className="text-amber-600 font-medium">Will need emptying soon</span>
                  )}
                  {binData.status === "normal" && (
                    <span className="text-green-600 font-medium">Bin level normal</span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Readings history */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800">Reading History</h3>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Refresh every:</label>
                  <select 
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="text-sm p-1 border border-gray-300 rounded"
                  >
                    <option value={10}>10s</option>
                    <option value={30}>30s</option>
                    <option value={60}>1m</option>
                    <option value={300}>5m</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-3 text-left font-medium text-gray-600">Time</th>
                      <th className="py-2 px-3 text-center font-medium text-gray-600">Fill %</th>
                      <th className="py-2 px-3 text-center font-medium text-gray-600">Dist (cm)</th>
                      <th className="py-2 px-3 text-center font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {binHistory.length > 0 ? binHistory.map((reading, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-3">{formatTimestamp(reading.timestamp)}</td>
                        <td className="py-2 px-3 text-center">{reading.fillPercentage}%</td>
                        <td className="py-2 px-3 text-center">{reading.distance}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full ${getProgressBarColor(reading.fillPercentage)} mr-1`}></span>
                          <span className={getStatusColor(reading.status)}>
                            {reading.status.charAt(0).toUpperCase() + reading.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-gray-500">
                          No history data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Actions</h3>
            
            {/* Action success or error messages */}
            {actionSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
                <CheckCircleIcon size={16} />
                <span>{actionSuccess}</span>
              </div>
            )}
            
            {actionError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
                <AlertTriangleIcon size={16} />
                <span>{actionError}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={handleScheduleCollection}
                disabled={schedulingCollection}
              >
                {schedulingCollection ? (
                  <>Scheduling...</>
                ) : (
                  <>
                    <CalendarIcon size={16} />
                    Schedule Collection
                  </>
                )}
              </Button>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                onClick={handleEmptyBin}
                disabled={emptyingBin}
              >
                {emptyingBin ? (
                  <>Marking as Empty...</>
                ) : (
                  <>
                    <TrashIcon size={16} />
                    Empty Bin
                  </>
                )}
              </Button>
              
              <Button className="bg-purple-600 hover:bg-purple-700">Maintenance Request</Button>
              <Button className="bg-amber-600 hover:bg-amber-700">Bin Settings</Button>
              
              {/* Test notification button */}
              <Button 
                className="bg-slate-600 hover:bg-slate-700 flex items-center gap-2"
                onClick={handleTestNotification}
                title="Send a test notification"
              >
                <BellIcon size={16} />
                Test Notification
              </Button>

              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                onClick={handleSendStatusEmail}
              >
                <MailIcon size={16} />
                Email Status Report
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Instructions when not connected */}
      {!connected && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            How to Connect Your Smart Bin
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Your ESP8266-based smart bin uses an ultrasonic sensor to measure fill levels.
              Follow these steps to connect:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Make sure your smart bin is powered on and connected to WiFi</li>
              <li>Enter the Bin ID (this should match the binId in your ESP8266 code)</li>
              <li>Optional: specify the bin location for better tracking</li>
              <li>Click the "Connect to Bin" button to establish a connection</li>
              <li>The dashboard will automatically update with real-time bin data</li>
            </ol>
            
            <div className="p-4 bg-blue-50 rounded-md mt-4">
              <h3 className="font-medium text-blue-700 mb-2">Server Setup for Your Hardware</h3>
              <p className="text-blue-600 text-sm">
                Update your ESP8266 code to send data to: <code className="bg-blue-100 px-2 py-1 rounded">http://YOUR_SERVER_IP:5000/api/esp/data</code>
              </p>
              <p className="text-blue-600 text-sm mt-2">
                Testing endpoint: <code className="bg-blue-100 px-2 py-1 rounded">http://YOUR_SERVER_IP:5000/api/esp/test</code>
              </p>
              <p className="text-blue-600 text-sm mt-2">
                Data format: <code className="bg-blue-100 px-2 py-1 rounded">{"{"}"binId": "1328", "distance": 20, "fillPercentage": 60, "batteryLevel": 90{"}"}</code>
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Hardware Setup Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Components Required:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>ESP8266 NodeMCU board</li>
                    <li>HC-SR04 Ultrasonic sensor</li>
                    <li>LED for status indication</li>
                    <li>Jumper wires</li>
                    <li>Breadboard</li>
                    <li>USB cable for power</li>
                    <li>5V power source (for deployment)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Connections:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>HC-SR04 Trigger pin → D1 (GPIO5)</li>
                    <li>HC-SR04 Echo pin → D2 (GPIO4)</li>
                    <li>HC-SR04 VCC → 5V</li>
                    <li>HC-SR04 GND → GND</li>
                    <li>DHT Data pin → D3 (GPIO0) (optional)</li>
                    <li>DHT VCC → 3.3V</li>
                    <li>DHT GND → GND</li>
                    <li>LED → D4 (GPIO2) with resistor</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-1">Setup Steps:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Install the Arduino IDE and required libraries: ESP8266WiFi, ESP8266HTTPClient, WiFiClient, ArduinoJson, DHT</li>
                  <li>Connect the hardware components according to the wiring diagram</li>
                  <li>Copy the provided ESP8266 code and update the WiFi and server settings</li>
                  <li>Set your unique BIN_ID and BIN_HEIGHT based on your waste bin</li>
                  <li>Upload the code to your ESP8266 device</li>
                  <li>Monitor the Serial output to verify connections</li>
                  <li>Place the sensor at the top of your waste bin</li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md mt-4 text-sm">
                <h4 className="font-medium text-yellow-800 mb-1">Important Notes:</h4>
                <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                  <li>The ultrasonic sensor should be mounted at the top of the bin pointing downward</li>
                  <li>Make sure no objects obstruct the sensor's path</li>
                  <li>The BIN_HEIGHT parameter should be set to the distance from sensor to the bottom of the empty bin</li>
                  <li>For outdoor deployment, ensure components are properly protected from weather</li>
                  <li>The ESP8266 will send data every 5 minutes by default - adjust SEND_INTERVAL if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}; 