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
  X,
  UserIcon,
  LogOut,
  UserPlus
} from "lucide-react";
import { Button } from "../../../../../../components/ui/button.jsx";
import { Input } from "../../../../../../components/ui/input.jsx";
import { useAuth } from "../../../../../../firebase/AuthContext";
import api from "../../../../../../lib/api";
import ErrorBoundary from "./ErrorBoundary";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../components/ui/avatar.jsx";

// Define API base URL
const API_BASE_URL = "http://localhost:5000/api";
// Direct ESP endpoint (without /api path)
const ESP_API_URL = "http://localhost:5000";

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

const sendBinOverflowNotification = async (binId, binLocationText) => {
  try {
    if (!notificationsEnabled) {
      console.log("Notifications are disabled");
      return;
    }

    // Request permission first
    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      // Create and show notification
      const notification = new Notification("Bin Overflow Alert!", {
        body: `Bin ${binId} at ${binLocationText || 'unknown location'} is overflowing!`,
        icon: "/images/image-5.png",
        badge: "/images/image-5.png",
        data: {
          binId: binId,
          location: binLocationText || 'unknown location',
          type: 'overflow',
          timestamp: new Date().toISOString()
        },
        requireInteraction: true // Notification won't auto-dismiss
      });

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
        navigate('/dashboard');
      };

      // Also send email notification if user is logged in
      if (currentUser?.uid) {
        await sendBinOverflowEmail(currentUser.uid, {
          binId,
          location: binLocationText || 'unknown location',
          fillPercentage: binData?.fillPercentage || 100,
          status: 'critical'
        });
      }
    }
  } catch (error) {
    console.error("Error sending overflow notification:", error);
  }
};

// Mock Tabs components until we create the proper components
const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex gap-2">{children}</div>;
const TabsTrigger = ({ children, value }) => <button className="px-4 py-2 rounded hover:bg-gray-100">{children}</button>;

