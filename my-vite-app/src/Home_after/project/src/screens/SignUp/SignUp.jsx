import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../firebase/AuthContext";
import "./SignUp.css";
import { FaGoogle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Spinner from "../../../../common/Spinner/Spinner";
import Message from "../../../../common/Message/Message";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [showMessage, setShowMessage] = useState(false);
  const { signup, loginWithGoogle, error, setError, currentUser } = useAuth();
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: "error", content: "Passwords do not match" });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    
    if (password.length < 6) {
      setMessage({ type: "error", content: "Password should be at least 6 characters" });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    
    setIsLoading(true);
    try {
      await signup(email, password);
      setMessage({ type: "success", content: "Account created successfully!" });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error("Google signup error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Create an Account</h2>
        {showMessage && <Message type={message.type} message={message.content} />}
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="form-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
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
          <div className="form-group">
            <RiLockPasswordLine className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? <Spinner size="small" /> : "Sign Up"}
          </button>
        </form>

        <div className="social-signup">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button
              onClick={handleGoogleSignUp}
              className="google-btn"
              disabled={isLoading}
            >
              <FaGoogle /> Google
            </button>
          </div>
        </div>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 