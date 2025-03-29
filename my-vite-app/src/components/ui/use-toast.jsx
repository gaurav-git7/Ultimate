import React, { createContext, useContext, useState } from "react";

// Create context for the toast state
const ToastContext = createContext(undefined);

// Toast provider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = (message) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, visible: true };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => 
        prevToasts.filter((toast) => toast.id !== id)
      );
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 text-white px-4 py-2 rounded shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use the toast
export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}

// Export Toast component for direct usage
export function Toast({ children }) {
  return (
    <div className="bg-slate-900 text-white px-4 py-2 rounded shadow-lg">
      {children}
    </div>
  );
} 