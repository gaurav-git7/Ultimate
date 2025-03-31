import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home } from "./Home/project/src/screens/Home/Home";
import { Login } from "./Log/project/src/screens/Login/Login";
import { SignUp } from "./Log/project/src/screens/SignUp/SignUp";
import { Box } from "./Home_after/project/src/screens/Box/Box";
import { Profile } from "./Home_after/project/src/screens/Box/profile/Profile";
import { AboutUs } from "./AboutUs/AboutUs";
import { AuthProvider, useAuth } from './firebase/AuthContext';
import { DustbinPage } from "./Dustbin/DustbinPage";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { currentUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Update the isAuthenticated state based on Firebase auth state
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <SignUp onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Box onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dustbin" 
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
