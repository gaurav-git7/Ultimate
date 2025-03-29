import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, X } from 'lucide-react';
import { useAuth } from '../../../../firebase/AuthContext';
import api from '../../../../lib/api';

export const NotificationBell = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use API service to get notifications
      const data = await api.notifications.getNotifications();
      setNotifications(data || []);
      
      // Get unread count
      const unreadData = await api.notifications.getUnreadCount();
      setUnreadCount(unreadData.count || 0);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError('Failed to load notifications');
      
      // Mock data for development/testing
      if (process.env.NODE_ENV === 'development') {
        const mockNotifications = generateMockNotifications();
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate mock notifications for development
  const generateMockNotifications = () => {
    return [
      {
        id: '1',
        title: 'Bin #1328 is full',
        message: 'Smart bin at Main Street requires emptying',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        read: false,
        type: 'critical'
      },
      {
        id: '2',
        title: 'Bin #2045 battery low',
        message: 'Smart bin at City Park has low battery (15%)',
        timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
        read: false,
        type: 'warning'
      },
      {
        id: '3',
        title: 'Maintenance completed',
        message: 'Scheduled maintenance for bin #1328 completed',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        read: true,
        type: 'info'
      }
    ];
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      await api.notifications.markAsRead(notificationId);
      
      // Update local state
      setNotifications(
        notifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      
      // For development, update local state anyway
      if (process.env.NODE_ENV === 'development') {
        setNotifications(
          notifications.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true } 
              : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.notifications.markAllAsRead();
      
      // Update local state
      setNotifications(
        notifications.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
      
      // For development, update local state anyway
      if (process.env.NODE_ENV === 'development') {
        setNotifications(
          notifications.map(notification => ({ ...notification, read: true }))
        );
        setUnreadCount(0);
      }
    }
  };

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  // Get color based on notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get icon color based on notification type
  const getIconColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  // Load notifications on component mount
  useEffect(() => {
    fetchNotifications();
    
    // Set up polling every 2 minutes
    const intervalId = setInterval(fetchNotifications, 120000);
    
    return () => clearInterval(intervalId);
  }, [currentUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    
    // If opening dropdown, refresh notifications
    if (!isOpen) {
      fetchNotifications();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell icon with badge */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center text-gray-500">
                Loading notifications...
              </div>
            )}
            
            {error && !loading && (
              <div className="p-4 text-center text-red-500">
                {error}
              </div>
            )}
            
            {!loading && !error && notifications.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
            
            {!loading && !error && notifications.length > 0 && (
              <ul>
                {notifications.map(notification => (
                  <li 
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex">
                      <div className={`flex-shrink-0 w-2 self-stretch mr-3 rounded-l-md ${getIconColor(notification.type)}`}></div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">{notification.title}</h4>
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Dismiss"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatRelativeTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-2 text-center border-t border-gray-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;