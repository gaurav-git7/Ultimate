import React, { createContext, useContext, useState } from "react";

// Create context for the tabs state
const TabsContext = createContext(undefined);

export function Tabs({ defaultValue, value, onValueChange, children, className, ...props }) {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);
  
  const handleValueChange = (newValue) => {
    setSelectedTab(newValue);
    onValueChange?.(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab: handleValueChange }}>
      <div className={`w-full ${className || ""}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, ...props }) {
  return (
    <div 
      className={`flex gap-1 items-center py-1 px-1 bg-gray-100 rounded-md ${className || ""}`} 
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className, ...props }) {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  const isSelected = selectedTab === value;
  
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all 
        ${isSelected ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"}
        ${className || ""}`}
      onClick={() => setSelectedTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className, ...props }) {
  const { selectedTab } = useContext(TabsContext);
  
  if (selectedTab !== value) {
    return null;
  }
  
  return (
    <div 
      role="tabpanel" 
      className={`mt-2 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
} 