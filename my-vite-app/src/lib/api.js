// API service for the Smart Bin application

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `API error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
};

// Base API URL - should be configured based on environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
      const response = await fetch(`${BASE_URL}/bin-data/bin/${binId}/latest`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
    },

    // Get historical data for a bin
    getBinHistory: async (binId, limit = 10) => {
      if (!binId) throw new Error("Bin ID is required");
      const response = await fetch(`${BASE_URL}/bin-data/bin/${binId}?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return handleResponse(response);
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
      const response = await fetch(`${BASE_URL}/bin-data/bin/${binId}/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
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