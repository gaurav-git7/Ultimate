// API service for the Smart Bin application

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData?.message || errorData?.error) {
        errorMessage = errorData.message || errorData.error;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
      console.error('API Error Response:', errorData);
    } catch (parseError) {
      // Response wasn't JSON, try to get text
      try {
        const errorText = await response.text();
        if (errorText && errorText.length < 500) { // Don't log huge HTML errors
          errorMessage += ` - ${errorText}`;
          console.error('API Error Text:', errorText);
        }
      } catch (textError) {
        console.error('Failed to parse error response:', textError);
      }
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  
  try {
    const data = await response.json();
    console.log('API Success Response:', data);
    return data;
  } catch (parseError) {
    console.error('Error parsing successful response:', parseError);
    // If we can't parse JSON, return an empty object
    return {};
  }
};

// Base API URL - should be configured based on environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Direct ESP API URL (without /api path)
const ESP_API_URL = "http://localhost:5000";

// Development mode check for Vite
const isDevelopment = import.meta.env.DEV;

// Get the auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Main API service object with endpoints grouped by resource
const api = {
  // Bin-related endpoints
  bins: {
    // Get all bins
    getAllBins: async () => {
      const response = await fetch(`${BASE_URL}/bins`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Get a specific bin by ID
    getBin: async (binId) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bins/${binId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Create a new bin
    createBin: async (binData) => {
      const response = await fetch(`${BASE_URL}/bins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(binData),
      });
      return handleResponse(response);
    },

    // Update a bin
    updateBin: async (binId, binData) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bins/${binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(binData),
      });
      return handleResponse(response);
    },

    // Delete a bin
    deleteBin: async (binId) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bins/${binId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Mark a bin as emptied
    emptyBin: async (binId, notes = "") => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bins/${binId}/empty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ notes }),
      });
      return handleResponse(response);
    },
  },

  // Bin data endpoints
  binData: {
    // Get the latest data for a bin
    getBinData: async (binId) => {
      if (!binId) throw new Error("Bin ID is required");
      try {
        console.log(`Fetching bin data for ${binId} from direct ESP endpoint`);
        // Try first with the direct endpoint used by ESP8266
        const response = await fetch(`${ESP_API_URL}/bins/${binId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          console.log(`Direct ESP endpoint successful for bin ${binId}`);
          return handleResponse(response);
        }
        
        // Log the error for debugging
        const errorText = await response.text().catch(() => 'No error text available');
        console.error(`Direct ESP endpoint failed with status ${response.status}: ${errorText}`);
        
        // If direct endpoint fails, try the API endpoint with auth
        console.log(`Trying authenticated endpoint for bin ${binId}`);
        const authResponse = await fetch(`${BASE_URL}/bin-data/${binId}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!authResponse.ok) {
          const authErrorText = await authResponse.text().catch(() => 'No error text available');
          console.error(`Auth endpoint failed with status ${authResponse.status}: ${authErrorText}`);
        } else {
          console.log(`Auth endpoint successful for bin ${binId}`);
        }
        
        return handleResponse(authResponse);
      } catch (error) {
        console.error(`Error in getBinData for bin ${binId}:`, error);
        throw error;
      }
    },

    // Get historical data for a bin
    getBinHistory: async (binId, limit = 10) => {
      if (!binId) throw new Error("Bin ID is required");
      try {
        console.log(`Fetching history for bin ${binId} from direct ESP endpoint`);
        // Try first with the direct endpoint used by ESP8266
        const response = await fetch(`${ESP_API_URL}/bins/${binId}/history?limit=${limit}`);
        
        if (response.ok) {
          console.log(`Direct ESP history endpoint successful for bin ${binId}`);
          return handleResponse(response);
        }
        
        // Log the error for debugging
        const errorText = await response.text().catch(() => 'No error text available');
        console.error(`Direct ESP history endpoint failed with status ${response.status}: ${errorText}`);
        
        // If direct endpoint fails, try the API endpoint with auth
        console.log(`Trying authenticated history endpoint for bin ${binId}`);
        const authResponse = await fetch(`${BASE_URL}/bin-data/${binId}/history?limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        
        if (!authResponse.ok) {
          const authErrorText = await authResponse.text().catch(() => 'No error text available');
          console.error(`Auth history endpoint failed with status ${authResponse.status}: ${authErrorText}`);
        } else {
          console.log(`Auth history endpoint successful for bin ${binId}`);
        }
        
        return handleResponse(authResponse);
      } catch (error) {
        console.error(`Error in getBinHistory for bin ${binId}:`, error);
        throw error;
      }
    },

    // Add new bin data (usually from the ESP8266)
    addBinData: async (data) => {
      const response = await fetch(`${BASE_URL}/bin-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    // Clear bin history
    clearBinHistory: async (binId) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bin-data/${binId}/history`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },
    
    // Prune bin history to keep only latest n entries (default 10)
    pruneHistory: async (binId, limit = 10) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bin-data/${binId}/prune-history?limit=${limit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ limit }),
      });
      return handleResponse(response);
    },
  },

  // User-related endpoints
  users: {
    // Get current user profile
    getProfile: async () => {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Update user profile
    updateProfile: async (profileData) => {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(profileData),
      });
      return handleResponse(response);
    },
  },

  // Notification endpoints
  notifications: {
    // Get all notifications for current user
    getNotifications: async () => {
      const response = await fetch(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Get unread notification count
    getUnreadCount: async () => {
      const response = await fetch(`${BASE_URL}/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Mark a notification as read
    markAsRead: async (notificationId) => {
      if (!notificationId) throw new Error("Notification ID is required");
      const response = await fetch(`${BASE_URL}/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
      const response = await fetch(`${BASE_URL}/notifications/mark-all-read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Create a notification (for testing)
    createNotification: async (notificationData) => {
      const response = await fetch(`${BASE_URL}/notifications/send-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(notificationData),
      });
      return handleResponse(response);
    },
  },
};

export default api; 