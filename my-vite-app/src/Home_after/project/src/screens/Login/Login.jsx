import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../firebase/AuthContext";
import "./Login.css";
import { FaGoogle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Spinner from "../../../../common/Spinner/Spinner";
import Message from "../../../../common/Message/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [showMessage, setShowMessage] = useState(false);
  const { login, loginWithGoogle, error, setError, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (error) {
      setMessage({ type: "error", content: error });
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login to Smart Bin</h2>
        {showMessage && <Message type={message.type} message={message.content} />}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <RiLockPasswordLine className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? <Spinner size="small" /> : "Login"}
          </button>
        </form>

        <div className="social-login">
          <p>Or login with</p>
          <div className="social-buttons">
            <button
              onClick={handleGoogleLogin}
              className="google-btn"
              disabled={isLoading}
            >
              <FaGoogle /> Google
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 