export const Dashboard = () => {
  const { currentUser, logout } = useAuth();
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
  const [refreshInterval, setRefreshInterval] = useState(10); // Set default to 10 seconds
  const [emptyingBin, setEmptyingBin] = useState(false);
  const [schedulingCollection, setSchedulingCollection] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [previousFillLevel, setPreviousFillLevel] = useState(0);
  const [connectionFailedAttempts, setConnectionFailedAttempts] = useState(0);
  
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
      try {
        // Initialize Firebase messaging
        const messaging = await initializeMessaging();
        
        if (messaging) {
          // Request permission
          const permission = await Notification.requestPermission();
          
          if (permission === "granted") {
            // Get FCM token
            const token = await messaging.getToken();
            
            if (token) {
              // Save token to backend
              await saveFcmToken(userId, token);
              setNotificationsEnabled(true);
              
              // Set up message listener
              setupMessageListener((payload) => {
                console.log("Received notification:", payload);
                // Show notification
                if (Notification.permission === "granted") {
                  new Notification(payload.notification.title, {
                    body: payload.notification.body,
                    icon: "/images/image-5.png",
                    badge: "/images/image-5.png",
                    data: payload.data,
                    tag: payload.data?.type || 'default',
                    requireInteraction: true
                  });
                }
              });
            }
          } else {
            setNotificationsEnabled(false);
          }
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
        setNotificationsEnabled(false);
      }
    };
    
    if (currentUser) {
    requestPermissions();
    }
  }, [currentUser, userId]);

  // Get and store Firebase ID token for API authentication
  useEffect(() => {
    const getAndStoreIdToken = async () => {
      if (currentUser) {
        try {
          // Get fresh ID token from Firebase
          const idToken = await currentUser.getIdToken(true);
          
          // Store token in localStorage for API requests
          localStorage.setItem('authToken', idToken);
          console.log('Firebase ID token stored in localStorage');
        } catch (error) {
          console.error('Error getting Firebase ID token:', error);
        }
      } else {
        // Remove token when user is signed out
        localStorage.removeItem('authToken');
        console.log('Firebase ID token removed from localStorage');
      }
    };
    
    getAndStoreIdToken();
  }, [currentUser]);

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
    if (binData) {
      const threshold = 80; // Fixed threshold at 80%
      
      // Check if bin is full and hasn't been notified yet
      if (binData.fillPercentage >= threshold && previousFillLevel < threshold) {
        // Request permission and show notification
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            const notification = new Notification("Bin Overflow Alert!", {
              body: `Bin ${binData.binId} at ${binData.location || 'unknown location'} is at ${binData.fillPercentage}% capacity!`,
              icon: "/images/image-5.png",
              badge: "/images/image-5.png",
              requireInteraction: true
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
              navigate('/dashboard');
            };
          }
        });
      }
      
      // Update previous fill level
      setPreviousFillLevel(binData.fillPercentage);
    }
  }, [binData, previousFillLevel, navigate]);

  // Function to fetch bin data - moved outside useEffect
  const fetchBinData = async () => {
    if (!binId || binId.trim() === "") {
      console.error("Cannot fetch bin data: Invalid binId");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Skip the direct ESP endpoint due to 500 errors and use the API endpoint directly
      console.log(`Fetching bin data for ${binId} using API endpoint`);
      
      // Get fresh token if the user is logged in
      let token = localStorage.getItem('authToken');
      if (currentUser && (!token || token === 'undefined')) {
        try {
          token = await currentUser.getIdToken(true);
          localStorage.setItem('authToken', token);
          console.log('Refreshed Firebase ID token before API call');
        } catch (tokenError) {
          console.error('Failed to refresh token:', tokenError);
        }
      }
      
      // Create controller for API request
      const apiController = new AbortController();
      const apiSignal = apiController.signal;
      const apiTimeoutId = setTimeout(() => apiController.abort(), 5000);
      
      try {
        const response = await fetch(`${API_BASE_URL}/bin-data/${binId}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
          },
          signal: apiSignal
        });
        
        clearTimeout(apiTimeoutId);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`API endpoint error: ${response.status} ${response.statusText}`, errorText);
          
          // If unauthorized, try to refresh token and retry
          if (response.status === 401 && currentUser) {
            try {
              console.log('Unauthorized, trying to refresh token and retry');
              const newToken = await currentUser.getIdToken(true);
              localStorage.setItem('authToken', newToken);
              
              // Retry with new token
              const retryResponse = await fetch(`${API_BASE_URL}/bin-data/${binId}`, {
              headers: {
                  'Authorization': `Bearer ${newToken}`,
                }
              });
              
              if (!retryResponse.ok) {
                throw new Error(`Retry failed: ${retryResponse.status}`);
              }
              
              const retryData = await retryResponse.json();
              console.log("API endpoint data (after token refresh):", retryData);
              setBinData(retryData);
              return;
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
            }
          } else {
            throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
          }
        }
        
        const data = await response.json();
        console.log("API endpoint data:", data);
        
        // Check if the data has a timestamp within the last minute
        const dataTimestamp = data.timestamp ? new Date(data.timestamp) : null;
        const currentTime = new Date();
        const timeDifference = dataTimestamp ? (currentTime - dataTimestamp) / 1000 : Infinity;
        
        if (timeDifference > 300) { // If data is more than 5 minutes old
          console.warn("API data is stale (more than 5 minutes old). ESP may be disconnected.");
          if (connected) {
            setError("Device appears to be offline. Last data update was more than 5 minutes ago.");
            setConnected(false);
          }
          throw new Error("API data is stale. Connection may be lost.");
        }
        
        setBinData(data);
      } catch (apiError) {
        clearTimeout(apiTimeoutId);
        
        if (apiError.name === 'AbortError') {
          console.error("API endpoint request timed out after 5 seconds");
          if (connected) {
            setError("Connection timeout. Cannot communicate with the server.");
            setConnected(false);
          }
        }
        throw apiError;
      }
    } catch (error) {
      console.error("Error fetching bin data:", error);
      setError(`Failed to fetch bin data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle manual refresh button clicks
  const handleRefresh = async () => {
    if (!connected || loading) {
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Manual refresh initiated for bin ${binId}`);
      await fetchBinData();
      console.log(`Manual refresh completed for bin ${binId}`);
    } catch (error) {
      console.error("Error during manual refresh:", error);
      setError(`Refresh failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
    const fillLevel = percentage || 0;
    if (fillLevel >= 80) return "bg-red-500";
    if (fillLevel >= 50) return "bg-amber-500";
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
    try {
      // Request permission first
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        // Create and show notification
        const notification = new Notification("Test Notification", {
          body: "This is a test notification from SmartWaste",
          icon: "/images/image-5.png",
          badge: "/images/image-5.png",
          data: {
            type: 'test',
            timestamp: new Date().toISOString()
          },
          requireInteraction: true // Notification won't auto-dismiss
        });

        // Handle notification click
        notification.onclick = () => {
          window.focus();
          notification.close();
          navigate('/dashboard');
        };

        setActionSuccess("Test notification sent! Check your system notifications.");
      setTimeout(() => {
        setActionSuccess(null);
      }, 5000);
      } else {
        setActionError("Please allow notifications to receive alerts.");
        setTimeout(() => {
          setActionError(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
      setActionError("Failed to send test notification. Please check your notification settings.");
      setTimeout(() => {
        setActionError(null);
      }, 5000);
    }
  };

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
      // For scroll items, navigate to home page first if not already there
      if (location.pathname !== '/') {
        navigate('/', { 
          state: { scrollTo: item.sectionId },
          replace: true 
        });
      } else {
        // Already on home page, just scroll
        scrollToSection(item.sectionId);
      }
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Check for scroll state when component mounts
  useEffect(() => {
    const state = location.state;
    if (state?.scrollTo) {
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(state.scrollTo);
      }, 100);
      // Clear the state
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location.state, navigate]);

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

  // Set up interval for automatic data refresh when connected
  useEffect(() => {
    let intervalId;
    const MAX_FAILED_ATTEMPTS = 3;
    
    if (connected && binId) {
      console.log(`Setting up auto-refresh for bin ${binId} every ${refreshInterval} seconds`);
      
      intervalId = setInterval(async () => {
        try {
          console.log(`Auto-refresh: Checking bin status for ${binId}`);
          
          // Validate binId
          if (!binId || binId.trim() === "") {
            console.error("Auto-refresh: Invalid binId");
            return;
          }
          
          // Skip direct ESP endpoint and use the more reliable API endpoint
          try {
            // Use fetchBinData which already has proper error handling
            await fetchBinData();
            
            // If we successfully retrieved data, reset the failed attempts counter
            if (connectionFailedAttempts > 0) {
              setConnectionFailedAttempts(0);
            }
          } catch (error) {
            console.error("Auto-refresh: API endpoint failed", error);
            
            // Increment failed attempts counter
            const newFailedCount = connectionFailedAttempts + 1;
            setConnectionFailedAttempts(newFailedCount);
            
            console.error(`Auto-refresh: Failed to reach any endpoint (attempt ${newFailedCount}/${MAX_FAILED_ATTEMPTS})`);
            
            if (newFailedCount >= MAX_FAILED_ATTEMPTS) {
              console.error("Auto-refresh: Maximum failed attempts reached. Setting to disconnected.");
              setError("Connection lost. Unable to reach device or server after multiple attempts.");
              setConnected(false);
              // Don't clear the interval right away - let it be handled by cleanup function
            }
          }
        } catch (error) {
          console.error("Auto-refresh: Error checking bin status", error);
          
          // Increment failed attempts counter
          const newFailedCount = connectionFailedAttempts + 1;
          setConnectionFailedAttempts(newFailedCount);
          
          if (newFailedCount >= MAX_FAILED_ATTEMPTS) {
            console.error("Auto-refresh: Maximum failed attempts reached. Setting to disconnected.");
            setError("Connection lost. Unable to reach device after multiple attempts.");
            setConnected(false);
            // Don't clear the interval right away - let it be handled by cleanup function
          }
        }
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        console.log("Clearing auto-refresh interval");
        clearInterval(intervalId);
      }
    };
  }, [connected, binId, refreshInterval, connectionFailedAttempts]);
  
  // Function to handle connecting to a bin
  const handleConnect = async (binId, binLocation) => {
    if (!binId || binId.trim() === "") {
      console.error("Cannot connect: Invalid binId");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Simulate connection logic
      console.log(`Connecting to bin ${binId} at location ${binLocation || 'unknown'}`);
      
      // Assume connection is successful
      setConnected(true);
      setBinId(binId);
      setBinLocation(binLocation);
      
      // Fetch initial data
      await fetchBinData();
      
      console.log(`Connected to bin ${binId}`);
    } catch (error) {
      console.error("Error connecting to bin:", error);
      setError(`Failed to connect to bin: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  // Function to handle disconnecting from a bin
  const handleDisconnect = () => {
    if (!connected) {
      console.error("Cannot disconnect: No bin is currently connected");
      return;
    }

    console.log(`Disconnecting from bin ${binId}`);
    setConnected(false);
    setBinId("");
    setBinLocation("");
    setBinData(null);
    setError(null);
    console.log("Disconnected from bin");
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gradient-to-br from-[#f0ffe8] to-white">
        <style>{leafAnimationStyles}</style>
        
        {/* Decorative leaves */}
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
        <div className="leaf leaf-4"></div>
        
        {/* Navigation Header */}
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

            {/* Right Side Actions - Enhanced buttons with Avatar */}
            <div className="flex items-center gap-4">
              {/* User Actions */}
              <div className="hidden sm:flex items-center gap-3">
                {!currentUser ? (
                  <>
          <Button 
                      className="relative overflow-hidden text-[#4db31e] hover:text-white bg-white hover:bg-[#61e923] border border-[#61e923]/40 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
                      onClick={() => navigate('/login')}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
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
                  </>
                ) : (
                  <Button 
                    className="relative overflow-hidden text-red-500 hover:text-white bg-white hover:bg-red-500 border border-red-300 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
                    onClick={() => {
                      logout && logout();
                      navigate('/login');
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <LogOut size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Sign Out</span>
                    </span>
                  </Button>
                )}
              </div>

              {/* Account Avatar - Always visible on all screen sizes */}
              <Avatar className="h-12 w-12 cursor-pointer border-2 border-[#61e923]/30 hover:border-[#61e923] transition-all duration-300 shadow-lg hover:shadow-xl bg-white/90 relative">
                <div className="absolute inset-0 bg-[#61e923]/20 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                {currentUser?.photoURL ? (
                  <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || "User"} className="relative z-10" />
                ) : (
                  <AvatarImage src="/images/avatar.jpg" alt="User" className="relative z-10" />
                )}
                <AvatarFallback className="bg-[#61e923]/10 text-[#4db31e] relative z-10">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <UserIcon size={22} />}
                </AvatarFallback>
              </Avatar>

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
        </header>

        {/* Enhanced Mobile Menu - Moved outside header */}
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
              
              {/* Authentication links for mobile */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                {!currentUser ? (
                  <>
                    <a 
                      href="/login"
                      className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <LogIn size={18} />
                        </div>
                        <span className="font-medium">Sign In</span>
                      </div>
                    </a>
                    
                    <a 
                      href="/signup"
                      className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-gray-700 hover:bg-[#61e923]/10 hover:text-[#4db31e]"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        navigate('/signup');
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#61e923]/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#61e923]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <UserPlus size={18} />
                        </div>
                        <span className="font-medium">Sign Up</span>
                      </div>
                    </a>
                  </>
                ) : (
                  <a 
                    href="/login"
                    className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      logout && logout();
                      navigate('/login');
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-100 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></span>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <LogOut size={18} className="text-red-500" />
                      </div>
                      <span className="font-medium">Sign Out</span>
                    </div>
                  </a>
                )}
                
                {currentUser && (
                  <div className="flex items-center gap-3 px-4 py-4 opacity-70">
                    <span className="text-sm text-gray-500">Signed in as:</span>
                    <span className="text-sm font-medium truncate max-w-[180px]">
                      {currentUser.displayName || currentUser.email || "User"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      
        {/* Main Dashboard Content */}
      <main className="pt-40 pb-12 px-4 md:px-8 lg:px-16 container mx-auto bg-gradient-to-br from-[#f0ffe8]/50 to-white rounded-t-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
          Smart Bin Dashboard
        </h1>
          <div className="flex items-center gap-2 flex-wrap justify-end">
          <Button 
            onClick={handleRefresh} 
            disabled={loading || !connected}
              className="relative overflow-hidden text-blue-600 hover:text-white bg-white hover:bg-blue-600 border border-blue-200 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
          >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative z-10 flex items-center gap-2">
                <RefreshCcwIcon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>Refresh</span>
              </span>
          </Button>
          {connected && (
            <Button 
              onClick={handleDisconnect}
                className="relative overflow-hidden text-red-600 hover:text-white bg-white hover:bg-red-600 border border-red-200 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-4 py-1.5 group"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Trash2Icon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Disconnect</span>
                </span>
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
              className="relative overflow-hidden text-white bg-[#61e923] hover:bg-[#4db31e] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-6 py-2 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative z-10 flex items-center gap-2">
              {isConnecting ? "Connecting..." : "Connect to Bin"}
                {!isConnecting && <MapPinIcon size={18} className="group-hover:rotate-12 transition-transform duration-300" />}
              </span>
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
                <BarChartIcon className={getStatusColor(binData?.status)} size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData?.fillPercentage || 0}%</p>
              <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressBarColor(binData?.fillPercentage || 0)}`}
                  style={{ width: `${binData?.fillPercentage || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className={getStatusColor(binData?.status)}>
                  {binData?.status?.charAt(0).toUpperCase() + binData?.status?.slice(1) || 'Unknown'}
                </span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Distance</h3>
                <MapPinIcon className="text-blue-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData?.distance || 0} cm</p>
              <p className="text-sm text-gray-500 mt-2">From sensor to waste</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Battery Level</h3>
                <SettingsIcon className="text-purple-500" size={20} />
              </div>
              <p className="text-3xl font-bold mt-2">{binData?.batteryLevel || 0}%</p>
              <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${(binData?.batteryLevel || 0) > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${binData?.batteryLevel || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {(binData?.batteryLevel || 0) > 20 ? 'Good' : 'Low battery'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600">Last Updated</h3>
                <RefreshCcwIcon className="text-teal-500" size={20} />
              </div>
              <p className="text-xl font-bold mt-2">{formatTimestamp(binData?.timestamp)}</p>
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
          
          {/* Smart bin visualization - Keep this section but remove history section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Bin Visualization</h3>
              <div className="flex justify-center">
                <div className="relative h-80 w-40 border-2 border-gray-400 rounded-md overflow-hidden">
                  <div 
                    className={`absolute bottom-0 left-0 w-full ${getProgressBarColor(binData?.fillPercentage || 0)} transition-all duration-1000 ease-in-out`} 
                    style={{ height: `${binData?.fillPercentage || 0}%` }}
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
                  Bin ID: <span className="font-medium">{binData?.binId || 'Unknown'}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Location: <span className="font-medium">{binData?.location || 'Unknown'}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {binData?.status === "critical" && (
                    <span className="text-red-600 font-medium">Requires immediate attention!</span>
                  )}
                  {binData?.status === "warning" && (
                    <span className="text-amber-600 font-medium">Will need emptying soon</span>
                  )}
                  {binData?.status === "normal" && (
                    <span className="text-green-600 font-medium">Bin level normal</span>
                  )}
                  {(!binData?.status || !["critical", "warning", "normal"].includes(binData?.status)) && (
                    <span className="text-gray-600 font-medium">Status unknown</span>
                  )}
                </p>
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
                className="relative overflow-hidden text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-6 py-2 group"
                onClick={handleEmptyBin}
                disabled={emptyingBin}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                {emptyingBin ? (
                  <>Marking as Empty...</>
                ) : (
                  <>
                      <TrashIcon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                    Empty Bin
                  </>
                )}
                </span>
              </Button>
              
              <Button 
                className="relative overflow-hidden text-white bg-slate-600 hover:bg-slate-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 px-6 py-2 group"
                onClick={handleTestNotification}
                title="Send a test notification"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <BellIcon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                Test Notification
                </span>
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
    </ErrorBoundary>
  );
}; 